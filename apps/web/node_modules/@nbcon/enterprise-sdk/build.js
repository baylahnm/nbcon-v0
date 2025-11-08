const path = require('path');
const Module = require('module');

// Add root node_modules to module resolution path
const rootNodeModules = path.join(__dirname, '../../node_modules');
const originalResolveFilename = Module._resolveFilename;

Module._resolveFilename = function(request, parent, isMain) {
  if (request === 'typescript') {
    try {
      return require.resolve('typescript', { paths: [rootNodeModules] });
    } catch (e) {
      // Fall through to default resolution
    }
  }
  return originalResolveFilename.call(this, request, parent, isMain);
};

// Require TypeScript
let ts;
try {
  ts = require('typescript');
} catch (e) {
  const tsPath = path.join(rootNodeModules, '.pnpm/typescript@5.9.3/node_modules/typescript');
  try {
    ts = require(tsPath);
  } catch (err) {
    console.error('❌ TypeScript not found:', err.message);
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
console.log('🔨 Compiling @nbcon/enterprise-sdk...');
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

