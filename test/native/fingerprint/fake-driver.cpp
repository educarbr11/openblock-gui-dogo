#include "fake-driver.h"

FakeFingerprintState fake;
uint8_t fakeSerialRxPin = 0;
uint8_t fakeSerialTxPin = 0;
uint32_t fakeSerialBaud = 0;

void resetFake() {
    fake = FakeFingerprintState();
    fakeSerialRxPin = 0;
    fakeSerialTxPin = 0;
    fakeSerialBaud = 0;
}

// Use the real upstream header so the host tests also verify its API contract.
Adafruit_Fingerprint::Adafruit_Fingerprint(SoftwareSerial* serial, uint32_t password)
    : thePassword(password), theAddress(0xFFFFFFFF), mySerial(serial),
      swSerial(serial), hwSerial(0) {}

void Adafruit_Fingerprint::begin(uint32_t baud) {
    fake.calls.push_back("begin");
    swSerial->begin(baud);
}

boolean Adafruit_Fingerprint::verifyPassword() {
    fake.calls.push_back("verifyPassword");
    return fake.passwordVerified;
}

uint8_t Adafruit_Fingerprint::getParameters() {
    fake.calls.push_back("getParameters");
    if (fake.parametersStatus == FINGERPRINT_OK) capacity = fake.capacity;
    return fake.parametersStatus;
}

uint8_t Adafruit_Fingerprint::getImage() {
    fake.calls.push_back("getImage");
    return fake.imageStatus;
}

uint8_t Adafruit_Fingerprint::image2Tz(uint8_t slot) {
    fake.calls.push_back("image2Tz");
    fake.lastSlot = slot;
    return fake.conversionStatus;
}

uint8_t Adafruit_Fingerprint::createModel() {
    fake.calls.push_back("createModel");
    return fake.modelStatus;
}

uint8_t Adafruit_Fingerprint::storeModel(uint16_t id) {
    fake.calls.push_back("storeModel");
    fake.lastStoredId = id;
    return fake.storeStatus;
}

uint8_t Adafruit_Fingerprint::fingerSearch(uint8_t slot) {
    fake.calls.push_back("fingerSearch");
    fake.lastSlot = slot;
    fake.lastSearchCapacity = capacity;
    // Deliberately retain values on errors: the wrapper must not report them.
    fingerID = fake.matchingId;
    confidence = fake.matchingConfidence;
    return fake.searchStatus;
}

uint8_t Adafruit_Fingerprint::deleteModel(uint16_t id) {
    fake.calls.push_back("deleteModel");
    fake.lastDeletedId = id;
    return fake.deleteStatus;
}

uint8_t Adafruit_Fingerprint::getTemplateCount() {
    fake.calls.push_back("getTemplateCount");
    if (fake.countStatus == FINGERPRINT_OK) templateCount = fake.templateCount;
    return fake.countStatus;
}
