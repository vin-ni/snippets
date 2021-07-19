module.exports = {
  apps: [
    {
      name: 'tts.drifter',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      autorestart: true,
      script: 'server.js',
      args: 'start',
      env: {
        IP: 'localhost',
        PORT: 3007,
        ENVIRONMENT: 'production',
      },
    },
  ],
};
