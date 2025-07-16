# Week 8: Security Challenge Implementation - Cisco Packet Tracer
## FinMark Corporation 300% Traffic Spike & Advanced Security

**Objective**: Implement advanced security features to handle 300% traffic spike with comprehensive threat protection  
**Duration**: 3 days  
**Success Criteria**: Load balancing, advanced firewall rules, IDS simulation, DDoS protection  

---

## 🎯 **Week 8 Goals**

- Simulate and handle 300% traffic spike scenario
- Implement advanced firewall security policies
- Deploy intrusion detection simulation
- Configure load balancing across server farm
- Establish comprehensive threat monitoring
- Validate security effectiveness under stress

---

## 🚀 **Starting Point: Week 7 Enterprise Network**

**Prerequisites:**
- Week 7 enterprise topology completed (20+ devices)
- Open `FinMark-Week7-Enterprise.pkt` file
- All security zones and VLANs operational

---

## 🛠️ **Advanced Security Implementation**

### **Step 1: Save New Security Version**
1. **File → Save As**
2. Name: `FinMark-Week8-Security.pkt`
3. Location: `packet-tracer/week8-security-challenge/`

### **Step 2: Enhanced Firewall Deployment**

#### **Add Dedicated Firewall Appliance**

**Additional Security Device:**
1. **Device**: ASA5505 (if available) or Advanced Router
2. **Label**: `Perimeter-Firewall-01`
3. **Position**: Between Edge-Router and Distribution-Router (Grid: E2)

**Advanced Firewall Connections:**
```
Edge-Router FastEthernet0/1 ↔ Perimeter-Firewall-01 Outside
Perimeter-Firewall-01 Inside ↔ Distribution-Router FastEthernet0/3
```

#### **ASA Firewall Configuration**

**Perimeter-Firewall-01 Configuration:**
```cisco
! Access Perimeter-Firewall-01 CLI
enable
configure terminal
hostname Perimeter-Firewall-01

! Configure interfaces
interface ethernet0/0
 nameif outside
 security-level 0
 ip address 203.0.113.2 255.255.255.0
 no shutdown
 exit

interface ethernet0/1
 nameif inside
 security-level 100
 ip address 192.168.100.1 255.255.255.0
 no shutdown
 exit

! Configure access control lists for security
access-list OUTSIDE_IN extended deny icmp any any
access-list OUTSIDE_IN extended permit tcp any host 10.0.50.10 eq 80
access-list OUTSIDE_IN extended permit tcp any host 10.0.50.11 eq 80
access-list OUTSIDE_IN extended permit tcp any host 10.0.50.10 eq 443
access-list OUTSIDE_IN extended permit tcp any host 10.0.50.11 eq 443
access-list OUTSIDE_IN extended permit tcp any host 10.0.50.25 eq 25
access-list OUTSIDE_IN extended deny ip any any log

! DDoS Protection Rules
access-list DDOS_PROTECTION extended deny tcp any any eq 80 log
access-list DDOS_PROTECTION extended permit tcp any any established
access-list DDOS_PROTECTION extended deny ip any any fragments log

! Geo-blocking simulation (block specific ranges)
access-list GEO_BLOCK extended deny ip 1.0.0.0 0.255.255.255 any log
access-list GEO_BLOCK extended deny ip 14.0.0.0 1.255.255.255 any log
access-list GEO_BLOCK extended permit ip any any

! Apply ACLs to interfaces
access-group OUTSIDE_IN in interface outside
access-group GEO_BLOCK in interface outside

! Configure NAT for internal networks
nat (inside) 1 10.0.0.0 255.0.0.0
global (outside) 1 203.0.113.100-203.0.113.200

! Enable threat detection
threat-detection basic-threat
threat-detection statistics
threat-detection rate syn-attack rate-interval 300 average-rate 100 burst-rate 200

write memory
```

### **Step 3: Load Balancing Implementation**

#### **Web Server Farm Load Balancing**

**Add Load Balancer Device:**
1. **Device**: Server-PT (configured as load balancer)
2. **Label**: `Load-Balancer-01`
3. **Position**: In front of web servers (Grid: I1)

**Load Balancer Network Configuration:**

**Load-Balancer-01 Configuration:**
```
! Configure Load Balancer IP
IP Address: 10.0.50.5
Subnet Mask: 255.255.255.0
Default Gateway: 10.0.50.1

! In Packet Tracer, use Services tab to configure load balancing
! Navigate to Services → Load Balancer
! Configure server pool:
Server Pool: Web-Servers
- Server 1: 10.0.50.10 (Web-Server-01)
- Server 2: 10.0.50.11 (Web-Server-02)
Algorithm: Round Robin
Health Check: Enable (HTTP port 80)
```

#### **DMZ Switch Load Balancer Integration**

**Update SW-DMZ-External Configuration:**
```cisco
! Access SW-DMZ-External CLI
enable
configure terminal

! Add load balancer port
interface fastethernet0/5
 switchport mode access
 switchport access vlan 50
 switchport port-security
 switchport port-security maximum 1
 no shutdown
 exit

! Configure port mirroring for monitoring
monitor session 1 source interface fastethernet0/1-4
monitor session 1 destination interface fastethernet0/23

copy running-config startup-config
```

### **Step 4: Intrusion Detection System Simulation**

#### **IDS Monitoring Setup**

**Add IDS Simulation Device:**
1. **Device**: Server-PT
2. **Label**: `IDS-Monitor-01`
3. **Position**: Connected to core switch for monitoring (Grid: F7)

**IDS-Monitor-01 Configuration:**
```
! Configure IDS IP
IP Address: 10.0.40.200
Subnet Mask: 255.255.255.0
Default Gateway: 10.0.40.1

! Use Desktop → Text Editor to create IDS rules file
! Create file: ids-rules.txt
! Content:
alert tcp any any -> 10.0.10.0/24 any (msg:"Financial Network Access"; sid:1001;)
alert tcp any any -> 10.0.50.0/24 80 (msg:"Web Server Access"; sid:1002;)
alert icmp any any -> any any (msg:"ICMP Flood Detection"; sid:1003;)
alert tcp any any -> any any (flags:S; msg:"SYN Flood Detection"; sid:1004;)
```

#### **SPAN Port Configuration for IDS**

**Core-Switch-L3 SPAN Configuration:**
```cisco
! Access Core-Switch-L3 CLI
enable
configure terminal

! Configure SPAN session for IDS monitoring
monitor session 1 source interface fastethernet0/1-4
monitor session 1 source interface gigabitethernet0/1-2
monitor session 1 destination interface fastethernet0/20

! Connect IDS-Monitor-01 to FastEthernet0/20
! Interface configuration for IDS connection
interface fastethernet0/20
 description IDS-Monitor-Connection
 switchport mode access
 switchport access vlan 40
 no shutdown
 exit

copy running-config startup-config
```

### **Step 5: Advanced Traffic Shaping for 300% Spike**

#### **Enhanced QoS for High Traffic**

**Distribution-Router Enhanced QoS:**
```cisco
! Access Distribution-Router CLI
enable
configure terminal

! Create traffic classes for spike handling
class-map match-all CRITICAL-FINANCIAL
 match access-group name CRITICAL-TRANSACTIONS
 exit

class-map match-all BULK-TRAFFIC
 match access-group name BULK-DATA
 exit

class-map match-all ATTACK-TRAFFIC
 match access-group name POTENTIAL-ATTACKS
 exit

! Create access lists for traffic classification
ip access-list extended CRITICAL-TRANSACTIONS
 permit tcp 10.0.10.0 0.0.0.255 10.0.50.100 0.0.0.3 eq 443
 permit tcp 10.0.10.0 0.0.0.255 10.0.40.100 0.0.0.15 eq 1433
 exit

ip access-list extended BULK-DATA
 permit tcp any any eq 21
 permit tcp any any eq 20
 permit tcp any any range 8000 8080
 exit

ip access-list extended POTENTIAL-ATTACKS
 permit tcp any any eq 23
 permit tcp any any eq 135
 permit tcp any any eq 139
 permit tcp any any eq 445
 exit

! Create spike-resistant policy
policy-map SPIKE-RESISTANT-QOS
 class CRITICAL-FINANCIAL
  priority percent 40
  police 1000000 8000 conform-action transmit exceed-action drop
 class VOICE-TRAFFIC
  priority percent 20
 class VIDEO-CONFERENCE
  bandwidth percent 15
 class DATABASE-TRAFFIC
  bandwidth percent 10
 class WEB-TRAFFIC
  bandwidth percent 10
 class BULK-TRAFFIC
  bandwidth percent 3
 class ATTACK-TRAFFIC
  police 10000 1000 conform-action drop exceed-action drop
 class class-default
  bandwidth percent 2
  fair-queue
 exit

! Apply to all interfaces
interface fastethernet0/0.10
 service-policy output SPIKE-RESISTANT-QOS
 exit

interface fastethernet0/0.20
 service-policy output SPIKE-RESISTANT-QOS
 exit

interface fastethernet0/0.30
 service-policy output SPIKE-RESISTANT-QOS
 exit

interface fastethernet0/0.40
 service-policy output SPIKE-RESISTANT-QOS
 exit

interface fastethernet0/2
 service-policy output SPIKE-RESISTANT-QOS
 exit

copy running-config startup-config
```

### **Step 6: Rate Limiting and DDoS Protection**

#### **Interface Rate Limiting**

**Perimeter-Firewall-01 Rate Limiting:**
```cisco
! Access Perimeter-Firewall-01 CLI
enable
configure terminal

! Configure connection limits
! (Note: Some advanced features may be limited in Packet Tracer)

! Basic rate limiting through access lists
access-list RATE_LIMIT extended permit tcp any any eq 80
access-list RATE_LIMIT extended permit tcp any any eq 443
access-list RATE_LIMIT extended deny tcp any any

! Configure connection thresholds
! threat-detection basic-threat
! threat-detection statistics access-list
! threat-detection rate syn-attack rate-interval 600 average-rate 50 burst-rate 100

write memory
```

#### **Switch-Level Protection**

**Core Switch Port Security Enhancement:**
```cisco
! Access Core-Switch-L3 CLI
enable
configure terminal

! Enhanced port security on access interfaces
interface range fastethernet0/1-4
 switchport port-security
 switchport port-security maximum 50
 switchport port-security violation restrict
 switchport port-security aging time 1
 switchport port-security aging type inactivity
 exit

! Configure storm control
interface range fastethernet0/1-4
 storm-control broadcast level 10.00
 storm-control multicast level 10.00
 storm-control unicast level 10.00
 exit

copy running-config startup-config
```

### **Step 7: Traffic Generation and Spike Simulation**

#### **Traffic Generator Setup**

**Add Traffic Generator Devices:**
1. **Device 1**: PC-PT → Label: `Traffic-Gen-01` (Grid: A1)
2. **Device 2**: PC-PT → Label: `Traffic-Gen-02` (Grid: B1)
3. **Device 3**: PC-PT → Label: `Traffic-Gen-03` (Grid: C1)

**Traffic Generator Configuration:**
```
! Configure Traffic Generator IPs (External simulation)
Traffic-Gen-01: 203.0.113.50/24, GW: 203.0.113.1
Traffic-Gen-02: 203.0.113.51/24, GW: 203.0.113.1
Traffic-Gen-03: 203.0.113.52/24, GW: 203.0.113.1
```

#### **Simulation Mode Traffic Testing**

**Normal Load Baseline (200 RPS simulation):**
1. **Switch to Simulation Mode**
2. **Use Complex PDU tool:**
   - Source: Traffic-Gen-01
   - Destination: Load-Balancer-01 (10.0.50.5)
   - Application: HTTP
   - Interval: 5 seconds (simulating normal load)

3. **Create Multiple Traffic Flows:**
   ```
   Flow 1: Traffic-Gen-01 → Web-Server-01 (HTTP)
   Flow 2: Traffic-Gen-02 → Web-Server-02 (HTTP)  
   Flow 3: PC-Finance-01 → Database-Server-01 (Database)
   Flow 4: PC-HR-01 → Mail-Server-01 (SMTP)
   ```

**300% Traffic Spike Simulation:**
1. **Increase Simulation Speed**
   - Set simulation to "Fast Forward" mode
   - Increase PDU frequency to simulate spike

2. **Create Burst Traffic:**
   ```
   Burst Flow 1: All Traffic-Gen → Load-Balancer-01 (1 second intervals)
   Burst Flow 2: Multiple Complex PDUs to Web servers
   Burst Flow 3: Simulated DDoS with ICMP flood
   ```

3. **Monitor Performance:**
   - Watch for dropped packets
   - Observe load balancer distribution
   - Check firewall blocking effectiveness

### **Step 8: Security Monitoring and Logging**

#### **Log Server Setup**

**Add Log Server:**
1. **Device**: Server-PT
2. **Label**: `Log-Server-01`
3. **Position**: IT VLAN area (Grid: G8)
4. **IP**: 10.0.40.201/24, GW: 10.0.40.1

**Configure Syslog on Network Devices:**

**Distribution-Router Logging:**
```cisco
! Access Distribution-Router CLI
enable
configure terminal

! Configure logging
logging 10.0.40.201
logging trap informational
logging source-interface fastethernet0/0.40
logging facility local0

! Log ACL matches
access-list 150 permit ip any any log

copy running-config startup-config
```

**Firewall Logging:**
```cisco
! Access Perimeter-Firewall-01 CLI
enable
configure terminal

! Configure logging
logging enable
logging host inside 10.0.40.201
logging trap informational

write memory
```

### **Step 9: Comprehensive Security Testing**

#### **Multi-Phase Testing Protocol**

**Phase 1: Baseline Performance Test**
1. **Real-time Mode Testing:**
   ```
   Test 1: Normal HTTP traffic to web servers
   Expected: Normal response, proper load balancing
   
   Test 2: Financial transaction simulation
   Expected: High priority, no delays
   
   Test 3: Inter-VLAN communications
   Expected: Proper security zone restrictions
   ```

2. **Performance Metrics:**
   - Response time baseline
   - Load balancer distribution
   - Security policy effectiveness

**Phase 2: Traffic Spike Simulation**
1. **Simulation Mode Burst Testing:**
   ```
   Test 1: 3x normal HTTP traffic volume
   Expected: Load balancer handles distribution
   
   Test 2: Database overload simulation  
   Expected: QoS maintains financial priority
   
   Test 3: Multiple concurrent sessions
   Expected: Rate limiting prevents overload
   ```

**Phase 3: Security Threat Simulation**
1. **Attack Simulation:**
   ```
   Test 1: ICMP flood from external sources
   Expected: Firewall blocks, logs generated
   
   Test 2: Port scan simulation
   Expected: IDS detection, automatic blocking
   
   Test 3: Unauthorized VLAN access attempts
   Expected: ACL blocking, security alerts
   ```

**Phase 4: Recovery Testing**
1. **Failover Testing:**
   ```
   Test 1: Primary web server failure simulation
   Expected: Load balancer redirects to backup
   
   Test 2: Core switch redundancy test
   Expected: Secondary switch takes over
   
   Test 3: Network recovery validation
   Expected: Normal operations restore quickly
   ```

### **Step 10: Performance Metrics and Analysis**

#### **Simulation Statistics Collection**

**Expected Results from Week 8 Implementation:**

1. **Traffic Handling Capacity:**
   - **Normal Load**: 100% success rate, <50ms latency
   - **300% Spike**: 85%+ success rate, <150ms latency
   - **Load Distribution**: Even across web servers

2. **Security Effectiveness:**
   - **Firewall Blocking**: 100% unauthorized access blocked
   - **IDS Detection**: 90%+ threat detection rate
   - **Rate Limiting**: DDoS attacks mitigated
   - **VLAN Isolation**: 100% cross-VLAN blocking

3. **System Resilience:**
   - **Failover Time**: <5 seconds for server switching
   - **Recovery Time**: <30 seconds to normal operations
   - **Monitoring Coverage**: 100% network visibility

#### **Packet Tracer Testing Tools**

**Use Built-in Analysis Tools:**
1. **Event List Monitoring**
   - Enable detailed event logging
   - Track packet success/failure rates
   - Monitor timing and latency

2. **Protocol Inspection**
   - Examine packet headers for QoS markings
   - Verify security policy applications
   - Check load balancer effectiveness

### **Step 11: Documentation and Screenshots**

#### **Required Screenshots for Week 8**

📸 **Security Implementation Documentation:**

1. **Advanced Security Topology**
   - Full view showing firewall, IDS, load balancer
   - Save as: `week8-security-topology.png`

2. **Firewall Rules Configuration**
   - ASA CLI showing security policies
   - Save as: `week8-firewall-rules.png`

3. **Load Balancer Configuration**
   - Server farm and balancing algorithm setup
   - Save as: `week8-load-balancer.png`

4. **QoS Spike Policy**
   - Enhanced QoS policy for traffic spike handling
   - Save as: `week8-qos-spike-policy.png`

5. **IDS Monitoring Setup**
   - SPAN configuration and IDS rules
   - Save as: `week8-ids-monitoring.png`

6. **Traffic Simulation Results**
   - Simulation showing 300% traffic spike handling
   - Save as: `week8-traffic-spike-test.png`

7. **Security Testing Results**
   - Command outputs showing blocked attacks
   - Save as: `week8-security-effectiveness.png`

### **Step 12: Enhanced Compliance Validation**

#### **Security Compliance Documentation**

**Add Enhanced Compliance Text Boxes:**

📝 **PDPA Enhanced Security (Green Text Boxes):**
- **Data Protection**: Multi-layer firewall protection prevents unauthorized access to personal data
- **Access Logging**: Comprehensive logging ensures accountability for data access
- **Breach Prevention**: IDS and rate limiting prevent data breaches through network attacks

📝 **GDPR Security Controls (Blue Text Boxes):**
- **Technical Safeguards**: Advanced encryption and access controls protect personal data
- **Monitoring Systems**: Real-time monitoring enables quick breach detection and response
- **Data Integrity**: Load balancing and redundancy ensure data availability and integrity

📝 **PCI DSS Security Framework (Red Text Boxes):**
- **Network Security**: Multi-layer firewall and IDS provide required network protection
- **Access Control**: Role-based access through VLANs and security zones
- **Monitoring**: Real-time transaction monitoring and logging for fraud detection

---

## ✅ **Week 8 Success Criteria Checklist**

- [ ] Advanced firewall (ASA) deployed with comprehensive rules
- [ ] Load balancing implemented across web server farm
- [ ] IDS monitoring system configured with SPAN ports
- [ ] Enhanced QoS policies for 300% traffic spike
- [ ] Rate limiting and DDoS protection active
- [ ] Traffic generation and spike simulation completed
- [ ] Security threat testing performed and validated
- [ ] Performance metrics meeting 85%+ success under load
- [ ] System resilience and failover testing passed
- [ ] Comprehensive security logging operational
- [ ] All security policies tested and verified
- [ ] Enhanced compliance documentation completed
- [ ] Configuration backup and documentation finalized
- [ ] Packet Tracer file saved as FinMark-Week8-Security.pkt

---

## 🚀 **Week 8 Deliverables**

1. **FinMark-Week8-Security.pkt** - Complete security-hardened network
2. **Advanced security configurations** - Firewall, IDS, load balancer configs
3. **Performance testing results** - 300% traffic spike handling validation
4. **Security effectiveness reports** - Threat detection and mitigation results
5. **Enhanced compliance documentation** - PDPA/GDPR/PCI DSS security controls
6. **Operational procedures** - Security monitoring and incident response guides

---

## 📋 **Preparation for Week 9**

Week 9 will focus on production optimization and refinement:
- Performance fine-tuning based on Week 8 results
- Advanced security policy optimization
- Production-ready configuration management
- Client presentation preparation
- Final validation and testing

**Next**: Continue to Week 9 Implementation Guide for production refinement and optimization.

---

*Week 8 security implementation complete. The network now handles 300% traffic spikes with comprehensive security measures, meeting enterprise-grade threat protection requirements and preparing for Week 9 production optimization.*
