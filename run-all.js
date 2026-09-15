const { spawn } = require('child_process');
const path = require('path');

console.log('\x1b[36m%s\x1b[0m', '==================================================');
console.log('\x1b[32m%s\x1b[0m', '  Starting GiftLink Full-Stack Web Application');
console.log('\x1b[36m%s\x1b[0m', '==================================================');

const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';

// Start Backend
const backend = spawn(npmCmd, ['start'], {
    cwd: path.join(__dirname, 'giftlink-backend'),
    stdio: 'inherit',
    shell: true
});

// Start Frontend
const frontend = spawn(npmCmd, ['run', 'dev'], {
    cwd: path.join(__dirname, 'giftlink-frontend'),
    stdio: 'inherit',
    shell: true
});

process.on('SIGINT', () => {
    backend.kill();
    frontend.kill();
    process.exit();
});
