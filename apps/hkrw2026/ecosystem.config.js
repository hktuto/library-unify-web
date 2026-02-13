module.exports = {
  apps: [
    {
      name: "library-2025-frontend",
      script: "./.output/server/index.mjs",
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      // Log files
      log_file: "./logs/combined.log",
      out_file: "./logs/out.log",
      error_file: "./logs/error.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      // Merge logs from all instances
      merge_logs: true,
      // Time to wait before forcing a reload
      kill_timeout: 5000,
      // Number of retries on failure
      restart_delay: 3000,
      // Max restarts within 60 seconds before stopping
      max_restarts: 10,
      // Min uptime to be considered stable (ms)
      min_uptime: "10s",
    },
  ],
};
