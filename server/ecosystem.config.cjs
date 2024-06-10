module.exports = {
  /**
   * App info
   */
  apps: [
    {
      name: 'mangaland',
      script: 'dist/src/index.js',

      listen_timeout: 3_000,
      kill_timeout: 10_000,
      wait_ready: true,
      instances: 2,
      exec_mode: 'cluster',

      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'mangaland-scrape',
      script: 'dist/src/cron/scrape.js',
      instances: 1,
      cron_restart: '0 * * * *',
      autorestart: false,
    },
  ],
};
