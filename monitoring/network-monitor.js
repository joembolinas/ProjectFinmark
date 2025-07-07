const { spawn } = require('child_process');
const fs = require('fs-extra');
const chalk = require('chalk');
const WebSocket = require('ws');

class NetworkMonitor {
  constructor() {
    this.isRunning = false;
    this.logFile = './logs/network-monitor.log';
    this.ws = null;
  }

  async start() {
    console.log(chalk.green('Starting Network Monitor...'));
    this.isRunning = true;
    
    // Ensure logs directory exists
    await fs.ensureDir('./logs');
    
    // Connect to WebSocket for real-time updates
    try {
      this.ws = new WebSocket('ws://localhost:8080');
    } catch (error) {
      console.log(chalk.yellow('WebSocket connection failed, continuing without real-time updates'));
    }

    // Monitor network interfaces (Windows netstat equivalent)
    this.monitorConnections();
    
    // Monitor bandwidth usage
    this.monitorBandwidth();
    
    // Monitor system resources
    this.monitorResources();
  }

  monitorConnections() {
    const netstat = spawn('netstat', ['-an']);
    
    netstat.stdout.on('data', (data) => {
      const output = data.toString();
      this.logData('CONNECTIONS', output);
      
      // Send to WebSocket if connected
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({
          type: 'connections',
          data: output,
          timestamp: new Date().toISOString()
        }));
      }
    });
  }

  monitorBandwidth() {
    // Windows equivalent of iftop/nload using PowerShell
    setInterval(() => {
      const ps = spawn('powershell', [
        '-Command',
        'Get-Counter "\\Network Interface(*)\\Bytes Total/sec" | Select-Object -ExpandProperty CounterSamples'
      ]);
      
      ps.stdout.on('data', (data) => {
        const output = data.toString();
        this.logData('BANDWIDTH', output);
        
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify({
            type: 'bandwidth',
            data: output,
            timestamp: new Date().toISOString()
          }));
        }
      });
    }, 5000); // Every 5 seconds
  }

  monitorResources() {
    setInterval(() => {
      const ps = spawn('powershell', [
        '-Command',
        'Get-Process | Measure-Object CPU -Sum; Get-WmiObject -Class Win32_OperatingSystem | Select-Object FreePhysicalMemory,TotalVisibleMemorySize'
      ]);
      
      ps.stdout.on('data', (data) => {
        const output = data.toString();
        this.logData('RESOURCES', output);
      });
    }, 10000); // Every 10 seconds
  }

  async logData(type, data) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${type}: ${data}\n`;
    
    try {
      await fs.appendFile(this.logFile, logEntry);
      console.log(chalk.blue(`${type} data logged`));
    } catch (error) {
      console.error(chalk.red(`Error logging ${type} data:`, error));
    }
  }

  stop() {
    this.isRunning = false;
    if (this.ws) {
      this.ws.close();
    }
    console.log(chalk.red('Network Monitor stopped'));
  }
}

// Run if called directly
if (require.main === module) {
  const monitor = new NetworkMonitor();
  monitor.start();
  
  // Graceful shutdown
  process.on('SIGINT', () => {
    monitor.stop();
    process.exit(0);
  });
}

module.exports = NetworkMonitor;
