<div align="center">

# AirQR -- Airgapped File Transfer

[![Version](https://img.shields.io/badge/version-1.0.0-blue?style=flat-square)](https://github.com/victoralv/airqr/releases)
[![Platform](https://img.shields.io/badge/platform-Web_PWA-4285F4?style=flat-square)](#)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)
[![Privacy](https://img.shields.io/badge/privacy-100%25_Offline--Airgapped-darkgreen?style=flat-square)](#)

Airgapped file transfer using animated QR codes.
Transfer files directly from one screen to another camera. Powered by Fountain Codes running locally on your device, ensuring complete data privacy with zero network connectivity required.

Based on [Decimen Optical Transfer](https://github.com/bashalarmistalt/decimen-optical-transfer/).

[Report an Issue](https://github.com/victoralv/airqr/issues)

[Test it live](https://victoralv.github.io/AirQR/) 

</div>

---

## Why AirQR?

| Feature | Cloud Storage | Bluetooth / AirDrop | **AirQR** |
|---|:---:|:---:|:---:|
| 100% Offline (No Internet) | ❌ | ✅ | ✅ |
| No Device Pairing/Handshake | ✅ | ❌ | ✅ |
| Cross-Platform (iOS/Android/PC) | ✅ | ❌ | ✅ |
| True Airgapped Security | ❌ | ❌ | ✅ |
| No Servers / No Tracking | ❌ | ✅ | ✅ |
| Immune to network interception | ❌ | ❌ | ✅ |

---

## Key Features

- Optical Data Transfer -- Files are encoded into a continuous stream of animated QR codes. The receiving device's camera captures these frames to mathematically reconstruct the file.
- Fountain Codes (Luby Transform) -- Powered by advanced erasure coding. It does not matter if the camera misses or drops frames; the algorithm recovers the data as long as it scans enough unique blocks.
- Zero Network Required -- The transfer is exclusively optical. Zero data is transmitted over WiFi, cellular, or Bluetooth.
- Cross-Platform PWA -- Progressive Web App (HTML/JS) that runs entirely offline in any modern browser.
- File Integrity Verification -- Built-in FNV-1a checksum validation guarantees that the reconstructed file matches the original byte-for-byte.
- Responsive UI -- Modern, gradient-pulsing interface with dark/light adaptability, real-time FPS tracking, and visual progress bars.

---

## How It Works

AirQR uses a sender-receiver architecture without traditional network protocols. It bridges the digital gap using only a screen and a camera lens.

```text
[ SENDER ]                                       [ RECEIVER ]
File Selected ──► Fountain Encoder               Camera Feed ──► QR Frame Extraction
                         │                                              │
                         ▼                                              ▼
                  QR Code Stream                 Fountain Decoder ◄── JSQR / ZXing
                  (Flashing UI)                  (Belief Propagation)   │
                         │                                              │
                         └────────► OPTICAL ◄─────────┘                 ▼
                                     LINK                        FNV-1a Checksum
                                                                        │
                                                                        ▼
                                                                  File Downloaded
```

1. Select a File: Select a file on the Sender device.
2. Encoding: The app chunks the file and generates unique blocks (Fountain Codes).
3. Flashing QRs: Blocks are drawn to a <canvas> as high-speed QR codes.
4. Scanning: The Receiver points the camera at the screen.
5. Reconstruction: As frames are captured, the decoder fills in missing pieces until the file is complete and validated.

---

## Installation & Usage

### Option 1: Web App (PWA - Cross Platform)
1. Open the AirQR website on a mobile or desktop browser.
2. Select "Install App" or "Add to Home Screen" in the browser menu.
3. Launch the app from the home screen. It will run 100% offline with camera permissions granted.
4. Select "Send File" on one device and "Receive File" on the other.

---


## Acknowledgements

This project uses [Decimen Optical Transfer](https://github.com/bashalarmistalt/decimen-optical-transfer/) as its foundational base for fountain-coded QR file transfer.

---



## Contributing

Open a Pull Request or file an Issue on GitHub.

---

<div align="center">
<sub>Built for secure, airgapped environments · 100% private · No data leaves your device</sub>
</div>
