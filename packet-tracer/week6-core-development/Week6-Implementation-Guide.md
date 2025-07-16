# Week 6: Core Network Development - Cisco Packet Tracer Implementation

## FinMark Corporation Network Foundation Setup

**Objective**: Build the foundational 8-device network topology with basic QoS and security framework
**Duration**: 3 days
**Success Criteria**: Basic connectivity, initial VLAN setup, QoS framework implementation

---

## 🎯 **Week 6 Goals**

- Create basic 8-device enterprise topology
- Implement fundamental VLAN structure
- Configure basic QoS framework
- Establish initial security policies
- Validate network connectivity and performance

---

## 🛠️ **Cisco Packet Tracer Setup**

### **Step 1: Launch and Workspace Setup**

1. **Open Cisco Packet Tracer 8.2.2**

   - Click on Cisco Packet Tracer icon
   - Select "Create New" or Ctrl+N
   - Choose "Logical Workspace" view (default)
2. **Workspace Configuration**

   - Navigate to **Options → Preferences**
   - Set **Auto-Save** to 5 minutes
   - Enable **Show Port Labels** for easier identification
   - Set **Grid** to visible for precise device placement

### **Step 2: Device Placement and Topology Creation**

#### **Network Devices Required (Available in PT 8.2.2)**

**From Bottom Toolbar - Network Devices Panel:**

1. **Core Switch** (Distribution Layer)

   - Location: **Network Devices → Switches**
   - Device: **2960-24TT** or `3560-24PS` (if available)
   - Label: `Core-Switch-L3`
   - Position: Center of workspace (Grid: E5)
2. **Access Layer Switches** (4 switches)

   - Device: **2950-24** or **2960-24TT**
   - Labels and Positions:
     - `SW-Finance` (Grid: B3)
     - `SW-HR` (Grid: D3)
     - `SW-Operations` (Grid: F3)
     - `SW-IT-DMZ` (Grid: H3)
3. **Edge Router** (Internet Gateway)

   - Location: **Network Devices → Routers**
   - Device: **2811** or **2821**
   - Label: `Edge-Router`
   - Position: Top center (Grid: E1)
4. **Firewall** (Security Gateway)

   - Location: **Network Devices → Security**
   - Device: **ASA5505** (if available) or use **Router with Security**
   - Label: `Firewall-ASA`
   - Position: Between Edge Router and Core Switch (Grid: E3)

#### **End Devices Required**

**From Bottom Toolbar - End Devices Panel:**

1. **Desktop PCs** (4 units)

   - Location: **End Devices → End Devices**
   - Device: **PC-PT**
   - Labels: `PC-Finance-01`, `PC-HR-01`, `PC-Ops-01`, `PC-IT-01`
   - Position: Under respective switches
2. **Server** (1 unit)

   - Location: **End Devices → End Devices**
   - Device: **Server-PT**
   - Label: `Main-Server-01`
   - Position: Connected to IT switch (Grid: H5)

### **Step 3: Physical Connections**

#### **Cable Types and Connections**

**Use Copper Straight-Through Cables (Automatic Selection):**

1. **Core Connectivity**

   ```
   Edge-Router FastEthernet0/0 ↔ Firewall-ASA Outside
   Firewall-ASA Inside ↔ Core-Switch-L3 GigabitEthernet0/1
   ```
2. **Distribution to Access**

   ```
   Core-Switch-L3 FastEthernet0/1 ↔ SW-Finance FastEthernet0/24
   Core-Switch-L3 FastEthernet0/2 ↔ SW-HR FastEthernet0/24  
   Core-Switch-L3 FastEthernet0/3 ↔ SW-Operations FastEthernet0/24
   Core-Switch-L3 FastEthernet0/4 ↔ SW-IT-DMZ FastEthernet0/24
   ```
3. **End Device Connections**

   ```
   SW-Finance FastEthernet0/1 ↔ PC-Finance-01 FastEthernet0
   SW-HR FastEthernet0/1 ↔ PC-HR-01 FastEthernet0
   SW-Operations FastEthernet0/1 ↔ PC-Ops-01 FastEthernet0  
   SW-IT-DMZ FastEthernet0/1 ↔ PC-IT-01 FastEthernet0
   SW-IT-DMZ FastEthernet0/2 ↔ Main-Server-01 FastEthernet0
   ```

**Connection Procedure:**

1. Click **Connection Tool** (lightning bolt icon)
2. Select **Copper Straight-Through** (auto-selected)
3. Click source device → Select port → Click destination device → Select port
4. Cable appears automatically

### **Step 4: Basic VLAN Configuration**

#### **Core Switch Configuration (Core-Switch-L3)**

**GUI Method:**

1. Click on **Core-Switch-L3**
2. Navigate to **Config Tab**
3. Click **VLAN Database** in left panel

**CLI Method:**

1. Click on **Core-Switch-L3**
2. Navigate to **CLI Tab**
3. Enter commands:

```cisco
! Core Switch VLAN Configuration
enable
configure terminal
hostname Core-Switch-L3

! Create VLANs
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

! Configure trunk ports to access switches
interface fastethernet0/1
 switchport mode trunk
 switchport trunk allowed vlan 10
 no shutdown
 exit

interface fastethernet0/2
 switchport mode trunk  
 switchport trunk allowed vlan 20
 no shutdown
 exit

interface fastethernet0/3
 switchport mode trunk
 switchport trunk allowed vlan 30  
 no shutdown
 exit

interface fastethernet0/4
 switchport mode trunk
 switchport trunk allowed vlan 40
 no shutdown
 exit

! Configure VLAN interfaces for inter-VLAN routing
interface vlan 10
 ip address 10.0.10.1 255.255.255.0
 no shutdown
 exit

interface vlan 20
 ip address 10.0.20.1 255.255.255.0
 no shutdown
 exit

interface vlan 30  
 ip address 10.0.30.1 255.255.255.0
 no shutdown
 exit

interface vlan 40
 ip address 10.0.40.1 255.255.255.0
 no shutdown
 exit

! Enable IP routing
ip routing

! Save configuration
copy running-config startup-config
```

#### **Access Switch Configuration**

**SW-Finance Configuration:**

```cisco
enable
configure terminal
hostname SW-Finance

! Set access port for end device
interface fastethernet0/1
 switchport mode access
 switchport access vlan 10
 no shutdown
 exit

! Set trunk port to core switch
interface fastethernet0/24
 switchport mode trunk
 no shutdown
 exit

copy running-config startup-config
```

**Repeat similar configuration for SW-HR (VLAN 20), SW-Operations (VLAN 30), SW-IT-DMZ (VLAN 40)**

### **Step 5: IP Address Configuration**

#### **End Device IP Configuration**

**PC-Finance-01 Configuration:**

1. Click on **PC-Finance-01**
2. Navigate to **Desktop Tab**
3. Click **IP Configuration**
4. Select **Static** and enter:
   ```
   IP Address: 10.0.10.10
   Subnet Mask: 255.255.255.0
   Default Gateway: 10.0.10.1
   DNS Server: 8.8.8.8
   ```

**PC-HR-01 Configuration:**

```
IP Address: 10.0.20.10
Subnet Mask: 255.255.255.0  
Default Gateway: 10.0.20.1
DNS Server: 8.8.8.8
```

**PC-Ops-01 Configuration:**

```
IP Address: 10.0.30.10
Subnet Mask: 255.255.255.0
Default Gateway: 10.0.30.1  
DNS Server: 8.8.8.8
```

**PC-IT-01 Configuration:**

```
IP Address: 10.0.40.10
Subnet Mask: 255.255.255.0
Default Gateway: 10.0.40.1
DNS Server: 8.8.8.8
```

**Main-Server-01 Configuration:**

```
IP Address: 10.0.40.100
Subnet Mask: 255.255.255.0
Default Gateway: 10.0.40.1
DNS Server: 8.8.8.8
```

### **Step 6: Basic QoS Framework Implementation**

#### **Core Switch QoS Configuration**

```cisco
! Access Core-Switch-L3 CLI
enable
configure terminal

! Enable QoS globally
mls qos

! Configure QoS trust boundaries
interface range fastethernet0/1-4
 mls qos trust dscp
 exit

! Create class maps for traffic classification
class-map match-all VOICE-TRAFFIC
 match ip dscp ef
 exit

class-map match-all VIDEO-TRAFFIC  
 match ip dscp af41
 exit

class-map match-all CRITICAL-DATA
 match ip dscp af31
 exit

class-map match-all BUSINESS-DATA
 match ip dscp af21
 exit

! Create policy maps for QoS actions
policy-map QOS-POLICY
 class VOICE-TRAFFIC
  priority percent 30
 class VIDEO-TRAFFIC
  bandwidth percent 25
 class CRITICAL-DATA
  bandwidth percent 20  
 class BUSINESS-DATA
  bandwidth percent 15
 class class-default
  bandwidth percent 10
 exit

! Apply QoS policy to interfaces
interface range fastethernet0/1-4
 service-policy output QOS-POLICY
 exit

copy running-config startup-config
```

### **Step 7: Testing and Validation**

#### **Connectivity Testing (Real-time Mode)**

1. **Switch to Real-time Mode**

   - Click **Real-time** button (clock icon) in bottom toolbar
   - Wait for all device lights to turn green
2. **Basic Ping Tests**

   - Click on **PC-Finance-01**
   - Navigate to **Desktop → Command Prompt**
   - Test commands:
     ```
     ping 10.0.10.1    (Test gateway)
     ping 10.0.20.10   (Test inter-VLAN - should fail initially)
     ping 10.0.40.100  (Test server access - should fail initially)
     ```
3. **VLAN Isolation Verification**

   - From PC-Finance-01: `ping 10.0.20.10` (should fail - different VLAN)
   - From PC-Finance-01: `ping 10.0.10.1` (should succeed - same VLAN gateway)

#### **Simulation Mode Testing**

1. **Switch to Simulation Mode**

   - Click **Simulation** button (stopwatch icon)
   - Packet Tracer switches to simulation workspace
2. **Create Test Packet**

   - Click **Add Simple PDU** (envelope icon)
   - Click source device (PC-Finance-01)
   - Click destination device (PC-HR-01)
   - Observe packet path in animation
3. **Analyze Traffic Flow**

   - Click **Play** to start simulation
   - Observe packet movement through switches
   - Check for any failures or delays
   - Use **Info** panel to see packet details

### **Step 8: Documentation and Screenshots**

#### **Required Screenshots for Week 6**

📸 **Take screenshots of:**

1. **Topology Overview**

   - Logical view showing all devices and connections
   - Save as: `week6-topology-overview.png`
2. **VLAN Configuration**

   - Core switch VLAN database showing VLANs 10-40
   - Save as: `week6-vlan-configuration.png`
3. **IP Configuration**

   - PC desktop showing IP settings for one device
   - Save as: `week6-ip-configuration.png`
4. **QoS Policy**

   - CLI output showing QoS policy configuration
   - Save as: `week6-qos-policy.png`
5. **Connectivity Test**

   - Command prompt showing successful ping tests
   - Save as: `week6-connectivity-test.png`

#### **Configuration Backup**

**Save Device Configurations:**

1. **Export Core Switch Config**

   - Access Core-Switch-L3 CLI
   - Execute: `show running-config`
   - Copy output to text file: `core-switch-config.txt`
2. **Save Packet Tracer File**

   - Press **Ctrl+S**
   - Save as: `FinMark-Week6-Foundation.pkt`
   - Location: `packet-tracer/configurations/`

### **Step 9: Compliance Framework Documentation**

#### **PDPA Compliance Notes**

📝 **Add Text Boxes in Packet Tracer:**

- **Data Protection**: VLAN segmentation ensures sensitive financial data (VLAN 10) is isolated from other departments
- **Access Control**: Each department has dedicated network access preventing unauthorized data access

#### **GDPR Compliance Notes**

📝 **Add Text Boxes in Packet Tracer:**

- **Privacy by Design**: Network architecture implements privacy controls through VLAN isolation
- **Data Minimization**: Inter-VLAN routing controlled to ensure access only to necessary resources

#### **PCI DSS Compliance Notes**

📝 **Add Text Boxes in Packet Tracer:**

- **Network Segmentation**: Financial systems (VLAN 10) isolated from other network segments
- **Access Control**: Restricted access to cardholder data environment through VLAN controls

**Adding Text Boxes:**

1. Click **Text Tool** (A icon) in left toolbar
2. Click on workspace where you want to add compliance note
3. Type compliance information
4. Format with different colors for different compliance types

---

## ✅ **Week 6 Success Criteria Checklist**

- [ ] 8-device topology created and physically connected
- [ ] 4 VLANs configured and operational (VLANs 10, 20, 30, 40)
- [ ] Inter-VLAN routing configured on core switch
- [ ] All end devices have appropriate IP configurations
- [ ] Basic QoS framework implemented with 5 traffic classes
- [ ] VLAN isolation verified (ping tests fail between VLANs)
- [ ] Intra-VLAN connectivity verified (ping tests succeed within VLAN)
- [ ] Documentation screenshots captured
- [ ] Configuration files backed up
- [ ] Compliance framework text boxes added
- [ ] Packet Tracer file saved as FinMark-Week6-Foundation.pkt

---

## 🚀 **Week 6 Deliverables**

1. **FinMark-Week6-Foundation.pkt** - Working Packet Tracer file
2. **Configuration files** - All device running configurations
3. **Screenshots** - Visual documentation of implementation
4. **Compliance documentation** - PDPA/GDPR/PCI DSS framework notes
5. **Testing results** - Connectivity and isolation verification

---

## 📋 **Preparation for Week 7**

Week 7 will expand this foundation to enterprise-level with:

- Expansion to 20+ devices
- Enhanced VLAN structure with DMZ
- Advanced security zones implementation
- Load balancing preparation
- Enhanced QoS policies

**Next**: Continue to Week 7 Implementation Guide for enterprise topology expansion.

---

*This completes the Week 6 foundational setup. The network now has basic VLAN segmentation, QoS framework, and compliance considerations ready for Week 7 enterprise expansion.*
