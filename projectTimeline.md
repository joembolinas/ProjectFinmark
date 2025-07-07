A comprehensive 12-week timeline for the FinMark Corporation Network Security Transformation, drawing on the provided sources to outline the progression from a vulnerable legacy network to an enterprise-grade zero-trust security infrastructure.

---

## 📅 **PHASE 1: FOUNDATION (WEEKS 1-2)**

**Week 1: Project Kick-off and Initial Assessment**

* 🎯 **Weekly Goal:** Course introduction, platform experience sharing, course overview and expectations. **Identify FinMark's core challenges** related to scalability, security, and data. Complete the Project Management Template and analyze initial platform requirements based on specialization.
* 🚀 **Approach and Key Decisions:**
  * Understand the role as a tech consultant for FinMark, focusing on building scalable, secure, and data-driven platforms.
  * Form teams based on specialization (Network & Cybersecurity).
  * Begin understanding FinMark's "Building a Secure, Resilient Network" challenge, which prioritizes security to prevent cyber threats and protect financial data.
* 🔥 **Problems Encountered and Solutions:**
  * Initial understanding of FinMark's current system limitations, including a  **scalability crisis** ,  **performance degradation** , and  **security vulnerabilities** .
  * Addressing the prompt's ambiguity on initial project status by referring to the provided `network_inventory.csv` and `traffic_logs.csv` (implicitly mentioned in `MO-IT151 Milestone 1_ H3101 CSN1 Bolinas, Matula, Pontanilla, Tan, Villaverde.md`) and the project context, especially the  **FinMark IT Manual** .
* 🛠️ **Tools Needed:** Project Management tool (for tracking tasks).
* 📋 **Output/Deliverables:**
  * Begin drafting the  **Initial Consulting Report** , outlining strategy and recommended solutions.
  * Start working on the  **Project Management tool** , detailing team formation and initial tasks.
  * Participate in  **Peer Discussion #1** .
* 📚 **Resources Used:**
  * "Introduction to Platform Technologies".
  * FinMark client materials and IT Manual.
  * Case studies on risks of poor platform technologies, such as Knight Capital losses and Equifax Data Breach.
* 🔍 **Other Considerations:** Understand that FinMark's current IT infrastructure is designed for small-scale operations, with inadequate load balancing and insufficient security monitoring.

**Week 2: Deep Dive into FinMark's Network Security Needs**

* 🎯 **Weekly Goal:** Deepen analysis of FinMark's network challenges and continue project management. Prioritize understanding of security requirements and existing vulnerabilities.
* 🚀 **Approach and Key Decisions:**
  * Focus on FinMark's "Building a Secure, Resilient Network" challenge, ensuring the system is **resistant to cyber threats** and maintains  **high availability** .
  * Review FinMark's **IT Manual** for specific security provisions and policies, including Role-Based Access Control (RBAC), Multi-Factor Authentication (MFA), Data Encryption (TLS 1.2+ for data in transit, AES-256 for data at rest), Monitoring (SIEM), and Load Management.
  * Consider adherence to regional data security laws like  **PDPA, GDPR, and PCI DSS** .
* 🔥 **Problems Encountered and Solutions:**
  * Addressing the **pain points** of **unauthorized access incidents** and  **system slowdowns during peak hours** , which increase vulnerability and reduce trust.
  * Recognize the **weaknesses in the current security model** and the need for a **scalable infrastructure** that supports secure performance under heavy load.
* 🛠️ **Tools Needed:** Cisco Packet Tracer for network simulation.
* 📋 **Output/Deliverables:**
  * Further development of the Initial Consulting Report.
  * Continued updates to the Project Management tool reflecting deeper analysis and potential solutions.
* 📚 **Resources Used:**
  * "Cybersecurity Strategies for Business Growth".
  * "Cloud Computing Fundamentals" and "Introduction to Scalable Software Architectures".
  * FinMark IT Manual, specifically  **Data Security Provisions** .
* 🔍 **Other Considerations:** The Network & Cybersecurity team's role is critical as their decisions impact the overall success of FinMark's platform.

## 📅 **PHASE 2: DESIGN (WEEKS 3-5)**

**Week 3: Designing the Network Blueprint**

* 🎯 **Weekly Goal:** Present initial drafts of the proposed network architecture and design, integrate basic network concepts. Begin designing improvements that address identified issues and meet FinMark's needs.
* 🚀 **Approach and Key Decisions:**
  * Conceptualize the **"Proposed Network Architecture"** that addresses weak points in FinMark's current design.
  * Focus on network architecture and topology (e.g., **Star Topology** for ease of management, **Hybrid Topology** for complex enterprise networks).
  * Integrate security features such as **firewalls, VPNs, and Intrusion Detection Systems (IDS)** as layered defense mechanisms.
* 🔥 **Problems Encountered and Solutions:**
  * Current weak points include **single points of failure** (Router1, WebServer1, DBServer1), vulnerabilities like  **default passwords** ,  **outdated SSL/TLS** , lack of a  **dedicated DB firewall** , outdated client OS, unsecured printer, and  **poor network segmentation** .
  * Solutions proposed include adding a  **Web Application Firewall (WAF)** ,  **IDS/IPS** ,  **Endpoint Detection and Response (EDR)** ,  **VLAN-based segmentation** ,  **Email Security Gateway** , and a  **Content Delivery Network (CDN)** .
* 🛠️ **Tools Needed:**
  * **Cisco Packet Tracer** (for network simulation).
  * Diagramming tools like **Lucidchart** or  **Draw.io/Diagrams.net** .
* 📋 **Output/Deliverables:**
  * Present initial drafts, diagrams, and processes during consultation sessions.
  * Answer items listed in the Initial Consulting Report.
  * Submit **Milestone 1 Draft** for initial feedback.
* 📚 **Resources Used:**
  * "Basic Network and Architecture Design Concepts".
  * "Network Topology Explained".
  * **FinMark IT Manual** (for security policies).
* 🔍 **Other Considerations:** Ensure the design directly addresses the CEO's concerns about  **data security** ,  **access control** , and  **performance security** .

**Week 4: Milestone 1: Project Blueprint Submission**

* 🎯 **Weekly Goal:** **Submit the finalized network diagram** with firewall, security, and performance-enhancing measures for Milestone 1. Conduct peer feedback sessions.
* 🚀 **Approach and Key Decisions:**
  * Finalize the **"Current Network Architecture" (Diagram 1)** and  **"Proposed Network Design" (Diagram 2)** , clearly marking improvements and explaining the rationale.
  * Justify **key design changes** and how they enhance  **security, performance, and reliability** .
  * Ensure all proposals align with **FinMark IT Manual** provisions and regional data security laws (PDPA, GDPR, PCI DSS).
* 🔥 **Problems Encountered and Solutions:**
  * Explicitly outline major vulnerabilities and bottlenecks identified in the current network (e.g., outdated SSL/TLS, no DB firewall) and how the proposed design resolves them (e.g., updated SSL/TLS, dedicated internal firewall).
  * Detail solutions like **RBAC and MFA** to address unauthorized access, and **Load Balancing** and **CDN** to fix performance degradation.
* 🛠️ **Tools Needed:** Cisco Packet Tracer, Lucidchart, Draw.io/Diagrams.net for diagrams.
* 📋 **Output/Deliverables:**
  * **Milestone 1: Project Blueprint (Submission)** including two diagrams (Current and Proposed) and a short explanation (document/slides).
  * Participate in  **Peer Feedback on Milestone 1** .
* 📚 **Resources Used:**
  * **MO-IT151 Milestone 1: H3101 CSN1 Bolinas, Matula, Pontanilla, Tan, Villaverde.md** (for current and proposed diagrams details).
  * **FinMark Corporation - Project Finer FinMark Comprehensive Network and Cybersecurity Development Guide** (for requirements).
* 🔍 **Other Considerations:** Focus on how the design meets FinMark's technical needs for secure authentication and scalable infrastructure under heavy load.

**Week 5: Revision and Project Management Check-in**

* 🎯 **Weekly Goal:** Revise Milestone 1 output based on feedback and insights. Conduct a project management check-in to update progress, identify key assignments' performance, and set timelines for Milestone 2.
* 🚀 **Approach and Key Decisions:**
  * Review mentor and peer feedback from Week 4.
  * Focus on enhancing **robustness** (scalability, error handling, performance optimization, resilience) in the design.
  * Consider specific examples of improving robustness, such as **multi-region redundancy** and **fallback APIs/message queues** for resilience, and **autoscaling** for scalability.
* 🔥 **Problems Encountered and Solutions:**
  * Address common potential issues in the proposed design (e.g., cost analysis for cloud solutions, effective cache invalidation strategies, clear error messages when rate limits are reached).
  * Ensure cross-specialization integration by understanding how network decisions affect software modules and data pipelines.
* 🛠️ **Tools Needed:** Project Management Tool (for updating group progress and planning Milestone 2).
* 📋 **Output/Deliverables:**
  * **Revised Milestone 1 output** .
  * Project Management Check-in (update shared PM sheet, set timelines for MS2).
  * **Peer Feedback on Milestone 1: Final Revisions** .
* 📚 **Resources Used:**
  * "What are key considerations in improving MS 1?".
  * Discussion on "Cross-Specialization Integration" (modules, networks, data pipelines).
* 🔍 **Other Considerations:** Understand that robustness is a team effort and requires continuous collaboration. This revision prepares for the actual implementation in Milestone 2.

## 📅 **PHASE 3: DEVELOPMENT (WEEKS 6-9)**

**Week 6: Core Network Component Development and Initial Testing**

* 🎯 **Weekly Goal:** Begin building a **working network simulation** that demonstrates how devices, servers, and services interact within the platform, considering secure protocols, access control, and basic fault tolerance.
* 🚀 **Approach and Key Decisions:**
  * Translate the "Proposed Network Design" from Milestone 1 into a functional prototype.
  * Focus on implementing **core functionalities** such as **secure authentication** and basic network configurations that reflect **scalability** and  **resilience** .
  * Start hands-on implementation of security controls like **firewall rules** and  **VPN configurations** .
* 🔥 **Problems Encountered and Solutions:**
  * Troubleshoot unexpected connectivity or configuration issues during simulation.
  * Anticipate and address **runtime errors** (e.g., null/undefined values, invalid data format, unhandled exceptions, timeouts, type errors).
* 🛠️ **Tools Needed:**
  * **Cisco Packet Tracer** (for network simulation).
  * **Wireshark** (for packet capture and protocol inspection).
  * **iperf3** (for traffic generation and bandwidth stress testing).
  * **pfSense** (for firewall and routing rules).
  * **IPTables** (for Linux-based firewall rules).
  * Debugging tools: Browser Dev Tools, VS Code Debugger, Postman, `console.log`/`console.error`.
* 📋 **Output/Deliverables:**
  * Milestone 2 preparations based on specialization.
  * Update  **Project Management Tool** .
  * Practice tasks for debugging and testing network components.
* 📚 **Resources Used:**
  * "Core Component Development".
  * "Testing and Debugging Techniques".
  * "Traffic Optimization and Performance Management".
  * "Load Balancing Techniques".
  * "Network Security".
* 🔍 **Other Considerations:** Remember that a platform becomes trustworthy not by never failing, but by knowing how to recover. Testing and debugging are continuous habits, not just stages.

**Week 7: Cisco Topology Integration and Enterprise Network Adoption** ✅ **COMPLETED**

* 🎯 **Weekly Goal:** **Adopt Cisco Packet Tracer-based enterprise topology** into the VS Code simulation environment and validate the new network architecture.
* 🚀 **Approach and Key Decisions:**
  * **MAJOR ARCHITECTURAL DECISION**: Full adoption of Cisco enterprise topology from provided `FinMark_M2_Topology_Configuration.md`
  * Implement **5-department VLAN segmentation**: Finance (VLAN 10), HR (VLAN 20), Operations (VLAN 30), IT/Database (VLAN 40), DMZ (VLAN 50)
  * Enhance **QoS implementation** with enterprise-grade 5-class system (Voice, Video, Critical Data, Business Data, Default)
  * Add **VLAN-aware packet simulation** with realistic departmental traffic patterns
  * Create **comprehensive network validation suite** for automated testing
* 🔥 **Problems Encountered and Solutions:**
  * **Challenge**: Integrating Cisco design with VS Code-based simulation environment
  * **Solution**: Enhanced network topology generator to support enterprise VLAN structure
  * **Challenge**: Basic QoS insufficient for enterprise simulation
  * **Solution**: Implemented DSCP marking (EF, AF41, AF31, AF21, BE) and bandwidth allocation
  * **Challenge**: Need for realistic network validation
  * **Solution**: Created automated test suite with comprehensive reporting
* 🛠️ **Tools Enhanced/Utilized:**
  * **Enhanced**: `network-topology-generator.js` - Full Cisco enterprise alignment
  * **Rewritten**: `qos-config.json` - Enterprise QoS classes and VLAN policies
  * **Enhanced**: `packet-capture-simulator.js` - VLAN-aware simulation with realistic traffic
  * **Created**: `network-validation.js` - Comprehensive automated testing
  * **Maintained**: PowerShell integration for Windows compatibility
* 📋 **Output/Deliverables:** ✅ **ALL COMPLETED**
  * **Network Topology**: 20 devices, 20 connections, 5 VLANs, 7 security zones
  * **Validation Report**: `docs/Network-Validation-Report.md` - ALL TESTS PASSED
  * **Change Documentation**: `docs/Cisco-Topology-Adoption-Summary.md`
  * **Updated Project Knowledge Base**: Complete architectural decision documentation
  * **Performance Metrics**: 16,035 packets processed, 0% loss, 2.28 Mbps throughput
* 📚 **Resources Used:**
  * "Cisco Packet Tracer Enterprise Design Principles"
  * "VLAN Segmentation Best Practices"
  * "QoS Implementation in Enterprise Networks"
  * "Network Validation and Testing Methodologies"
* 🔍 **Other Considerations:** **Network now enterprise-ready** - Aligned with industry standards, prepared for FinMark's scale-up to 3,000 orders/day, enhanced security segmentation for financial compliance.

**Week 8: Responding to Network Challenges and Security Mitigation**

* 🎯 **Weekly Goal:** Submit **Milestone 2 Draft 2** for feedback. Address the challenge scenario of a  **sudden 300% traffic spike** , implementing solutions to maintain network resilience and security under heavy load.
* 🚀 **Approach and Key Decisions:**
  * Redesign the network to stay resilient, implementing traffic management, prioritization, and **firewall rules** to handle surges effectively.
  * Focus on **handling traffic surges and mitigating attacks** using strategies like  **rate limiting** , **DDoS mitigation** (blacklisting IPs, geo-blocking, CDN rerouting), and deploying  **Intrusion Detection and Prevention Systems (IDPS)** .
  * Utilize **secure troubleshooting techniques** to diagnose and fix issues without compromising data integrity or privacy (e.g., SSH, `tcpdump` with filters, auditing).
* 🔥 **Problems Encountered and Solutions:**
  * Mitigate traffic surges (whether legitimate spikes or DDoS attacks) to prevent service disruption.
  * Detect and prevent unauthorized access or system overload.
  * Ensure **confidentiality and integrity** of system data during troubleshooting.
* 🛠️ **Tools Needed:**
  * **ab (Apache Benchmark)** for simulating traffic spikes.
  * **iptables** for basic rate limiting.
  * **Snort** for IDPS rules.
  * **SSH** (OpenSSH) for secure remote access.
  * **tcpdump** for lightweight packet capture with filters.
  * **Auditd** for system activity auditing.
  * **Wireshark** (with filters) for GUI-based packet inspection.
  * **Zabbix / Nagios Core** for monitoring and alerting.
* 📋 **Output/Deliverables:**
  * **Milestone 2 Draft 2 (Submission)** .
  * An **updated network configuration** (e.g., revised `tc` script, pfSense setup, or firewall rules) that demonstrates effective traffic management.
  * Conduct  **Peer Discussion #2** .
* 📚 **Resources Used:**
  * "Network Security".
  * "Handling traffic surges and mitigating attacks".
  * "Secure Troubleshooting Techniques".
* 🔍 **Other Considerations:** The principle of **least privilege** is crucial during secure troubleshooting.

**Week 9: Prototype Refinement and Presentation Preparation**

* 🎯 **Weekly Goal:** Continue refining the prototype, focusing on making it  **production-ready, scalable, and user-friendly** . Prepare the  **storyboard/outline for the Milestone 2 presentation** .
* 🚀 **Approach and Key Decisions:**
  * Review the current network design for efficiency and security (e.g., optimal  **firewall rules** , effective  **VLANs** , closed unnecessary ports).
  * Implement **layered security** by combining IP filtering, port restrictions, and authentication protocols.
  * Conduct **performance testing** and scalability improvements using tools like `iperf3`, `iftop`, and `Wireshark` to measure baseline performance under stress conditions.
* 🔥 **Problems Encountered and Solutions:**
  * Identify and revise firewall policies, VPN configurations, and access control rules for  **tighter security and improved structure** .
  * Simulate scenarios like traffic surges or limited bandwidth and refine the setup to ensure the system performs well under stress or attack.
  * Prepare to demonstrate how the updated platform gracefully manages issues and keeps critical operations running smoothly.
* 🛠️ **Tools Needed:**
  * **iperf3** ,  **iftop** , **Wireshark** (for performance measurement).
  * **tc (Linux)** or **pfSense** (for traffic shaping/QoS).
  * **Milestone 2 Presentation Template** (for storyboard).
* 📋 **Output/Deliverables:**
  * A simple **storyboard or outline (3-5 slides or 1-page bullet list)** covering the scenario, problems, changes made, and results.
  * Practice the explanation using the storyboard/talking points.
* 📚 **Resources Used:**
  * "Prototype Refinement and Testing (Network and Cybersecurity)".
  * "Cybersecurity Architecture: Application Security".
* 🔍 **Other Considerations:** The Milestone 2 presentation will combine the prototype demonstration and the storyboard. The best developers anticipate problems and build in resilience.

## 📅 **PHASE 4: FINALIZATION (WEEKS 10-12)**

**Week 10: Milestone 2: Refined Project Prototype Final Submission and Presentation**

* 🎯 **Weekly Goal:**  **Final submission of Milestone 2: Refined Project Prototype** . Present a live demonstration of the output during synchronous sessions, including how unexpected errors are handled.
* 🚀 **Approach and Key Decisions:**
  * Showcase the problem *before* the fix, explain changes clearly (the "why" as much as the "how"), and demonstrate the working solution live.
  * Highlight key sections in code, configuration, or pipeline that made the difference.
  * Ensure the prototype demonstrates **resilience** and **reliability** in handling challenges like traffic spikes and security vulnerabilities.
* 🔥 **Problems Encountered and Solutions:**
  * Demonstrate successful mitigation of **traffic surges** and effective implementation of **security controls** to prevent slowdowns and vulnerabilities.
  * Showcase the platform's ability to recover gracefully from simulated disruptions.
* 🛠️ **Tools Needed:** Live demonstration environment, relevant network and security configurations/scripts.
* 📋 **Output/Deliverables:**
  * **Milestone 2: Final Submission** (of the refined prototype).
  * Group presentations and prototype demonstrations based on specialization.
* 📚 **Resources Used:** All previous project documentation and configurations.
* 🔍 **Other Considerations:** The presentation is a key assessment of the ability to develop solutions that improve platform performance, scalability, and stability.

**Week 11: Terminal Assessment Preparation**

* 🎯 **Weekly Goal:** Prepare the  **Terminal Assessment Draft** . Conduct Peer Discussion #3.
* 🚀 **Approach and Key Decisions:**
  * Consolidate all project work and learning from previous weeks into a comprehensive final pitch presentation.
  * Focus on demonstrating the complete transformation of FinMark's network infrastructure from its vulnerable legacy state to a secure, resilient, enterprise-grade  **zero-trust security infrastructure** .
  * Articulate the **technical justifications** for design decisions, expected outcomes, and business impact.
* 🔥 **Problems Encountered and Solutions:**
  * Reflect on challenges faced during the project (e.g., ensuring performance and security don't conflict, making the system truly scalable and resilient).
  * Discuss the mindset and habits that helped in problem-solving and handling uncertainty.
* 🛠️ **Tools Needed:** Presentation  **Deck Template** .
* 📋 **Output/Deliverables:**
  * **Terminal Assessment (Draft)** .
  * **Peer Discussion #3** .
* 📚 **Resources Used:** All project documentation, including Milestone 1 and Milestone 2 outputs.
* 🔍 **Other Considerations:** This week focuses on the "Communicate developed solutions, technical justifications, and expected outcomes to stakeholders" course outcome.

**Week 12: Terminal Assessment: Project Final Pitch**

* 🎯 **Weekly Goal:** **Deliver the Project Final Pitch** to the CTO, showcasing the transformed network security infrastructure.
* 🚀 **Approach and Key Decisions:**
  * Present the  **final and refined project pitch** , combining the prototype demonstration with the comprehensive storyboard.
  * Clearly articulate how the implemented platform technologies directly address FinMark's initial pain points (unauthorized access incidents, system slowdowns) and achieve the CEO's goals (data security, access control, performance security).
  * Emphasize adherence to  **PDPA, GDPR, and PCI DSS** .
* 🔥 **Problems Encountered and Solutions:**
  * Highlight how the proposed and implemented solutions (e.g., RBAC, MFA, Load Balancers, IDS/IPS, secure remote access, traffic shaping) transformed the network from vulnerable to robust and secure.
  * Show how the new infrastructure supports **business continuity** and enhances **brand trust** and customer satisfaction by preventing data breaches and maintaining performance.
* 🛠️ **Tools Needed:** Final presentation deck, live demonstration environment.
* 📋 **Output/Deliverables:**
  * **Terminal Assessment: Project Final Pitch** .
  * Submission of final prototypes and presentation deck.
* 📚 **Resources Used:** The entirety of course materials and project documentation.
* 🔍 **Other Considerations:** The final pitch evaluates the ability to communicate solutions effectively, demonstrate entrepreneurial thinking, and build relationships with stakeholders.
