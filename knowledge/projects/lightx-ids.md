---
id: lightx-ids
type: project
title: LightX-IDS
alias: IDS_prototype
evolution: IDS_prototype → LightX-IDS
category: AI / ML • Cybersecurity • Industrial IoT
last_updated: 2026-10-09
---

# LightX-IDS (Evolution of IDS_prototype)

## Overview

LightX-IDS is a modular Intrusion Detection System (IDS) engineered for Industrial IoT (IIoT) environments. The project integrates an industrial digital twin simulator with real-time MQTT telemetry streaming and lightweight machine learning classifiers to detect cyberattacks on simulated industrial factory equipment.

The project represents a single unified effort whose initial foundation was implemented under the `IDS_prototype` codebase and has evolved into the `LightX-IDS` academic research project.

## Problem

Industrial IoT networks operate under strict computing constraints, limited memory, and mission-critical reliability standards. Traditional heavyweight enterprise intrusion detection engines cannot execute efficiently on constrained industrial edge devices. Furthermore, physical industrial testbeds (with operational motors, pumps, and compressors) are prohibitively dangerous and expensive to deliberately subject to cyberattacks for dataset generation and defensive modeling.

## Approach

LightX-IDS resolves these challenges by constructing a software-based Industrial Digital Twin. The digital twin simulates physical machinery and generates multi-sensor telemetry packets published over MQTT via Mosquitto. This real-time telemetry stream forms structured datasets used to train, evaluate, and serialize lightweight machine learning models (Random Forest, Decision Tree, Logistic Regression, XGBoost), advancing toward Explainable AI (XAI) feature attribution.

## Technology

- **Programming Language**: Python 3.12+
- **Messaging & Telemetry**: MQTT protocol, Eclipse Mosquitto broker, Paho MQTT client library
- **Machine Learning & Data Processing**: Scikit-Learn, XGBoost, NumPy, Pandas
- **Explainable AI (Roadmap)**: SHAP (planned for model interpretability)
- **Serving & UI (Roadmap)**: FastAPI, React, Docker

## Architecture

The system pipeline spans six core modular tiers:

1. **Factory Simulator (Digital Twin)**: Central simulation clock, behavior state machine logic, and industrial operating modes.
2. **Industrial Machinery & Sensor Modules**: 6 machine classes (Motor, Pump, Tank, Conveyor, Valve, Compressor) with 10 physical telemetry sensor types (temperature, vibration, pressure, current, RPM, fluid level, etc.).
3. **MQTT Transport Layer**: Paho MQTT publisher streaming standardized sensor payloads to Mosquitto broker topics.
4. **Dataset Pipeline & Preprocessing**: Telemetry ingestion, feature scaling, label encoding, and dataset serialization.
5. **Machine Learning IDS Engine**: Anomaly and attack classification using Decision Tree, Random Forest, and XGBoost models.
6. **Explainable AI & Monitoring Dashboard (Roadmap)**: Transparent feature attribution via SHAP and real-time security analyst visualization.

## Workflow

1. **Digital Twin Execution**: The factory simulator advances its simulation clock, transitioning machine state machines through operational states.
2. **Sensor Sampling**: Attached sensors sample synthetic physical metrics and package them into standardized JSON-compatible payloads.
3. **MQTT Transmission**: The telemetry publisher serializes sensor packets and broadcasts them to dedicated MQTT topics on the Mosquitto broker.
4. **Data Ingestion & Feature Engineering**: Subscriber modules receive the streaming telemetry, performing scaling and vectorization.
5. **Model Evaluation**: Trained classification algorithms evaluate incoming feature vectors to detect anomalous attack signatures.
6. **Interpretability & Logging**: Planned XAI routines highlight feature contributions responsible for anomaly classifications.

## Implementation

- **Industrial Digital Twin Engine**: Object-oriented machine classes and sensor frameworks accurately modeling industrial physical states.
- **MQTT Telemetry Streamer**: Continuous event-driven publisher broadcasting telemetry packets with configurable intervals.
- **ML Training Suite**: Modular training scripts with scikit-learn and XGBoost pipelines, serializing trained models for inference.
- **Academic Context**: Developed as a B.Tech academic engineering project by Palleti Vamshi (System Architecture, Machine Learning, Digital Twin) with peer collaboration (Frontend, Dataset).

## Project Structure

```
IDS_prototype/
├── backend/
│   ├── core/
│   ├── industrial/
│   │   ├── behavior/
│   │   ├── factory/
│   │   ├── machines/
│   │   ├── mqtt/
│   │   ├── sensors/
│   │   ├── simulator/
│   │   └── registry/
│   ├── preprocessing/
│   ├── ml/
│   ├── models/
│   ├── services/
│   └── utils/
├── frontend/
├── dataset/
├── requirements.txt
└── README.md
```

## Challenges

- Accurately simulating physical machine dynamics and multi-sensor correlations without physical industrial hardware.
- Maintaining low latency during continuous MQTT serialization and high-frequency sensor publishing.
- Balancing classification complexity with lightweight memory footprints suitable for edge deployment.

## Learnings

- Event-driven Python architecture and decoupling telemetry producers from ML consumers via MQTT pub/sub.
- Operational configuration and topic design in Eclipse Mosquitto.
- Comparing tree-based classifiers (Decision Trees, Random Forest, XGBoost) for tabular sensor telemetry.

## Results

Phase 1 is complete in the `IDS_prototype` repository: the factory simulator, 6 machine classes, 10 sensor types, MQTT publisher, and initial model training pipeline are fully implemented and verified. Subsequent phases focus on live real-time inference serving and explainable AI.

## Repository

- **GitHub Repository**: [https://github.com/palleti-vamshi/IDS_prototype](https://github.com/palleti-vamshi/IDS_prototype)
- **Deployment / Live URL**: Not documented yet.
