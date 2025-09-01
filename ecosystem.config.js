export default {
  apps: [{
    name: 'bengkelai-fe',
    script: 'npm',
    args: 'start',
    cwd: '/home/aidilbaihaqi/apps/bengkelai-fe',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/home/aidilbaihaqi/apps/bengkelai-fe/logs/err.log',
    out_file: '/home/aidilbaihaqi/apps/bengkelai-fe/logs/out.log',
    log_file: '/home/aidilbaihaqi/apps/bengkelai-fe/logs/combined.log',
    time: true
  }]
};