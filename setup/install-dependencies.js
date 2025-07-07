const { spawn } = require('child_process');
const chalk = require('chalk');
const fs = require('fs-extra');
const inquirer = require('inquirer');

class SetupManager {
  constructor() {
    this.requiredTools = [
      { name: 'Node.js', command: 'node --version' },
      { name: 'npm', command: 'npm --version' },
      { name: 'PowerShell', command: 'powershell -Command "Get-Host"' }
    ];
  }

  async checkRequirements() {
    console.log(chalk.blue('Checking system requirements...'));
    
    for (const tool of this.requiredTools) {
      try {
        await this.executeCommand(tool.command);
        console.log(chalk.green(`✓ ${tool.name} is installed`));
      } catch (error) {
        console.log(chalk.red(`✗ ${tool.name} is not installed or not accessible`));
        throw new Error(`${tool.name} is required but not found`);
      }
    }
  }

  async setupDirectories() {
    console.log(chalk.blue('Setting up project directories...'));
    
    const directories = [
      'config',
      'monitoring',
      'tools',
      'tests',
      'setup',
      'docs',
      'logs',
      'public',
      'certificates'
    ];

    for (const dir of directories) {
      await fs.ensureDir(dir);
      console.log(chalk.green(`✓ Created directory: ${dir}`));
    }
  }

  async createConfigFiles() {
    console.log(chalk.blue('Creating configuration files...'));
    
    // Network configuration
    const networkConfig = {
      server: {
        port: 3000,
        host: 'localhost'
      },
      loadBalancer: {
        servers: [
          'http://localhost:3001',
          'http://localhost:3002',
          'http://localhost:3003'
        ],
        algorithm: 'round-robin'
      },
      monitoring: {
        interval: 5000,
        logLevel: 'info',
        enableWebSocket: true
      },
      security: {
        enableFirewall: true,
        enableVPN: false,
        maxConnections: 1000
      }
    };

    await fs.writeJson('./config/network-config.json', networkConfig, { spaces: 2 });
    console.log(chalk.green('✓ Created network-config.json'));

    // QoS configuration
    const qosConfig = {
      rules: [
        {
          name: 'High Priority - HTTPS',
          protocol: 'tcp',
          port: 443,
          priority: 'high',
          bandwidth: '80%'
        },
        {
          name: 'Medium Priority - HTTP',
          protocol: 'tcp',
          port: 80,
          priority: 'medium',
          bandwidth: '60%'
        },
        {
          name: 'Low Priority - Other',
          protocol: 'tcp',
          port: '*',
          priority: 'low',
          bandwidth: '20%'
        }
      ]
    };

    await fs.writeJson('./config/qos-config.json', qosConfig, { spaces: 2 });
    console.log(chalk.green('✓ Created qos-config.json'));
  }

  async executeCommand(command) {
    return new Promise((resolve, reject) => {
      // Handle Windows command execution properly
      let cmd, args;
      
      if (command.includes('powershell')) {
        cmd = 'powershell';
        args = command.split(' ').slice(1);
      } else if (command.includes('node') || command.includes('npm')) {
        cmd = 'cmd';
        args = ['/c', command];
      } else {
        [cmd, ...args] = command.split(' ');
      }
      
      const process = spawn(cmd, args, { stdio: 'pipe', shell: true });
      
      let output = '';
      
      process.stdout.on('data', (data) => {
        output += data.toString();
      });
      
      process.on('close', (code) => {
        if (code === 0) {
          resolve(output);
        } else {
          reject(new Error(`Command failed with code ${code}`));
        }
      });
      
      process.on('error', (error) => {
        reject(error);
      });
    });
  }

  async promptUserConfiguration() {
    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'enableFirewall',
        message: 'Enable Windows Firewall configuration?',
        default: true
      },
      {
        type: 'confirm',
        name: 'enableMonitoring',
        message: 'Enable real-time network monitoring?',
        default: true
      },
      {
        type: 'input',
        name: 'serverPort',
        message: 'Server port:',
        default: '3000'
      },
      {
        type: 'input',
        name: 'monitoringPort',
        message: 'WebSocket monitoring port:',
        default: '8080'
      }
    ]);

    // Update configuration based on user input
    const config = await fs.readJson('./config/network-config.json');
    config.server.port = parseInt(answers.serverPort);
    config.monitoring.enableWebSocket = answers.enableMonitoring;
    config.security.enableFirewall = answers.enableFirewall;

    await fs.writeJson('./config/network-config.json', config, { spaces: 2 });
    console.log(chalk.green('✓ Configuration updated based on user preferences'));
  }

  async run() {
    try {
      console.log(chalk.blue('🚀 Starting FinMark Network Lab Setup...\n'));
      
      await this.checkRequirements();
      await this.setupDirectories();
      await this.createConfigFiles();
      await this.promptUserConfiguration();
      
      console.log(chalk.green('\n✨ Setup completed successfully!'));
      console.log(chalk.yellow('\nNext steps:'));
      console.log(chalk.white('1. Run "npm start" to start the main server'));
      console.log(chalk.white('2. Run "npm run monitor" to start network monitoring'));
      console.log(chalk.white('3. Run "npm run traffic-gen" to generate test traffic'));
      console.log(chalk.white('4. Run "npm run firewall-config" to configure firewall rules'));
      
    } catch (error) {
      console.error(chalk.red('\n❌ Setup failed:'), error.message);
      process.exit(1);
    }
  }
}

// Run if called directly
if (require.main === module) {
  const setup = new SetupManager();
  setup.run();
}

module.exports = SetupManager;
