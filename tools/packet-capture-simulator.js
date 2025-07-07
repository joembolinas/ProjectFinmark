const { spawn } = require('child_process');
const fs = require('fs-extra');
const chalk = require('chalk');
const path = require('path');

class PacketCaptureSimulator {
  constructor() {
    this.captureFile = null;
    this.isCapturing = false;
    this.packets = [];
    this.filters = [];
    this.vlanConfig = null;
    this.qosConfig = null;
    this.loadConfigurations();
  }

  // Load VLAN and QoS configurations
  async loadConfigurations() {
    try {
      const networkConfig = await fs.readJson('./config/network-topology.json');
      const qosConfig = await fs.readJson('./config/qos-config.json');
      this.vlanConfig = networkConfig.vlans || [];
      this.qosConfig = qosConfig;
      console.log(chalk.blue('✓ Network and QoS configurations loaded'));
    } catch (error) {
      console.log(chalk.yellow('⚠ Using default network configuration'));
      this.vlanConfig = [];
      this.qosConfig = { qosClasses: {}, vlanPolicies: {} };
    }
  }

  // Generate realistic VLAN-aware traffic simulation
  generateVlanTraffic(vlanId, duration = 30) {
    const packets = [];
    const vlanInfo = this.vlanConfig.find(v => v.id === vlanId);
    const vlanPolicy = this.qosConfig.vlanPolicies[`VLAN_${vlanId}_${vlanInfo?.name}`];
    
    if (!vlanInfo) {
      console.log(chalk.yellow(`Warning: VLAN ${vlanId} not found in configuration`));
      return packets;
    }

    const baseNetwork = vlanInfo.network.split('/')[0].split('.').slice(0, 3).join('.');
    const packetsPerSecond = Math.floor(Math.random() * 100) + 50; // 50-150 packets/sec
    const totalPackets = packetsPerSecond * duration;

    console.log(chalk.green(`Generating ${totalPackets} packets for VLAN ${vlanId} (${vlanInfo.name})`));

    for (let i = 0; i < totalPackets; i++) {
      const packet = this.generateVlanPacket(vlanId, baseNetwork, vlanPolicy, i);
      packets.push(packet);
    }

    return packets;
  }

  generateVlanPacket(vlanId, baseNetwork, vlanPolicy, packetId) {
    const protocols = ['TCP', 'UDP', 'ICMP'];
    const protocol = protocols[Math.floor(Math.random() * protocols.length)];
    
    // Generate source and destination IPs within VLAN
    const sourceHost = Math.floor(Math.random() * 254) + 1;
    const destHost = Math.floor(Math.random() * 254) + 1;
    const sourceIP = `${baseNetwork}.${sourceHost}`;
    const destIP = `${baseNetwork}.${destHost}`;

    // Determine QoS class based on port and VLAN policy
    const port = this.generateRealisticPort(vlanPolicy);
    const qosClass = this.classifyTraffic(port, protocol, vlanPolicy);
    const packetSize = this.generatePacketSize(qosClass);

    const packet = {
      id: packetId + 1,
      timestamp: new Date(Date.now() + (packetId * 10)).toISOString(),
      vlan: {
        id: vlanId,
        priority: this.getVlanPriority(qosClass)
      },
      source: {
        ip: sourceIP,
        port: protocol === 'ICMP' ? null : (Math.floor(Math.random() * 65535) + 1024),
        mac: this.generateMacAddress()
      },
      destination: {
        ip: destIP,
        port: protocol === 'ICMP' ? null : port,
        mac: this.generateMacAddress()
      },
      protocol: protocol,
      size: packetSize,
      qos: {
        class: qosClass,
        dscp: this.getDscpMarking(qosClass),
        priority: this.qosConfig.qosClasses[qosClass]?.priority || 5
      },
      flags: this.generateFlags(protocol),
      interVlanRouting: this.shouldRoute(vlanId, vlanPolicy)
    };

    return packet;
  }

  generateRealisticPort(vlanPolicy) {
    if (!vlanPolicy) return Math.floor(Math.random() * 65535) + 1024;

    const allowedClasses = vlanPolicy.allowedClasses || ['default'];
    const randomClass = allowedClasses[Math.floor(Math.random() * allowedClasses.length)];
    const qosClass = this.qosConfig.qosClasses[randomClass];
    
    if (qosClass && qosClass.ports && qosClass.ports.length > 0) {
      const ports = qosClass.ports.filter(p => typeof p === 'number');
      if (ports.length > 0) {
        return ports[Math.floor(Math.random() * ports.length)];
      }
    }

    // Common business application ports
    const businessPorts = [80, 443, 25, 110, 143, 993, 995, 1433, 3389];
    return businessPorts[Math.floor(Math.random() * businessPorts.length)];
  }

  classifyTraffic(port, protocol, vlanPolicy) {
    for (const [className, config] of Object.entries(this.qosConfig.qosClasses)) {
      if (config.ports && config.ports.includes(port)) {
        if (!vlanPolicy || !vlanPolicy.allowedClasses || vlanPolicy.allowedClasses.includes(className)) {
          return className;
        }
      }
    }
    return vlanPolicy?.defaultClass || 'default';
  }

  generatePacketSize(qosClass) {
    const sizeRanges = {
      voice: [160, 320],      // Small voice packets
      video: [1200, 1500],    // Large video frames
      critical_data: [64, 1500], // Variable data packets
      business_data: [64, 1200], // Typical business traffic
      default: [64, 1000]     // General traffic
    };
    
    const range = sizeRanges[qosClass] || sizeRanges.default;
    return Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
  }

  getVlanPriority(qosClass) {
    const priorityMap = {
      voice: 7,
      video: 6,
      critical_data: 5,
      business_data: 3,
      default: 0
    };
    return priorityMap[qosClass] || 0;
  }

  getDscpMarking(qosClass) {
    const dscpMap = {
      voice: 'EF',       // Expedited Forwarding
      video: 'AF41',     // Assured Forwarding 4-1
      critical_data: 'AF31', // Assured Forwarding 3-1
      business_data: 'AF21', // Assured Forwarding 2-1
      default: 'BE'      // Best Effort
    };
    return dscpMap[qosClass] || 'BE';
  }

  generateMacAddress() {
    const hex = '0123456789ABCDEF';
    let mac = '';
    for (let i = 0; i < 6; i++) {
      mac += hex[Math.floor(Math.random() * 16)] + hex[Math.floor(Math.random() * 16)];
      if (i < 5) mac += ':';
    }
    return mac;
  }

  generateFlags(protocol) {
    if (protocol === 'TCP') {
      const flags = ['SYN', 'ACK', 'FIN', 'RST', 'PSH', 'URG'];
      const numFlags = Math.floor(Math.random() * 3) + 1;
      const selectedFlags = [];
      for (let i = 0; i < numFlags; i++) {
        const flag = flags[Math.floor(Math.random() * flags.length)];
        if (!selectedFlags.includes(flag)) {
          selectedFlags.push(flag);
        }
      }
      return selectedFlags;
    }
    return [];
  }

  shouldRoute(vlanId, vlanPolicy) {
    if (!vlanPolicy || !vlanPolicy.accessControl) return false;
    
    const allowedVlans = vlanPolicy.accessControl.allowedVlans || [];
    return allowedVlans.length > 0 && Math.random() < 0.1; // 10% chance of inter-VLAN traffic
  }

  // Enhanced simulation with multiple VLANs
  async startVlanSimulation(vlans = [10, 20, 30, 40, 50], duration = 30) {
    console.log(chalk.green(`Starting VLAN-aware packet simulation for VLANs: ${vlans.join(', ')}`));
    
    await this.loadConfigurations();
    this.isCapturing = true;
    this.captureFile = `./logs/vlan-simulation-${Date.now()}.json`;
    
    await fs.ensureDir('./logs');
    
    let allPackets = [];
    
    // Generate traffic for each VLAN
    for (const vlanId of vlans) {
      const vlanPackets = this.generateVlanTraffic(vlanId, duration);
      allPackets = allPackets.concat(vlanPackets);
    }

    // Sort packets by timestamp
    allPackets.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    
    this.packets = allPackets;
    
    // Simulate QoS processing and congestion
    const processedPackets = this.simulateQosProcessing(allPackets);
    
    const simulationResults = {
      simulationInfo: {
        timestamp: new Date().toISOString(),
        duration: duration,
        vlans: vlans,
        totalPackets: processedPackets.length,
        qosEnabled: true
      },
      vlanStatistics: this.generateVlanStatistics(processedPackets),
      qosStatistics: this.generateQosStatistics(processedPackets),
      packets: processedPackets
    };
    
    await fs.writeJson(this.captureFile, simulationResults, { spaces: 2 });
    
    console.log(chalk.blue(`✓ VLAN simulation completed: ${this.captureFile}`));
    console.log(chalk.cyan(`  Total packets: ${processedPackets.length}`));
    console.log(chalk.cyan(`  VLANs simulated: ${vlans.length}`));
    
    return simulationResults;
  }

  simulateQosProcessing(packets) {
    console.log(chalk.blue('🔄 Applying QoS processing...'));
    
    return packets.map(packet => {
      const qosClass = packet.qos.class;
      const qosConfig = this.qosConfig.qosClasses[qosClass];
      
      // Simulate latency based on QoS class
      const baseLatency = parseInt(qosConfig?.latency) || 100;
      const jitter = Math.random() * 10; // Add some jitter
      packet.networkMetrics = {
        latency: baseLatency + jitter,
        jitter: jitter,
        dropProbability: this.calculateDropProbability(qosClass),
        dropped: false
      };
      
      // Simulate packet drops under congestion
      if (Math.random() < packet.networkMetrics.dropProbability) {
        packet.networkMetrics.dropped = true;
        packet.dropped = true;
      }
      
      return packet;
    }).filter(packet => !packet.dropped); // Remove dropped packets
  }

  calculateDropProbability(qosClass) {
    const dropRates = {
      voice: 0.001,        // 0.1% - Voice is high priority
      video: 0.002,        // 0.2% 
      critical_data: 0.005, // 0.5%
      business_data: 0.01,  // 1%
      default: 0.05        // 5% - Best effort traffic
    };
    return dropRates[qosClass] || 0.05;
  }

  generateVlanStatistics(packets) {
    const vlanStats = {};
    
    packets.forEach(packet => {
      const vlanId = packet.vlan.id;
      if (!vlanStats[vlanId]) {
        vlanStats[vlanId] = {
          totalPackets: 0,
          totalBytes: 0,
          avgLatency: 0,
          qosClasses: {}
        };
      }
      
      vlanStats[vlanId].totalPackets++;
      vlanStats[vlanId].totalBytes += packet.size;
      vlanStats[vlanId].avgLatency += packet.networkMetrics?.latency || 0;
      
      const qosClass = packet.qos.class;
      if (!vlanStats[vlanId].qosClasses[qosClass]) {
        vlanStats[vlanId].qosClasses[qosClass] = 0;
      }
      vlanStats[vlanId].qosClasses[qosClass]++;
    });
    
    // Calculate averages
    Object.keys(vlanStats).forEach(vlanId => {
      vlanStats[vlanId].avgLatency = vlanStats[vlanId].avgLatency / vlanStats[vlanId].totalPackets;
      vlanStats[vlanId].avgPacketSize = vlanStats[vlanId].totalBytes / vlanStats[vlanId].totalPackets;
    });
    
    return vlanStats;
  }

  generateQosStatistics(packets) {
    const qosStats = {};
    
    packets.forEach(packet => {
      const qosClass = packet.qos.class;
      if (!qosStats[qosClass]) {
        qosStats[qosClass] = {
          totalPackets: 0,
          totalBytes: 0,
          avgLatency: 0,
          droppedPackets: 0
        };
      }
      
      qosStats[qosClass].totalPackets++;
      qosStats[qosClass].totalBytes += packet.size;
      qosStats[qosClass].avgLatency += packet.networkMetrics?.latency || 0;
      if (packet.networkMetrics?.dropped) {
        qosStats[qosClass].droppedPackets++;
      }
    });
    
    // Calculate averages and percentages
    Object.keys(qosStats).forEach(qosClass => {
      qosStats[qosClass].avgLatency = qosStats[qosClass].avgLatency / qosStats[qosClass].totalPackets;
      qosStats[qosClass].dropRate = (qosStats[qosClass].droppedPackets / qosStats[qosClass].totalPackets) * 100;
    });
    
    return qosStats;
  }

  // Demonstrate packet analysis for FinMark scenario
  async simulateFinMarkTraffic() {
    console.log(chalk.blue('Simulating FinMark high-load scenario...'));
    
    // Simulate 3000 orders/day traffic pattern
    const simulatedPackets = [];
    const now = new Date();
    
    // Generate realistic traffic patterns
    for (let i = 0; i < 200; i++) { // 200 concurrent users
      // HTTPS checkout traffic
      simulatedPackets.push({
        id: i * 3 + 1,
        timestamp: new Date(now.getTime() + i * 1000).toISOString(),
        source: { ip: `192.168.1.${100 + (i % 50)}`, port: 50000 + i },
        destination: { ip: '10.1.1.21', port: 443 },
        protocol: 'TCP',
        state: 'Established',
        size: 1420,
        flags: ['ACK'],
        application: 'HTTPS-Checkout'
      });
      
      // API calls to backend
      simulatedPackets.push({
        id: i * 3 + 2,
        timestamp: new Date(now.getTime() + i * 1000 + 200).toISOString(),
        source: { ip: '10.1.1.21', port: 50000 + i },
        destination: { ip: '10.1.2.21', port: 8080 },
        protocol: 'TCP',
        state: 'Established',
        size: 512,
        flags: ['ACK'],
        application: 'API-Backend'
      });
      
      // Database queries
      simulatedPackets.push({
        id: i * 3 + 3,
        timestamp: new Date(now.getTime() + i * 1000 + 400).toISOString(),
        source: { ip: '10.1.2.21', port: 40000 + i },
        destination: { ip: '10.1.3.21', port: 5432 },
        protocol: 'TCP',
        state: 'Established',
        size: 256,
        flags: ['ACK'],
        application: 'Database-Query'
      });
    }
    
    this.packets = simulatedPackets;
    
    // Save simulated capture
    this.captureFile = `./logs/finmark-simulation-${Date.now()}.json`;
    await fs.writeJson(this.captureFile, {
      captureInfo: {
        timestamp: new Date().toISOString(),
        scenario: 'FinMark High Load - 200 concurrent users',
        totalPackets: simulatedPackets.length,
        interface: 'Simulated'
      },
      packets: simulatedPackets
    }, { spaces: 2 });
    
    console.log(chalk.green(`FinMark simulation saved to: ${this.captureFile}`));
    
    // Generate analysis
    await this.generateAnalysisReport();
    
    return simulatedPackets;
  }
}

// Run if called directly
if (require.main === module) {
  const capture = new PacketCaptureSimulator();
  
  // Demo the capabilities
  capture.simulateFinMarkTraffic()
    .then(() => {
      // Demonstrate filtering
      const httpsTraffic = capture.applyFilter('tcp and port 443');
      console.log(chalk.yellow(`Filtered HTTPS traffic: ${httpsTraffic.length} packets`));
      
      const apiTraffic = capture.applyFilter('tcp and port 8080');
      console.log(chalk.yellow(`Filtered API traffic: ${apiTraffic.length} packets`));
    })
    .catch(console.error);
}

module.exports = PacketCaptureSimulator;
