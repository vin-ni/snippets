module.exports = {
  apps: [
    {
      name: 'api.drifter',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      autorestart: true,
      script: 'server.js',
      args: 'start',
      env: {
        IP: 'localhost',
        PORT: 3006,
      },
    },
  ],
}