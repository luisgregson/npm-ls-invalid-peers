function processOutput(data) {
  const lines = data.split('\n');
  const dedupedLines = lines.filter(line => line.includes('deduped invalid') || line.includes('deduped'));

  const dependencies = {};

  for (const line of dedupedLines) {
    const match = line.match(/(react(?:-dom)?@\d+\.\d+\.\d+)/);

    if (!match) {
      continue;
    }

    const dependency = match[1];

    if (!dependencies[dependency]) {
      dependencies[dependency] = [];
    }

    const packageMatch = line.match(/node_modules\/([^/]+)/);
    const requiredVersionMatch = line.match(/invalid: "([^"]+)"/);

    if (packageMatch && requiredVersionMatch) {
      const packageName = packageMatch[1];
      const requiredVersion = requiredVersionMatch[1];
      dependencies[dependency].push(`${packageName}: "${requiredVersion}"`);
    }
  }

  for (const [dependency, packages] of Object.entries(dependencies)) {
    console.log(`${dependency}`);
    for (const packageInfo of packages) {
      console.log(`  - ${packageInfo}`);
    }
    console.log('');
  }
}

module.exports = processOutput;