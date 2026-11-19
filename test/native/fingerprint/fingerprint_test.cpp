#include <DoGoFingerprint.h>
#include "fake-driver.h"
#include <climits>
#include <cstdlib>
#include <iostream>
#include <limits>

static int assertions = 0;

static void expect(bool condition, const char* message) {
    ++assertions;
    if (!condition) {
        std::cerr << "FAIL: " << message << std::endl;
        std::exit(1);
    }
}

static void enroll(DoGoFingerprint& sensor) {
    expect(sensor.captureImage() == FINGERPRINT_OK, "first image captured");
    expect(sensor.image2Tz(1) == FINGERPRINT_OK, "first sample converted");
    expect(sensor.captureImage() == FINGERPRINT_OK, "second image captured");
    expect(sensor.image2Tz(2) == FINGERPRINT_OK, "second sample converted");
    expect(sensor.createModel() == FINGERPRINT_OK, "two samples create a model");
}

static void initialAndInitialization() {
    resetFake();
    DoGoFingerprint sensor(10, 11);
    expect(fakeSerialRxPin == 10 && fakeSerialTxPin == 11, "constructor configures RX and TX");
    expect(sensor.status() == FINGERPRINT_PASSFAIL, "initial status is not successful");
    expect(!sensor.succeeded(), "not initialized is not successful");
    expect(sensor.fingerID() == 0 && sensor.confidence() == 0, "initial match is empty");
    expect(sensor.templateCount() == -1, "initial count is unknown");
    expect(sensor.captureImage() == FINGERPRINT_PASSFAIL, "capture requires initialization");
    expect(sensor.image2Tz(1) == FINGERPRINT_PASSFAIL, "conversion requires initialization");
    expect(sensor.createModel() == FINGERPRINT_PASSFAIL, "model requires initialization");
    expect(sensor.storeModel(1) == FINGERPRINT_PASSFAIL, "storage requires initialization");
    expect(sensor.search() == FINGERPRINT_PASSFAIL, "search requires initialization");
    expect(sensor.deleteModel(1) == FINGERPRINT_PASSFAIL, "deletion requires initialization");
    expect(sensor.refreshTemplateCount() == FINGERPRINT_PASSFAIL, "count requires initialization");
    expect(sensor.verifyPassword() == FINGERPRINT_PASSFAIL, "verification requires serial begin");
    expect(fake.calls.empty(), "uninitialized operations never contact the driver");
    expect(sensor.begin(0) == FINGERPRINT_INVALIDREG, "zero baud is rejected");
    expect(fake.calls.empty(), "zero baud never contacts the driver");
    expect(sensor.begin(57600) == FINGERPRINT_OK, "begin verifies password and parameters");
    expect(fakeSerialBaud == 57600, "serial baud configured");
    expect(fake.calls == std::vector<std::string>({"begin", "verifyPassword", "getParameters"}),
        "initialization sequence uses real parameters");
    expect(sensor.succeeded(), "successful begin is reported");
}

static void initializationFailures() {
    resetFake();
    DoGoFingerprint sensor(10, 11);
    fake.passwordVerified = false;
    expect(sensor.begin(57600) == FINGERPRINT_PASSFAIL, "password error is reported");
    expect(fake.calls.size() == 2, "failed password stops initialization");
    const std::size_t before = fake.calls.size();
    expect(sensor.captureImage() == FINGERPRINT_PASSFAIL, "failed initialization prevents capture");
    expect(fake.calls.size() == before, "failed initialization prevents I/O");

    fake.passwordVerified = true;
    fake.parametersStatus = FINGERPRINT_PACKETRECIEVEERR;
    expect(sensor.verifyPassword() == FINGERPRINT_PACKETRECIEVEERR, "parameter transport error preserved");
    fake.parametersStatus = FINGERPRINT_OK;
    fake.capacity = 1;
    expect(sensor.verifyPassword() == FINGERPRINT_BADLOCATION, "unusable sensor capacity rejected");
    fake.capacity = 162;
    expect(sensor.verifyPassword() == FINGERPRINT_OK, "verification can recover after configuration error");
    expect(sensor.captureImage() == FINGERPRINT_OK, "sensor available after recovery");

    fake.parametersStatus = FINGERPRINT_TIMEOUT;
    expect(sensor.begin(57600) == FINGERPRINT_TIMEOUT, "begin preserves parameter timeout");
    expect(sensor.templateCount() == -1, "restart invalidates count");
}

static void imageAndBufferGuards() {
    resetFake();
    DoGoFingerprint sensor(10, 11);
    sensor.begin(57600);
    std::size_t before = fake.calls.size();
    expect(sensor.image2Tz(1) == FINGERPRINT_INVALIDIMAGE, "conversion needs fresh capture");
    expect(sensor.createModel() == FINGERPRINT_ENROLLMISMATCH, "model needs both buffers");
    expect(sensor.storeModel(1) == FINGERPRINT_DBRANGEFAIL, "storage needs a fresh model");
    expect(fake.calls.size() == before, "failed preconditions never contact driver");

    sensor.captureImage();
    before = fake.calls.size();
    expect(sensor.image2Tz(0) == FINGERPRINT_BADLOCATION, "invalid buffer zero rejected");
    expect(sensor.image2Tz(3) == FINGERPRINT_BADLOCATION, "invalid buffer three rejected");
    expect(fake.calls.size() == before, "invalid buffers never contact driver");
    sensor.captureImage();
    before = fake.calls.size();
    expect(sensor.image2Tz(2) == FINGERPRINT_INVALIDIMAGE, "second sample requires first sample");
    expect(fake.calls.size() == before, "missing first sample never reaches driver");

    fake.imageStatus = FINGERPRINT_NOFINGER;
    expect(sensor.captureImage() == FINGERPRINT_NOFINGER, "no-finger status preserved");
    before = fake.calls.size();
    expect(sensor.image2Tz(1) == FINGERPRINT_INVALIDIMAGE, "failed capture cannot convert stale image");
    expect(fake.calls.size() == before, "stale conversion prevented");
    fake.imageStatus = FINGERPRINT_IMAGEFAIL;
    expect(sensor.captureImage() == FINGERPRINT_IMAGEFAIL, "capture failure preserved");

    fake.imageStatus = FINGERPRINT_OK;
    sensor.captureImage();
    fake.conversionStatus = FINGERPRINT_IMAGEMESS;
    expect(sensor.image2Tz(1) == FINGERPRINT_IMAGEMESS, "first conversion failure preserved");
    expect(sensor.createModel() == FINGERPRINT_ENROLLMISMATCH, "failed conversion cannot create model");
    fake.conversionStatus = FINGERPRINT_OK;
    sensor.captureImage();
    expect(sensor.image2Tz(1) == FINGERPRINT_OK, "first buffer available after retry");
    before = fake.calls.size();
    expect(sensor.image2Tz(1) == FINGERPRINT_INVALIDIMAGE, "one capture is consumed once");
    expect(fake.calls.size() == before, "consumed image does not reach driver twice");
}

static void enrollmentAndStaleModelGuards() {
    resetFake();
    DoGoFingerprint sensor(10, 11);
    sensor.begin(57600);
    sensor.captureImage();
    sensor.image2Tz(1);
    fake.imageStatus = FINGERPRINT_NOFINGER;
    expect(sensor.captureImage() == FINGERPRINT_NOFINGER, "finger removal is explicit");
    fake.imageStatus = FINGERPRINT_OK;
    sensor.captureImage();
    expect(sensor.image2Tz(2) == FINGERPRINT_OK, "first sample survives finger removal");
    fake.modelStatus = FINGERPRINT_ENROLLMISMATCH;
    expect(sensor.createModel() == FINGERPRINT_ENROLLMISMATCH, "mismatched samples are reported");
    std::size_t before = fake.calls.size();
    expect(sensor.storeModel(1) == FINGERPRINT_DBRANGEFAIL, "mismatch cannot store an older model");
    expect(fake.calls.size() == before, "mismatch blocks storage I/O");

    fake.modelStatus = FINGERPRINT_OK;
    enroll(sensor);
    fake.imageStatus = FINGERPRINT_NOFINGER;
    sensor.captureImage();
    before = fake.calls.size();
    expect(sensor.storeModel(1) == FINGERPRINT_DBRANGEFAIL, "new failed capture invalidates prior model");
    expect(fake.calls.size() == before, "prior model never stored after new capture");

    fake.imageStatus = FINGERPRINT_OK;
    enroll(sensor);
    sensor.captureImage();
    fake.conversionStatus = FINGERPRINT_FEATUREFAIL;
    expect(sensor.image2Tz(2) == FINGERPRINT_FEATUREFAIL, "second conversion failure preserved");
    expect(sensor.createModel() == FINGERPRINT_ENROLLMISMATCH, "failed second sample invalidates model");
    expect(sensor.storeModel(1) == FINGERPRINT_DBRANGEFAIL, "failed second sample cannot store");
}

static void idsAreCheckedBeforeNarrowing() {
    const double invalidIds[] = {
        -1, static_cast<double>(LONG_MIN), 0, 162, 163, 65536, 65537,
        static_cast<double>(LONG_MAX), 1.9, 1e20,
        std::numeric_limits<double>::quiet_NaN(),
        std::numeric_limits<double>::infinity(),
        -std::numeric_limits<double>::infinity()
    };
    for (double id : invalidIds) {
        resetFake();
        DoGoFingerprint sensor(10, 11);
        sensor.begin(57600);
        enroll(sensor);
        const std::size_t before = fake.calls.size();
        expect(sensor.storeModel(id) == FINGERPRINT_BADLOCATION, "invalid store ID is rejected before cast");
        expect(sensor.deleteModel(id) == FINGERPRINT_BADLOCATION, "invalid delete ID is rejected before cast");
        expect(fake.calls.size() == before, "invalid ID produces no sensor I/O");
        expect(fake.lastStoredId == 0 && fake.lastDeletedId == 0, "invalid IDs never wrap to another template");
    }
    for (long id : {1L, 161L}) {
        resetFake();
        DoGoFingerprint sensor(10, 11);
        sensor.begin(57600);
        enroll(sensor);
        expect(sensor.storeModel(id) == FINGERPRINT_OK, "first and last allowed IDs can store");
        expect(fake.lastStoredId == id, "stored ID passed unchanged");
        expect(sensor.deleteModel(id) == FINGERPRINT_OK, "first and last allowed IDs can delete");
        expect(fake.lastDeletedId == id, "deleted ID passed unchanged");
    }
}

static void mutationAndCounts() {
    resetFake();
    DoGoFingerprint sensor(10, 11);
    sensor.begin(57600);
    expect(sensor.refreshTemplateCount() == FINGERPRINT_OK, "count refresh succeeds");
    expect(sensor.templateCount() == 3, "confirmed count cached");
    enroll(sensor);
    fake.templateCount = 4;
    expect(sensor.storeModel(5) == FINGERPRINT_OK, "store success preserved");
    expect(sensor.templateCount() == 4, "successful store refreshes confirmed count");
    std::size_t before = fake.calls.size();
    expect(sensor.storeModel(6) == FINGERPRINT_DBRANGEFAIL, "store consumes the model");
    expect(fake.calls.size() == before, "consumed model never stored twice");

    enroll(sensor);
    fake.storeStatus = FINGERPRINT_FLASHERR;
    expect(sensor.storeModel(5) == FINGERPRINT_FLASHERR, "flash failure preserved");
    expect(sensor.templateCount() == -1, "uncertain mutation invalidates count");
    before = fake.calls.size();
    expect(sensor.storeModel(6) == FINGERPRINT_DBRANGEFAIL, "failed store consumes model too");
    expect(fake.calls.size() == before, "failed store cannot be repeated with stale model");

    fake.storeStatus = FINGERPRINT_OK;
    enroll(sensor);
    fake.countStatus = FINGERPRINT_TIMEOUT;
    expect(sensor.storeModel(5) == FINGERPRINT_OK, "count failure does not replace store result");
    expect(sensor.succeeded(), "successful mutation is reported despite unavailable count");
    expect(sensor.templateCount() == -1, "failed internal refresh never reports old count");
    expect(sensor.refreshTemplateCount() == FINGERPRINT_TIMEOUT, "explicit count refresh exposes error");
    expect(sensor.templateCount() == -1, "failed explicit refresh retains unknown count");

    fake.countStatus = FINGERPRINT_OK;
    fake.templateCount = 2;
    expect(sensor.deleteModel(5) == FINGERPRINT_OK, "delete succeeds");
    expect(sensor.templateCount() == 2, "delete refreshes actual count, not a guessed decrement");
    fake.deleteStatus = FINGERPRINT_DELETEFAIL;
    expect(sensor.deleteModel(5) == FINGERPRINT_DELETEFAIL, "delete failure preserved");
    expect(sensor.templateCount() == -1, "uncertain delete invalidates count");
    fake.deleteStatus = FINGERPRINT_OK;
    fake.countStatus = FINGERPRINT_PACKETRECIEVEERR;
    expect(sensor.deleteModel(5) == FINGERPRINT_OK, "delete status survives refresh error");
    expect(sensor.templateCount() == -1, "unconfirmed count after delete remains unknown");
}

static void fullCapacitySearch() {
    resetFake();
    fake.capacity = 1000;
    fake.matchingId = 999;
    DoGoFingerprint sensor(10, 11);
    expect(sensor.begin(57600) == FINGERPRINT_OK, "larger sensor capacity is accepted");
    enroll(sensor);
    expect(sensor.storeModel(999) == FINGERPRINT_OK, "last slot of larger sensor can store");
    expect(fake.lastStoredId == 999, "large template ID is not narrowed incorrectly");
    expect(sensor.search() == FINGERPRINT_OK, "large template ID can be found");
    expect(fake.lastSearchCapacity == 1000, "search uses full sensor capacity instead of fast-search fixed range");
    expect(sensor.fingerID() == 999, "large search result preserved");
    expect(sensor.deleteModel(999) == FINGERPRINT_OK, "last slot of larger sensor can delete");
    const std::size_t before = fake.calls.size();
    expect(sensor.deleteModel(1000) == FINGERPRINT_BADLOCATION, "capacity itself is outside valid ID range");
    expect(sensor.deleteModel(999.5) == FINGERPRINT_BADLOCATION, "fractional ID in range is rejected");
    expect(fake.calls.size() == before, "invalid large IDs never reach driver");
}

static void searchAndReporters() {
    resetFake();
    DoGoFingerprint sensor(10, 11);
    sensor.begin(57600);
    fake.calls.clear();
    expect(sensor.search() == FINGERPRINT_OK, "search succeeds");
    expect(fake.calls == std::vector<std::string>({"getImage", "image2Tz", "fingerSearch"}),
        "search captures and converts before searching");
    expect(fake.lastSlot == 1, "search uses buffer one");
    expect(sensor.fingerID() == 7 && sensor.confidence() == 101, "matching values cached");
    const std::size_t before = fake.calls.size();
    for (int i = 0; i < 20; ++i) {
        expect(sensor.status() == FINGERPRINT_OK, "status getter stable");
        expect(sensor.succeeded(), "success getter stable");
        expect(sensor.fingerID() == 7, "ID getter stable");
        expect(sensor.confidence() == 101, "confidence getter stable");
        expect(sensor.templateCount() == -1, "count getter does not trigger refresh");
    }
    expect(fake.calls.size() == before, "repeated reporters perform no serial I/O");

    fake.imageStatus = FINGERPRINT_NOFINGER;
    fake.calls.clear();
    expect(sensor.search() == FINGERPRINT_NOFINGER, "search no-finger status preserved");
    expect(sensor.fingerID() == 0 && sensor.confidence() == 0, "failed capture clears stale match");
    expect(fake.calls == std::vector<std::string>({"getImage"}), "capture failure short circuits search");

    fake.imageStatus = FINGERPRINT_OK;
    sensor.search();
    fake.conversionStatus = FINGERPRINT_FEATUREFAIL;
    fake.calls.clear();
    expect(sensor.search() == FINGERPRINT_FEATUREFAIL, "search conversion error preserved");
    expect(sensor.fingerID() == 0 && sensor.confidence() == 0, "conversion failure clears stale match");
    expect(fake.calls.size() == 2, "conversion failure never searches stale buffer");

    fake.conversionStatus = FINGERPRINT_OK;
    sensor.search();
    fake.searchStatus = FINGERPRINT_NOTFOUND;
    expect(sensor.search() == FINGERPRINT_NOTFOUND, "not-found status preserved");
    expect(sensor.fingerID() == 0 && sensor.confidence() == 0, "search failure never reports prior ID");
    expect(!sensor.succeeded(), "failure success reporter is false");
    fake.searchStatus = FINGERPRINT_PACKETRECIEVEERR;
    expect(sensor.search() == FINGERPRINT_PACKETRECIEVEERR, "search transport error preserved");
    expect(sensor.fingerID() == 0 && sensor.confidence() == 0, "transport failure never reports prior ID");
    expect(sensor.storeModel(1) == FINGERPRINT_DBRANGEFAIL, "search buffer is not an enrollment model");

    fake.searchStatus = FINGERPRINT_OK;
    enroll(sensor);
    sensor.search();
    expect(sensor.storeModel(1) == FINGERPRINT_DBRANGEFAIL, "search invalidates an older enrollment model");
    sensor.begin(57600);
    expect(sensor.fingerID() == 0 && sensor.confidence() == 0, "begin clears cached match");
}

int main() {
    initialAndInitialization();
    initializationFailures();
    imageAndBufferGuards();
    enrollmentAndStaleModelGuards();
    idsAreCheckedBeforeNarrowing();
    mutationAndCounts();
    fullCapacitySearch();
    searchAndReporters();
    std::cout << "Fingerprint native tests passed (" << assertions << " assertions)." << std::endl;
    return 0;
}
