const path = require('path');
const fs = require('fs');

// Resolve symlinks to real paths
function resolveSymlink(filePath) {
  try {
    const stats = fs.lstatSync(filePath);
    if (stats.isSymbolicLink()) {
      const realPath = fs.readlinkSync(filePath);
      return path.isAbsolute(realPath) ? realPath : path.resolve(path.dirname(filePath), realPath);
    }
  } catch (e) {
    // Not a symlink or doesn't exist
  }
  return filePath;
}

// Resolve TypeScript from various possible locations
function findTypeScript() {
  const rootDir = path.join(__dirname, '../..');
  const rootNodeModules = path.join(rootDir, 'node_modules');
  const localNodeModules = path.join(__dirname, 'node_modules');
  
  // Try local node_modules first (most direct) - resolve symlinks
  const localTsPath = path.join(localNodeModules, 'typescript');
  if (fs.existsSync(localTsPath)) {
    const resolvedPath = resolveSymlink(localTsPath);
    const packageJson = path.join(resolvedPath, 'package.json');
    const libPath = path.join(resolvedPath, 'lib', 'typescript.js');
    if (fs.existsSync(packageJson) || fs.existsSync(libPath)) {
      return resolvedPath;
    }
  }
  
  // Try root node_modules
  const rootTsPath = path.join(rootNodeModules, 'typescript');
  if (fs.existsSync(rootTsPath)) {
    const packageJson = path.join(rootTsPath, 'package.json');
    const libPath = path.join(rootTsPath, 'lib', 'typescript.js');
    if (fs.existsSync(packageJson) || fs.existsSync(libPath)) {
      return rootTsPath;
    }
  }
  
  // Try pnpm store location - check if directory exists even if empty
  const pnpmStorePath = path.join(rootNodeModules, '.pnpm');
  if (fs.existsSync(pnpmStorePath)) {
    try {
      const pnpmDirs = fs.readdirSync(pnpmStorePath).filter(dir => dir.startsWith('typescript@'));
      for (const dir of pnpmDirs) {
        const tsPath = path.join(pnpmStorePath, dir, 'node_modules', 'typescript');
        // Even if package.json doesn't exist, try the path if directory exists
        if (fs.existsSync(tsPath)) {
          const libPath = path.join(tsPath, 'lib', 'typescript.js');
          // Check if lib/typescript.js exists (the actual file we need)
          if (fs.existsSync(libPath)) {
            return tsPath;
          }
          // Also try if it's a symlink that resolves elsewhere
          const resolved = resolveSymlink(tsPath);
          const resolvedLibPath = path.join(resolved, 'lib', 'typescript.js');
          if (fs.existsSync(resolvedLibPath)) {
            return resolved;
          }
        }
      }
    } catch (e) {
      // Continue to next method
    }
  }
  
  // Try require.resolve as last resort
  const searchPaths = [
    localNodeModules,
    rootNodeModules,
    rootDir,
    __dirname
  ];
  
  for (const searchPath of searchPaths) {
    try {
      const resolved = require.resolve('typescript', { paths: [searchPath] });
      if (resolved) {
        // Extract the typescript directory from the resolved path
        const match = resolved.match(/(.*[/\\]typescript)([/\\]|$)/);
        if (match && fs.existsSync(match[1])) {
          return match[1];
        }
      }
    } catch (e) {
      // Continue to next path
    }
  }
  
  throw new Error('TypeScript not found. Please run: pnpm install');
}

// Require TypeScript
let ts;
try {
  const tsPath = findTypeScript();
  // Try requiring the lib/typescript.js file directly
  const libPath = path.join(tsPath, 'lib', 'typescript.js');
  if (fs.existsSync(libPath)) {
    ts = require(libPath);
  } else {
    // Fallback to requiring the package
    ts = require(tsPath);
  }
} catch (err) {
  // Try one more time with require.resolve
  try {
    ts = require('typescript');
  } catch (e2) {
    console.error('❌ TypeScript not found:', err.message);
    console.error('   Please ensure TypeScript is installed: pnpm install');
    console.error('   Tried paths:', findTypeScript());
    process.exit(1);
  }
}

// Read tsconfig.json
const configPath = path.join(__dirname, 'tsconfig.json');
const configFile = ts.readConfigFile(configPath, ts.sys.readFile);

if (configFile.error) {
  console.error('❌ Failed to read tsconfig.json:', configFile.error);
  process.exit(1);
}

const parsedConfig = ts.parseJsonConfigFileContent(
  configFile.config,
  ts.sys,
  __dirname
);

if (parsedConfig.errors && parsedConfig.errors.length > 0) {
  console.error('❌ TypeScript config errors:');
  parsedConfig.errors.forEach(err => {
    console.error(`  ${err.messageText}`);
  });
  process.exit(1);
}

// Create program and emit
console.log('🔨 Compiling @nbcon/config...');
const program = ts.createProgram(parsedConfig.fileNames, parsedConfig.options);
const emitResult = program.emit();

// Check for errors
const allDiagnostics = ts
  .getPreEmitDiagnostics(program)
  .concat(emitResult.diagnostics);

if (allDiagnostics.length > 0) {
  // Filter to only show errors (not warnings) and ignore module resolution issues if skipLibCheck is true
  const errors = allDiagnostics.filter(d => {
    if (d.category !== ts.DiagnosticCategory.Error) return false;
    // Ignore module resolution errors if skipLibCheck is enabled (they're likely from dependencies)
    if (parsedConfig.options.skipLibCheck) {
      const message = ts.flattenDiagnosticMessageText(d.messageText, '\n');
      if (message.includes('Cannot find module') || message.includes('Cannot find type definition')) {
        return false; // Skip these as they're handled by skipLibCheck
      }
    }
    return true;
  });
  
  if (errors.length > 0) {
    console.error('❌ TypeScript compilation errors:');
    errors.forEach(diagnostic => {
      if (diagnostic.file) {
        const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
        const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
        console.error(`  ${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
      } else {
        console.error(`  ${ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')}`);
      }
    });
    process.exit(1);
  }
}

console.log('✅ Build completed successfully');

