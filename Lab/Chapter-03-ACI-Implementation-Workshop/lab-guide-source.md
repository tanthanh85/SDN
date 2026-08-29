# Chapter 3: DC1 ACI Implementation Lab

## Scenario

PetroVale will upgrade both data centers to Cisco ACI. DC1 is implemented first. The production target uses one tenant, Corp and Contractor VRFs, approximately 100 network-centric EPGs, one-to-one EPG/VLAN mapping, more than 200 contracts, eBGP external routing, and a two-VLAN migration pilot that preserves existing subnets.

## Learner Role

The learner acts as PetroVale's SDN Network Architect within the IT team and configures the approved baseline on an instructor-provided ACI Simulator VM.

## Task Sequence

1. Review the implementation brief and simulator boundary.
2. Initialize the simulator pod when the instructor releases an uninitialized VM.
3. Connect and record the baseline.
4. Build fabric access-policy relationships.
5. Create the tenant and two VRFs.
6. Create greenfield bridge domains and subnets.
7. Create EPGs and static bindings.
8. Create filters, contracts, providers, and consumers.
9. Insert an instructor-assigned firewall using an L4-L7 service graph.
10. Configure separate Corp and Contractor eBGP L3Out boundaries.
11. Prepare two pilot VLANs while preserving their subnets.
12. Install Terraform on Ubuntu and deploy a controlled ACI object batch.
13. Validate ACI objects, service insertion, routing state, policy, and faults.
14. Export evidence and restore the shared lab as directed.

GUI configuration tasks include the APIC path, object-creation action, required fields, submit action, and post-configuration verification. The Terraform task provides its own Ubuntu installation, HCL, plan, apply, drift, evidence, and cleanup workflow. APIC labels may differ slightly between Basic and Advanced modes or simulator releases.

## Instructor Inputs

- APIC URL and credentials
- ACI Simulator release
- Fabric name and ID, controller count and identity, pod ID, TEP pool, infrastructure VLAN, GIPo pool, and OOB management addressing
- Student/team prefix
- Pod, node, and interface assignments
- VLAN ranges and test subnets
- Pilot VLANs, existing subnets, and gateway addresses
- Corp and Contractor local and peer ASNs, peer addressing, routed handoffs, and route-control prefixes
- Tested Cisco ACI Terraform provider version, physical-domain DN, static-path DN, and approved batch values
- Availability of simulated endpoints and external BGP peer
- L4-L7 mode, service-device domain, concrete paths, VLANs, redirect destinations, and health policy when applicable
- Approved Terraform apply, state-retention, and cleanup policy

## Safety Controls

- The web page never requests or stores a password.
- Learners use only their assigned prefix and resources.
- A small representative policy set is created; the shared simulator is not populated with the full production scale.
- Adjacency and packet outcomes are claimed only when the instructor has enabled the required simulated topology.
- The legacy and ACI gateways for a preserved subnet must not be active simultaneously.
