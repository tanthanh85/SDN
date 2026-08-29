# PetroVale Chapter 3 ACI Implementation Lab

This folder contains a guided web lab for configuring the DC1 baseline on an instructor-provided Cisco ACI Simulator VM.

## Lab Scope

- Instructor-gated ACI Simulator initial pod setup, APIC out-of-band access, and simulated switch registration.
- Access and baseline recording without storing credentials.
- VLAN pool, domain, AAEP, and interface attachment policy.
- One tenant with Corp and Contractor VRFs.
- Representative network-centric bridge domains and EPGs with one-to-one VLAN mapping.
- Filters and contracts representing the larger production policy set.
- L4-L7 firewall device definition, service graph, contract attachment, and device-selection policy.
- Separate Corp and Contractor eBGP L3Out boundaries using instructor-assigned parameters.
- Two production-VLAN migration objects that preserve existing subnets.
- Terraform installation on Ubuntu and a controlled Cisco ACI provider exercise for repeatability and scale.
- Validation, evidence capture, handover, and instructor-directed cleanup.
- Explicit APIC GUI navigation, dialog fields, submit actions, and verification checkpoints for learners who are new to ACI.
- A logical policy diagram showing the tenant, VRFs, bridge domains, EPGs, contracts, and external routing boundaries.
- A service-insertion diagram showing the consumer EPG, contract, firewall graph, device cluster, selection policy, and provider EPG.
- Seven task-specific stakeholder records covering only material implementation constraints, terminology confusion, operational risk, and acceptance concerns.

Progress and worksheet values are stored only in the learner's browser local storage. Passwords are never requested or stored.

## Run

```bash
python3 -m http.server 8767 --bind 127.0.0.1
```

Open `http://127.0.0.1:8767/`.

The APIC URL, credentials, node and interface assignments, VLAN range, subnets, BGP parameters, tested Terraform provider version, physical-domain DN, and static-path DN are provided by the instructor.
