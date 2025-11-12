export const en = {
  common: {
    home: "Home",
    dashboard: "Dashboard",
    projects: "Projects",
    billing: "Billing",
    settings: "Settings",
    help: "Help",
    logout: "Logout",
    loading: "Loading...",
    error: "Error",
    success: "Success",
    cancel: "Cancel",
    confirm: "Confirm",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    close: "Close",
  },
  auth: {
    login: "Login",
    signup: "Sign Up",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    fullName: "Full Name",
    forgotPassword: "Forgot Password?",
    alreadyHaveAccount: "Already have an account?",
    dontHaveAccount: "Don't have an account?",
    loginWithEmail: "Login with Email",
    signupWithEmail: "Sign Up with Email",
  },
  dashboard: {
    welcome: "Welcome back!",
    overview: "Here's your overview",
    activeProjects: "Active Projects",
    aiUsage: "AI Usage",
    teamMembers: "Team Members",
    growth: "Growth",
    projectActivity: "Project Activity",
    aiUsageTrends: "AI Usage Trends",
    subscriptionStatus: "Subscription Status",
    currentPlan: "Your current plan includes access to core features and tools.",
  },
  billing: {
    title: "Billing & Subscription",
    currentPlan: "Current Plan",
    manageSubscription: "Manage Subscription",
    upgrade: "Upgrade",
    currentPlanBadge: "Current",
    selectPlan: "Select Plan",
  },
  projects: {
    title: "Projects",
    description: "Manage your projects.",
  },
  ai: {
    title: "AI Co-Pilot",
    description: "AI-powered assistance",
    enterPrompt: "Enter your prompt...",
    runAgent: "Run Agent",
    processing: "Processing...",
    response: "Response:",
  },
  chat: {
    projectChat: "Project Chat",
    startConversation: "Start a conversation with",
    thinking: "Thinking...",
    ask: "Ask",
  },
  docs: {
    title: "nbcon.ai Documentation",
    description: "nbcon.ai is an AI-powered engineering platform that understands your projects and helps you build faster through natural language.",
    getStarted: "Get started",
    getStartedDesc: "Download, install, and start building with nbcon.ai in minutes",
    concepts: "Concepts",
    conceptsDesc: "Understand core concepts and features that power nbcon.ai",
    downloads: "Downloads",
    downloadsDesc: "Get nbcon.ai for your computer",
    support: "Support",
    supportDesc: "For account and billing questions, contact our support team",
    integrationsSummary: "nbcon.ai Integrations — Connect your workflows, BIM tools, and AI-powered systems.",
    integrationOverview: "Overview",
    setup: "Setup",
    notes: "Notes",
    bestPractices: "Best practices for secure integration and optimal performance.",
    // Sections
    sections: {
      "get-started": "Get Started",
      core: "Core",
      configuration: "Configuration",
      context: "Context",
      integrations: "Integrations",
      account: "Account",
      cookbook: "Cookbook",
      troubleshooting: "Troubleshooting",
      downloads: "Downloads",
      enterprise: "Enterprise",
    },
    // Get Started pages
    pages: {
      "get-started/welcome": {
        title: "Welcome",
        description: "Start here to learn how nbcon.ai is structured",
      },
      "get-started/quickstart": {
        title: "Quickstart",
        description: "Get up and running with nbcon.ai in minutes",
      },
      "get-started/concepts": {
        title: "Concepts",
        description: "Core concepts and architecture",
      },
      "get-started/models": {
        title: "Models",
        description: "AI models and capabilities",
      },
      "get-started/pricing": {
        title: "Pricing",
        description: "Pricing plans and features",
      },
      // Core pages (reordered)
      "core/tab": {
        title: "Tab",
        description: "Tab management",
      },
      "core/agent": {
        title: "Agent",
        description: "Using AI agents in nbcon.ai",
      },
      "core/cloud": {
        title: "Cloud",
        description: "Cloud features and sync",
      },
      "core/cli": {
        title: "CLI",
        description: "Command-line interface",
      },
      "core/inline-edit": {
        title: "Inline Edit",
        description: "Inline editing capabilities",
      },
      "core/rules": {
        title: "Rules",
        description: "Custom rules and configurations",
      },
      "core/bugbot": {
        title: "Bugbot",
        description: "Automated bug detection and fixing",
      },
      // Configuration pages (reordered)
      "configuration/extensions": {
        title: "Extensions",
        description: "Browser extensions",
      },
      "configuration/keyboard-shortcuts": {
        title: "Keyboard Shortcuts",
        description: "Keyboard shortcuts reference",
      },
      "configuration/themes": {
        title: "Themes",
        description: "Theme customization",
      },
      "configuration/shell-commands": {
        title: "Shell Commands",
        description: "Shell command configuration",
      },
      "configuration/parallel-agents": {
        title: "Parallel Agents",
        description: "Running multiple agents",
      },
      "configuration/languages": {
        title: "Languages",
        description: "Multi-language support",
      },
      "configuration/migrations": {
        title: "Migrations",
        description: "Database migrations",
      },
      // Context pages
      "context/at-symbols": {
        title: "@ Symbols",
        description: "Using @ symbols for context",
      },
      "context/codebase-indexing": {
        title: "Codebase Indexing",
        description: "Indexing your codebase",
      },
      "context/ignore-files": {
        title: "Ignore Files",
        description: "Configuring ignore files",
      },
      "context/model-context-protocol-mcp": {
        title: "Model Context Protocol (MCP)",
        description: "MCP integration",
      },
      // Integrations pages (System + Ecosystem)
      // System Integrations
      "integrations/supabase": {
        title: "Supabase",
        description: "Supabase integration for authentication, database, and realtime features",
      },
      "integrations/stripe": {
        title: "Stripe & Local Payment Gateways",
        description: "Payment processing integration with Stripe and local payment gateways",
      },
      "integrations/cloudflare": {
        title: "Cloudflare",
        description: "Cloudflare integration for security, CDN, and edge computing",
      },
      "integrations/maps": {
        title: "Maps (Mapbox / Google Maps)",
        description: "Mapbox and Google Maps integration for location services",
      },
      "integrations/ai-providers": {
        title: "AI Providers (Gemini / OpenAI)",
        description: "Gemini and OpenAI integration for AI-powered features",
      },
      // DevOps & Team Integrations
      "integrations/github": {
        title: "GitHub",
        description: "GitHub integration for DevOps workflows",
      },
      "integrations/slack-linear": {
        title: "Slack & Linear",
        description: "Team collaboration integrations with Slack and Linear",
      },
      "integrations/deeplinks-webhooks": {
        title: "Deeplinks & Webhooks",
        description: "Deep linking and webhook integration for external systems",
      },
      // Cloud Storage
      "integrations/google-drive": {
        title: "Google Drive",
        description: "Google Drive integration for file storage and collaboration",
      },
      "integrations/dropbox": {
        title: "Dropbox",
        description: "Dropbox integration for file storage and sync",
      },
      "integrations/one-drive": {
        title: "Microsoft OneDrive",
        description: "OneDrive integration for Microsoft 365 file storage",
      },
      // BIM & Engineering Tools
      "integrations/autodesk": {
        title: "Autodesk",
        description: "Autodesk integration for CAD and BIM workflows",
      },
      "integrations/arcgis": {
        title: "ArcGIS",
        description: "ArcGIS integration for geospatial data and mapping",
      },
      "integrations/revit": {
        title: "Revit",
        description: "Revit integration for BIM model access and data extraction",
      },
      "integrations/bim-360": {
        title: "BIM 360",
        description: "BIM 360 integration for construction project management",
      },
      "integrations/sharepoint": {
        title: "SharePoint",
        description: "SharePoint integration for enterprise document management",
      },
      "integrations/trimble-connect": {
        title: "Trimble Connect",
        description: "Trimble Connect integration for construction collaboration",
      },
      "integrations/bluebeam-studio": {
        title: "Bluebeam Studio",
        description: "Bluebeam Studio integration for PDF collaboration and markup",
      },
      "integrations/esri-hub": {
        title: "Esri Hub",
        description: "Esri Hub integration for geospatial data portals and collaboration",
      },
      // Account pages
      "account/billing": {
        title: "Billing",
        description: "Billing and subscriptions",
      },
      "account/update-access": {
        title: "Update Access",
        description: "Updating access permissions",
      },
      "account/teams": {
        title: "Teams",
        description: "Working with teams and collaboration",
      },
      "account/free": {
        title: "Free",
        description: "Free plan features and limitations",
      },
      "account/basic": {
        title: "Basic",
        description: "Basic plan features and pricing",
      },
      "account/pro": {
        title: "Pro",
        description: "Pro plan features and pricing",
      },
      "account/enterprise": {
        title: "Enterprise",
        description: "Enterprise plan features and pricing",
      },
      // Cookbook pages
      "cookbook/building-an-mcp-server": {
        title: "Building an MCP Server",
        description: "Guide to building MCP servers",
      },
      "cookbook/data-science": {
        title: "Data Science",
        description: "Data science workflows",
      },
      "cookbook/large-codebases": {
        title: "Large Codebases",
        description: "Working with large codebases",
      },
      "cookbook/mermaid-diagrams": {
        title: "Mermaid Diagrams",
        description: "Creating diagrams",
      },
      "cookbook/web-development": {
        title: "Web Development",
        description: "Web development workflows",
      },
      // Troubleshooting pages
      "troubleshooting/common-issues": {
        title: "Common Issues",
        description: "Common problems and solutions",
      },
      "troubleshooting/getting-a-request-id": {
        title: "Getting a Request ID",
        description: "How to get request IDs",
      },
      "troubleshooting/troubleshooting-guide": {
        title: "Troubleshooting Guide",
        description: "General troubleshooting",
      },
      "troubleshooting/downloads": {
        title: "Downloads",
        description: "Download links and resources",
      },
    },
  },
  roadmap: {
    title: "Implementation Roadmap",
    overallProgress: "Overall Progress",
    tasksCompleted: "tasks completed",
    allTasksCompleted: "✅ All tasks completed",
    tasksRemaining: "task(s) remaining",
    nextSteps: "Next Steps",
    completeI18n: "Implement i18n system for Arabic/English (Phase 4)",
    completeProduction: "Complete production validation (Phase 9)",
  },
  navigation: {
    breadcrumbHome: "Home",
  },
};

