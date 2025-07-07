const fs = require('fs-extra');
const chalk = require('chalk');

class NetworkTopologyGenerator {
  constructor() {
    this.devices = [];
    this.connections = [];
    this.vlans = [];
    this.securityZones = [];
  }

  // Add network devices
  addDevice(device) {
    this.devices.push({
      id: device.id,
      name: device.name,
      type: device.type, // router, switch, firewall, server, client
      ip: device.ip,
      subnet: device.subnet,
      vlan: device.vlan,
      securityZone: device.securityZone,
      ports: device.ports || [],
      status: device.status || 'active'
    });
  }

  // Add connections between devices
  addConnection(from, to, connectionType = 'ethernet', bandwidth = '1Gbps') {
    this.connections.push({
      from,
      to,
      type: connectionType,
      bandwidth,
      status: 'active',
      protocols: []
    });
  }

  // Generate Mermaid network diagram
  generateMermaidDiagram() {
    let diagram = `graph TB\n`;
    diagram += `    %% FinMark Network Topology\n`;
    diagram += `    %% Generated: ${new Date().toISOString()}\n\n`;

    // Add devices with styling
    this.devices.forEach(device => {
      const deviceLabel = `${device.name}\\n${device.type}\\n${device.ip}`;
      const nodeStyle = this.getDeviceStyle(device.type);
      diagram += `    ${device.id}["${deviceLabel}"]${nodeStyle}\n`;
    });

    diagram += `\n    %% Connections\n`;
    
    // Add connections
    this.connections.forEach(conn => {
      const label = `${conn.type}\\n${conn.bandwidth}`;
      diagram += `    ${conn.from} -->|"${label}"| ${conn.to}\n`;
    });

    // Add styling
    diagram += `\n    %% Styling\n`;
    diagram += `    classDef router fill:#ff6b6b,stroke:#d63031,stroke-width:2px,color:#fff\n`;
    diagram += `    classDef switch fill:#74b9ff,stroke:#0984e3,stroke-width:2px,color:#fff\n`;
    diagram += `    classDef firewall fill:#fd79a8,stroke:#e84393,stroke-width:2px,color:#fff\n`;
    diagram += `    classDef server fill:#00b894,stroke:#00a085,stroke-width:2px,color:#fff\n`;
    diagram += `    classDef client fill:#fdcb6e,stroke:#e17055,stroke-width:2px,color:#fff\n`;
    diagram += `    classDef loadbalancer fill:#a29bfe,stroke:#6c5ce7,stroke-width:2px,color:#fff\n`;

    return diagram;
  }

  getDeviceStyle(type) {
    const styleMap = {
      'router': ':::router',
      'switch': ':::switch', 
      'firewall': ':::firewall',
      'server': ':::server',
      'client': ':::client',
      'load-balancer': ':::loadbalancer'
    };
    return styleMap[type] || '';
  }

  // Generate network configuration for your Node.js setup
  generateNetworkConfig() {
    return {
      topology: {
        devices: this.devices,
        connections: this.connections
      },
      vlans: this.vlans,
      securityZones: this.securityZones,
      simulation: {
        totalDevices: this.devices.length,
        totalConnections: this.connections.length,
        networkSegments: this.vlans.length
      },
      metadata: {
        generated: new Date().toISOString(),
        version: "2.0.0",
        ciscoAligned: true,
        description: "FinMark Enterprise Network - Cisco Packet Tracer Aligned"
      }
    };
  }

  // Create FinMark's enterprise network topology based on Cisco Packet Tracer design
  createFinMarkNetwork() {
    // External network
    this.addDevice({
      id: 'INTERNET',
      name: 'Internet Cloud',
      type: 'cloud',
      ip: '0.0.0.0',
      subnet: '0.0.0.0/0'
    });

    // External Firewall (ASA5505 equivalent)
    this.addDevice({
      id: 'ASA_FIREWALL',
      name: 'FinMark External Firewall',
      type: 'firewall',
      ip: '203.0.113.1',
      subnet: '203.0.113.0/24',
      vlan: 'External',
      securityZone: 'Outside'
    });

    // Core Distribution Switch (Layer 3)
    this.addDevice({
      id: 'CORE_L3_SWITCH',
      name: 'Core Distribution Switch',
      type: 'switch',
      ip: '10.0.0.1',
      subnet: '10.0.0.0/16',
      vlan: 'Management',
      securityZone: 'Core'
    });

    // Finance Department Switch (VLAN 10)
    this.addDevice({
      id: 'SW_FINANCE',
      name: 'Finance Switch',
      type: 'switch',
      ip: '10.0.10.1',
      subnet: '10.0.10.0/24',
      vlan: 'VLAN_10_Finance',
      securityZone: 'Finance'
    });

    // HR Department Switch (VLAN 20)
    this.addDevice({
      id: 'SW_HR',
      name: 'HR Switch',
      type: 'switch',
      ip: '10.0.20.1',
      subnet: '10.0.20.0/24',
      vlan: 'VLAN_20_HR',
      securityZone: 'HR'
    });

    // Operations Department Switch (VLAN 30)
    this.addDevice({
      id: 'SW_OPERATIONS',
      name: 'Operations Switch',
      type: 'switch',
      ip: '10.0.30.1',
      subnet: '10.0.30.0/24',
      vlan: 'VLAN_30_Operations',
      securityZone: 'Operations'
    });

    // IT/Database Switch (VLAN 40)
    this.addDevice({
      id: 'SW_IT_DB',
      name: 'IT Database Switch',
      type: 'switch',
      ip: '10.0.40.1',
      subnet: '10.0.40.0/24',
      vlan: 'VLAN_40_IT_DB',
      securityZone: 'IT_Secure'
    });

    // DMZ Switch (VLAN 50)
    this.addDevice({
      id: 'SW_DMZ',
      name: 'DMZ Switch',
      type: 'switch',
      ip: '10.0.50.1',
      subnet: '10.0.50.0/24',
      vlan: 'VLAN_50_DMZ',
      securityZone: 'DMZ'
    });

    // Finance Department Devices
    this.addDevice({
      id: 'PC_FINANCE_01',
      name: 'Finance PC 01',
      type: 'client',
      ip: '10.0.10.10',
      subnet: '10.0.10.0/24',
      vlan: 'VLAN_10_Finance'
    });

    this.addDevice({
      id: 'PC_FINANCE_02',
      name: 'Finance PC 02',
      type: 'client',
      ip: '10.0.10.11',
      subnet: '10.0.10.0/24',
      vlan: 'VLAN_10_Finance'
    });

    this.addDevice({
      id: 'FINANCE_SERVER',
      name: 'Finance Server',
      type: 'server',
      ip: '10.0.10.50',
      subnet: '10.0.10.0/24',
      vlan: 'VLAN_10_Finance'
    });

    // HR Department Devices
    this.addDevice({
      id: 'PC_HR_01',
      name: 'HR PC 01',
      type: 'client',
      ip: '10.0.20.10',
      subnet: '10.0.20.0/24',
      vlan: 'VLAN_20_HR'
    });

    this.addDevice({
      id: 'HR_SERVER',
      name: 'HR Server',
      type: 'server',
      ip: '10.0.20.50',
      subnet: '10.0.20.0/24',
      vlan: 'VLAN_20_HR'
    });

    // Operations Department Devices
    this.addDevice({
      id: 'PC_OPS_01',
      name: 'Operations PC 01',
      type: 'client',
      ip: '10.0.30.10',
      subnet: '10.0.30.0/24',
      vlan: 'VLAN_30_Operations'
    });

    this.addDevice({
      id: 'OPS_SERVER',
      name: 'Operations Server',
      type: 'server',
      ip: '10.0.30.50',
      subnet: '10.0.30.0/24',
      vlan: 'VLAN_30_Operations'
    });

    // IT/Database Servers (VLAN 40)
    this.addDevice({
      id: 'DB_PRIMARY',
      name: 'Primary Database Server',
      type: 'server',
      ip: '10.0.40.10',
      subnet: '10.0.40.0/24',
      vlan: 'VLAN_40_IT_DB',
      ports: [1433, 22] // SQL Server and SSH
    });

    this.addDevice({
      id: 'DB_SECONDARY',
      name: 'Secondary Database Server',
      type: 'server',
      ip: '10.0.40.11',
      subnet: '10.0.40.0/24',
      vlan: 'VLAN_40_IT_DB',
      ports: [1433, 22]
    });

    // DMZ Web Servers (VLAN 50)
    this.addDevice({
      id: 'WEB_SERVER_1',
      name: 'Web Server 1',
      type: 'server',
      ip: '10.0.50.10',
      subnet: '10.0.50.0/24',
      vlan: 'VLAN_50_DMZ',
      ports: [80, 443]
    });

    this.addDevice({
      id: 'WEB_SERVER_2',
      name: 'Web Server 2',
      type: 'server',
      ip: '10.0.50.11',
      subnet: '10.0.50.0/24',
      vlan: 'VLAN_50_DMZ',
      ports: [80, 443]
    });

    this.addDevice({
      id: 'LOAD_BALANCER_VIP',
      name: 'Load Balancer VIP',
      type: 'load-balancer',
      ip: '10.0.50.20',
      subnet: '10.0.50.0/24',
      vlan: 'VLAN_50_DMZ'
    });

    // Define VLANs
    this.vlans = [
      { id: 10, name: 'Finance-Department', network: '10.0.10.0/24', gateway: '10.0.10.1' },
      { id: 20, name: 'HR-Department', network: '10.0.20.0/24', gateway: '10.0.20.1' },
      { id: 30, name: 'Operations-Department', network: '10.0.30.0/24', gateway: '10.0.30.1' },
      { id: 40, name: 'IT-Database-Department', network: '10.0.40.0/24', gateway: '10.0.40.1' },
      { id: 50, name: 'DMZ-WebServers', network: '10.0.50.0/24', gateway: '10.0.50.1' }
    ];

    // Define Security Zones
    this.securityZones = [
      { name: 'Outside', level: 0, description: 'Internet and external networks' },
      { name: 'DMZ', level: 25, description: 'Public-facing web servers' },
      { name: 'Core', level: 75, description: 'Core network infrastructure' },
      { name: 'Finance', level: 90, description: 'Financial data and systems' },
      { name: 'HR', level: 85, description: 'Human resources systems' },
      { name: 'Operations', level: 80, description: 'Operational systems' },
      { name: 'IT_Secure', level: 95, description: 'Critical IT infrastructure and databases' }
    ];

    // Add connections based on Cisco Packet Tracer topology
    this.addConnection('INTERNET', 'ASA_FIREWALL', 'fiber', '100Mbps');
    this.addConnection('ASA_FIREWALL', 'CORE_L3_SWITCH', 'ethernet', '1Gbps');
    
    // Core switch to department switches (trunk connections)
    this.addConnection('CORE_L3_SWITCH', 'SW_FINANCE', 'trunk', '1Gbps');
    this.addConnection('CORE_L3_SWITCH', 'SW_HR', 'trunk', '1Gbps');
    this.addConnection('CORE_L3_SWITCH', 'SW_OPERATIONS', 'trunk', '1Gbps');
    this.addConnection('CORE_L3_SWITCH', 'SW_IT_DB', 'trunk', '1Gbps');
    this.addConnection('CORE_L3_SWITCH', 'SW_DMZ', 'trunk', '1Gbps');

    // Department switches to devices (access connections)
    this.addConnection('SW_FINANCE', 'PC_FINANCE_01', 'access', '100Mbps');
    this.addConnection('SW_FINANCE', 'PC_FINANCE_02', 'access', '100Mbps');
    this.addConnection('SW_FINANCE', 'FINANCE_SERVER', 'access', '1Gbps');

    this.addConnection('SW_HR', 'PC_HR_01', 'access', '100Mbps');
    this.addConnection('SW_HR', 'HR_SERVER', 'access', '1Gbps');

    this.addConnection('SW_OPERATIONS', 'PC_OPS_01', 'access', '100Mbps');
    this.addConnection('SW_OPERATIONS', 'OPS_SERVER', 'access', '1Gbps');

    this.addConnection('SW_IT_DB', 'DB_PRIMARY', 'access', '1Gbps');
    this.addConnection('SW_IT_DB', 'DB_SECONDARY', 'access', '1Gbps');

    this.addConnection('SW_DMZ', 'WEB_SERVER_1', 'access', '1Gbps');
    this.addConnection('SW_DMZ', 'WEB_SERVER_2', 'access', '1Gbps');
    this.addConnection('SW_DMZ', 'LOAD_BALANCER_VIP', 'access', '1Gbps');

    // Database replication
    this.addConnection('DB_PRIMARY', 'DB_SECONDARY', 'replication', '1Gbps');
  }

  async saveTopology() {
    try {
      await fs.ensureDir('./docs/topology');
      
      // Save Mermaid diagram
      const mermaidDiagram = this.generateMermaidDiagram();
      await fs.writeFile('./docs/topology/finmark-network.mmd', mermaidDiagram);
      
      // Save as markdown with mermaid
      const markdownContent = `# FinMark Network Topology

## Current Network Architecture

\`\`\`mermaid
${mermaidDiagram}
\`\`\`

## Network Configuration

- **Total Devices**: ${this.devices.length}
- **Total Connections**: ${this.connections.length}
- **Security Zones**: DMZ, Web Tier, App Tier, DB Tier, Management
- **Redundancy**: Load balancing, Database clustering
- **Security**: Multi-layer firewall, WAF protection

## Device Inventory

${this.devices.map(device => `- **${device.name}** (${device.type}): ${device.ip}`).join('\n')}
`;
      
      await fs.writeFile('./docs/topology/finmark-network.md', markdownContent);
      
      // Save configuration
      const config = this.generateNetworkConfig();
      await fs.writeJson('./config/network-topology.json', config, { spaces: 2 });
      
      console.log(chalk.green('✓ Network topology saved to:'));
      console.log(chalk.blue('  - ./docs/topology/finmark-network.mmd'));
      console.log(chalk.blue('  - ./docs/topology/finmark-network.md'));
      console.log(chalk.blue('  - ./config/network-topology.json'));
      
    } catch (error) {
      console.error(chalk.red('Error saving topology:', error));
    }
  }
}

// Run if called directly
if (require.main === module) {
  const topology = new NetworkTopologyGenerator();
  topology.createFinMarkNetwork();
  topology.saveTopology();
}

module.exports = NetworkTopologyGenerator;
