#!/usr/bin/env node

/**
 * FinMark Rate Limiting and DDoS Mitigation Simulator
 * Week 8: Traffic Control and Attack Prevention
 * 
 * Simulates iptables/nginx rate limiting and DDoS mitigation
 * capabilities during traffic surge scenarios
 */

const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

class RateLimiter {
  constructor() {
    this.rateLimitRules = this.initializeRateLimitRules();
    this.connectionTracking = new Map(); // IP -> connection info
    this.blockedIPs = new Map(); // IP -> block info
    this.whitelistedIPs = new Set(['10.0.0.0/8', '192.168.1.0/24']); // Internal networks
    
    this.stats = {
      totalRequests: 0,
      allowedRequests: 0,
      rateLimitedRequests: 0,
      blockedRequests: 0,
      ddosAttacksDetected: 0,
      legitimateTraffic: 0
    };

    this.logFile = path.join(__dirname, '..', 'logs', `rate-limiter-${Date.now()}.json`);
  }

  /**
   * Initialize rate limiting rules (similar to iptables rules)
   */
  initializeRateLimitRules() {
    return {
      // Global rate limits
      global: {
        requestsPerSecond: 1000,
        burstLimit: 1500,
        windowSize: 1000 // 1 second window
      },
      
      // Per-IP rate limits
      perIP: {
        requestsPerSecond: 50,
        burstLimit: 100,
        windowSize: 1000,
        blockDuration: 300000 // 5 minutes
      },
      
      // Endpoint-specific limits
      endpoints: {
        '/api/login': {
          requestsPerSecond: 5,
          burstLimit: 10,
          windowSize: 60000, // 1 minute window
          blockDuration: 900000 // 15 minutes for login attempts
        },
        '/api/checkout': {
          requestsPerSecond: 20,
          burstLimit: 40,
          windowSize: 1000
        },
        '/api/search': {
          requestsPerSecond: 100,
          burstLimit: 200,
          windowSize: 1000
        },
        '/static/*': {
          requestsPerSecond: 200,
          burstLimit: 500,
          windowSize: 1000
        }
      },
      
      // DDoS detection thresholds
      ddosDetection: {
        connectionThreshold: 200, // connections per IP
        requestThreshold: 500,    // requests per second per IP
        suspiciousPatternThreshold: 100,
        autoBlockDuration: 3600000 // 1 hour
      }
    };
  }

  /**
   * Simulate traffic spike with rate limiting
   */
  async simulateRateLimiting(duration = 60, requestsPerSecond = 2000) {
    console.log(chalk.blue('\n🚦 STARTING RATE LIMITING SIMULATION 🚦'));
    console.log(chalk.yellow(`Incoming RPS: ${requestsPerSecond} (300% above normal)`));
    console.log(chalk.cyan(`Duration: ${duration} seconds`));
    console.log(chalk.white('Applying rate limiting and DDoS mitigation...\n'));

    const startTime = Date.now();
    const results = [];

    for (let second = 0; second < duration; second++) {
      console.log(chalk.white(`Second ${second + 1}: Processing ${requestsPerSecond} requests...`));
      
      const secondResults = await this.processSecond(requestsPerSecond);
      results.push({
        second: second + 1,
        ...secondResults
      });

      // Clean up expired blocks and connections
      this.cleanupExpiredEntries();

      // Display alerts for DDoS detection
      if (secondResults.ddosDetected > 0) {
        console.log(chalk.red(`  🚨 ${secondResults.ddosDetected} DDoS attacks detected and mitigated!`));
      }

      // Display real-time stats every 10 seconds
      if (second % 10 === 9) {
        this.displayRealTimeStats();
      }

      await new Promise(resolve => setTimeout(resolve, 50)); // Speed up for demo
    }

    const endTime = Date.now();
    const totalDuration = (endTime - startTime) / 1000;

    // Generate comprehensive report
    const report = this.generateRateLimitingReport(results, totalDuration);
    this.saveResults(report);
    
    return report;
  }

  /**
   * Process requests for one second
   */
  async processSecond(requestCount) {
    let allowed = 0;
    let rateLimited = 0;
    let blocked = 0;
    let ddosDetected = 0;

    for (let i = 0; i < requestCount; i++) {
      const request = this.generateSimulatedRequest();
      this.stats.totalRequests++;

      const decision = this.evaluateRequest(request);
      
      switch (decision.action) {
        case 'ALLOW':
          allowed++;
          this.stats.allowedRequests++;
          if (!decision.suspicious) {
            this.stats.legitimateTraffic++;
          }
          break;
          
        case 'RATE_LIMIT':
          rateLimited++;
          this.stats.rateLimitedRequests++;
          break;
          
        case 'BLOCK':
          blocked++;
          this.stats.blockedRequests++;
          if (decision.reason === 'DDOS_DETECTED') {
            ddosDetected++;
            this.stats.ddosAttacksDetected++;
          }
          break;
      }

      // Track connection for this IP
      this.trackConnection(request.sourceIP, decision);
    }

    return {
      allowed,
      rateLimited,
      blocked,
      ddosDetected,
      processingTime: Math.random() * 5 + 2 // 2-7ms processing time
    };
  }

  /**
   * Generate simulated HTTP request
   */
  generateSimulatedRequest() {
    const endpoints = ['/api/login', '/api/checkout', '/api/search', '/static/images', '/api/balance', '/'];
    const userAgents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      'curl/7.68.0', // Potentially suspicious
      'python-requests/2.25.1', // API client
      'DDoSBot/1.0', // Obviously malicious
      'sqlmap/1.0' // Attack tool
    ];

    // Generate IP addresses with varying legitimacy
    let sourceIP;
    const ipType = Math.random();
    
    if (ipType < 0.7) {
      // 70% legitimate internal/external IPs
      sourceIP = `192.168.1.${Math.floor(Math.random() * 100) + 100}`;
    } else if (ipType < 0.85) {
      // 15% external legitimate
      sourceIP = `203.0.113.${Math.floor(Math.random() * 100) + 1}`;
    } else {
      // 15% suspicious/attack IPs
      const attackIPs = [
        '192.168.100.666', '10.0.0.999', '172.16.255.attack',
        '198.51.100.bot', '203.0.113.ddos', '192.0.2.scan'
      ];
      sourceIP = attackIPs[Math.floor(Math.random() * attackIPs.length)];
    }

    return {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      sourceIP: sourceIP,
      endpoint: endpoints[Math.floor(Math.random() * endpoints.length)],
      method: ['GET', 'POST', 'PUT', 'DELETE'][Math.floor(Math.random() * 4)],
      userAgent: userAgents[Math.floor(Math.random() * userAgents.length)],
      size: Math.floor(Math.random() * 2000) + 100,
      isAttack: sourceIP.includes('attack') || sourceIP.includes('bot') || sourceIP.includes('ddos') || sourceIP.includes('scan')
    };
  }

  /**
   * Evaluate request against rate limiting rules
   */
  evaluateRequest(request) {
    const now = Date.now();
    const decision = {
      action: 'ALLOW',
      reason: 'NORMAL_TRAFFIC',
      suspicious: false,
      rules_applied: []
    };

    // Check if IP is already blocked
    if (this.blockedIPs.has(request.sourceIP)) {
      const blockInfo = this.blockedIPs.get(request.sourceIP);
      if (now < blockInfo.expiresAt) {
        decision.action = 'BLOCK';
        decision.reason = 'IP_BLOCKED';
        return decision;
      } else {
        this.blockedIPs.delete(request.sourceIP);
      }
    }

    // Check whitelist
    if (this.isWhitelisted(request.sourceIP)) {
      decision.reason = 'WHITELISTED';
      return decision;
    }

    // Get or create connection tracking for this IP
    if (!this.connectionTracking.has(request.sourceIP)) {
      this.connectionTracking.set(request.sourceIP, {
        requests: [],
        firstSeen: now,
        totalRequests: 0,
        suspiciousActivity: 0
      });
    }

    const tracking = this.connectionTracking.get(request.sourceIP);
    tracking.requests.push(now);
    tracking.totalRequests++;

    // Clean old requests (outside window)
    tracking.requests = tracking.requests.filter(
      timestamp => now - timestamp < this.rateLimitRules.perIP.windowSize
    );

    // Check for DDoS patterns
    const ddosCheck = this.checkDDoSPatterns(request, tracking);
    if (ddosCheck.isDDoS) {
      this.blockIP(request.sourceIP, ddosCheck.blockDuration, 'DDOS_DETECTED');
      decision.action = 'BLOCK';
      decision.reason = 'DDOS_DETECTED';
      decision.suspicious = true;
      return decision;
    }

    // Apply endpoint-specific rate limits
    const endpointRule = this.getEndpointRule(request.endpoint);
    if (endpointRule) {
      const endpointCheck = this.checkEndpointRateLimit(request, tracking, endpointRule);
      if (!endpointCheck.allowed) {
        decision.action = 'RATE_LIMIT';
        decision.reason = 'ENDPOINT_RATE_LIMIT';
        decision.rules_applied.push(`endpoint:${request.endpoint}`);
        
        if (endpointCheck.shouldBlock) {
          this.blockIP(request.sourceIP, endpointRule.blockDuration || 300000, 'RATE_LIMIT_EXCEEDED');
          decision.action = 'BLOCK';
          decision.reason = 'RATE_LIMIT_BLOCK';
        }
        return decision;
      }
    }

    // Apply per-IP rate limits
    const perIPCheck = this.checkPerIPRateLimit(tracking);
    if (!perIPCheck.allowed) {
      decision.action = 'RATE_LIMIT';
      decision.reason = 'PER_IP_RATE_LIMIT';
      decision.rules_applied.push('per-ip');
      
      if (perIPCheck.shouldBlock) {
        this.blockIP(request.sourceIP, this.rateLimitRules.perIP.blockDuration, 'RATE_LIMIT_EXCEEDED');
        decision.action = 'BLOCK';
        decision.reason = 'RATE_LIMIT_BLOCK';
      }
      return decision;
    }

    // Check for suspicious patterns
    if (this.isSuspiciousRequest(request, tracking)) {
      decision.suspicious = true;
      tracking.suspiciousActivity++;
    }

    return decision;
  }

  /**
   * Check for DDoS attack patterns
   */
  checkDDoSPatterns(request, tracking) {
    const rules = this.rateLimitRules.ddosDetection;
    const now = Date.now();
    
    // Check request frequency (requests per second)
    const recentRequests = tracking.requests.filter(timestamp => now - timestamp < 1000);
    if (recentRequests.length > rules.requestThreshold) {
      return {
        isDDoS: true,
        blockDuration: rules.autoBlockDuration,
        pattern: 'HIGH_FREQUENCY'
      };
    }

    // Check total connections
    if (tracking.totalRequests > rules.connectionThreshold) {
      return {
        isDDoS: true,
        blockDuration: rules.autoBlockDuration,
        pattern: 'CONNECTION_FLOOD'
      };
    }

    // Check suspicious activity accumulation
    if (tracking.suspiciousActivity > rules.suspiciousPatternThreshold) {
      return {
        isDDoS: true,
        blockDuration: rules.autoBlockDuration,
        pattern: 'SUSPICIOUS_PATTERN'
      };
    }

    // Check for obvious attack signatures
    if (request.userAgent.includes('Bot') || request.userAgent.includes('attack') || 
        request.sourceIP.includes('attack') || request.sourceIP.includes('ddos')) {
      return {
        isDDoS: true,
        blockDuration: rules.autoBlockDuration,
        pattern: 'ATTACK_SIGNATURE'
      };
    }

    return { isDDoS: false };
  }

  /**
   * Check endpoint-specific rate limits
   */
  checkEndpointRateLimit(request, tracking, rule) {
    const now = Date.now();
    const windowSize = rule.windowSize || 1000;
    
    // Count requests to this endpoint in the window
    const endpointRequests = tracking.requests.filter(timestamp => now - timestamp < windowSize);
    
    const allowed = endpointRequests.length <= rule.requestsPerSecond;
    const shouldBlock = endpointRequests.length > (rule.burstLimit || rule.requestsPerSecond * 2);
    
    return { allowed, shouldBlock };
  }

  /**
   * Check per-IP rate limits
   */
  checkPerIPRateLimit(tracking) {
    const rule = this.rateLimitRules.perIP;
    const now = Date.now();
    
    const recentRequests = tracking.requests.filter(timestamp => now - timestamp < rule.windowSize);
    
    const allowed = recentRequests.length <= rule.requestsPerSecond;
    const shouldBlock = recentRequests.length > rule.burstLimit;
    
    return { allowed, shouldBlock };
  }

  /**
   * Get endpoint-specific rule
   */
  getEndpointRule(endpoint) {
    const rules = this.rateLimitRules.endpoints;
    
    // Exact match first
    if (rules[endpoint]) {
      return rules[endpoint];
    }
    
    // Pattern matching for wildcard rules
    for (const pattern in rules) {
      if (pattern.includes('*')) {
        const regex = new RegExp(pattern.replace('*', '.*'));
        if (regex.test(endpoint)) {
          return rules[pattern];
        }
      }
    }
    
    return null;
  }

  /**
   * Check if request is suspicious
   */
  isSuspiciousRequest(request, tracking) {
    // Suspicious user agents
    const suspiciousAgents = ['curl', 'bot', 'crawler', 'scanner', 'attack', 'sqlmap', 'nikto'];
    if (suspiciousAgents.some(agent => request.userAgent.toLowerCase().includes(agent))) {
      return true;
    }

    // Suspicious endpoints
    if (request.endpoint.includes('admin') || request.endpoint.includes('config') || 
        request.endpoint.includes('.php') || request.endpoint.includes('.asp')) {
      return true;
    }

    // Rapid requests to different endpoints
    const recentEndpoints = new Set();
    tracking.requests.slice(-10).forEach(() => {
      recentEndpoints.add(request.endpoint);
    });
    
    if (recentEndpoints.size > 5) {
      return true;
    }

    return false;
  }

  /**
   * Check if IP is whitelisted
   */
  isWhitelisted(ip) {
    // Simple whitelist check for internal networks
    return ip.startsWith('192.168.1.') || ip.startsWith('10.0.');
  }

  /**
   * Block IP address
   */
  blockIP(ip, duration, reason) {
    const expiresAt = Date.now() + duration;
    this.blockedIPs.set(ip, {
      blockedAt: Date.now(),
      expiresAt: expiresAt,
      reason: reason
    });
    
    console.log(chalk.red(`🚫 BLOCKED IP: ${ip} for ${Math.round(duration/1000)}s - ${reason}`));
  }

  /**
   * Track connection info
   */
  trackConnection(ip, decision) {
    if (!this.connectionTracking.has(ip)) {
      return;
    }
    
    const tracking = this.connectionTracking.get(ip);
    tracking.lastAction = decision.action;
    tracking.lastReason = decision.reason;
  }

  /**
   * Clean up expired entries
   */
  cleanupExpiredEntries() {
    const now = Date.now();
    
    // Clean up expired blocks
    for (const [ip, blockInfo] of this.blockedIPs.entries()) {
      if (now >= blockInfo.expiresAt) {
        this.blockedIPs.delete(ip);
        console.log(chalk.green(`✅ UNBLOCKED IP: ${ip} - block expired`));
      }
    }

    // Clean up old connection tracking
    for (const [ip, tracking] of this.connectionTracking.entries()) {
      if (now - tracking.firstSeen > 3600000) { // 1 hour old
        this.connectionTracking.delete(ip);
      }
    }
  }

  /**
   * Display real-time statistics
   */
  displayRealTimeStats() {
    console.log(chalk.cyan('\n🚦 Real-time Rate Limiting Statistics:'));
    console.log(chalk.white(`  Total Requests: ${this.stats.totalRequests.toLocaleString()}`));
    console.log(chalk.green(`  Allowed: ${this.stats.allowedRequests.toLocaleString()}`));
    console.log(chalk.yellow(`  Rate Limited: ${this.stats.rateLimitedRequests.toLocaleString()}`));
    console.log(chalk.red(`  Blocked: ${this.stats.blockedRequests.toLocaleString()}`));
    console.log(chalk.red(`  DDoS Attacks: ${this.stats.ddosAttacksDetected}`));
    console.log(chalk.blue(`  Currently Blocked IPs: ${this.blockedIPs.size}`));
    console.log(chalk.cyan(`  Active Connections: ${this.connectionTracking.size}`));
    console.log('');
  }

  /**
   * Generate comprehensive rate limiting report
   */
  generateRateLimitingReport(results, duration) {
    const totalRequests = this.stats.totalRequests;
    const allowedPercentage = (this.stats.allowedRequests / totalRequests) * 100;
    const blockedPercentage = (this.stats.blockedRequests / totalRequests) * 100;
    const rateLimitedPercentage = (this.stats.rateLimitedRequests / totalRequests) * 100;

    const report = {
      timestamp: new Date().toISOString(),
      scenario: 'Week 8: Rate Limiting During 300% Traffic Spike',
      duration: `${duration} seconds`,
      
      performance: {
        totalRequests,
        allowedRequests: this.stats.allowedRequests,
        rateLimitedRequests: this.stats.rateLimitedRequests,
        blockedRequests: this.stats.blockedRequests,
        ddosAttacksDetected: this.stats.ddosAttacksDetected,
        legitimateTraffic: this.stats.legitimateTraffic,
        
        percentages: {
          allowed: Math.round(allowedPercentage * 100) / 100,
          rateLimited: Math.round(rateLimitedPercentage * 100) / 100,
          blocked: Math.round(blockedPercentage * 100) / 100
        },
        
        requestsPerSecond: Math.round(totalRequests / duration),
        mitigation_effectiveness: Math.round((this.stats.blockedRequests + this.stats.rateLimitedRequests) / totalRequests * 100 * 100) / 100
      },

      securityStatus: {
        currentlyBlockedIPs: this.blockedIPs.size,
        activeConnections: this.connectionTracking.size,
        topBlockedIPs: this.getTopBlockedIPs(),
        blockReasons: this.getBlockReasonStats()
      },

      ruleEffectiveness: {
        perIPRuleTriggered: this.stats.rateLimitedRequests > 0,
        ddosDetectionTriggered: this.stats.ddosAttacksDetected > 0,
        endpointRulesActive: true,
        whitelistingActive: true
      },

      recommendations: this.generateRateLimitingRecommendations(allowedPercentage, blockedPercentage),
      
      configuration: {
        rateLimitRules: this.rateLimitRules,
        blockedIPsSnapshot: Array.from(this.blockedIPs.entries()).slice(0, 10)
      },
      
      detailedResults: results
    };

    this.displayRateLimitingReport(report);
    return report;
  }

  /**
   * Get top blocked IPs
   */
  getTopBlockedIPs() {
    return Array.from(this.blockedIPs.entries())
      .map(([ip, info]) => ({ ip, reason: info.reason, blockedAt: info.blockedAt }))
      .slice(0, 10);
  }

  /**
   * Get block reason statistics
   */
  getBlockReasonStats() {
    const reasons = {};
    for (const [ip, info] of this.blockedIPs.entries()) {
      reasons[info.reason] = (reasons[info.reason] || 0) + 1;
    }
    return reasons;
  }

  /**
   * Generate rate limiting recommendations
   */
  generateRateLimitingRecommendations(allowedPercentage, blockedPercentage) {
    const recommendations = [];

    if (allowedPercentage < 70) {
      recommendations.push({
        priority: 'HIGH',
        category: 'Traffic Flow',
        issue: `Only ${allowedPercentage}% of traffic allowed - rate limits may be too restrictive`,
        solution: 'Review and adjust rate limiting thresholds for better balance'
      });
    }

    if (blockedPercentage > 20) {
      recommendations.push({
        priority: 'HIGH',
        category: 'Attack Volume',
        issue: `${blockedPercentage}% of traffic blocked - high attack volume detected`,
        solution: 'Implement additional security layers and consider geo-blocking'
      });
    }

    if (this.stats.ddosAttacksDetected > 10) {
      recommendations.push({
        priority: 'CRITICAL',
        category: 'DDoS Protection',
        issue: `${this.stats.ddosAttacksDetected} DDoS attacks detected`,
        solution: 'Activate enhanced DDoS protection and consider CDN integration'
      });
    }

    if (this.blockedIPs.size > 50) {
      recommendations.push({
        priority: 'MEDIUM',
        category: 'IP Management',
        issue: `${this.blockedIPs.size} IPs currently blocked`,
        solution: 'Review blocked IP list and implement graduated response policies'
      });
    }

    if (recommendations.length === 0) {
      recommendations.push({
        priority: 'INFO',
        category: 'System Status',
        issue: 'Rate limiting performing within acceptable parameters',
        solution: 'Continue monitoring and maintain current protection levels'
      });
    }

    return recommendations;
  }

  /**
   * Display formatted rate limiting report
   */
  displayRateLimitingReport(report) {
    console.log(chalk.blue('\n' + '='.repeat(70)));
    console.log(chalk.blue('           RATE LIMITING & DDOS MITIGATION REPORT'));
    console.log(chalk.blue('='.repeat(70)));
    
    console.log(chalk.white(`\nScenario: ${report.scenario}`));
    console.log(chalk.white(`Duration: ${report.duration}`));
    
    console.log(chalk.cyan('\n🚦 Traffic Management Performance:'));
    console.log(chalk.white(`  Total Requests: ${report.performance.totalRequests.toLocaleString()}`));
    console.log(chalk.green(`  Allowed: ${report.performance.allowedRequests.toLocaleString()} (${report.performance.percentages.allowed}%)`));
    console.log(chalk.yellow(`  Rate Limited: ${report.performance.rateLimitedRequests.toLocaleString()} (${report.performance.percentages.rateLimited}%)`));
    console.log(chalk.red(`  Blocked: ${report.performance.blockedRequests.toLocaleString()} (${report.performance.percentages.blocked}%)`));
    console.log(chalk.red(`  DDoS Attacks Detected: ${report.performance.ddosAttacksDetected}`));
    console.log(chalk.cyan(`  Mitigation Effectiveness: ${report.performance.mitigation_effectiveness}%`));
    console.log(chalk.cyan(`  Requests/Second: ${report.performance.requestsPerSecond}`));

    console.log(chalk.cyan('\n🛡️  Security Status:'));
    console.log(chalk.red(`  Currently Blocked IPs: ${report.securityStatus.currentlyBlockedIPs}`));
    console.log(chalk.blue(`  Active Connection Tracking: ${report.securityStatus.activeConnections}`));

    if (report.securityStatus.topBlockedIPs.length > 0) {
      console.log(chalk.cyan('\n🚫 Top Blocked IPs:'));
      report.securityStatus.topBlockedIPs.forEach(entry => {
        console.log(chalk.red(`  ${entry.ip} - ${entry.reason}`));
      });
    }

    console.log(chalk.cyan('\n📊 Block Reasons:'));
    Object.entries(report.securityStatus.blockReasons).forEach(([reason, count]) => {
      console.log(chalk.white(`  ${reason}: ${count}`));
    });

    console.log(chalk.cyan('\n⚙️  Rule Effectiveness:'));
    Object.entries(report.ruleEffectiveness).forEach(([rule, active]) => {
      const status = active ? chalk.green('✅ Active') : chalk.red('❌ Inactive');
      console.log(`  ${rule}: ${status}`);
    });

    console.log(chalk.cyan('\n💡 Recommendations:'));
    report.recommendations.forEach(rec => {
      const priorityColor = rec.priority === 'CRITICAL' ? 'red' : 
                           rec.priority === 'HIGH' ? 'red' : 
                           rec.priority === 'MEDIUM' ? 'yellow' : 'green';
      console.log(chalk[priorityColor](`  [${rec.priority}] ${rec.category}: ${rec.issue}`));
      console.log(chalk.white(`    → ${rec.solution}`));
    });

    console.log(chalk.blue('\n' + '='.repeat(70) + '\n'));
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
    console.log(chalk.green(`📁 Rate limiting results saved to: ${this.logFile}`));
  }
}

// CLI Interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const duration = parseInt(args[0]) || 60;
  const requestsPerSecond = parseInt(args[1]) || 2000;

  const rateLimiter = new RateLimiter();
  
  console.log(chalk.green('🚀 Starting FinMark Rate Limiting & DDoS Mitigation Simulation'));
  console.log(chalk.yellow(`Processing ${requestsPerSecond} RPS for ${duration} seconds`));
  
  rateLimiter.simulateRateLimiting(duration, requestsPerSecond)
    .then(() => {
      console.log(chalk.green('✅ Rate limiting simulation completed successfully'));
    })
    .catch(error => {
      console.error(chalk.red('❌ Error in rate limiting simulation:'), error);
      process.exit(1);
    });
}

module.exports = RateLimiter;
