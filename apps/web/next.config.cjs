/** @type {import('next').NextConfig} */
const { withSentryConfig } = require("@sentry/nextjs");

const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
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
  webpack: (config, { isServer }) => {
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
  transpilePackages: ['@nbcon/config'],
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

