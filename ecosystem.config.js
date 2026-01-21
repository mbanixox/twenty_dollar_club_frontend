module.exports = {
  apps: [{
    name: 'twenty-dollar-club-frontend',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    cwd: './',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}