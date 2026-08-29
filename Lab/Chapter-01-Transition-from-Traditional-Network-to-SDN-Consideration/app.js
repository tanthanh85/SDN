const questions = [
  {
    id: 1,
    type: "single",
    label: "Decision",
    title: "Framing the Transition",
    visual: "assets/sdn-transition-journey.svg",
    context: "The CIO has asked the architecture team to prepare an SDN transition position for the executive committee. Procurement is pushing for a product shortlist, but operations, security, and refinery teams still disagree on which problems SDN should solve first.",
    prompt: "The CIO opens the workshop by asking whether PetroVale should begin by selecting an SDN product. Which response best frames the transition?",
    options: [
      ["A", "Start with a product shortlist because SDN value is mainly determined by controller features."],
      ["B", "Start by clarifying business problems, operational pain points, SDN domains, and architectural principles before selecting products."],
      ["C", "Start by replacing routing protocols with a single controller because that is the purpose of SDN."],
      ["D", "Start with refinery automation because OT is the most sensitive environment."]
    ],
    answer: "B",
    explanation: "The first step is architectural consideration: define problems, domains, boundaries, and operating model before product selection."
  },
  {
    id: 2,
    type: "multi",
    label: "Multiple selection",
    title: "Traditional Network Pain Points",
    context: "During discovery, regional network leads report that branch deployment requires separate tickets for routing, VLANs, firewall objects, monitoring, IP addressing, and application validation. The CTO wants to separate real operational pain from normal network design choices.",
    prompt: "Which current issues are primarily traditional network operational challenges that SDN may help address? (Select 4).",
    options: [
      ["A", "Site rollout requires many manual changes across network, security, monitoring, and application teams."],
      ["B", "The enterprise uses OSPF and BGP in the routed core."],
      ["C", "Guest, IoT, contractor, and OT policies vary by site."],
      ["D", "Firewall policy is subnet-based and poorly tied to business intent."],
      ["E", "Troubleshooting user-to-application issues requires several tools and teams."],
      ["F", "The company uses primary and disaster recovery data centers."]
    ],
    answer: ["A", "C", "D", "E"],
    explanation: "Manual coordination, inconsistent policy, subnet-centric rules, and fragmented troubleshooting are operational pain points. OSPF/BGP and multiple data centers are not problems by themselves."
  },
  {
    id: 3,
    type: "single",
    label: "Decision",
    title: "What SDN Means",
    context: "The CTO says, \"I heard that when we use SDN, we no longer need traditional routing protocols. Can you clarify whether routers and protocols still matter?\"",
    prompt: "A senior engineer says, \"SDN means the controller replaces the routers.\" Which answer is most accurate?",
    options: [
      ["A", "Correct. SDN removes the need for distributed routing protocols in all enterprise designs."],
      ["B", "Mostly correct. SDN replaces routing in the overlay, but routing is never needed in the underlay."],
      ["C", "Incorrect. SDN can coordinate policy and control functions, while routing protocols may still provide underlay reachability and boundary exchange."],
      ["D", "Incorrect because SDN is only an SNMP-based monitoring system."]
    ],
    answer: "C",
    explanation: "SDN does not eliminate routing fundamentals. Traditional routing often remains essential for underlay reachability and domain boundaries."
  },
  {
    id: 4,
    type: "matrix",
    label: "Matrix",
    title: "Planes in the Architecture",
    context: "The architecture board is confused because different vendors use the words controller, orchestrator, dashboard, API, and fabric in different ways. You are asked to normalize the discussion by mapping capabilities to architectural planes.",
    prompt: "Classify each statement by the SDN plane it best describes.",
    columns: ["Data Plane", "Control Plane", "Management Plane", "Application Plane"],
    rows: [
      ["A switch forwards refinery monitoring traffic at line rate.", "Data Plane"],
      ["A controller distributes endpoint reachability or policy state.", "Control Plane"],
      ["An operator uses a dashboard to onboard a site.", "Management Plane"],
      ["A workflow requests contractor access policy through an API.", "Application Plane"]
    ],
    explanation: "Data plane forwards traffic, control plane coordinates forwarding or policy state, management plane is the administrative interface, and application plane expresses higher-level requests or workflows."
  },
  {
    id: 5,
    type: "single",
    label: "Decision",
    title: "Controller Forwarding Concern",
    context: "The refinery operations manager is worried about a controller outage during production hours. He asks whether adopting SDN means refinery traffic must pass through a central controller before it reaches PLCs and HMIs.",
    prompt: "How should you clarify the forwarding role of the controller?",
    options: [
      ["A", "The controller always forwards user traffic, so every controller outage stops all production traffic."],
      ["B", "In most production SDN designs, network devices forward traffic; the controller coordinates policy, topology, state, or configuration."],
      ["C", "Controllers only collect syslog, so controller health is irrelevant."],
      ["D", "Only OpenFlow controllers can influence forwarding; all other controllers are monitoring tools."]
    ],
    answer: "B",
    explanation: "Forwarding usually remains in switches, routers, firewalls, WAN edges, access points, or virtual switches. Controller outage behavior depends on architecture and function."
  },
  {
    id: 6,
    type: "dropdowns",
    label: "Drop-down",
    title: "Underlay and Overlay",
    context: "The data center team is evaluating an overlay fabric for segmentation, while the routing team owns the routed transport underneath it. The CTO asks for a clean explanation that both teams can use in the design workshop.",
    prompt: "Complete the statement.",
    sentence: "In a modern SDN fabric, the [1] provides transport reachability, while the [2] provides logical segmentation or tunnel-based abstraction above that transport.",
    fields: [
      { label: "[1]", answer: "Underlay" },
      { label: "[2]", answer: "Overlay" }
    ],
    choices: ["Data plane", "Overlay", "Underlay", "Management plane", "Northbound API"],
    explanation: "The underlay is the physical or routed transport. The overlay is the logical network built on top of it."
  },
  {
    id: 7,
    type: "single",
    label: "Decision",
    title: "Underlay Stability",
    context: "After a WAN incident, one engineer suggests that an SDN overlay will hide future underlay instability from applications. The CTO asks whether packet loss, MTU, latency, and routing convergence still matter after an overlay is deployed.",
    prompt: "The WAN team argues that once PetroVale adopts an overlay, underlay issues will no longer matter. Which response is best?",
    options: [
      ["A", "Correct. Overlay encapsulation fully hides packet loss, MTU, latency, and routing instability."],
      ["B", "Incorrect. Overlay tunnels and fabric nodes still depend on stable underlay reachability, routing, MTU, latency, loss, and jitter."],
      ["C", "Correct only for branch overlays, but not for data center fabrics."],
      ["D", "Incorrect only because OpenFlow cannot run over WAN links."]
    ],
    answer: "B",
    explanation: "Overlays depend on the transport beneath them. Underlay instability often appears as overlay or application symptoms."
  },
  {
    id: 8,
    type: "multi",
    label: "Multiple selection",
    title: "Why Branch Failover Still Hurts",
    context: "Several branches fail over from MPLS to internet successfully, and the NOC marks the routing incident as resolved. Business users still complain that ERP sessions lag and collaboration calls degrade after failover.",
    prompt: "Which observations are most relevant to SDN consideration? (Select 2).",
    options: [
      ["A", "Traditional routing can restore reachability while still lacking application-aware path control."],
      ["B", "A WAN overlay can apply application policy and performance-based path selection."],
      ["C", "The issue proves that BGP should be removed from all sites."],
      ["D", "The issue proves that the controller should forward all application traffic."],
      ["E", "The issue proves that telemetry is unnecessary if routing converges."]
    ],
    answer: ["A", "B"],
    explanation: "Reachability and application experience are different. SDN-style WAN overlays can add application-aware policy and telemetry-based decisions."
  },
  {
    id: 9,
    type: "matching",
    label: "Matching",
    title: "Interface Types",
    context: "The automation team plans to integrate ITSM workflows, network controllers, telemetry collectors, and device configuration systems. Before selecting tools, they need to agree on which interfaces serve which role.",
    prompt: "Match each interface type to its best description.",
    rows: ["Northbound API", "Southbound interface", "Telemetry/event interface"],
    choices: [
      "Allows applications, automation tools, or workflows to request services from the controller.",
      "Allows the controller to communicate with infrastructure devices or forwarding elements.",
      "Exposes state, metrics, events, or logs to monitoring and assurance systems."
    ],
    answer: {
      "Northbound API": "Allows applications, automation tools, or workflows to request services from the controller.",
      "Southbound interface": "Allows the controller to communicate with infrastructure devices or forwarding elements.",
      "Telemetry/event interface": "Exposes state, metrics, events, or logs to monitoring and assurance systems."
    },
    explanation: "Northbound faces applications and automation. Southbound faces infrastructure. Telemetry/event interfaces expose operational state."
  },
  {
    id: 10,
    type: "multi",
    label: "Multiple selection",
    title: "OpenFlow Without Overstating It",
    context: "A senior manager reads an older article and concludes that SDN means OpenFlow everywhere. The CTO asks you to explain OpenFlow accurately without turning the discussion into a single-protocol debate.",
    prompt: "Which statements correctly position OpenFlow in an SDN discussion? (Select 2).",
    options: [
      ["A", "OpenFlow is one historically important southbound SDN protocol."],
      ["B", "SDN and OpenFlow are exactly the same thing."],
      ["C", "OpenFlow helped demonstrate controller-programmed forwarding behavior."],
      ["D", "Every modern enterprise SDN solution requires OpenFlow as the main protocol."],
      ["E", "OpenFlow is the northbound API used by ITSM systems."]
    ],
    answer: ["A", "C"],
    explanation: "OpenFlow is important but not equal to SDN. Enterprise SDN architectures often use other protocols, APIs, models, and controllers."
  },
  {
    id: 11,
    type: "single",
    label: "Decision",
    title: "Spreadsheet Source of Truth",
    context: "The network team has spreadsheets for VLANs, subnets, site codes, firewall zones, and circuit IDs. The automation lead wants to use those files as input for scripts during the first transition phase.",
    prompt: "PetroVale tracks IP addresses, VLANs, and sites in spreadsheets. What is the most important automation risk?",
    options: [
      ["A", "Automation cannot begin until the entire enterprise becomes SDN."],
      ["B", "Poor data quality can cause automation to deploy incorrect configuration faster and more consistently."],
      ["C", "Spreadsheets are acceptable if engineers remember to check them manually."],
      ["D", "Automation eliminates the need for source-of-truth ownership."]
    ],
    answer: "B",
    explanation: "Automation amplifies data quality. If the source data is inconsistent, automation can make the wrong state repeatable."
  },
  {
    id: 12,
    type: "matrix",
    label: "Comparison table",
    title: "Traditional vs SDN-Oriented Thinking",
    context: "The operations director asks what will actually change in the way engineers work. You need to contrast device-by-device operations with policy, telemetry, API, and fabric-oriented operations.",
    prompt: "Classify each operating behavior.",
    columns: ["Traditional device-centric", "SDN-oriented"],
    rows: [
      ["Configure VLANs manually on each access switch.", "Traditional device-centric"],
      ["Apply a role-based access policy consistently across a fabric domain.", "SDN-oriented"],
      ["Troubleshoot only through hop-by-hop CLI output.", "Traditional device-centric"],
      ["Use path trace, policy state, telemetry, and device state together.", "SDN-oriented"],
      ["Treat APIs as operational interfaces with audit and governance.", "SDN-oriented"]
    ],
    explanation: "SDN-oriented operations use fabric, policy, telemetry, and APIs as operational surfaces, not just individual device CLI."
  },
  {
    id: 13,
    type: "single",
    label: "Decision",
    title: "Centralized Policy Risk",
    context: "The CISO likes the idea of consistent central policy, but the refinery security lead is worried that one bad rule could expose multiple OT sites at once.",
    prompt: "The security manager likes centralized policy but worries about accidental broad OT access. Which answer is most balanced?",
    options: [
      ["A", "Centralized policy removes security risk because all rules are managed in one place."],
      ["B", "Centralized policy can improve consistency but increases blast radius if RBAC, validation, audit, and rollback are weak."],
      ["C", "Centralized policy is useful only for public cloud and not for campus or data center."],
      ["D", "OT policy should be fully automated first so mistakes can be corrected faster."]
    ],
    answer: "B",
    explanation: "Centralized policy improves consistency, but a bad centralized change can affect many places. Governance and validation are essential."
  },
  {
    id: 14,
    type: "order",
    label: "Ordered response",
    title: "Policy Lifecycle",
    context: "A contractor maintenance team needs temporary access to approved refinery applications. Security wants the policy expressed as business intent first, then implemented and validated through technical controls.",
    prompt: "Place the policy lifecycle in the best order.",
    rows: [
      "Define business intent: contractors may access only approved maintenance applications.",
      "Translate intent into technical constructs such as segment, group, contract, ACL, or firewall rule.",
      "Deploy policy to the appropriate enforcement points.",
      "Use telemetry and logs to validate actual behavior.",
      "Review exceptions and update the policy lifecycle."
    ],
    answer: [
      "Define business intent: contractors may access only approved maintenance applications.",
      "Translate intent into technical constructs such as segment, group, contract, ACL, or firewall rule.",
      "Deploy policy to the appropriate enforcement points.",
      "Use telemetry and logs to validate actual behavior.",
      "Review exceptions and update the policy lifecycle."
    ],
    explanation: "Policy should start from intent, move through translation and enforcement, and then be validated and governed over time."
  },
  {
    id: 15,
    type: "multi",
    label: "Multiple selection",
    title: "Monitoring Beyond Up/Down",
    context: "The NOC currently monitors device reachability, interface status, syslog, and NetFlow. The CTO asks what additional operational signals become important when controllers, overlays, and policy systems are introduced.",
    prompt: "Which items should be monitored in an SDN-oriented environment beyond basic device reachability? (Select 4).",
    options: [
      ["A", "Controller service health."],
      ["B", "Policy deployment status."],
      ["C", "Endpoint identity or group assignment."],
      ["D", "Office furniture inventory."],
      ["E", "Overlay tunnel or fabric health."],
      ["F", "Manual spreadsheet formatting."]
    ],
    answer: ["A", "B", "C", "E"],
    explanation: "SDN operations require controller, policy, identity, and overlay/fabric visibility in addition to device reachability."
  },
  {
    id: 16,
    type: "dropdowns",
    label: "Drop-down",
    title: "Candidate Domain Fit",
    context: "PetroVale has several possible starting points: branch path control, campus identity policy, data center segmentation, cloud networking, and assurance. The CTO wants each use case mapped to the most relevant SDN domain instead of forcing one architecture everywhere.",
    prompt: "Select the best SDN domain for each early PetroVale use case.",
    fields: [
      { label: "Standardize branch path selection across MPLS and internet.", answer: "WAN overlay" },
      { label: "Apply identity-based access for users, guests, contractors, and IoT at headquarters.", answer: "Campus fabric" },
      { label: "Improve application-tier segmentation in the primary data center.", answer: "Data center fabric" },
      { label: "Correlate path, policy, telemetry, and user experience.", answer: "Assurance" },
      { label: "Standardize route table and security group deployment for analytics workloads.", answer: "Cloud networking" }
    ],
    choices: ["Data center fabric", "Campus fabric", "WAN overlay", "Cloud networking", "Assurance"],
    explanation: "Each domain solves a different problem. A good SDN discussion maps use cases to domains rather than forcing one solution everywhere."
  },
  {
    id: 17,
    type: "single",
    label: "Decision",
    title: "Fabric Boundary",
    context: "The campus team is considering a fabric, but the current core, firewalls, WAN edge, and cloud interconnects will remain in place during the first phase. The design review focuses on where the fabric stops and how it exchanges routes and policy with other domains.",
    prompt: "Which statement best describes a fabric boundary?",
    options: [
      ["A", "A point where an SDN fabric meets another domain such as a traditional core, firewall, WAN, cloud, or another fabric."],
      ["B", "A user-facing dashboard used only to configure wireless networks."],
      ["C", "A controller process that forwards data-plane traffic."],
      ["D", "A concept that applies only in lab environments."]
    ],
    answer: "A",
    explanation: "Boundaries are where route exchange, security inspection, NAT, service insertion, and operational ownership must be clear."
  },
  {
    id: 18,
    type: "multi",
    label: "Multiple selection",
    title: "SDN as a Spectrum",
    context: "The executive committee asks whether SDN is a single product decision. You explain that PetroVale may adopt SDN capabilities at different speeds across automation, campus, WAN, data center, cloud, and assurance domains.",
    prompt: "Which statements support the idea that SDN is a spectrum rather than one product? (Select 3).",
    options: [
      ["A", "Some environments begin with API-based automation and inventory visibility."],
      ["B", "Some environments use overlay fabrics for segmentation and mobility."],
      ["C", "Every SDN deployment must use one controller for the whole enterprise."],
      ["D", "Some domains focus on assurance and telemetry more than forwarding changes."],
      ["E", "SDN always removes firewalls from the path."]
    ],
    answer: ["A", "B", "D"],
    explanation: "SDN can appear as automation, overlays, fabrics, controller-driven policy, assurance, or telemetry-driven workflows."
  },
  {
    id: 19,
    type: "matrix",
    label: "Matrix",
    title: "Classifying Stakeholder Concerns",
    context: "The workshop has become noisy: the CTO asks about protocols, the CISO asks about policy blast radius, operations asks about troubleshooting, and enterprise architecture asks which domain should go first.",
    prompt: "Classify each stakeholder concern.",
    columns: ["Architecture", "Operations", "Security", "Technology misconception"],
    rows: [
      ['"Does SDN mean OpenFlow everywhere?"', "Technology misconception"],
      ['"Could centralized policy accidentally open refinery access?"', "Security"],
      ['"How do we troubleshoot user-to-application paths across many tools?"', "Operations"],
      ['"Which domains should be considered first?"', "Architecture"]
    ],
    explanation: "Separating misconception, security, operations, and architecture concerns prevents the team from treating every issue as a product selection question."
  },
  {
    id: 20,
    type: "single",
    label: "Decision",
    title: "Close Distractor: Cloud Workloads",
    context: "The cloud team runs analytics workloads in public cloud and manages route tables, security groups, and logging separately from the enterprise network team. A manager suggests that cloud presence alone proves the whole company must deploy SDN immediately.",
    prompt: "PetroVale has public cloud workloads. Which conclusion is most defensible at this early stage?",
    options: [
      ["A", "Public cloud presence proves the enterprise must deploy SDN everywhere immediately."],
      ["B", "Cloud workloads are one input; the team should evaluate route control, security policy, logging, and automation needs before selecting a cloud networking approach."],
      ["C", "Cloud workloads are unrelated to SDN because SDN is only used in physical campus networks."],
      ["D", "Cloud networking should be solved by moving all firewall rules into spreadsheets."]
    ],
    answer: "B",
    explanation: "Cloud is a candidate SDN-related domain, but the correct next step is requirements and architecture analysis, not immediate enterprise-wide deployment."
  },
  {
    id: 21,
    type: "multi",
    label: "Multiple selection",
    title: "Realistic SDN Risks",
    context: "Before approving a pilot, the risk committee asks what new risks SDN introduces. They are not looking for fear-based objections; they want realistic control points that must be designed and governed.",
    prompt: "Which risks are realistic when PetroVale introduces SDN? (Select 3).",
    options: [
      ["A", "Controller compromise can affect many network objects."],
      ["B", "Poorly designed policy can be deployed at scale."],
      ["C", "Engineers no longer need routing or switching knowledge."],
      ["D", "API credentials become privileged assets."],
      ["E", "Telemetry makes troubleshooting impossible."]
    ],
    answer: ["A", "B", "D"],
    explanation: "Controllers, policy systems, and API credentials become high-value assets. SDN still requires strong network fundamentals."
  },
  {
    id: 22,
    type: "single",
    label: "Decision",
    title: "OT First Move",
    visual: "assets/it-ot-boundary.svg",
    context: "The refinery team explains that some PLCs and HMIs use legacy protocols, run for long maintenance cycles, and cannot tolerate active probing or frequent policy changes. The CTO asks what an SDN-oriented first move should look like without endangering production.",
    prompt: "Which first SDN-related capability best fits the OT environment?",
    options: [
      ["A", "Aggressive automated microsegmentation of every PLC and HMI."],
      ["B", "Passive visibility and controlled boundary monitoring before active enforcement."],
      ["C", "Dynamic policy changes based on unverified recommendations."],
      ["D", "Replace all refinery switches with OpenFlow switches immediately."]
    ],
    answer: "B",
    explanation: "OT requires conservative, safety-aware change. Visibility and controlled boundary monitoring should come before active enforcement."
  },
  {
    id: 23,
    type: "matching",
    label: "Matching",
    title: "Cisco Solution Areas",
    context: "PetroVale leadership asks how Cisco solution areas relate to the design domains being discussed. You need to map examples to domains without implying that the company has selected a final vendor architecture.",
    prompt: "Match each Cisco solution area to the most appropriate conceptual domain.",
    rows: ["Cisco ACI", "Cisco SD-Access", "Cisco Catalyst SD-WAN", "Cisco Meraki Dashboard", "Cisco ISE"],
    choices: ["Data center fabric", "Campus fabric", "WAN overlay", "Cloud-managed branch/campus operations", "Identity and policy integration"],
    answer: {
      "Cisco ACI": "Data center fabric",
      "Cisco SD-Access": "Campus fabric",
      "Cisco Catalyst SD-WAN": "WAN overlay",
      "Cisco Meraki Dashboard": "Cloud-managed branch/campus operations",
      "Cisco ISE": "Identity and policy integration"
    },
    explanation: "Cisco solution areas map to different domains and should be discussed by use case."
  },
  {
    id: 24,
    type: "multi",
    label: "Multiple selection",
    title: "Low-Risk First Steps",
    context: "PetroVale wants shorter branch rollout times, but the operations team has limited controller and API experience. The head of infrastructure asks for first steps that build automation readiness without allowing scripts to make broad production changes too early.",
    prompt: "Which first steps best balance value and risk? (Select 2).",
    options: [
      ["A", "Begin with read-only inventory collection and standards validation."],
      ["B", "Automate all branch firewall, routing, and segmentation changes across every site immediately."],
      ["C", "Standardize site data, naming, IP addressing, templates, and monitoring registration."],
      ["D", "Disable change approval because automation is repeatable."],
      ["E", "Replace all branch routing with a custom script owned by one engineer."]
    ],
    answer: ["A", "C"],
    explanation: "Read-only automation and standards reduce risk while building a foundation for later controller/API workflows."
  },
  {
    id: 25,
    type: "multi",
    label: "Boundary selection",
    title: "Where Boundaries Matter",
    visual: "assets/brownfield-petroleum-network.svg",
    context: "The architecture board reviews the brownfield topology and asks where migration boundaries must be explicit before any SDN domain is introduced. The concern is route exchange, policy ownership, troubleshooting responsibility, and failure isolation.",
    prompt: "Where would SDN architecture concepts need clear boundaries before migration? (Select 3).",
    options: [
      ["A", "HQ campus to traditional core."],
      ["B", "Desk phone to user's chair."],
      ["C", "IT/OT firewall boundary."],
      ["D", "Firewall to data center/cloud."],
      ["E", "Keyboard to laptop screen."]
    ],
    answer: ["A", "C", "D"],
    explanation: "The relevant boundaries are where network domains and controls meet: campus/core, IT/OT firewall, and firewall-to-data-center/cloud."
  },
  {
    id: 26,
    type: "single",
    label: "Decision",
    title: "The Tricky Part of Segmentation",
    context: "The campus team says segmentation already exists because PetroVale has VLANs, VRFs, ACLs, firewall zones, and route leaks. Security argues that the real problem is whether those technical constructs still match business intent as sites and exceptions grow.",
    prompt: "Why is PetroVale's VLAN-based segmentation difficult to operate at scale?",
    options: [
      ["A", "VLANs cannot forward traffic."],
      ["B", "VLANs, subnets, VRFs, ACLs, route leaks, and firewall rules often mix technical boundaries with business policy, making consistency hard as sites and exceptions grow."],
      ["C", "VLANs are always less secure than any controller-based policy, regardless of implementation."],
      ["D", "VLANs prevent all automation."]
    ],
    answer: "B",
    explanation: "Traditional segmentation often spreads intent across multiple constructs. The difficulty is long-term consistency, ownership, and exception control."
  },
  {
    id: 27,
    type: "single",
    label: "Decision",
    title: "Assurance vs Monitoring",
    context: "After a user-impacting incident, every device showed green in the monitoring system, but traffic still followed an unexpected path and hit an incorrect policy rule. The CTO asks how assurance differs from ordinary monitoring.",
    prompt: "Which statement best separates monitoring from assurance?",
    options: [
      ["A", "Monitoring collects status and events; assurance validates whether actual network behavior matches intended service behavior."],
      ["B", "Assurance is the same as SNMP polling."],
      ["C", "Monitoring is used only before SDN; assurance is used only after all devices are replaced."],
      ["D", "Assurance removes the need for troubleshooting."]
    ],
    answer: "A",
    explanation: "Monitoring detects state and events. Assurance correlates topology, path, policy, telemetry, and intent to validate service behavior."
  },
  {
    id: 28,
    type: "multi",
    label: "Multiple selection",
    title: "What Not to Promise",
    context: "The CIO asks for a short executive message about SDN benefits. You want the message to be credible, so you must avoid promises that would create false expectations for routing knowledge, documentation quality, firewalls, or operations process.",
    prompt: "Which statements should the architecture team avoid promising during the first SDN consideration workshop? (Select 3).",
    options: [
      ["A", "SDN will remove the need for routing and switching expertise."],
      ["B", "A controller will automatically fix poor documentation and bad source data."],
      ["C", "SDN can improve policy consistency when governance and design are strong."],
      ["D", "SDN will eliminate every firewall and operational process."],
      ["E", "SDN can expose APIs and telemetry that support automation and assurance."]
    ],
    answer: ["A", "B", "D"],
    explanation: "SDN does not remove network fundamentals, magically repair data quality, or eliminate security/operations processes."
  },
  {
    id: 29,
    type: "order",
    label: "Ordered response",
    title: "Reasonable Transition Sequence",
    context: "The CTO wants a practical transition roadmap for the next workshops. The team must avoid jumping from product demos directly into implementation without first validating business drivers, SDN concepts, candidate domains, boundaries, and operating model.",
    prompt: "Place the early transition activities in the most reasonable order.",
    rows: [
      "Clarify traditional network issues and business priorities.",
      "Explain SDN concepts, planes, APIs, underlay, overlay, policy, telemetry, and risks.",
      "Identify candidate SDN domains and boundaries.",
      "Develop the design in the next workshop.",
      "Plan implementation, operations, automation, and optimization in later phases."
    ],
    answer: [
      "Clarify traditional network issues and business priorities.",
      "Explain SDN concepts, planes, APIs, underlay, overlay, policy, telemetry, and risks.",
      "Identify candidate SDN domains and boundaries.",
      "Develop the design in the next workshop.",
      "Plan implementation, operations, automation, and optimization in later phases."
    ],
    explanation: "The learning flow starts with why the current model is hard, then what SDN means, then where it may apply, before design and implementation."
  },
  {
    id: 30,
    type: "matrix-multi",
    label: "Multi-select matrix",
    title: "First-Wave SDN Candidate Prioritization",
    context: "After the transition sequence is accepted, the CIO asks the architecture team to sort several candidate initiatives. Leadership wants early progress, but the first wave must not confuse good discovery work, risky enforcement, and non-SDN drivers.",
    prompt: "For each candidate, select every classification that applies.",
    columns: [
      "First-wave candidate",
      "Later-phase candidate",
      "Not an SDN driver",
      "Requires governance before pilot"
    ],
    rows: [
      {
        statement: "Read-only inventory collection and configuration standards validation for branch devices.",
        answer: ["First-wave candidate", "Requires governance before pilot"]
      },
      {
        statement: "Immediate automated policy deployment across all refineries and production cells.",
        answer: ["Later-phase candidate", "Requires governance before pilot"]
      },
      {
        statement: "Replacing OSPF and BGP everywhere because the company is considering SDN.",
        answer: ["Not an SDN driver"]
      },
      {
        statement: "Evaluating an overlay for application-aware failover at selected regional offices.",
        answer: ["First-wave candidate", "Requires governance before pilot"]
      },
      {
        statement: "Campus identity-based segmentation for guest, contractor, and IoT access.",
        answer: ["First-wave candidate", "Requires governance before pilot"]
      }
    ],
    explanation: "Good first-wave candidates create visibility, validate standards, or pilot bounded policy improvements with governance. Active enforcement across refineries is too risky as a first move, and replacing routing protocols is not itself an SDN driver."
  },
  {
    id: 31,
    type: "matrix-multi",
    label: "Multi-select matrix",
    title: "Control Placement and Failure Impact",
    context: "The risk committee reviews the candidate list and asks the architecture team to classify several failure and control scenarios. They want to know whether SDN creates data-plane risk, control-plane risk, governance risk, or whether a concern is not meaningful.",
    prompt: "For each situation, select every impact category that applies.",
    columns: [
      "Data-plane impact",
      "Control-plane impact",
      "Operations/governance impact",
      "Not a meaningful SDN concern"
    ],
    rows: [
      {
        statement: "A fabric edge loses underlay reachability to remote fabric peers.",
        answer: ["Data-plane impact", "Control-plane impact"]
      },
      {
        statement: "An operator deploys an overly broad contractor-access policy.",
        answer: ["Operations/governance impact"]
      },
      {
        statement: "The controller UI is unavailable, but existing switch forwarding entries remain valid.",
        answer: ["Control-plane impact", "Operations/governance impact"]
      },
      {
        statement: "An automation workflow reads a spreadsheet containing duplicate VLAN and subnet assignments.",
        answer: ["Operations/governance impact"]
      },
      {
        statement: "The company continues to use BGP at WAN and data-center boundaries.",
        answer: ["Not a meaningful SDN concern"]
      }
    ],
    explanation: "SDN does not make all failures equal. Underlay failures can affect both forwarding and control reachability, controller availability affects management and change workflows, poor policy or source data is a governance risk, and using BGP at boundaries remains normal."
  },
  {
    id: 32,
    type: "matrix-multi",
    label: "Multi-select matrix",
    title: "Evidence Required Before Design Approval",
    context: "Before approving the next design workshop, the steering committee asks what evidence should be required. The team must distinguish evidence that is mandatory before a pilot from information that is useful, delayed until implementation, or misleading.",
    prompt: "For each evidence item, select every classification that applies.",
    columns: [
      "Required before pilot",
      "Useful but not sufficient",
      "Can wait until implementation",
      "Misleading evidence"
    ],
    rows: [
      {
        statement: "Documented application dependencies for refinery historian, jump host, and engineering workstation flows.",
        answer: ["Required before pilot"]
      },
      {
        statement: "A vendor demonstration showing a clean dashboard with all services green.",
        answer: ["Useful but not sufficient"]
      },
      {
        statement: "A rollback plan for policy changes and controller-driven configuration changes.",
        answer: ["Required before pilot"]
      },
      {
        statement: "An assumption that routing convergence alone proves application experience.",
        answer: ["Misleading evidence"]
      },
      {
        statement: "Detailed rack elevations for every access closet in every branch.",
        answer: ["Can wait until implementation"]
      }
    ],
    explanation: "Pilot approval requires service dependency knowledge and rollback planning. Vendor demos and physical implementation details may help later, but they do not prove readiness. Routing convergence alone can hide policy, path, and application-experience problems."
  },
  {
    id: 33,
    type: "single",
    label: "Final decision",
    title: "Executive Summary",
    context: "At the end of the workshop, the CIO asks you to summarize SDN in one statement that can be used with executives, network engineers, security architects, and OT stakeholders.",
    prompt: "The CIO asks for the closing statement. Which answer best summarizes what PetroVale has learned?",
    options: [
      ["A", "SDN is OpenFlow switching controlled by one enterprise controller."],
      ["B", "SDN is a replacement for routing, switching, firewalls, monitoring, and operations teams."],
      ["C", "SDN is an architecture that makes networking more programmable, policy-driven, centrally coordinated, observable, and automation-friendly while forwarding remains in the infrastructure."],
      ["D", "SDN is a cloud-only service for managing SaaS traffic."]
    ],
    answer: "C",
    explanation: "This captures SDN as architecture and operating model without overstating controller forwarding or eliminating traditional network fundamentals."
  }
];




const state = {
  index: 0,
  responses: [],
  activeView: "questions",
  unlockedContextIds: new Set(),
  unreadContextIds: new Set()
};

const qView = document.getElementById("questionView");
const rView = document.getElementById("resultsView");
const backgroundView = document.getElementById("backgroundView");
const networkView = document.getElementById("networkView");
const contextsView = document.getElementById("contextsView");
const contextCards = document.getElementById("contextCards");
const menuItems = Array.from(document.querySelectorAll(".menu-item"));
const viewMap = {
  questions: qView,
  background: backgroundView,
  network: networkView,
  contexts: contextsView
};

function setActiveView(view) {
  state.activeView = view;

  if (view === "contexts") {
    state.unreadContextIds.clear();
  }

  Object.entries(viewMap).forEach(([key, element]) => {
    element.classList.toggle("hidden", key !== view);
  });

  if (view === "questions" && state.responses.length === questions.length) {
    qView.classList.add("hidden");
    rView.classList.remove("hidden");
  } else {
    rView.classList.add("hidden");
  }

  menuItems.forEach((button) => {
    button.classList.toggle("active", button.dataset.view === view);
  });

  renderMenuState();
}

function renderMenuState() {
  const contextButton = menuItems.find((button) => button.dataset.view === "contexts");
  if (!contextButton) return;

  const count = state.unreadContextIds.size;
  const label = contextButton.querySelector(".menu-label");
  const hint = contextButton.querySelector(".menu-hint");
  const badge = contextButton.querySelector(".menu-badge");

  if (label) label.textContent = count ? "New Scenario Update" : "Scenario Updates";
  if (hint) hint.textContent = count ? "Review the latest information" : "Information revealed during the workshop";
  if (badge) {
    badge.textContent = count ? String(count) : "";
    badge.classList.toggle("hidden", count === 0);
  }
}

function renderContextCards() {
  const visibleContexts = questions
    .filter((question) => state.unlockedContextIds.has(`question-${question.id}`))
    .map((question) => getScenarioUpdate(question));

  if (!visibleContexts.length) {
    contextCards.innerHTML = `
      <div class="empty-context">
        <h3>No scenario updates released yet</h3>
        <p>Scenario material will appear here as PetroVale's SDN transition discussion unfolds.</p>
      </div>
    `;
    return;
  }

  contextCards.innerHTML = visibleContexts.map((item, index) => `
    <article class="context-card ${index === visibleContexts.length - 1 ? "latest-context" : ""}" id="context-${item.id}">
      <div class="message-topline">
        <span>${item.type}</span>
        <strong class="priority-${item.priorityLevel}">${item.priority}</strong>
      </div>
      <h3>${item.subject}</h3>
      <dl class="message-meta">
        <div><dt>From</dt><dd>${item.from}</dd></div>
        <div><dt>To</dt><dd>${item.to}</dd></div>
        <div><dt>CC</dt><dd>${item.cc}</dd></div>
        <div><dt>Topic</dt><dd>${item.topic}</dd></div>
      </dl>
      <div class="message-body">
        ${renderMessageBody(item.body)}
      </div>
      <p class="message-signature">${item.signature}</p>
    </article>
  `).join("");
}

function renderMessageBody(paragraphs) {
  return paragraphs.map((paragraph, index) => {
    if (index !== 0) return `<p>${paragraph}</p>`;

    const match = paragraph.match(/^(Dear .*?, good (?:morning|afternoon)\.)\s+(.*)$/);
    if (!match) return `<p>${paragraph}</p>`;

    return `
      <p class="message-greeting">${match[1]}</p>
      <p>${match[2]}</p>
    `;
  }).join("");
}

function getScenarioUpdate(question) {
  const stakeholder = getStakeholder(question);
  return {
    id: `question-${question.id}`,
    type: stakeholder.type,
    priority: stakeholder.priority,
    priorityLevel: stakeholder.priorityLevel,
    from: `${stakeholder.name}, ${stakeholder.role}`,
    to: stakeholder.to,
    cc: stakeholder.cc,
    topic: question.title,
    subject: stakeholder.subject,
    body: buildScenarioMessage(question),
    signature: stakeholder.signature
  };
}

function buildScenarioMessage(question) {
  return [
    ...getMessageBody(question),
    getMessageClosing(question)
  ];
}

function getStakeholder(question) {
  const profiles = {
    1: ["Internal email", "High", "high", "Trần Minh Linh", "CIO", "Executive Committee", "CTO; CISO; VP Operations; Enterprise Architecture", "SDN transition framing before vendor discussion", "Clarify how the team should frame SDN evaluation before product selection."],
    2: ["Meeting memo", "High", "high", "Nguyễn Hoàng Minh", "CTO", "SDN Architecture Working Group", "CIO; Network Operations; Security Architecture", "Separate real pain points from normal network design", "Identify which brownfield issues SDN may realistically help address."],
    3: ["Internal email", "High", "high", "Nguyễn Hoàng Minh", "CTO", "Lead SDN Architect", "Enterprise Architecture; Network Operations", "Routing protocols and SDN architecture", "Clarify whether SDN removes the need for routing protocols and routers."],
    4: ["Architecture memo", "Normal", "normal", "Phạm Quỳnh Anh", "Enterprise Architect", "SDN Architecture Working Group", "CTO; Platform Engineering", "Normalize SDN terminology across teams", "Classify capabilities by architectural plane before the design discussion continues."],
    5: ["Refinery operations email", "High", "high", "Nguyễn Văn Thành", "Refinery Operations Manager", "Lead SDN Architect", "CISO; OT Security; CTO", "Controller outage concern during production", "Clarify whether production traffic depends on a controller in the forwarding path."],
    6: ["Design memo", "Normal", "normal", "Nguyễn Hoàng Minh", "CTO", "Data Center and Routing Teams", "Enterprise Architecture", "Underlay and overlay explanation", "Complete a common definition the data center and routing teams can both use."],
    7: ["Incident follow-up", "High", "high", "Trần Hải Yến", "WAN Operations Lead", "SDN Architecture Working Group", "NOC; CTO; Regional IT", "Overlay dependency on transport quality", "Determine whether underlay stability remains a design requirement."],
    8: ["Business impact email", "High", "high", "Phạm Thùy Dương", "VP Regional Operations", "CIO; CTO", "WAN Operations; Enterprise Architecture", "Branch failover restores reachability but not experience", "Identify why application experience can remain poor after routing failover succeeds."],
    9: ["Automation planning email", "Normal", "normal", "Vũ Đức Anh", "Automation Lead", "SDN Architecture Working Group", "ITSM Platform Owner; NOC", "Controller, device, and telemetry interfaces", "Map interface types before API and tool integration work begins."],
    10: ["Executive clarification", "Normal", "normal", "Nguyễn Hoàng Minh", "CTO", "Executive Committee", "Lead SDN Architect; Enterprise Architecture", "OpenFlow position in SDN discussion", "Explain OpenFlow accurately without reducing SDN to one protocol."],
    11: ["Automation risk memo", "High", "high", "Vũ Đức Anh", "Automation Lead", "Network Operations", "CIO; CTO; Security Architecture", "Spreadsheet source-of-truth risk", "Evaluate the risk of using current operational spreadsheets as automation input."],
    12: ["Operations memo", "Normal", "normal", "Đỗ Ngọc Lan", "Director of Network Operations", "SDN Architecture Working Group", "NOC; Automation Team", "Operating model shift", "Separate device-centric behaviors from SDN-oriented operating behaviors."],
    13: ["Security memo", "High", "high", "Lê Thu Trang", "CISO", "CIO; CTO", "Refinery Security; Enterprise Architecture", "Centralized policy blast radius", "Balance centralized policy benefits against control, validation, and rollback risks."],
    14: ["Access request", "High", "high", "Lê Thu Trang", "CISO", "SDN Architecture Working Group", "Refinery Operations; Identity Team", "Contractor maintenance access lifecycle", "Order the policy lifecycle from business intent through validation and review."],
    15: ["NOC readiness note", "Normal", "normal", "Đỗ Ngọc Lan", "Director of Network Operations", "NOC Leads", "CTO; Assurance Team", "Monitoring signals for SDN operations", "Identify monitoring requirements beyond simple device up/down status."],
    16: ["Portfolio planning memo", "Normal", "normal", "Nguyễn Hoàng Minh", "CTO", "Executive Committee", "CIO; Enterprise Architecture; Domain Leads", "Candidate SDN domain fit", "Map each early use case to the most appropriate SDN domain."],
    17: ["Architecture review", "High", "high", "Phạm Quỳnh Anh", "Enterprise Architect", "SDN Architecture Working Group", "Routing Team; Firewall Team; Cloud Platform", "Fabric boundary definition", "Define what a fabric boundary means in a brownfield migration."],
    18: ["Executive committee email", "Normal", "normal", "Nguyễn Thu Hà", "CEO", "CIO; CTO; CISO", "VP Operations; Enterprise Architecture", "SDN as staged capability adoption", "Identify statements that show SDN is a spectrum, not one product."],
    19: ["Workshop summary", "Normal", "normal", "Phạm Quỳnh Anh", "Enterprise Architect", "SDN Architecture Working Group", "CIO; CTO; CISO", "Stakeholder concern classification", "Classify concerns so the team does not treat every issue as product selection."],
    20: ["Cloud governance note", "Normal", "normal", "Lê Quốc Bảo", "Cloud Platform Lead", "SDN Architecture Working Group", "Security Architecture; Data Analytics", "Cloud workloads and SDN timing", "Decide what public cloud presence means for early SDN consideration."],
    21: ["Risk committee memo", "High", "high", "Lê Thu Trang", "CISO", "Risk Committee", "CIO; CTO; Lead SDN Architect", "Realistic SDN risk controls", "Identify practical risks that must be governed in an SDN transition."],
    22: ["Refinery safety memo", "High", "high", "Nguyễn Văn Thành", "Refinery Operations Manager", "CIO; CTO; CISO", "OT Security; Lead SDN Architect", "Safe first move for OT", "Choose the first SDN-related capability that respects OT safety constraints."],
    23: ["Vendor mapping note", "Normal", "normal", "Trần Minh Linh", "CIO", "SDN Architecture Working Group", "Procurement; CTO; Enterprise Architecture", "Cisco solution areas and SDN domains", "Map Cisco examples to conceptual domains without implying final vendor selection."],
    24: ["Infrastructure planning memo", "High", "high", "Đỗ Ngọc Lan", "Director of Network Operations", "CTO; Automation Lead", "NOC; Regional IT", "Low-risk automation readiness", "Select first steps that reduce branch rollout time without broad production risk."],
    25: ["Migration design memo", "High", "high", "Phạm Quỳnh Anh", "Enterprise Architect", "SDN Architecture Working Group", "Routing; Firewall; OT Security; Cloud Platform", "Migration boundaries in brownfield topology", "Select the boundaries that must be explicit before migration starts."],
    26: ["Security architecture memo", "High", "high", "Lê Thu Trang", "CISO", "Security Architecture Team", "CTO; Campus Network; Refinery Security", "Why current segmentation is hard to scale", "Explain why VLAN-based segmentation becomes difficult as exceptions grow."],
    27: ["Assurance incident memo", "Normal", "normal", "Nguyễn Hoàng Minh", "CTO", "NOC; SDN Architecture Working Group", "CIO; Application Owners", "Monitoring versus assurance", "Clarify how assurance differs from basic monitoring after a user-impacting incident."],
    28: ["Executive messaging request", "High", "high", "Trần Minh Linh", "CIO", "Lead SDN Architect", "CTO; CISO; Communications", "Avoid overpromising SDN benefits", "Select the promises the architecture team should avoid making."],
    29: ["Roadmap request", "High", "high", "Nguyễn Hoàng Minh", "CTO", "SDN Architecture Working Group", "CIO; CISO; VP Operations", "Practical transition sequence", "Order the early transition activities before design and implementation workshops."],
    30: ["Planning email", "High", "high", "Trần Minh Linh", "CIO", "SDN Architecture Working Group", "CEO; CTO; CISO; VP Regional Operations", "First-wave SDN candidate prioritization", "Classify the candidate initiatives before the team moves into design approval."],
    31: ["Risk committee memo", "High", "high", "Lê Thu Trang", "CISO", "Risk Committee", "CIO; CTO; Lead SDN Architect; Network Operations", "Control placement and failure impact", "Classify SDN-related failure and control scenarios by impact area."],
    32: ["Steering committee note", "High", "high", "Phạm Quỳnh Anh", "Enterprise Architect", "SDN Architecture Working Group", "CIO; CTO; CISO; Procurement", "Evidence required before design approval", "Separate required pilot evidence from useful, delayed, or misleading evidence."],
    33: ["Executive summary request", "High", "high", "Trần Minh Linh", "CIO", "Lead SDN Architect", "CEO; CTO; CISO", "One-statement SDN summary", "Choose the executive summary that is accurate for IT, security, operations, and OT."]
  };
  const [type, priority, priorityLevel, name, role, to, cc, subject, action] = profiles[question.id];
  return {
    type,
    priority,
    priorityLevel,
    name,
    role,
    to,
    cc,
    subject,
    action,
    body: getMessageBody(question),
    signature: `${getSignoff(question.id)}\n${name}\n${role}\nPetroVale Energy`
  };
}

function getSignoff(questionId) {
  if ([5, 22].includes(questionId)) return "Respectfully,";
  if ([8, 24].includes(questionId)) return "Thanks,";
  if ([1, 18, 28, 33].includes(questionId)) return "Best regards,";
  return "Regards,";
}

function getMessageClosing(question) {
  const closings = {
    1: "Thank you for helping us start this program carefully. Please share your view when ready; I will wait for the architecture team's response before updating the internal briefing notes.",
    2: "Thank you for reviewing the discovery notes. Please send back your comments when ready so we can keep the internal record accurate.",
    3: "Thank you for helping clear up this point. I appreciate a response that can be shared with both executives and senior engineers.",
    4: "Thanks everyone. Please reply with any corrections to the terminology before I publish the internal architecture note.",
    5: "Thank you for treating this with the right level of care. The refinery team will wait for your response before discussing any OT-facing pilot scope.",
    6: "Thank you. Please confirm the wording when ready so both teams can refer to the same explanation in future design conversations.",
    7: "Thanks. Please share a practical response that we can attach to the incident review notes.",
    8: "Thank you. Regional Operations will wait for this clarification before joining further internal WAN discussions.",
    9: "Thanks for helping keep the terminology clean. Please respond when ready so the integration owners can align their notes.",
    10: "Thank you. I will wait for the final wording before updating the steering committee notes.",
    11: "Thanks. The automation team will wait for this assessment before deciding how to handle the current spreadsheets.",
    12: "Thank you. Network Operations will wait for your response before updating its internal readiness notes.",
    13: "Thank you. Please share a balanced response that the CISO can use in the security governance discussion.",
    14: "Thanks. Once we receive your response, this contractor case can be documented as a reference example.",
    15: "Thank you. The NOC leads will wait for the updated view before changing any pilot-readiness criteria.",
    16: "Thanks. Please share the domain-fit view when ready so leadership can review it internally.",
    17: "Thank you. I will wait for the boundary language before updating the migration assumptions.",
    18: "Thanks everyone. Please respond with any concerns before we use this framing in the next executive discussion.",
    19: "Thank you. Once the concerns are classified, we can route each item to the right owner.",
    20: "Thanks. The cloud team will wait for the response before updating its governance notes.",
    21: "Thank you. Please respond with practical risk language that engineering and risk management can both use.",
    22: "Thank you for keeping refinery safety central. The OT team will wait for this response before opening deeper IT/OT design discussions.",
    23: "Thanks. Please keep the mapping vendor-neutral so procurement and architecture can use the same internal reference.",
    24: "Thank you. Infrastructure leadership will wait for the recommendation before committing resources to readiness activities.",
    25: "Thanks. Once these boundaries are confirmed, the design team can update the migration assumptions.",
    26: "Thank you. Please make the distinction carefully so security and network teams can align on the wording.",
    27: "Thanks. The NOC and application owners will wait for this clarification before updating the operations notes.",
    28: "Thank you. Please keep the wording credible; Communications will wait for approval before reusing it in the SDN transition briefing.",
    29: "Thanks. The CTO will wait for this sequence before scheduling the follow-up workshops.",
    30: "Thank you for helping us keep the first wave credible. I will wait for your classification before we confirm which topics belong in the next design workshop.",
    31: "Thank you. The risk committee will wait for the impact classification before deciding which controls must be written into the pilot governance model.",
    32: "Thank you. Please send back the evidence classification when ready so the steering committee can decide whether the design workshop has enough input to proceed.",
    33: "Thank you for supporting this first transition scenario. Once the summary is agreed, we can close the concept phase with a shared understanding."
  };

  return closings[question.id];
}


function getMessageBody(question) {
  const messages = {
    1: [
      "Dear Executive Committee, good morning. As discussed in our initial modernization briefing, PetroVale is under pressure to move quickly into vendor briefings. Before we do that, I would like the architecture team to confirm that the SDN discussion is not treated as a product comparison exercise.",
      "The first pending item is to establish the correct decision frame. We need to agree on what SDN should improve for PetroVale: policy consistency, operational speed, visibility, automation, safer change control, and a realistic path from the brownfield network toward SDN-oriented operations."
    ],
    2: [
      "Dear SDN Architecture Working Group, good afternoon. The CIO's concern about premature vendor selection has been noted, and the team agreed that the first step is to understand the current network problems before discussing products.",
      "The discovery meeting raised a new pending item: which issues are true brownfield operational pain points, and which are simply normal network design choices? The working group needs a clean separation between manual coordination, inconsistent policy, subnet-centric firewall rules, fragmented troubleshooting, and normal protocols or topology elements that are not problems by themselves."
    ],
    3: [
      "Dear Lead SDN Architect, good morning. The brownfield pain points have now been separated from normal routing and data center design choices. That helped the leadership team avoid treating OSPF, BGP, or multiple data centers as automatic problems.",
      "A new concern came up in the CTO review. Several stakeholders heard that SDN eliminates traditional routing protocols and routers. The CTO wants an internal clarification on whether that statement is accurate, what the controller actually coordinates, and where routing protocols remain required for underlay reachability and boundary exchange."
    ],
    4: [
      "Dear SDN Architecture Working Group, good afternoon. The CTO's routing-protocol concern has been addressed: SDN does not remove the need for routing fundamentals, and forwarding remains in the infrastructure in most production designs.",
      "The next issue from the architecture meeting is terminology. Vendors are using controller, dashboard, orchestrator, API, fabric, and assurance in overlapping ways. Please normalize the conversation by mapping functions to Data Plane, Control Plane, Management Plane, and Application Plane responsibilities."
    ],
    5: [
      "Dear Lead SDN Architect, good morning. The architecture plane discussion clarified that the controller and infrastructure do not all perform the same function. That resolved some terminology confusion across the IT teams.",
      "The refinery team has now raised a production-safety concern. If a controller outage occurs during a refinery shift, will PLC or HMI traffic stop? Please respond in a way that distinguishes controller coordination from data-plane forwarding while still acknowledging controller availability requirements."
    ],
    6: [
      "Dear Data Center and Routing Teams, good afternoon. The refinery controller-outage concern has been addressed at a conceptual level: production forwarding should not be assumed to pass through a central controller, but controller health still matters for policy and operations.",
      "A new design question came from the data center review. The data center team is discussing overlay segmentation while the routing team owns transport reachability. Both teams need a shared definition of underlay and overlay before the design workshop continues."
    ],
    7: [
      "Dear SDN Architecture Working Group, good morning. The underlay and overlay definitions have been accepted by the data center and routing teams. Both teams now understand that the overlay depends on the transport beneath it.",
      "A new WAN concern came from last week's incident review. Some stakeholders believe that adopting an SDN overlay will hide future underlay instability. The WAN team needs the architecture position on whether packet loss, jitter, MTU, latency, and routing convergence still matter after overlay adoption."
    ],
    8: [
      "Dear CIO and CTO, good afternoon. The WAN team has acknowledged that overlay designs still depend on underlay quality. That concern is now documented as an architectural dependency rather than a reason to reject SDN.",
      "A follow-up concern came from Regional Operations. Branch failover from MPLS to internet restores reachability, but ERP and collaboration remain degraded. The business team is looking for an explanation of why reachability is not the same as application experience and what SDN-oriented WAN functions could add."
    ],
    9: [
      "Dear SDN Architecture Working Group, good morning. The branch failover discussion clarified that routing convergence alone does not guarantee acceptable user experience. This moves the conversation naturally from packet reachability into operational control and telemetry.",
      "The automation team now has a pending integration question. Before workflows request network services, please distinguish northbound APIs, southbound interfaces, and telemetry/event interfaces so ITSM, controllers, devices, and assurance tools are not confused."
    ],
    10: [
      "Dear Executive Committee, good afternoon. The interface discussion has clarified how applications, controllers, devices, and telemetry systems interact. This has helped the team avoid treating every integration as the same type of API.",
      "A new executive clarification is needed. An older SDN article was circulated and equated SDN with OpenFlow. The steering committee needs a balanced position: OpenFlow is important historically and useful conceptually, but it is not the same thing as SDN and is not mandatory as the main protocol in every enterprise SDN solution."
    ],
    11: [
      "Dear Network Operations Team, good morning. The OpenFlow misconception has been addressed, and the team now understands that SDN is broader than one southbound protocol.",
      "The next pending item comes from the automation planning meeting. The first automation proposal uses spreadsheet data for VLANs, subnets, site codes, firewall zones, and circuit IDs. The team needs to understand the main risk if poor source data is used as automation input."
    ],
    12: [
      "Dear SDN Architecture Working Group, good afternoon. The spreadsheet source-of-truth risk has been accepted as a real blocker for unsafe automation. The team agrees that automation must not amplify unmanaged data quality problems.",
      "A new operations question remains. Network Operations wants to know whether SDN changes the operating model or merely adds another interface. Please contrast device-centric operations with SDN-oriented operations using policy, telemetry, fabric state, path trace, APIs, audit, and governance."
    ],
    13: [
      "Dear CIO and CTO, good morning. The operating-model discussion has clarified that SDN value depends on more than a new dashboard. It requires changes in policy handling, telemetry usage, workflow governance, and operational accountability.",
      "The CISO has raised a new concern. Centralized policy can improve consistency, but a bad policy may also be deployed broadly. Please address the blast-radius risk and explain why RBAC, validation, audit, staged deployment, and rollback are required."
    ],
    14: [
      "Dear SDN Architecture Working Group, good afternoon. The centralized policy risk has been acknowledged, and the team agrees that policy consistency must be paired with governance and validation.",
      "A new access request was raised during the refinery maintenance meeting. A contractor team needs temporary access to approved maintenance applications. Security wants the policy lifecycle documented from business intent through technical translation, enforcement, validation, and exception review."
    ],
    15: [
      "Dear NOC Leads, good morning. The contractor access discussion has clarified that policy should not begin as a firewall exception; it should begin as business intent and then be validated after deployment.",
      "The next pending item is operational readiness. The NOC currently monitors reachability, interface status, syslog, and NetFlow. The NOC leads want to know what must be monitored in an SDN-oriented environment beyond basic device up/down status."
    ],
    16: [
      "Dear Executive Committee, good afternoon. The monitoring discussion has shown that SDN introduces additional operational signals: controller health, policy deployment state, identity assignment, overlay state, and fabric health.",
      "Leadership now needs to decide where SDN should be studied first. Candidate areas include WAN overlay, campus fabric, data center fabric, cloud networking, and assurance. The executive committee needs a practical mapping between each use case and the SDN domain that naturally fits it."
    ],
    17: [
      "Dear SDN Architecture Working Group, good morning. The candidate-domain discussion has helped the team avoid forcing one SDN domain to solve every problem.",
      "The next architecture concern is boundary definition. If campus fabric, data center fabric, WAN overlay, or cloud networking is introduced, each SDN domain must have a clear meeting point with the traditional core, firewalls, WAN, cloud, or OT boundary."
    ],
    18: [
      "Dear CIO, CTO, and CISO, good afternoon. The fabric-boundary discussion has confirmed that PetroVale will not transform every domain at once. Boundaries, ownership, route exchange, and inspection points must remain explicit during transition.",
      "The CEO has asked for an executive-level clarification. Is SDN a single product decision, or can it be adopted as a staged set of capabilities across automation, campus, WAN, data center, cloud, and assurance? Please frame SDN as a spectrum where appropriate."
    ],
    19: [
      "Dear SDN Architecture Working Group, good morning. The executive-level discussion has addressed the misconception that SDN must be one enterprise-wide controller or one purchase order.",
      "The workshop now has several unresolved concern types: technology misconceptions, security blast-radius questions, operational troubleshooting pain, and architecture prioritization. Please classify these concerns so the team does not treat every issue as product selection."
    ],
    20: [
      "Dear SDN Architecture Working Group, good afternoon. The stakeholder-concern classification has helped separate architecture, operations, security, and misconception handling.",
      "A new cloud governance question has been raised. PetroVale has public cloud workloads with separate route tables, security groups, and logging ownership. Please determine whether cloud presence alone means SDN should be deployed everywhere immediately, or whether cloud should be analyzed as one candidate domain."
    ],
    21: [
      "Dear Risk Committee, good morning. The cloud governance question has been reframed as an architecture input rather than a trigger for immediate enterprise-wide SDN deployment.",
      "Risk Management now asks what new risks SDN introduces. The committee is specifically concerned about realistic control points such as controller compromise, broad policy deployment, and privileged API credentials, while still recognizing that routing and switching expertise remains necessary."
    ],
    22: [
      "Dear CIO, CTO, and CISO, good afternoon. The risk discussion has clarified that SDN introduces new privileged assets and therefore requires governance, validation, and credential control.",
      "The refinery operations team has raised the next pending item. OT systems include PLCs, HMIs, sensors, historians, and engineering workstations, and some cannot tolerate aggressive probing. The first SDN-related step for OT must be conservative enough for refinery leadership to accept."
    ],
    23: [
      "Dear SDN Architecture Working Group, good morning. The OT first-step discussion has confirmed that PetroVale should begin with visibility and controlled boundary monitoring before active enforcement in refinery environments.",
      "Procurement now asks how Cisco ACI, SD-Access, Catalyst SD-WAN, Meraki, and ISE relate to the SDN domains under discussion. The team needs a conceptual domain mapping that does not imply a final vendor decision."
    ],
    24: [
      "Dear CTO and Automation Lead, good afternoon. The vendor-domain mapping has clarified that product areas solve different problems and should not be treated as interchangeable answers.",
      "Infrastructure leadership now wants visible progress, especially for branch rollout time. Because the operations team has limited controller and API experience, please identify low-risk first steps that improve readiness without broad production automation."
    ],
    25: [
      "Dear SDN Architecture Working Group, good morning. The low-risk automation discussion has established that data cleanup, standards validation, and read-only inventory are safer first steps than immediate production-wide changes.",
      "The next design meeting reviewed the brownfield topology. Several migration boundaries must be explicit before SDN concepts are introduced, including campus-to-core, IT/OT firewall, and firewall-to-data-center or cloud boundaries."
    ],
    26: [
      "Dear Security Architecture Team, good afternoon. The migration-boundary discussion has clarified where SDN domains will meet traditional routing, firewall, cloud, and OT controls.",
      "A new segmentation concern remains. PetroVale already uses VLANs, subnets, VRFs, ACLs, firewall zones, exceptions, and route leaks. Security wants the scaling problem explained without reducing it to the incorrect claim that VLANs cannot forward traffic."
    ],
    27: [
      "Dear NOC and SDN Architecture Working Group, good morning. The segmentation discussion has clarified that the problem is not simply VLANs, but the difficulty of keeping technical constructs aligned with business intent over time.",
      "A recent incident now raises an assurance question. All devices appeared healthy, but traffic followed an unexpected path and matched the wrong policy. The NOC and application owners need a distinction between monitoring and assurance, including what assurance actually validates."
    ],
    28: [
      "Dear Lead SDN Architect, good afternoon. The assurance incident has helped the team understand that device health does not always prove intended service behavior.",
      "The CIO now needs an executive message about SDN benefits. Please avoid claims that would create false expectations, such as SDN eliminating routing expertise, automatically fixing bad documentation, or removing every firewall and operational process."
    ],
    29: [
      "Dear SDN Architecture Working Group, good morning. The executive-messaging concern has been addressed: the SDN message must be optimistic but technically honest.",
      "The CTO now requests a practical transition sequence for the next workshops. The early activities need to move from brownfield problem clarification, to SDN concepts, to candidate domains and boundaries, then design, implementation, operations, automation, and optimization."
    ],
    30: [
      "Dear SDN Architecture Working Group, good afternoon. Thank you for aligning on the early transition sequence. The executive committee is comfortable with moving toward the next design workshop, provided we can show that the first wave is disciplined and does not turn into an uncontrolled technology rollout.",
      "During this morning's portfolio review, several candidate initiatives were mentioned in the same conversation: read-only branch inventory, automated refinery policy enforcement, replacement of routing protocols, regional overlay evaluation, and identity-based campus segmentation. Some of these may be suitable first-wave candidates if governed carefully. Others should clearly be delayed or removed from the SDN decision frame.",
      "Please classify these items with enough precision that business leadership can understand the difference between a low-risk readiness activity, a bounded SDN pilot, a later-phase enforcement program, and an idea that is not a valid SDN driver."
    ],
    31: [
      "Dear Risk Committee, good morning. Following the first-wave candidate review, we now have a shorter list of initiatives that could proceed into design analysis. Before we do that, the risk team has asked for clearer language about failure impact and control placement.",
      "Several concerns came up in yesterday's risk review. Some people are worried that a controller issue means production packets stop forwarding immediately. Others are more concerned about underlay reachability, overly broad access policies, and automation workflows using weak source data. The team also asked whether continuing to use BGP at boundaries is a sign that the SDN architecture is incomplete.",
      "Please classify the situations in a way that helps risk, operations, and architecture use the same vocabulary. We need to separate data-plane impact, control-plane impact, operations or governance impact, and concerns that are not meaningful SDN risks."
    ],
    32: [
      "Dear SDN Architecture Working Group, good afternoon. The risk committee discussion has clarified that controller placement, underlay health, policy governance, and source-of-truth quality must be treated as design inputs instead of late operational details.",
      "The steering committee is now asking what evidence must exist before approving a pilot design. Procurement has vendor briefings scheduled, but the architecture team should not treat a polished dashboard demonstration as proof that PetroVale is ready. At the same time, we should avoid delaying the design workshop for implementation details that can be finalized later.",
      "Please distinguish evidence that is required before a pilot, information that may be useful but is not enough on its own, details that can wait until implementation, and assumptions that could mislead the steering committee."
    ],
    33: [
      "Dear Lead SDN Architect, good afternoon. The transition sequence has been accepted as the basis for the next design workshop, and the leadership team now needs a closing statement from this first scenario.",
      "The first-wave prioritization, risk-impact classification, and evidence discussion have helped the committee understand that SDN is not only a product or a protocol decision. The closing statement should be short enough for executives, accurate enough for senior engineers, and careful enough for security and OT stakeholders.",
      "Please provide a summary that describes SDN as programmable, policy-driven, centrally coordinated, observable, and automation-friendly, while making it clear that forwarding remains in the infrastructure and traditional network fundamentals still matter."
    ]
  };
  return messages[question.id];
}

function getContextsForQuestion(question) {
  if (!question.context) return [];
  return [getScenarioUpdate(question)];
}

function unlockContextsForQuestion(question) {
  return getContextsForQuestion(question).map((item) => {
    const isNew = !state.unlockedContextIds.has(item.id);
    state.unlockedContextIds.add(item.id);
    if (isNew && state.activeView !== "contexts") {
      state.unreadContextIds.add(item.id);
    }
    return { ...item, isNew };
  });
}

function renderContextAlerts(relatedContexts) {
  if (!relatedContexts.length) return "";

  return relatedContexts.map((item) => `
    <aside class="context-alert" role="note">
      <strong>New scenario update available</strong>
      <p>Review the latest stakeholder message in Scenario Updates before answering this decision.</p>
      <button class="inline-link" type="button" data-jump-contexts>Review scenario updates</button>
    </aside>
  `).join("");
}

menuItems.forEach((button) => {
  button.addEventListener("click", () => setActiveView(button.dataset.view));
});

function normalize(value) {
  if (Array.isArray(value)) return value.slice().sort().join("|");
  if (value && typeof value === "object") {
    return Object.keys(value).sort().map((key) => {
      const item = value[key];
      const normalizedItem = Array.isArray(item) ? item.slice().sort().join(",") : item;
      return `${key}:${normalizedItem}`;
    }).join("|");
  }
  return String(value || "");
}

function getCorrectAnswer(question) {
  if (question.type === "matrix") {
    const obj = {};
    question.rows.forEach(([statement, answer]) => obj[statement] = answer);
    return obj;
  }
  if (question.type === "matrix-multi") {
    const obj = {};
    question.rows.forEach((row) => obj[row.statement] = row.answer);
    return obj;
  }
  if (question.type === "dropdowns") {
    const obj = {};
    question.fields.forEach((field) => obj[field.label] = field.answer);
    return obj;
  }
  return question.answer;
}

function isCorrect(question, response) {
  if (question.type === "order") {
    return JSON.stringify(response) === JSON.stringify(question.answer);
  }
  return normalize(response) === normalize(getCorrectAnswer(question));
}

function formatAnswer(answer) {
  if (Array.isArray(answer)) return answer.join(", ");
  if (answer && typeof answer === "object") {
    return Object.entries(answer).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`).join("; ");
  }
  return answer || "No answer";
}

function renderQuestion() {
  const question = questions[state.index];
  const relatedContexts = unlockContextsForQuestion(question);
  renderContextCards();
  renderMenuState();
  const progress = (state.index / questions.length) * 100;
  qView.innerHTML = `
    <div class="progress-row">
      <span class="progress-text">Decision ${state.index + 1} of ${questions.length}</span>
      <div class="progress-bar" aria-hidden="true"><div class="progress-fill" style="width:${progress}%"></div></div>
      <span class="progress-text">${Math.round(progress)}%</span>
    </div>
    <div class="question-type">${question.label}</div>
    <h2 class="question-title">${question.title}</h2>
    ${renderContextAlerts(relatedContexts)}
    ${question.visual ? `<img class="question-visual" src="${question.visual}" alt="">` : ""}
    <p class="prompt">${question.prompt}</p>
    ${question.sentence ? `<div class="context-box">${question.sentence}</div>` : ""}
    <form id="answerForm">${renderInput(question)}</form>
    <div class="actions">
      <div class="status-message" id="statusMessage"></div>
      <button class="primary-button" id="nextButton" type="button">${state.index === questions.length - 1 ? "Finish and Review" : "Next"}</button>
    </div>
  `;
  document.getElementById("nextButton").addEventListener("click", handleNext);
  qView.querySelectorAll("[data-jump-contexts]").forEach((button) => {
    button.addEventListener("click", () => setActiveView("contexts"));
  });
}

function renderInput(question) {
  if (question.type === "single" || question.type === "multi") {
    const inputType = question.type === "single" ? "radio" : "checkbox";
    return `<div class="option-list">${question.options.map(([key, text]) => `
      <label class="option">
        <input type="${inputType}" name="answer" value="${key}">
        <span><strong>${key}.</strong>${text}</span>
      </label>
    `).join("")}</div>`;
  }

  if (question.type === "matrix") {
    return `
      <table class="answer-table">
        <thead>
          <tr><th>Statement</th>${question.columns.map((c) => `<th>${c}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${question.rows.map(([statement], rowIndex) => `
            <tr>
              <td>${statement}</td>
              ${question.columns.map((column) => `
                <td><input type="radio" name="row-${rowIndex}" value="${column}" aria-label="${statement} ${column}"></td>
              `).join("")}
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
  }

  if (question.type === "matrix-multi") {
    return `
      <table class="answer-table matrix-multi-table">
        <thead>
          <tr><th>Decision Item</th>${question.columns.map((c) => `<th>${c}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${question.rows.map((row, rowIndex) => `
            <tr>
              <td>${row.statement}</td>
              ${question.columns.map((column) => `
                <td class="matrix-choice"><input type="checkbox" name="row-${rowIndex}" value="${column}" aria-label="${row.statement} ${column}"></td>
              `).join("")}
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
  }

  if (question.type === "dropdowns") {
    return `
      <table class="answer-table">
        <thead><tr><th>Item</th><th>Selection</th></tr></thead>
        <tbody>
          ${question.fields.map((field, index) => `
            <tr>
              <td>${field.label}</td>
              <td>
                <select name="field-${index}">
                  <option value="">Select...</option>
                  ${question.choices.map((choice) => `<option value="${choice}">${choice}</option>`).join("")}
                </select>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
  }

  if (question.type === "matching") {
    return `
      <table class="answer-table">
        <thead><tr><th>Item</th><th>Match</th></tr></thead>
        <tbody>
          ${question.rows.map((row, index) => `
            <tr>
              <td>${row}</td>
              <td>
                <select name="match-${index}">
                  <option value="">Select...</option>
                  ${question.choices.map((choice) => `<option value="${choice}">${choice}</option>`).join("")}
                </select>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
  }

  if (question.type === "order") {
    const positions = question.rows.map((_, index) => index + 1);
    return `
      <div class="order-list">
        ${question.rows.map((row, index) => `
          <div class="order-row">
            <select name="order-${index}" aria-label="Order for ${row}">
              <option value="">Order</option>
              ${positions.map((pos) => `<option value="${pos}">${pos}</option>`).join("")}
            </select>
            <span>${row}</span>
          </div>
        `).join("")}
      </div>
    `;
  }

  return "";
}

function collectResponse(question) {
  const form = document.getElementById("answerForm");
  const data = new FormData(form);

  if (question.type === "single") return data.get("answer") || "";
  if (question.type === "multi") return data.getAll("answer");

  if (question.type === "matrix") {
    const response = {};
    question.rows.forEach(([statement], index) => {
      response[statement] = data.get(`row-${index}`) || "";
    });
    return response;
  }

  if (question.type === "matrix-multi") {
    const response = {};
    question.rows.forEach((row, index) => {
      response[row.statement] = data.getAll(`row-${index}`);
    });
    return response;
  }

  if (question.type === "dropdowns") {
    const response = {};
    question.fields.forEach((field, index) => {
      response[field.label] = data.get(`field-${index}`) || "";
    });
    return response;
  }

  if (question.type === "matching") {
    const response = {};
    question.rows.forEach((row, index) => {
      response[row] = data.get(`match-${index}`) || "";
    });
    return response;
  }

  if (question.type === "order") {
    const ordered = [];
    question.rows.forEach((row, index) => {
      const pos = Number(data.get(`order-${index}`));
      if (pos) ordered[pos - 1] = row;
    });
    return ordered;
  }

  return "";
}

function hasCompleteResponse(question, response) {
  if (question.type === "single") return Boolean(response);
  if (question.type === "multi") return response.length > 0;
  if (question.type === "matrix" || question.type === "dropdowns" || question.type === "matching") {
    return Object.values(response).every(Boolean);
  }
  if (question.type === "matrix-multi") {
    return Object.values(response).every((value) => Array.isArray(value) && value.length > 0);
  }
  if (question.type === "order") {
    return response.length === question.rows.length && response.every(Boolean) && new Set(response).size === question.rows.length;
  }
  return false;
}

function handleNext() {
  const question = questions[state.index];
  const response = collectResponse(question);
  const status = document.getElementById("statusMessage");

  if (!hasCompleteResponse(question, response)) {
    status.textContent = "Complete the decision before continuing.";
    return;
  }

  state.responses.push({
    questionId: question.id,
    response,
    correct: isCorrect(question, response)
  });

  if (state.index === questions.length - 1) {
    renderResults();
    return;
  }

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
  menuItems.forEach((button) => {
    button.classList.toggle("active", button.dataset.view === "questions");
  });

  const correctCount = state.responses.filter((r) => r.correct).length;
  const percent = Math.round((correctCount / questions.length) * 100);
  const missed = state.responses.filter((r) => !r.correct);
  const interpretation = getInterpretation(percent);

  rView.innerHTML = `
    <div class="score-band">
      <div class="score-number">${percent}%</div>
      <div>
        <h2>Transition Workshop Review</h2>
        <p>${interpretation}</p>
      </div>
    </div>
    <div class="summary-grid">
      <div class="metric"><span>Sound decisions</span><b>${correctCount}</b></div>
      <div class="metric"><span>Review needed</span><b>${missed.length}</b></div>
      <div class="metric"><span>Total</span><b>${questions.length}</b></div>
    </div>
    <h2>Decision Review</h2>
    <div class="missed-list">
      ${state.responses.map((result, index) => renderReviewItem(result, questions[index])).join("")}
    </div>
    <div class="actions">
      <button class="secondary-button" type="button" onclick="window.location.reload()">Restart Workshop</button>
    </div>
  `;
}

function renderReviewItem(result, question) {
  const missedClass = result.correct ? "" : "missed";
  return `
    <article class="review-item ${missedClass}">
      <h3>Decision ${question.id}: ${question.title} ${result.correct ? "Sound" : "Missed"}</h3>
      <p class="answer-line"><strong>Your answer:</strong> ${formatAnswer(result.response)}</p>
      <p class="answer-line"><strong>Recommended answer:</strong> ${formatAnswer(getCorrectAnswer(question))}</p>
      ${result.correct ? "" : `<div class="explanation"><strong>Why:</strong> ${question.explanation}</div>`}
    </article>
  `;
}

function getInterpretation(percent) {
  if (percent >= 85) return "Strong readiness to move from SDN concept discussion into design-level analysis.";
  if (percent >= 70) return "Good understanding. Review the missed decisions before the design scenario.";
  if (percent >= 50) return "Partial understanding. Revisit traditional pain points, SDN planes, underlay/overlay, boundaries, and policy risks.";
  return "Re-study the SDN concept material before continuing to design scenarios.";
}

renderQuestion();
setActiveView("questions");
