#!/usr/bin/env node

/**
 * FinMark Intrusion Detection and Prevention System (IDPS) Simulator
 * Week 8: Advanced Security Monitoring and Threat Detection
 * 
 * Simulates Snort-like IDPS capabilities for detecting and preventing
 * network attacks during traffic surges
 */

const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

class IDPSMonitor {
  constructor() {
    this.rules = this.loadSecurityRules();
    this.threatDatabase = this.initializeThreatDatabase();
    this.alerts = [];
    this.blockedIPs = new Set();
    this.suspiciousPatterns = new Map();
    
    this.stats = {
      packetsAnalyzed: 0,
      threatsDetected: 0,
      attacksBlocked: 0,
      falsePositives: 0,
      trustedTraffic: 0
    };

    this.logFile = path.join(__dirname, '..', 'logs', `idps-analysis-${Date.now()}.json`);
  }

  /**
   * Load security rules (Snort-like rules)
   */
  loadSecurityRules() {
    return [
      {
        id: 'DDOS_DETECTION',
        name: 'DDoS Attack Detection',
        pattern: /high_frequency_requests/,
        severity: 'HIGH',
        action: 'BLOCK',
        threshold: 100, // requests per second from single IP
        description: 'Detects potential DDoS attacks based on request frequency'
      },
      {
        id: 'SQL_INJECTION',
        name: 'SQL Injection Attempt',
        pattern: /(union|select|insert|delete|drop|exec|script)/i,
        severity: 'CRITICAL',
        action: 'BLOCK',
        threshold: 1,
        description: 'Detects SQL injection attempts in HTTP parameters'
      },
      {
        id: 'XSS_ATTACK',
        name: 'Cross-Site Scripting',
        pattern: /<script[^>]*>.*?<\/script>/i,
        severity: 'HIGH',
        action: 'BLOCK',
        threshold: 1,
        description: 'Detects XSS attacks in web requests'
      },
      {
        id: 'BRUTE_FORCE',
        name: 'Brute Force Login',
        pattern: /failed_login_attempt/,
        severity: 'MEDIUM',
        action: 'MONITOR',
        threshold: 5, // failed attempts in 5 minutes
        description: 'Detects brute force login attempts'
      },
      {
        id: 'SUSPICIOUS_USER_AGENT',
        name: 'Suspicious User Agent',
        pattern: /(bot|crawler|scanner|nikto|sqlmap)/i,
        severity: 'MEDIUM',
        action: 'MONITOR',
        threshold: 1,
        description: 'Detects suspicious user agents indicating automated tools'
      },
      {
        id: 'PORT_SCAN',
        name: 'Port Scanning Activity',
        pattern: /port_scan_detected/,
        severity: 'HIGH',
        action: 'BLOCK',
        threshold: 10, // connections to different ports
        description: 'Detects port scanning activities'
      },
      {
        id: 'UNAUTHORIZED_ACCESS',
        name: 'Unauthorized Access Attempt',
        pattern: /401|403|unauthorized/,
        severity: 'MEDIUM',
        action: 'MONITOR',
        threshold: 10,
        description: 'Monitors unauthorized access attempts'
      },
      {
        id: 'MALFORMED_PACKET',
        name: 'Malformed Packet',
        pattern: /malformed|invalid_header/,
        severity: 'MEDIUM',
        action: 'DROP',
        threshold: 1,
        description: 'Detects malformed network packets'
      }
    ];
  }

  /**
   * Initialize threat intelligence database
   */
  initializeThreatDatabase() {
    return {
      knownMaliciousIPs: new Set([
        '192.168.100.666', // Simulated malicious IP
        '10.0.0.999',      // Simulated malicious IP
        '172.16.255.attack' // Simulated malicious IP
      ]),
      
      suspiciousCountries: new Set(['XX', 'YY', 'ZZ']), // Simulated geo-blocks
      
      knownAttackSignatures: [
        { signature: 'PAYLOAD_XSS', description: 'Cross-site scripting payload' },
        { signature: 'PAYLOAD_SQLi', description: 'SQL injection payload' },
        { signature: 'PAYLOAD_RFI', description: 'Remote file inclusion' },
        { signature: 'SCAN_NMAP', description: 'Nmap scan signature' }
      ]
    };
  }

  /**
   * Analyze network traffic for threats during traffic spike
   */
  async analyzeTrafficSpike(duration = 60, packetsPerSecond = 1000) {
    console.log(chalk.blue('\n🛡️  STARTING IDPS THREAT ANALYSIS 🛡️'));
    console.log(chalk.yellow(`Analyzing ${packetsPerSecond} packets/second for ${duration} seconds`));
    console.log(chalk.cyan('Monitoring for security threats during traffic spike...\n'));

    const startTime = Date.now();
    const analysisResults = [];

    for (let second = 0; second < duration; second++) {
      console.log(chalk.white(`Second ${second + 1}: Analyzing ${packetsPerSecond} packets...`));
      
      const secondResults = await this.analyzeSecond(packetsPerSecond);
      analysisResults.push({
        second: second + 1,
        ...secondResults
      });

      // Display alerts in real-time
      if (secondResults.newAlerts > 0) {
        console.log(chalk.red(`  ⚠️  ${secondResults.newAlerts} new threats detected!`));
      }

      // Display progress every 10 seconds
      if (second % 10 === 9) {
        this.displayRealTimeStats();
      }

      await new Promise(resolve => setTimeout(resolve, 50)); // Speed up for demo
    }

    const endTime = Date.now();
    const totalDuration = (endTime - startTime) / 1000;

    // Generate comprehensive security report
    const report = this.generateSecurityReport(analysisResults, totalDuration);
    this.saveResults(report);
    
    return report;
  }

  /**
   * Analyze packets for one second
   */
  async analyzeSecond(packetCount) {
    let newAlerts = 0;
    let blockedPackets = 0;
    let legitimateTraffic = 0;

    for (let i = 0; i < packetCount; i++) {
      const packet = this.generateSimulatedPacket();
      this.stats.packetsAnalyzed++;

      const threatAnalysis = this.analyzePacket(packet);
      
      if (threatAnalysis.isThreat) {
        this.handleThreat(packet, threatAnalysis);
        newAlerts++;
        
        if (threatAnalysis.action === 'BLOCK' || threatAnalysis.action === 'DROP') {
          blockedPackets++;
          this.stats.attacksBlocked++;
        }
      } else {
        legitimateTraffic++;
        this.stats.trustedTraffic++;
      }
    }

    return {
      newAlerts,
      blockedPackets,
      legitimateTraffic,
      analysisTime: Math.random() * 10 + 5 // 5-15ms processing time
    };
  }

  /**
   * Generate simulated network packet
   */
  generateSimulatedPacket() {
    const packetTypes = ['HTTP', 'HTTPS', 'SSH', 'FTP', 'DNS', 'SMTP'];
    const sources = [
      '192.168.1.100', '192.168.1.101', '192.168.1.102', // Legitimate
      '10.0.10.50', '10.0.20.30', '10.0.30.40',          // Internal
      '192.168.100.666', '203.0.113.attack',             // Malicious (5% chance)
      '172.16.0.scan', '198.51.100.bot'                  // Suspicious
    ];

    const destinations = ['10.0.50.10', '10.0.50.11', '10.0.40.20', '10.0.40.21'];
    
    // Simulate various attack scenarios (10% of traffic)
    const isAttack = Math.random() < 0.1;
    
    let payload = 'normal_request_data';
    let userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';
    
    if (isAttack) {
      const attackTypes = [
        { payload: "'; DROP TABLE users; --", userAgent: 'sqlmap/1.0' },
        { payload: '<script>alert("xss")</script>', userAgent: 'Mozilla/5.0' },
        { payload: 'high_frequency_requests', userAgent: 'custom_bot/1.0' },
        { payload: 'failed_login_attempt', userAgent: 'Mozilla/5.0' },
        { payload: 'port_scan_detected', userAgent: 'nmap' },
        { payload: 'malformed_invalid_header', userAgent: 'nikto' }
      ];
      
      const attack = attackTypes[Math.floor(Math.random() * attackTypes.length)];
      payload = attack.payload;
      userAgent = attack.userAgent;
    }

    return {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      source: {
        ip: sources[Math.floor(Math.random() * sources.length)],
        port: Math.floor(Math.random() * 65535) + 1024
      },
      destination: {
        ip: destinations[Math.floor(Math.random() * destinations.length)],
        port: [80, 443, 22, 25, 53][Math.floor(Math.random() * 5)]
      },
      protocol: packetTypes[Math.floor(Math.random() * packetTypes.length)],
      size: Math.floor(Math.random() * 1400) + 100,
      payload: payload,
      userAgent: userAgent,
      flags: isAttack ? ['SYN', 'FLOOD'] : ['ACK'],
      isAttack: isAttack
    };
  }

  /**
   * Analyze individual packet for threats
   */
  analyzePacket(packet) {
    const analysis = {
      isThreat: false,
      threatsDetected: [],
      severity: 'LOW',
      action: 'ALLOW',
      confidence: 0
    };

    // Check against known malicious IPs
    if (this.threatDatabase.knownMaliciousIPs.has(packet.source.ip)) {
      analysis.isThreat = true;
      analysis.threatsDetected.push('KNOWN_MALICIOUS_IP');
      analysis.severity = 'CRITICAL';
      analysis.action = 'BLOCK';
      analysis.confidence = 95;
    }

    // Apply security rules
    for (const rule of this.rules) {
      const ruleMatched = this.checkRule(packet, rule);
      
      if (ruleMatched) {
        analysis.isThreat = true;
        analysis.threatsDetected.push(rule.id);
        
        // Use highest severity found
        if (this.getSeverityLevel(rule.severity) > this.getSeverityLevel(analysis.severity)) {
          analysis.severity = rule.severity;
          analysis.action = rule.action;
        }
        
        analysis.confidence = Math.max(analysis.confidence, 80);
      }
    }

    // Frequency analysis for DDoS detection
    const sourceKey = packet.source.ip;
    if (!this.suspiciousPatterns.has(sourceKey)) {
      this.suspiciousPatterns.set(sourceKey, { count: 0, firstSeen: Date.now() });
    }
    
    const pattern = this.suspiciousPatterns.get(sourceKey);
    pattern.count++;
    
    // Check for high frequency from single source (simple DDoS detection)
    if (pattern.count > 50 && (Date.now() - pattern.firstSeen) < 5000) {
      analysis.isThreat = true;
      analysis.threatsDetected.push('HIGH_FREQUENCY_DDOS');
      analysis.severity = 'HIGH';
      analysis.action = 'BLOCK';
      analysis.confidence = 90;
    }

    return analysis;
  }

  /**
   * Check if packet matches security rule
   */
  checkRule(packet, rule) {
    const content = `${packet.payload} ${packet.userAgent}`.toLowerCase();
    
    switch (rule.id) {
      case 'DDOS_DETECTION':
        return packet.payload.includes('high_frequency_requests');
      
      case 'SQL_INJECTION':
        return rule.pattern.test(packet.payload);
      
      case 'XSS_ATTACK':
        return rule.pattern.test(packet.payload);
      
      case 'BRUTE_FORCE':
        return packet.payload.includes('failed_login_attempt');
      
      case 'SUSPICIOUS_USER_AGENT':
        return rule.pattern.test(packet.userAgent);
      
      case 'PORT_SCAN':
        return packet.payload.includes('port_scan_detected');
      
      case 'UNAUTHORIZED_ACCESS':
        return packet.payload.includes('401') || packet.payload.includes('403');
      
      case 'MALFORMED_PACKET':
        return packet.payload.includes('malformed') || packet.payload.includes('invalid_header');
      
      default:
        return false;
    }
  }

  /**
   * Handle detected threat
   */
  handleThreat(packet, analysis) {
    const alert = {
      id: `ALERT_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      timestamp: new Date().toISOString(),
      sourceIP: packet.source.ip,
      destinationIP: packet.destination.ip,
      threats: analysis.threatsDetected,
      severity: analysis.severity,
      action: analysis.action,
      confidence: analysis.confidence,
      description: this.generateThreatDescription(analysis.threatsDetected),
      packet: {
        id: packet.id,
        protocol: packet.protocol,
        size: packet.size,
        payload: packet.payload.substring(0, 100) // Truncate for logging
      }
    };

    this.alerts.push(alert);
    this.stats.threatsDetected++;

    // Implement blocking action
    if (analysis.action === 'BLOCK') {
      this.blockedIPs.add(packet.source.ip);
      console.log(chalk.red(`🚫 BLOCKED IP: ${packet.source.ip} - ${analysis.threatsDetected.join(', ')}`));
    }

    return alert;
  }

  /**
   * Generate threat description
   */
  generateThreatDescription(threats) {
    const descriptions = threats.map(threat => {
      const rule = this.rules.find(r => r.id === threat);
      return rule ? rule.description : `Unknown threat: ${threat}`;
    });
    
    return descriptions.join('; ');
  }

  /**
   * Get numeric severity level for comparison
   */
  getSeverityLevel(severity) {
    const levels = { 'LOW': 1, 'MEDIUM': 2, 'HIGH': 3, 'CRITICAL': 4 };
    return levels[severity] || 0;
  }

  /**
   * Display real-time statistics
   */
  displayRealTimeStats() {
    console.log(chalk.cyan('\n🛡️  Real-time IDPS Statistics:'));
    console.log(chalk.white(`  Packets Analyzed: ${this.stats.packetsAnalyzed.toLocaleString()}`));
    console.log(chalk.red(`  Threats Detected: ${this.stats.threatsDetected}`));
    console.log(chalk.yellow(`  Attacks Blocked: ${this.stats.attacksBlocked}`));
    console.log(chalk.green(`  Trusted Traffic: ${this.stats.trustedTraffic.toLocaleString()}`));
    console.log(chalk.blue(`  Blocked IPs: ${this.blockedIPs.size}`));
    console.log('');
  }

  /**
   * Generate comprehensive security report
   */
  generateSecurityReport(analysisResults, duration) {
    const totalPackets = this.stats.packetsAnalyzed;
    const threatDetectionRate = (this.stats.threatsDetected / totalPackets) * 100;
    const blockingEffectiveness = this.stats.attacksBlocked / this.stats.threatsDetected * 100;

    // Categorize threats by severity
    const threatsBySeverity = {
      CRITICAL: this.alerts.filter(a => a.severity === 'CRITICAL').length,
      HIGH: this.alerts.filter(a => a.severity === 'HIGH').length,
      MEDIUM: this.alerts.filter(a => a.severity === 'MEDIUM').length,
      LOW: this.alerts.filter(a => a.severity === 'LOW').length
    };

    // Top threat types
    const threatTypes = {};
    this.alerts.forEach(alert => {
      alert.threats.forEach(threat => {
        threatTypes[threat] = (threatTypes[threat] || 0) + 1;
      });
    });

    const report = {
      timestamp: new Date().toISOString(),
      scenario: 'Week 8: IDPS Analysis During Traffic Spike',
      duration: `${duration} seconds`,
      
      performance: {
        packetsAnalyzed: totalPackets,
        threatsDetected: this.stats.threatsDetected,
        attacksBlocked: this.stats.attacksBlocked,
        trustedTraffic: this.stats.trustedTraffic,
        threatDetectionRate: Math.round(threatDetectionRate * 100) / 100,
        blockingEffectiveness: Math.round(blockingEffectiveness * 100) / 100,
        packetsPerSecond: Math.round(totalPackets / duration)
      },

      threatAnalysis: {
        severityBreakdown: threatsBySeverity,
        topThreatTypes: Object.entries(threatTypes)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 5),
        blockedIPCount: this.blockedIPs.size,
        blockedIPs: Array.from(this.blockedIPs)
      },

      ruleEffectiveness: this.rules.map(rule => ({
        ruleId: rule.id,
        name: rule.name,
        triggeredCount: this.alerts.filter(a => a.threats.includes(rule.id)).length,
        effectiveness: rule.severity
      })),

      recommendations: this.generateSecurityRecommendations(threatDetectionRate, blockingEffectiveness),
      
      recentAlerts: this.alerts.slice(-10), // Last 10 alerts
      
      detailedResults: analysisResults
    };

    this.displaySecurityReport(report);
    return report;
  }

  /**
   * Generate security recommendations
   */
  generateSecurityRecommendations(detectionRate, blockingRate) {
    const recommendations = [];

    if (detectionRate > 15) {
      recommendations.push({
        priority: 'HIGH',
        category: 'Threat Level',
        issue: `High threat detection rate of ${detectionRate}% indicates active attack`,
        solution: 'Implement additional security layers and increase monitoring frequency'
      });
    }

    if (blockingRate < 80) {
      recommendations.push({
        priority: 'MEDIUM',
        category: 'Response Effectiveness',
        issue: `Blocking effectiveness of ${blockingRate}% could be improved`,
        solution: 'Review and optimize IDPS rules for more aggressive threat blocking'
      });
    }

    if (this.blockedIPs.size > 20) {
      recommendations.push({
        priority: 'MEDIUM',
        category: 'IP Management',
        issue: `${this.blockedIPs.size} IPs currently blocked`,
        solution: 'Review blocked IP list and implement automated cleanup policies'
      });
    }

    if (recommendations.length === 0) {
      recommendations.push({
        priority: 'INFO',
        category: 'Security Status',
        issue: 'IDPS performing within acceptable parameters',
        solution: 'Continue monitoring and maintain current security posture'
      });
    }

    return recommendations;
  }

  /**
   * Display formatted security report
   */
  displaySecurityReport(report) {
    console.log(chalk.blue('\n' + '='.repeat(60)));
    console.log(chalk.blue('        IDPS SECURITY ANALYSIS REPORT'));
    console.log(chalk.blue('='.repeat(60)));
    
    console.log(chalk.white(`\nScenario: ${report.scenario}`));
    console.log(chalk.white(`Duration: ${report.duration}`));
    
    console.log(chalk.cyan('\n🛡️  Performance Metrics:'));
    console.log(chalk.white(`  Packets Analyzed: ${report.performance.packetsAnalyzed.toLocaleString()}`));
    console.log(chalk.red(`  Threats Detected: ${report.performance.threatsDetected}`));
    console.log(chalk.yellow(`  Attacks Blocked: ${report.performance.attacksBlocked}`));
    console.log(chalk.green(`  Trusted Traffic: ${report.performance.trustedTraffic.toLocaleString()}`));
    console.log(chalk.cyan(`  Detection Rate: ${report.performance.threatDetectionRate}%`));
    console.log(chalk.cyan(`  Blocking Effectiveness: ${report.performance.blockingEffectiveness}%`));

    console.log(chalk.cyan('\n⚠️  Threat Breakdown by Severity:'));
    Object.entries(report.threatAnalysis.severityBreakdown).forEach(([severity, count]) => {
      const color = severity === 'CRITICAL' ? 'red' : 
                   severity === 'HIGH' ? 'yellow' : 
                   severity === 'MEDIUM' ? 'cyan' : 'white';
      console.log(chalk[color](`  ${severity}: ${count}`));
    });

    console.log(chalk.cyan('\n🎯 Top Threat Types:'));
    report.threatAnalysis.topThreatTypes.forEach(([threat, count]) => {
      console.log(chalk.white(`  ${threat}: ${count} detections`));
    });

    console.log(chalk.cyan('\n🚫 Blocked IPs:'));
    console.log(chalk.red(`  Total Blocked: ${report.threatAnalysis.blockedIPCount}`));
    if (report.threatAnalysis.blockedIPs.length > 0) {
      report.threatAnalysis.blockedIPs.slice(0, 5).forEach(ip => {
        console.log(chalk.red(`    ${ip}`));
      });
      if (report.threatAnalysis.blockedIPs.length > 5) {
        console.log(chalk.gray(`    ... and ${report.threatAnalysis.blockedIPs.length - 5} more`));
      }
    }

    console.log(chalk.cyan('\n💡 Security Recommendations:'));
    report.recommendations.forEach(rec => {
      const priorityColor = rec.priority === 'HIGH' ? 'red' : 
                           rec.priority === 'MEDIUM' ? 'yellow' : 'green';
      console.log(chalk[priorityColor](`  [${rec.priority}] ${rec.category}: ${rec.issue}`));
      console.log(chalk.white(`    → ${rec.solution}`));
    });

    console.log(chalk.blue('\n' + '='.repeat(60) + '\n'));
  }

  /**
   * Save results to file
   */
  saveResults(report) {
    const logDir = path.dirname(this.logFile);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    fs.writeFileSync(this.logFile, JSON.stringify(report, null, 2));
    console.log(chalk.green(`📁 IDPS Analysis saved to: ${this.logFile}`));
  }
}

// CLI Interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const duration = parseInt(args[0]) || 60;
  const packetsPerSecond = parseInt(args[1]) || 1000;

  const idps = new IDPSMonitor();
  
  console.log(chalk.green('🚀 Starting FinMark IDPS Security Analysis'));
  console.log(chalk.yellow(`Monitoring ${packetsPerSecond} packets/second for ${duration} seconds`));
  
  idps.analyzeTrafficSpike(duration, packetsPerSecond)
    .then(() => {
      console.log(chalk.green('✅ IDPS analysis completed successfully'));
    })
    .catch(error => {
      console.error(chalk.red('❌ Error in IDPS analysis:'), error);
      process.exit(1);
    });
}

module.exports = IDPSMonitor;
