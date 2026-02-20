export type ModelScore = {
    percentage: number;
    correct: number;
    total: number;
};

export type ModelResult = {
    model: string;
    displayName: string;
    provider: string;
    en: ModelScore;
    ru: ModelScore;
    delta: number;
};

export type ReportCategory = {
    name: string;
    questionCount: number;
    results: ModelResult[];
};

export type BenchmarkReport = {
    id: string;
    generatedAt: string;
    author: string;
    modelCount: number;
    questionCount: { coding: number; reasoning: number; total: number };
    categories: ReportCategory[];
};

const MODEL_INFO: Record<string, { name: string; provider: string }> = {
    "claude-opus-4.6": { name: "Claude Opus 4.6", provider: "Anthropic" },
    "claude-sonnet-4.6": { name: "Claude Sonnet 4.6", provider: "Anthropic" },
    "gpt-5.2": { name: "GPT-5.2", provider: "OpenAI" },
    "gpt-4.1": { name: "GPT-4.1", provider: "OpenAI" },
    "gemini-2.5-pro": { name: "Gemini 2.5 Pro", provider: "Google" },
    "deepseek-r1": { name: "DeepSeek R1", provider: "DeepSeek" }
};

function row(
    model: string,
    enPct: number,
    enCorrect: number,
    enTotal: number,
    ruPct: number,
    ruCorrect: number,
    ruTotal: number,
    delta: number
): ModelResult {
    const info = MODEL_INFO[model] ?? { name: model, provider: "Unknown" };
    return {
        model,
        displayName: info.name,
        provider: info.provider,
        en: { percentage: enPct, correct: enCorrect, total: enTotal },
        ru: { percentage: ruPct, correct: ruCorrect, total: ruTotal },
        delta
    };
}

export const latestReport: BenchmarkReport = {
    id: "62a9c4dd9b28",
    generatedAt: "2026-02-20T13:49:09.604718+00:00",
    author: "dibenkobit",
    modelCount: 6,
    questionCount: { coding: 5, reasoning: 0, total: 5 },
    categories: [
        {
            name: "Overall",
            questionCount: 5,
            results: [
                row("claude-opus-4.6", 100, 5, 5, 100, 5, 5, 0),
                row("claude-sonnet-4.6", 100, 5, 5, 100, 5, 5, 0),
                row("gpt-5.2", 100, 5, 5, 100, 5, 5, 0),
                row("gpt-4.1", 100, 5, 5, 100, 5, 5, 0),
                row("gemini-2.5-pro", 100, 5, 5, 100, 5, 5, 0),
                row("deepseek-r1", 100, 5, 5, 100, 5, 5, 0)
            ]
        },
        {
            name: "Coding",
            questionCount: 5,
            results: [
                row("claude-opus-4.6", 100, 5, 5, 100, 5, 5, 0),
                row("claude-sonnet-4.6", 100, 5, 5, 100, 5, 5, 0),
                row("gpt-5.2", 100, 5, 5, 100, 5, 5, 0),
                row("gpt-4.1", 100, 5, 5, 100, 5, 5, 0),
                row("gemini-2.5-pro", 100, 5, 5, 100, 5, 5, 0),
                row("deepseek-r1", 100, 5, 5, 100, 5, 5, 0)
            ]
        }
    ]
};
