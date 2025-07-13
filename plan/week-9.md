Week 9 is centered on **Prototype Refinement and Presentation Preparation** for Project Finer FinMark, specifically for the Network and Cybersecurity specialization. This week builds upon the initial prototype developed in Weeks 6-7, translating plans into functional outputs and adapting to unexpected challenges.

**🎯 Weekly Goal:**
The primary goal for Week 9 is to  **continue refining the prototype** , with a focus on making it  **production-ready, scalable, and user-friendly** . This involves addressing challenges like the sudden 300% traffic spike scenario for FinMark. Simultaneously, you must  **prepare the storyboard/outline for the Milestone 2 presentation** , which will showcase the refined prototype and how it addresses the identified issues.

**🚀 Approach and Key Decisions:**
To achieve the refinement and preparation goals, the Network and Cybersecurity team will undertake several critical steps:

* **Reviewing and Refining the Current Network Design for Efficiency and Security** : This involves a thorough re-evaluation of FinMark's network design to ensure efficient traffic flows and robust security measures. The existing FinMark infrastructure has known limitations, including inadequate load balancing, insufficient security monitoring, and limited scalability, leading to performance degradation and unauthorized access incidents. The refinement will ensure that critical services are protected by  **optimal firewall rules** , effective  **VLANs for segmentation** , and by  **closing unnecessary ports** . This builds on the proposed network architecture from Milestone 1, which includes components like a Web Application Firewall (WAF), Intrusion Detection and Prevention Systems (IDS/IPS), Endpoint Detection and Response (EDR), and VLAN-based segmentation to separate client devices from sensitive systems.
* **Implementing Layered Security** : A key decision is to embrace a  **layered security strategy** , also known as "defense in depth". This means combining multiple security controls to protect the network at different points. This includes:
* **IP filtering** and  **port restrictions** : Applied via firewalls (like pfSense or iptables) to control incoming and outgoing network traffic.
* **Authentication protocols** : Such as **Multi-Factor Authentication (MFA)** and  **Role-Based Access Control (RBAC)** , which are mandatory as per FinMark's IT Manual. RBAC ensures access is strictly based on job roles, adhering to the principle of least privilege.
* **Conducting Performance Testing and Scalability Improvements** : To prepare for a  **sudden 300% traffic spike** , performance testing is crucial.
* Tools like **iperf3** will be used for **traffic generation and bandwidth stress testing** to simulate high-load events.
* **iftop** or **nload** will monitor  **real-time bandwidth usage** .
* **Wireshark** will be used for **packet capture and protocol inspection** to measure baseline performance under normal and stress conditions.
* Based on the analysis of packet loss, high latency, or bandwidth congestion, **traffic shaping** and **Quality of Service (QoS)** techniques will be applied using **tc (Linux)** commands or the **pfSense** WebGUI. This ensures that critical services (e.g., HTTPS on port 443 for checkout transactions) receive priority over non-essential traffic (e.g., image downloads on port 8080).

**🔥 Problems Encountered and Solutions:**
Week 9 directly addresses the FinMark challenges of system slowdowns during peak hours and unauthorized access incidents.

* **Identifying and Revising Firewall Policies, VPN Configurations, and Access Control Rules for Tighter Security and Improved Structure** :
* **Problem** : FinMark's current security model has weaknesses, indicated by unauthorized access and system slowdowns.
* **Solution** : **Firewall policies** will be rigorously reviewed and revised to enhance perimeter and internal security. **VPN configurations** will be strengthened to ensure all remote access is encrypted and audited. **Access control rules** will be tightened by fully implementing **RBAC** and  **MFA** , limiting access based on the principle of least privilege.
* **Simulating Scenarios like Traffic Surges or Limited Bandwidth and Refining the Setup** :
* **Problem** : The system needs to perform well under unexpected high traffic, such as the 300% spike, without slowdowns or vulnerabilities.
* **Solution** : Traffic surges will be simulated, and the network setup will be refined using **traffic shaping (tc/pfSense)** to prioritize critical financial transactions and manage non-essential traffic. This ensures the system maintains responsiveness even when under stress or attack.
* **Preparing to Demonstrate How the Updated Platform Gracefully Manages Issues and Keeps Critical Operations Running Smoothly** :
* **Problem** : The refined prototype needs to clearly showcase its resilience and reliability.
* **Solution** : The team will prepare to demonstrate how their updated network configuration effectively handles issues by maintaining system performance and security, recovering gracefully from simulated disruptions, and keeping critical operations running.

**🛠️ Tools Needed:**
The following tools are essential for Week 9 activities:

* **iperf3** : For  **traffic generation and bandwidth stress testing** .
* **iftop / nload** : For **real-time bandwidth monitoring** on Linux systems.
* **Wireshark** : A GUI-based tool for  **packet capture and protocol inspection** , enabling deep analysis of network traffic and filtering for specific data.
* **tc (Linux)** : A command-line utility for  **traffic control** , used to configure QoS, traffic shaping, and rate-limiting policies.
* **pfSense WebGUI** : A web-based interface for the **pfSense** firewall and routing platform, used to apply QoS rules and traffic shaping policies and configure load balancing.
* **Milestone 2 Presentation Template** : This template guides the creation of the **storyboard or outline** for the upcoming presentation.
* **ab (Apache Benchmark)** : For simulating traffic spikes on an endpoint.
* **iptables** : For applying basic rate limiting and firewall rules.
* **Snort** : An IDPS rule engine to detect patterns in traffic resembling known attack vectors.
* **SSH (OpenSSH)** : For secure remote terminal access to systems, preventing credentials and commands from being exposed.
* **Auditd** : A system activity auditing tool on Linux, crucial for logging troubleshooting actions and maintaining traceability.
* **Zabbix / Nagios Core** : Monitoring and alerting platforms that integrate with SNMP to track network device performance and send alerts.

**📋 Output/Deliverables:**
By the end of Week 9, the key deliverables are:

* **Milestone 2 Draft 2 Submission** : This is the refined prototype, accompanied by short documentation explaining the changes made, their necessity, and how they improved the platform's reliability, scalability, and functionality. For the Network and Cybersecurity track, this specifically includes **an updated network configuration (e.g., revised tc script, pfSense setup, or firewall rules)** that demonstrates effective traffic management under heavy load.
* **A simple storyboard or outline** (3-5 slides OR a 1-page bullet list) covering: the scenario/problem faced, what went wrong or could have gone wrong, steps taken to understand the problem, the changes or improvements made, and the results (brief before-and-after).
* **Practice the explanation** using the storyboard/talking points.
* **Conduct Peer Discussion #2** before submitting Milestone 2 Draft 2.

**📚 Resources Used:**
The learning for Week 9 primarily draws from:

* **"Prototype Refinement and Testing (Network and Cybersecurity)"** : This resource directly addresses the process of moving from a working setup to one that is secure, stable, and scalable, including reviewing network design, implementing layered security, and conducting performance testing.
* **"Cybersecurity Architecture: Application Security"** : This resource offers insights into securing applications within the broader cybersecurity architecture, reinforcing the importance of network security in protecting sensitive data.

**🔍 Other Considerations:**
The overarching principle for Week 9 is that  **real success comes from building systems that can adapt and recover when things go wrong** , as no platform is perfect on the first try. The best developers **anticipate problems** and  **build in resilience** . During secure troubleshooting, the **principle of least privilege** remains crucial, dictating that administrators should only use the minimum level of access required for a task to prevent compromising data integrity or privacy. The Milestone 2 presentation in Week 10 will combine this prototype demonstration with the prepared storyboard.
