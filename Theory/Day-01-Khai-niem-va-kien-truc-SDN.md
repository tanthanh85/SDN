# Ngay 1 - Khai Niem Va Kien Truc SDN

## 1. Muc Tieu Hoc Tap

Sau ngay hoc dau tien, hoc vien co the:

- Giai thich duoc SDN la gi va vi sao doanh nghiep quan tam den SDN.
- Phan biet duoc mo hinh mang truyen thong voi mo hinh Software-Defined Networking.
- Mo ta duoc vai tro cua control plane, data plane va application plane.
- Hieu duoc khai niem controller, fabric, underlay, overlay, policy va automation trong SDN.
- Nhan dien duoc cac giao thuc/API pho bien trong SDN nhu OpenFlow, REST API, NETCONF, RESTCONF va gNMI.
- Lien he duoc SDN voi cac giai phap thuc te cua Cisco: ACI, SD-Access/Catalyst Center, Catalyst SD-WAN, Meraki SD-WAN.
- Dat nen tang de nghien cuu lo trinh chuyen doi tu mang truyen thong sang SDN.

## 2. Boi Canh: Vi Sao Mang Truyen Thong Can Thay Doi?

Hoc vien trong khoa nay da co kinh nghiem mang va da tung hoc Cisco SD-WAN, vi vay chung ta khong xem SDN nhu mot khai niem hoan toan moi. Thuc te, SD-WAN la mot trong nhung ung dung thanh cong va pho bien nhat cua tu duy SDN trong mien WAN.

Trong nhieu nam, mang doanh nghiep duoc van hanh chu yeu theo cach:

- Cau hinh truc tiep tung thiet bi.
- Logic dieu khien nam phan tan tren tung router, switch, firewall.
- Chinh sach mang gan chat voi VLAN, subnet, ACL, VRF, routing protocol.
- Thay doi phu thuoc nhieu vao thao tac thu cong va quy trinh change management.
- Kha nang quan sat tong the bi gioi han vi moi he thong co cach ghi log, telemetry va cau hinh rieng.

Cach tiep can nay van hoat dong tot trong nhieu moi truong, nhung bat dau gap kho khan khi doanh nghiep co cac yeu cau moi:

- Mo rong nhanh chi nhanh, nha may, kho, van phong.
- Ket noi nhieu cloud va SaaS.
- Phan tach IT/OT, user/guest/IoT/camera/server.
- Dam bao zero trust va least privilege.
- Tu dong hoa cau hinh va giam loi con nguoi.
- Giam sat trai nghiem nguoi dung va chat luong ung dung.
- Trien khai policy nhat quan tren nhieu mien mang.

SDN xuat hien nhu mot cach to chuc lai mang: khong chi thay doi cong nghe, ma thay doi cach chung ta thiet ke, cau hinh, van hanh va kiem soat mang.

## 3. SDN La Gi?

Software-Defined Networking la mot kien truc mang trong do phan dieu khien mang duoc tach bach hoac duoc truu tuong hoa khoi phan chuyen tiep du lieu. Thay vi moi thiet bi tu nam toan bo logic cau hinh, dinh tuyen, chinh sach va xu ly, SDN dua vao mot lop dieu khien tap trung hoac logic tap trung de quan ly mang theo intent va policy.

Noi ngan gon:

> SDN la cach lam cho mang co the duoc lap trinh, tu dong hoa va dieu khien tap trung hon.

SDN khong nhat thiet co nghia la:

- Phai dung OpenFlow.
- Phai thay toan bo thiet bi mang.
- Phai bo routing protocol truyen thong.
- Phai dung mot controller duy nhat cho tat ca moi thu.
- Phai la mot san pham cu the cua mot hang nao do.

SDN nen duoc hieu la mot kien truc va tu duy van hanh, trong do mang duoc dieu khien thong qua controller, API, policy va automation thay vi chi cau hinh thu cong tung hop thiet bi.

## 4. Mang Truyen Thong Va SDN: So Sanh Tu Goc Nhin Van Hanh

| Khia canh | Mang truyen thong | Mang theo huong SDN |
|---|---|---|
| Dieu khien | Phan tan tren tung thiet bi | Tap trung hoac logic tap trung qua controller |
| Cau hinh | CLI tung thiet bi, template thu cong | API, policy, intent, automation |
| Chinh sach | VLAN, ACL, VRF, routing, firewall rule | Segment, contract, security group, policy matrix |
| Thay doi | Thao tac tren nhieu node | Thay doi tai controller/orchestrator |
| Kiem soat loi | Phu thuoc quy trinh va ky nang ca nhan | Co the chuan hoa bang workflow va validation |
| Visibility | Phan manh theo tung thiet bi | Tong hop qua controller/assurance/telemetry |
| Mo rong | Thuong can lap lai cau hinh | Co the day theo template va intent |
| Tich hop | Chu yeu CLI/SNMP/syslog | REST API, NETCONF, RESTCONF, streaming telemetry |

Dieu quan trong: SDN khong lam mat di kien thuc mang nen tang. Routing, switching, subnetting, BGP, OSPF, QoS, HA, security van con nguyen gia tri. SDN chi thay doi cach chung ta ap dung va van hanh cac nguyen ly do o quy mo lon hon, co tinh lap trinh cao hon.

## 5. Ba Mat Phang Chinh Trong Kien Truc SDN

### 5.1 Data Plane

Data plane la noi thiet bi thuc hien chuyen tiep goi tin. Trong thuc te, day co the la:

- Switch.
- Router.
- Wireless access point.
- Firewall.
- SD-WAN edge.
- Virtual switch.
- Cloud network gateway.

Data plane tra loi cau hoi: "Goi tin nay di dau?"

Trong mang truyen thong, moi thiet bi data plane thuong co ca logic dieu khien cuc bo. Vi du, mot router vua chay OSPF/BGP, vua xay dung routing table, vua forward packet. Trong SDN, mot phan logic dieu khien co the duoc dua len controller hoac duoc dieu phoi boi controller.

### 5.2 Control Plane

Control plane la noi dua ra quyet dinh dieu khien mang:

- Hoc topology.
- Tinh toan duong di.
- Quan ly policy.
- Cap phat thong tin tunnel/overlay.
- Xac dinh endpoint nam o dau.
- Day cau hinh xuong thiet bi.
- Phat hien trang thai bat thuong.

Trong SDN, control plane thuong gan voi controller. Tuy nhien, "tap trung" khong co nghia la chi co mot may chu duy nhat. Controller san xuat thuong duoc trien khai dang cluster de dam bao kha nang san sang cao.

Vi du:

- Cisco APIC trong ACI.
- Cisco Catalyst Center trong SD-Access.
- Cisco Catalyst SD-WAN Manager/Controller trong SD-WAN.
- OpenDaylight, ONOS, Ryu trong moi truong ma nguon mo/lab.

### 5.3 Application Plane

Application plane la lop ung dung chay phia tren controller hoac tich hop voi controller. Lop nay the hien nhu cau kinh doanh va van hanh thanh chinh sach mang.

Vi du:

- Ung dung automation.
- Ung dung security policy.
- Ung dung monitoring/assurance.
- Portal self-service.
- He thong ITSM.
- He thong CMDB/source of truth.
- Orchestrator nhu Ansible, Terraform, ServiceNow workflow.

Application plane tra loi cau hoi: "Doanh nghiep muon mang hanh xu nhu the nao?"

Controller chuyen y dinh do thanh cau hinh ky thuat cu the tren data plane.

## 6. Northbound API Va Southbound API

### 6.1 Southbound API

Southbound API la giao dien giua controller va thiet bi mang. No duoc dung de:

- Day cau hinh.
- Thu thap trang thai.
- Dieu khien forwarding.
- Quan ly flow.
- Lay telemetry.

Mot so giao thuc/API pho bien:

- OpenFlow.
- NETCONF.
- RESTCONF.
- gNMI/gNOI.
- SNMP, syslog trong cac moi truong cu.
- Vendor-specific API.
- CLI automation trong truong hop chua co API tot.

OpenFlow la giao thuc noi tieng trong lich su SDN vi cho phep controller lap trinh flow table cua switch. Tuy nhien, trong mang doanh nghiep hien dai, SDN khong bi gioi han boi OpenFlow. Nhieu giai phap thuc te dung API, model-driven configuration, overlay protocol va controller rieng cua vendor.

### 6.2 Northbound API

Northbound API la giao dien giua controller va cac ung dung/nguoi van hanh. No thuong duoc dung de:

- Lay inventory.
- Tao site, fabric, segment, policy.
- Trien khai cau hinh.
- Lay health score.
- Lay thong tin su co.
- Tich hop voi ITSM, monitoring, security platform.

REST API la dang pho bien nhat trong northbound API. Hoc vien da hoc Cisco SD-WAN co the lien he voi viec dung API cua SD-WAN Manager de lay danh sach device, template, policy, task status.

## 7. Controller Trong SDN

Controller la thanh phan trung tam cua kien truc SDN, nhung khong nen hieu don gian la "mot giao dien GUI dep hon". Controller co nhieu vai tro hon:

- Quan ly vong doi cau hinh.
- Duy tri topology va inventory.
- Chuyen intent/policy thanh cau hinh.
- Phan phoi cau hinh den thiet bi.
- Thu thap telemetry va trang thai.
- Ho tro troubleshooting.
- Cung cap API cho automation.
- Dam bao consistency giua cac thiet bi.

### 7.1 Controller Khong Phai Luc Nao Cung Nam Trong Duong Di Du Lieu

Mot hieu nham pho bien la neu controller loi thi toan bo mang ngung forward packet. Thuc te phu thuoc vao kien truc.

Trong nhieu giai phap SDN doanh nghiep:

- Controller dung de cau hinh, dieu phoi, day policy.
- Data plane van tiep tuc forward dua tren bang da duoc lap trinh.
- Neu controller loi, cac flow hien co co the van chay.
- Nhung kha nang thay doi policy, onboarding endpoint moi, tinh toan lai duong di hoac day cau hinh moi co the bi anh huong.

Vi vay, khi thiet ke SDN can phan biet:

- Failure cua controller anh huong gi den forwarding hien tai?
- Anh huong gi den thay doi moi?
- Anh huong gi den monitoring/assurance?
- Co cluster/HA khong?
- Co backup/restore va disaster recovery khong?

## 8. Underlay Va Overlay

### 8.1 Underlay

Underlay la mang nen vat ly hoac logic cung cap ket noi IP giua cac node trong fabric.

Underlay thuong can:

- IP reachability on dinh.
- Routing hoi tu nhanh.
- MTU phu hop.
- ECMP neu co leaf-spine.
- Redundancy.
- Monitoring ro rang.

Trong data center, underlay co the la leaf-spine chay IS-IS, OSPF hoac BGP. Trong WAN, underlay co the la MPLS, Internet, LTE/5G, leased line. Trong campus, underlay co the la mang routed access/distribution/core.

### 8.2 Overlay

Overlay la lop ket noi ao duoc xay dung ben tren underlay.

Overlay giup:

- Tao segment doc lap voi topology vat ly.
- Di chuyen workload/endpoint linh hoat hon.
- Ap dung policy theo nhom/ung dung thay vi chi theo dia chi IP.
- Dong goi traffic qua tunnel.
- Che giau phuc tap cua underlay doi voi ung dung.

Cong nghe overlay pho bien:

- VXLAN.
- GRE.
- IPsec.
- LISP.
- SD-WAN tunnel.

Tu duy quan trong:

> Underlay phai on dinh truoc, overlay moi co the on dinh.

Khi troubleshoot SDN, khong nen chi nhin vao controller GUI. Can kiem tra:

- Underlay IP reachability.
- Routing adjacency.
- MTU.
- Tunnel status.
- Endpoint learning.
- Policy enforcement.
- Flow/contract/security rule.

## 9. Fabric Trong SDN

Fabric la tap hop cac thiet bi duoc dieu khien nhu mot mien logic thong nhat. Thay vi nhin tung switch/router rieng le, chung ta nhin ca mien mang nhu mot he thong co chung policy, chung telemetry va chung co che van hanh.

Vi du fabric:

- ACI fabric trong data center.
- SD-Access fabric trong campus.
- SD-WAN overlay fabric trong WAN.
- EVPN-VXLAN fabric.

Mot fabric thuong bao gom:

- Node tham gia fabric.
- Controller/orchestrator.
- Underlay.
- Overlay.
- Endpoint/host tracking.
- Policy model.
- Border/gateway ra ngoai fabric.

## 10. Policy-Based Networking

Trong mang truyen thong, chung ta thuong mo ta ket noi bang IP, VLAN, subnet, ACL. Trong SDN, chinh sach thuong duoc mo ta o muc cao hon:

- Nhom nguoi dung nao duoc truy cap ung dung nao?
- Thiet bi IoT duoc noi den dich vu nao?
- OT network co duoc truy cap Internet khong?
- Guest co duoc di vao server zone khong?
- Branch nao duoc dung local internet breakout?
- Ung dung nao di qua MPLS, ung dung nao di qua Internet?

Policy-based networking giup tach "y dinh" khoi "cau hinh cu the".

Vi du:

Y dinh:

- Nhom Finance chi duoc truy cap ERP va Internet.
- Nhom Guest chi duoc truy cap Internet.
- Nhom OT chi duoc truy cap historian server va jump host.

Cau hinh cu the co the la:

- VRF.
- VLAN.
- SGT.
- ACL.
- Contract.
- Firewall rule.
- SD-WAN centralized policy.
- Route leaking.
- NAT.

SDN giup controller/orchestrator chuyen y dinh thanh cau hinh phu hop voi mien mang tuong ung.

## 11. Tu Dong Hoa Trong SDN

Tu dong hoa la mot trong nhung gia tri lon nhat cua SDN. Tuy nhien, tu dong hoa khong chi la viet script thay cho go lenh CLI.

Tu dong hoa tot can co:

- Chuan hoa template.
- Source of truth.
- Quy trinh phe duyet.
- Idempotency.
- Validation truoc va sau thay doi.
- Rollback.
- Logging va audit.
- Quan ly credential an toan.

Cac cap do tu dong hoa co the nhin nhu sau:

1. Manual CLI: ky su cau hinh tung thiet bi.
2. Script-based: dung Python/shell de day lenh.
3. Template-based: dung Jinja2, Ansible template, device template.
4. API-based: goi controller/device API.
5. Intent-based: khai bao mong muon, he thong tu sinh cau hinh.
6. Closed-loop automation: telemetry phat hien van de, workflow tu dong xu ly hoac de xuat xu ly.

Hien nay, phan lon doanh nghiep dung ket hop cac cap do tren. Muc tieu thuc te khong phai "tu dong hoa 100% ngay lap tuc", ma la tu dong hoa cac tac vu lap lai, co rui ro cao, can chuan hoa cao.

## 12. Cac Giao Thuc Va API Pho Bien

### 12.1 OpenFlow

OpenFlow cho phep controller lap trinh flow table cua switch. Trong lab SDN, OpenFlow rat huu ich de hieu su tach biet control plane va data plane. Tuy nhien, trong doanh nghiep, OpenFlow khong phai giao thuc duy nhat hay bat buoc.

Nen day OpenFlow de hoc vien hieu nguyen ly:

- Match field.
- Action.
- Flow table.
- Controller-to-switch interaction.

Khong nen de hoc vien hieu nham rang "SDN = OpenFlow".

### 12.2 REST API

REST API rat pho bien trong controller SDN. Dac diem:

- Su dung HTTP/HTTPS.
- Du lieu thuong la JSON.
- De tich hop voi Postman, Python, Ansible, Terraform, ServiceNow.
- Phu hop cho northbound API.

Vi du thao tac:

- GET inventory.
- GET device health.
- POST create policy.
- PUT update template.
- DELETE object.

### 12.3 NETCONF

NETCONF la giao thuc quan ly cau hinh thiet bi, thuong chay tren SSH va su dung YANG model.

Gia tri cua NETCONF:

- Cau hinh co cau truc.
- Co model du lieu ro rang.
- Ho tro candidate/running datastore tuy thiet bi.
- Tot hon viec parse output CLI.

### 12.4 RESTCONF

RESTCONF dua mo hinh du lieu YANG len giao dien RESTful. No than thien hon voi cac he thong quen dung HTTP/JSON.

### 12.5 gNMI Va Streaming Telemetry

gNMI va model-driven telemetry ngay cang quan trong trong van hanh mang hien dai. Thay vi polling SNMP theo chu ky, thiet bi co the stream telemetry den collector.

Ung dung:

- Giam sat interface.
- Giam sat CPU/memory.
- Theo doi routing neighbor.
- Phat hien bat thuong.
- Lam du lieu dau vao cho AI/ML hoac assurance engine.

## 13. Cac Giai Phap SDN Thuc Te Cua Cisco

### 13.1 Cisco ACI - SDN Cho Data Center

Cisco ACI la giai phap SDN cho data center. Thanh phan chinh:

- APIC controller.
- Spine switch.
- Leaf switch.
- Tenant.
- VRF.
- Bridge Domain.
- Endpoint Group.
- Contract.

Tu duy cua ACI la application-centric: chinh sach ket noi duoc mo ta theo nhom endpoint va contract, thay vi chi cau hinh VLAN/ACL tung noi.

ACI phu hop khi doanh nghiep can:

- Data center fabric leaf-spine.
- Microsegmentation.
- Quan ly policy tap trung.
- Tich hop physical/virtual/cloud workload.
- Tu dong hoa provisioning ung dung.

### 13.2 Cisco SD-Access Va Catalyst Center - SDN Cho Campus

Cisco SD-Access dua tu duy SDN vao campus/wired/wireless. Catalyst Center la he thong quan ly tap trung, automation va assurance cho SD-Access.

Thanh phan/khai niem can nam:

- Fabric edge.
- Fabric border.
- Control plane node.
- VN/Virtual Network.
- SGT/Scalable Group Tag.
- LISP.
- VXLAN.
- Cisco ISE cho identity va policy.

Gia tri chinh:

- Segment nguoi dung/thiet bi theo identity.
- Giam phu thuoc vao VLAN/subnet theo vi tri vat ly.
- Quan ly policy tap trung.
- Onboarding va automation cho campus.
- Assurance de ho tro van hanh.

### 13.3 Cisco Catalyst SD-WAN - SDN Cho WAN

Hoc vien da hoc Cisco SD-WAN, vi vay co the dung no lam cau noi de hieu SDN.

Trong SD-WAN:

- WAN edge la data plane.
- Controller/manager dieu khien policy, template, control connection.
- Overlay tunnel chay tren underlay MPLS/Internet/LTE.
- Policy quyet dinh ung dung di duong nao.
- Centralized management thay cho cau hinh tung router chi nhanh.

Cac khai niem SDN the hien rat ro:

- Separation giua underlay va overlay.
- Controller-based management.
- Policy-based routing theo ung dung.
- Template va automation.
- Telemetry va assurance.

### 13.4 Cisco Meraki SD-WAN

Meraki SD-WAN la mo hinh cloud-managed, phu hop voi doanh nghiep muon quan ly chi nhanh don gian, nhanh, it can thiep sau vao ha tang.

Gia tri:

- Cloud dashboard.
- Zero-touch provisioning.
- Auto VPN.
- Security va SD-WAN tich hop.
- Phu hop voi lean IT va he thong nhieu chi nhanh quy mo vua/nho.

### 13.5 Ket Noi Nhieu Mien SDN

Trong doanh nghiep lon, khong nen ky vong mot SDN domain duy nhat giai quyet tat ca. Thuc te co the co:

- ACI cho data center.
- SD-Access cho campus.
- Catalyst SD-WAN cho WAN.
- Meraki cho mot so chi nhanh.
- Cloud networking cua AWS/Azure/GCP.
- Firewall/security platform rieng.

Thach thuc la:

- Dong bo policy.
- Dong bo identity.
- Kiem soat route giua cac mien.
- Visibility end-to-end.
- Quy trinh automation thong nhat.
- Operation model ro rang.

## 14. Cac Nen Tang SDN Ma Nguon Mo

### 14.1 OpenDaylight

OpenDaylight la controller SDN ma nguon mo, thuong duoc dung de nghien cuu, tich hop va xay dung controller-based networking.

### 14.2 ONOS

ONOS tap trung vao network operating system cho service provider va carrier-grade SDN.

### 14.3 Ryu

Ryu la SDN framework viet bang Python, rat phu hop cho lab va dao tao vi de viet controller logic co ban.

### 14.4 Mininet

Mininet cho phep mo phong topology mang tren mot may Linux. Hoc vien co the tao host, switch, link va controller de kiem thu OpenFlow/SDN concept.

### 14.5 Open vSwitch

Open vSwitch la virtual switch pho bien trong lab, NFV va moi truong ao hoa. No ho tro OpenFlow va nhieu tinh nang switching nang cao.

Trong khoa hoc nay, cac nen tang ma nguon mo nen duoc dung de lam ro nguyen ly. Khi noi den thiet ke doanh nghiep, can quay lai cac van de thuc te: HA, security, support, lifecycle, migration, integration, operation.

## 15. SDN Va Chuyen Doi Tu Mang Truyen Thong

Voi hoc vien dang chuan bi nghien cuu chuyen doi mang truyen thong sang SDN, can nhan manh: chuyen doi SDN khong nen bat dau bang viec chon san pham. No nen bat dau bang bai toan doanh nghiep.

### 15.1 Cac Cau Hoi Nen Dat Ra

- Van de hien tai cua mang la gi?
- Can giam loi cau hinh, tang toc trien khai, hay tang bao mat?
- Can SDN cho mien nao truoc: WAN, campus, data center, cloud?
- Ha tang hien tai co ho tro nang cap khong?
- Doi ngu van hanh da san sang voi API/automation chua?
- Co source of truth va quy trinh change management tot chua?
- Co yeu cau IT/OT segmentation khong?
- Co can zero-trust workplace khong?
- He thong hien tai co phu thuoc vao VLAN/ACL/VRF phuc tap khong?

### 15.2 Thu Tu Chuyen Doi Thuong Gap

Mot lo trinh thuc te:

1. Chuan hoa inventory, IP plan, naming convention.
2. Xay dung visibility va monitoring tot hon.
3. Tu dong hoa cac tac vu don gian: backup, compliance check, template cau hinh.
4. Trien khai SDN tai mien co gia tri ro nhat, vi du SD-WAN cho chi nhanh.
5. Mo rong sang segmentation campus hoac data center fabric.
6. Tich hop policy, identity va monitoring.
7. Xay dung closed-loop operation cho mot so use case phu hop.

### 15.3 Nhung Rui Ro Can Quan Ly

- Thieu hieu biet ve underlay.
- Thiet ke segment qua phuc tap.
- Policy khong duoc validate truoc khi day.
- Controller tro thanh diem phu thuoc van hanh nhung khong co HA/backup.
- API token va credential bi quan ly kem.
- Automation khong co rollback.
- Khong co mo hinh van hanh moi sau khi trien khai.
- Doi ngu network va security khong thong nhat cach dinh nghia policy.

## 16. Vi Du Thao Luan: Doanh Nghiep Nhieu Chi Nhanh

Gia su doanh nghiep co:

- 1 data center chinh.
- 1 van phong trung tam.
- 20 chi nhanh.
- 2 nha may OT.
- Ung dung ERP dat tai data center.
- Microsoft 365 va mot so SaaS.
- Nhu cau tach user, guest, camera, IoT, OT, server.

Theo cach truyen thong:

- Moi chi nhanh co router, switch, firewall cau hinh rieng.
- WAN dung MPLS va Internet backup.
- ACL cau hinh khac nhau giua cac site.
- Guest network tuy site co/tuy site khong.
- Kho kiem soat ai duoc truy cap ung dung nao.

Theo huong SDN:

- SD-WAN tao overlay tren MPLS/Internet.
- Centralized policy dieu khien ung dung di qua duong nao.
- Campus fabric dung segment/identity de tach user/IoT/guest.
- Data center fabric dung policy giua application tier.
- Controller/API giup day policy va thu thap trang thai.
- Monitoring/assurance cung cap visibility end-to-end.

Cau hoi thao luan:

- Nen bat dau chuyen doi tu WAN, campus hay data center?
- Dau la diem rui ro cao nhat?
- Chinh sach nao nen chuan hoa truoc?
- Can giu lai thanh phan mang truyen thong nao?
- Doi voi OT, co nen dua vao fabric ngay khong hay tach theo giai doan?

## 17. Tom Tat Ngay 1

Nhung diem can nho:

- SDN la kien truc va tu duy van hanh, khong phai mot giao thuc duy nhat.
- Gia tri cot loi cua SDN nam o controller, API, policy, automation va visibility.
- SDN khong thay the kien thuc routing/switching, ma dua chung vao mo hinh dieu khien va van hanh moi.
- Underlay on dinh la dieu kien tien quyet cho overlay on dinh.
- Controller quan trong, nhung khong phai luc nao cung nam trong data path.
- SD-WAN la vi du rat tot de hieu SDN: overlay, controller, policy, automation, telemetry.
- Chuyen doi sang SDN can bat dau tu bai toan thuc te, khong bat dau tu san pham.

## 18. Cau Hoi On Tap

1. Vi sao noi SDN la mot kien truc chu khong chi la mot cong nghe?
2. Diem khac nhau giua control plane va data plane trong mang truyen thong va SDN la gi?
3. Northbound API va southbound API khac nhau nhu the nao?
4. Tai sao underlay phai on dinh truoc khi trien khai overlay?
5. Trong Cisco SD-WAN, dau la controller, dau la data plane, dau la overlay?
6. Vi sao "SDN = OpenFlow" la cach hieu chua day du?
7. Neu controller bi loi, data plane co chac chan bi dung khong? Vi sao?
8. Doanh nghiep nen bat dau chuyen doi SDN tu mien mang nao? Can dua tren tieu chi nao?
9. Policy-based networking khac gi voi viec cau hinh ACL truyen thong?
10. Nhung rui ro lon nhat khi tu dong hoa mang la gi?

## 19. Hoat Dong Tren Lop

### Hoat Dong 1: Ve Kien Truc SDN

Chia lop thanh nhom 3-5 nguoi. Moi nhom ve so do SDN cho doanh nghiep gom:

- Data center.
- Head office.
- Branch.
- Cloud.
- OT zone.
- Guest/user/server zone.

Yeu cau chi ra:

- Dau la underlay.
- Dau la overlay.
- Dau la controller.
- Policy enforcement nam o dau.
- API/automation co the tich hop o dau.

### Hoat Dong 2: Phan Tich Cisco SD-WAN Theo Kien Truc SDN

Vi hoc vien da hoc qua Cisco SD-WAN, giang vien yeu cau hoc vien map cac thanh phan:

- WAN Edge.
- SD-WAN Manager.
- Controller/control connection.
- Template.
- Centralized policy.
- Localized policy.
- Application-aware routing.
- Overlay tunnel.

Vao cac lop:

- Data plane.
- Control plane.
- Application plane.
- Northbound API.
- Southbound/control channel.
- Underlay/overlay.

### Hoat Dong 3: Thao Luan Brownfield Migration

Tinh huong:

Mot doanh nghiep dang co 50 switch campus, 10 router WAN, 2 firewall, VLAN/ACL phuc tap va nhieu chi nhanh cau hinh khong dong nhat. Ban lanh dao muon "chuyen sang SDN" trong 12 thang.

Moi nhom tra loi:

- Nen danh gia hien trang gi truoc?
- Nen lam pilot o dau?
- Nen giu lai phan nao cua mang truyen thong?
- Nen tu dong hoa tac vu nao dau tien?
- Nhung chi so nao dung de chung minh SDN dem lai gia tri?

## 20. Chuan Bi Cho Lab Ngay 1

Lab ngay 1 nen dung Mininet va Open vSwitch de hoc vien thay duoc:

- Host gui traffic qua switch ao.
- Switch co flow table.
- Controller co the tac dong den forwarding.
- Khi controller mat ket noi, hanh vi mang phu thuoc vao flow da ton tai va cau hinh switch.

Cong cu:

- Ubuntu VM hoac lab image co san.
- Mininet.
- Open vSwitch.
- Python 3.
- Wireshark tuy chon.

Lenh minh hoa se duoc dua trong tai lieu lab rieng.

## 21. Tai Lieu Tham Khao

- Cisco, Software-Defined Networking overview: https://www.cisco.com/c/en/us/solutions/software-defined-networking/overview.html
- Cisco, Application Centric Infrastructure solution overview: https://www.cisco.com/c/en/us/solutions/collateral/data-center-virtualization/application-centric-infrastructure/solution-overview-c22-741487.html
- Cisco, Catalyst Center: https://www.cisco.com/site/us/en/products/networking/catalyst-center/index.html
- Cisco, Software-Defined Access: https://www.cisco.com/site/us/en/solutions/networking/sdaccess/index.html
- Cisco, Catalyst SD-WAN: https://www.cisco.com/site/us/en/solutions/networking/sdwan/catalyst/index.html
- Open Networking Foundation, SDN resources: https://opennetworking.org/
- Open vSwitch documentation: https://docs.openvswitch.org/
- Mininet documentation: http://mininet.org/

