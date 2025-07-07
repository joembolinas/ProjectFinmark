const { spawn } = require('child_process');
const chalk = require('chalk');
const fs = require('fs-extra');

class VPNSetup {
  constructor() {
    this.configFile = './config/vpn-config.json';
    this.config = {
      server: {
        name: 'FinMark-VPN-Server',
        port: 1194,
        protocol: 'udp',
        subnet: '10.8.0.0',
        netmask: '255.255.255.0'
      },
      clients: [],
      certificates: {
        ca: './certificates/ca.crt',
        server: './certificates/server.crt',
        serverKey: './certificates/server.key',
        dhparam: './certificates/dh2048.pem'
      }
    };
  }

  async setupVPN() {
    console.log(chalk.blue('Setting up VPN configuration...'));
    
    await fs.ensureDir('./config');
    await fs.ensureDir('./certificates');
    
    // Save VPN configuration
    await fs.writeJson(this.configFile, this.config, { spaces: 2 });
    console.log(chalk.green('VPN configuration saved'));
    
    // Create sample OpenVPN configuration
    const ovpnConfig = this.generateOpenVPNConfig();
    await fs.writeFile('./config/finmark-server.ovpn', ovpnConfig);
    console.log(chalk.green('OpenVPN server configuration created'));
    
    // Create client configuration template
    const clientConfig = this.generateClientConfig();
    await fs.writeFile('./config/finmark-client-template.ovpn', clientConfig);
    console.log(chalk.green('Client configuration template created'));
  }

  generateOpenVPNConfig() {
    return `# FinMark VPN Server Configuration
port ${this.config.server.port}
proto ${this.config.server.protocol}
dev tun

# Certificates and keys
ca ${this.config.certificates.ca}
cert ${this.config.certificates.server}
key ${this.config.certificates.serverKey}
dh ${this.config.certificates.dhparam}

# Network configuration
server ${this.config.server.subnet} ${this.config.server.netmask}
ifconfig-pool-persist ipp.txt

# Security settings
cipher AES-256-CBC
auth SHA256
tls-auth ta.key 0

# Logging
log-append /var/log/openvpn.log
verb 3

# Client-to-client communication
client-to-client

# Keep alive
keepalive 10 120

# Compression
comp-lzo

# User and group (Linux)
;user nobody
;group nogroup

# Persist options
persist-key
persist-tun
`;
  }

  generateClientConfig() {
    return `# FinMark VPN Client Configuration Template
client
dev tun
proto ${this.config.server.protocol}

# Server details
remote YOUR_SERVER_IP ${this.config.server.port}

# Security
cipher AES-256-CBC
auth SHA256
resolv-retry infinite
nobind

# Certificates (embed or reference files)
ca ca.crt
cert client.crt
key client.key
tls-auth ta.key 1

# Options
persist-key
persist-tun
comp-lzo
verb 3

# Windows-specific
;route-method exe
;route-delay 2
`;
  }

  async addClient(clientName, clientIP = null) {
    const client = {
      name: clientName,
      ip: clientIP || `10.8.0.${this.config.clients.length + 10}`,
      created: new Date().toISOString(),
      status: 'active'
    };
    
    this.config.clients.push(client);
    await fs.writeJson(this.configFile, this.config, { spaces: 2 });
    
    console.log(chalk.green(`Client ${clientName} added with IP ${client.ip}`));
    return client;
  }

  async generateCertificates() {
    console.log(chalk.yellow('Note: Certificate generation requires OpenSSL or Easy-RSA'));
    console.log(chalk.blue('Creating certificate structure...'));
    
    // Create certificate directory structure
    await fs.ensureDir('./certificates');
    
    // Create sample certificate files (placeholders)
    const certFiles = [
      { file: 'ca.crt', desc: 'Certificate Authority' },
      { file: 'server.crt', desc: 'Server Certificate' },
      { file: 'server.key', desc: 'Server Private Key' },
      { file: 'dh2048.pem', desc: 'Diffie-Hellman Parameters' },
      { file: 'ta.key', desc: 'TLS Authentication Key' }
    ];
    
    for (const cert of certFiles) {
      const placeholder = `# ${cert.desc} - Placeholder
# This file should be replaced with actual certificates
# Generated: ${new Date().toISOString()}
# Use OpenSSL or Easy-RSA to generate real certificates
`;
      await fs.writeFile(`./certificates/${cert.file}`, placeholder);
      console.log(chalk.blue(`Created placeholder: ${cert.file}`));
    }
  }

  async showStatus() {
    console.log(chalk.blue('\n========== VPN Status =========='));
    console.log(chalk.white(`Server: ${this.config.server.name}`));
    console.log(chalk.white(`Port: ${this.config.server.port}/${this.config.server.protocol}`));
    console.log(chalk.white(`Subnet: ${this.config.server.subnet}`));
    console.log(chalk.white(`Clients: ${this.config.clients.length}`));
    
    if (this.config.clients.length > 0) {
      console.log(chalk.yellow('\nClient List:'));
      this.config.clients.forEach(client => {
        console.log(chalk.cyan(`  - ${client.name}: ${client.ip} (${client.status})`));
      });
    }
    console.log(chalk.blue('===============================\n'));
  }
}

// Run if called directly
if (require.main === module) {
  const vpn = new VPNSetup();
  
  vpn.setupVPN()
    .then(() => vpn.generateCertificates())
    .then(() => vpn.addClient('finmark-admin'))
    .then(() => vpn.addClient('finmark-user1'))
    .then(() => vpn.showStatus())
    .catch(console.error);
}

module.exports = VPNSetup;
