const INVALID_PEER_DEPENDENCY_RE = /[─\─]\s([^\s]+)/g
const PACKAGE_AND_VERSION_RE = /(".+?")\sfrom\s(node_modules\/[^\s,]+)/g
function processOutput(data) {
  const lines = data.split('\n');
  const invalidLines = lines.filter(line => line.includes('invalid:'));

  const peerDependencies = {};
  for (const line of invalidLines) {
    const invalidPeerDependency = Array.from(line.matchAll(INVALID_PEER_DEPENDENCY_RE))?.[0]?.[1];
    if (!invalidPeerDependency) {
      continue;
    }

    if (!peerDependencies[invalidPeerDependency]) {
      peerDependencies[invalidPeerDependency] = {
        unmatchedLines: []
      };
    }

    const packageAndVersionMatches = Array.from(line.matchAll(PACKAGE_AND_VERSION_RE))
    if (packageAndVersionMatches.length === 0) {
      peerDependencies[invalidPeerDependency].unmatchedLines.push(line)
      continue
    }

    for (const packageAndVersionMatch of packageAndVersionMatches) {
      const packageName = packageAndVersionMatch[2];
      const requiredVersion = packageAndVersionMatch[1];
      peerDependencies[invalidPeerDependency][packageName] = requiredVersion;
    }
  }

  for (const [peerDependency, packages] of Object.entries(peerDependencies)) {
    console.log(`${peerDependency}`);
    if (packages.unmatchedLines.length) {
      console.log('  - Failed to parse packages from strings: ');
      for (const unmatchedLine of packages.unmatchedLines) {
        console.log(`    - \`${unmatchedLine}\``);
      }
    }
    for (const [packageName, versionStr] of Object.entries(packages)) {
      if (packageName === 'unmatchedLines') {
        continue;
      }
      console.log(`  - ${packageName}: ${versionStr}`);
    }
    console.log('');
  }
}

module.exports = processOutput;