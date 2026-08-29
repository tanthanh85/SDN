const tasks = [
  {
    phase: "Orientation",
    title: "Lab overview and implementation brief",
    short: "Overview",
    body: `
      <p class="lead">PetroVale has selected Cisco ACI for both data centers. DC1 is the first implementation site and its accepted configuration will become the controlled baseline for DC2.</p>
      <div class="role-banner"><strong>Your role</strong><span>You are the SDN Network Architect in PetroVale's IT team. You will build the approved ACI policy model in the instructor-provided simulator and produce an evidence pack for technical review.</span></div>
      <img class="topology" src="assets/aci-simulator-lab-topology.svg" alt="ACI Simulator lab topology with management workstation, APIC, simulated leaves and spines, and optional external BGP peer">
      <section class="notice"><h3>How to follow the GUI instructions</h3><p>A path such as <code>Tenants &gt; &lt;tenant&gt; &gt; Networking &gt; Bridge Domains</code> means: select the top-menu area first, expand each item in the left navigation tree, and then select or right-click the final object. APIC Basic and Advanced GUI labels can differ slightly by release. When a named command is not visible, use the equivalent <strong>Create</strong>, <strong>Add</strong>, plus-sign, or right-click action shown by the instructor.</p></section>
      <section><h3>Target implementation</h3><ul>
        <li>One tenant containing separate <strong>Corp</strong> and <strong>Contractor</strong> VRFs.</li>
        <li>Network-centric deployment with one EPG, bridge domain, and VLAN per initial network.</li>
        <li>A representative policy set that models the production scale of approximately 100 EPGs and more than 200 contracts.</li>
        <li>An instructor-assigned firewall service graph inserted into the Web-to-Application contract.</li>
        <li>Separate Corp and Contractor external connectivity through eBGP L3Out boundaries, using parameters assigned by the instructor.</li>
        <li>Two pilot VLAN definitions that preserve their existing subnets and gateway addresses.</li>
      </ul></section>
      <section><h3>Logical policy model used in this lab</h3><p>Read the diagram from the routing domains toward the workloads. A bridge domain belongs to one VRF, an EPG uses one bridge domain, and contracts define only the communication that is intentionally permitted.</p><img class="topology" src="assets/aci-logical-policy-model.svg" alt="Logical ACI model showing the PetroVale tenant, Corp and Contractor VRFs, bridge domains, EPGs, contracts, and separate external routing boundaries"></section>
      <section class="notice"><h3>Lab boundaries</h3><p>The ACI Simulator validates APIC configuration, object relationships, policy intent, faults, and Terraform provider behavior. External adjacency and packet tests require instructor-enabled peers and endpoints.</p></section>
      <section><h3>Completion evidence</h3><p>Keep screenshots or exported output showing initial pod values, fabric membership, the tenant tree, both VRFs, bridge domains, EPG bindings, contracts, L4-L7 service graph, both L3Out boundaries, faults review, Terraform plans and drift checks, and pilot-migration objects. Use your assigned naming prefix in every object you create.</p></section>
      <section class="references"><h3>Cisco references</h3><p><a href="https://www.cisco.com/c/en/us/td/docs/switches/datacenter/aci/apic/sw/4-x/ACI-Simulator-Getting-Started/cisco-aci-simulator-getting-started-guide-4x/b_ACI_Simulator_Guide_Rel_3_x_chapter_010.html" target="_blank" rel="noreferrer">ACI Simulator Initial POD Setup</a> · <a href="https://www.cisco.com/c/en/us/td/docs/switches/datacenter/aci/apic/sw/5-x/basic-configuration/cisco-apic-basic-configuration-guide-50x/m_tenants.html" target="_blank" rel="noreferrer">APIC Basic Configuration Guide</a> · <a href="https://www.cisco.com/c/en/us/td/docs/dcn/aci/apic/6x/l4-l7-configuration/cisco-apic-layer-4-to-layer-7-services-deployment-guide-61x/configuring-policy-based-redirect-61x.html" target="_blank" rel="noreferrer">L4-L7 Services Deployment Guide</a></p></section>`
  },
  {
    phase: "Simulator initialization",
    title: "Initialize the ACI Simulator pod",
    short: "Initial pod setup",
    body: `
      <p class="lead">Establish the simulator fabric identity, infrastructure pools, and out-of-band management before using the APIC GUI.</p>
      <div class="warning"><strong>Instructor release gate</strong><p>Perform the console initialization only when the instructor assigns an uninitialized ACI Simulator VM. If the VM already presents an APIC login page, do not reset or reinitialize it; review the assigned values and continue with the access task.</p></div>
      <img class="topology" src="assets/aci-simulator-lab-topology.svg" alt="ACI Simulator VM with APIC management, simulated spines and leaves, and learner access">
      <div class="worksheet">
        <label>Fabric name / Fabric ID<input data-field="fabricIdentity" placeholder="Provided by instructor"></label>
        <label>Active controller count<input data-field="controllerCount" placeholder="Provided by instructor"></label>
        <label>Controller ID / name<input data-field="controllerIdentity" placeholder="Provided by instructor"></label>
        <label>Pod ID<input data-field="podId" placeholder="Provided by instructor"></label>
        <label>TEP address pool<input data-field="tepPool" placeholder="Must not overlap routed networks"></label>
        <label>Infrastructure VLAN<input data-field="infraVlan" placeholder="Reserved for ACI infrastructure"></label>
        <label>GIPo multicast pool<input data-field="gipoPool" placeholder="Provided by instructor"></label>
        <label>OOB management IP / gateway<input data-field="oobAddress" placeholder="Provided by instructor"></label>
      </div>
      <div class="gui-path"><strong>Console area</strong><code>ACI Simulator VM console &gt; Initial setup dialog</code></div>
      <ol class="steps">
        <li>Open the assigned VM console in the hypervisor and power on the ACI Simulator only when instructed. Wait for the APIC initial setup dialog; do not interrupt the boot sequence.</li>
        <li>At <strong>Fabric name</strong>, enter the assigned name. Enter the assigned <strong>Fabric ID</strong>. These values identify the fabric and must match the instructor worksheet.</li>
        <li>Enter the assigned number of active controllers, controller ID, controller name, and Pod ID. Use the simulator-specific values supplied by the instructor rather than assuming a production three-controller cluster.</li>
        <li>Enter the assigned <strong>TEP address pool</strong>. Confirm it does not overlap PetroVale production, management, test, L3Out, or remote-site routed prefixes.</li>
        <li>Enter the reserved <strong>Infrastructure VLAN ID</strong>. This VLAN is dedicated to ACI infrastructure communication and must not be reused by a tenant EPG or another lab function.</li>
        <li>Enter the assigned bridge-domain multicast <strong>GIPo address pool</strong>. Accept a displayed default only when it matches the instructor baseline.</li>
        <li>Choose the assigned IPv4, IPv6, or dual-stack out-of-band management option. Enter the APIC management address and prefix, then the out-of-band default gateway.</li>
        <li>Accept the management interface speed and duplex default unless the instructor provides a different value.</li>
        <li>Keep strong-password checking enabled. Enter and confirm the instructor-controlled administrator password at the console. Do not record it in this webpage or evidence pack.</li>
        <li>Review the displayed summary carefully. If a value is wrong, use the setup-dialog restart procedure rather than completing the initialization with a known error.</li>
        <li>Wait for initialization to finish. From the learner workstation, browse to <code>https://&lt;OOB-management-IP&gt;</code>. Confirm that the APIC login page loads over HTTPS.</li>
        <li>Sign in with the instructor-provided account. If a <strong>Domain</strong> field is displayed, select the authentication domain specified by the instructor.</li>
        <li>Open <strong>Fabric &gt; Inventory &gt; Fabric Membership</strong>. When an unregistered simulated switch appears, select it, choose <strong>Register</strong>, enter its assigned node ID and name, and submit. Register only nodes listed in the worksheet.</li>
        <li>Wait for the registered leaf and spine nodes to become active. Record unresolved discovery or membership faults before continuing.</li>
      </ol>
      <div class="verify"><strong>Initialization checkpoint</strong><ul><li>The APIC GUI is reachable through the assigned out-of-band address.</li><li>The fabric name, pod, controller, TEP pool, infrastructure VLAN, and GIPo pool match the worksheet.</li><li>Assigned simulated switches are registered with the correct node IDs and roles.</li></ul></div>
      <section class="references"><h3>Cisco reference</h3><p><a href="https://www.cisco.com/c/en/us/td/docs/switches/datacenter/aci/apic/sw/4-x/ACI-Simulator-Getting-Started/cisco-aci-simulator-getting-started-guide-4x/b_ACI_Simulator_Guide_Rel_3_x_chapter_010.html" target="_blank" rel="noreferrer">ACI Simulator Initial POD Setup and Overview</a></p></section>`
  },
  {
    phase: "Access",
    title: "Connect and record the simulator baseline",
    short: "Access and baseline",
    body: `
      <section><h3>Before you begin</h3><p>Obtain the APIC URL, username, password, assigned pod, node IDs, interface IDs, VLAN range, IP addressing, and BGP values from the instructor. Open the APIC URL in a supported browser and accept only the certificate exception expected for this isolated lab.</p></section>
      <div class="worksheet">
        <label>Student or team prefix<input data-field="prefix" placeholder="Example: team03"></label>
        <label>APIC URL<input data-field="apicUrl" placeholder="Provided by instructor"></label>
        <label>Assigned pod and leaf nodes<input data-field="nodes" placeholder="Example: pod-1, leaf-101/102"></label>
        <label>Assigned interface or port-channel<input data-field="ports" placeholder="Provided by instructor"></label>
        <label>Allocated VLAN range<input data-field="vlans" placeholder="Provided by instructor"></label>
        <label>Simulator release<input data-field="release" placeholder="Read from APIC About/System information"></label>
      </div>
      <div class="gui-path"><strong>Start here</strong><code>APIC sign-in page</code></div>
      <ol class="steps">
        <li>Enter the APIC URL in the browser. On the sign-in page, enter the instructor-provided <strong>User ID</strong> and <strong>Password</strong>, then click <strong>Login</strong>. Never paste the password into this lab page, notes, screenshots, or exported filenames.</li>
        <li>After login, open the user or help menu in the upper-right corner and select <strong>About</strong>. Record the APIC release and build shown in the dialog, then close it.</li>
        <li>On the top menu, click <strong>Fabric</strong>, then <strong>Inventory</strong>. In the left navigation tree, expand <strong>Pod 1 &gt; Fabric Membership</strong>. Locate the assigned leaf and spine node IDs and confirm their role and active state.</li>
        <li>Click <strong>System</strong> on the top menu. Open <strong>Faults</strong>, select <strong>All</strong>, and filter for Critical and Major severity. Record the count and fault codes that existed before your work.</li>
        <li>Return to <strong>Fabric &gt; Inventory</strong>. Select each assigned leaf and record the node name and node ID. Use the instructor worksheet to confirm the port assigned to your team.</li>
        <li>Compare your object prefix and VLAN range with the instructor allocation. Stop if either overlaps another learner.</li>
      </ol>
      <div class="verify"><strong>Evidence checkpoint</strong><p>Capture the software release, assigned nodes, baseline fault count, and your completed parameter worksheet. Do not include credentials.</p></div>`
  },
  {
    phase: "Fabric access policy",
    title: "Create VLAN pools, domains, and attachment policy",
    short: "Access policies",
    body: `
      <p class="lead">Create the infrastructure objects that allow tenant EPG VLAN encapsulations to be deployed on the assigned simulated leaf interface.</p>
      <div class="gui-path"><strong>GUI area</strong><code>Fabric &gt; Access Policies</code></div>
      <ol class="steps">
        <li>On the top menu, click <strong>Fabric</strong>, then <strong>Access Policies</strong>. In the left tree, expand <strong>Pools &gt; VLAN</strong>.</li>
        <li>Right-click <strong>VLAN</strong> and choose <strong>Create VLAN Pool</strong>. Enter <code>&lt;prefix&gt;-vlan-pool</code>. In <strong>Encap Blocks</strong>, click the plus sign, enter the instructor-assigned From and To VLAN IDs, choose <strong>Static Allocation</strong>, click <strong>OK</strong>, then <strong>Submit</strong>.</li>
        <li>In the left tree, expand <strong>Physical and External Domains</strong>. Right-click <strong>Physical Domains</strong> and choose <strong>Create Physical Domain</strong>.</li>
        <li>Enter <code>&lt;prefix&gt;-phys</code>. In <strong>VLAN Pool</strong>, select <code>&lt;prefix&gt;-vlan-pool</code>, then click <strong>Submit</strong>.</li>
        <li>Expand <strong>Global Policies &gt; Attachable Access Entity Profiles</strong>. Right-click the folder and choose <strong>Create Attachable Access Entity Profile</strong>.</li>
        <li>Enter <code>&lt;prefix&gt;-aaep</code>. In <strong>Domains</strong>, click the plus sign, select <code>&lt;prefix&gt;-phys</code>, click <strong>Update</strong>, then <strong>Submit</strong>.</li>
        <li>Expand <strong>Interfaces &gt; Leaf Interfaces &gt; Policy Groups &gt; Leaf Access Port</strong>. Right-click the folder and create <code>&lt;prefix&gt;-access-pg</code>, unless the instructor assigned a shared policy group.</li>
        <li>In the policy-group dialog, select <code>&lt;prefix&gt;-aaep</code> in <strong>Attached Entity Profile</strong>. Apply only the CDP, LLDP, link-level, or spanning-tree policies specified by the instructor, then click <strong>Submit</strong>.</li>
        <li>Expand <strong>Interfaces &gt; Leaf Interfaces &gt; Profiles</strong>. Open the assigned interface profile. Select or create the interface selector for the assigned port, choose <code>&lt;prefix&gt;-access-pg</code>, enter the assigned port block, and submit.</li>
        <li>Reopen the policy group and follow its usage or relation view. Confirm the interface selector, policy group, AAEP, physical domain, and VLAN pool form one complete chain.</li>
      </ol>
      <div class="relationship"><span>VLAN pool</span><i></i><span>Physical domain</span><i></i><span>AAEP</span><i></i><span>Interface policy group</span><i></i><span>Leaf interface</span></div>
      <div class="verify"><strong>Verify</strong><ul><li>No VLAN outside the assigned range is present.</li><li>The physical domain points to the correct pool.</li><li>The assigned interface resolves to the intended AAEP and domain.</li></ul></div>
      <div class="trouble"><strong>Common fault</strong><p>An EPG static binding can exist but fail to deploy when the encapsulation is absent from the pool or the domain is not reachable through the interface policy chain.</p></div>`
  },
  {
    phase: "Tenant policy",
    title: "Create the tenant and two routing domains",
    short: "Tenant and VRFs",
    body: `
      <p class="lead">Build the routing separation first. The production design uses one tenant and two VRFs rather than separate tenants for Corp and Contractor.</p>
      <article class="stakeholder-record"><div class="record-type">Internal security email</div><dl><div><dt>From</dt><dd>Lê Thu Trang, CISO</dd></div><div><dt>To</dt><dd>Enterprise Architecture; SDN Network Architect</dd></div><div><dt>CC</dt><dd>Network Operations; Contractor Governance</dd></div><div><dt>Subject</dt><dd>Does contractor isolation require a separate ACI tenant?</dd></div></dl><p>Dear colleagues, good morning.</p><p>During the security review, one team assumed that a tenant is the routing boundary and therefore requested a separate tenant for every contractor population. Another team proposed one shared routing table with contracts alone.</p><p>Our approved first phase keeps common PetroVale administration in one tenant while Corp and Contractor use separate VRFs. Please implement the two routing domains without weakening policy enforcement or implying that the tenant itself replaces VRF isolation.</p><p>Thank you. Please include the resulting object hierarchy in the evidence pack.</p><p class="record-signature">Regards,<br>Lê Thu Trang<br>Chief Information Security Officer<br>PetroVale Energy</p></article>
      <img class="topology" src="assets/aci-logical-policy-model.svg" alt="PetroVale tenant logical model with two VRFs, bridge domains, EPGs, contracts, and separate Corp and Contractor L3Outs">
      <div class="gui-path"><strong>GUI area</strong><code>Tenants &gt; Add Tenant</code></div>
      <ol class="steps">
        <li>On the APIC top menu, click <strong>Tenants</strong>. Click <strong>Add Tenant</strong> in the work pane or right-click <strong>Tenants</strong> and choose <strong>Create Tenant</strong>.</li>
        <li>In <strong>Name</strong>, enter <code>&lt;prefix&gt;-petrovale</code>. In <strong>Description</strong>, enter your team, DC1, and the lab purpose. Leave security-domain assignment unchanged unless the instructor provides one. Click <strong>Submit</strong>.</li>
        <li>In the left tenant tree, expand <code>&lt;prefix&gt;-petrovale &gt; Networking</code>. Right-click <strong>VRFs</strong> and choose <strong>Create VRF</strong>.</li>
        <li>Enter <code>&lt;prefix&gt;-vrf-corp</code>. Add a description. Confirm <strong>Policy Control Enforcement Preference</strong> remains <strong>Enforced</strong>. Do not enable the preferred group. Click <strong>Submit</strong>.</li>
        <li>Right-click <strong>VRFs</strong> again and create <code>&lt;prefix&gt;-vrf-contractor</code> with enforcement enabled and a description identifying the contractor routing domain.</li>
        <li>Click each new VRF in the navigation tree. In the <strong>General</strong> or <strong>Properties</strong> pane, confirm the name, tenant, enforcement state, and description.</li>
        <li>Expand both VRFs and confirm they contain no bridge domains yet. This is the expected state before the next task.</li>
      </ol>
      <table><thead><tr><th>Object</th><th>Purpose</th><th>Expected policy boundary</th></tr></thead><tbody>
        <tr><td>Corp VRF</td><td>Corporate applications and shared IT services</td><td>Independent routing table</td></tr>
        <tr><td>Contractor VRF</td><td>Third-party and contractor services</td><td>Independent routing table; no implicit Corp reachability</td></tr>
      </tbody></table>
      <div class="verify"><strong>Verify</strong><p>From the tenant tree, confirm exactly two learner-created VRFs, unique names, meaningful descriptions, and no accidental cross-association.</p></div>`
  },
  {
    phase: "Greenfield pilot",
    title: "Build test bridge domains and subnets",
    short: "Bridge domains",
    body: `
      <p class="lead">Use new instructor-assigned subnets to validate the logical model before defining production migration objects.</p>
      <div class="worksheet">
        <label>Corp test VLAN / subnet<input data-field="corpTest" placeholder="Example: VLAN 3101 / 10.31.1.1/24"></label>
        <label>Contractor test VLAN / subnet<input data-field="contractorTest" placeholder="Example: VLAN 3201 / 10.32.1.1/24"></label>
      </div>
      <div class="gui-path"><strong>GUI area</strong><code>Tenants &gt; &lt;tenant&gt; &gt; Networking &gt; Bridge Domains</code></div>
      <ol class="steps">
        <li>Click <strong>Tenants</strong> and open <code>&lt;prefix&gt;-petrovale</code>. In the left tree, expand <strong>Networking</strong>.</li>
        <li>Right-click <strong>Bridge Domains</strong> and choose <strong>Create Bridge Domain</strong>. Enter <code>&lt;prefix&gt;-bd-corp-test</code>.</li>
        <li>In the <strong>VRF</strong> or <strong>VRF Association</strong> field, select <code>&lt;prefix&gt;-vrf-corp</code>. Confirm <strong>Unicast Routing</strong> is enabled.</li>
        <li>Click <strong>Next</strong> until the <strong>Subnets</strong> section appears, or submit the BD and then expand it in the tree. Click the plus sign or right-click <strong>Subnets</strong> and choose <strong>Create Subnet</strong>.</li>
        <li>Enter the instructor-assigned Corp gateway with prefix length, for example <code>10.31.1.1/24</code>. Set <strong>Scope</strong> and <strong>Subnet Control</strong> only as instructed. Click <strong>OK</strong> or <strong>Submit</strong>.</li>
        <li>Review the BD <strong>L2 Unknown Unicast</strong>, <strong>ARP Flooding</strong>, <strong>Endpoint Retention</strong>, and <strong>Multi-Destination Flooding</strong> values. Keep the instructor baseline rather than changing settings speculatively.</li>
        <li>Right-click <strong>Bridge Domains</strong> again. Create <code>&lt;prefix&gt;-bd-contractor-test</code>, select <code>&lt;prefix&gt;-vrf-contractor</code>, enable unicast routing, and add the assigned Contractor gateway subnet.</li>
        <li>Click each bridge domain, open <strong>General</strong>, and verify its single VRF relation. Expand <strong>Subnets</strong> and confirm the two subnets do not overlap.</li>
      </ol>
      <div class="verify"><strong>Evidence checkpoint</strong><p>Capture each bridge domain overview with its VRF relationship, subnet, unicast-routing state, and fault status visible.</p></div>`
  },
  {
    phase: "Endpoint policy",
    title: "Create application profiles, EPGs, and static bindings",
    short: "EPGs and bindings",
    body: `
      <p class="lead">Implement a representative network-centric set. The lab uses four EPGs; the production design applies the same controlled pattern to approximately 100 VLANs.</p>
      <div class="gui-path"><strong>GUI area</strong><code>Tenants &gt; &lt;tenant&gt; &gt; Application Profiles</code></div>
      <ol class="steps">
        <li>Open <strong>Tenants &gt; &lt;prefix&gt;-petrovale</strong>. In the left tree, right-click <strong>Application Profiles</strong> and choose <strong>Create Application Profile</strong>.</li>
        <li>Enter <code>&lt;prefix&gt;-ap-network-centric</code>, add a description, and click <strong>Submit</strong>.</li>
        <li>Expand the new application profile. Right-click <strong>Application EPGs</strong> and choose <strong>Create Application EPG</strong>.</li>
        <li>Enter <code>&lt;prefix&gt;-epg-corp-web-test</code>. In <strong>Bridge Domain</strong>, select <code>&lt;prefix&gt;-bd-corp-test</code>. Click <strong>Finish</strong> or continue through the wizard.</li>
        <li>Expand the new EPG. Right-click <strong>Domains (VMs and Bare-Metals)</strong> or <strong>Domains</strong>, choose <strong>Add Physical Domain Association</strong>, select <code>&lt;prefix&gt;-phys</code>, and submit.</li>
        <li>Right-click <strong>Static Ports</strong> and choose <strong>Deploy Static EPG on PC, VPC, or Interface</strong>. Select the assigned node and interface path.</li>
        <li>In <strong>Encapsulation</strong>, enter the assigned VLAN. Use <strong>Regular</strong> mode unless the instructor specifies native or untagged behavior. Select the instructed deployment immediacy, then click <strong>Submit</strong>.</li>
        <li>Repeat the process for <code>&lt;prefix&gt;-epg-corp-app-test</code> and its own BD/VLAN if a second Corp test network is assigned. If no path is assigned, create the EPG and BD relation but do not invent a static binding.</li>
        <li>Create <code>&lt;prefix&gt;-epg-contractor-tools-test</code>, select <code>&lt;prefix&gt;-bd-contractor-test</code>, associate <code>&lt;prefix&gt;-phys</code>, and bind only the Contractor VLAN to the assigned path.</li>
        <li>Click each EPG and inspect <strong>General</strong>, <strong>Domains</strong>, and <strong>Static Ports</strong>. Confirm the BD, domain, path, and encapsulation match the worksheet.</li>
      </ol>
      <table><thead><tr><th>EPG</th><th>VRF</th><th>Bridge domain</th><th>VLAN</th></tr></thead><tbody>
        <tr><td>Corp Web Test</td><td>Corp</td><td>Corp Web Test BD</td><td>Assigned</td></tr>
        <tr><td>Corp App Test</td><td>Corp</td><td>Corp App Test BD</td><td>Assigned or undeployed</td></tr>
        <tr><td>Contractor Tools Test</td><td>Contractor</td><td>Contractor Test BD</td><td>Assigned</td></tr>
      </tbody></table>
      <div class="verify"><strong>Verify</strong><ul><li>Each deployed EPG has one intended bridge domain, one physical domain, and one assigned encapsulation.</li><li>No learner EPG uses another team's VLAN.</li><li>The static path points to the assigned node and interface.</li></ul></div>`
  },
  {
    phase: "Security policy",
    title: "Create filters and contracts",
    short: "Contracts",
    body: `
      <p class="lead">Model a small but traceable contract set. Reuse protocol filters only where the service intent is genuinely identical.</p>
      <article class="stakeholder-record"><div class="record-type">Application migration email</div><dl><div><dt>From</dt><dd>Hoàng Mai Phương, Application Migration Lead</dd></div><div><dt>To</dt><dd>SDN Network Architect</dd></div><div><dt>CC</dt><dd>Application Owners; Security Architecture; SI Partner</dd></div><div><dt>Subject</dt><dd>Provider and consumer terminology is reversing the draft policy</dd></div></dl><p>Dear SDN Network Architect, good afternoon.</p><p>The application team interpreted the server as a consumer because it receives the first packet, while the SI described the server EPG as the provider because it offers the service. The current spreadsheet therefore attaches the Web-to-App contract in both directions.</p><p>Please implement the relationship according to the service being offered: the initiating tier consumes the contract and the destination tier provides it. Return traffic must not be used as the reason to reverse or duplicate the policy.</p><p>Thank you. We will update the application dependency matrix after reviewing your configuration.</p><p class="record-signature">Thank you,<br>Hoàng Mai Phương<br>Application Migration Lead<br>PetroVale Energy</p></article>
      <div class="gui-path"><strong>GUI area</strong><code>Tenants &gt; &lt;tenant&gt; &gt; Contracts</code></div>
      <ol class="steps">
        <li>Open <strong>Tenants &gt; &lt;prefix&gt;-petrovale</strong>. Expand <strong>Contracts</strong>, right-click <strong>Filters</strong>, and choose <strong>Create Filter</strong>.</li>
        <li>Enter <code>&lt;prefix&gt;-flt-https</code>. In <strong>Entries</strong>, click the plus sign. Name the entry <code>https</code>, select <strong>IP</strong> as EtherType, <strong>TCP</strong> as IP Protocol, and set destination port From and To to <code>443</code>. Click <strong>Update</strong>, then <strong>Submit</strong>.</li>
        <li>Create <code>&lt;prefix&gt;-flt-app</code> the same way, using the instructor-assigned application destination port.</li>
        <li>Right-click <strong>Standard</strong> under Contracts and choose <strong>Create Contract</strong>. Enter <code>&lt;prefix&gt;-ct-web</code>.</li>
        <li>In the contract dialog, create subject <code>https-subject</code>. Add <code>&lt;prefix&gt;-flt-https</code> to the subject filter chain. Keep subject direction and service-graph settings at the instructor-approved defaults. Submit the contract.</li>
        <li>Create contract <code>&lt;prefix&gt;-ct-web-app</code>, create subject <code>app-subject</code>, and associate <code>&lt;prefix&gt;-flt-app</code>.</li>
        <li>Navigate to <strong>Application Profiles &gt; &lt;prefix&gt;-ap-network-centric &gt; Application EPGs &gt; &lt;prefix&gt;-epg-corp-web-test &gt; Contracts</strong>.</li>
        <li>Right-click <strong>Provided Contracts</strong>, choose <strong>Add Provided Contract</strong>, select <code>&lt;prefix&gt;-ct-web</code>, and submit. The Web EPG offers the HTTPS service.</li>
        <li>Under the instructor-designated client EPG, right-click <strong>Consumed Contracts</strong>, select <code>&lt;prefix&gt;-ct-web</code>, and submit.</li>
        <li>Under the App EPG, provide <code>&lt;prefix&gt;-ct-web-app</code>. Under the Web EPG, consume <code>&lt;prefix&gt;-ct-web-app</code>.</li>
        <li>Open each contract's <strong>Consumers</strong>, <strong>Providers</strong>, and <strong>Subjects</strong> views. Confirm the relations are attached to the intended EPGs and no broad contract was added across both VRFs.</li>
      </ol>
      <div class="policy-flow"><span>Client EPG<br><small>consumer</small></span><b>HTTPS contract</b><span>Web EPG<br><small>provider</small></span><b>Application contract</b><span>App EPG<br><small>provider</small></span></div>
      <div class="verify"><strong>Verify</strong><p>Use the contract relation view to confirm provider and consumer attachments. If endpoints are available, test one intended flow and one flow that should remain denied.</p></div>
      <div class="trouble"><strong>Review point</strong><p>A successful object commit confirms the policy was accepted. It does not by itself prove that the intended positive and negative flows behave correctly.</p></div>`
  },
  {
    phase: "L4-L7 service insertion",
    title: "Insert a firewall service graph between EPGs",
    short: "L4-L7 insertion",
    body: `
      <p class="lead">Insert an instructor-assigned firewall function into the Web-to-Application contract. The graph makes the service requirement part of policy rather than relying on an undocumented physical traffic path.</p>
      <article class="stakeholder-record"><div class="record-type">Security architecture decision</div><dl><div><dt>From</dt><dd>Lê Thu Trang, CISO</dd></div><div><dt>To</dt><dd>DC1 Implementation Control Team</dd></div><div><dt>CC</dt><dd>SOC; Application Migration; VietTech SI</dd></div><div><dt>Subject</dt><dd>Contract filtering does not satisfy the inspection requirement</dd></div></dl><p>Dear implementation team, good morning.</p><p>The Web-to-Application contract limits the permitted protocol and destination port, but the security control for this application also requires traffic to traverse the assigned firewall service. Several reviewers have treated a contract filter as equivalent to stateful inspection.</p><p>Please render the firewall through the contract's service graph and prove the device-selection mapping. Where the simulator cannot forward through a real service appliance, document the configuration-only limitation rather than claiming inspection occurred.</p><p>Thank you. Security approval remains pending until the graph relationship and evidence are complete.</p><p class="record-signature">Regards,<br>Lê Thu Trang<br>Chief Information Security Officer<br>PetroVale Energy</p></article>
      <div class="notice"><strong>Simulator track</strong><p>If the instructor has not connected a service appliance or simulator endpoint, complete the APIC object model and verify graph relations and faults. Claim packet redirection only when the instructor provides concrete interfaces and a testable service device.</p></div>
      <img class="topology" src="assets/aci-l4l7-service-insertion.svg" alt="ACI service graph connecting the Web consumer EPG through a firewall device cluster to the Application provider EPG">
      <div class="worksheet">
        <label>Service-device mode<input data-field="l4l7Mode" placeholder="Unmanaged, PBR, transparent, or routed as assigned"></label>
        <label>Physical domain<input data-field="l4l7Domain" placeholder="Provided by instructor"></label>
        <label>Consumer-side path / VLAN<input data-field="l4l7Consumer" placeholder="Provided by instructor"></label>
        <label>Provider-side path / VLAN<input data-field="l4l7Provider" placeholder="Provided by instructor"></label>
        <label>Health or redirect IPs<input data-field="l4l7Redirect" placeholder="Only when PBR is enabled"></label>
        <label>Contract to render<input data-field="l4l7Contract" placeholder="&lt;prefix&gt;-ct-web-app"></label>
      </div>
      <div class="gui-path"><strong>GUI area</strong><code>Tenants &gt; &lt;tenant&gt; &gt; Services &gt; L4-L7</code></div>
      <ol class="steps">
        <li>Confirm <code>&lt;prefix&gt;-epg-corp-web-test</code>, <code>&lt;prefix&gt;-epg-corp-app-test</code>, their bridge domains, and <code>&lt;prefix&gt;-ct-web-app</code> already exist. The Web EPG must consume the contract and the Application EPG must provide it.</li>
        <li>Open <strong>Tenants &gt; &lt;prefix&gt;-petrovale &gt; Services &gt; L4-L7</strong>. Depending on the APIC release, this tree may appear as <strong>L4-L7 Services</strong>.</li>
        <li>Select <strong>Devices</strong>. In the work pane, choose <strong>Actions &gt; Create L4-L7 Device</strong>, or right-click Devices and choose the equivalent Create action.</li>
        <li>Enter <code>&lt;prefix&gt;-fw-cluster</code>. Select <strong>Firewall</strong> as Service Type. Choose the instructor-assigned physical or virtual device type, managed or unmanaged mode, and function mode. Do not guess transparent, routed, or PBR behavior.</li>
        <li>Select the instructor-assigned physical or virtual domain. When concrete-device creation is enabled, click the plus sign and create the assigned firewall node or cluster member.</li>
        <li>Create the consumer-side and provider-side concrete interfaces using the exact leaf paths and VLAN encapsulations supplied by the instructor. Keep the two legs distinct when the selected service mode requires separate networks.</li>
        <li>Create the corresponding cluster interfaces and map each one to its concrete interface. Name the connectors clearly, for example <code>consumer</code> and <code>provider</code>. Submit the device.</li>
        <li>Open <strong>Service Graph Templates</strong>. Choose <strong>Actions &gt; Create L4-L7 Service Graph Template</strong>.</li>
        <li>Enter <code>&lt;prefix&gt;-sg-web-app-fw</code> and select <strong>Create a New Graph</strong>. Drag <code>&lt;prefix&gt;-fw-cluster</code> from Device Clusters and place it between the consumer EPG and provider EPG positions. Submit the graph.</li>
        <li>Return to <strong>Contracts &gt; Standard &gt; &lt;prefix&gt;-ct-web-app</strong>. Open the contract subject and associate <code>&lt;prefix&gt;-sg-web-app-fw</code> as the service graph or graph template. Save the subject.</li>
        <li>Open <strong>Services &gt; L4-L7 &gt; Device Selection Policies</strong>. Select the policy created for the rendered graph, or create the mapping when required by the APIC release.</li>
        <li>Map the graph's firewall node to <code>&lt;prefix&gt;-fw-cluster</code>. Map the consumer connector to the Web BD and the provider connector to the Application BD. Select the assigned paths and encapsulations.</li>
        <li>When the instructor selects policy-based redirect, configure only the supplied redirect destination IPs, MAC behavior, health group, threshold, and tracking values. Do not create invented redirect nodes.</li>
        <li>Open the service graph template and inspect its topology. Confirm the order is <strong>consumer EPG - firewall - provider EPG</strong>, and verify that the device-selection policy references the correct BDs and device cluster.</li>
        <li>Open <strong>System &gt; Faults</strong> and filter by your prefix. Resolve missing-domain, missing-path, encapsulation, connector, or device-selection faults before testing.</li>
        <li>If the instructor-enabled service device is operational, execute the supplied allowed and denied application flows and collect device plus APIC evidence. Otherwise, record the result as configuration-only.</li>
      </ol>
      <div class="verify"><strong>Evidence checkpoint</strong><ul><li>L4-L7 device and interfaces</li><li>Service graph template and node order</li><li>Contract-subject graph association</li><li>Device-selection mapping to Web and Application BDs</li><li>Fault review and clearly stated forwarding-test availability</li></ul></div>
      <section class="references"><h3>Cisco reference</h3><p><a href="https://www.cisco.com/c/en/us/td/docs/dcn/aci/apic/6x/l4-l7-configuration/cisco-apic-layer-4-to-layer-7-services-deployment-guide-61x/configuring-policy-based-redirect-61x.html" target="_blank" rel="noreferrer">APIC Layer 4 to Layer 7 Services Deployment Guide</a></p></section>`
  },
  {
    phase: "External routing",
    title: "Configure the eBGP L3Out boundaries",
    short: "eBGP L3Out",
    body: `
      <p class="lead">Create separate Corp and Contractor external routing boundaries. Use the instructor's node, interface, addressing, ASN, encapsulation, and prefix-policy values exactly.</p>
      <article class="stakeholder-record"><div class="record-type">WAN operations email</div><dl><div><dt>From</dt><dd>Trần Hải Yến, WAN Operations Lead</dd></div><div><dt>To</dt><dd>DC1 Implementation Control Team</dd></div><div><dt>CC</dt><dd>CTO; Provider Management; Network Operations</dd></div><div><dt>Subject</dt><dd>Clarify what ACI changes at the external routing boundary</dd></div></dl><p>Dear colleagues, good afternoon.</p><p>The WAN team has heard two conflicting statements: that ACI eliminates external routing, and that every leaf should peer directly with the WAN. Neither statement matches the approved design.</p><p>Each L3Out must terminate its own VRF's routed boundary on the assigned border leaf interfaces, establish eBGP with the corresponding external peer or VRF-aware peer context, and exchange only approved prefixes. The provider-facing and WAN routing domains continue to operate outside the fabric.</p><p>Please configure and validate both boundaries before any production subnet is advertised.</p><p class="record-signature">Thanks,<br>Trần Hải Yến<br>WAN Operations Lead<br>PetroVale Energy</p></article>
      <div class="worksheet">
        <label>ACI local ASN<input data-field="localAsn" placeholder="Provided by instructor"></label>
        <label>External peer ASN<input data-field="peerAsn" placeholder="Provided by instructor"></label>
        <label>ACI interface / peer IP<input data-field="bgpIps" placeholder="Provided by instructor"></label>
        <label>Allowed import / export prefixes<input data-field="prefixes" placeholder="Provided by instructor"></label>
        <label>Contractor interface / peer IP<input data-field="contractorBgpIps" placeholder="Provided by instructor"></label>
        <label>Contractor encapsulation / prefixes<input data-field="contractorPrefixes" placeholder="Separate from Corp"></label>
      </div>
      <div class="gui-path"><strong>GUI area</strong><code>Tenants &gt; &lt;tenant&gt; &gt; Networking &gt; L3Outs</code></div>
      <ol class="steps">
        <li>Before entering the tenant, open <strong>Fabric &gt; Access Policies &gt; Physical and External Domains &gt; External Routed Domains</strong>. Confirm the instructor-assigned routed domain exists and references the correct external VLAN pool. Do not modify a shared domain.</li>
        <li>Open <strong>Tenants &gt; &lt;prefix&gt;-petrovale &gt; Networking</strong>. Right-click <strong>L3Outs</strong> and choose <strong>Create L3Out</strong>.</li>
        <li>Enter <code>&lt;prefix&gt;-l3out-corp</code>. Select <code>&lt;prefix&gt;-vrf-corp</code> as the VRF and the instructor-assigned external routed domain as the L3 Domain.</li>
        <li>In <strong>External Routed Networks</strong> or <strong>Routing Protocols</strong>, enable <strong>BGP</strong>. Click <strong>Next</strong> or <strong>Submit</strong>, depending on the APIC release.</li>
        <li>Expand <strong>L3Outs &gt; &lt;prefix&gt;-l3out-corp</strong>. Right-click <strong>Logical Node Profiles</strong> and choose <strong>Create Node Profile</strong>. Enter <code>&lt;prefix&gt;-node-prof</code>.</li>
        <li>In <strong>Nodes</strong>, click the plus sign. Select the assigned pod and border leaf. Enter the instructor-assigned router ID and choose whether the router ID is used as a loopback only as instructed. Click <strong>Update</strong>, then <strong>Submit</strong>.</li>
        <li>Expand the node profile. Right-click <strong>Logical Interface Profiles</strong> and choose <strong>Create Interface Profile</strong>. Enter <code>&lt;prefix&gt;-int-prof</code>.</li>
        <li>In <strong>Routed Interfaces</strong>, <strong>Sub-Interfaces</strong>, or <strong>SVIs</strong>, click the plus sign and choose the interface type specified by the instructor. Select the assigned node and path.</li>
        <li>Enter the ACI-side interface IP and prefix. For a subinterface or SVI, enter the assigned VLAN encapsulation. Set MTU and interface mode exactly as provided. Click <strong>OK</strong> or <strong>Update</strong>.</li>
        <li>Within the interface or node profile, create a <strong>BGP Peer Connectivity Profile</strong>. Enter the external neighbor IP, set <strong>Remote AS</strong> to the instructor-provided peer ASN, and configure the local ASN policy only if required.</li>
        <li>Apply only the instructed address-family, password, BFD, timer, allowed-self-AS, or peer-control values. Submit the interface profile and node profile.</li>
        <li>Under the L3Out, right-click <strong>External EPGs</strong> or <strong>Networks</strong> and choose <strong>Create External EPG</strong>. Enter <code>&lt;prefix&gt;-ext-corp-approved</code>.</li>
        <li>Expand the external EPG. Right-click <strong>Subnets</strong> and create only the instructor-approved external prefixes. Select the required route-control and security classification scopes; do not select every scope by habit.</li>
        <li>Expand the external EPG's <strong>Contracts</strong>. Add the required provided or consumed contract according to which side offers the service.</li>
        <li>Click the L3Out, node profile, interface profile, BGP peer, and external EPG in turn. Record each object's faults and confirm all parent-child relations are present.</li>
        <li>Repeat the workflow for <code>&lt;prefix&gt;-l3out-contractor</code>. Associate it with <code>&lt;prefix&gt;-vrf-contractor</code> and use the assigned Contractor interface or subinterface, encapsulation, IP addressing, BGP peer, and route policy.</li>
        <li>Create <code>&lt;prefix&gt;-ext-contractor-approved</code> under the Contractor L3Out. Add only approved Contractor external prefixes and contract relations.</li>
        <li>Compare both L3Outs. Confirm each belongs to one VRF, uses a distinct routed handoff, and does not import or export prefixes belonging to the other segment.</li>
      </ol>
      <div class="verify"><strong>Verify</strong><ul><li>Review both L3Outs, their VRF associations, node and interface relationships, BGP peer policies, and external EPG prefixes.</li><li>If external peers are enabled, verify each BGP operational state and the approved learned and advertised routes within its own VRF.</li><li>Confirm Corp and Contractor prefixes are not leaked between routing domains.</li><li>If a peer is not enabled, record the configuration-only result and do not claim adjacency or packet reachability.</li></ul></div>`
  },
  {
    phase: "Migration preparation",
    title: "Prepare the two-VLAN pilot",
    short: "Pilot VLANs",
    body: `
      <p class="lead">Prepare ACI objects for two existing production VLANs while preserving their subnets. The simulator exercise stops before any production gateway handoff unless the instructor provides a connected migration topology.</p>
      <article class="stakeholder-record"><div class="record-type">Change Advisory Board minutes</div><dl><div><dt>Chair</dt><dd>Đỗ Ngọc Lan, Director of Network Operations</dd></div><div><dt>Attendees</dt><dd>Application Migration; Network Operations; VietTech SI; Business Service Owners</dd></div><div><dt>Decision</dt><dd>Two-VLAN pilot may be prepared; gateway transfer requires a separate release</dd></div></dl><p>The board approved preserving both pilot subnets and using a temporary Layer 2 trunk for workload coexistence. It did not approve simultaneous gateway ownership.</p><p>Before each handoff, the team must prove routed coexistence, stop the legacy SVI, verify that it is inactive, and only then enable the matching ACI gateway. Rollback must reverse the ownership in a controlled order.</p><p>The simulator task is to prepare and verify the objects. No gateway transfer is authorized unless the instructor explicitly releases that step.</p></article>
      <div class="worksheet">
        <label>Pilot VLAN 1 / existing gateway<input data-field="pilot1" placeholder="Provided by instructor"></label>
        <label>Pilot VLAN 2 / existing gateway<input data-field="pilot2" placeholder="Provided by instructor"></label>
      </div>
      <img class="topology" src="assets/dc1-pilot-migration.svg" alt="Pilot migration topology showing temporary Layer 2 trunk and separate Layer 3 routed coexistence path">
      <div class="gui-path"><strong>GUI areas</strong><code>Tenant Bridge Domains + Application EPG Static Ports</code></div>
      <ol class="steps">
        <li>Open <strong>Tenants &gt; &lt;prefix&gt;-petrovale &gt; Networking &gt; Bridge Domains</strong>. Create <code>&lt;prefix&gt;-bd-pilot-1</code> and <code>&lt;prefix&gt;-bd-pilot-2</code>.</li>
        <li>For each BD, select the correct Corp or Contractor VRF. Enter the existing subnet gateway exactly as supplied. During coexistence preparation, leave the gateway state as directed by the instructor; do not activate a duplicate gateway.</li>
        <li>Open <strong>Application Profiles &gt; &lt;prefix&gt;-ap-network-centric &gt; Application EPGs</strong>. Create <code>&lt;prefix&gt;-epg-pilot-1</code> and <code>&lt;prefix&gt;-epg-pilot-2</code>, each associated with its matching pilot BD.</li>
        <li>For each pilot EPG, expand <strong>Domains</strong>, associate <code>&lt;prefix&gt;-phys</code>, and submit.</li>
        <li>Expand <strong>Static Ports</strong>. Add the instructor-assigned leaf path toward the temporary legacy trunk. Enter the preserved VLAN ID as the encapsulation and submit.</li>
        <li>Return to <strong>Networking &gt; L3Outs &gt; &lt;prefix&gt;-l3out-corp</strong>. Confirm the node profile, interface profile, and external EPG remain present for Layer 3 coexistence.</li>
        <li>Open each pilot BD's <strong>Subnets</strong> page and prepare the gateway handoff record. The approved sequence is: validate the trunk and routed coexistence, shut down the legacy SVI, verify it is inactive, enable the matching ACI gateway, and then validate endpoints and routes.</li>
        <li>Do not perform the handoff unless the instructor explicitly releases the change. Configuration preparation is sufficient in a simulator without a connected legacy topology.</li>
        <li>Document rollback in reverse control order: disable the ACI gateway, verify it is inactive, restore the legacy SVI, validate reachability, and only then remove temporary ACI state if instructed.</li>
      </ol>
      <div class="warning"><strong>Stop condition</strong><p>Never allow the legacy SVI and ACI anycast gateway to be active for the same preserved subnet. Do not perform a gateway change in the shared simulator without instructor authorization.</p></div>`
  },
  {
    phase: "Scale and repeatability",
    title: "Install Terraform and scale the ACI deployment",
    short: "Terraform scale",
    body: `
      <p class="lead">Install Terraform on the assigned Ubuntu workstation and use the Cisco ACI provider to create a reviewed batch of network-centric objects.</p>
      <article class="stakeholder-record"><div class="record-type">Operations governance email</div><dl><div><dt>From</dt><dd>Đỗ Ngọc Lan, Director of Network Operations</dd></div><div><dt>To</dt><dd>Automation Lead; SDN Network Architect</dd></div><div><dt>CC</dt><dd>CISO; Change Management; VietTech SI</dd></div><div><dt>Subject</dt><dd>Terraform must scale the approved model without taking ownership of unrelated objects</dd></div></dl><p>Dear colleagues, good morning.</p><p>The production forecast contains approximately 100 EPGs and more than 200 contract relationships. The manually configured pilot has established the object model, but repeating it through the GUI will not provide a controlled production method.</p><p>Please demonstrate Terraform with a small batch in the assigned tenant. The configuration must use the reviewed naming, VRF, VLAN, subnet, physical-domain, and path values. The plan must show no replacement or deletion of manually managed objects, and no apply or destroy action may proceed without instructor approval.</p><p>Credentials must remain outside configuration and state artifacts. Please retain the dependency lock file, sanitized plan, post-apply drift check, APIC fault review, and rollback evidence for the implementation record.</p><p class="record-signature">Thanks,<br>Đỗ Ngọc Lan<br>Director of Network Operations<br>PetroVale Energy</p></article>

      <div class="worksheet">
        <label>Ubuntu release / architecture<input data-field="tfUbuntu" placeholder="Example: Ubuntu 24.04 amd64"></label>
        <label>Terraform version<input data-field="tfVersion" placeholder="Record after installation"></label>
        <label>ACI provider version<input data-field="tfProviderVersion" placeholder="Instructor-approved pinned version"></label>
        <label>Tenant / application profile<input data-field="tfParents" placeholder="Existing objects created earlier"></label>
        <label>VRF / physical domain DN<input data-field="tfPolicyRefs" placeholder="Exact APIC names and DN"></label>
        <label>Static path DN<input data-field="tfStaticPath" placeholder="Assigned leaf or vPC path"></label>
        <label>Approved batch size<input data-field="tfBatchSize" placeholder="Use a small shared-lab batch"></label>
        <label>Plan file / change reference<input data-field="tfPlanRef" placeholder="Record before apply"></label>
      </div>

      <h3>Install Terraform on Ubuntu</h3>
      <ol class="steps">
        <li>Open a terminal on the assigned Ubuntu workstation. Confirm outbound HTTPS access to <code>apt.releases.hashicorp.com</code> and <code>registry.terraform.io</code>. Use the corporate proxy only when the instructor provides its settings.</li>
        <li>Install the repository prerequisites:</li>
      </ol>
      <pre><code>sudo apt-get update
sudo apt-get install -y gnupg software-properties-common wget</code></pre>
      <ol class="steps" start="3">
        <li>Add HashiCorp's signed APT repository using the commands from the official installation guide:</li>
      </ol>
      <pre><code>wget -O- https://apt.releases.hashicorp.com/gpg \
  | gpg --dearmor \
  | sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg &gt; /dev/null

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] \
https://apt.releases.hashicorp.com $(grep -oP '(?&lt;=UBUNTU_CODENAME=).*' /etc/os-release || lsb_release -cs) main" \
  | sudo tee /etc/apt/sources.list.d/hashicorp.list

sudo apt-get update
sudo apt-get install terraform</code></pre>
      <ol class="steps" start="4">
        <li>Run <code>terraform version</code>. Record the installed version and platform. Do not continue if the command is missing or reports an unsupported architecture.</li>
        <li>Create a dedicated working directory. Do not work from another team's Terraform directory or reuse its state.</li>
      </ol>
      <pre><code>umask 077
mkdir -p ~/petrovale-aci/&lt;prefix&gt;-network-batch
cd ~/petrovale-aci/&lt;prefix&gt;-network-batch

cat &gt; .gitignore &lt;&lt;'EOF'
.terraform/
*.tfstate
*.tfstate.*
*.tfplan
crash.log
*.auto.tfvars
EOF</code></pre>

      <h3>Configure the provider and batch model</h3>
      <p>Create <code>versions.tf</code>. Pin the provider version tested by the instructor. The version below matches the referenced provider documentation and must be changed when the lab baseline specifies another release.</p>
      <pre><code>terraform {
  required_version = "&gt;= 1.5.0"

  required_providers {
    aci = {
      source  = "CiscoDevNet/aci"
      version = "~&gt; 2.20.0"
    }
  }
}

provider "aci" {
  allow_existing_on_create = false
}</code></pre>
      <p>Create <code>variables.tf</code>. The map is the scaling boundary: each approved entry represents one network-centric BD, subnet, EPG, domain association, and static path binding.</p>
      <pre><code>variable "prefix" {
  type = string
}

variable "tenant_name" {
  type = string
}

variable "vrf_name" {
  type = string
}

variable "application_profile_name" {
  type = string
}

variable "physical_domain_dn" {
  type = string
}

variable "static_path_dn" {
  type = string
}

variable "networks" {
  type = map(object({
    vlan    = number
    gateway = string
  }))

  validation {
    condition     = alltrue([for network in values(var.networks) : network.vlan &gt;= 1 &amp;&amp; network.vlan &lt;= 4094])
    error_message = "Every VLAN must be between 1 and 4094."
  }
}</code></pre>
      <p>Create <code>main.tf</code>. This configuration references the existing tenant, VRF, application profile, physical domain, and assigned path by their approved names or distinguished names.</p>
      <pre><code>resource "aci_bridge_domain" "batch" {
  for_each  = var.networks
  parent_dn = "uni/tn-&#36;{var.tenant_name}"
  name      = "&#36;{var.prefix}-bd-&#36;{each.key}"

  relation_to_vrf = {
    vrf_name = var.vrf_name
  }
}

resource "aci_subnet" "batch" {
  for_each  = var.networks
  parent_dn = aci_bridge_domain.batch[each.key].id
  ip        = each.value.gateway
  scope     = ["private"]
}

resource "aci_application_epg" "batch" {
  for_each  = var.networks
  parent_dn = "uni/tn-&#36;{var.tenant_name}/ap-&#36;{var.application_profile_name}"
  name      = "&#36;{var.prefix}-epg-&#36;{each.key}"

  relation_to_bridge_domain = {
    bridge_domain_name = aci_bridge_domain.batch[each.key].name
  }
}

resource "aci_relation_to_domain" "batch" {
  for_each  = var.networks
  parent_dn = aci_application_epg.batch[each.key].id
  target_dn = var.physical_domain_dn
}

resource "aci_relation_to_static_path" "batch" {
  for_each              = var.networks
  parent_dn             = aci_application_epg.batch[each.key].id
  target_dn             = var.static_path_dn
  encapsulation         = "vlan-&#36;{each.value.vlan}"
  deployment_immediacy  = "immediate"
  mode                  = "regular"
}</code></pre>
      <p>Create <code>terraform.tfvars</code> with instructor-assigned values. Use only unused test VLANs and nonoverlapping test subnets.</p>
      <pre><code>prefix                   = "team01"
tenant_name              = "team01-petrovale"
vrf_name                 = "team01-vrf-corp"
application_profile_name = "team01-ap-network-centric"
physical_domain_dn       = "uni/phys-team01-phys"
static_path_dn           = "topology/pod-1/paths-101/pathep-[eth1/10]"

networks = {
  batch01 = { vlan = 3101, gateway = "10.31.1.1/24" }
  batch02 = { vlan = 3102, gateway = "10.31.2.1/24" }
  batch03 = { vlan = 3103, gateway = "10.31.3.1/24" }
}</code></pre>
      <div class="warning"><strong>Input review</strong><p>The sample values are not authorization to use those VLANs, subnets, paths, or names. Replace every sample with the instructor-approved worksheet values and validate them against the existing APIC configuration.</p></div>

      <h3>Authenticate without writing the password into Terraform files</h3>
      <ol class="steps">
        <li>Set the provider environment variables. Enter the password interactively so it is not placed in shell history. Use <code>ACI_INSECURE=true</code> only when the simulator uses an instructor-approved self-signed certificate.</li>
      </ol>
      <pre><code>export ACI_URL="https://&lt;apic-management-address&gt;"
export ACI_USERNAME="&lt;assigned-user&gt;"
read -rsp "APIC password: " ACI_PASSWORD; echo
export ACI_PASSWORD
export ACI_INSECURE=true</code></pre>
      <div class="warning"><strong>Credential boundary</strong><p>Do not place the APIC password in <code>provider.tf</code>, <code>terraform.tfvars</code>, a saved plan, screenshots, shell scripts, or source control. Use signature-based authentication when the instructor has provisioned an APIC user certificate.</p></div>

      <h3>Initialize, validate, and review the plan</h3>
      <ol class="steps">
        <li>Run <code>terraform init</code>. Confirm that Terraform downloads the expected Cisco ACI provider and creates <code>.terraform.lock.hcl</code>. Retain the lock file with the configuration.</li>
        <li>Run formatting and static validation before contacting APIC:</li>
      </ol>
      <pre><code>terraform fmt -recursive
terraform validate</code></pre>
      <ol class="steps" start="3">
        <li>Run a refresh-only plan first. Stop if Terraform proposes to change existing infrastructure:</li>
      </ol>
      <pre><code>terraform plan -refresh-only</code></pre>
      <ol class="steps" start="4">
        <li>Create a saved execution plan with conservative concurrency for the shared simulator:</li>
      </ol>
      <pre><code>terraform plan -parallelism=1 -out=batch.tfplan
terraform show -no-color batch.tfplan | tee batch-plan.txt</code></pre>
      <ol class="steps" start="5">
        <li>Review every proposed action. The first approved batch should contain only creates for the named BD, subnet, EPG, domain relation, and static path relation. Stop for any destroy, replacement, unexpected parent DN, duplicate VLAN, overlapping subnet, or object outside your prefix.</li>
        <li>Provide the sanitized plan and APIC input worksheet to the instructor. Do not run apply until approval is explicit.</li>
      </ol>

      <h3>Apply and verify the controlled batch</h3>
      <ol class="steps">
        <li>Apply the exact saved plan; do not create a new unreviewed plan during apply:</li>
      </ol>
      <pre><code>terraform apply -parallelism=1 batch.tfplan</code></pre>
      <ol class="steps" start="2">
        <li>Open APIC and navigate to <strong>Tenants &gt; &lt;tenant&gt; &gt; Networking &gt; Bridge Domains</strong>. Confirm each new BD belongs to the approved VRF and has the intended gateway subnet.</li>
        <li>Navigate to <strong>Application Profiles &gt; &lt;application-profile&gt; &gt; Application EPGs</strong>. Confirm each EPG references the matching BD, physical domain, VLAN encapsulation, and assigned static path.</li>
        <li>Open <strong>System &gt; Faults</strong> and filter by the team prefix. Resolve missing-parent, invalid-path, VLAN-pool, domain, and relationship faults before proceeding.</li>
        <li>Run <code>terraform state list</code> and <code>terraform show</code>. Confirm Terraform state contains only this working directory's batch resources.</li>
        <li>Run a second <code>terraform plan -parallelism=1</code>. The expected result is <strong>No changes</strong>. Investigate drift rather than accepting an unexplained update.</li>
        <li>To demonstrate scale, add one instructor-approved entry to <code>networks</code> and create a new saved plan. Confirm the plan adds one related object set instead of duplicating Terraform resource blocks.</li>
      </ol>

      <h3>Rollback and cleanup</h3>
      <ol class="steps">
        <li>Create and review a destroy plan only when the instructor directs cleanup:</li>
      </ol>
      <pre><code>terraform plan -destroy -parallelism=1 -out=destroy.tfplan
terraform show -no-color destroy.tfplan</code></pre>
      <ol class="steps" start="2">
        <li>Confirm the destroy plan targets only objects created by this state. After instructor approval, run <code>terraform apply -parallelism=1 destroy.tfplan</code>.</li>
        <li>Verify removal in APIC and review faults. Run <code>terraform state list</code>; it should be empty after a complete approved cleanup.</li>
        <li>Remove credentials from the shell with <code>unset ACI_PASSWORD ACI_USERNAME ACI_URL ACI_INSECURE</code>. Protect retained state and plan artifacts according to the instructor's evidence policy.</li>
      </ol>

      <table class="check-table"><thead><tr><th>Checkpoint</th><th>Expected result</th><th>Result</th></tr></thead><tbody>
        <tr><td>Installation</td><td>Terraform version and platform recorded</td><td><select data-field="tfInstallResult"><option>Not run</option><option>Pass</option><option>Fail</option></select></td></tr>
        <tr><td>Validation</td><td><code>fmt</code> and <code>validate</code> complete without error</td><td><select data-field="tfValidateResult"><option>Not run</option><option>Pass</option><option>Fail</option></select></td></tr>
        <tr><td>Reviewed plan</td><td>Only approved creates; no destroy or replacement</td><td><select data-field="tfPlanResult"><option>Not run</option><option>Pass</option><option>Fail</option></select></td></tr>
        <tr><td>APIC verification</td><td>Correct VRF, subnet, EPG, domain, VLAN, and path relations</td><td><select data-field="tfApicResult"><option>Not run</option><option>Pass</option><option>Fail</option></select></td></tr>
        <tr><td>Drift check</td><td>Post-apply plan reports no changes</td><td><select data-field="tfDriftResult"><option>Not run</option><option>Pass</option><option>Fail</option></select></td></tr>
      </tbody></table>
      <div class="verify"><strong>Evidence checkpoint</strong><p>Retain the Terraform version, provider lock file, sanitized HCL, sanitized saved-plan output, approval reference, APIC object and fault evidence, post-apply no-change plan, and cleanup result. Do not retain credentials.</p></div>
      <section class="references"><h3>Official references</h3><p><a href="https://developer.hashicorp.com/terraform/install" target="_blank" rel="noreferrer">Install Terraform</a> · <a href="https://registry.terraform.io/providers/CiscoDevNet/aci/latest/docs" target="_blank" rel="noreferrer">Cisco ACI Provider</a> · <a href="https://registry.terraform.io/providers/CiscoDevNet/aci/latest/docs/resources/bridge_domain" target="_blank" rel="noreferrer">ACI Bridge Domain Resource</a> · <a href="https://registry.terraform.io/providers/CiscoDevNet/aci/latest/docs/resources/application_epg" target="_blank" rel="noreferrer">ACI Application EPG Resource</a></p></section>`
  },
  {
    phase: "Assurance",
    title: "Validate policy, routing, and faults",
    short: "Validation",
    body: `
      <p class="lead">Validate relationships and observable behavior before presenting the build for acceptance.</p>
      <article class="stakeholder-record"><div class="record-type">Operational acceptance memo</div><dl><div><dt>From</dt><dd>Đỗ Ngọc Lan, Director of Network Operations</dd></div><div><dt>To</dt><dd>DC1 Implementation Control Team</dd></div><div><dt>CC</dt><dd>CIO; CISO; Service Management; VietTech SI</dd></div><div><dt>Subject</dt><dd>A successful APIC commit is not an acceptance test</dd></div></dl><p>Dear implementation team, good afternoon.</p><p>The SI evidence pack currently shows that APIC accepted the objects without a transaction error. That proves the configuration was syntactically accepted; it does not prove endpoint learning, contract direction, service insertion, external routing, denied flows, or operational readiness.</p><p>Acceptance must distinguish configuration relationships from observable behavior and must record unavailable simulator functions honestly. New faults must be traced to their affected objects and corrected before sign-off.</p><p>Please complete the validation matrix and retain positive, negative, and limitation evidence.</p><p class="record-signature">Thanks,<br>Đỗ Ngọc Lan<br>Director of Network Operations<br>PetroVale Energy</p></article>
      <table class="check-table"><thead><tr><th>Test</th><th>Expected evidence</th><th>Result</th></tr></thead><tbody>
        <tr><td>Tenant hierarchy</td><td>One tenant, two VRFs, correct BD and EPG ownership</td><td><select data-field="testHierarchy"><option>Not run</option><option>Pass</option><option>Fail</option><option>Not available</option></select></td></tr>
        <tr><td>Encapsulation deployment</td><td>Assigned VLANs resolve to assigned paths</td><td><select data-field="testEncap"><option>Not run</option><option>Pass</option><option>Fail</option><option>Not available</option></select></td></tr>
        <tr><td>Contract relations</td><td>Correct providers, consumers, subjects, and filters</td><td><select data-field="testContracts"><option>Not run</option><option>Pass</option><option>Fail</option><option>Not available</option></select></td></tr>
        <tr><td>L4-L7 service graph</td><td>Graph, contract subject, device selection, connectors, and BDs agree</td><td><select data-field="testL4L7"><option>Not run</option><option>Pass</option><option>Fail</option><option>Not available</option></select></td></tr>
        <tr><td>Terraform-managed batch</td><td>Approved objects exist, provider relations are correct, and the post-apply plan reports no drift</td><td><select data-field="testTerraform"><option>Not run</option><option>Pass</option><option>Fail</option><option>Not available</option></select></td></tr>
        <tr><td>eBGP L3Out boundaries</td><td>Both configurations valid; adjacency and routes only when the corresponding peer is enabled</td><td><select data-field="testBgp"><option>Not run</option><option>Pass</option><option>Fail</option><option>Not available</option></select></td></tr>
        <tr><td>Positive and negative flows</td><td>Intended flow permitted and unintended flow denied when endpoints exist</td><td><select data-field="testFlows"><option>Not run</option><option>Pass</option><option>Fail</option><option>Not available</option></select></td></tr>
        <tr><td>Fault review</td><td>No unresolved learner-created critical or major fault</td><td><select data-field="testFaults"><option>Not run</option><option>Pass</option><option>Fail</option><option>Not available</option></select></td></tr>
      </tbody></table>
      <div class="gui-path"><strong>GUI areas</strong><code>System &gt; Faults · Tenant Operational views · L3Out Operational views</code></div>
      <ol class="steps"><li>Click <strong>System &gt; Faults</strong>. Select <strong>All</strong>, enter your object prefix in the search or filter field, and compare the result with the baseline recorded in the access task.</li><li>For each new fault, click the fault row and open <strong>Affected Object</strong>. Follow the distinguished-name path to the tenant, BD, EPG, domain, contract, service graph, device selection, or L3Out object that raised it.</li><li>Open each EPG and select <strong>Operational &gt; Endpoints</strong> or <strong>Operational &gt; Client End-Points</strong>. If simulated endpoints are enabled, record learned MAC, IP, VLAN, and path values.</li><li>Open each EPG's <strong>Contracts</strong> view. Confirm its consumed and provided relations. Open the contract subject and confirm the expected filter, destination port, and service-graph association.</li><li>Open <strong>Services &gt; L4-L7 &gt; Service Graph Templates</strong>. Verify the firewall node order, rendered graph, concrete-device mapping, consumer and provider BDs, and graph faults.</li><li>Open both <strong>&lt;prefix&gt;-l3out-corp</strong> and <strong>&lt;prefix&gt;-l3out-contractor</strong> under <strong>Networking &gt; L3Outs</strong>. Use <strong>Operational</strong>, <strong>Protocols</strong>, or the BGP peer view available in the simulator release to inspect each peer and route table separately.</li><li>If endpoints and the service device are available, run the instructor-provided positive flow and then the negative flow. Record source EPG, destination, protocol, port, expected service path, and observed result.</li><li>Correct the root cause of any learner-created fault, repeat the affected test, and capture before-and-after evidence. Do not clear a fault as a substitute for correction.</li><li>State every test limitation explicitly. Do not convert <strong>Not available</strong> into <strong>Pass</strong>.</li></ol>`
  },
  {
    phase: "Handover",
    title: "Export evidence and restore the shared lab",
    short: "Handover and cleanup",
    body: `
      <p class="lead">Complete the implementation record and leave the shared simulator in the state specified by the instructor.</p>
      <ol class="steps">
        <li>Export or capture the initial pod values, fabric membership, tenant hierarchy, VRFs, bridge domains, EPGs, domain and static bindings, filters, contracts, L4-L7 device and service graph, both L3Outs, BGP policies, external EPGs, and faults.</li>
        <li>Record object names, distinguished names where useful, assigned VLANs and subnets, deviations, unresolved faults, test limitations, Terraform configuration, dependency lock file, sanitized plans, state scope, and drift results.</li>
        <li>Write a short DC2 reuse note: identify which objects are reusable standards and which parameters must change by site.</li>
        <li>Ask the instructor whether to retain the configuration for review or delete all objects carrying your prefix.</li>
        <li>If cleanup is required, remove dependent tenant objects before shared fabric-access objects. Delete only objects carrying your assigned prefix.</li>
        <li>Repeat the fault review and confirm you did not remove or alter another learner's objects.</li>
      </ol>
      <section class="deliverables"><h3>Submission checklist</h3><label><input type="checkbox" data-evidence="worksheet"> Initial pod and parameter worksheets without credentials</label><label><input type="checkbox" data-evidence="tenant"> Tenant and VRF evidence</label><label><input type="checkbox" data-evidence="epg"> BD, EPG, VLAN, and path evidence</label><label><input type="checkbox" data-evidence="contracts"> Contract and relation evidence</label><label><input type="checkbox" data-evidence="l4l7"> L4-L7 device, service graph, and selection-policy evidence</label><label><input type="checkbox" data-evidence="l3out"> L3Out and BGP evidence</label><label><input type="checkbox" data-evidence="terraform"> Terraform configuration, lock file, sanitized plan, drift, and cleanup evidence</label><label><input type="checkbox" data-evidence="validation"> Validation and fault record</label><label><input type="checkbox" data-evidence="dc2"> DC2 reuse note</label></section>
      <div class="verify"><strong>Acceptance statement</strong><p>The lab is complete when the configuration is traceable to the approved design, all available tests are evidenced, limitations are explicit, and the simulator is left in the instructor-approved state.</p></div>`
  }
];

const storageKey = "petrovale-aci-simulator-lab-v4";
const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
const state = { index: Number(saved.index) || 0, completed: new Set(saved.completed || []), fields: saved.fields || {}, evidence: saved.evidence || {} };

const nav = document.getElementById("taskNav");
const content = document.getElementById("taskContent");
const title = document.getElementById("taskTitle");
const phase = document.getElementById("phaseLabel");
const previous = document.getElementById("previousButton");
const next = document.getElementById("nextButton");
const complete = document.getElementById("completeButton");

function save() {
  localStorage.setItem(storageKey, JSON.stringify({ index: state.index, completed: [...state.completed], fields: state.fields, evidence: state.evidence }));
}

function renderNav() {
  nav.innerHTML = tasks.map((task, index) => `<button type="button" class="task-link ${index === state.index ? "active" : ""} ${state.completed.has(index) ? "done" : ""}" data-index="${index}"><span>${state.completed.has(index) ? "✓" : index + 1}</span><em>${task.short}</em></button>`).join("");
  nav.querySelectorAll("button").forEach(button => button.addEventListener("click", () => { state.index = Number(button.dataset.index); render(); }));
  document.getElementById("progressCount").textContent = `${state.completed.size} of ${tasks.length}`;
  document.getElementById("progressBar").style.width = `${(state.completed.size / tasks.length) * 100}%`;
}

function bindFields() {
  content.querySelectorAll("[data-field]").forEach(element => {
    const key = element.dataset.field;
    if (state.fields[key] !== undefined) element.value = state.fields[key];
    element.addEventListener("change", () => { state.fields[key] = element.value; save(); });
  });
  content.querySelectorAll("[data-evidence]").forEach(element => {
    const key = element.dataset.evidence;
    element.checked = Boolean(state.evidence[key]);
    element.addEventListener("change", () => { state.evidence[key] = element.checked; save(); });
  });
}

function render() {
  const task = tasks[state.index];
  title.textContent = task.title;
  phase.textContent = task.phase;
  content.innerHTML = task.body;
  previous.disabled = state.index === 0;
  next.disabled = state.index === tasks.length - 1;
  complete.textContent = state.completed.has(state.index) ? "Completed" : "Mark complete";
  complete.classList.toggle("is-complete", state.completed.has(state.index));
  bindFields();
  renderNav();
  document.querySelector(".workspace").scrollTop = 0;
  save();
}

previous.addEventListener("click", () => { if (state.index > 0) { state.index -= 1; render(); } });
next.addEventListener("click", () => { if (state.index < tasks.length - 1) { state.index += 1; render(); } });
complete.addEventListener("click", () => { state.completed.has(state.index) ? state.completed.delete(state.index) : state.completed.add(state.index); render(); });
document.getElementById("printButton").addEventListener("click", () => window.print());

render();
