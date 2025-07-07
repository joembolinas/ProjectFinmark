To effectively approach **Week 6: Core Network Component Development and Initial Testing** for Project Finer FinMark, you will focus on translating your Milestone 1 plans into functional network components and conducting initial tests. This week is crucial for setting up the foundational elements of your secure and scalable network prototype.

As a Network and Cybersecurity Specialist, your primary objective for Milestone 2 (Draft 1) is to  **deliver a securely configured network setup that simulates platform communication or protection** . This involves creating a working network simulation that demonstrates how devices, servers, and services interact securely within FinMark's platform, with consideration for secure protocols, access control, and basic fault tolerance.

Here’s a detailed, step-by-step guide on how to approach this week, including the tools you'll need and the tasks you must complete:

### **Step-by-Step Approach for Week 6: Core Network Component Development and Initial Testing**

#### **Step 1: Review Project Context and Milestone 1 Output**

Before diving into implementation,  **re-familiarize yourself with FinMark's current challenges and your proposed solutions from Milestone 1** .

* **Understand FinMark's Core Problem** : FinMark is experiencing rapid growth, but its existing system is overwhelmed, leading to critical issues like scalability crises (500 orders/day vs. projected 3,000 orders/day), performance degradation (20-second dashboard load time for 200 users), security vulnerabilities (unauthorized access incidents), and system instability.
* **Review Network and Cybersecurity Requirements** : As the Network & Cybersecurity team, your primary challenge is "Building a Secure, Resilient Network".
* **Goals** : Ensure financial data security, implement robust access control (role-based authentication), maintain performance during peak usage, and prevent damage to brand/customer trust.
* **Pain Points** : Unauthorized access incidents and system slowdowns during peak hours.
* **Needs** : A secure, role-based authentication system and a scalable infrastructure that supports secure performance under heavy load.
* **Recall Proposed Solutions from Milestone 1** : Your team's proposed network design includes a Web Application Firewall (WAF), Intrusion Detection and Prevention Systems (IDS/IPS), Endpoint Detection and Response (EDR), VLAN-based segmentation, Email Security Gateway (if applicable), Load Balancer, VPN with RBAC and MFA, Admin VLAN + Whitelisting, and CDN.

#### **Step 2: Set Up the Core Technical Environment**

This involves preparing your lab or simulation environment to start building.

* **Create and Organize Your Project Repository/File Structure** : Set up a dedicated folder for your network simulation files, configuration scripts, and documentation.
* **Install Required Packages, Frameworks, or Dependencies** : Based on your chosen tools, ensure they are installed and ready for use.
* **Network Simulation Tool** :  **Cisco Packet Tracer** . This is a required tool for your specialization.
* **Packet Capture/Analysis** :  **Wireshark** .
* **Traffic Monitoring** : **iftop** or  **nload** .
* **Traffic Generation/Stress Testing** :  **iperf3** .
* **QoS/Traffic Shaping** : **tc (Linux)** or  **pfSense WebGUI** .
* **Load Balancing** : **HAProxy** or  **Nginx** .
* **VPN Solutions (if applicable for your chosen core feature)** : **WireGuard** or  **OpenVPN** .
* **Monitoring** :  **Ntopng** ,  **SNMP-based tools** , or  **Zabbix** .
* **Create Basic Configuration Files** : Prepare any initial configuration files (e.g., for firewalls, load balancers, or VPNs).

#### **Step 3: Develop Core Network Components (Prototyping)**

This is where you translate your design into a functional simulation. For Milestone 2, you must deliver a functional prototype with  *one working core feature* . Given your specialization, this includes:

* **A. Implementing a Working VPN Configuration (Optional, if chosen as core)** :
* **Task** : Set up a VPN tunnel using WireGuard or OpenVPN within your simulation environment. This would demonstrate secure remote access, crucial for FinMark's operations, especially with sensitive financial data.
* **Rationale** : VPNs create encrypted tunnels, protecting data from eavesdropping and masking IP addresses, which is vital for secure remote work and protecting sensitive financial data.
* **B. Configuring a Firewall or Routing Rule that Filters or Prioritizes Traffic (Recommended)** : This directly addresses FinMark's need for security and performance under heavy load.
* **Sub-task 1: Simulate a High-Load Event** :
  *  **Tool** : `iperf3` or `ab` (Apache Benchmark).
  *  **Action** : Generate synthetic traffic to simulate FinMark's projected demand (3,000 orders/day, 200 concurrent users). Focus on HTTP/HTTPS traffic that mimics user requests, API calls, and potentially non-critical traffic like image downloads.
* **Sub-task 2: Capture and Analyze Traffic** :
  *  **Tool** :  **Wireshark** .
  *  **Action** : Capture live traffic during your simulated high-load event.
  *  **Filters** : Apply filters (e.g., `tcp.port == 443` for HTTPS checkout traffic, or `tcp.port == 8080` for image downloads, if simulated) to isolate critical and non-critical traffic.
* **Sub-task 3: Monitor Live Bandwidth Usage** :
  *  **Tool** : **iftop** or  **nload** .
  *  **Action** : Observe how bandwidth is utilized by different hosts or ports in real time during the simulated load.
* **Sub-task 4: Identify Congestion and Bottlenecks** :
  *  **Signs to look for** : High retransmissions, packet loss, or latency spikes in Wireshark captures, or disproportionate bandwidth consumption by non-critical traffic.
* **Sub-task 5: Apply Traffic Shaping or Quality of Service (QoS) Rules** :
  *  **Tool** : **tc (Linux)** or  **pfSense WebGUI** .
  *  **Action** : Configure rules to prioritize critical traffic (e.g., HTTPS on port 443 for FinMark's transactions) and limit bandwidth for non-critical services (e.g., image downloads on a specified port like 8080). This ensures that time-sensitive operations like customer checkouts or payment processing receive the necessary bandwidth.
* **Sub-task 6: Implement Load Balancing (if applicable for your chosen core feature)** :
  *  **Tool** : **HAProxy** or  **Nginx** .
  *  **Action** : Configure a load balancer to distribute incoming traffic across multiple simulated backend servers, ensuring no single server gets overloaded and the system remains available even if one server fails. Start with a basic round-robin configuration and implement health checks.
* **C. Other Security Measures** : Consider adding basic configurations for proposed security features from Milestone 1, such as firewalls or a simulated Intrusion Detection System (IDS) monitoring traffic patterns.

#### **Step 4: Conduct Initial Testing and Validation**

After setting up your components, test them thoroughly.

* **Perform Performance Validation** : Generate a **performance validation report** using tools like `iperf`, `nmap`, or by logging latency metrics.
* **Action** : Re-test your network setup after applying QoS/traffic shaping and load balancing rules.
* **Monitor for Improvements** : Check if checkout delays and misroutes are reduced and if non-critical traffic is limited without blocking essential functions.
* **Debug and Handle Errors** : As you build and test, you will encounter runtime errors.
* **Tools** :  **Browser Dev Tools** ,  **VS Code Debugger** ,  **Postman** , `console.log`/`console.error`.
* **Strategy** : Focus on identifying and handling common runtime errors like null/undefined values, invalid data formats, unhandled exceptions, timeouts, and type errors by using fallback values, input validation, try/catch blocks, setting timeouts, and type checks.

#### **Step 5: Prepare Short Documentation**

Document your work clearly for your Milestone 2 Draft 1 submission.

* **Explain What You Set Up and Why** : Describe the specific network components you configured (e.g., firewall rules, QoS policies, load balancer settings) and explain the rationale behind these choices in addressing FinMark's security and performance pain points.
* **Detail Challenges Encountered** : Describe any issues you faced during the setup and initial testing, and how you attempted to troubleshoot them.
* **Outline What Worked and What Needs Refinement** : Clearly state which aspects of your prototype are functional and what areas require further improvement for Milestone 2 (Final).
* **Include Deliverables for Network Optimization Practice** : If you followed the traffic optimization practice, include:
* **Screenshot(s)** showing monitored traffic or bandwidth patterns *before and after* QoS rules were applied.
* **A brief written summary** of issues detected (e.g., API call delays, bandwidth saturation) and specific actions taken to optimize traffic, along with observed outcomes.
* **Configuration script or screenshots** of your traffic shaping setup.
* **For Load Balancing Deliverables (if implemented)** : Include screenshots of load balancer logs/dashboard, a summary of behavior under different load scenarios, and an explanation of your chosen load balancing strategy and its impact.

#### **Step 6: Update Your Project Management Tool**

Ensure your Project Management Tool reflects your progress, tasks completed, and plans for the next phase. This includes identifying key assignments' performance, setting timelines for the new milestone, and aligning your targets to ensure your team stays on track.

By following these steps, you will be well-prepared to develop the core network components for FinMark's platform, ensuring it is secure, resilient, and ready for further development.
