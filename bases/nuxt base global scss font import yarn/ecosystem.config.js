module.exports = {
  apps: [
    {
      name: 'drifter.augmented.audio',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      env: {
        NUXTHOST: 'localhost',
        NUXTPORT: 3004,
      },
    },
  ],
}
