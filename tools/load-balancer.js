#!/usr/bin/env node

/**
 * FinMark Load Balancer Simulator
 * Week 8: Traffic Management and Load Distribution
 * 
 * Simulates HAProxy/Nginx load balancing capabilities for handling
 * 300% traffic spikes while maintaining system resilience
 */

const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

class LoadBalancer {
  constructor() {
    this.servers = [
      { id: 'web-01', ip: '10.0.50.10', port: 443, status: 'healthy', load: 0, maxConnections: 1000 },
      { id: 'web-02', ip: '10.0.50.11', port: 443, status: 'healthy', load: 0, maxConnections: 1000 },
      { id: 'api-01', ip: '10.0.40.20', port: 8080, status: 'healthy', load: 0, maxConnections: 500 },
      { id: 'api-02', ip: '10.0.40.21', port: 8080, status: 'healthy', load: 0, maxConnections: 500 }
    ];
    
    this.algorithms = {
      roundRobin: 'Round Robin',
      leastConnections: 'Least Connections',
      weighted: 'Weighted Round Robin',
      ipHash: 'IP Hash'
    };
    
    this.currentAlgorithm = 'leastConnections';
    this.roundRobinIndex = 0;
    this.stats = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      averageResponseTime: 0,
      requestsPerSecond: 0
    };
    
    this.logFile = path.join(__dirname, '..', 'logs', `load-balancer-${Date.now()}.json`);
  }

  /**
   * Simulate traffic spike scenario (300% increase)
   */
  async simulateTrafficSpike(duration = 60, baseRPS = 100) {
    console.log(chalk.blue('\n🔥 SIMULATING 300% TRAFFIC SPIKE 🔥'));
    console.log(chalk.yellow(`Base RPS: ${baseRPS} → Peak RPS: ${baseRPS * 4} (400% total)`));
    console.log(chalk.cyan(`Duration: ${duration} seconds\n`));

    const startTime = Date.now();
    const results = [];
    
    // Simulate gradual spike over first 10 seconds, then sustained load
    for (let second = 0; second < duration; second++) {
      let currentRPS;
      
      if (second < 10) {
        // Gradual increase to 400% over 10 seconds
        currentRPS = baseRPS + (baseRPS * 3 * (second / 10));
      } else {
        // Sustained 400% load
        currentRPS = baseRPS * 4;
      }

      console.log(chalk.white(`Second ${second + 1}: Processing ${Math.round(currentRPS)} RPS`));
      
      // Process requests for this second
      const secondResults = await this.processSecond(Math.round(currentRPS));
      results.push({
        second: second + 1,
        rps: Math.round(currentRPS),
        ...secondResults
      });

      // Update server health based on load
      this.updateServerHealth();
      
      // Display real-time metrics
      if (second % 10 === 9) {
        this.displayRealTimeMetrics();
      }

      // Simulate 1 second delay
      await new Promise(resolve => setTimeout(resolve, 100)); // Speed up for demo
    }

    const endTime = Date.now();
    const totalDuration = (endTime - startTime) / 1000;

    // Generate comprehensive report
    const report = this.generateLoadBalancingReport(results, totalDuration);
    this.saveResults(report);
    
    return report;
  }

  /**
   * Process requests for one second using current load balancing algorithm
   */
  async processSecond(requestCount) {
    let successful = 0;
    let failed = 0;
    let totalResponseTime = 0;

    for (let i = 0; i < requestCount; i++) {
      const server = this.selectServer();
      
      if (server && server.load < server.maxConnections) {
        // Successful request
        server.load++;
        successful++;
        
        // Simulate response time (increases with load)
        const responseTime = this.calculateResponseTime(server);
        totalResponseTime += responseTime;
        
        // Release connection after processing
        setTimeout(() => {
          server.load = Math.max(0, server.load - 1);
        }, responseTime);
        
      } else {
        // Failed request (server overloaded or unavailable)
        failed++;
      }
    }

    const avgResponseTime = successful > 0 ? totalResponseTime / successful : 0;
    
    return {
      successful,
      failed,
      avgResponseTime: Math.round(avgResponseTime),
      serverLoads: this.servers.map(s => ({ id: s.id, load: s.load, status: s.status }))
    };
  }

  /**
   * Select server based on configured algorithm
   */
  selectServer() {
    const healthyServers = this.servers.filter(s => s.status === 'healthy');
    
    if (healthyServers.length === 0) {
      return null;
    }

    switch (this.currentAlgorithm) {
      case 'roundRobin':
        return this.roundRobinSelection(healthyServers);
      
      case 'leastConnections':
        return this.leastConnectionsSelection(healthyServers);
      
      case 'weighted':
        return this.weightedSelection(healthyServers);
      
      case 'ipHash':
        return this.ipHashSelection(healthyServers);
      
      default:
        return healthyServers[0];
    }
  }

  roundRobinSelection(servers) {
    const server = servers[this.roundRobinIndex % servers.length];
    this.roundRobinIndex++;
    return server;
  }

  leastConnectionsSelection(servers) {
    return servers.reduce((least, current) => 
      current.load < least.load ? current : least
    );
  }

  weightedSelection(servers) {
    // Simple weighted selection - web servers get 2x weight
    const weighted = [];
    servers.forEach(server => {
      const weight = server.id.startsWith('web') ? 2 : 1;
      for (let i = 0; i < weight; i++) {
        weighted.push(server);
      }
    });
    return weighted[Math.floor(Math.random() * weighted.length)];
  }

  ipHashSelection(servers) {
    // Simulate IP hash - consistent distribution
    const hash = Math.floor(Math.random() * 1000);
    return servers[hash % servers.length];
  }

  /**
   * Calculate response time based on server load
   */
  calculateResponseTime(server) {
    const baseResponseTime = 50; // 50ms base
    const loadFactor = server.load / server.maxConnections;
    const additionalDelay = loadFactor * 200; // Up to 200ms additional delay
    
    return Math.round(baseResponseTime + additionalDelay + (Math.random() * 20));
  }

  /**
   * Update server health based on current load
   */
  updateServerHealth() {
    this.servers.forEach(server => {
      const loadPercentage = (server.load / server.maxConnections) * 100;
      
      if (loadPercentage > 95) {
        server.status = 'critical';
      } else if (loadPercentage > 80) {
        server.status = 'warning';
      } else {
        server.status = 'healthy';
      }
    });
  }

  /**
   * Display real-time metrics
   */
  displayRealTimeMetrics() {
    console.log(chalk.cyan('\n📊 Real-time Server Status:'));
    this.servers.forEach(server => {
      const loadPercentage = Math.round((server.load / server.maxConnections) * 100);
      const statusColor = server.status === 'healthy' ? 'green' : 
                         server.status === 'warning' ? 'yellow' : 'red';
      
      console.log(chalk[statusColor](
        `  ${server.id}: ${server.load}/${server.maxConnections} (${loadPercentage}%) - ${server.status}`
      ));
    });
    console.log('');
  }

  /**
   * Generate comprehensive load balancing report
   */
  generateLoadBalancingReport(results, duration) {
    const totalRequests = results.reduce((sum, r) => sum + r.successful + r.failed, 0);
    const totalSuccessful = results.reduce((sum, r) => sum + r.successful, 0);
    const totalFailed = results.reduce((sum, r) => sum + r.failed, 0);
    const avgResponseTime = results.reduce((sum, r) => sum + r.avgResponseTime, 0) / results.length;
    const successRate = (totalSuccessful / totalRequests) * 100;

    const report = {
      timestamp: new Date().toISOString(),
      scenario: '300% Traffic Spike Load Balancing Test',
      algorithm: this.currentAlgorithm,
      duration: `${duration} seconds`,
      
      performance: {
        totalRequests,
        successfulRequests: totalSuccessful,
        failedRequests: totalFailed,
        successRate: Math.round(successRate * 100) / 100,
        averageResponseTime: Math.round(avgResponseTime),
        requestsPerSecond: Math.round(totalRequests / duration)
      },
      
      serverConfiguration: this.servers.map(s => ({
        id: s.id,
        ip: s.ip,
        port: s.port,
        maxConnections: s.maxConnections,
        finalStatus: s.status
      })),
      
      recommendations: this.generateRecommendations(successRate, avgResponseTime),
      
      detailedResults: results
    };

    this.displayReport(report);
    return report;
  }

  /**
   * Generate recommendations based on test results
   */
  generateRecommendations(successRate, avgResponseTime) {
    const recommendations = [];

    if (successRate < 95) {
      recommendations.push({
        priority: 'HIGH',
        category: 'Capacity',
        issue: `Success rate of ${successRate}% is below target 95%`,
        solution: 'Add additional server instances or increase capacity'
      });
    }

    if (avgResponseTime > 150) {
      recommendations.push({
        priority: 'MEDIUM',
        category: 'Performance',
        issue: `Average response time of ${avgResponseTime}ms exceeds target 150ms`,
        solution: 'Implement caching layer or optimize application performance'
      });
    }

    if (recommendations.length === 0) {
      recommendations.push({
        priority: 'INFO',
        category: 'Success',
        issue: 'Load balancing configuration performing within acceptable parameters',
        solution: 'Monitor continued performance and plan for future growth'
      });
    }

    return recommendations;
  }

  /**
   * Display formatted report
   */
  displayReport(report) {
    console.log(chalk.blue('\n' + '='.repeat(60)));
    console.log(chalk.blue('     LOAD BALANCER PERFORMANCE REPORT'));
    console.log(chalk.blue('='.repeat(60)));
    
    console.log(chalk.white(`\nScenario: ${report.scenario}`));
    console.log(chalk.white(`Algorithm: ${report.algorithm}`));
    console.log(chalk.white(`Duration: ${report.duration}`));
    
    console.log(chalk.cyan('\n📈 Performance Metrics:'));
    console.log(chalk.white(`  Total Requests: ${report.performance.totalRequests.toLocaleString()}`));
    console.log(chalk.green(`  Successful: ${report.performance.successfulRequests.toLocaleString()}`));
    console.log(chalk.red(`  Failed: ${report.performance.failedRequests.toLocaleString()}`));
    console.log(chalk.yellow(`  Success Rate: ${report.performance.successRate}%`));
    console.log(chalk.cyan(`  Avg Response Time: ${report.performance.averageResponseTime}ms`));
    console.log(chalk.cyan(`  Requests/Second: ${report.performance.requestsPerSecond}`));

    console.log(chalk.cyan('\n🖥️  Server Status:'));
    report.serverConfiguration.forEach(server => {
      const statusColor = server.finalStatus === 'healthy' ? 'green' : 
                         server.finalStatus === 'warning' ? 'yellow' : 'red';
      console.log(chalk[statusColor](
        `  ${server.id} (${server.ip}:${server.port}): ${server.finalStatus} - Max: ${server.maxConnections}`
      ));
    });

    console.log(chalk.cyan('\n💡 Recommendations:'));
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
    console.log(chalk.green(`📁 Results saved to: ${this.logFile}`));
  }
}

// CLI Interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const duration = parseInt(args[0]) || 60;
  const baseRPS = parseInt(args[1]) || 100;

  const loadBalancer = new LoadBalancer();
  
  console.log(chalk.green('🚀 Starting FinMark Load Balancer Simulation'));
  console.log(chalk.yellow(`Algorithm: ${loadBalancer.currentAlgorithm}`));
  
  loadBalancer.simulateTrafficSpike(duration, baseRPS)
    .then(() => {
      console.log(chalk.green('✅ Load balancing simulation completed successfully'));
    })
    .catch(error => {
      console.error(chalk.red('❌ Error in load balancing simulation:'), error);
      process.exit(1);
    });
}

module.exports = LoadBalancer;
