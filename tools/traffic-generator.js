const axios = require('axios');
const chalk = require('chalk');
const { performance } = require('perf_hooks');

class TrafficGenerator {
  constructor(options = {}) {
    this.baseUrl = options.baseUrl || 'http://localhost:3000';
    this.concurrency = options.concurrency || 10;
    this.duration = options.duration || 60; // seconds
    this.requests = [];
    this.results = {
      total: 0,
      successful: 0,
      failed: 0,
      avgResponseTime: 0,
      maxResponseTime: 0,
      minResponseTime: Infinity
    };
  }

  async generateLoad() {
    console.log(chalk.green(`Starting load test: ${this.concurrency} concurrent users for ${this.duration} seconds`));
    
    const startTime = performance.now();
    const endTime = startTime + (this.duration * 1000);
    
    const workers = [];
    
    for (let i = 0; i < this.concurrency; i++) {
      workers.push(this.worker(endTime, i));
    }
    
    await Promise.all(workers);
    this.calculateResults();
    this.displayResults();
  }

  async worker(endTime, workerId) {
    while (performance.now() < endTime) {
      const requestStart = performance.now();
      
      try {
        // Simulate different types of requests
        const requestType = Math.random();
        let url;
        
        if (requestType < 0.3) {
          url = `${this.baseUrl}/health`; // Health check
        } else if (requestType < 0.6) {
          url = `${this.baseUrl}/api/orders`; // API call
        } else {
          url = `${this.baseUrl}/api/dashboard`; // Dashboard
        }
        
        const response = await axios.get(url, { timeout: 5000 });
        const requestEnd = performance.now();
        const responseTime = requestEnd - requestStart;
        
        this.requests.push({
          workerId,
          url,
          status: response.status,
          responseTime,
          success: true,
          timestamp: new Date().toISOString()
        });
        
        this.results.successful++;
        
      } catch (error) {
        const requestEnd = performance.now();
        const responseTime = requestEnd - requestStart;
        
        this.requests.push({
          workerId,
          url: error.config?.url || 'unknown',
          status: error.response?.status || 0,
          responseTime,
          success: false,
          error: error.message,
          timestamp: new Date().toISOString()
        });
        
        this.results.failed++;
      }
      
      this.results.total++;
      
      // Small delay to prevent overwhelming
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  calculateResults() {
    const responseTimes = this.requests.map(req => req.responseTime);
    
    this.results.avgResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
    this.results.maxResponseTime = Math.max(...responseTimes);
    this.results.minResponseTime = Math.min(...responseTimes);
  }

  displayResults() {
    console.log(chalk.blue('\n========== LOAD TEST RESULTS =========='));
    console.log(chalk.white(`Total Requests: ${this.results.total}`));
    console.log(chalk.green(`Successful: ${this.results.successful}`));
    console.log(chalk.red(`Failed: ${this.results.failed}`));
    console.log(chalk.yellow(`Success Rate: ${((this.results.successful / this.results.total) * 100).toFixed(2)}%`));
    console.log(chalk.cyan(`Average Response Time: ${this.results.avgResponseTime.toFixed(2)}ms`));
    console.log(chalk.cyan(`Max Response Time: ${this.results.maxResponseTime.toFixed(2)}ms`));
    console.log(chalk.cyan(`Min Response Time: ${this.results.minResponseTime.toFixed(2)}ms`));
    console.log(chalk.blue('=========================================\n'));
  }

  async saveResults() {
    const fs = require('fs-extra');
    await fs.ensureDir('./logs');
    
    const resultsFile = `./logs/load-test-${Date.now()}.json`;
    await fs.writeJson(resultsFile, {
      config: {
        concurrency: this.concurrency,
        duration: this.duration,
        baseUrl: this.baseUrl
      },
      results: this.results,
      requests: this.requests
    }, { spaces: 2 });
    
    console.log(chalk.green(`Results saved to: ${resultsFile}`));
  }
}

// Run if called directly
if (require.main === module) {
  const generator = new TrafficGenerator({
    concurrency: 20,
    duration: 30
  });
  
  generator.generateLoad().then(() => {
    return generator.saveResults();
  }).catch(console.error);
}

module.exports = TrafficGenerator;
