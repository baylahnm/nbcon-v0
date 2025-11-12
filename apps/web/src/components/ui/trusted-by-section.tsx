"use client";

import { LogoCarousel } from "./logo-carousel";
import { GradientHeading } from "./gradient-heading";
import { useResponsiveColumns } from "@/hooks/useResponsiveColumns";
import {
  // Payment & Finance
  StripeIcon,
  PayPalIcon,
  // AI & Cloud Platforms
  NvidiaIcon,
  OpenAIIcon,
  AnthropicIcon,
  ClaudeIcon,
  GoogleIcon,
  GeminiIcon,
  AzureIcon,
  AWSIcon,
  CloudflareIcon,
  GoogleCloudIcon,
  // More AI Models
  MistralIcon,
  PerplexityIcon,
  GrokIcon,
  DeepSeekIcon,
  QwenIcon,
  MetaAIIcon,
  StabilityIcon,
  MidjourneyIcon,
  DalleIcon,
  FluxIcon,
  KimiIcon,
  // Developer Tools & Platforms
  SupabaseIcon,
  GitHubIcon,
  VercelIcon,
  DockerIcon,
  VSCodeIcon,
  CursorIcon,
  GitIcon,
  ViteIcon,
  DropboxIcon,
  FramerIcon,
  UnrealEngineIcon,
  HostingerIcon,
  // Programming Languages
  TypeScriptIcon,
  JavaScriptIcon,
  PythonIcon,
  // Databases & Backend
  PostgreSQLIcon,
  // Collaboration & Productivity
  SlackIcon,
  NotionIcon,
  ZapierIcon,
  MakeIcon,
  ZoomIcon,
  N8NIcon,
  // Design & Tools
  FigmaIcon,
  CanvaIcon,
  ShopifyIcon,
  HubSpotIcon,
  // Enterprise & Hardware
  MicrosoftIcon,
  IntelIcon,
  AMDIcon,
  CiscoIcon,
  IBMIcon,
  SamsungIcon,
  AppleIcon,
  TeslaIcon,
  MetaIcon,
  AlibabaIcon,
  ByteDanceIcon,
  HuaweiIcon,
  // AI Development Tools
  OllamaIcon,
  OpenRouterIcon,
  LMStudioIcon,
  ComfyUIIcon,
  LLaMAIndexIcon,
  CopilotIcon,
  GitHubCopilotIcon,
  CursorSVGIcon,
  LovableIcon,
  ElevenLabsIcon,
  SunoIcon,
  AkashChatIcon,
  AIStudioIcon,
  CapCutIcon,
} from "./logo-icons";

const trustedLogos = [
  // Payment & Finance
  { name: "Stripe", id: 1, img: StripeIcon },
  { name: "PayPal", id: 2, img: PayPalIcon },
  // AI & Cloud Platforms
  { name: "NVIDIA", id: 3, img: NvidiaIcon },
  { name: "OpenAI", id: 4, img: OpenAIIcon },
  { name: "Anthropic", id: 5, img: AnthropicIcon },
  { name: "Claude", id: 6, img: ClaudeIcon },
  { name: "Google", id: 7, img: GoogleIcon },
  { name: "Gemini", id: 8, img: GeminiIcon },
  { name: "Azure", id: 9, img: AzureIcon },
  { name: "AWS", id: 10, img: AWSIcon },
  { name: "Cloudflare", id: 11, img: CloudflareIcon },
  { name: "Google Cloud", id: 12, img: GoogleCloudIcon },
  // More AI Models
  { name: "Mistral", id: 13, img: MistralIcon },
  { name: "Perplexity", id: 14, img: PerplexityIcon },
  { name: "Grok", id: 15, img: GrokIcon },
  { name: "DeepSeek", id: 16, img: DeepSeekIcon },
  { name: "Qwen", id: 17, img: QwenIcon },
  { name: "Meta AI", id: 18, img: MetaAIIcon },
  { name: "Stability AI", id: 19, img: StabilityIcon },
  { name: "Midjourney", id: 20, img: MidjourneyIcon },
  { name: "DALL-E", id: 21, img: DalleIcon },
  { name: "Flux", id: 22, img: FluxIcon },
  { name: "Kimi", id: 23, img: KimiIcon },
  // Developer Tools & Platforms
  { name: "Supabase", id: 24, img: SupabaseIcon },
  { name: "GitHub", id: 25, img: GitHubIcon },
  { name: "Vercel", id: 26, img: VercelIcon },
  { name: "Docker", id: 27, img: DockerIcon },
  { name: "VS Code", id: 28, img: VSCodeIcon },
  { name: "Cursor", id: 29, img: CursorIcon },
  { name: "Git", id: 30, img: GitIcon },
  { name: "Vite", id: 31, img: ViteIcon },
  { name: "Dropbox", id: 32, img: DropboxIcon },
  { name: "Framer", id: 33, img: FramerIcon },
  { name: "Unreal Engine", id: 34, img: UnrealEngineIcon },
  { name: "Hostinger", id: 35, img: HostingerIcon },
  // Programming Languages
  { name: "TypeScript", id: 36, img: TypeScriptIcon },
  { name: "JavaScript", id: 37, img: JavaScriptIcon },
  { name: "Python", id: 38, img: PythonIcon },
  // Databases & Backend
  { name: "PostgreSQL", id: 39, img: PostgreSQLIcon },
  // Collaboration & Productivity
  { name: "Slack", id: 40, img: SlackIcon },
  { name: "Notion", id: 41, img: NotionIcon },
  { name: "Zapier", id: 42, img: ZapierIcon },
  { name: "Make", id: 43, img: MakeIcon },
  { name: "Zoom", id: 44, img: ZoomIcon },
  { name: "n8n", id: 45, img: N8NIcon },
  // Design & Tools
  { name: "Figma", id: 46, img: FigmaIcon },
  { name: "Canva", id: 47, img: CanvaIcon },
  { name: "Shopify", id: 48, img: ShopifyIcon },
  { name: "HubSpot", id: 49, img: HubSpotIcon },
  // Enterprise & Hardware
  { name: "Microsoft", id: 50, img: MicrosoftIcon },
  { name: "Intel", id: 51, img: IntelIcon },
  { name: "AMD", id: 52, img: AMDIcon },
  { name: "Cisco", id: 53, img: CiscoIcon },
  { name: "IBM", id: 54, img: IBMIcon },
  { name: "Samsung", id: 55, img: SamsungIcon },
  { name: "Apple", id: 56, img: AppleIcon },
  { name: "Tesla", id: 57, img: TeslaIcon },
  { name: "Meta", id: 58, img: MetaIcon },
  { name: "Alibaba", id: 59, img: AlibabaIcon },
  { name: "ByteDance", id: 60, img: ByteDanceIcon },
  { name: "Huawei", id: 61, img: HuaweiIcon },
  // AI Development Tools
  { name: "Ollama", id: 62, img: OllamaIcon },
  { name: "OpenRouter", id: 63, img: OpenRouterIcon },
  { name: "LM Studio", id: 64, img: LMStudioIcon },
  { name: "ComfyUI", id: 65, img: ComfyUIIcon },
  { name: "LLaMA Index", id: 66, img: LLaMAIndexIcon },
  { name: "Copilot", id: 67, img: CopilotIcon },
  { name: "GitHub Copilot", id: 68, img: GitHubCopilotIcon },
  { name: "Lovable", id: 69, img: LovableIcon },
  { name: "ElevenLabs", id: 70, img: ElevenLabsIcon },
  { name: "Suno", id: 71, img: SunoIcon },
  { name: "Akash Chat", id: 72, img: AkashChatIcon },
  { name: "AI Studio", id: 73, img: AIStudioIcon },
  { name: "CapCut", id: 74, img: CapCutIcon },
];

export function TrustedBySection() {
  const columnCount = useResponsiveColumns();

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <GradientHeading variant="secondary" size="md">
            Trusted by the world&apos;s leading enterprises
          </GradientHeading>
        </div>
        <div className="flex justify-center">
          <LogoCarousel columnCount={columnCount} logos={trustedLogos} />
        </div>
      </div>
    </section>
  );
}
