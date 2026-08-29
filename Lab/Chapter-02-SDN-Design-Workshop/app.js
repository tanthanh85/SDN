const people = {
  cio: ["Trần Minh Linh", "CIO", "Best regards,"],
  cto: ["Nguyễn Hoàng Minh", "CTO", "Regards,"],
  ciso: ["Lê Thu Trang", "CISO", "Regards,"],
  arch: ["Phạm Quỳnh Anh", "Enterprise Architect", "Regards,"],
  ops: ["Đỗ Ngọc Lan", "Director of Network Operations", "Thanks,"],
  wan: ["Trần Hải Yến", "WAN Operations Lead", "Thanks,"],
  regional: ["Phạm Thùy Dương", "VP Regional Operations", "Thank you,"],
  factory: ["Nguyễn Văn Thành", "Refinery Operations Manager", "Respectfully,"],
  cloud: ["Lê Quốc Bảo", "Cloud Platform Lead", "Thanks,"],
  automation: ["Vũ Đức Anh", "Automation Lead", "Thanks,"],
  ceo: ["Nguyễn Thu Hà", "CEO", "Best regards,"]
};

const scenarioContexts = {
  1: {
    type: "Architecture steering email", priority: "High", person: "cto", subject: "Confirm the problem before selecting an SDN product",
    to: "SDN Design Working Group", cc: "CIO; CISO; Enterprise Architecture; Network Operations",
    body: [
      "Dear SDN Design Working Group, good morning.",
      "The executive committee has authorized the design workshop, but several early presentations moved directly into controller and product comparisons. That sequence concerns me. We still have two independently operated data centers, OSPF dependencies with both MPLS providers, manual VLAN and ACL administration, and monitoring split across SNMP and syslog tools.",
      "Please establish which brownfield facts are genuine design constraints before recommending a target. A feature that looks attractive in isolation is not useful if it ignores route exchange, gateway ownership, east-west exposure, or operational visibility.",
      "Thank you. I will use the architecture team's response to set the scope for the rest of the workshop."
    ]
  },
  4: {
    type: "Network Operations email", priority: "Normal", person: "ops", subject: "ACI terminology required for the operating model",
    to: "SDN Network Architect", cc: "Enterprise Architecture; Data Center Operations; Security Architecture",
    body: [
      "Dear SDN Network Architect, good afternoon.",
      "The data center operators understand VLANs, SVIs, routed interfaces, ACLs, and firewall zones. They are now hearing VRF, bridge domain, EPG, contract, and L3Out used as though the terms were interchangeable. That is already creating errors in the draft runbook.",
      "Please map each ACI construct to its primary responsibility. We specifically need to know which object owns routing scope, which groups endpoints, which grants communication, and which represents the external routed boundary.",
      "Thank you. A precise mapping will be used in the training and responsibility matrix before detailed design begins."
    ]
  },
  6: {
    type: "Application migration meeting minutes", priority: "High", person: "cloud", subject: "Gateway ownership and coexistence conditions",
    to: "DC Design Team", cc: "Application Owners; Network Operations; Change Management",
    body: [
      "Dear DC Design Team, good afternoon.",
      "Application owners rejected subnet renumbering and a single cutover weekend. Several systems use fixed addressing and undocumented peer dependencies. Operations also requires routed reachability between migrated and non-migrated workloads throughout the transition.",
      "The agreed design condition is temporary Layer 2 adjacency where a migration wave needs it, a separate routed coexistence boundary, and one active default-gateway owner for each preserved subnet. The legacy SVI and the ACI gateway must not be active at the same time.",
      "Please select the migration topology that satisfies all three conditions and leaves a credible rollback path."
    ]
  },
  9: {
    type: "CISO internal email", priority: "High", person: "ciso", subject: "Clarification on contracts and perimeter firewalls",
    to: "CIO; CTO; SDN Network Architect", cc: "Security Architecture; SOC; Data Center Operations",
    body: [
      "Dear colleagues, good morning.",
      "A vendor briefing described ACI contracts as policy enforcement between endpoint groups. Some participants concluded that the existing internet firewalls could therefore be removed in the first phase. I do not accept that conclusion without a control-by-control analysis.",
      "Contracts can improve east-west application policy, but the perimeter pair still performs internet boundary controls, inspection, logging, and functions that are not automatically reproduced by an EPG contract. The target must show how the firewall remains an explicit boundary while ACI policy is introduced.",
      "Please clarify the phase-one placement before the security architecture is approved."
    ]
  },
  12: {
    type: "WAN provider coordination email", priority: "High", person: "wan", subject: "OSPF remains a contractual handoff requirement",
    to: "SD-WAN Design Team", cc: "CTO; Provider Management; Network Operations",
    body: [
      "Dear SD-WAN Design Team, good afternoon.",
      "Both MPLS providers have confirmed that the current Layer 3 VPN handoffs will continue to exchange routes through OSPF during the migration period. They will not participate in PetroVale's overlay control system and will not change the handoff protocol for the pilot.",
      "There is still confusion that introducing SD-WAN eliminates traditional routing immediately. The overlay must coexist with the provider-facing and site-local routing needed to reach transports and redistribute approved service-side prefixes.",
      "Please state the routing position clearly so the low-level design does not remove a required adjacency."
    ]
  },
  14: {
    type: "Regional operations service review", priority: "Normal", person: "regional", subject: "Reachability is not the same as usable application service",
    to: "WAN Architecture", cc: "Application Owners; Service Management; Network Operations",
    body: [
      "Dear WAN Architecture team, good morning.",
      "Regional sites report that failover often restores IP reachability while voice, collaboration, and terminal applications remain unusable because the surviving path has excessive loss, latency, or jitter. A green routing neighbor therefore does not prove that the business service is healthy.",
      "The target design should select paths according to application requirements and measured transport quality while still respecting segmentation and security policy.",
      "Thank you. Please show which design capability addresses this operational gap."
    ]
  },
  20: {
    type: "Identity design workshop note", priority: "High", person: "ciso", subject: "Clarify the roles of the endpoint, switch, ISE, and Active Directory",
    to: "Campus Design Team", cc: "Identity Management; Endpoint Engineering; Security Operations",
    body: [
      "Dear Campus Design Team, good afternoon.",
      "The identity workshop exposed two conflicting explanations. One group believes Active Directory assigns the network tag directly; another believes the access switch decides a user's business role without consulting ISE.",
      "We need one technically correct authentication sequence showing the supplicant, the switch acting as authenticator, ISE policy and RADIUS exchange, the AD identity lookup, and the authorization returned to the switch.",
      "Please settle the flow before authentication and authorization policies are designed."
    ]
  },
  21: {
    type: "Security architecture clarification", priority: "High", person: "ciso", subject: "An assigned SGT does not prove end-to-end enforcement",
    to: "Cross-Domain Architecture Team", cc: "SDA; WAN; Data Center; Firewall Engineering",
    body: [
      "Dear architecture team, good morning.",
      "The successful 802.1X demonstration showed that ISE can return a Security Group Tag. Several observers then assumed every downstream platform would automatically understand and enforce the same policy.",
      "Assignment, transport or mapping, and enforcement are separate design decisions. The workshop must identify capable policy points and the translation required across campus, WAN, data center, and security boundaries.",
      "Please provide the accurate design statement before we approve an end-to-end segmentation claim."
    ]
  },
  22: {
    type: "IoT engineering email", priority: "Normal", person: "automation", subject: "Phase-one identity for devices without an 802.1X supplicant",
    to: "Campus Security Design Team", cc: "OT Engineering; Facilities; Endpoint Security",
    body: [
      "Dear Campus Security Design Team, good afternoon.",
      "The device inventory confirms that many cameras, sensors, badge readers, and building systems cannot run an 802.1X supplicant today. Waiting for full certificate support would block the campus pilot, but treating every MAC address as strong identity would also overstate the control.",
      "We need a transitional classification method for known devices, explicit acknowledgement of spoofing and inventory risks, and a roadmap toward profiling and stronger authentication.",
      "Please select the phase-one approach that is practical without presenting it as the final security state."
    ]
  },
  28: {
    type: "Refinery change-control memo", priority: "High", person: "factory", subject: "Protect OT availability during segmentation design",
    to: "CIO; CISO; SDN Design Working Group", cc: "Refinery Operations; Process Control; Safety; Change Management",
    body: [
      "Dear colleagues, good morning.",
      "Several refinery networks remain extended Layer 2 environments because of equipment constraints and support contracts. An enterprise segmentation target does not authorize the IT team to redesign those production cells during the first campus or WAN pilot.",
      "Our immediate requirement is to preserve process availability, strengthen the IT/OT boundary, document historian and jump-host flows, and improve visibility. Changes inside an operating cell require a separate safety and vendor review.",
      "Please choose a design approach that respects this operational boundary."
    ]
  },
  29: {
    type: "NOC readiness email", priority: "High", person: "ops", subject: "Device reachability is insufficient for SDN assurance",
    to: "Architecture and Service Assurance Teams", cc: "CIO; Application Operations; Security Operations",
    body: [
      "Dear colleagues, good afternoon.",
      "The current NMS can show interface counters and device availability, while a separate server stores syslog. Neither view explains why a user received the wrong group policy, why an overlay selected a degraded path, or whether an application transaction met its SLA.",
      "The future design must correlate identity and policy outcomes with service experience. We will continue monitoring controllers, fabric nodes, underlay, and overlay health, but those signals alone do not answer the business-impact question.",
      "Please identify the additional assurance inputs required by the operating model."
    ]
  },
  32: {
    type: "Procurement governance email", priority: "Normal", person: "cio", subject: "Comparable solutions must be evaluated by market segment",
    to: "Enterprise Architecture Review Board", cc: "Procurement; Legal; Security Architecture; Finance",
    body: [
      "Dear Architecture Review Board, good morning.",
      "Procurement has asked for evidence that the recommended architecture is not based on comparing unrelated products under one SDN label. Data center fabrics, WAN overlays, and campus identity solutions solve different operational problems and have different integration boundaries.",
      "Please group Cisco and non-Cisco alternatives by the market segment in which they compete. The comparison will be used for governance, not to imply that every listed platform has identical features.",
      "Thank you. We will not begin commercial evaluation until the categories are technically coherent."
    ]
  },
  33: {
    type: "Executive decision request", priority: "High", person: "ceo", subject: "Design direction required before implementation funding",
    to: "CIO; CTO; CISO", cc: "Executive Committee; Enterprise Architecture; Transformation Office",
    body: [
      "Dear Executive Committee, good afternoon.",
      "The workshop has reviewed data center, WAN, campus, identity, OT, migration, and assurance requirements. The board now needs one statement that explains the target without suggesting that a controller replaces routing, firewalls, operational controls, or staged change management.",
      "The implementation business case will proceed only if the design combines domain-specific capabilities with explicit boundaries, coexistence, validation, and rollback.",
      "Please recommend the statement that accurately represents the complete direction."
    ]
  }
};

const questions = [
  q(1, "multi", "Architecture assessment", "Brownfield Design Constraints", "cto", "Design workshop baseline", "After the Chapter 1 concept review, PetroVale has approved a design workshop. Start by confirming the brownfield facts that materially constrain the SDN design: two independent data centers, traditional routing, two MPLS providers, manual segmentation, and fragmented monitoring.", "Which current-state facts are important design constraints? (Select 4)", [["A","The data center core switches are the default gateways for server VLANs."],["B","The two data centers already operate as one active-active SDN fabric."],["C","The WAN depends on OSPF exchange with Layer 3 MPLS VPN providers."],["D","Current monitoring is split between SNMP-based NMS and a separate syslog server."],["E","Application-aware routing is already deployed across all sites."],["F","Data center segmentation is mainly north-south; east-west control is weak."]], ["A","C","D","F"], "The baseline has traditional DC gateways, OSPF/MPLS dependencies, fragmented monitoring, and weak east-west DC segmentation."),
  q(2, "diagram-single", "Diagram selection", "Target Data Center Fabric", "cio", "ACI target fabric framing", "The data center team has summarized the two-tier design, STP-related outage history, external routing requirements, and the need for application policy. Select the topology that provides the required fabric roles and operational control.", "Which diagram best represents the target Cisco ACI data center design?", [["A","Two-tier STP network with larger core gateways","dc-traditional"],["B","Leaf-spine fabric with APIC managing policy and endpoints","dc-aci"],["C","WAN routers replacing data center leaf switches","dc-wan-router"],["D","Internet firewall pair acting as the ACI controller","dc-fw-controller"]], "B", "Cisco ACI combines a leaf-spine fabric, APIC-based policy and lifecycle management, endpoint learning, and explicit external routing and service boundaries."),
  q(3, "single", "Design decision", "ACI Tenant and VRF Model", "arch", "ACI tenant and VRF model", "The accepted first-phase ACI model is one tenant for PetroVale enterprise applications, with two VRFs: Corp and Contractor. Endpoint groups and contracts express application access intent.", "Which ACI logical model matches the stated first-phase design?", [["A","One tenant, two VRFs: Corp and Contractor; EPGs and contracts express application policy."],["B","One VRF per VLAN because every VLAN must become a separate routing table."],["C","One tenant per server because ACI segmentation is host-based only."],["D","No VRFs inside ACI because all segmentation must remain on the firewall."]], "A", "The requested model is one tenant with two VRFs, using EPGs and contracts for application-centric segmentation."),
  matrix(4, "Design matrix", "ACI Constructs and Responsibilities", "ops", "ACI terminology alignment", "Operations needs a clean translation from VLAN, SVI, ACL, and firewall-zone thinking into ACI design responsibilities.", "Map each ACI construct to its primary design responsibility.", ["Routing scope","Endpoint grouping","Policy permission","External routing boundary"], [["VRF","Routing scope"],["EPG","Endpoint grouping"],["Contract","Policy permission"],["L3Out","External routing boundary"]], "A VRF defines routing scope, an EPG groups endpoints, a contract defines permitted communication, and an L3Out connects to external routed domains."),
  q(5, "single", "Routing design", "ACI L3Out and OSPF Integration", "wan", "Routing exchange at the ACI boundary", "The WAN team confirmed that OSPF remains required with MPLS providers in the near term. The design must connect ACI to the existing routed domain through explicit boundaries.", "What is the best first-phase routing design at the ACI-to-WAN boundary?", [["A","Use ACI L3Out to exchange routes with the existing routed domain while preserving controlled boundaries."],["B","Remove OSPF from all WAN routers immediately because ACI replaces routing protocols."],["C","Bridge every branch VLAN directly into ACI to avoid routing complexity."],["D","Advertise a default route from every server leaf directly to each MPLS provider PE."]], "A", "ACI integrates with external routed domains through L3Out while preserving required routing and policy boundaries."),
  q(6, "diagram-single", "Migration diagram", "Data Center Gateway Migration Pattern", "arch", "Data center gateway migration pattern", "Application owners rejected a big-bang cutover. Server IP addresses must remain unchanged while applications move in approved waves. Migrated and non-migrated workloads must retain routed reachability, the operations team requires OSPF route visibility between the legacy core and ACI L3Out, and the design must avoid duplicate default-gateway ownership during every transition state.", "Which topology best satisfies the migration requirements?", [["A","Parallel fabric with dedicated Layer 2 and Layer 3 coexistence links","migration-parallel"],["B","Parallel fabric with Layer 2 coexistence and distributed gateway activation","migration-bigbang"],["C","Parallel fabric with routed-only coexistence and staged workload movement","migration-l2-extend"],["D","Parallel fabric with Layer 2 coexistence and perimeter-routed reachability","migration-fw-per-epg"]], "A", "The preferred topology uses temporary 802.1Q trunks to preserve Layer 2 adjacency for each migration wave and a separate OSPF/L3Out path for routed coexistence. Gateway ownership is transferred per VLAN so that the legacy SVI and ACI bridge-domain gateway are never active for the same subnet at the same time."),
  q(7, "flow-single", "Traffic-flow selection", "ACI North-South Application Flow", "cloud", "Application flow through ACI and firewall", "For phase one, PetroVale keeps internet and WAN firewall controls. ACI should enforce application intent with contracts while north-south flows still cross established routed and firewall boundaries where required.", "Which traffic flow is most correct for a WAN user reaching an application hosted in ACI?", [["A","User -> WAN -> firewall/routed boundary -> ACI L3Out -> leaf -> EPG contract -> server","flow-aci-correct"],["B","User -> WAN -> ACI L3Out -> server EPG -> firewall inspection after delivery","flow-through-controller"],["C","User -> WAN router -> every server VLAN through a Layer 2 trunk","flow-l2"],["D","User -> internet firewall -> provider PE -> server without ACI policy","flow-bypass-policy"]], "A", "The controlled design preserves the routed and firewall boundary before ACI L3Out and applies the required EPG contract before application delivery."),
  q(8, "single", "Design trade-off", "STP and Fabric Behavior", "ops", "STP-related outage concern", "Operations has documented outages where STP reconvergence and blocked links made troubleshooting slow. The design should explain why the fabric changes the failure and bandwidth-use model.", "Which statement best explains the design benefit?", [["A","ACI leaf-spine design removes the need to think about any Layer 2 behavior."],["B","A fabric design can use equal-cost active paths and policy control instead of relying on a blocked-link STP tree."],["C","ACI improves convergence primarily by centralizing STP root placement for every tenant VLAN."],["D","The correct solution is to keep STP and add more VLANs."]], "B", "Leaf-spine fabrics improve bandwidth use and failure behavior through active multipath underlay design."),
  q(9, "single", "Security boundary", "Internet Firewall Integration", "ciso", "Internet firewall role in ACI phase one", "Security supports ACI application segmentation but does not want the existing active/standby internet firewall pair removed too early. The design must integrate firewalls cleanly with the fabric.", "What is the best phase-one position for the internet firewalls?", [["A","Keep them as explicit perimeter controls and integrate ACI through routed/firewall boundaries."],["B","Remove them because ACI contracts are always equivalent to perimeter firewalls."],["C","Place APIC between the internet and every server subnet as an inline firewall."],["D","Allow all data center traffic directly to the internet because segmentation is internal only."]], "A", "ACI contracts improve application segmentation, but perimeter firewalls remain explicit controls in phase one."),
  q(10, "multi", "WAN assessment", "Current WAN Constraints", "wan", "WAN baseline before SD-WAN design", "The workshop now moves to WAN design. Each data center connects to branches and factories through two Layer 3 MPLS VPN providers, OSPF is exchanged with the providers, and each remote site has a local OSPF core.", "Which WAN facts must influence the Cisco SD-WAN design? (Select 3)", [["A","Two MPLS providers are used as underlay transports."],["B","The providers require OSPF route exchange."],["C","Application-aware routing is already operating successfully."],["D","Each remote site has a local core running OSPF."],["E","WAN policy can ignore factory traffic because factories are Layer 2 only."],["F","Both data centers and every remote site must be cut over in one maintenance window."]], ["A","B","D"], "The SD-WAN design must account for both MPLS underlays, required OSPF exchange, and local site routing. A staged coexistence model is required rather than one enterprise-wide cutover."),
  q(11, "diagram-single", "Diagram selection", "Cisco SD-WAN Overlay Design", "cto", "SD-WAN overlay over MPLS", "The WAN design must show overlay control and data behavior on top of the two MPLS services PetroVale already uses. MPLS remains underlay transport.", "Which diagram best represents the target Cisco SD-WAN design over the existing MPLS services?", [["A","Edges build an encrypted overlay across both MPLS transports under centralized SD-WAN control","wan-sdwan"],["B","MPLS provider PEs become the SD-WAN controllers","wan-provider-controller"],["C","All branches become Layer 2 extensions of the data center","wan-l2"],["D","The active/standby internet firewall pair becomes the WAN overlay","wan-firewall"]], "A", "Cisco SD-WAN edges build overlays over available transports under centralized control and policy."),
  q(12, "single", "Routing integration", "OSPF and SD-WAN Coexistence", "wan", "OSPF exchange during WAN migration", "Provider Management confirmed that both MPLS providers still require OSPF exchange. The design cannot pretend that routing disappears on day one.", "What is the correct routing position for the SD-WAN migration?", [["A","Preserve required OSPF adjacencies at migration boundaries and control route advertisement through SD-WAN policy."],["B","Disable OSPF everywhere before installing SD-WAN edges."],["C","Bridge all remote site VLANs across MPLS to avoid routing."],["D","Use SNMP polling as the routing protocol between SD-WAN edges."]], "A", "A practical SD-WAN migration preserves required routing adjacencies and controls reachability through routing and policy."),
  matrix(13, "Segmentation matrix", "WAN VPN and Segmentation Model", "ciso", "WAN macro segmentation", "Security wants the WAN to mirror the data center macro-segmentation model. Use two WAN virtual networks: Corp and Contractor.", "Map each traffic category to the target WAN virtual network.", ["Corp VN","Contractor VN"], [["Employee access to corporate applications","Corp VN"],["Managed contractor access to approved applications","Contractor VN"],["Corporate IT administration traffic","Corp VN"],["Third-party maintenance access","Contractor VN"]], "The WAN mirrors macro-segmentation intent with separate Corp and Contractor virtual networks."),
  q(14, "single", "Application-aware routing", "Application-Aware WAN Policy", "regional", "Branch application experience", "Regional Operations cares about application experience, not only routing reachability. Today, failover may restore reachability while voice, terminal applications, and collaboration perform poorly.", "Which design behavior best addresses this concern?", [["A","Use SD-WAN application-aware routing and SLA classes to steer traffic based on loss, latency, jitter, and application requirements."],["B","Use only OSPF cost, because application performance is unrelated to path quality."],["C","Disable secondary MPLS paths to avoid asymmetric routing."],["D","Send all traffic to the internet firewall first, even for private data center applications."]], "A", "Application-aware routing uses measured transport quality and application policy."),
  q(15, "single", "Policy enforcement", "WAN Enforcement Point", "ciso", "SGT use across the WAN", "Security wants SGT-based policy to be meaningful across campus, WAN, and data center. The design must distinguish access authentication from WAN segmentation and policy enforcement.", "What is the most accurate WAN enforcement statement?", [["A","802.1X authenticates the user at the access edge; SD-WAN edges enforce WAN segmentation and policy using VN/VPN and integrated policy design."],["B","The MPLS provider PE authenticates every user and assigns SGTs."],["C","The syslog server becomes the WAN segmentation enforcement point."],["D","WAN policy is unnecessary once users authenticate at campus access switches."]], "A", "Identity begins at access through ISE, while WAN segmentation and forwarding policy are enforced through SD-WAN design constructs."),
  q(16, "diagram-single", "Migration diagram", "WAN Migration Pattern", "wan", "WAN pilot migration pattern", "The preferred WAN approach is a pilot pattern: add SD-WAN edges at selected sites, preserve local OSPF where needed, build overlays across both MPLS providers, validate policy, then expand site by site.", "Which diagram shows the safest WAN migration pattern?", [["A","Pilot SD-WAN edges coexist with existing MPLS routing, then expand by site waves","wan-migration-pilot"],["B","All WAN routers removed before controllers are reachable","wan-migration-remove"],["C","Every branch VLAN stretched to both data centers through MPLS","wan-migration-l2"],["D","Factories migrated first with no routing or policy validation","wan-migration-factory-first"]], "A", "A pilot-wave migration validates routing, overlay stability, policies, and operations before expansion."),
  q(17, "flow-single", "Traffic-flow selection", "SD-WAN Application Flow", "regional", "Application-aware routing flow", "Application owners asked what happens when a branch user accesses a data center application. Traffic should enter the local SD-WAN edge, be classified by application and segment, and be carried on the best compliant path.", "Which traffic flow best represents SD-WAN application-aware forwarding?", [["A","Branch user -> access/core -> SD-WAN edge -> app/SLA policy selects MPLS path -> DC SD-WAN edge -> firewall/L3 boundary -> application","flow-sdwan-correct"],["B","Branch user -> SNMP server -> MPLS provider -> application","flow-snmp"],["C","Branch user -> provider PE assigns user group -> application","flow-provider-identity"],["D","Branch user -> SD-WAN edge -> lowest OSPF-cost MPLS path without application or SLA classification -> DC edge -> application","flow-controller-data"]], "A", "The SD-WAN edge classifies traffic and applies application, segment, and SLA policy rather than relying only on the underlay routing metric."),
  q(18, "multi", "Campus assessment", "Current Campus Constraints", "cto", "Campus design baseline", "The campus is mixed. Building 1 has the core and directly attached access. Building 2 has distribution switches providing HSRP gateways. EIGRP runs between buildings, and EIGRP/OSPF redistribution happens at Building 1 core.", "Which campus facts are important design constraints? (Select 3)", [["A","The campus uses one consistent three-tier architecture in both buildings."],["B","Building 2 uses distribution switches with HSRP as default gateway."],["C","EIGRP and OSPF redistribution exists at Building 1 core."],["D","Users currently receive identity-based SGTs at every access port."],["E","Moving users to another port requires manual outlet and VLAN tracking."],["F","Campus policy is already fully automated through ISE."]], ["B","C","E"], "The SDA design must account for Building 2 HSRP gateways, EIGRP-to-OSPF redistribution, and manual VLAN/port operations. The two buildings do not use one consistent topology."),
  q(19, "diagram-single", "Diagram selection", "Cisco SD-Access Campus Design", "arch", "SDA fabric diagram", "The target campus diagram must show fabric edge nodes, border/control-plane roles, Catalyst Center for automation and assurance, and ISE for identity and group-based policy.", "Which diagram best represents the target Cisco SD-Access campus design?", [["A","Fabric edge, border/control-plane roles, Catalyst Center, and ISE","campus-sda"],["B","Only larger HSRP distribution switches and more VLANs","campus-hsrp"],["C","APIC controlling every campus access switch","campus-apic"],["D","MPLS provider PE assigning campus VLANs","campus-provider"]], "A", "Cisco SD-Access uses fabric roles with Catalyst Center and ISE."),
  q(20, "flow-single", "Authentication flow", "802.1X, AD, ISE, and SGT Assignment", "ciso", "802.1X and SGT flow", "Users authenticate to the network through 802.1X. After successful authentication, AD group information is used by ISE policy, and ISE instructs the switch to apply the correct authorization and SGT.", "Which flow correctly represents user authentication and SGT assignment?", [["A","User supplicant -> access switch -> ISE/RADIUS -> AD group lookup -> ISE authorization -> switch applies SGT","flow-auth-correct"],["B","User -> MPLS PE -> AD -> provider assigns SGT","flow-auth-provider"],["C","User -> syslog server -> access switch assigns random VLAN","flow-auth-syslog"],["D","User -> APIC -> internet firewall -> SGT assigned by default route","flow-auth-apic"]], "A", "802.1X uses the access switch as authenticator, ISE for policy, AD as identity source, and authorization results that can include SGT."),
  q(21, "single", "Policy enforcement", "SGT Enforcement Across Domains", "ciso", "SGT enforcement design", "Assigning an SGT is not the same as enforcing policy everywhere. The design must identify where SGTs are assigned, transported or mapped, and enforced across SDA, SD-WAN, ACI, and security boundaries.", "Which statement is most accurate?", [["A","ISE can assign group identity, but enforcement must be designed at capable network policy points across SDA, SD-WAN, ACI, and security boundaries."],["B","Once an SGT exists, every device automatically enforces every policy."],["C","SGTs remove the need for VRFs, VNs, firewalls, and contracts."],["D","SGTs are useful only inside Active Directory and never enter network policy."]], "A", "SGT assignment and enforcement are separate design concerns."),
  q(22, "single", "IoT access design", "IoT Classification in Phase One", "automation", "IoT classification approach", "Many IoT devices cannot perform 802.1X today. The long-term direction is profiling, but phase one must use a realistic transitional control.", "What is the best phase-one design for IoT devices that cannot perform 802.1X?", [["A","Use controlled MAC-based classification for known IoT devices, document limitations, and plan profiling in a later phase."],["B","Put all IoT devices into the corporate user group because they are on campus."],["C","Disable segmentation until every IoT device supports certificates."],["D","Let users manually move IoT VLANs at access ports as needed."]], "A", "MAC-based classification can be transitional for known devices, but it must be governed and improved later."),
  matrixMulti(23, "Campus Macro and Micro Segmentation", "ciso", "SDA segmentation model", "Security wants a clean distinction between macro segmentation, which separates broad forwarding domains, and micro segmentation, which uses identity or device group policy.", "For each design item, select every classification that applies.", ["Macro segmentation","Micro segmentation","Legacy VLAN-only behavior","Requires ISE policy"], [["Corp and Contractor virtual networks in SDA.",["Macro segmentation"]],["Permit Finance users to finance applications but deny contractor users.",["Micro segmentation","Requires ISE policy"]],["Move a user to a different switch port and manually change the access VLAN.",["Legacy VLAN-only behavior"]],["Assign SGT based on AD group after 802.1X authentication.",["Micro segmentation","Requires ISE policy"]],["Place all devices in one shared campus routing table.",["Legacy VLAN-only behavior"]]], "Macro segmentation separates broad virtual networks. Micro segmentation uses identity/device groups and ISE policy."),
  q(24, "diagram-single", "Migration diagram", "Campus Migration Pattern", "ops", "SDA migration pattern", "Operations does not want both campus buildings changed at once. Introduce SDA in controlled building or access-layer waves, preserve external routing boundaries, and validate identity policy before expansion.", "Which diagram shows the safest campus SDA migration pattern?", [["A","Pilot fabric edge in a selected building with controlled border to existing campus/core","campus-migration-pilot"],["B","Replace both building cores and all access switches in one outage","campus-migration-bigbang"],["C","Stretch every VLAN across both buildings and remove routing","campus-migration-l2"],["D","Move campus users directly into the data center ACI fabric","campus-migration-aci"]], "A", "A controlled pilot fabric with explicit borders reduces outage risk and validates identity policy."),
  q(25, "flow-single", "Traffic-flow selection", "Campus User to Data Center Application Flow", "cloud", "End-to-end user traffic flow", "Application owners want the end-to-end flow for an authenticated campus user reaching an application in ACI. The flow must include SGT assignment, SDA forwarding, security boundary, and ACI policy.", "Which flow is most correct?", [["A","User authenticates -> access switch gets SGT from ISE -> SDA fabric forwards by VN/policy -> DC boundary/firewall -> ACI L3Out -> EPG contract -> application","flow-end-to-end-correct"],["B","User authenticates -> access switch gets SGT -> SDA fabric forwards in the Corp VN -> ACI bridge domain receives a stretched VLAN without the DC security boundary","flow-end-to-end-wrong1"],["C","User changes port -> IT changes VLAN -> bypass all policy -> application","flow-end-to-end-wrong2"],["D","MPLS provider assigns SGT -> ACI removes all firewalls -> application","flow-end-to-end-wrong3"]], "A", "The correct design preserves access identity, SDA segmentation, routed/security boundaries, and ACI policy."),
  dropdowns(26, "Design mapping", "Cross-Domain Segmentation Mapping", "arch", "Consistent segmentation language", "The design spans ACI, SD-WAN, SDA, and ISE. Map each domain construct so the team does not expect one platform to solve every segmentation problem.", "Select the best construct for each domain.", ["ACI VRF","SD-WAN VPN/VN","SDA Virtual Network","ISE Security Group Tag"], [["Data center macro segmentation","ACI VRF"],["WAN macro segmentation","SD-WAN VPN/VN"],["Campus macro segmentation","SDA Virtual Network"],["User/device group identity","ISE Security Group Tag"]], "ACI VRFs, SD-WAN VPNs/VNs, and SDA VNs provide macro segmentation. ISE SGTs provide identity/group policy."),
  orderQ(27, "Workflow ordering", "Policy Design Workflow", "ciso", "Policy workflow governance", "Security supports identity-based policy but wants a governance workflow before any pilot. Start with business intent, then identity mapping, enforcement points, validation, and expansion.", "Place the policy design workflow in the best order.", ["Define business roles, device classes, and application-access intent.","Map roles and devices to ISE groups, SGTs, and macro segments.","Identify enforcement points across SDA, SD-WAN, ACI, and firewalls.","Validate policy in a limited pilot with telemetry and rollback.","Expand policy in waves with change control and assurance."], "Policy design starts with intent, then mapping, enforcement, validation, and controlled expansion."),
  q(28, "single", "IT/OT design", "Factory and OT Boundary Design", "factory", "OT boundary and Layer 2 concern", "Factory IT confirmed that several OT networks are extended Layer 2 environments. The design must avoid uncontrolled changes inside OT and focus first on controlled IT/OT boundaries, visibility, and staged policy.", "What is the safest design approach for factory and OT integration in this chapter?", [["A","Preserve OT stability, define controlled IT/OT boundaries, improve visibility, and stage policy around jump hosts and historian flows."],["B","Immediately replace all OT Layer 2 networks with SDA fabric edges."],["C","Bridge contractor, corporate, and OT networks together to simplify operations."],["D","Remove firewalls because SGTs will automatically protect OT devices."]], "A", "OT design should be conservative: controlled boundary, visibility, and staged policy before production changes."),
  q(29, "multi", "Operations design", "Monitoring and Assurance Design Inputs", "ops", "Assurance design inputs", "The current NMS and syslog design is not enough for an SDN operating model. Operations needs telemetry and assurance for controllers, fabrics, identity, policy, paths, and application experience.", "Which two design inputs most directly add service and policy assurance beyond the existing device-focused monitoring? (Select 2)", [["A","Monitor controller status only; fabric health can be excluded once controllers are reachable."],["B","Correlate endpoint identity, SGT assignment, and policy results."],["C","Monitor only underlay interfaces because overlay path state can always be inferred from them."],["D","Measure application experience and WAN SLA telemetry."],["E","Use only ICMP ping from the NMS server."],["F","Use manual screenshots from every switch CLI as the main assurance method."]], ["B","D"], "Identity and policy-result correlation plus application/SLA telemetry add assurance that the existing device-focused model does not provide. Controller, fabric, underlay, and overlay health still matter, but they must not be reduced to the incomplete approaches described in the distractors."),
  matrixMulti(30, "Design Trade-Offs", "cto", "Design trade-off review", "Leadership wants an explicit trade-off review. Some proposals are good target-state design, some are migration controls, and some are risky shortcuts.", "For each item, select every classification that applies.", ["Good target-state design","Good migration control","Risky shortcut","Needs explicit governance"], [["ACI parallel fabric with L3Out coexistence during application migration.",["Good target-state design","Good migration control","Needs explicit governance"]],["Immediate enterprise-wide policy push to all factories.",["Risky shortcut","Needs explicit governance"]],["SDA macro VNs plus ISE SGT-based group policy.",["Good target-state design","Needs explicit governance"]],["SD-WAN pilot on selected branches with application-aware routing validation.",["Good target-state design","Good migration control","Needs explicit governance"]],["Stretching every VLAN across DC, WAN, and campus to avoid routing changes.",["Risky shortcut"]]], "Strong design choices combine target-state architecture with migration controls and governance."),
  orderQ(31, "Migration sequence", "Chapter 2 Design Sequence", "cio", "Design sequence confirmation", "The steering committee wants the design sequence aligned with the agreed direction: data center first, then WAN, then campus, with identity and policy carried across domains.", "Place the design sequence in the intended order.", ["Design the ACI data center target and coexistence/migration boundary.","Design SD-WAN overlay, routing coexistence, VNs, and application-aware policy.","Design SDA campus fabric, 802.1X, ISE integration, and SGT policy.","Validate end-to-end segmentation, traffic flows, and enforcement points.","Prepare implementation waves, assurance criteria, and rollback gates."], "The requested flow is DC, WAN, campus, then end-to-end validation and implementation planning."),
  matrix(32, "Solution comparison", "Industry SDN Solution Positioning", "cio", "Industry solution comparison", "Procurement asked for a neutral comparison between Cisco solutions and other industry options in the same market segments.", "Map each market segment to a comparable industry solution category.", ["Data center SDN","WAN SDN","Campus SDN/NAC"], [["Cisco ACI, VMware NSX, Juniper Apstra","Data center SDN"],["Cisco SD-WAN, VMware VeloCloud, Fortinet Secure SD-WAN","WAN SDN"],["Cisco SD-Access with ISE, Aruba ClearPass/ESP, Juniper Mist Access Assurance","Campus SDN/NAC"]], "ACI maps to data center SDN, Cisco SD-WAN to WAN SDN, and SDA/ISE to campus SDN/NAC."),
  q(33, "single", "Final design decision", "Executive Design Summary", "ceo", "Chapter 2 design summary", "The executive committee needs one closing statement that accurately describes the design direction before implementation planning begins.", "Which statement best summarizes the Chapter 2 design direction?", [["A","PetroVale should replace routing and firewalls with one controller and migrate every site at the same time."],["B","PetroVale should design ACI for data center segmentation, SD-WAN for application-aware WAN and macro segmentation, SDA with ISE for campus identity and SGT policy, while preserving explicit boundaries, routing coexistence, firewalls, and staged migration controls."],["C","PetroVale should focus only on branch WAN because data center and campus segmentation are unrelated."],["D","PetroVale should keep VLAN-only segmentation and add more SNMP polling to meet the SDN design goals."]], "B", "The correct summary captures ACI, SD-WAN, SDA, ISE/SGT, explicit boundaries, coexistence, and staged migration.")
];

function q(id, type, label, title, person, subject, memo, prompt, options, answer, explanation) {
  return { id, type, label, title, context: makeContext(id, person, subject, memo), prompt, options, answer, explanation };
}

function matrix(id, label, title, person, subject, memo, prompt, columns, rows, explanation) {
  return { id, type: "matrix", label, title, context: makeContext(id, person, subject, memo), prompt, columns, rows, explanation };
}

function matrixMulti(id, title, person, subject, memo, prompt, columns, rowPairs, explanation) {
  return { id, type: "matrix-multi", label: "Multi-select matrix", title, context: makeContext(id, person, subject, memo), prompt, columns, rows: rowPairs.map(([statement, answer]) => ({ statement, answer })), explanation };
}

function dropdowns(id, label, title, person, subject, memo, prompt, choices, fieldPairs, explanation) {
  return { id, type: "dropdowns", label, title, context: makeContext(id, person, subject, memo), prompt, choices, fields: fieldPairs.map(([label, answer]) => ({ label, answer })), explanation };
}

function orderQ(id, label, title, person, subject, memo, prompt, rows, explanation) {
  return { id, type: "order", label, title, context: makeContext(id, person, subject, memo), prompt, rows, answer: rows, explanation };
}

function makeContext(id, personKey, subject, memo) {
  const spec = scenarioContexts[id];
  if (!spec) return null;
  const [name, role, close] = people[spec.person || personKey];

  return {
    type: spec.type,
    priority: spec.priority,
    priorityLevel: spec.priority.toLowerCase(),
    from: `${name}, ${role}`,
    to: spec.to,
    cc: spec.cc,
    subject: spec.subject,
    body: spec.body,
    signature: `${close}\n${name}\n${role}\nPetroVale Energy`
  };
}

const state = { index: 0, responses: [], activeView: "questions", unlockedContextIds: new Set(), unreadContextIds: new Set() };
const qView = document.getElementById("questionView");
const rView = document.getElementById("resultsView");
const backgroundView = document.getElementById("backgroundView");
const networkView = document.getElementById("networkView");
const contextsView = document.getElementById("contextsView");
const contextCards = document.getElementById("contextCards");
const menuItems = Array.from(document.querySelectorAll(".menu-item"));
const viewMap = { questions: qView, background: backgroundView, network: networkView, contexts: contextsView };

function setActiveView(view) {
  state.activeView = view;
  if (view === "contexts") state.unreadContextIds.clear();
  Object.entries(viewMap).forEach(([key, element]) => element.classList.toggle("hidden", key !== view));
  if (view === "questions" && state.responses.length === questions.length) {
    qView.classList.add("hidden");
    rView.classList.remove("hidden");
  } else {
    rView.classList.add("hidden");
  }
  menuItems.forEach((button) => button.classList.toggle("active", button.dataset.view === view));
  renderMenuState();
}

function renderMenuState() {
  const contextButton = menuItems.find((button) => button.dataset.view === "contexts");
  if (!contextButton) return;
  const count = state.unreadContextIds.size;
  contextButton.querySelector(".menu-label").textContent = count ? "New Scenario Update" : "Scenario Updates";
  contextButton.querySelector(".menu-hint").textContent = count ? "Review the latest information" : "Information revealed during the workshop";
  const badge = contextButton.querySelector(".menu-badge");
  badge.textContent = count ? String(count) : "";
  badge.classList.toggle("hidden", count === 0);
}

function renderContextCards() {
  const visibleContexts = questions
    .filter((question) => question.context && state.unlockedContextIds.has(`question-${question.id}`))
    .map((question) => ({ id: `question-${question.id}`, topic: question.title, ...question.context }));

  if (!visibleContexts.length) {
    contextCards.innerHTML = `<div class="empty-context"><h3>No scenario updates released yet</h3><p>Design workshop material will appear here as PetroVale's SDN design discussion unfolds.</p></div>`;
    return;
  }

  contextCards.innerHTML = visibleContexts.map((item, index) => `
    <article class="context-card ${index === visibleContexts.length - 1 ? "latest-context" : ""}" id="context-${item.id}">
      <div class="message-topline"><span>${esc(item.type)}</span><strong class="priority-${item.priorityLevel}">${esc(item.priority)}</strong></div>
      <h3>${esc(item.subject)}</h3>
      <dl class="message-meta">
        <div><dt>From</dt><dd>${esc(item.from)}</dd></div>
        <div><dt>To</dt><dd>${esc(item.to)}</dd></div>
        <div><dt>CC</dt><dd>${esc(item.cc)}</dd></div>
        <div><dt>Topic</dt><dd>${esc(item.topic)}</dd></div>
      </dl>
      <div class="message-body">${renderMessageBody(item.body)}</div>
      <p class="message-signature">${esc(item.signature)}</p>
    </article>
  `).join("");
}

function renderMessageBody(paragraphs) {
  return paragraphs.map((paragraph, index) => {
    const safe = esc(paragraph);
    if (index !== 0) return `<p>${safe}</p>`;
    const match = safe.match(/^(Dear .*?, good (?:morning|afternoon)\.)\s+(.*)$/);
    if (!match) return `<p>${safe}</p>`;
    return `<p class="message-greeting">${match[1]}</p><p>${match[2]}</p>`;
  }).join("");
}

function unlockContextsForQuestion(question) {
  if (!question.context) return [];
  const id = `question-${question.id}`;
  const isNew = !state.unlockedContextIds.has(id);
  state.unlockedContextIds.add(id);
  if (isNew && state.activeView !== "contexts") state.unreadContextIds.add(id);
  return isNew ? [question.context] : [];
}

function renderContextAlerts(relatedContexts) {
  if (!relatedContexts.length) return "";
  return `<aside class="context-alert" role="note"><strong>New scenario update available</strong><p>Review the latest stakeholder message in Scenario Updates before answering this decision.</p><button class="inline-link" type="button" data-jump-contexts>Review scenario updates</button></aside>`;
}

menuItems.forEach((button) => button.addEventListener("click", () => setActiveView(button.dataset.view)));

function normalize(value) {
  if (Array.isArray(value)) return value.slice().sort().join("|");
  if (value && typeof value === "object") {
    return Object.keys(value).sort().map((key) => `${key}:${Array.isArray(value[key]) ? value[key].slice().sort().join(",") : value[key]}`).join("|");
  }
  return String(value || "");
}

function getCorrectAnswer(question) {
  if (question.type === "matrix") return Object.fromEntries(question.rows.map(([statement, answer]) => [statement, answer]));
  if (question.type === "matrix-multi") return Object.fromEntries(question.rows.map((row) => [row.statement, row.answer]));
  if (question.type === "dropdowns") return Object.fromEntries(question.fields.map((field) => [field.label, field.answer]));
  return question.answer;
}

function isCorrect(question, response) {
  if (question.type === "order") return JSON.stringify(response) === JSON.stringify(question.answer);
  return normalize(response) === normalize(getCorrectAnswer(question));
}

function formatAnswer(answer) {
  if (Array.isArray(answer)) return answer.join(", ");
  if (answer && typeof answer === "object") return Object.entries(answer).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`).join("; ");
  return answer || "No answer";
}

function renderQuestion() {
  const question = questions[state.index];
  const relatedContexts = unlockContextsForQuestion(question);
  renderContextCards();
  renderMenuState();
  const progress = (state.index / questions.length) * 100;
  qView.innerHTML = `
    <div class="progress-row"><span class="progress-text">Decision ${state.index + 1} of ${questions.length}</span><div class="progress-bar" aria-hidden="true"><div class="progress-fill" style="width:${progress}%"></div></div><span class="progress-text">${Math.round(progress)}%</span></div>
    <div class="question-type">${esc(question.label)}</div>
    <h2 class="question-title">${esc(question.title)}</h2>
    ${renderContextAlerts(relatedContexts)}
    <p class="prompt">${esc(question.prompt)}</p>
    <form id="answerForm">${renderInput(question)}</form>
    <div class="actions"><div class="status-message" id="statusMessage"></div><button class="primary-button" id="nextButton" type="button">${state.index === questions.length - 1 ? "Finish and Review" : "Next"}</button></div>
  `;
  document.getElementById("nextButton").addEventListener("click", handleNext);
  qView.querySelectorAll("[data-jump-contexts]").forEach((button) => button.addEventListener("click", () => setActiveView("contexts")));
}

function renderInput(question) {
  if (question.type === "single" || question.type === "multi") {
    const inputType = question.type === "single" ? "radio" : "checkbox";
    const options = orderedOptions(question.options);
    return `<div class="option-list">${options.map(([key, text]) => `<label class="option"><input type="${inputType}" name="answer" value="${key}"><span><strong>${key}.</strong>${esc(text)}</span></label>`).join("")}</div>`;
  }
  if (question.type === "flow-single") {
    const options = orderedOptions(question.options);
    return `<div class="option-list">${options.map(([key, text]) => `<label class="option"><input type="radio" name="answer" value="${key}"><span><strong>${key}.</strong>${esc(text)}</span></label>`).join("")}</div>`;
  }
  if (question.type === "diagram-single") {
    const options = orderedOptions(question.options);
    return `<div class="diagram-options">${options.map(([key, text, diagram]) => `<label class="diagram-option"><input type="radio" name="answer" value="${key}"><span class="diagram-choice-title"><strong>${key}.</strong> ${esc(text)}</span>${renderMiniDiagram(diagram)}</label>`).join("")}</div>`;
  }
  if (question.type === "matrix") {
    const columns = shuffledDisplay(question, "matrix-columns", question.columns);
    const rows = shuffledDisplay(question, "matrix-rows", question.rows);
    return `<table class="answer-table"><thead><tr><th>Statement</th>${columns.map((c) => `<th>${esc(c)}</th>`).join("")}</tr></thead><tbody>${rows.map(([statement], rowIndex) => `<tr><td>${esc(statement)}</td>${columns.map((column) => `<td><input type="radio" name="row-${rowIndex}" value="${esc(column)}" aria-label="${esc(statement)} ${esc(column)}"></td>`).join("")}</tr>`).join("")}</tbody></table>`;
  }
  if (question.type === "matrix-multi") {
    const columns = shuffledDisplay(question, "matrix-multi-columns", question.columns);
    const rows = shuffledDisplay(question, "matrix-multi-rows", question.rows);
    return `<table class="answer-table matrix-multi-table"><thead><tr><th>Decision Item</th>${columns.map((c) => `<th>${esc(c)}</th>`).join("")}</tr></thead><tbody>${rows.map((row, rowIndex) => `<tr><td>${esc(row.statement)}</td>${columns.map((column) => `<td class="matrix-choice"><input type="checkbox" name="row-${rowIndex}" value="${esc(column)}" aria-label="${esc(row.statement)} ${esc(column)}"></td>`).join("")}</tr>`).join("")}</tbody></table>`;
  }
  if (question.type === "dropdowns") {
    const fields = shuffledDisplay(question, "dropdown-fields", question.fields);
    const choices = shuffledDisplay(question, "dropdown-choices", question.choices);
    return `<table class="answer-table"><thead><tr><th>Item</th><th>Selection</th></tr></thead><tbody>${fields.map((field, index) => `<tr><td>${esc(field.label)}</td><td><select name="field-${index}"><option value="">Select...</option>${choices.map((choice) => `<option value="${esc(choice)}">${esc(choice)}</option>`).join("")}</select></td></tr>`).join("")}</tbody></table>`;
  }
  if (question.type === "order") {
    const rows = shuffledDisplay(question, "order-rows", question.rows);
    const positions = question.rows.map((_, index) => index + 1);
    return `<div class="order-list">${rows.map((row, index) => `<div class="order-row"><select name="order-${index}" aria-label="Order for ${esc(row)}"><option value="">Order</option>${positions.map((pos) => `<option value="${pos}">${pos}</option>`).join("")}</select><span>${esc(row)}</span></div>`).join("")}</div>`;
  }
  return "";
}

function orderedOptions(options) {
  return [...options].sort((a, b) => String(a[0]).localeCompare(String(b[0])));
}

function collectResponse(question) {
  const data = new FormData(document.getElementById("answerForm"));
  if (["single", "diagram-single", "flow-single"].includes(question.type)) return data.get("answer") || "";
  if (question.type === "multi") return data.getAll("answer");
  if (question.type === "matrix") {
    const rows = shuffledDisplay(question, "matrix-rows", question.rows);
    return Object.fromEntries(rows.map(([statement], index) => [statement, data.get(`row-${index}`) || ""]));
  }
  if (question.type === "matrix-multi") {
    const rows = shuffledDisplay(question, "matrix-multi-rows", question.rows);
    return Object.fromEntries(rows.map((row, index) => [row.statement, data.getAll(`row-${index}`)]));
  }
  if (question.type === "dropdowns") {
    const fields = shuffledDisplay(question, "dropdown-fields", question.fields);
    return Object.fromEntries(fields.map((field, index) => [field.label, data.get(`field-${index}`) || ""]));
  }
  if (question.type === "order") {
    const rows = shuffledDisplay(question, "order-rows", question.rows);
    const ordered = [];
    rows.forEach((row, index) => {
      const pos = Number(data.get(`order-${index}`));
      if (pos) ordered[pos - 1] = row;
    });
    return ordered;
  }
  return "";
}

function shuffledDisplay(question, salt, items) {
  return stableShuffle(items, `${question.id}-${salt}`);
}

function stableShuffle(items, seed) {
  const shuffled = items
    .map((item, index) => ({ item, rank: seededRank(`${seed}-${index}-${stableItemKey(item)}`) }))
    .sort((a, b) => a.rank - b.rank)
    .map(({ item }) => item);
  if (items.length > 2 && shuffled.every((item, index) => item === items[index])) {
    const shift = (seededRank(`${seed}-rotate`) % (items.length - 1)) + 1;
    return shuffled.slice(shift).concat(shuffled.slice(0, shift));
  }
  return shuffled;
}

function seededRank(value) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function stableItemKey(item) {
  if (Array.isArray(item)) return item.join("|");
  if (item && typeof item === "object") return Object.values(item).join("|");
  return String(item);
}

function hasCompleteResponse(question, response) {
  if (["single", "diagram-single", "flow-single"].includes(question.type)) return Boolean(response);
  if (question.type === "multi") return response.length === question.answer.length;
  if (question.type === "matrix" || question.type === "dropdowns") return Object.values(response).every(Boolean);
  if (question.type === "matrix-multi") return Object.values(response).every((value) => Array.isArray(value) && value.length > 0);
  if (question.type === "order") return response.length === question.rows.length && response.every(Boolean) && new Set(response).size === question.rows.length;
  return false;
}

function handleNext() {
  const question = questions[state.index];
  const response = collectResponse(question);
  const status = document.getElementById("statusMessage");
  if (!hasCompleteResponse(question, response)) {
    status.textContent = question.type === "multi"
      ? `Select exactly ${question.answer.length} answers before continuing.`
      : "Complete the design decision before continuing.";
    return;
  }
  state.responses.push({ questionId: question.id, response, correct: isCorrect(question, response) });
  if (state.index === questions.length - 1) return renderResults();
  state.index += 1;
  renderQuestion();
  qView.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderResults() {
  qView.classList.add("hidden");
  rView.classList.remove("hidden");
  backgroundView.classList.add("hidden");
  networkView.classList.add("hidden");
  contextsView.classList.add("hidden");
  menuItems.forEach((button) => button.classList.toggle("active", button.dataset.view === "questions"));
  const correctCount = state.responses.filter((r) => r.correct).length;
  const percent = Math.round((correctCount / questions.length) * 100);
  const missed = state.responses.filter((r) => !r.correct);
  rView.innerHTML = `<div class="score-band"><div class="score-number">${percent}%</div><div><h2>Chapter 2 Design Workshop Review</h2><p>${getInterpretation(percent)}</p></div></div><div class="summary-grid"><div class="metric"><span>Sound decisions</span><b>${correctCount}</b></div><div class="metric"><span>Review needed</span><b>${missed.length}</b></div><div class="metric"><span>Total</span><b>${questions.length}</b></div></div><h2>Decision Review</h2><div class="missed-list">${state.responses.map((result, index) => renderReviewItem(result, questions[index])).join("")}</div><div class="actions"><button class="secondary-button" type="button" onclick="window.location.reload()">Restart Workshop</button></div>`;
}

function renderReviewItem(result, question) {
  return `<article class="review-item ${result.correct ? "" : "missed"}"><h3>Decision ${question.id}: ${esc(question.title)} ${result.correct ? "Sound" : "Missed"}</h3><p class="answer-line"><strong>Your answer:</strong> ${esc(formatAnswer(result.response))}</p><p class="answer-line"><strong>Recommended answer:</strong> ${esc(formatAnswer(getCorrectAnswer(question)))}</p>${result.correct ? "" : `<div class="explanation"><strong>Why:</strong> ${esc(question.explanation)}</div>`}</article>`;
}

function getInterpretation(percent) {
  if (percent >= 85) return "Strong readiness to move from design workshop into implementation planning.";
  if (percent >= 70) return "Good design understanding. Review the missed decisions before planning implementation waves.";
  if (percent >= 50) return "Partial understanding. Revisit ACI, SD-WAN, SDA, ISE, SGT, enforcement points, and migration boundaries.";
  return "Re-study the Chapter 2 design material before continuing to implementation scenarios.";
}

function renderMiniDiagram(kind) {
  const specs = {
    "dc-aci": {
      title: "ACI leaf-spine fabric with APIC policy control",
      zones: ["External routed/security boundary", "ACI fabric", "Application policy"],
      nodes: ["External router", "Border leaf", "Spine switches", "Leaf switches", "Web servers", "Database servers"],
      notes: ["APIC manages policy and fabric lifecycle", "Fabric health includes leaf, spine, endpoint, and external-boundary state"]
    },
    "dc-traditional": {
      title: "Traditional two-tier data center expansion",
      zones: ["Core gateway", "Access switching", "Server VLANs"],
      nodes: ["Core switch 1", "Core switch 2", "Access switch 1", "Access switch 2", "Server rack A", "Server rack B"],
      notes: ["Still depends on VLAN/STP behavior", "Does not address application-centric east-west segmentation"],
      warning: true
    },
    "dc-wan-router": {
      title: "WAN-router-based data center alternative",
      zones: ["WAN", "Provider edge", "Servers"],
      nodes: ["WAN router 1", "WAN router 2", "MPLS PE 1", "MPLS PE 2", "Server access switch", "Server rack"],
      notes: ["WAN routing does not replace a DC switching fabric", "Application policy remains unclear"],
      warning: true
    },
    "dc-fw-controller": {
      title: "Firewall-centered data center alternative",
      zones: ["Perimeter", "Switching", "Applications"],
      nodes: ["Active firewall", "Standby firewall", "Core switch 1", "Core switch 2", "Access switch", "Server rack"],
      notes: ["Firewall remains a security boundary", "It does not become APIC or the ACI control plane"],
      warning: true
    },
    "migration-parallel": {
      title: "Parallel ACI fabric with controlled gateway migration",
      zones: ["Legacy data center", "Coexistence links", "ACI fabric"],
      nodes: ["Legacy core 1", "Legacy core 2", "Firewall pair", "ACI border leaf", "ACI leaf switch", "Application servers"],
      notes: ["Application waves move through explicit boundaries", "Rollback and route control stay visible"]
    },
    "migration-bigbang": {
      title: "Layer 2 coexistence with distributed gateway activation",
      zones: ["Legacy data center", "Coexistence links", "ACI fabric"],
      nodes: ["Legacy core 1", "Legacy core 2", "Legacy workload", "ACI leaf 1", "ACI leaf 2", "ACI application"],
      notes: []
    },
    "migration-l2-extend": {
      title: "Routed-only coexistence between legacy and ACI",
      zones: ["Legacy data center", "Routed coexistence", "ACI fabric"],
      nodes: ["Legacy core 1", "Legacy core 2", "Legacy workload", "ACI leaf 1", "ACI leaf 2", "ACI application"],
      notes: []
    },
    "migration-fw-per-epg": {
      title: "Layer 2 coexistence with perimeter-routed reachability",
      zones: ["Legacy data center", "Perimeter transit", "ACI fabric"],
      nodes: ["Legacy core 1", "Legacy core 2", "Legacy workload", "Firewall pair", "ACI leaf 1", "ACI leaf 2"],
      notes: []
    },
    "wan-sdwan": {
      title: "Cisco SD-WAN overlay over both MPLS providers",
      zones: ["Remote site", "Underlay transports", "Data center"],
      nodes: ["Branch SD-WAN edge", "Factory SD-WAN edge", "MPLS PE 1", "MPLS PE 2", "DC SD-WAN edge", "SD-WAN controller"],
      notes: ["Overlay uses both MPLS transports", "Central policy steers application traffic"]
    },
    "wan-provider-controller": {
      title: "Provider-edge WAN control alternative",
      zones: ["Remote site", "Provider MPLS", "Enterprise policy"],
      nodes: ["Branch router", "Provider PE 1", "Provider core router", "Provider PE 2", "DC router", "NMS server"],
      notes: ["MPLS remains transport", "Provider PE does not become Cisco SD-WAN control plane"],
      warning: true
    },
    "wan-l2": {
      title: "Layer 2 WAN extension alternative",
      zones: ["Branch VLANs", "MPLS cloud", "Data center VLANs"],
      nodes: ["Branch access switch", "Branch core switch", "MPLS PE 1", "MPLS PE 2", "DC access switch", "Server rack"],
      notes: ["Does not match Layer 3 MPLS VPN reality", "Increases failure-domain risk"],
      warning: true
    },
    "wan-firewall": {
      title: "Firewall-centered WAN alternative",
      zones: ["Security edge", "WAN", "Branches"],
      nodes: ["Internet firewall A", "Internet firewall B", "MPLS PE 1", "MPLS PE 2", "Branch router", "Factory router"],
      notes: ["Firewall is not the SD-WAN overlay", "No application-aware path selection"],
      warning: true
    },
    "wan-migration-pilot": {
      title: "Pilot SD-WAN migration with coexistence",
      zones: ["Pilot sites", "Dual MPLS", "DC hub"],
      nodes: ["Pilot branch core", "Branch SD-WAN edge", "MPLS PE 1", "MPLS PE 2", "DC SD-WAN edge", "DC core router"],
      notes: ["Validate overlay, routing, policy, and application SLA before expansion"]
    },
    "wan-migration-remove": {
      title: "Router replacement WAN migration pattern",
      zones: ["Remote sites", "Control gap", "DC"],
      nodes: ["Branch router", "Factory router", "MPLS PE 1", "MPLS PE 2", "DC router", "WAN controller"],
      notes: ["No safe coexistence", "High operational risk"],
      warning: true
    },
    "wan-migration-l2": {
      title: "All branch VLANs stretched to both DCs",
      zones: ["Branches", "WAN", "Data centers"],
      nodes: ["Branch access switch", "Factory access switch", "MPLS PE 1", "MPLS PE 2", "DC1 access switch", "DC2 access switch"],
      notes: ["Contradicts Layer 3 MPLS design", "Does not solve segmentation"],
      warning: true
    },
    "wan-migration-factory-first": {
      title: "Factory-first WAN migration pattern",
      zones: ["Factories", "WAN", "Factory systems"],
      nodes: ["Factory core", "OT access switch", "Factory SD-WAN edge", "MPLS PE", "DC SD-WAN edge", "Production servers"],
      notes: ["OT should not be first without boundary validation", "Safety constraints are not addressed"],
      warning: true
    },
    "campus-sda": {
      title: "Cisco SD-Access campus fabric",
      zones: ["Access and identity", "Fabric", "External boundary"],
      nodes: ["User endpoint", "Fabric edge switch", "Catalyst Center", "ISE server", "Border node", "WAN router"],
      notes: ["ISE provides identity and SGT policy", "Catalyst Center automates and assures the fabric"]
    },
    "campus-hsrp": {
      title: "Traditional HSRP campus expansion",
      zones: ["Building 1 core", "Building 2 distribution", "Access layer"],
      nodes: ["Core switch 1", "Core switch 2", "Distribution 1", "Distribution 2", "Access switch 1", "Access switch 2"],
      notes: ["Still device-centric", "Does not provide SDA identity-based policy"],
      warning: true
    },
    "campus-apic": {
      title: "APIC-centered campus alternative",
      zones: ["Controller", "Campus", "Users"],
      nodes: ["APIC cluster", "Campus core", "Access switch", "User endpoint", "Wireless controller", "Access point"],
      notes: ["APIC is for ACI data center fabric", "Campus SDA uses Catalyst Center and ISE"],
      warning: true
    },
    "campus-provider": {
      title: "Provider-edge campus control alternative",
      zones: ["Provider", "Campus", "Users"],
      nodes: ["Provider PE", "Campus router", "Distribution switch", "Access switch", "User endpoint", "ISE server"],
      notes: ["Campus identity and segmentation are enterprise responsibilities", "Provider PE does not assign campus policy"],
      warning: true
    },
    "campus-migration-pilot": {
      title: "SDA pilot fabric with controlled border",
      zones: ["Existing campus", "Pilot fabric", "Users"],
      nodes: ["Building 1 core", "Border node", "Fabric edge switch", "ISE server", "Pilot user", "Building 2 core"],
      notes: ["Keeps explicit routing boundary", "Validates identity and policy before expansion"]
    },
    "campus-migration-bigbang": {
      title: "Campus-wide big-bang fabric cutover",
      zones: ["Building 1", "Building 2", "Cutover"],
      nodes: ["Building 1 core", "Building 1 access", "Building 2 distribution", "Building 2 access", "User endpoint", "Catalyst Center"],
      notes: ["High blast radius", "Hard rollback"],
      warning: true
    },
    "campus-migration-l2": {
      title: "VLAN stretch across buildings",
      zones: ["Building 1", "Layer 2 stretch", "Building 2"],
      nodes: ["Building 1 core", "Building 1 access", "Layer 2 switch", "Building 2 distribution", "Building 2 access", "User endpoint"],
      notes: ["Preserves legacy behavior", "Does not validate SDA policy"],
      warning: true
    },
    "campus-migration-aci": {
      title: "Campus users moved into ACI fabric",
      zones: ["Campus", "Data center fabric", "Applications"],
      nodes: ["User endpoint", "Campus access switch", "ACI spine", "ACI leaf", "Application server", "Data center access switch"],
      notes: ["ACI is not the campus access fabric", "Does not solve campus access identity"],
      warning: true
    }
  };

  if (kind.startsWith("dc-") || kind.startsWith("migration-")) return renderDataCenterTopology(kind, specs[kind] || specs["dc-aci"]);
  if (kind.startsWith("wan-")) return renderWanTopology(kind, specs[kind] || specs["wan-sdwan"]);
  if (kind.startsWith("campus-")) return renderCampusTopology(kind, specs[kind] || specs["campus-sda"]);
  return renderTopologyDiagram(kind, specs[kind] || specs["dc-aci"]);
}

function renderDataCenterTopology(kind, spec) {
  if (kind === "dc-aci") return renderAciTopology(kind, spec);
  if (kind.startsWith("migration-")) return renderAciMigrationTopology(kind, spec);
  const nodes = topologyNodes(spec.nodes, [
    [150, 210], [150, 390], [450, 210], [450, 390], [750, 210], [750, 390]
  ]);
  let edges;
  if (kind === "dc-traditional") {
    edges = [
      edge(0, 1, "l2", "L2 peer-link / HSRP", { dx: -58 }),
      edge(0, 2, "l2", "802.1Q / STP", { dy: -18 }),
      edge(0, 3, "l2"),
      edge(1, 2, "l2"),
      edge(1, 3, "blocked", "STP blocked", { dy: 18 }),
      edge(2, 3, "l2", "L2 peer-link", { dx: 54 }),
      edge(2, 4, "l2"), edge(2, 5, "l2"), edge(3, 4, "l2"), edge(3, 5, "l2")
    ];
  } else if (kind === "dc-wan-router") {
    edges = [
      edge(0, 2, "l3", "OSPF", { dy: -18 }), edge(0, 3, "l3"),
      edge(1, 2, "l3"), edge(1, 3, "l3", "OSPF", { dy: 18 }),
      edge(2, 4, "l3"), edge(3, 4, "l3"), edge(4, 5, "l2", "802.1Q")
    ];
  } else if (kind === "dc-fw-controller") {
    edges = [
      edge(0, 1, "management", "Active / standby", { dx: -58 }),
      edge(0, 2, "l3"), edge(0, 3, "l3"), edge(1, 2, "l3"), edge(1, 3, "l3"),
      edge(2, 3, "l2", "L2 peer-link", { dx: 54 }),
      edge(2, 4, "l2"), edge(3, 4, "l2"), edge(4, 5, "l2", "802.1Q")
    ];
  } else if (kind === "migration-l2-extend") {
    edges = [
      edge(0, 2, "l2", "Extended 802.1Q trunk", { dy: -18 }), edge(1, 2, "l2"),
      edge(2, 3, "l2", "Layer 2 stretch", { dx: 56 }),
      edge(3, 4, "l2"), edge(3, 5, "l2"), edge(4, 5, "blocked", "STP blocked", { dx: 56 })
    ];
  } else if (kind === "migration-bigbang") {
    edges = [
      edge(0, 2, "l2"), edge(1, 2, "l2"), edge(2, 3, "l3", "Single cutover boundary"),
      edge(3, 4, "l3"), edge(3, 5, "l3"), edge(4, 5, "l2")
    ];
  } else if (kind === "migration-fw-per-epg") {
    edges = [
      edge(0, 2, "l3", "Routed firewall path", { dy: -18 }), edge(1, 2, "l3"),
      edge(2, 3, "l3"), edge(3, 4, "l3"), edge(3, 5, "l3"), edge(4, 5, "l3")
    ];
  } else {
    edges = [
      edge(0, 2, "l3", "OSPF / routed boundary", { dy: -18 }), edge(1, 2, "l3"),
      edge(2, 3, "l3"), edge(3, 4, "l3"), edge(3, 5, "l3"), edge(4, 5, "l2")
    ];
  }
  return renderThreeDomainTopology(spec, nodes, edges, ["#edf6fc", "#eef8f1", "#edf6fc"]);
}

function renderAciMigrationTopology(kind, spec) {
  const nodes = [
    topologyNode("Legacy core 1", 145, 245, "switch"),
    topologyNode("Legacy core 2", 145, 405, "switch"),
    topologyNode("Legacy workload", 285, 505, "server"),
    topologyNode("ACI spine 1", 730, 165, "switch"),
    topologyNode("ACI spine 2", 830, 165, "switch"),
    topologyNode("Border leaf 1", 610, 245, "switch"),
    topologyNode("Border leaf 2", 610, 405, "switch"),
    topologyNode("ACI application", 760, 510, "server")
  ];
  const legacyGatewayLabel = kind === "migration-bigbang" ? "HSRP / legacy SVI active" : "HSRP / legacy SVI";
  const endpointLabel = kind === "migration-bigbang" ? "ACI BD gateway active" : "ACI endpoint attachment";
  let edges = [
    edge(0, 1, "l2", legacyGatewayLabel, { dx: -30 }),
    edge(0, 2, "l2"), edge(1, 2, "l2"),
    edge(3, 5, "l3", "ACI L3 underlay", { dx: -24, dy: -12 }),
    edge(3, 6, "l3"), edge(4, 5, "l3"), edge(4, 6, "l3"),
    edge(5, 7, "l2"), edge(6, 7, "l2", endpointLabel, { dy: 18 })
  ];

  if (kind === "migration-parallel") {
    edges.push(
      edge(0, 5, "l2", "Temporary 802.1Q trunk", { dy: -20 }), edge(1, 6, "l2"),
      edge(0, 6, "l3", "OSPF / ACI L3Out", { dy: 23 }), edge(1, 5, "l3")
    );
  } else if (kind === "migration-bigbang") {
    edges.push(
      edge(0, 5, "l2", "Temporary 802.1Q trunk", { dy: -20 }), edge(1, 6, "l2"),
      edge(0, 6, "l3", "OSPF / ACI L3Out", { dy: 23 }), edge(1, 5, "l3")
    );
  } else if (kind === "migration-l2-extend") {
    edges.push(
      edge(0, 6, "l3", "OSPF / ACI L3Out", { dy: 23 }), edge(1, 5, "l3")
    );
  } else {
    const firewall = topologyNode("Perimeter firewall pair", 450, 325, "firewall");
    nodes.push(firewall);
    edges.push(
      edge(0, 5, "l2", "Temporary 802.1Q trunk", { dy: -20 }), edge(1, 6, "l2"),
      edge(0, 8, "l3", "Static routed transit", { dy: -18 }), edge(1, 8, "l3"),
      edge(8, 5, "l3"), edge(8, 6, "l3")
    );
  }
  return `
    <svg class="mini-diagram" viewBox="0 0 900 610" role="img" aria-label="${esc(spec.title)}">
      ${topologyCanvas(spec.title, 900, 610)}
      ${topologyZone(28, 78, 360, 500, "Legacy data center", "#edf6fc")}
      ${topologyZone(512, 78, 360, 500, "Cisco ACI fabric", "#eef8f1")}
      ${renderTopologyEdges(nodes, edges)}
      ${nodes.map(renderTopologyNode).join("")}
    </svg>
  `;
}

function renderAciTopology(kind, spec) {
  const nodes = [
    topologyNode("APIC cluster", 105, 310, "controller"),
    topologyNode("Spine 1", 330, 180, "switch"),
    topologyNode("Spine 2", 470, 180, "switch"),
    topologyNode("Spine 3", 610, 180, "switch"),
    topologyNode("Leaf 1", 280, 350, "switch"),
    topologyNode("Leaf 2", 405, 350, "switch"),
    topologyNode("Leaf 3", 530, 350, "switch"),
    topologyNode("Border leaf", 655, 350, "switch"),
    topologyNode("Servers", 300, 510, "server"),
    topologyNode("Storage", 445, 510, "server"),
    topologyNode("L4-L7 services", 575, 510, "firewall"),
    topologyNode("External router", 820, 350, "router")
  ];
  const fabricEdges = [];
  [1, 2, 3].forEach((spine) => [4, 5, 6, 7].forEach((leaf) => fabricEdges.push(edge(spine, leaf, "l3"))));
  fabricEdges[0].label = "L3 IS-IS underlay";
  fabricEdges[0].dy = -12;
  const edges = [
    edge(0, 4, "management", "APIC management", { dy: -12 }), edge(0, 7, "management"),
    ...fabricEdges,
    edge(4, 8, "l2", "L2 endpoint"), edge(5, 9, "l2"), edge(6, 10, "l2"),
    edge(7, 11, "l3", "L3Out / OSPF", { dy: -16 })
  ];
  return `
    <svg class="mini-diagram" viewBox="0 0 930 620" role="img" aria-label="${esc(spec.title)}">
      ${topologyCanvas(spec.title, 930, 620)}
      ${topologyZone(28, 78, 155, 470, "Policy control", "#edf6fc")}
      ${topologyZone(205, 78, 555, 500, "Cisco ACI fabric", "#eef8f1")}
      ${topologyZone(782, 78, 120, 470, "External", "#edf6fc")}
      ${renderTopologyEdges(nodes, edges)}
      ${nodes.map(renderTopologyNode).join("")}
    </svg>
  `;
}

function renderWanTopology(kind, spec) {
  const nodes = topologyNodes(spec.nodes, [
    [145, 210], [145, 390], [450, 210], [450, 390], [755, 210], [755, 390]
  ]);
  const layer = kind.includes("l2") ? "l2" : "l3";
  const edges = [
    edge(0, 2, layer, layer === "l3" ? "OSPF" : "L2 stretch", { dy: -18 }), edge(0, 3, layer),
    edge(1, 2, layer), edge(1, 3, layer, layer === "l3" ? "OSPF" : "STP", { dy: 18 }),
    edge(2, 4, layer, layer === "l3" ? "L3 MPLS VPN" : "L2 stretch", { dy: -16 }),
    edge(3, 4, layer),
    edge(4, 5, kind === "wan-sdwan" || kind.includes("remove") ? "management" : layer,
      kind === "wan-sdwan" || kind.includes("remove") ? "Control / management" : layer === "l3" ? "OSPF" : "STP", { dx: 54 })
  ];
  return renderThreeDomainTopology(spec, nodes, edges, ["#edf6fc", "#eef8f1", "#edf6fc"]);
}

function renderCampusTopology(kind, spec) {
  const nodes = topologyNodes(spec.nodes, [
    [145, 210], [145, 390], [450, 210], [450, 390], [755, 210], [755, 390]
  ]);
  let edges;
  if (kind === "campus-hsrp") {
    edges = [
      edge(0, 1, "l2", "L2 peer-link", { dx: -54 }),
      edge(0, 2, "l3", "EIGRP", { dy: -18 }), edge(0, 3, "l3"),
      edge(1, 2, "l3"), edge(1, 3, "l3", "EIGRP", { dy: 18 }),
      edge(2, 3, "l2", "HSRP", { dx: 50 }),
      edge(2, 4, "l2", "802.1Q / STP", { dy: -18 }), edge(2, 5, "l2"),
      edge(3, 4, "l2"), edge(3, 5, "blocked", "STP blocked", { dy: 18 })
    ];
  } else if (kind === "campus-sda") {
    edges = [
      edge(0, 1, "l2", "802.1X"),
      edge(2, 1, "management", "Automation", { dy: -15 }),
      edge(3, 1, "management", "RADIUS / SGT", { dy: 15 }),
      edge(1, 4, "l3", "Fabric underlay"), edge(4, 5, "l3", "OSPF / BGP", { dx: 52 })
    ];
  } else {
    edges = [
      edge(0, 1, "l2", "802.1Q / STP", { dx: -52 }),
      edge(0, 2, "l3", "EIGRP / OSPF", { dy: -18 }), edge(1, 3, "l2"),
      edge(2, 4, "l3"), edge(3, 4, "l2"), edge(4, 5, "l2")
    ];
  }
  return renderThreeDomainTopology(spec, nodes, edges, ["#edf6fc", "#eef8f1", "#edf6fc"]);
}

function renderTopologyDiagram(kind, spec) {
  const nodes = topologyNodes(spec.nodes, [
    [145, 210], [145, 390], [450, 210], [450, 390], [755, 210], [755, 390]
  ]);
  return renderThreeDomainTopology(spec, nodes, [edge(0, 2, "l3"), edge(1, 3, "l2"), edge(2, 4, "l3"), edge(3, 5, "l2")]);
}

function renderThreeDomainTopology(spec, nodes, edges, fills = ["#edf6fc", "#eef8f1", "#edf6fc"]) {
  return `
    <svg class="mini-diagram" viewBox="0 0 900 560" role="img" aria-label="${esc(spec.title)}">
      ${topologyCanvas(spec.title, 900, 560)}
      ${topologyZone(28, 78, 244, 430, spec.zones[0], fills[0])}
      ${topologyZone(328, 78, 244, 430, spec.zones[1], fills[1])}
      ${topologyZone(628, 78, 244, 430, spec.zones[2], fills[2])}
      ${renderTopologyEdges(nodes, edges)}
      ${nodes.map(renderTopologyNode).join("")}
    </svg>
  `;
}

function topologyCanvas(title, width, height) {
  return `
    <rect width="${width}" height="${height}" fill="#f8fbfd"></rect>
    <text x="28" y="42" font-size="21" font-weight="700" font-family="Arial" fill="#142033">${esc(title)}</text>
  `;
}

function topologyZone(x, y, width, height, title, fill) {
  return `
    <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="10" fill="${fill}" stroke="#9ebbd3" stroke-width="2"></rect>
    ${wrapSvgText(title, x + 18, y + 30, Math.max(18, Math.floor(width / 8)), 2, "start", 16, 18, 700)}
  `;
}

function topologyNode(label, cx, cy, type = getNodeType(label)) {
  return { label, cx, cy, type };
}

function topologyNodes(labels, coordinates) {
  return labels.map((label, index) => topologyNode(label, coordinates[index][0], coordinates[index][1]));
}

function edge(from, to, layer = "l2", label = "", options = {}) {
  return { from, to, layer, label, ...options };
}

function renderTopologyEdges(nodes, edges) {
  const colors = { l2: "#2c6fb0", l3: "#2f7d4a", management: "#765a9b", blocked: "#c52f27" };
  const lines = edges.map((item) => {
    const a = nodes[item.from];
    const b = nodes[item.to];
    const color = colors[item.layer] || colors.l2;
    const dashed = item.layer === "management" || item.layer === "blocked";
    return `<line data-layer="${esc(item.layer)}" x1="${a.cx}" y1="${a.cy}" x2="${b.cx}" y2="${b.cy}" stroke="${color}" stroke-width="${item.layer === "blocked" ? 3.4 : 2.5}" ${dashed ? 'stroke-dasharray="8 6"' : ""}></line>`;
  }).join("");
  const labels = edges.filter((item) => item.label).map((item) => {
    const a = nodes[item.from];
    const b = nodes[item.to];
    const x = (a.cx + b.cx) / 2 + (item.dx || 0);
    const y = (a.cy + b.cy) / 2 + (item.dy || 0);
    const color = colors[item.layer] || colors.l2;
    const width = Math.max(46, item.label.length * 6.7 + 16);
    return `
      <g class="link-label" aria-label="${esc(item.label)}">
        <rect x="${x - width / 2}" y="${y - 13}" width="${width}" height="25" rx="4" fill="#ffffff" stroke="${color}" stroke-width="1.2"></rect>
        <text x="${x}" y="${y + 4}" text-anchor="middle" font-size="12" font-weight="700" font-family="Arial" fill="${color}">${esc(item.label)}</text>
        ${item.layer === "blocked" ? `<path d="M${x - 5} ${y - 23} L${x + 5} ${y - 13} M${x + 5} ${y - 23} L${x - 5} ${y - 13}" stroke="${color}" stroke-width="3" stroke-linecap="round"></path>` : ""}
      </g>
    `;
  }).join("");
  return lines + labels;
}

function renderTopologyNode(node) {
  const stroke = "#245a88";
  return `
    <g class="network-node" aria-label="${esc(node.label)}">
      ${renderNodeIcon(node.type, node.cx, node.cy, stroke, "#ffffff")}
      <rect x="${node.cx - 58}" y="${node.cy + 36}" width="116" height="42" rx="5" fill="#ffffff" stroke="#cbd8e4" stroke-width="1.2"></rect>
      ${wrapSvgText(node.label, node.cx, node.cy + 51, 18, 2, "middle", 13, 15, 600)}
    </g>
  `;
}

function getNodeType(label) {
  const text = String(label).toLowerCase();
  if (text.includes("fw") || text.includes("firewall")) return "firewall";
  if (text.includes("access point")) return "wireless";
  if (text.includes("mpls pe") || text.includes("provider pe")) return "router";
  if (text.includes("router") || text.includes("l3out") || text.includes("ospf") || text.includes("wan / dc") || text.includes("wan/dc") || text.includes("route")) return "router";
  if (text.includes("mpls") || text.includes("provider") || text.includes("cloud")) return "cloud";
  if (text.includes("switch") || text.includes("leaf") || text.includes("spine") || text.includes("edge") || text.includes("border") || text.includes("core") || text.includes("distribution") || text.includes("access") || text.includes("fabric")) return "switch";
  if (text.includes("apic") || text.includes("vmanage") || text.includes("catalyst") || text.includes("ise") || text.includes("ad") || text.includes("radius") || text.includes("controller") || text.includes("policy") || text.includes("authorization")) return "controller";
  if (text.includes("server") || text.includes("app") || text.includes("db") || text.includes("epg") || text.includes("vlan") || text.includes("subnet")) return "server";
  if (text.includes("user") || text.includes("iot") || text.includes("supplicant")) return "user";
  return "device";
}

function renderNodeIcon(type, cx, cy, stroke, fill) {
  if (type === "router") {
    return `
      <g>
        <circle cx="${cx}" cy="${cy}" r="30" fill="${fill}" stroke="${stroke}" stroke-width="2.4"></circle>
        <path d="M${cx - 17} ${cy} H${cx + 17} M${cx - 7} ${cy - 10} L${cx - 17} ${cy} L${cx - 7} ${cy + 10} M${cx + 7} ${cy - 10} L${cx + 17} ${cy} L${cx + 7} ${cy + 10}" stroke="${stroke}" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"></path>
      </g>
    `;
  }
  if (type === "switch") {
    return `
      <g>
        <rect x="${cx - 34}" y="${cy - 22}" width="68" height="44" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="2.4"></rect>
        ${[-21,-7,7,21].map((dx) => `<rect x="${cx + dx - 4}" y="${cy + 9}" width="8" height="6" fill="#d9e8f5" stroke="${stroke}" stroke-width="1"></rect>`).join("")}
        <path d="M${cx - 22} ${cy - 5} H${cx + 22} M${cx - 14} ${cy - 11} H${cx + 14}" stroke="${stroke}" stroke-width="1.8" stroke-linecap="round"></path>
      </g>
    `;
  }
  if (type === "firewall") {
    return `
      <g>
        <rect x="${cx - 34}" y="${cy - 24}" width="68" height="48" rx="6" fill="${fill}" stroke="${stroke}" stroke-width="2.4"></rect>
        ${[-12,4].map((yy) => `<line x1="${cx - 34}" y1="${cy + yy}" x2="${cx + 34}" y2="${cy + yy}" stroke="${stroke}" stroke-width="1.4"></line>`).join("")}
        ${[-18,0,18].map((dx) => `<line x1="${cx + dx}" y1="${cy - 24}" x2="${cx + dx}" y2="${cy - 12}" stroke="${stroke}" stroke-width="1.4"></line>`).join("")}
        ${[-27,-9,9,27].map((dx) => `<line x1="${cx + dx}" y1="${cy - 12}" x2="${cx + dx}" y2="${cy + 4}" stroke="${stroke}" stroke-width="1.4"></line>`).join("")}
        ${[-18,0,18].map((dx) => `<line x1="${cx + dx}" y1="${cy + 4}" x2="${cx + dx}" y2="${cy + 24}" stroke="${stroke}" stroke-width="1.4"></line>`).join("")}
      </g>
    `;
  }
  if (type === "cloud") {
    return `
      <g>
        <path d="M${cx - 32} ${cy + 12} C${cx - 44} ${cy + 10}, ${cx - 43} ${cy - 8}, ${cx - 28} ${cy - 8} C${cx - 24} ${cy - 26}, ${cx + 4} ${cy - 28}, ${cx + 10} ${cy - 10} C${cx + 30} ${cy - 14}, ${cx + 42} ${cy + 2}, ${cx + 32} ${cy + 14} Z" fill="${fill}" stroke="${stroke}" stroke-width="2.4"></path>
        <path d="M${cx - 18} ${cy + 3} H${cx + 18}" stroke="${stroke}" stroke-width="2" stroke-linecap="round"></path>
      </g>
    `;
  }
  if (type === "controller") {
    return `
      <g>
        <rect x="${cx - 30}" y="${cy - 26}" width="60" height="52" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="2.4"></rect>
        <circle cx="${cx - 13}" cy="${cy - 8}" r="5" fill="#d9e8f5" stroke="${stroke}" stroke-width="1.5"></circle>
        <circle cx="${cx + 13}" cy="${cy - 8}" r="5" fill="#d9e8f5" stroke="${stroke}" stroke-width="1.5"></circle>
        <circle cx="${cx}" cy="${cy + 11}" r="5" fill="#d9e8f5" stroke="${stroke}" stroke-width="1.5"></circle>
        <path d="M${cx - 8} ${cy - 5} L${cx - 2} ${cy + 7} M${cx + 8} ${cy - 5} L${cx + 2} ${cy + 7}" stroke="${stroke}" stroke-width="1.5"></path>
      </g>
    `;
  }
  if (type === "server") {
    return `
      <g>
        <rect x="${cx - 28}" y="${cy - 30}" width="56" height="60" rx="5" fill="${fill}" stroke="${stroke}" stroke-width="2.4"></rect>
        <line x1="${cx - 28}" y1="${cy - 10}" x2="${cx + 28}" y2="${cy - 10}" stroke="${stroke}" stroke-width="1.5"></line>
        <line x1="${cx - 28}" y1="${cy + 10}" x2="${cx + 28}" y2="${cy + 10}" stroke="${stroke}" stroke-width="1.5"></line>
        <circle cx="${cx + 17}" cy="${cy - 20}" r="3" fill="#247a3b"></circle>
        <circle cx="${cx + 17}" cy="${cy}" r="3" fill="#247a3b"></circle>
        <circle cx="${cx + 17}" cy="${cy + 20}" r="3" fill="#247a3b"></circle>
      </g>
    `;
  }
  if (type === "user") {
    return `
      <g>
        <circle cx="${cx}" cy="${cy - 13}" r="12" fill="${fill}" stroke="${stroke}" stroke-width="2.4"></circle>
        <path d="M${cx - 24} ${cy + 25} C${cx - 20} ${cy + 2}, ${cx + 20} ${cy + 2}, ${cx + 24} ${cy + 25}" fill="${fill}" stroke="${stroke}" stroke-width="2.4"></path>
      </g>
    `;
  }
  if (type === "wireless") {
    return `
      <g>
        <rect x="${cx - 24}" y="${cy + 10}" width="48" height="14" rx="4" fill="${fill}" stroke="${stroke}" stroke-width="2.4"></rect>
        <circle cx="${cx}" cy="${cy + 17}" r="2.8" fill="${stroke}"></circle>
        <path d="M${cx - 22} ${cy - 2} C${cx - 10} ${cy - 15}, ${cx + 10} ${cy - 15}, ${cx + 22} ${cy - 2} M${cx - 13} ${cy + 4} C${cx - 6} ${cy - 4}, ${cx + 6} ${cy - 4}, ${cx + 13} ${cy + 4}" fill="none" stroke="${stroke}" stroke-width="2.2" stroke-linecap="round"></path>
      </g>
    `;
  }
  if (type === "warning") {
    return `
      <g>
        <path d="M${cx} ${cy - 32} L${cx + 34} ${cy + 28} H${cx - 34} Z" fill="${fill}" stroke="${stroke}" stroke-width="2.4"></path>
        <line x1="${cx}" y1="${cy - 10}" x2="${cx}" y2="${cy + 9}" stroke="${stroke}" stroke-width="3" stroke-linecap="round"></line>
        <circle cx="${cx}" cy="${cy + 18}" r="2.8" fill="${stroke}"></circle>
      </g>
    `;
  }
  return `
    <g>
      <rect x="${cx - 30}" y="${cy - 24}" width="60" height="48" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="2.4"></rect>
      <circle cx="${cx - 16}" cy="${cy - 8}" r="3" fill="#247a3b"></circle>
      <path d="M${cx - 8} ${cy - 8} H${cx + 18} M${cx - 18} ${cy + 4} H${cx + 18} M${cx - 18} ${cy + 13} H${cx + 8}" stroke="${stroke}" stroke-width="2" stroke-linecap="round"></path>
    </g>
  `;
}

function wrapSvgText(text, cx, y, maxChars = 14, maxLines = 3, anchor = "middle", fontSize = 12, lineHeight = 14, fontWeight = 400) {
  const words = String(text).split(" ");
  const lines = [];
  words.forEach((word) => {
    if (!lines.length) {
      lines.push(word);
      return;
    }
    const current = lines[lines.length - 1] || "";
    if (!current || `${current} ${word}`.length <= maxChars) lines[lines.length - 1] = current ? `${current} ${word}` : word;
    else lines.push(word);
  });
  return lines.slice(0, maxLines).map((line, index) => `<text x="${cx}" y="${y + index * lineHeight}" text-anchor="${anchor}" font-size="${fontSize}" font-weight="${fontWeight}" font-family="Arial" fill="#18324a">${esc(line)}</text>`).join("");
}

function esc(value) {
  return String(value).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
}

renderQuestion();
setActiveView("questions");
