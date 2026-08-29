# PetroVale SDN Design Workshop

## Scenario

PetroVale Energy has completed the SDN concept workshop and is now running a design workshop for the same corporation.

The target design direction is:

- Data center first: Cisco ACI.
- WAN second: Cisco SD-WAN.
- Campus third: Cisco SD-Access.
- Identity and policy across domains: Cisco ISE, 802.1X, AD group lookup, SGT assignment, and enforcement where supported.

## Brownfield Network

Data center:

- Two data centers operate independently.
- Each data center uses traditional two-tier switching.
- The data center core is the default gateway for all VLANs.
- Internet access uses one active/standby firewall pair with a default route.
- WAN routers at each data center connect to remote offices and factories.
- Data center routing and WAN routing are OSPF area 0.

WAN:

- Two Layer 3 MPLS VPN providers.
- Providers require OSPF route exchange.
- Remote offices and factories use dedicated OSPF area numbers.
- No application-aware routing.

Campus:

- One main campus.
- Building 1 has the core and directly attached local access switches.
- Building 2 has a distribution pair using HSRP as default gateway for building access switches.
- Building 1 core and Building 2 distribution use EIGRP.
- Redistribution between EIGRP and OSPF occurs at Building 1 core.

Remote sites and factories:

- Five branches/remote locations and two factories.
- Each site has its own core running OSPF.
- OT network is currently extended Layer 2.

Monitoring:

- Basic NMS uses SNMP.
- Syslog is stored on a separate server.

## Current Segmentation Problems

- Segmentation is based on VLANs and 5-tuple ACLs on core, distribution switches, WAN routers, and firewalls.
- No identity per user or IoT device.
- No microsegmentation.
- No macro segmentation between corporate and contractor networks.
- User moves require IT to trace outlet and switch port, then manually change VLAN.
- Data center has ACLs only for north-south traffic on WAN routers and internet firewall.
- No east-west ACL within the data center.
- VLAN and port assignment are manual.
- Data center still uses STP, wasting bandwidth and causing slow convergence during failures.

## Target Design Assumptions

- ACI uses one tenant and two VRFs: Corp and Contractor.
- ACI uses application-centric segmentation through EPGs and contracts.
- SD-WAN uses two virtual networks: Corp and Contractor.
- SD-Access uses macro segmentation through virtual networks and microsegmentation through ISE/SGT.
- Users authenticate through 802.1X.
- AD group information is used by ISE policy.
- ISE instructs the access switch to apply authorization and mark traffic with the appropriate SGT.
- SGT is used for enforcement across the network where supported by campus, WAN, data center, and security design.
- IoT devices are classified by MAC address in phase one; profiling is planned in later phases.

## Question Set Summary

The web page contains 33 decisions covering:

- Brownfield design constraints.
- Correct ACI, SD-WAN, and SD-Access diagrams.
- ACI tenant, VRF, EPG, contract, and L3Out design.
- OSPF coexistence with ACI and SD-WAN.
- Data center migration diagrams.
- WAN overlay, macro segmentation, enforcement, and application-aware routing.
- Campus SDA architecture, 802.1X, AD, ISE, and SGT assignment.
- Macro and micro segmentation decisions.
- Factory and IT/OT boundary design.
- End-to-end traffic-flow selection.
- Cross-domain enforcement and assurance design.
- Design sequence and executive summary.

The final web page displays score, missed decisions, recommended answers, and explanations.
