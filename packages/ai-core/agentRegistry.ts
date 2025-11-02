import { AgentConfig } from './interfaces';

export const agentRegistry: Record<string, AgentConfig> = {
  civil: {
    id: "civilAgent",
    description: "Handles site design, grading, and material estimation.",
    model: "gpt-4",
    context: "civil-engineering",
    maxTokens: 4000,
    temperature: 0.3,
  },
  electrical: {
    id: "electricalAgent",
    description: "Generates load schedules, panel design, and wiring plans.",
    model: "gpt-4",
    context: "electrical-engineering",
    maxTokens: 4000,
    temperature: 0.3,
  },
  mechanical: {
    id: "mechanicalAgent",
    description: "Handles HVAC load calculations and piping system analysis.",
    model: "gpt-4",
    context: "mechanical-engineering",
    maxTokens: 4000,
    temperature: 0.3,
  },
  survey: {
    id: "surveyAgent",
    description: "Processes GNSS, LiDAR, and topographic datasets.",
    model: "gpt-4",
    context: "survey-engineering",
    maxTokens: 4000,
    temperature: 0.3,
  },
  gis: {
    id: "gisAgent",
    description: "Analyzes spatial data and creates mapping outputs.",
    model: "gpt-4",
    context: "geospatial-analysis",
    maxTokens: 4000,
    temperature: 0.3,
  },
};

