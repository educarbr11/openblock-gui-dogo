# Fingerprint host tests

From `openblock-gui`:

```bash
node scripts/test-fingerprint-native.js
```

Requires `g++` (or set `CXX` to a C++11 compiler). The runner creates and removes
its own temporary binary. It compiles the real DoGoFingerprint wrapper against
the pinned upstream Adafruit header, with a fake driver and serial transport.

The suite verifies initialization, errors from every enrollment/search stage,
fresh-image and fresh-model guards, no-finger handling between samples,
signed, fractional, non-finite and out-of-range IDs, full-capacity searches,
count invalidation and refresh, and reporters that
never perform I/O. The host driver intentionally retains stale match values
when it fails so the regression tests detect accidental reuse.

This verifies the wrapper's behavior and upstream API compatibility. It does
not simulate UART packet timing, sensor optics or a connected fingerprint
sensor. The separate AVR compile checks must build generated sketches for
Uno, Nano and Leonardo using the real upstream implementation and core.
