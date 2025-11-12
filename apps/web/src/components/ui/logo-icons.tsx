"use client";

import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

interface LogoIconProps {
  src: string;
  alt: string;
  className?: string;
}

// Logo component that uses img tag for SVG files
const LogoIcon = ({ className, src, alt }: LogoIconProps) => {
  return (
    <img
      src={src}
      alt={alt}
      width={36}
      height={36}
      className={cn("h-9 w-9 object-contain", className)}
      style={{ pointerEvents: 'none' }}
    />
  );
};

// Payment & Finance
export const StripeIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/stripe-payment-icon.svg" alt="Stripe" className={className} />
);

export const PayPalIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/paypal-icon.svg" alt="PayPal" className={className} />
);

// AI & Cloud Platforms
export const NvidiaIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/nvidia-icon.svg" alt="NVIDIA" className={className} />
);

export const OpenAIIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/openai.svg" alt="OpenAI" className={className} />
);

export const AnthropicIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/anthropic.svg" alt="Anthropic" className={className} />
);

export const ClaudeIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/claude-color.svg" alt="Claude" className={className} />
);

export const GoogleIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/google-color.svg" alt="Google" className={className} />
);

export const GeminiIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/gemini-color.svg" alt="Google Gemini" className={className} />
);

export const AzureIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/azure-color.svg" alt="Microsoft Azure" className={className} />
);

export const AWSIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/aws-color.svg" alt="AWS" className={className} />
);

export const CloudflareIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/cloudflare-color.svg" alt="Cloudflare" className={className} />
);

// Developer Tools & Platforms
export const SupabaseIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/supabase-icon.svg" alt="Supabase" className={className} />
);

export const GitHubIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/github-white-icon.svg" alt="GitHub" className={className} />
);

export const VercelIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/vercel-v0-icon.svg" alt="Vercel" className={className} />
);

export const DockerIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/docker-icon.svg" alt="Docker" className={className} />
);

export const VSCodeIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/visual-studio-code-icon.svg" alt="VS Code" className={className} />
);

export const CursorIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/cursor-ai-code-icon.svg" alt="Cursor" className={className} />
);

export const GitIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/git-icon.svg" alt="Git" className={className} />
);

export const ViteIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/vite-dev-icon.svg" alt="Vite" className={className} />
);

// Programming Languages
export const TypeScriptIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/typescript-programming-language-icon.svg" alt="TypeScript" className={className} />
);

export const JavaScriptIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/javascript-programming-language-icon.svg" alt="JavaScript" className={className} />
);

export const PythonIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/python-programming-language-icon.svg" alt="Python" className={className} />
);

// Databases & Backend
export const PostgreSQLIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/postgresql-icon.svg" alt="PostgreSQL" className={className} />
);

// Collaboration & Productivity
export const SlackIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/slack-icon.svg" alt="Slack" className={className} />
);

export const NotionIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/notion.svg" alt="Notion" className={className} />
);

export const ZapierIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/zapier-icon.svg" alt="Zapier" className={className} />
);

export const MakeIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/make-ai-automation-icon.svg" alt="Make" className={className} />
);

// Design & Tools
export const FigmaIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/figma-color.svg" alt="Figma" className={className} />
);

export const CanvaIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/canva-icon.svg" alt="Canva" className={className} />
);

// Enterprise & Hardware
export const MicrosoftIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/microsoft-icon.svg" alt="Microsoft" className={className} />
);

export const IntelIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/intel-icon.svg" alt="Intel" className={className} />
);

export const AMDIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/amd-icon.svg" alt="AMD" className={className} />
);

export const CiscoIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/cisco-icon.svg" alt="Cisco" className={className} />
);

// More AI Models
export const MistralIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/mistral-color.svg" alt="Mistral" className={className} />
);

export const PerplexityIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/perplexity-color.svg" alt="Perplexity" className={className} />
);

export const GrokIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/grok.svg" alt="Grok" className={className} />
);

export const DeepSeekIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/deepseek-color.svg" alt="DeepSeek" className={className} />
);

export const QwenIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/qwen-color.svg" alt="Qwen" className={className} />
);

export const MetaAIIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/metaai-color.svg" alt="Meta AI" className={className} />
);

export const StabilityIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/stability-color.svg" alt="Stability AI" className={className} />
);

export const MidjourneyIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/midjourney.svg" alt="Midjourney" className={className} />
);

export const DalleIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/dalle-color.svg" alt="DALL-E" className={className} />
);

export const FluxIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/flux.svg" alt="Flux" className={className} />
);

// More Developer Tools
export const GoogleCloudIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/googlecloud-color.svg" alt="Google Cloud" className={className} />
);

export const DropboxIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/dropbox-icon.svg" alt="Dropbox" className={className} />
);

export const ShopifyIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/shopify-icon.svg" alt="Shopify" className={className} />
);

export const HubSpotIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/hubspot-icon.svg" alt="HubSpot" className={className} />
);

export const ZoomIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/zoom-communications-icon.svg" alt="Zoom" className={className} />
);

export const FramerIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/framer-black-icon.svg" alt="Framer" className={className} />
);

export const UnrealEngineIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/unreal-engine-icon.svg" alt="Unreal Engine" className={className} />
);

export const HostingerIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/hostinger-icon.svg" alt="Hostinger" className={className} />
);

// More Enterprise
export const IBMIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/ibm.svg" alt="IBM" className={className} />
);

export const SamsungIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/samsung-icon.svg" alt="Samsung" className={className} />
);

export const AppleIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/apple-icon.svg" alt="Apple" className={className} />
);

export const TeslaIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/tesla-icon.svg" alt="Tesla" className={className} />
);

export const MetaIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/meta-color.svg" alt="Meta" className={className} />
);

export const AlibabaIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/alibaba-color.svg" alt="Alibaba" className={className} />
);

export const ByteDanceIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/bytedance-color.svg" alt="ByteDance" className={className} />
);

export const HuaweiIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/huawei-color.svg" alt="Huawei" className={className} />
);

// More Tools
export const N8NIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/n8n-color.svg" alt="n8n" className={className} />
);

export const OllamaIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/ollama.svg" alt="Ollama" className={className} />
);

export const OpenRouterIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/openrouter.svg" alt="OpenRouter" className={className} />
);

export const LMStudioIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/lmstudio.svg" alt="LM Studio" className={className} />
);

export const ComfyUIIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/comfyui-color.svg" alt="ComfyUI" className={className} />
);

export const LLaMAIndexIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/llamaindex-color.svg" alt="LLaMA Index" className={className} />
);

export const CopilotIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/copilot-color.svg" alt="GitHub Copilot" className={className} />
);

export const GitHubCopilotIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/githubcopilot.svg" alt="GitHub Copilot" className={className} />
);

export const CursorSVGIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/cursor.svg" alt="Cursor" className={className} />
);

export const LovableIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/lovable-color.svg" alt="Lovable" className={className} />
);

export const KimiIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/kimi-color.svg" alt="Kimi" className={className} />
);

export const ElevenLabsIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/elevenlabs.svg" alt="ElevenLabs" className={className} />
);

export const SunoIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/suno.svg" alt="Suno" className={className} />
);

export const AkashChatIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/akashchat-color.svg" alt="Akash Chat" className={className} />
);

export const AIStudioIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/aistudio.svg" alt="AI Studio" className={className} />
);

export const CapCutIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <LogoIcon src="/assets/icons/icons/capcut.svg" alt="CapCut" className={className} />
);
