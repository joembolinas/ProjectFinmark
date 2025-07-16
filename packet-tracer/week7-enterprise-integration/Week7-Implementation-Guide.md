# Week 7: Enterprise Topology Integration - Cisco Packet Tracer Implementation

## FinMark Corporation Enterprise Network Expansion

**Objective**: Expand 8-device foundation to 20+ device enterprise topology with advanced VLAN structure and security zones
**Duration**: 2 days
**Success Criteria**: 20+ devices, 5 VLANs, 7 security zones, enterprise-grade performance

---

## 🎯 **Week 7 Goals**

- Expand to 20+ device enterprise topology
- Implement comprehensive 5-VLAN structure
- Create 7-tier security zone architecture
- Add DMZ and server infrastructure
- Validate enterprise-level performance and isolation

---

## 🚀 **Starting Point: Week 6 Foundation**

**Prerequisites:**

- Week 6 foundation topology completed
- Open `FinMark-Week6-Foundation.pkt` file
- All Week 6 configurations validated and working

---

## 🛠️ **Enterprise Topology Expansion**

### **Step 1: Save New Version and Workspace Preparation**

1. **Save New Version**

   - Click **File** in the top menu bar
   - Select **Save As** from the dropdown menu
   - Name: `FinMark-Week7-Enterprise.pkt`
   - Navigate to: `packet-tracer/week7-enterprise-integration/` folder
   - Click **Save** button
2. **Verify Week 6 Foundation**

   - Ensure all 8 devices from Week 6 are present and connected
   - Check that all device lights are **green** (indicating ready state)
   - Verify VLAN configuration is working from Week 6
3. **Workspace Preparation**

   - Click **View** menu → **Zoom** → **Fit in Window** to see full topology
   - Enable **Grid** if not visible: **View** → **Grid**
   - Set workspace to **Logical** view (default button in bottom left)

### **Step 2: Detailed Device Placement and Configuration**

#### **Core Infrastructure Expansion**

**Add Secondary Core Switch (High Availability):**

1. **Access Device Selection**

   - Click on **Network Devices** icon in the bottom device toolbar
   - Click on **Switches** sub-category
   - Look for **2960-24TT** or **3560-24PS** (use best available option)
2. **Place Secondary Core Switch**

   - Click on the chosen switch model
   - Move mouse to position **Grid: G5** (right of original core switch)
   - Click to place the device
   - **Right-click** on the device → Select **Set Hostname**
   - Type: `Core-Switch-L3-Secondary`
   - Press **Enter** to confirm
3. **Purpose Verification**

   - This switch provides: High availability, load distribution, redundancy
   - Will be configured with EtherChannel for redundant core connectivity

**Add Distribution Layer Router:**

1. **Access Router Selection**

   - Click on **Network Devices** icon in bottom toolbar
   - Click on **Routers** sub-category
   - Select **2811** or **2821** (newest available model)
2. **Place Distribution Router**

   - Click on the chosen router model
   - Position at **Grid: F4** (above core switches, between them)
   - Click to place device
   - **Right-click** → **Set Hostname**
   - Type: `Distribution-Router`
   - Press **Enter**
3. **Router Purpose**

   - Inter-VLAN routing with sub-interfaces
   - Advanced routing protocols (OSPF)
   - Security zone enforcement through ACLs

#### **DMZ Infrastructure Setup**

**Add DMZ Switch:**

1. **Access Switch Selection**

   - Click **Network Devices** → **Switches**
   - Select **2960-24TT** (recommended for DMZ)
2. **Place DMZ Switch**

   - Position at **Grid: I2** (upper right area)
   - Click to place device
   - **Right-click** → **Set Hostname** → Type: `SW-DMZ-External`
   - Press **Enter** to confirm
3. **DMZ Switch Purpose**

   - Isolates external-facing services
   - Provides controlled access to web and mail servers
   - Implements additional security through port security

**Add Web Server Farm (4 Servers):**

**Web-Server-01 Setup:**

1. **Access Server Selection**

   - Click **End Devices** icon in bottom toolbar
   - Click **End Devices** sub-category
   - Select **Server-PT** model
2. **Place Web-Server-01**

   - Position at **Grid: I3** (below DMZ switch)
   - Click to place server
   - **Right-click** → **Set Hostname** → Type: `Web-Server-01`
   - Press **Enter**

**Web-Server-02 Setup:**

1. **Place Second Web Server**
   - Select **Server-PT** again from **End Devices**
   - Position at **Grid: I4** (below Web-Server-01)
   - **Right-click** → **Set Hostname** → Type: `Web-Server-02`
   - Press **Enter**

**Database-Server-01 Setup:**

1. **Place Database Server**
   - Select **Server-PT** from **End Devices**
   - Position at **Grid: H4** (left of web servers)
   - **Right-click** → **Set Hostname** → Type: `Database-Server-01`
   - Press **Enter**

**Mail-Server-01 Setup:**

1. **Place Mail Server**
   - Select **Server-PT** from **End Devices**
   - Position at **Grid: H3** (above database server)
   - **Right-click** → **Set Hostname** → Type: `Mail-Server-01`
   - Press **Enter**

#### **Departmental Expansion - Detailed Setup**

**Finance Department Expansion:**

1. **Add Secondary Finance Switch**

   - Click **Network Devices** → **Switches**
   - Select **2950-24** or **2960-24TT**
   - Position at **Grid: A4** (below original finance switch)
   - **Right-click** → **Set Hostname** → Type: `SW-Finance-Secondary`
2. **Add Finance Department PCs**

   **PC-Finance-02:**

   - Click **End Devices** → **End Devices** → **PC-PT**
   - Position at **Grid: A5**
   - **Right-click** → **Set Hostname** → Type: `PC-Finance-02`

   **PC-Finance-03:**

   - Select **PC-PT** again
   - Position at **Grid: A6**
   - **Right-click** → **Set Hostname** → Type: `PC-Finance-03`

   **Laptop-Finance-Manager:**

   - Click **End Devices** → **End Devices** → **Laptop-PT**
   - Position at **Grid: B5**
   - **Right-click** → **Set Hostname** → Type: `Laptop-Finance-Manager`

**HR Department Expansion:**

1. **Add HR Department Devices**

   **PC-HR-02:**

   - Click **End Devices** → **PC-PT**
   - Position at **Grid: C5** (near existing HR infrastructure)
   - **Right-click** → **Set Hostname** → Type: `PC-HR-02`

   **PC-HR-03:**

   - Select **PC-PT** again
   - Position at **Grid: C6**
   - **Right-click** → **Set Hostname** → Type: `PC-HR-03`

   **IP-Phone-HR-01:**

   - Click **End Devices** → **End Devices** → Look for **IP Phone** icon
   - Position at **Grid: D5**
   - **Right-click** → **Set Hostname** → Type: `IP-Phone-HR-01`

**Operations Department Expansion:**

1. **Add Operations Devices**

   **PC-Ops-02:**

   - Click **End Devices** → **PC-PT**
   - Position at **Grid: E5**
   - **Right-click** → **Set Hostname** → Type: `PC-Ops-02`

   **PC-Ops-03:**

   - Select **PC-PT** again
   - Position at **Grid: E6**
   - **Right-click** → **Set Hostname** → Type: `PC-Ops-03`

   **Tablet-Ops-Mobile:**

   - Click **End Devices** → Look for **Tablet-PT** icon
   - Position at **Grid: F6**
   - **Right-click** → **Set Hostname** → Type: `Tablet-Ops-Mobile`

**IT Department Expansion:**

1. **Add IT Infrastructure**

   **Backup-Server-01:**

   - Click **End Devices** → **Server-PT**
   - Position at **Grid: H6**
   - **Right-click** → **Set Hostname** → Type: `Backup-Server-01`

   **PC-IT-Admin:**

   - Click **End Devices** → **PC-PT**
   - Position at **Grid: G6**
   - **Right-click** → **Set Hostname** → Type: `PC-IT-Admin`

   **PC-IT-Support:**

   - Select **PC-PT** again
   - Position at **Grid: G7**
   - **Right-click** → **Set Hostname** → Type: `PC-IT-Support`

### **Step 3: Enhanced Physical Connections - Detailed Cable Setup**

#### **Cable Connection Procedure**

**Important**: Always use the **Connection Tool** for all connections:

1. Click the **Connection Tool** (lightning bolt icon) in the left toolbar
2. **Copper Straight-Through** will be auto-selected (default)
3. Click **source device** → Select **appropriate port** → Click **destination device** → Select **matching port**
4. Green link light indicates successful connection

#### **Core Infrastructure Interconnection**

**Core Switch Redundancy Setup:**

1. **Primary to Secondary Core Connection**

   - **Connection 1**:
     - Click **Core-Switch-L3** → Select **GigabitEthernet0/2**
     - Click **Core-Switch-L3-Secondary** → Select **GigabitEthernet0/1**
     - Verify green link lights on both devices
2. **Core to Distribution Router Connections**

   - **Connection 2**:

     - Click **Core-Switch-L3** → Select **FastEthernet0/23**
     - Click **Distribution-Router** → Select **FastEthernet0/0**
     - Wait for green link lights
   - **Connection 3**:

     - Click **Core-Switch-L3-Secondary** → Select **FastEthernet0/23**
     - Click **Distribution-Router** → Select **FastEthernet0/1**
     - Verify connection establishment

**DMZ Infrastructure Connectivity:**

3. **Distribution Router to DMZ Switch**
   - **Connection 4**:
     - Click **Distribution-Router** → Select **FastEthernet0/2**
     - Click **SW-DMZ-External** → Select **FastEthernet0/24**
     - Confirm green link status

#### **Departmental Secondary Connections**

**Finance Secondary Switch Setup:**

4. **Finance Switch Interconnection**

   - **Connection 5**:
     - Click **SW-Finance** (original) → Select **FastEthernet0/23**
     - Click **SW-Finance-Secondary** → Select **FastEthernet0/24**
     - This creates redundant finance network connectivity
5. **Finance Secondary Switch to End Devices**

   - **Connection 6**: **SW-Finance-Secondary FastEthernet0/1** ↔ **PC-Finance-02 FastEthernet0**
   - **Connection 7**: **SW-Finance-Secondary FastEthernet0/2** ↔ **PC-Finance-03 FastEthernet0**
   - **Connection 8**: **SW-Finance-Secondary FastEthernet0/3** ↔ **Laptop-Finance-Manager FastEthernet0**

**HR Department Additional Connections:**

6. **HR Expanded Connectivity**
   - **Connection 9**: **SW-HR FastEthernet0/2** ↔ **PC-HR-02 FastEthernet0**
   - **Connection 10**: **SW-HR FastEthernet0/3** ↔ **PC-HR-03 FastEthernet0**
   - **Connection 11**: **SW-HR FastEthernet0/4** ↔ **IP-Phone-HR-01 FastEthernet0**

**Operations Department Additional Connections:**

7. **Operations Expanded Setup**
   - **Connection 12**: **SW-Operations FastEthernet0/2** ↔ **PC-Ops-02 FastEthernet0**
   - **Connection 13**: **SW-Operations FastEthernet0/3** ↔ **PC-Ops-03 FastEthernet0**
   - **Connection 14**: **SW-Operations FastEthernet0/4** ↔ **Tablet-Ops-Mobile FastEthernet0**

**IT Department Additional Connections:**

8. **IT Infrastructure Expansion**
   - **Connection 15**: **SW-IT-DMZ FastEthernet0/3** ↔ **Backup-Server-01 FastEthernet0**
   - **Connection 16**: **SW-IT-DMZ FastEthernet0/4** ↔ **PC-IT-Admin FastEthernet0**
   - **Connection 17**: **SW-IT-DMZ FastEthernet0/5** ↔ **PC-IT-Support FastEthernet0**

#### **DMZ Server Farm Connections**

**DMZ Server Connectivity Setup:**

9. **DMZ Servers to Switch Connections**
   - **Connection 18**: **SW-DMZ-External FastEthernet0/1** ↔ **Web-Server-01 FastEthernet0**
   - **Connection 19**: **SW-DMZ-External FastEthernet0/2** ↔ **Web-Server-02 FastEthernet0**
   - **Connection 20**: **SW-DMZ-External FastEthernet0/3** ↔ **Database-Server-01 FastEthernet0**
   - **Connection 21**: **SW-DMZ-External FastEthernet0/4** ↔ **Mail-Server-01 FastEthernet0**

**Connection Verification:**

- Check all connections show **green link lights**
- Total connections should be **21** new connections
- If any connection shows **red**, re-check port selections and cable types

### **Step 4: Enhanced VLAN Configuration - Detailed CLI Setup**

#### **Distribution Router VLAN Configuration**

**Access Distribution Router:**

1. **Click on Distribution-Router device**
2. **Navigate to CLI Tab** (top of device window)
3. **Wait for router to fully boot** (may take 30-60 seconds)
4. **Press Enter** if you see "Press RETURN to get started" message

**Router VLAN Interface Configuration:**

```cisco
! Access Distribution-Router CLI
enable
configure terminal
hostname Distribution-Router

! Create VLAN sub-interfaces for inter-VLAN routing
! VLAN 10 - Finance Department
interface fastethernet0/0.10
 encapsulation dot1Q 10
 ip address 10.0.10.254 255.255.255.0
 description Finance-Department-Gateway
 no shutdown
 exit

! VLAN 20 - HR Department  
interface fastethernet0/0.20  
 encapsulation dot1Q 20
 ip address 10.0.20.254 255.255.255.0
 description HR-Department-Gateway
 no shutdown
 exit

! VLAN 30 - Operations Department
interface fastethernet0/0.30
 encapsulation dot1Q 30  
 ip address 10.0.30.254 255.255.255.0
 description Operations-Department-Gateway
 no shutdown
 exit

! VLAN 40 - IT/DMZ Department
interface fastethernet0/0.40
 encapsulation dot1Q 40
 ip address 10.0.40.254 255.255.255.0
 description IT-DMZ-Department-Gateway
 no shutdown
 exit

! VLAN 50 - DMZ External Services
interface fastethernet0/0.50
 encapsulation dot1Q 50
 ip address 10.0.50.254 255.255.255.0
 description DMZ-External-Services-Gateway
 no shutdown
 exit

! Enable main trunk interface
interface fastethernet0/0
 description Trunk-to-Core-Switches
 no shutdown
 exit

! Configure DMZ direct connection
interface fastethernet0/2  
 ip address 10.0.50.1 255.255.255.0
 description Direct-DMZ-Connection
 no shutdown
 exit

! Enable IP routing for inter-VLAN communication
ip routing

! Save configuration
copy running-config startup-config
```

**Configuration Verification:**

1. **Type**: `show ip interface brief`
2. **Verify** all interfaces show "up/up" status
3. **Type**: `show ip route` to verify routing table

#### **Core Switch VLAN Updates**

**Update Core-Switch-L3:**

1. **Click on Core-Switch-L3**
2. **Navigate to CLI Tab**
3. **Enter the following commands:**

```cisco
! Access Core-Switch-L3 CLI
enable
configure terminal

! Add new VLAN 50 for DMZ
vlan 50
 name DMZ-External-Services
 exit

! Update trunk ports to include VLAN 50
interface range fastethernet0/1-4
 switchport trunk allowed vlan 10,20,30,40,50
 exit

! Update connection to distribution router
interface fastethernet0/23
 switchport mode trunk
 switchport trunk allowed vlan 10,20,30,40,50
 description Trunk-to-Distribution-Router
 no shutdown
 exit

! Save configuration
copy running-config startup-config
```

**Update Core-Switch-L3-Secondary:**

1. **Click on Core-Switch-L3-Secondary**
2. **Navigate to CLI Tab**
3. **Configure secondary core switch:**

```cisco
enable
configure terminal
hostname Core-Switch-L3-Secondary

! Create all VLANs to match primary switch
vlan 10
 name Finance-Department
 exit
vlan 20
 name HR-Department
 exit
vlan 30
 name Operations-Department
 exit
vlan 40
 name IT-DMZ-Department
 exit
vlan 50
 name DMZ-External-Services
 exit

! Configure trunk to distribution router
interface fastethernet0/23
 switchport mode trunk
 switchport trunk allowed vlan 10,20,30,40,50
 description Secondary-Trunk-to-Distribution-Router
 no shutdown
 exit

! Configure trunk to primary core switch
interface gigabitethernet0/1
 switchport mode trunk
 switchport trunk allowed vlan 10,20,30,40,50
 description Inter-Core-Switch-Trunk
 no shutdown
 exit

! Enable IP routing
ip routing

copy running-config startup-config
```

#### **DMZ Switch Configuration - Detailed Setup**

**Configure SW-DMZ-External:**

1. **Click on SW-DMZ-External device**
2. **Navigate to CLI Tab**
3. **Wait for switch to boot completely**
4. **Enter the following configuration:**

```cisco
enable
configure terminal
hostname SW-DMZ-External

! Create DMZ VLAN
vlan 50
 name DMZ-External-Services
 exit

! Configure access ports for servers with security
interface fastethernet0/1
 switchport mode access
 switchport access vlan 50
 switchport port-security
 switchport port-security maximum 1
 switchport port-security mac-address sticky
 switchport port-security violation restrict
 description Web-Server-01
 no shutdown
 exit

interface fastethernet0/2
 switchport mode access
 switchport access vlan 50
 switchport port-security
 switchport port-security maximum 1
 switchport port-security mac-address sticky
 switchport port-security violation restrict
 description Web-Server-02
 no shutdown
 exit

interface fastethernet0/3
 switchport mode access
 switchport access vlan 50
 switchport port-security
 switchport port-security maximum 1
 switchport port-security mac-address sticky
 switchport port-security violation restrict
 description Database-Server-01
 no shutdown
 exit

interface fastethernet0/4
 switchport mode access
 switchport access vlan 50
 switchport port-security
 switchport port-security maximum 1
 switchport port-security mac-address sticky
 switchport port-security violation restrict
 description Mail-Server-01
 no shutdown
 exit

! Configure connection to distribution router
interface fastethernet0/24
 switchport mode access
 switchport access vlan 50
 description Connection-to-Distribution-Router
 no shutdown
 exit

copy running-config startup-config
```

#### **Secondary Switch Configuration - Finance Department**

**Configure SW-Finance-Secondary:**

1. **Click on SW-Finance-Secondary device**
2. **Navigate to CLI Tab**
3. **Configure the switch:**

```cisco
enable  
configure terminal
hostname SW-Finance-Secondary

! Configure access ports for end devices
interface fastethernet0/1
 switchport mode access
 switchport access vlan 10
 switchport port-security
 switchport port-security maximum 1
 switchport port-security mac-address sticky
 description PC-Finance-02
 no shutdown
 exit

interface fastethernet0/2
 switchport mode access
 switchport access vlan 10
 switchport port-security
 switchport port-security maximum 1
 switchport port-security mac-address sticky
 description PC-Finance-03
 no shutdown
 exit

interface fastethernet0/3
 switchport mode access
 switchport access vlan 10
 switchport port-security
 switchport port-security maximum 1
 switchport port-security mac-address sticky
 description Laptop-Finance-Manager
 no shutdown
 exit

! Configure trunk to primary finance switch
interface fastethernet0/24
 switchport mode trunk
 switchport trunk allowed vlan 10
 description Trunk-to-SW-Finance
 no shutdown
 exit

end
copy running-config startup-config
```

#### **Update Existing Access Switches**

**Update SW-HR for additional devices:**

1. **Click on SW-HR device**
2. **Navigate to CLI Tab**
3. **Add configurations for new devices:**

```cisco
enable
configure terminal

! Configure additional ports for HR expansion
interface fastethernet0/2
 switchport mode access
 switchport access vlan 20
 switchport port-security
 switchport port-security maximum 1
 description PC-HR-02
 no shutdown
 exit

interface fastethernet0/3
 switchport mode access
 switchport access vlan 20
 switchport port-security
 switchport port-security maximum 1
 description PC-HR-03
 no shutdown
 exit

interface fastethernet0/4
 switchport mode access
 switchport access vlan 20
 switchport port-security
 switchport port-security maximum 1
 description IP-Phone-HR-01
 no shutdown
 exit

end
copy running-config startup-config
```

**Update SW-Operations for additional devices:**

1. **Click on SW-Operations device**
2. **Navigate to CLI Tab**
3. **Configure additional ports:**

```cisco
enable
configure terminal

! Configure additional ports for Operations expansion
interface fastethernet0/2
 switchport mode access
 switchport access vlan 30
 switchport port-security
 switchport port-security maximum 1
 description PC-Ops-02
 no shutdown
 exit

interface fastethernet0/3
 switchport mode access
 switchport access vlan 30
 switchport port-security
 switchport port-security maximum 1
 description PC-Ops-03
 no shutdown
 exit

interface fastethernet0/4
 switchport mode access
 switchport access vlan 30
 switchport port-security
 switchport port-security maximum 1
 description Tablet-Ops-Mobile
 no shutdown
 exit

end
copy running-config startup-config
```

**Update SW-IT-DMZ for additional devices:**

1. **Click on SW-IT-DMZ device**
2. **Navigate to CLI Tab**
3. **Configure additional IT infrastructure:**

```cisco
enable
configure terminal

! Configure additional ports for IT expansion
interface fastethernet0/3
 switchport mode access
 switchport access vlan 40
 switchport port-security
 switchport port-security maximum 1
 description Backup-Server-01
 no shutdown
 exit

interface fastethernet0/4
 switchport mode access
 switchport access vlan 40
 switchport port-security
 switchport port-security maximum 1
 description PC-IT-Admin
 no shutdown
 exit

interface fastethernet0/5
 switchport mode access
 switchport access vlan 40
 switchport port-security
 switchport port-security maximum 1
 description PC-IT-Support
 no shutdown
 exit

copy running-config startup-config
```

### **Step 5: Security Zones Implementation - Detailed Configuration**

#### **7-Tier Security Architecture with Enhanced Control**

**Zone Definition and Implementation Process:**

#### **Zone 1: Executive Zone (Finance Management) - Ultra High Security**

**On Distribution Router RT-Distribution-01:**

1. **Click on Distribution-Router device**
2. **Navigate to CLI Tab**
3. **Configure Executive zone with maximum security:**

```cisco
configure terminal

! Create Executive Management Access Control List
ip access-list extended ZONE-EXECUTIVE-IN
 remark *** EXECUTIVE LEVEL ACCESS - ULTRA HIGH SECURITY ***
 permit tcp 10.0.10.240 0.0.0.15 any eq 80
 permit tcp 10.0.10.240 0.0.0.15 any eq 443
 permit tcp 10.0.10.240 0.0.0.15 10.0.40.200 0.0.0.15 eq 22
 permit tcp 10.0.10.240 0.0.0.15 10.0.40.200 0.0.0.15 eq 3389
 permit udp 10.0.10.240 0.0.0.15 any eq 53
 permit icmp 10.0.10.240 0.0.0.15 10.0.40.200 0.0.0.15
 deny ip any any log
 exit

ip access-list extended ZONE-EXECUTIVE-OUT
 remark *** EXECUTIVE OUTGOING TRAFFIC ***
 permit tcp any 10.0.10.240 0.0.0.15 established
 permit tcp 10.0.40.200 0.0.0.15 10.0.10.240 0.0.0.15 eq 22
 permit tcp 10.0.40.200 0.0.0.15 10.0.10.240 0.0.0.15 eq 3389
 permit udp any 10.0.10.240 0.0.0.15 eq 53
 permit icmp 10.0.40.200 0.0.0.15 10.0.10.240 0.0.0.15
 deny ip any any log
 exit
```

#### **Zone 2: Financial Operations Zone - High Security**

**Continue on Distribution Router:**

```cisco
! Create Financial Operations Access Control List
ip access-list extended ZONE-FINANCIAL-IN
 remark *** FINANCIAL OPERATIONS - HIGH SECURITY ***
 permit tcp 10.0.10.0 0.0.0.239 any eq 80
 permit tcp 10.0.10.0 0.0.0.239 any eq 443
 permit tcp 10.0.10.0 0.0.0.239 10.0.40.0 0.0.0.255 eq 22
 permit tcp 10.0.10.0 0.0.0.239 10.0.40.0 0.0.0.255 eq 3389
 permit tcp 10.0.10.0 0.0.0.239 10.0.50.100 0.0.0.3 eq 1433
 permit tcp 10.0.10.0 0.0.0.239 10.0.50.100 0.0.0.3 eq 3306
 permit udp 10.0.10.0 0.0.0.239 any eq 53
 permit icmp 10.0.10.0 0.0.0.239 10.0.40.0 0.0.0.255
 deny ip any any log
 exit

ip access-list extended ZONE-FINANCIAL-OUT
 remark *** FINANCIAL OUTGOING TRAFFIC ***
 permit tcp any 10.0.10.0 0.0.0.239 established
 permit tcp 10.0.40.0 0.0.0.255 10.0.10.0 0.0.0.239 eq 22
 permit tcp 10.0.40.0 0.0.0.255 10.0.10.0 0.0.0.239 eq 3389
 permit tcp 10.0.50.100 0.0.0.3 10.0.10.0 0.0.0.239 eq 1433
 permit tcp 10.0.50.100 0.0.0.3 10.0.10.0 0.0.0.239 eq 3306
 permit udp any 10.0.10.0 0.0.0.239 eq 53
 permit icmp 10.0.40.0 0.0.0.255 10.0.10.0 0.0.0.239
 deny ip any any log
 exit
```

#### **Zone 3: Human Resources Zone - Medium-High Security**

**Continue on Distribution Router:**

```cisco
! Create Human Resources Access Control List
ip access-list extended ZONE-HR-IN
 remark *** HUMAN RESOURCES - MEDIUM-HIGH SECURITY ***
 permit tcp 10.0.20.0 0.0.0.255 any eq 80
 permit tcp 10.0.20.0 0.0.0.255 any eq 443
 permit tcp 10.0.20.0 0.0.0.255 10.0.40.100 0.0.0.3 eq 22
 permit tcp 10.0.20.0 0.0.0.255 10.0.50.10 0.0.0.3 eq 25
 permit tcp 10.0.20.0 0.0.0.255 10.0.50.10 0.0.0.3 eq 993
 permit udp 10.0.20.0 0.0.0.255 any eq 53
 permit icmp 10.0.20.0 0.0.0.255 10.0.40.100 0.0.0.3
 deny ip 10.0.20.0 0.0.0.255 10.0.10.0 0.0.0.255 log
 deny ip 10.0.20.0 0.0.0.255 10.0.30.0 0.0.0.255 log
 deny ip any any log
 exit

ip access-list extended ZONE-HR-OUT
 remark *** HR OUTGOING TRAFFIC ***
 permit tcp any 10.0.20.0 0.0.0.255 established
 permit tcp 10.0.40.100 0.0.0.3 10.0.20.0 0.0.0.255 eq 22
 permit tcp 10.0.50.10 0.0.0.3 10.0.20.0 0.0.0.255 eq 25
 permit tcp 10.0.50.10 0.0.0.3 10.0.20.0 0.0.0.255 eq 993
 permit udp any 10.0.20.0 0.0.0.255 eq 53
 permit icmp 10.0.40.100 0.0.0.3 10.0.20.0 0.0.0.255
 deny ip any any log
 exit
```

#### **Zone 4: Operations Zone - Medium Security**

**Continue on Distribution Router:**

```cisco
! Create Operations Access Control List  
ip access-list extended ZONE-OPERATIONS-IN
 remark *** OPERATIONS DEPARTMENT - MEDIUM SECURITY ***
 permit tcp 10.0.30.0 0.0.0.255 any eq 80
 permit tcp 10.0.30.0 0.0.0.255 any eq 443
 permit tcp 10.0.30.0 0.0.0.255 10.0.40.0 0.0.0.255 eq 22
 permit tcp 10.0.30.0 0.0.0.255 10.0.50.0 0.0.0.255 eq 80
 permit tcp 10.0.30.0 0.0.0.255 10.0.50.0 0.0.0.255 eq 443
 permit udp 10.0.30.0 0.0.0.255 any eq 53
 permit icmp 10.0.30.0 0.0.0.255 10.0.40.0 0.0.0.255
 deny ip 10.0.30.0 0.0.0.255 10.0.10.0 0.0.0.255 log
 deny ip 10.0.30.0 0.0.0.255 10.0.20.0 0.0.0.255 log
 deny ip any any log
 exit

ip access-list extended ZONE-OPERATIONS-OUT
 remark *** OPERATIONS OUTGOING TRAFFIC ***
 permit tcp any 10.0.30.0 0.0.0.255 established
 permit tcp 10.0.40.0 0.0.0.255 10.0.30.0 0.0.0.255 eq 22
 permit tcp 10.0.50.0 0.0.0.255 10.0.30.0 0.0.0.255 eq 80
 permit tcp 10.0.50.0 0.0.0.255 10.0.30.0 0.0.0.255 eq 443
 permit udp any 10.0.30.0 0.0.0.255 eq 53
 permit icmp 10.0.40.0 0.0.0.255 10.0.30.0 0.0.0.255
 deny ip any any log
 exit
```

#### **Zone 5: IT Administration Zone - Variable Security**

**Continue on Distribution Router:**

```cisco
! Create IT Administration Access Control List
ip access-list extended ZONE-IT-ADMIN-IN
 remark *** IT ADMINISTRATION - VARIABLE SECURITY ***
 permit ip 10.0.40.0 0.0.0.255 any
 exit

ip access-list extended ZONE-IT-ADMIN-OUT
 remark *** IT ADMIN OUTGOING TRAFFIC ***
 permit ip any 10.0.40.0 0.0.0.255
 exit
```

#### **Zone 6: DMZ Services Zone - Controlled External Access**

**Continue on Distribution Router:**

```cisco
! Create DMZ Services Access Control List
ip access-list extended ZONE-DMZ-IN
 remark *** DMZ SERVICES - CONTROLLED EXTERNAL ACCESS ***
 permit tcp any 10.0.50.0 0.0.0.255 eq 80
 permit tcp any 10.0.50.0 0.0.0.255 eq 443
 permit tcp any 10.0.50.0 0.0.0.255 eq 25
 permit tcp any 10.0.50.0 0.0.0.255 eq 993
 permit tcp 10.0.40.0 0.0.0.255 10.0.50.0 0.0.0.255 eq 22
 permit tcp 10.0.40.0 0.0.0.255 10.0.50.0 0.0.0.255 eq 3389
 permit udp 10.0.40.0 0.0.0.255 10.0.50.0 0.0.0.255 eq 53
 permit icmp 10.0.40.0 0.0.0.255 10.0.50.0 0.0.0.255
 deny ip any 10.0.50.0 0.0.0.255 log
 exit

ip access-list extended ZONE-DMZ-OUT
 remark *** DMZ OUTGOING TRAFFIC ***
 permit tcp 10.0.50.0 0.0.0.255 any eq 80
 permit tcp 10.0.50.0 0.0.0.255 any eq 443
 permit tcp 10.0.50.0 0.0.0.255 any eq 25
 permit tcp 10.0.50.0 0.0.0.255 10.0.40.0 0.0.0.255 eq 22
 permit tcp 10.0.50.0 0.0.0.255 10.0.40.0 0.0.0.255 eq 3389
 permit udp 10.0.50.0 0.0.0.255 any eq 53
 permit icmp 10.0.50.0 0.0.0.255 10.0.40.0 0.0.0.255
 deny ip any any log
 exit
```

#### **Zone 7: Management Network Zone - Ultra High Security**

**Continue on Distribution Router:**

```cisco
! Create Management Network Access Control List
ip access-list extended ZONE-MANAGEMENT-IN
 remark *** MANAGEMENT NETWORK - ULTRA HIGH SECURITY ***
 permit ip 10.0.40.200 0.0.0.15 any
 deny ip any any log
 exit

ip access-list extended ZONE-MANAGEMENT-OUT
 remark *** MANAGEMENT OUTGOING TRAFFIC ***
 permit ip any 10.0.40.200 0.0.0.15
 deny ip any any log
 exit
```

#### **Apply Security Zones to Interfaces**

**Continue on Distribution Router:**

```cisco
! Apply ACLs to VLAN interfaces
interface fastethernet0/0.10
 ip access-group ZONE-FINANCIAL-IN in
 ip access-group ZONE-FINANCIAL-OUT out
 exit

interface fastethernet0/0.20
 ip access-group ZONE-HR-IN in
 ip access-group ZONE-HR-OUT out
 exit

interface fastethernet0/0.30
 ip access-group ZONE-OPERATIONS-IN in
 ip access-group ZONE-OPERATIONS-OUT out
 exit

interface fastethernet0/0.40
 ip access-group ZONE-IT-ADMIN-IN in
 ip access-group ZONE-IT-ADMIN-OUT out
 exit

interface fastethernet0/2
 ip access-group ZONE-DMZ-IN in
 ip access-group ZONE-DMZ-OUT out
 exit
end
copy running-config startup-config
```

# **// TODO
**

#### **Enhanced Switch Security Configuration**

**Configure Core Switch SW-Core-01 with security features:**

1. **Click on SW-Core-01 device**
2. **Navigate to CLI Tab**
3. **Configure advanced security:**

```cisco
enable
configure terminal

! Enable port security globally
ip dhcp snooping
ip dhcp snooping vlan 10,20,30,40,50

! Configure trusted DHCP interfaces
interface fastethernet0/1
 ip dhcp snooping trust
 description Trusted-to-Distribution-Router
 exit

interface fastethernet0/2
 ip dhcp snooping trust
 description Trusted-to-Core-Switch-02
 exit

! Configure port security on access layer connections
interface range fastethernet0/3-24
 switchport port-security
 switchport port-security maximum 1
 switchport port-security mac-address sticky
 switchport port-security violation restrict
 exit

! Enable spanning tree security
spanning-tree portfast bpduguard default
spanning-tree portfast edge default

end
copy running-config startup-config
```

**Configure Core Switch SW-Core-02 with identical security:**

1. **Click on SW-Core-02 device**
2. **Navigate to CLI Tab**
3. **Configure matching security features:**

```cisco
enable
configure terminal

! Enable port security globally
ip dhcp snooping
ip dhcp snooping vlan 10,20,30,40,50

! Configure trusted DHCP interfaces
interface fastethernet0/1
 ip dhcp snooping trust
 description Trusted-to-Distribution-Router
 exit

interface fastethernet0/2
 ip dhcp snooping trust
 description Trusted-to-Core-Switch-01
 exit

! Configure port security on access layer connections
interface range fastethernet0/3-24
 switchport port-security
 switchport port-security maximum 1
 switchport port-security mac-address sticky
 switchport port-security violation restrict
 exit

! Enable spanning tree security
spanning-tree portfast bpduguard default
spanning-tree portfast edge default

copy running-config startup-config
```

### **Step 6: Enhanced IP Addressing - Detailed Device Configuration**

#### **DMZ Server IP Configuration - GUI Method**

**Configure Web-Server-01:**

1. **Click on Web-Server-01 device**
2. **Navigate to Desktop Tab**
3. **Click on IP Configuration**
4. **Enter the following settings:**
   - **IP Address**: `10.0.50.10`
   - **Subnet Mask**: `255.255.255.0`
   - **Default Gateway**: `10.0.50.1`
   - **DNS Server**: `8.8.8.8`
5. **Click Close**

**Configure Web-Server-02:**

1. **Click on Web-Server-02 device**
2. **Navigate to Desktop Tab**
3. **Click on IP Configuration**
4. **Enter the following settings:**
   - **IP Address**: `10.0.50.11`
   - **Subnet Mask**: `255.255.255.0`
   - **Default Gateway**: `10.0.50.1`
   - **DNS Server**: `8.8.8.8`
5. **Click Close**

**Configure Database-Server-01:**

1. **Click on Database-Server-01 device**
2. **Navigate to Desktop Tab**
3. **Click on IP Configuration**
4. **Enter the following settings:**
   - **IP Address**: `10.0.50.100`
   - **Subnet Mask**: `255.255.255.0`
   - **Default Gateway**: `10.0.50.1`
   - **DNS Server**: `8.8.8.8`
5. **Click Close**

**Configure Mail-Server-01:**

1. **Click on Mail-Server-01 device**
2. **Navigate to Desktop Tab**
3. **Click on IP Configuration**
4. **Enter the following settings:**
   - **IP Address**: `10.0.50.25`
   - **Subnet Mask**: `255.255.255.0`
   - **Default Gateway**: `10.0.50.1`
   - **DNS Server**: `8.8.8.8`
5. **Click Close**

#### **Additional End Device Configuration - Detailed Setup**

**Finance Department Additional Device Configuration:**

**Configure PC-Finance-02:**

1. **Click on PC-Finance-02 device**
2. **Navigate to Desktop Tab**
3. **Click on IP Configuration**
4. **Enter settings:**
   - **IP Address**: `10.0.10.11`
   - **Subnet Mask**: `255.255.255.0`
   - **Default Gateway**: `10.0.10.254`
   - **DNS Server**: `8.8.8.8`
5. **Click Close**

**Configure PC-Finance-03:**

1. **Click on PC-Finance-03 device**
2. **Navigate to Desktop Tab**
3. **Click on IP Configuration**
4. **Enter settings:**
   - **IP Address**: `10.0.10.12`
   - **Subnet Mask**: `255.255.255.0`
   - **Default Gateway**: `10.0.10.254`
   - **DNS Server**: `8.8.8.8`
5. **Click Close**

**Configure Laptop-Finance-Manager:**

1. **Click on Laptop-Finance-Manager device**
2. **Navigate to Desktop Tab**
3. **Click on IP Configuration**
4. **Enter settings:**
   - **IP Address**: `10.0.10.250`
   - **Subnet Mask**: `255.255.255.0`
   - **Default Gateway**: `10.0.10.254`
   - **DNS Server**: `8.8.8.8`
5. **Click Close**

**HR Department Additional Device Configuration:**

**Configure PC-HR-02:**

1. **Click on PC-HR-02 device**
2. **Navigate to Desktop Tab**
3. **Click on IP Configuration**
4. **Enter settings:**
   - **IP Address**: `10.0.20.11`
   - **Subnet Mask**: `255.255.255.0`
   - **Default Gateway**: `10.0.20.254`
   - **DNS Server**: `8.8.8.8`
5. **Click Close**

**Configure PC-HR-03:**

1. **Click on PC-HR-03 device**
2. **Navigate to Desktop Tab**
3. **Click on IP Configuration**
4. **Enter settings:**
   - **IP Address**: `10.0.20.12`
   - **Subnet Mask**: `255.255.255.0`
   - **Default Gateway**: `10.0.20.254`
   - **DNS Server**: `8.8.8.8`
5. **Click Close**

**Configure IP-Phone-HR-01:**

1. **Click on IP-Phone-HR-01 device**
2. **Navigate to Config Tab**
3. **Click on FastEthernet0 under Interface**
4. **Enter settings:**
   - **IP Address**: `10.0.20.100`
   - **Subnet Mask**: `255.255.255.0`
   - **Default Gateway**: `10.0.20.254`
5. **Check Port Status is On**

**Operations Department Additional Device Configuration:**

**Configure PC-Ops-02:**

1. **Click on PC-Ops-02 device**
2. **Navigate to Desktop Tab**
3. **Click on IP Configuration**
4. **Enter settings:**
   - **IP Address**: `10.0.30.11`
   - **Subnet Mask**: `255.255.255.0`
   - **Default Gateway**: `10.0.30.254`
   - **DNS Server**: `8.8.8.8`
5. **Click Close**

**Configure PC-Ops-03:**

1. **Click on PC-Ops-03 device**
2. **Navigate to Desktop Tab**
3. **Click on IP Configuration**
4. **Enter settings:**
   - **IP Address**: `10.0.30.12`
   - **Subnet Mask**: `255.255.255.0`
   - **Default Gateway**: `10.0.30.254`
   - **DNS Server**: `8.8.8.8`
5. **Click Close**

**Configure Tablet-Ops-Mobile:**

1. **Click on Tablet-Ops-Mobile device**
2. **Navigate to Desktop Tab**
3. **Click on IP Configuration**
4. **Enter settings:**
   - **IP Address**: `10.0.30.50`
   - **Subnet Mask**: `255.255.255.0`
   - **Default Gateway**: `10.0.30.254`
   - **DNS Server**: `8.8.8.8`
5. **Click Close**

**IT Department Additional Device Configuration:**

**Configure Backup-Server-01:**

1. **Click on Backup-Server-01 device**
2. **Navigate to Desktop Tab**
3. **Click on IP Configuration**
4. **Enter settings:**
   - **IP Address**: `10.0.40.50`
   - **Subnet Mask**: `255.255.255.0`
   - **Default Gateway**: `10.0.40.254`
   - **DNS Server**: `8.8.8.8`
5. **Click Close**

**Configure PC-IT-Admin:**

1. **Click on PC-IT-Admin device**
2. **Navigate to Desktop Tab**
3. **Click on IP Configuration**
4. **Enter settings:**
   - **IP Address**: `10.0.40.200`
   - **Subnet Mask**: `255.255.255.0`
   - **Default Gateway**: `10.0.40.254`
   - **DNS Server**: `8.8.8.8`
5. **Click Close**

**Configure PC-IT-Support:**

1. **Click on PC-IT-Support device**
2. **Navigate to Desktop Tab**
3. **Click on IP Configuration**
4. **Enter settings:**
   - **IP Address**: `10.0.40.201`
   - **Subnet Mask**: `255.255.255.0`
   - **Default Gateway**: `10.0.40.254`
   - **DNS Server**: `8.8.8.8`
5. **Click Close**

#### **IP Address Summary Table**

| Device                 | IP Address  | Subnet Mask   | Default Gateway | VLAN | Department |
| ---------------------- | ----------- | ------------- | --------------- | ---- | ---------- |
| PC-Finance-01          | 10.0.10.10  | 255.255.255.0 | 10.0.10.254     | 10   | Finance    |
| PC-Finance-02          | 10.0.10.11  | 255.255.255.0 | 10.0.10.254     | 10   | Finance    |
| PC-Finance-03          | 10.0.10.12  | 255.255.255.0 | 10.0.10.254     | 10   | Finance    |
| Laptop-Finance-Manager | 10.0.10.250 | 255.255.255.0 | 10.0.10.254     | 10   | Finance    |
| PC-HR-01               | 10.0.20.10  | 255.255.255.0 | 10.0.20.254     | 20   | HR         |
| PC-HR-02               | 10.0.20.11  | 255.255.255.0 | 10.0.20.254     | 20   | HR         |
| PC-HR-03               | 10.0.20.12  | 255.255.255.0 | 10.0.20.254     | 20   | HR         |
| IP-Phone-HR-01         | 10.0.20.100 | 255.255.255.0 | 10.0.20.254     | 20   | HR         |
| PC-Operations-01       | 10.0.30.10  | 255.255.255.0 | 10.0.30.254     | 30   | Operations |
| PC-Ops-02              | 10.0.30.11  | 255.255.255.0 | 10.0.30.254     | 30   | Operations |
| PC-Ops-03              | 10.0.30.12  | 255.255.255.0 | 10.0.30.254     | 30   | Operations |
| Tablet-Ops-Mobile      | 10.0.30.50  | 255.255.255.0 | 10.0.30.254     | 30   | Operations |
| IT-Server-01           | 10.0.40.10  | 255.255.255.0 | 10.0.40.254     | 40   | IT         |
| Backup-Server-01       | 10.0.40.50  | 255.255.255.0 | 10.0.40.254     | 40   | IT         |
| PC-IT-01               | 10.0.40.100 | 255.255.255.0 | 10.0.40.254     | 40   | IT         |
| PC-IT-Admin            | 10.0.40.200 | 255.255.255.0 | 10.0.40.254     | 40   | IT         |
| PC-IT-Support          | 10.0.40.201 | 255.255.255.0 | 10.0.40.254     | 40   | IT         |
| Web-Server-01          | 10.0.50.10  | 255.255.255.0 | 10.0.50.1       | 50   | DMZ        |
| Web-Server-02          | 10.0.50.11  | 255.255.255.0 | 10.0.50.1       | 50   | DMZ        |
| Mail-Server-01         | 10.0.50.25  | 255.255.255.0 | 10.0.50.1       | 50   | DMZ        |
| Database-Server-01     | 10.0.50.100 | 255.255.255.0 | 10.0.50.1       | 50   | DMZ        |

### **Step 7: Advanced QoS Implementation**

#### **Enterprise QoS Policy Configuration**

**Distribution Router QoS Configuration:**

```cisco
! Access Distribution-Router CLI
enable
configure terminal

! Enable QoS globally
! (Note: Some QoS commands may vary in Packet Tracer)

! Create extended class maps
class-map match-all VOICE-TRAFFIC
 match ip dscp ef
 exit

class-map match-all VIDEO-CONFERENCE
 match ip dscp af41
 exit

class-map match-all FINANCIAL-CRITICAL  
 match access-group name FINANCIAL-PRIORITY
 exit

class-map match-all DATABASE-TRAFFIC
 match ip dscp af31
 exit

class-map match-all WEB-TRAFFIC
 match ip dscp af21
 exit

! Create access list for financial priority traffic
ip access-list extended FINANCIAL-PRIORITY
 permit ip 10.0.10.0 0.0.0.255 10.0.50.100 0.0.0.3
 permit ip 10.0.10.0 0.0.0.255 10.0.40.100 0.0.0.15
 exit

! Create comprehensive policy map
policy-map ENTERPRISE-QOS-POLICY
 class VOICE-TRAFFIC
  priority percent 25
  set ip dscp ef
 class VIDEO-CONFERENCE
  bandwidth percent 20
  set ip dscp af41
 class FINANCIAL-CRITICAL
  bandwidth percent 25  
  set ip dscp af31
 class DATABASE-TRAFFIC
  bandwidth percent 15
  set ip dscp af21
 class WEB-TRAFFIC
  bandwidth percent 10
  set ip dscp af11
 class class-default
  bandwidth percent 5
  fair-queue
 exit

! Apply policy to all VLAN interfaces  
interface fastethernet0/0.10
 service-policy output ENTERPRISE-QOS-POLICY
 exit

interface fastethernet0/0.20
 service-policy output ENTERPRISE-QOS-POLICY
 exit

interface fastethernet0/0.30
 service-policy output ENTERPRISE-QOS-POLICY
 exit

interface fastethernet0/0.40
 service-policy output ENTERPRISE-QOS-POLICY
 exit

interface fastethernet0/2
 service-policy output ENTERPRISE-QOS-POLICY
 exit

copy running-config startup-config
```

### **Step 8: High Availability Configuration**

#### **Core Switch Redundancy**

**Configure EtherChannel between Core Switches:**

**Core-Switch-L3 Configuration:**

```cisco
enable
configure terminal

! Create port channel for redundancy
interface range fastethernet0/21-22
 channel-group 1 mode active
 no shutdown
 exit

interface port-channel1
 switchport mode trunk
 switchport trunk allowed vlan 10,20,30,40,50
 no shutdown
 exit

! Configure HSRP for gateway redundancy (if supported)
interface vlan 10
 standby 10 ip 10.0.10.1
 standby 10 priority 110
 standby 10 preempt
 exit

interface vlan 20
 standby 20 ip 10.0.20.1
 standby 20 priority 110  
 standby 20 preempt
 exit

copy running-config startup-config
```

**Core-Switch-L3-Secondary Configuration:**

```cisco
enable
configure terminal
hostname Core-Switch-L3-Secondary

! Mirror VLAN configuration
vlan 10
 name Finance-Department
 exit
vlan 20
 name HR-Department
 exit
vlan 30
 name Operations-Department
 exit
vlan 40
 name IT-DMZ-Department
 exit
vlan 50
 name DMZ-External
 exit

! Create matching port channel
interface range fastethernet0/21-22
 channel-group 1 mode active
 no shutdown
 exit

interface port-channel1
 switchport mode trunk
 switchport trunk allowed vlan 10,20,30,40,50
 no shutdown
 exit

! Configure HSRP standby
interface vlan 10
 ip address 10.0.10.2 255.255.255.0
 standby 10 ip 10.0.10.1
 standby 10 priority 100
 exit

interface vlan 20
 ip address 10.0.20.2 255.255.255.0
 standby 20 ip 10.0.20.1
 standby 20 priority 100
 exit

ip routing

copy running-config startup-config
```

### **Step 9: Enterprise Testing and Validation**

#### **Comprehensive Connectivity Testing**

**Real-time Mode Testing:**

1. **Inter-VLAN Connectivity Test**

   ```
   From PC-Finance-01:
   ping 10.0.40.100  (Database access - should succeed)
   ping 10.0.20.10   (HR access - should fail per security policy)
   ping 10.0.50.10   (Web server access - should succeed)
   ```

   ```

   ```
2. **Security Zone Validation**

   ```
   From PC-HR-01:
   ping 10.0.10.10   (Finance access - should fail)
   ping 10.0.40.100  (Limited IT access - may succeed)
   ping 10.0.50.25   (Mail server - should succeed)
   ```
3. **DMZ Access Testing**

   ```
   From any internal PC:
   ping 10.0.50.10   (Web server - should succeed)
   telnet 10.0.50.10 80  (HTTP access test)
   ```

#### **Simulation Mode Analysis**

1. **Traffic Flow Analysis**

   - Create PDU from PC-Finance-01 to Database-Server-01
   - Observe routing through Distribution-Router
   - Verify QoS markings applied
2. **Security Policy Testing**

   - Create PDU from PC-HR-01 to PC-Finance-01
   - Verify ACL blocking at Distribution-Router
   - Check for proper logging
3. **Load Balancing Verification**

   - Create multiple PDUs to Web-Server-01 and Web-Server-02
   - Observe distribution patterns

### **Step 10: Performance Metrics Collection**

#### **Simulation Statistics**

**Traffic Generation for Testing:**

1. **Complex PDU Testing**

   - Use **Complex PDU** tool for advanced testing
   - Configure specific protocols (HTTP, HTTPS, FTP)
   - Set traffic patterns for realistic simulation
2. **Packet Capture Analysis**

   - Enable **Event List** in simulation
   - Run comprehensive traffic simulation
   - Export results for analysis

**Expected Performance Metrics:**

- **Packet Processing**: 15,000+ packets
- **Inter-VLAN Latency**: <5ms average
- **Security Policy Effectiveness**: 100% blocking rate
- **QoS Classification**: Proper DSCP marking
- **Redundancy Testing**: <1 second failover

### **Step 11: Documentation and Screenshots**

#### **Required Screenshots for Week 7**

📸 **Capture These Views:**

1. **Enterprise Topology Overview**

   - Full logical view showing all 20+ devices
   - Save as: `week7-enterprise-topology.png`
2. **VLAN Configuration Summary**

   - Distribution router VLAN interface configuration
   - Save as: `week7-vlan-interfaces.png`
3. **Security Zone ACL Configuration**

   - CLI output showing security zone ACLs
   - Save as: `week7-security-zones.png`
4. **QoS Policy Implementation**

   - Policy map configuration on distribution router
   - Save as: `week7-qos-enterprise.png`
5. **DMZ Server Farm**

   - Close-up view of DMZ infrastructure
   - Save as: `week7-dmz-infrastructure.png`
6. **Inter-VLAN Testing Results**

   - Command prompt showing successful/blocked ping tests
   - Save as: `week7-security-testing.png`
7. **Simulation Mode Traffic Flow**

   - Animation showing packet flow through security zones
   - Save as: `week7-traffic-simulation.png`

#### **Configuration Backup and Export**

**Export All Device Configurations:**

1. **Core Infrastructure**

   ```
   show running-config (for each device)
   Copy to: configurations/week7/
   Files: 
   - distribution-router-config.txt
   - core-switch-primary-config.txt
   - core-switch-secondary-config.txt
   - dmz-switch-config.txt
   ```
2. **Access Layer Configurations**

   ```
   Files:
   - sw-finance-config.txt
   - sw-finance-secondary-config.txt
   - sw-hr-config.txt
   - sw-operations-config.txt
   - sw-it-config.txt
   ```

### **Step 12: Enhanced Compliance Documentation**

#### **Security Zone Compliance Mapping**

**Add Compliance Text Boxes:**

📝 **PDPA Compliance (Green Text Boxes):**

- **Zone 1 (Executive)**: Highest protection for senior management data access
- **Zone 2 (Financial)**: Strict data protection for customer financial information
- **Zone 6 (DMZ)**: Controlled external access preventing internal data exposure

📝 **GDPR Compliance (Blue Text Boxes):**

- **Data Subject Rights**: HR zone (Zone 3) configured for privacy request processing
- **Data Minimization**: Each zone only accesses necessary data per business function
- **Breach Notification**: Network segmentation limits breach scope and enables quick identification

📝 **PCI DSS Compliance (Red Text Boxes):**

- **Network Segmentation**: Financial zone (Zone 2) isolated from other environments
- **Access Control**: Dual authentication required for financial system access
- **Monitoring**: All financial transactions logged and monitored through security zones

---

## ✅ **Week 7 Success Criteria Checklist**

- [ ] 20+ device enterprise topology deployed
- [ ] 5 VLANs (10,20,30,40,50) fully configured and operational
- [ ] 7-tier security zone architecture implemented
- [ ] DMZ infrastructure with 4 servers deployed
- [ ] Advanced QoS policies applied across all zones
- [ ] High availability with redundant core switches
- [ ] Security policies tested and validated
- [ ] Inter-VLAN routing working with controlled access
- [ ] Performance metrics meeting enterprise standards
- [ ] Comprehensive documentation and screenshots captured
- [ ] All device configurations backed up
- [ ] Compliance framework enhanced with security zones
- [ ] Packet Tracer file saved as FinMark-Week7-Enterprise.pkt

---

## 🚀 **Week 7 Deliverables**

1. **FinMark-Week7-Enterprise.pkt** - Complete enterprise topology
2. **Enhanced configurations** - All 12+ device configurations
3. **Security documentation** - 7-tier security zone implementation
4. **Performance validation** - Enterprise-level testing results
5. **Compliance mapping** - Enhanced PDPA/GDPR/PCI DSS framework
6. **Visual documentation** - Comprehensive screenshots and diagrams

---

## 📋 **Preparation for Week 8**

Week 8 will focus on security challenge implementation:

- Advanced firewall rule deployment
- Intrusion detection and prevention systems
- Load balancing across server farm
- DDoS protection mechanisms
- Advanced threat simulation and response

**Next**: Continue to Week 8 Implementation Guide for security challenge deployment.

---

*Week 7 enterprise expansion complete. The network now supports 20+ devices with enterprise-grade security zones, advanced QoS, and comprehensive compliance framework ready for Week 8 security challenge implementation.*
