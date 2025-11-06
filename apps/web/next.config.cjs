/** @type {import('next').NextConfig} */
const { withSentryConfig } = require("@sentry/nextjs");

const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: false,
  },
  experimental: {
    outputFileTracingRoot: require("path").join(__dirname, "../../"),
    serverComponentsExternalPackages: ['stripe'],
  },
  async redirects() {
    return [
      {
        source: '/login',
        destination: '/auth/login',
        permanent: true,
      },
    ];
  },
  webpack: (config, { isServer, defaultLoaders }) => {
    const path = require('path');
    const packagesPath = path.resolve(__dirname, '../../packages');
    
    // Ensure TypeScript files in workspace packages are transpiled
    // The issue is that transpilePackages doesn't work when package.json points to .ts files
    // We need to explicitly tell webpack to process these files
    
    // Ensure packages are resolved from source, not treated as external
    if (!config.resolve) {
      config.resolve = {};
    }
    if (!config.resolve.alias) {
      config.resolve.alias = {};
    }
    
    // Add alias to ensure @nbcon/config resolves correctly to source files
    config.resolve.alias['@nbcon/config'] = path.resolve(packagesPath, 'config');
    
    // Ensure packages are not treated as external modules
    if (config.externals && Array.isArray(config.externals)) {
      config.externals = config.externals.filter(ext => {
        if (typeof ext === 'string') {
          return !ext.includes('@nbcon/config');
        }
        return true;
      });
    }
    
    // Find the oneOf rule that Next.js uses for file processing
    const oneOfRule = config.module.rules.find((rule) => rule.oneOf);
    
    if (oneOfRule) {
      // CRITICAL: Add an explicit rule at the VERY BEGINNING to catch packages TypeScript files
      // This must come before any other rules that might exclude them
      // Find the SWC loader configuration from Next.js's existing rules
      const swcLoaderRule = oneOfRule.oneOf.find(rule => 
        rule.test && 
        rule.test.toString().includes('tsx?') && 
        rule.use && 
        Array.isArray(rule.use) &&
        rule.use.some(u => u && typeof u === 'object' && u.loader && u.loader.includes('swc'))
      );
      
      if (swcLoaderRule && swcLoaderRule.use) {
        // Clone the SWC loader configuration for packages
        oneOfRule.oneOf.unshift({
          test: /\.tsx?$/,
          include: [
            path.resolve(packagesPath, 'config'),
            path.resolve(packagesPath, 'ai-core'),
            path.resolve(packagesPath, 'enterprise-sdk'),
          ],
          exclude: /node_modules/,
          use: swcLoaderRule.use,
        });
      } else if (defaultLoaders && defaultLoaders.babel) {
        // Fallback to babel if SWC loader not found
        oneOfRule.oneOf.unshift({
          test: /\.tsx?$/,
          include: [
            path.resolve(packagesPath, 'config'),
            path.resolve(packagesPath, 'ai-core'),
            path.resolve(packagesPath, 'enterprise-sdk'),
          ],
          exclude: /node_modules/,
          use: defaultLoaders.babel,
        });
      }
      
      // Also modify existing TypeScript rules to explicitly include packages directory
      oneOfRule.oneOf.forEach((rule) => {
        // Look for rules that handle TypeScript files
        if (rule.test && (
          (rule.test.toString().includes('tsx?') && !rule.test.toString().includes('tsconfig')) ||
          (rule.use && Array.isArray(rule.use) && rule.use.some(u => 
            (typeof u === 'object' && u && u.loader && u.loader.includes('swc'))
          ))
        )) {
          // Remove any exclude that might be blocking packages
          if (rule.exclude) {
            if (Array.isArray(rule.exclude)) {
              // Remove node_modules exclusion for packages directory
              rule.exclude = rule.exclude.filter(exc => {
                if (typeof exc === 'string') {
                  return !exc.includes('packages');
                }
                if (exc && typeof exc === 'function') {
                  // Test if the function would exclude packages path
                  try {
                    return !exc(packagesPath);
                  } catch {
                    return true;
                  }
                }
                return true;
              });
            } else if (typeof rule.exclude === 'function') {
              // Wrap exclude function to allow packages
              const originalExclude = rule.exclude;
              rule.exclude = (filepath) => {
                if (filepath && filepath.includes('packages') && !filepath.includes('node_modules')) {
                  return false; // Don't exclude packages
                }
                return originalExclude(filepath);
              };
            }
          }
          
          // Ensure packages are included
          if (!rule.include) {
            rule.include = [];
          }
          if (Array.isArray(rule.include)) {
            const packagesIncluded = rule.include.some((inc) => {
              if (typeof inc === 'string') {
                return inc.includes('packages') || inc === packagesPath;
              }
              if (inc && typeof inc === 'function') {
                try {
                  return inc(packagesPath);
                } catch {
                  return false;
                }
              }
              return false;
            });
            
            if (!packagesIncluded) {
              rule.include.push(packagesPath);
            }
          } else if (typeof rule.include === 'string') {
            rule.include = [rule.include, packagesPath];
          } else if (typeof rule.include === 'function') {
            const originalInclude = rule.include;
            rule.include = (filepath) => {
              if (filepath && filepath.includes('packages') && !filepath.includes('node_modules')) {
                return true; // Include packages
              }
              return originalInclude(filepath);
            };
          }
        }
      });
    }

    // Prevent server-only stripeClient from being bundled in client
    if (!isServer) {
      // Ignore stripe package and server-only config exports on client
      config.externals = config.externals || [];
      if (typeof config.externals === 'function') {
        const originalExternals = config.externals;
        config.externals = [
          originalExternals,
          (context, request, callback) => {
            if (request === 'stripe' || request.includes('stripeClient')) {
              return callback(null, 'commonjs ' + request);
            }
            callback();
          },
        ];
      } else if (Array.isArray(config.externals)) {
        config.externals.push({
          stripe: 'commonjs stripe',
        });
      }
    }
    return config;
  },
  transpilePackages: ['@nbcon/config', '@lobehub/icons'],
};

// Only wrap with Sentry in production
const sentryWebpackPluginOptions = {
  silent: true,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
};

module.exports =
  process.env.NODE_ENV === "production" && process.env.SENTRY_DSN
    ? withSentryConfig(nextConfig, sentryWebpackPluginOptions)
    : nextConfig;

