#ifndef DOGOBLOCK_TEST_FINGERPRINT_DRIVER_H
#define DOGOBLOCK_TEST_FINGERPRINT_DRIVER_H

#include <Adafruit_Fingerprint.h>
#include <string>
#include <vector>

struct FakeFingerprintState {
    bool passwordVerified = true;
    uint8_t parametersStatus = FINGERPRINT_OK;
    uint8_t imageStatus = FINGERPRINT_OK;
    uint8_t conversionStatus = FINGERPRINT_OK;
    uint8_t modelStatus = FINGERPRINT_OK;
    uint8_t storeStatus = FINGERPRINT_OK;
    uint8_t searchStatus = FINGERPRINT_OK;
    uint8_t deleteStatus = FINGERPRINT_OK;
    uint8_t countStatus = FINGERPRINT_OK;
    uint16_t capacity = 162;
    uint16_t matchingId = 7;
    uint16_t matchingConfidence = 101;
    uint16_t templateCount = 3;
    uint16_t lastStoredId = 0;
    uint16_t lastDeletedId = 0;
    uint16_t lastSearchCapacity = 0;
    uint8_t lastSlot = 0;
    std::vector<std::string> calls;
};

extern FakeFingerprintState fake;
void resetFake();

#endif
