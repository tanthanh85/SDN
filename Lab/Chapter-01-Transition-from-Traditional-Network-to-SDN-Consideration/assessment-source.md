# Transition from Traditional Network to SDN Consideration

## Scenario

PetroVale Energy is a petroleum corporation with headquarters users, branch offices, fuel terminals, refineries, data centers, cloud workloads, SaaS applications, and remote access requirements.

The current network is traditional and brownfield:

- Two independent data centers using traditional two-tier switching.
- Data center cores acting as default gateways for server VLANs.
- Active/standby internet firewall pair at each data center.
- WAN routers connected to remote offices and factories through two Layer 3 MPLS VPN providers.
- OSPF route exchange with the MPLS providers.
- Main campus with mixed two-tier and three-tier design, HSRP, EIGRP, OSPF, and redistribution.
- Branch and factory local cores running OSPF.
- OT networks extended at Layer 2.
- VLAN and 5-tuple ACL based segmentation across core, distribution, WAN routers, and firewalls.
- Basic SNMP monitoring with syslog stored on a separate server.
- Separate operational ownership across network, security, cloud, application, and refinery teams.

Business pressures:

- Site rollout takes 6 to 10 weeks.
- Guest, IoT, contractor, terminal, and OT policies differ by location.
- Firewall rules are subnet-based and not clearly tied to business intent.
- Application dependencies are incomplete.
- OT visibility is limited.
- User-to-application troubleshooting requires many tools and teams.
- Branch failover restores reachability but sometimes harms application experience.
- Data center STP wastes bandwidth and can cause slow convergence during failures.

The corporation is not deploying SDN yet. It is considering SDN as an architecture and operating model. The learner must evaluate traditional challenges, clarify SDN concepts, recognize risk, and identify which candidate domains deserve deeper design in later scenarios.

## Question Set Summary

The web page contains 33 decisions covering:

- Traditional network issues and operational challenges.
- SDN as architecture, not a single product or protocol.
- Data, control, management, and application planes.
- Underlay and overlay separation.
- Controller responsibilities and data-plane forwarding.
- Northbound, southbound, and telemetry/event interfaces.
- OpenFlow's historical role.
- Source-of-truth risk.
- Traditional vs SDN-oriented operations.
- Centralized policy benefits and blast-radius risk.
- Monitoring, observability, assurance, and telemetry.
- Candidate SDN domain fit.
- Fabric boundaries.
- IT/OT caution and passive visibility.
- Cisco solution-area mapping.
- Low-risk first steps toward automation readiness.
- First-wave SDN candidate prioritization.
- Failure impact classification across data plane, control plane, and governance.
- Evidence required before approving pilot design work.

The final web page displays score, missed decisions, recommended answers, and explanations.
