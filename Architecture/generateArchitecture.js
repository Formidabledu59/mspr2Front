const fs = require('fs');
const path = require('path');

function generateTree(dirPath, prefix = '') {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true })
    .filter(e => !['node_modules', '.git'].includes(e.name)) // Dossiers exclus
    .sort((a, b) => a.name.localeCompare(b.name));

  return entries.map((entry, index) => {
    const isLast = index === entries.length - 1;
    const connector = isLast ? '└── ' : '├── ';
    const fullPath = path.join(dirPath, entry.name);
    const line = `${prefix}${connector}${entry.name}`;

    if (entry.isDirectory()) {
      const subTree = generateTree(fullPath, prefix + (isLast ? '    ' : '│   '));
      return [line, ...subTree].join('\n');
    } else {
      return line;
    }
  });
}

const projectRoot = path.resolve(__dirname, '..'); // racine du projet
const output = ['.'];
output.push(...generateTree(projectRoot));

const outputPath = path.join(projectRoot, 'architecture.txt');
fs.writeFileSync(outputPath, output.join('\n'), 'utf-8');
console.log(`✅ Fichier "architecture.txt" généré à : ${outputPath}`);
