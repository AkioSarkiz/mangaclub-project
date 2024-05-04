module.exports = {
  /**
   * App info
   */
  apps: [
    {
      name: "mangaland",
      script: "dist/index.js",

      listen_timeout: 3_000,
      kill_timeout: 10_000,
      wait_ready: true,
      instances: 2,
      exec_mode: "cluster",

      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
