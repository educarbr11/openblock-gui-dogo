#ifndef DOGOBLOCK_TEST_SOFTWARE_SERIAL_H
#define DOGOBLOCK_TEST_SOFTWARE_SERIAL_H

#include "Arduino.h"

extern uint8_t fakeSerialRxPin;
extern uint8_t fakeSerialTxPin;
extern uint32_t fakeSerialBaud;

class SoftwareSerial : public Stream {
public:
    SoftwareSerial(uint8_t rxPin, uint8_t txPin) {
        fakeSerialRxPin = rxPin;
        fakeSerialTxPin = txPin;
    }
    void begin(uint32_t baud) { fakeSerialBaud = baud; }
};

#endif
