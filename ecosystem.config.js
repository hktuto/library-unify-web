module.exports = {
  apps: [
    {
      name: "library-2025-frontend",
      script: "./apps/hkrw2026/.output/server/index.mjs",
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      // Log files
      log_file: "./logs/frontend_combined.log",
      out_file: "./logs/frontend_out.log",
      error_file: "./logs/frontend_error.log",
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
