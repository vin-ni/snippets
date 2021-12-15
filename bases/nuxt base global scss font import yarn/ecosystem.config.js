module.exports = {
  apps: [
    {
      name: 'tripoly',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      env: {
        HOST: 'localhost',
        PORT: 3009,
      },
    },
  ],
}
