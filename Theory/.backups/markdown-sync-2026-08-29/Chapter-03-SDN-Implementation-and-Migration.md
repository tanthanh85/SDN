# Chapter 3 - SDN Implementation and Migration

## 1. Chapter Introduction and Positioning

Chapter 1 established SDN concepts and architecture. Chapter 2 translated those concepts into design decisions: domains, underlay, overlay, segmentation, routing boundaries, service insertion, identity, resiliency, and design trade-offs.

Chapter 3 focuses on implementation and migration:

> How do we move from an approved SDN design to a production deployment without losing control of reachability, policy, visibility, rollback, or operational ownership?

This chapter is written for experienced network engineers and architects who need a practical implementation playbook for brownfield enterprise environments. It does not assume a greenfield network. Most real SDN projects must coexist with existing routing, VLANs, VRFs, firewalls, monitoring tools, IP addressing, operational processes, and business change windows.

## 2. Learning Objectives

After completing this chapter, participants should be able to:

- Convert an SDN high-level design into implementation work packages.
- Build a readiness checklist for underlay, controller, identity, policy, routing, security, and telemetry.
- Explain phased SDN migration approaches for campus, data center, WAN overlay, cloud, and IT/OT environments.
- Implement safe brownfield integration boundaries between SDN and traditional networks.
- Plan migration waves based on dependency clarity, rollback feasibility, support readiness, and business risk.
- Define pre-checks, post-checks, success criteria, rollback triggers, and handover artifacts.
- Identify common implementation failure modes and reduce risk before production cutover.

## 3. Implementation and Migration Lifecycle

An SDN implementation should be treated as a controlled lifecycle, not a single installation activity. The same lifecycle applies whether the first domain is a campus fabric, data center fabric, WAN overlay, cloud network, or OT segmentation project.

![SDN Implementation and Migration Lifecycle](../Assets/Chapter-03/sdn-implementation-migration-lifecycle.png)

### 3.1 Lifecycle Workflow

```mermaid
flowchart LR
    A["Design baseline"] --> B["Readiness assessment"]
    B --> C["Build lab / staging"]
    C --> D["Pilot domain"]
    D --> E["Brownfield integration"]
    E --> F["Controlled migration"]
    F --> G["Validation and rollback"]
    G --> H["Production handover"]
    G -. "Lessons learned" .-> D
    G -. "Design correction" .-> A
```

### 3.2 Implementation Principle

The goal is not to make the first cutover impressive. The goal is to make it boring.

A strong implementation has these properties:

- The scope is clear.
- The current state is baselined.
- The change steps are reversible or at least recoverable.
- Pre-checks prove that the environment is ready.
- Post-checks prove that the intended outcome works.
- Monitoring is active before the cutover starts.
- The rollback trigger is agreed before the change window.
- The operations team receives usable documentation, not only a project closure note.

## 4. From Design to Implementation Work Packages

The approved design from Chapter 2 should be decomposed into work packages. Each work package should have an owner, prerequisite, validation method, and rollback approach.

| Work package | Typical owner | Implementation output |
|---|---|---|
| Controller platform | Network platform team | Installed controller cluster, certificates, backups, RBAC, system health validation. |
| Underlay readiness | Routing/switching team | Routed reachability, MTU validation, NTP/DNS/AAA/SNMP/syslog, software baseline. |
| Fabric or overlay | SDN implementation team | Fabric nodes onboarded, overlay tunnels established, endpoint discovery working. |
| Identity integration | Security/access team | NAC/AAA integration, group mappings, fallback behavior, test identities. |
| Segmentation policy | Network/security architects | VRFs/VNs/EPGs/groups/contracts/firewall rules mapped to approved policy matrix. |
| Routing boundary | Network architecture team | BGP/OSPF/static route exchange, summarization, route leaking, default route behavior. |
| Security services | Security operations | Firewall/service insertion, NAT, inspection, logging, failover behavior. |
| Telemetry and monitoring | NOC/operations | Dashboards, alerts, flow logs, controller health, service baselines. |
| Change and rollback | Project/change manager | Runbook, maintenance window, communication plan, rollback criteria. |
| Handover | Operations and architecture | As-built diagrams, operational procedures, known limitations, escalation paths. |

### 4.1 Implementation Readiness Gate

Do not start production migration until these questions can be answered:

- What exact devices, sites, users, segments, or applications are in scope?
- Which existing services must continue during the change?
- Which routes will be advertised, withdrawn, filtered, or leaked?
- Which policies will be enforced by the fabric, firewall, cloud, or identity platform?
- Which telemetry confirms success?
- Which alarms are expected during the change?
- Who can approve rollback?
- How long can troubleshooting continue before rollback is mandatory?
- Which team owns the system after handover?

## 5. Readiness Assessment

Readiness assessment confirms that the target environment can support the implementation. It is different from design discovery. Discovery asks, "What exists?" Readiness asks, "Can this environment safely accept the new SDN behavior?"

### 5.1 Technical Readiness Checklist

| Area | Readiness questions | Risk if skipped |
|---|---|---|
| Hardware | Are platforms supported for the required SDN role? | Unsupported features or unstable behavior. |
| Software | Are versions aligned with validated release guidance? | Controller/device compatibility problems. |
| Licensing | Are required features licensed before cutover? | Deployment blocked during change window. |
| Underlay | Is IP reachability stable between nodes and controllers? | Overlay instability and false controller troubleshooting. |
| MTU | Has encapsulation overhead been tested end to end? | Intermittent application failure or fragmentation. |
| Time/DNS | Are NTP and DNS reliable? | Certificate, logging, authentication, and telemetry issues. |
| AAA/RBAC | Are admin roles and service accounts defined? | Excessive privilege or blocked operations. |
| Identity | Are user/device groups accurate and tested? | Incorrect segmentation and access policy. |
| Addressing | Are IP pools, loopbacks, transport blocks, and summaries reserved? | Overlap, route churn, or later renumbering. |
| Monitoring | Are baseline dashboards and alerts active before change? | No evidence during failure analysis. |

### 5.2 Operational Readiness Checklist

| Area | Required evidence |
|---|---|
| Change process | Approved change record with implementation and rollback steps. |
| Support model | Named owners for controller, fabric, identity, firewall, routing, and monitoring. |
| Escalation | Contact list and bridge process for the change window. |
| Documentation | Current-state and target-state diagrams. |
| Backups | Controller, device, firewall, and policy backups completed and restorable. |
| Training | Operations team can perform basic health checks and first-level triage. |
| Tool access | Engineers have working access to controller, CLI, monitoring, identity, firewall, and logging tools. |

## 6. Lab, Staging, and Proof of Implementation

Production cutovers should not be the first time the implementation steps are executed.

### 6.1 Staging Goals

- Validate controller installation and clustering.
- Validate device onboarding.
- Validate certificates and secure control channels.
- Validate templates, profiles, sites, pools, VNIs, VRFs, endpoint groups, and policy objects.
- Validate route exchange between SDN and traditional routing.
- Validate security service insertion.
- Validate monitoring, logs, events, and telemetry.
- Measure how long implementation and rollback steps take.

### 6.2 Staging Topology Pattern

```mermaid
flowchart LR
    subgraph Lab["Lab / Staging"]
        Ctrl["Controller / Orchestrator"]
        Edge1["Fabric / Overlay Node 1"]
        Edge2["Fabric / Overlay Node 2"]
        Border["Border Node"]
        FW["Firewall / Service"]
        Legacy["Traditional Router"]
        H1["Test Endpoint"]
        App["Test Application"]
    end

    Ctrl --> Edge1
    Ctrl --> Edge2
    Ctrl --> Border
    H1 --> Edge1
    Edge1 --> Border
    Border --> FW
    FW --> Legacy
    Legacy --> App
```

### 6.3 What to Prove Before Production

| Test | Success criteria |
|---|---|
| Controller health | Cluster healthy, backups configured, time synchronized, certificates valid. |
| Device onboarding | Devices appear in inventory with correct role and software state. |
| Underlay | Nodes reach each other and controller with expected MTU and routing. |
| Overlay | Tunnels or fabric adjacencies form and recover after failure. |
| Segmentation | Users/workloads enter intended segment and cannot access denied segments. |
| Boundary routing | Routes are exchanged, filtered, summarized, and withdrawn as expected. |
| Security insertion | Required flows traverse firewall/services with logging. |
| Failure | Link/node/controller/service failure behavior matches design assumptions. |
| Rollback | Rollback steps restore the known-good state within the allowed time. |

## 7. Brownfield SDN Integration Boundary

Most SDN projects begin beside an existing network. The integration boundary is where the new SDN domain exchanges traffic, routes, policy, and operational responsibility with the traditional network.

![Brownfield SDN Integration Boundary](../Assets/Chapter-03/sdn-brownfield-integration-boundary.png)

### 7.1 Boundary Implementation Workflow

```mermaid
flowchart TB
    A["Define boundary ownership"] --> B["Select routing protocol and peers"]
    B --> C["Define prefixes to advertise"]
    C --> D["Define prefixes to receive"]
    D --> E["Apply filtering and summarization"]
    E --> F["Define service insertion path"]
    F --> G["Validate symmetry and failover"]
    G --> H["Monitor both sides of boundary"]
```

### 7.2 Boundary Controls

| Control | Implementation guidance |
|---|---|
| Route scope | Advertise only required prefixes; avoid leaking broad internal routes into early pilots. |
| Route filtering | Use prefix lists, route maps, tags, communities, or controller policy where supported. |
| Default route | Be explicit about which segment receives which default route. |
| Route leaking | Implement only approved inter-segment flows; document each leak. |
| Firewall path | Keep stateful inspection symmetric. Validate active/standby and active/active behavior. |
| NAT | Use NAT only where needed; document translation ownership and logging. |
| DNS | Validate that endpoints resolve destinations appropriate for their new segment and location. |
| Monitoring | Collect controller, device, firewall, routing, and application evidence. |

### 7.3 Common Boundary Failure Modes

| Failure mode | Typical cause | Prevention |
|---|---|---|
| One-way traffic | Asymmetric routing through firewall | Validate forward and return path before cutover. |
| Unexpected access | Overbroad route leak or firewall rule | Use policy matrix and least-prefix advertisement. |
| Application timeout | MTU issue across overlay/service path | Test payload size and PMTUD behavior. |
| Endpoint unreachable | Missing default route or route filter | Compare pre/post routing table and endpoint path. |
| Wrong policy | Incorrect identity or group mapping | Test identity cases before production users move. |
| No useful telemetry | Monitoring configured after cutover | Enable dashboards and logs before migration. |

## 8. Migration Strategy

SDN migration is usually gradual. A phased approach reduces business risk and gives operations teams time to build confidence.

```mermaid
flowchart LR
    A["Assess current network"] --> B["Standardize inventory, naming, IP plan"]
    B --> C["Improve visibility and backups"]
    C --> D["Build staging environment"]
    D --> E["Pilot one SDN domain"]
    E --> F["Validate operations and security"]
    F --> G["Expand by site, segment, or application"]
    G --> H["Integrate multiple domains"]
    H --> I["Optimize and automate deeper workflows"]
```

### 8.1 Phase 0: Assessment and Baseline

Collect and verify:

- Device inventory and software versions.
- Hardware capability and support status.
- Topology and cabling.
- IP plan and summarization.
- VLAN, VRF, and security-zone mapping.
- Routing protocols, redistribution, default routes, and route filters.
- Firewall policies, NAT, proxies, and service insertion.
- WAN circuits and cloud connectivity.
- Application dependencies.
- Identity sources and group mappings.
- Existing monitoring and logging.
- Known pain points and incident history.

### 8.2 Phase 1: Standardization

Before SDN, clean up the basics:

- Naming conventions.
- Site codes.
- Device role definitions.
- IP address management.
- VLAN and VRF standards.
- Loopback and transport addressing.
- NTP, DNS, AAA, SNMP/syslog, certificates.
- Configuration backup process.
- Monitoring registration.
- Change templates and runbook format.

This phase is not glamorous, but it prevents expensive troubleshooting later.

### 8.3 Phase 2: Staging and Pilot

Good pilot candidates:

- A new site or building.
- A small non-critical application zone.
- A lab data center pod.
- Guest access segmentation.
- A limited IoT group.
- A small branch or representative remote site.

Avoid starting with:

- Core production data center migration.
- Safety-critical OT systems with unclear dependencies.
- Highly customized legacy sites.
- Environments with poor documentation.
- Applications whose owners cannot validate behavior during the change window.

### 8.4 Phase 3: Controlled Expansion

Expand only after the pilot has proven:

- The implementation runbook is accurate.
- The rollback process is tested.
- Operations can monitor the new domain.
- Security policy behaves as intended.
- Routing boundaries are predictable.
- Application owners can validate success.
- Support teams understand escalation paths.

### 8.5 Phase 4: Multi-Domain Integration

After one domain is stable, integrate additional domains deliberately:

- Campus fabric to data center fabric.
- Campus or branch to WAN overlay.
- Data center fabric to cloud transit.
- Fabric segmentation to firewalls.
- Identity platform to access and security policy.
- Telemetry to assurance and SIEM/SOAR.

The implementation risk increases when multiple controllers, teams, and policy models interact. Add one integration at a time when possible.

## 9. Migration Waves and Change Windows

Migration waves group changes by risk, dependency, and operational readiness.

![SDN Migration Waves and Change Windows](../Assets/Chapter-03/sdn-migration-waves-change-windows.png)

### 9.1 Wave Selection Criteria

| Criterion | Why it matters |
|---|---|
| Business impact | Low-impact services are better for early waves. |
| Dependency clarity | Unknown dependencies create surprise outages. |
| Rollback feasibility | Early waves should have simple and fast rollback. |
| Monitoring coverage | Teams need evidence during and after change. |
| Support readiness | Operations must be ready before production users are moved. |
| Representative value | A pilot should teach something useful for later waves. |

### 9.2 Migration Wave Template

| Wave | Scope | Primary goal | Exit criteria |
|---|---|---|---|
| Wave 0 | Discovery, standards, staging | Prepare environment and process | Readiness gate passed. |
| Wave 1 | Low-risk pilot | Validate implementation method | Pilot success criteria met; rollback tested. |
| Wave 2 | Department, building, app zone, or selected site group | Expand pattern under controlled risk | Service validation passed; operations comfortable. |
| Wave 3 | Critical service expansion | Move important services with mature process | Business sign-off and stable operations. |

### 9.3 Change Window Structure

```mermaid
gantt
    title Example SDN Migration Change Window
    dateFormat  HH:mm
    axisFormat  %H:%M
    section Prepare
    Open bridge and confirm owners      :a1, 20:00, 15m
    Freeze baseline and backups         :a2, after a1, 20m
    Run pre-checks                      :a3, after a2, 25m
    section Execute
    Apply SDN change                    :b1, after a3, 45m
    Validate routing and policy         :b2, after b1, 30m
    Application validation              :b3, after b2, 30m
    section Decide
    Go / rollback decision              :c1, after b3, 15m
    section Stabilize
    Monitor and communicate             :d1, after c1, 60m
```

## 10. Implementation Patterns by SDN Domain

### 10.1 Data Center Fabric Implementation

Common implementation sequence:

1. Build controller cluster and management connectivity.
2. Prepare underlay addressing, routing, NTP, DNS, AAA, and MTU.
3. Onboard leaf and spine switches.
4. Create tenants, VRFs, bridge domains, endpoint groups, contracts, or equivalent policy objects.
5. Configure external connectivity and route exchange.
6. Integrate firewalls, load balancers, or service chains.
7. Migrate non-critical workloads or application tiers.
8. Validate endpoint learning, routing, policy, and application flows.

Practical trade-offs:

- L2 extension can simplify workload migration but extends failure domains.
- L3 migration is cleaner but may require application or DNS changes.
- Policy-first deployment improves security but requires dependency discovery.
- Monitor-first deployment reduces outage risk but delays strict enforcement.

### 10.2 Campus Fabric Implementation

Common implementation sequence:

1. Prepare controller, identity platform, sites, hierarchy, and credentials.
2. Validate access switch hardware and software support.
3. Define IP pools, virtual networks, scalable groups, and border roles.
4. Integrate AAA/NAC and test endpoint classification.
5. Onboard a limited fabric area or building.
6. Migrate test users, guest users, or a limited device group.
7. Validate wired and wireless behavior, policy, roaming, DHCP, DNS, and internet access.
8. Expand by building, floor, or user/device group.

Practical trade-offs:

- Identity-based segmentation is powerful, but only if identity data is accurate.
- A limited pilot should include real endpoint diversity: laptops, phones, printers, cameras, and unmanaged devices.
- Guest and IoT are often good early use cases because the expected policy is clear.

### 10.3 WAN Overlay Implementation

Common implementation sequence:

1. Prepare controller/orchestrator access, certificates, organization/site structure, and templates.
2. Validate transport circuits and underlay reachability.
3. Install edge devices in parallel where possible.
4. Build secure overlay tunnels.
5. Advertise a limited set of prefixes.
6. Apply application and segmentation policies.
7. Move selected traffic classes first.
8. Expand to additional sites and cloud/security on-ramps.

Practical trade-offs:

- Parallel deployment reduces risk but increases temporary complexity.
- Full site cutover is simpler operationally but has higher blast radius.
- Direct internet access improves SaaS performance but requires strong security inspection and logging.

### 10.4 Cloud Network Implementation

Common implementation sequence:

1. Define account/subscription/project structure.
2. Build hub, spoke, transit, or cloud WAN model.
3. Implement IP addressing, route tables, security groups, firewalls, and private endpoints.
4. Connect to enterprise network through controlled transit.
5. Validate route propagation and segmentation.
6. Implement infrastructure-as-code for repeatability.
7. Enable cloud flow logs and security logging.

Practical trade-offs:

- Cloud-native controls are fast and flexible, but each cloud has different constructs.
- Third-party cloud networking can improve consistency but adds platform dependency.
- Infrastructure-as-code is valuable, but state management and review process must be controlled.

### 10.5 IT/OT Implementation

Common implementation sequence:

1. Perform passive discovery of assets and flows.
2. Define zones, conduits, and critical services.
3. Build monitoring before enforcement.
4. Implement controlled boundary firewalls or gateways.
5. Allow required historian, engineering workstation, and vendor-access flows.
6. Validate with OT owners during approved maintenance windows.
7. Expand enforcement slowly.

Practical trade-offs:

- Strict allow lists improve security but can disrupt poorly documented processes.
- Passive monitoring should precede active enforcement.
- Safety and availability must override aggressive automation goals.

## 11. Cutover Validation and Rollback

Rollback is not a sign of failure. Rollback is a safety control that makes controlled change possible.

![SDN Cutover Validation and Rollback Decision Flow](../Assets/Chapter-03/sdn-cutover-validation-rollback-flow.png)

### 11.1 Cutover Decision Flow

```mermaid
flowchart TB
    A["Freeze baseline and backups"] --> B["Run pre-checks"]
    B --> C{"Pre-checks passed?"}
    C -- "No" --> D["Stop change and fix readiness"]
    C -- "Yes" --> E["Execute implementation steps"]
    E --> F["Run post-checks"]
    F --> G{"Success criteria met?"}
    G -- "Yes" --> H["Monitor and hand over"]
    G -- "No" --> I["Troubleshoot within timebox"]
    I --> J{"Critical impact or timebox exceeded?"}
    J -- "No" --> F
    J -- "Yes" --> K["Execute rollback"]
    K --> L["Validate restored service"]
    L --> M["Document RCA and lessons learned"]
```

### 11.2 Pre-Check Examples

| Area | Pre-check |
|---|---|
| Controller | Cluster healthy, database healthy, certificate status normal, backups complete. |
| Devices | Target devices reachable, correct software, correct role, no critical alarms. |
| Underlay | Required loopbacks and transport paths reachable with correct MTU. |
| Routing | Current route table and default route captured; expected neighbors up. |
| Identity | Test user/device maps to expected group or segment. |
| Security | Firewall policy staged, NAT ready, logging enabled. |
| Monitoring | Dashboards active, alert routing confirmed, baseline captured. |
| Application | Application owner available; baseline transaction tested. |

### 11.3 Post-Check Examples

| Area | Post-check |
|---|---|
| Endpoint | Endpoint onboarded into correct segment/group. |
| Routing | Expected routes advertised and received; unexpected routes absent. |
| Policy | Allowed flows work; denied flows fail as expected. |
| Firewall | Traffic uses intended firewall/service path; logs confirm rule hit. |
| Application | Critical transactions succeed from migrated endpoint/site/workload. |
| Performance | Latency, loss, jitter, CPU, memory, and interface counters within threshold. |
| Telemetry | Controller, device, flow, firewall, and application evidence available. |
| User experience | Pilot users confirm expected access and performance. |

### 11.4 Rollback Types

| Rollback type | Description | Use when |
|---|---|---|
| Configuration rollback | Restore previous controller/device/firewall configuration. | Change is configuration-only and previous state is known. |
| Routing rollback | Withdraw new routes or restore old route preference. | Traffic can be moved back through routing control. |
| Physical rollback | Move cable, gateway, or service attachment back. | Migration used physical path changes. |
| Policy rollback | Disable or revert new policy enforcement. | Policy blocks required traffic. |
| DNS or application rollback | Restore previous destination or service endpoint. | Application cutover changed name resolution or service mapping. |
| Operational rollback | Stop migration wave and return to monitoring-only mode. | The system is stable but not ready for more migration. |

### 11.5 Rollback Triggers

Rollback should be triggered when:

- Critical application transactions fail and cannot be restored within the timebox.
- A security policy exposes access that should be denied.
- Routing instability affects users outside the migration scope.
- Firewall or service insertion causes widespread asymmetric traffic.
- Monitoring cannot confirm the actual state.
- The support team cannot isolate the issue before the decision deadline.

## 12. Validation Matrix

A validation matrix connects requirements, technical checks, and evidence.

| Requirement | Validation method | Evidence |
|---|---|---|
| Corporate users reach ERP | Test transaction from migrated endpoint | Screenshot/log of successful login and transaction. |
| Guest cannot reach internal network | Attempt access to internal test prefix | Denied flow log and failed reachability test. |
| OT PLC reaches historian only | Protocol-specific test | Firewall log and historian event. |
| Routes are scoped | Compare route table before and after | Captured prefixes and neighbor state. |
| Firewall inspection active | Confirm rule hit and session table | Firewall logs and session output. |
| Overlay stable | Check tunnel/fabric health | Controller health and path trace. |
| Performance acceptable | Compare baseline and post-change metrics | Latency/loss/jitter/application response dashboard. |

## 13. Change Runbook Structure

An SDN implementation runbook should be concise enough to execute under pressure and detailed enough to avoid improvisation.

### 13.1 Runbook Sections

| Section | Content |
|---|---|
| Scope | Sites, devices, users, workloads, segments, routes, policies in scope. |
| Out of scope | Explicitly list systems that must not be changed. |
| Prerequisites | Readiness items, approvals, backups, access, support contacts. |
| Current state | Diagrams, routes, policies, monitoring baseline. |
| Target state | Expected routes, segments, policies, traffic paths, dashboards. |
| Implementation steps | Ordered commands, controller actions, or workflow tasks. |
| Pre-checks | Tests that must pass before change execution. |
| Post-checks | Tests that prove success. |
| Rollback plan | Steps, owner, trigger, estimated duration. |
| Communication | Stakeholders, status update times, escalation bridge. |
| Handover | As-built updates, known issues, monitoring ownership. |

### 13.2 Change Record Quality

Weak change record:

> Migrate building to SDN fabric.

Strong change record:

> Migrate Building A floor 2 employee wired VLANs from traditional access switching to campus fabric. Scope includes access switches A2-01 to A2-06, Corporate virtual network, employee identity group, DHCP relay update, route advertisement from fabric border to core, and firewall path for internal applications. Guest and IoT are out of scope. Rollback is restoring uplinks to traditional distribution and disabling fabric edge onboarding for the target switches.

The strong version states scope, boundary, policy, route behavior, exclusions, and rollback.

## 14. Implementation Risk Register

| Risk | Early warning sign | Mitigation |
|---|---|---|
| Underlay instability | Packet loss, flapping links, inconsistent MTU | Fix underlay before overlay migration. |
| Policy misclassification | Endpoint appears in wrong group | Test identity mappings and fallback behavior. |
| Route leakage | Unexpected prefixes appear in another segment | Apply route filters and compare route tables. |
| Asymmetric firewall path | Sessions appear half-open or reset | Validate forward/return path and routing preference. |
| Controller task failure | API or GUI task accepted but device state unchanged | Track task status and perform post-change device validation. |
| Monitoring blind spot | No logs from new SDN domain | Integrate telemetry before cutover. |
| Application dependency unknown | App fails despite basic ping working | Baseline real application transactions and flows. |
| Rollback too slow | Steps are manual and untested | Rehearse rollback in staging. |

## 15. Implementation Anti-Patterns

Avoid these common mistakes:

- Treating controller installation as the same thing as production readiness.
- Migrating critical users or workloads before telemetry is active.
- Advertising broad route summaries from a pilot domain.
- Reusing old VLAN names as the new policy model without reviewing intent.
- Enforcing strict policy before application dependencies are understood.
- Using personal admin accounts for controller or API actions.
- Assuming a successful controller task means the data plane changed correctly.
- Writing a rollback plan that nobody has tested.
- Expanding to the second domain before the first domain is operationally stable.

## 16. Production Handover

Implementation is not complete when traffic passes. It is complete when operations can support the system.

### 16.1 Handover Artifacts

| Artifact | Purpose |
|---|---|
| As-built topology | Shows actual deployed nodes, links, roles, and boundaries. |
| Segment and policy matrix | Explains who can communicate with what and where enforcement happens. |
| Routing table summary | Documents advertised and received prefixes at each boundary. |
| Controller operations guide | Covers health checks, backups, certificates, RBAC, and common tasks. |
| Monitoring dashboard map | Shows where to view health, traffic, policy, and alerts. |
| Troubleshooting flow | Helps NOC isolate underlay, overlay, policy, identity, and service issues. |
| Known limitations | Lists exceptions, deferred items, and operational caveats. |
| Support ownership | Defines who owns controller, fabric, identity, firewall, cloud, and automation. |

### 16.2 Initial Stabilization Period After Migration

Monitor closely for:

- Authentication failures.
- Endpoint classification changes.
- Route churn.
- Tunnel or fabric instability.
- Firewall denies for expected application flows.
- Application latency changes.
- Controller task failures.
- Configuration drift.
- Helpdesk ticket patterns.

Early operational feedback should improve the next migration wave.

## 17. Cisco and Industry Implementation Notes

| Segment | Cisco implementation focus | Comparable industry implementation focus |
|---|---|---|
| Data center fabric | APIC/Nexus Dashboard readiness, leaf-spine onboarding, tenants/VRFs/EPGs/contracts, L3Out, service insertion | VMware NSX transport nodes and distributed firewall, Juniper Apstra blueprint deployment, Arista CloudVision EVPN/VXLAN provisioning |
| Campus fabric | Catalyst Center, fabric roles, IP pools, virtual networks, ISE integration, border/control/edge readiness | Aruba Central/NetConductor policy, Juniper Mist campus operations, ExtremeCloud IQ onboarding and policy |
| WAN overlay | Controller reachability, templates, certificates, secure tunnels, route advertisements, application policy | Fortinet, Prisma SD-WAN, EdgeConnect, VeloCloud, Versa template and overlay deployment models |
| Cloud networking | Cisco cloud networking integrations where used, enterprise route/security policy alignment | AWS/Azure/GCP native networking, Terraform providers, cloud firewalls, transit gateways/cloud WAN |
| Security integration | ISE, firewalls, security analytics, logging, and segmentation policy consistency | ClearPass, FortiNAC, Palo Alto, Zscaler/Netskope/Cato, SIEM/SOAR integrations |

The implementation method differs by platform, but the migration controls stay consistent: baseline, stage, pilot, validate, rollback, document, hand over.

## 18. Implementation Deep Dive: Data Center ACI Migration

The following implementation analysis applies the chapter method to the corporation's first production domain. Both data centers are planned for ACI, but Data Center 1 is implemented first. The initial policy model uses one tenant, two VRFs, approximately 100 network-centric EPGs with one EPG per VLAN, an eBGP external boundary, and more than 200 contracts. A greenfield fabric is validated with new subnets before two existing VLANs enter the pilot migration.

### 18.1 Why the First Production Model Is Network-Centric

An application-centric policy model groups endpoints according to application role and expresses allowed service relationships through contracts. It offers strong long-term value, but it depends on accurate application dependency data and clear ownership. The corporation does not yet have that maturity for all existing workloads.

The network-centric starting model maps each existing VLAN to an EPG. This does not deliver the full application-centric outcome, but it provides several implementation advantages:

- Existing operational boundaries are preserved during the first migration.
- VLAN membership and default-gateway behavior remain easy to compare with the legacy network.
- Rollback can be defined per VLAN.
- Unknown application dependencies are less likely to be broken by immediate microsegmentation.
- Operations can learn the ACI object model without simultaneously redesigning every application policy.

The trade-off is policy scale. One hundred EPGs and more than 200 contracts can reproduce historical complexity if the team simply translates every ACL entry. The migration should therefore classify each contract as baseline, shared service, application dependency, external access, administrative access, or temporary exception. This classification prepares the later application-centric phase.

### 18.2 Greenfield Fabric Bring-Up Sequence

The fabric should be built and validated independently before it carries migrated workloads. A disciplined sequence is:

1. Verify rack, power, cabling, out-of-band management, console access, and hardware inventory.
2. Establish management dependencies including DNS, NTP, SMTP where used, remote logging, AAA, certificates, and backup destinations.
3. Initialize the APIC cluster and verify node discovery.
4. Register leaf and spine switches with the correct node IDs, names, roles, and pod assignment.
5. Confirm all expected fabric links and investigate unexpected or missing adjacencies.
6. Configure infrastructure access policies, interface policy groups, switch profiles, and attachment profiles.
7. Create the tenant, VRFs, bridge domains, application profiles, and test EPGs.
8. Configure the L3Out and establish eBGP with the external routers.
9. Deploy a small set of new test subnets that do not depend on legacy gateway migration.
10. Validate endpoint learning, intra-EPG behavior, contract enforcement, external routing, MTU, failure convergence, monitoring, and backup.

The sequence deliberately separates physical-fabric validation from tenant-policy validation. If both are introduced at once, a basic cabling or underlay problem can be mistaken for a policy failure.

### 18.3 Management and Operational Foundation

The APIC management network is a production dependency and must be treated as such. Before workload onboarding, the implementation team should verify:

- All APIC nodes have resilient management reachability.
- DNS forward and reverse resolution behave as required.
- NTP is synchronized and consistent with identity and logging systems.
- Administrative access uses named accounts and role-based authorization.
- Break-glass access is controlled, tested, and audited.
- Backups are scheduled and a restore procedure is documented.
- Certificates and expiration ownership are recorded.
- Syslog, SNMP, streaming telemetry, or Nexus Dashboard integrations are operational.
- Configuration changes and faults can be correlated to a common time source.

Management-plane validation should include loss of one APIC node and loss of one management path. The objective is to prove that operations retain control and evidence under failure, not only during steady state.

### 18.4 Tenant Object Construction

ACI tenant policy has a hierarchy. The implementation team should understand the purpose of each object rather than treating the GUI as a sequence of forms.

| Object | Implementation responsibility |
|---|---|
| Tenant | Administrative and policy container for the corporation's data center environment |
| VRF | Independent Layer 3 forwarding and route-control domain; Corporate and Contractor are isolated here |
| Bridge domain | Layer 2 forwarding and subnet/gateway context associated with one VRF |
| Subnet | Anycast gateway and routing advertisement behavior for the bridge domain |
| Application profile | Organizational container for related EPGs |
| EPG | Endpoint classification and policy attachment point; initially aligned one-to-one with a VLAN |
| Contract | Permitted relationship between provider and consumer EPGs or external networks |
| L3Out | External routed connection, protocol policy, external EPG classification, and route exchange |

Naming should encode meaning without embedding transient details. Names should be predictable for humans and automation. For example, VRF names may represent trust domains, while EPG names combine service role and current network identifier. Object descriptions should record owners, purpose, and migration state.

### 18.5 Bridge Domain and Subnet Decisions

Each pilot VLAN is mapped to a bridge domain and EPG. The bridge domain design must specify:

- Associated VRF.
- Whether unicast routing is enabled.
- The preserved anycast gateway address.
- ARP flooding and unknown-unicast behavior appropriate to endpoint characteristics.
- Endpoint retention and movement considerations.
- Whether the subnet is advertised externally.
- DHCP relay and other gateway-adjacent services.

Preserving the subnet reduces endpoint changes, but preserving the subnet does not mean preserving every legacy behavior. The implementation team must compare SVI ACLs, helper addresses, first-hop redundancy configuration, gratuitous ARP behavior, multicast dependencies, and monitoring. Anything attached to the old SVI must either be recreated, replaced by ACI policy, or explicitly retired.

### 18.6 L3Out and eBGP Implementation

The external routed boundary connects the new fabric to the existing data center core, WAN, firewalls, and shared infrastructure. eBGP provides a clear policy boundary, but it must be implemented conservatively.

The implementation package should define:

- ACI leaf nodes and interfaces providing the routed attachment.
- Point-to-point addressing and VLAN encapsulation where subinterfaces are used.
- Local and peer autonomous system numbers.
- BGP password or other session protection where required.
- Prefixes imported into each VRF.
- Tenant prefixes exported from each VRF.
- Default route handling.
- Route-control profiles and communities.
- Maximum-prefix thresholds.
- BFD and timer settings when supported and justified.
- External EPG subnet classification and contracts.

Route exchange is validated in both directions. Seeing the peer in Established state is only the first check. The team must verify the expected received and advertised prefixes, next hops, route preference, route installation, return path, and behavior after peer or link failure.

Broad external EPG definitions such as `0.0.0.0/0` simplify early testing but can unintentionally make every external destination part of the same policy group. If used, the contract scope and route-control behavior must be understood. More specific external classification may be necessary for sensitive services.

### 18.7 Contract Engineering at Scale

More than 200 contracts cannot be managed safely as anonymous one-off rules. The implementation should establish a contract model before bulk creation.

A contract consists of subjects and filters that define permitted protocols and ports. Provider and consumer relationships define direction of service use. The policy team should decide when contracts are reusable and when an application requires a dedicated contract.

Useful categories include:

- Shared infrastructure services such as DNS, NTP, directory, backup, and monitoring.
- Common web or application service patterns.
- Application-specific east-west dependencies.
- Management access from controlled administrative groups.
- External north-south access.
- Temporary migration or discovery permits with expiration dates.

Contract names should not use only port numbers. A name such as `ct-web-to-app-https8443` communicates relationship and service better than `allow-8443`. Filters should avoid unnecessary ranges. Logging and counters should be enabled where they provide operational value without overwhelming the platform.

Before enforcing the final set, the team should compare the contract matrix with observed traffic and application-owner confirmation. A temporary permit-and-observe phase may be justified for poorly documented applications, but it must have a defined duration and conversion plan.

### 18.8 Pilot Subnets and Proof of Fabric Behavior

New test subnets provide a controlled way to validate ACI before brownfield migration. Test endpoints should exercise more than same-subnet ping.

The pilot test plan should include:

- Endpoint learning on expected leaf interfaces.
- Default-gateway reachability.
- Communication within an EPG according to the chosen isolation behavior.
- Communication between EPGs with and without a contract.
- DNS, NTP, DHCP relay, and management services.
- External reachability through the L3Out.
- Return-path symmetry through stateful services.
- Failure of one leaf uplink, one border link, and one BGP peer.
- Packet sizes that validate encapsulation MTU.
- Telemetry and fault visibility in the operational tools.
- Configuration backup and audit logging.

The test endpoints should generate known transactions so that policy counters and packet captures can be interpreted. Random traffic produces poor evidence.

### 18.9 Brownfield Layer 2 Coexistence

To preserve existing subnets while endpoints move in waves, selected VLANs are extended between the legacy core/access environment and ACI through a controlled Layer 2 trunk. This link is a migration mechanism, not the target architecture.

The trunk design must define:

- Exactly which pilot VLANs are allowed.
- Which legacy and ACI interfaces participate.
- Spanning-tree interoperability and loop prevention.
- Native VLAN behavior.
- vPC or port-channel configuration where used.
- Fault monitoring and ownership.
- Removal criteria after migration.

A separate Layer 3 path between the legacy network and ACI maintains reachability for subnets whose gateways are on different sides. Mixing the Layer 2 extension and routed boundary without a clear model can create loops, duplicate gateways, or asymmetric paths.

### 18.10 Gateway Handoff for a Pilot VLAN

Gateway migration must prevent two active devices from answering for the same IP address. The runbook for each pilot VLAN should identify the legacy SVI, HSRP state where applicable, ACI bridge-domain subnet, DHCP relay, ACL replacement, static routes, and rollback commands.

A controlled handoff sequence is:

1. Freeze unrelated changes and capture current route, ARP, MAC, HSRP, interface, and application state.
2. Verify the Layer 2 trunk carries the pilot VLAN and does not create an unintended spanning-tree topology.
3. Verify the ACI bridge domain, EPG, static path or domain attachment, contracts, and L3Out reachability.
4. Confirm that the ACI gateway is not active before the handoff.
5. Shut down the legacy SVI according to the approved device sequence and confirm that no legacy node continues answering for the gateway.
6. Enable the preserved gateway address on the ACI bridge-domain subnet.
7. Clear or refresh stale ARP and neighbor state only when needed and according to the rollback plan.
8. Verify endpoint learning, default-gateway resolution, internal routes, external routes, contracts, firewall sessions, and application transactions.
9. Observe the environment for the defined stabilization interval.
10. Continue, pause, or roll back based on objective criteria.

Rollback reverses gateway ownership in a controlled order. The team disables the ACI gateway, confirms it is inactive, restores the legacy SVI and first-hop state, validates routing and applications, and records the reason for rollback. The runbook should not rely on simultaneous changes performed by uncoordinated engineers.

### 18.11 Automation and Terraform for Repeated Objects

Creating 100 EPGs and hundreds of related objects manually increases inconsistency. Terraform can model repeated ACI resources declaratively, but it should be introduced after the team understands the object relationships and has validated a small set manually.

The workflow should include:

1. Store approved object data in structured variables or a controlled source of truth.
2. Pin provider versions and protect credentials outside the configuration files.
3. Import or otherwise account for existing objects before Terraform assumes ownership.
4. Run formatting and syntax validation.
5. Generate a plan and review every create, update, and delete action.
6. Apply first to the simulator or staging environment.
7. Validate APIC objects and resulting policy behavior.
8. Apply to production in bounded batches.
9. Store state securely with locking, access control, backup, and audit history.

Terraform state is sensitive because it can contain infrastructure identifiers and values. Concurrent writers, lost state, or unmanaged GUI changes can cause drift. The governance model must define whether an object is managed by Terraform, by another automation system, or manually. Shared ownership of the same object is unsafe.

### 18.12 Cutover Evidence Package

For each migration wave, the implementation team should retain:

- Approved runbook and change record.
- Timestamped pre-check and post-check results.
- Controller task IDs and audit records.
- Before-and-after route, endpoint, and policy state.
- Application transaction results.
- Relevant fault, event, and firewall records.
- Decision log for proceed, pause, or rollback.
- Deviations from the runbook.
- Updated as-built and migration tracker.

This evidence supports operations, audit, and root-cause analysis. It also improves the next wave by revealing which checks were useful and which assumptions were wrong.

### 18.13 ACI Access-Policy Dependency Chain

An ACI endpoint cannot join an EPG merely because the EPG exists. The physical or virtual attachment must be connected through a chain of access-policy objects.

For a physical interface, the chain commonly includes:

1. A VLAN pool containing permitted encapsulation IDs.
2. A physical domain associated with the VLAN pool.
3. An Attachable Access Entity Profile associated with the domain.
4. Interface policies for speed, CDP, LLDP, LACP, MCP, storm control, and other link behavior.
5. An interface policy group collecting the required interface policies and AEP.
6. An interface profile selecting physical ports.
7. A switch profile selecting leaf nodes and associating the interface profile.
8. An EPG domain association and static path or dynamic attachment.

If one association is missing, the APIC object hierarchy may look mostly correct while the VLAN is not programmed on the interface. Troubleshooting should trace the complete relationship rather than recreating the EPG.

vPC attachments add a vPC protection group and a vPC interface policy group. The paired leafs need consistent switch profiles, peer connectivity, and interface configuration. A mismatch can produce one-sided forwarding or faults.

### 18.14 APIC Fabric Discovery and Node Registration

During fabric discovery, APIC learns switches through the infrastructure network and LLDP. The engineer assigns each discovered node a unique node ID, name, pod, and role. Incorrect IDs or cabling can create a topology different from the design.

Validation includes:

- Every leaf connects to the intended spines.
- There are no unsupported leaf-to-leaf or spine-to-spine fabric links.
- Interface speeds, transceivers, and error counters are clean.
- The infrastructure address pool is correctly sized.
- APIC nodes see consistent topology.
- Time, firmware, and hardware compatibility are validated.

The implementation record should map serial number, node ID, rack, role, management address, and connected devices. This becomes essential when investigating faults after handover.

### 18.15 Bridge Domain Forwarding Controls

ACI bridge-domain settings influence endpoint and flooding behavior. They should not be copied blindly from a template.

Important settings include:

- **Unicast routing.** Enables Layer 3 gateway behavior for configured subnets.
- **ARP flooding.** Determines whether ARP requests are flooded when the target is not resolved through endpoint information.
- **Layer 2 unknown unicast.** Can be hardware-proxy or flood behavior depending on design.
- **Endpoint retention.** Controls aging and movement behavior.
- **Limit IP learning to subnet.** Restricts learned IP addresses to configured subnet ranges where appropriate.
- **Unknown multicast flooding.** Determines replication behavior for multicast not otherwise resolved.

Hardware proxy reduces flooding by using the fabric endpoint database. Flooding can be required for unusual applications or during specific migration conditions, but it increases unnecessary traffic. The selected behavior should be validated with actual endpoint protocols.

### 18.16 Anycast Gateway and ARP Behavior

ACI provides the same gateway MAC and IP behavior across leaf switches for a bridge-domain subnet. Endpoints can move while retaining the same default gateway.

During migration, the legacy gateway and ACI anycast gateway must not be active simultaneously with the same address. Duplicate gateway responses can produce unstable ARP caches and asymmetric traffic.

After handoff, verify:

- The endpoint resolves the expected gateway MAC.
- The endpoint is learned on the correct leaf and EPG.
- The subnet is installed in the correct VRF.
- The external network learns the subnet from the expected boundary.
- Gratuitous ARP or neighbor advertisements update dependent systems.
- Firewall and load-balancer ARP state is current.

Clearing ARP everywhere should not be the default response. It can disrupt unrelated traffic. Clear only the required state after identifying where stale information exists.

### 18.17 Contract Direction and Scope

In ACI, an EPG consuming a contract initiates traffic toward the provider service described by that contract. The relationship is not simply a bidirectional ACL label.

Filters define protocol and port matching. Subjects associate filters and options. Contracts are provided and consumed by EPGs, external EPGs, or other supported objects.

The implementation must define:

- Which side is provider and which is consumer.
- Whether reverse-port filtering and established-session behavior meet the application requirement.
- Contract scope such as application profile, tenant, context, or global behavior where supported.
- Whether taboo or preferred-group behavior is used.
- How shared services are consumed across VRFs or tenants.
- Which counters and logs prove a rule match.

An application team saying "open 443 between Web and App" is incomplete. The policy owner must identify the initiator, destination service, address family, return-session expectation, and whether other ports such as DNS, health checks, or management are dependencies.

### 18.18 L3Out Object Relationships

An L3Out combines external connectivity and policy. Its hierarchy commonly includes:

- L3Out associated with one VRF.
- Logical node profile selecting border leaf nodes and router IDs.
- Logical interface profile defining routed interfaces, subinterfaces, or SVIs.
- BGP peer connectivity profile and protocol settings.
- Route-control profiles controlling import and export.
- External EPG subnets classifying external destinations for policy.
- Contracts between internal EPGs and external EPGs.

Routing and contract behavior are separate. A route can exist while policy denies traffic. A contract can exist while the route is absent. Troubleshooting must validate both.

For eBGP, verify the TCP session, negotiated address family, received and advertised prefixes, route-control matches, next-hop resolution, and installation in the VRF. The external router must also have a return route to the ACI subnet.

### 18.19 Route-Control Validation

Route policy should be tested with an explicit prefix inventory.

| Direction | Validation |
|---|---|
| Into ACI | Only approved external prefixes and defaults are imported into the correct VRF |
| Out of ACI | Only active tenant prefixes are exported; infrastructure and unintended host routes are excluded |
| Failure | Withdrawn routes disappear within the expected interval and alternate routes are selected correctly |
| Recovery | Restored routes do not create a lower-quality or asymmetric path |

Maximum-prefix protection can prevent a route leak from consuming resources. Communities can classify routes for downstream policy. Default routes should be accepted only from the intended peer and with a defined failure condition.

### 18.20 Terraform Resource Decomposition

Terraform configuration should reflect object ownership and dependency. A simplified module can separate tenant foundation, network objects, policy, and external routing.

```hcl
module "tenant_foundation" {
  source      = "./modules/tenant-foundation"
  tenant_name = "PetroVale"
  vrfs        = ["Corporate", "Contractor"]
}

module "network_epgs" {
  source     = "./modules/network-epgs"
  tenant_dn  = module.tenant_foundation.tenant_dn
  epg_data   = var.epg_data
}

module "contracts" {
  source        = "./modules/contracts"
  tenant_dn     = module.tenant_foundation.tenant_dn
  contract_data = var.contract_data
}
```

Input data should be validated before resource creation.

```hcl
variable "epg_data" {
  type = map(object({
    vrf     = string
    vlan    = number
    subnet  = string
    gateway = string
  }))

  validation {
    condition     = alltrue([for epg in values(var.epg_data) : epg.vlan >= 1 && epg.vlan <= 4094])
    error_message = "Every EPG VLAN must be in the valid operational range."
  }
}
```

Modules should expose meaningful outputs, use deterministic names, and avoid hiding critical policy behind excessive abstraction. A plan review must show which EPG, bridge domain, subnet, contract, or L3Out object changes.

### 18.21 Importing Existing ACI Objects

Terraform cannot safely assume ownership of objects that already exist without reconciling them with state and configuration. The team should:

1. Identify the exact distinguished name and provider resource type.
2. Write configuration matching the existing object.
3. Import the object into the correct state address.
4. Run a plan and investigate every proposed change.
5. Correct the configuration until the plan is empty or contains only approved differences.

Importing the parent object does not automatically import all children. The resource hierarchy must be considered. State backup is required before state movement or removal.

### 18.22 Migration Packet Walk

During coexistence, traffic between a legacy endpoint and an ACI endpoint can cross both the Layer 2 extension and the routed boundary depending on gateway placement.

For two endpoints in the same migrating subnet, traffic remains Layer 2. The source can be on a legacy switch and the destination on an ACI leaf. The frame traverses the restricted trunk. The gateway is not involved.

For endpoints in different subnets, the source sends traffic to the active gateway for its subnet. If that gateway is on the legacy core, routing occurs there and the destination may be reached through the routed ACI boundary. If the gateway has moved to ACI, ACI routes the traffic and may send it through L3Out toward a legacy subnet.

This is why gateway ownership and route advertisement must change together. Advertising a subnet from ACI while its gateway remains active only on the legacy core can create an incorrect or asymmetric path.

### 18.23 Pilot Acceptance Criteria

The pilot should have objective exit criteria:

- No critical fabric faults.
- Stable APIC cluster and backups.
- Expected endpoints learned without duplicate or rapid-move events.
- Correct VRF, bridge-domain, and EPG assignment.
- Contract permits and denies validated with counters.
- eBGP stable and prefix inventory correct.
- MTU and application transactions pass.
- Link and peer failure tests meet recovery objectives.
- Monitoring and escalation procedures used successfully by operations.
- Rollback tested or demonstrated in staging.
- Known exceptions documented with owners and dates.

Only then should the corporation increase migration-wave size.

### 18.24 Chapter Conclusion

Implementation succeeds when a correct design is converted into repeatable work packages, validated dependencies, controlled changes, and operational evidence. The controller installation is only one component. Routing, identity, policy, management services, monitoring, and people must all be ready.

The ACI pilot demonstrates the central migration principle: introduce the new control system in a bounded domain, prove it with new test networks, integrate it explicitly with the brownfield environment, and transfer production services in reversible waves. Chapter 4 begins where implementation ends by showing how the organization operates and troubleshoots the resulting system.

## 19. Review Questions

1. Why should SDN implementation begin with a readiness gate rather than controller installation?
2. What is the difference between discovery and readiness assessment?
3. Why is the underlay still a critical implementation dependency in SDN?
4. What must be validated at the boundary between an SDN domain and a traditional network?
5. Why should early migration waves have low business impact and strong rollback feasibility?
6. What are examples of useful SDN pre-checks and post-checks?
7. Why is a successful controller task not enough evidence of implementation success?
8. What can cause asymmetric traffic during brownfield SDN integration?
9. When should rollback be triggered?
10. What artifacts should be included in production handover?
11. Why is application transaction testing more useful than ping alone?
12. Which implementation risks increase when multiple SDN domains are integrated?

## 20. Key Takeaways

- SDN implementation is a controlled lifecycle: baseline, readiness, staging, pilot, integration, migration, validation, and handover.
- Brownfield boundaries require explicit routing, segmentation, security, monitoring, and ownership controls.
- Migration waves should be selected by risk, dependency clarity, rollback feasibility, monitoring coverage, and support readiness.
- Pre-checks and post-checks convert assumptions into evidence.
- Rollback must be designed and rehearsed before production cutover.
- Early pilots should prove both technology and operational support.
- Implementation is complete only when operations can monitor, troubleshoot, and own the deployed SDN domain.

## 21. References for Further Study

- Cisco, Software-Defined Access solution overview: https://www.cisco.com/site/us/en/solutions/networking/software-defined-access/index.html
- Cisco, Cisco SD-Access Solution Design Guide: https://www.cisco.com/c/en/us/td/docs/solutions/CVD/Campus/cisco-sda-design-guide.html
- Cisco, Application Centric Infrastructure overview: https://www.cisco.com/site/us/en/products/networking/cloud-networking/application-centric-infrastructure/index.html
- Cisco, Nexus Dashboard product page: https://www.cisco.com/site/us/en/products/networking/data-center-networking/nexus-dashboard/index.html
- Cisco, Catalyst SD-WAN product page: https://www.cisco.com/site/us/en/solutions/networking/sdwan/catalyst/index.html
- Cisco, Identity Services Engine product page: https://www.cisco.com/site/us/en/products/security/identity-services-engine/index.html
- VMware, NSX documentation: https://docs.vmware.com/en/VMware-NSX/index.html
- Juniper, Apstra documentation: https://www.juniper.net/documentation/product/us/en/apstra/
- Arista, CloudVision: https://www.arista.com/en/products/eos/eos-cloudvision
- Fortinet, Secure SD-WAN: https://www.fortinet.com/products/sd-wan
