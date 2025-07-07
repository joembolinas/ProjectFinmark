const { spawn } = require('child_process');
const chalk = require('chalk');
const fs = require('fs-extra');

class FirewallConfig {
  constructor() {
    this.rules = [];
    this.configFile = './config/firewall-rules.json';
  }

  async loadRules() {
    try {
      if (await fs.pathExists(this.configFile)) {
        this.rules = await fs.readJson(this.configFile);
        console.log(chalk.green(`Loaded ${this.rules.length} firewall rules`));
      }
    } catch (error) {
      console.error(chalk.red('Error loading firewall rules:', error));
    }
  }

  async saveRules() {
    try {
      await fs.ensureDir('./config');
      await fs.writeJson(this.configFile, this.rules, { spaces: 2 });
      console.log(chalk.green('Firewall rules saved'));
    } catch (error) {
      console.error(chalk.red('Error saving firewall rules:', error));
    }
  }

  addRule(rule) {
    this.rules.push({
      id: Date.now(),
      ...rule,
      created: new Date().toISOString()
    });
    console.log(chalk.blue(`Added firewall rule: ${rule.name}`));
  }

  // Windows Firewall rules using netsh
  async applyWindowsFirewallRules() {
    console.log(chalk.yellow('Applying Windows Firewall rules...'));
    
    const defaultRules = [
      {
        name: 'FinMark-HTTP-Inbound',
        action: 'allow',
        direction: 'in',
        protocol: 'TCP',
        localport: '80,3000'
      },
      {
        name: 'FinMark-HTTPS-Inbound',
        action: 'allow',
        direction: 'in',
        protocol: 'TCP',
        localport: '443'
      },
      {
        name: 'FinMark-WebSocket-Inbound',
        action: 'allow',
        direction: 'in',
        protocol: 'TCP',
        localport: '8080'
      }
    ];

    for (const rule of defaultRules) {
      await this.executeNetshCommand(rule);
    }
  }

  async executeNetshCommand(rule) {
    return new Promise((resolve, reject) => {
      const command = `netsh advfirewall firewall add rule name="${rule.name}" dir=${rule.direction} action=${rule.action} protocol=${rule.protocol} localport=${rule.localport}`;
      
      console.log(chalk.cyan(`Executing: ${command}`));
      
      const process = spawn('cmd', ['/c', command], { stdio: 'pipe' });
      
      process.stdout.on('data', (data) => {
        console.log(chalk.green(data.toString()));
      });
      
      process.stderr.on('data', (data) => {
        console.error(chalk.red(data.toString()));
      });
      
      process.on('close', (code) => {
        if (code === 0) {
          console.log(chalk.green(`Rule "${rule.name}" applied successfully`));
          resolve();
        } else {
          console.error(chalk.red(`Failed to apply rule "${rule.name}"`));
          reject(new Error(`Command failed with code ${code}`));
        }
      });
    });
  }
}

// Run if called directly
if (require.main === module) {
  const firewall = new FirewallConfig();
  
  firewall.loadRules()
    .then(() => firewall.applyWindowsFirewallRules())
    .then(() => firewall.saveRules())
    .catch(console.error);
}

module.exports = FirewallConfig;
