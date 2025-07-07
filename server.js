const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const WebSocket = require('ws');
const chalk = require('chalk');
const fs = require('fs-extra');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Load Balancer Configuration
const servers = [
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:3003'
];

let currentServer = 0;

// Simple Round Robin Load Balancer
const loadBalancer = createProxyMiddleware({
  target: () => {
    const server = servers[currentServer];
    currentServer = (currentServer + 1) % servers.length;
    return server;
  },
  changeOrigin: true,
  onProxyReq: (proxyReq, req, res) => {
    console.log(chalk.blue(`Proxying request to: ${proxyReq.getHeader('host')}`));
  },
  onError: (err, req, res) => {
    console.log(chalk.red('Proxy error:', err.message));
    res.status(503).json({ error: 'Service temporarily unavailable' });
  }
});

// API routes (for testing when actual backends aren't running)
app.get('/api/orders', (req, res) => {
  res.json({
    orders: [
      { id: 1, amount: 150.00, status: 'completed' },
      { id: 2, amount: 75.50, status: 'pending' },
      { id: 3, amount: 200.25, status: 'processing' }
    ],
    timestamp: new Date().toISOString()
  });
});

app.get('/api/dashboard', (req, res) => {
  res.json({
    metrics: {
      totalOrders: 3000,
      activeUsers: 200,
      revenue: 45000.00,
      systemLoad: Math.random() * 100
    },
    timestamp: new Date().toISOString()
  });
});

// Use load balancer for /api routes when backends are available
// app.use('/api', loadBalancer);

// WebSocket for real-time monitoring
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log(chalk.green('Client connected to monitoring WebSocket'));
  
  ws.on('message', (message) => {
    console.log(chalk.yellow(`Received: ${message}`));
  });
  
  ws.on('close', () => {
    console.log(chalk.yellow('Client disconnected from monitoring WebSocket'));
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'FinMark Network Lab Server',
    version: '1.0.0',
    endpoints: [
      '/health',
      '/api/orders',
      '/api/dashboard'
    ],
    websocket: 'ws://localhost:8080'
  });
});

app.listen(PORT, () => {
  console.log(chalk.green(`FinMark Network Lab running on port ${PORT}`));
  console.log(chalk.blue(`WebSocket monitoring on port 8080`));
  console.log(chalk.yellow(`Visit http://localhost:${PORT} to get started`));
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log(chalk.yellow('\nShutting down server...'));
  process.exit(0);
});
