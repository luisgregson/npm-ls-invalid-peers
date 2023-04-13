const { spawn } = require('child_process');
const processOutput = require('./processOutput');

function lsInvalidPeers() {
  const cmd = spawn('npm', ['ls', '--all']);

  let data = '';
  cmd.stdout.on('data', (chunk) => {
    data += chunk.toString();
  });

  cmd.stderr.on('data', (chunk) => {
    console.error(chunk.toString());
  });

  cmd.on('exit', (code) => {
    if (code !== 0) {
      console.warn('npm ls --all exited with code', code);
    }
    const result = processOutput(data);
  });
}

module.exports = lsInvalidPeers;
