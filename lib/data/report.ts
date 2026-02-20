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

// Sample data — replaced by real results when the benchmark runner produces them
export const latestReport: BenchmarkReport = {
    id: "62a9c4dd9b28",
    generatedAt: "2026-02-20T13:49:09.604718+00:00",
    author: "dibenkobit",
    modelCount: 6,
    questionCount: { coding: 25, reasoning: 25, total: 50 },
    categories: [
        {
            name: "Overall",
            questionCount: 50,
            results: [
                row("claude-opus-4.6", 92, 46, 50, 88, 44, 50, 4),
                row("gpt-5.2", 94, 47, 50, 86, 43, 50, 8),
                row("deepseek-r1", 84, 42, 50, 82, 41, 50, 2),
                row("claude-sonnet-4.6", 86, 43, 50, 78, 39, 50, 8),
                row("gemini-2.5-pro", 90, 45, 50, 78, 39, 50, 12),
                row("gpt-4.1", 82, 41, 50, 72, 36, 50, 10)
            ]
        },
        {
            name: "Coding",
            questionCount: 25,
            results: [
                row("claude-opus-4.6", 96, 24, 25, 92, 23, 25, 4),
                row("gpt-5.2", 96, 24, 25, 92, 23, 25, 4),
                row("claude-sonnet-4.6", 88, 22, 25, 84, 21, 25, 4),
                row("gemini-2.5-pro", 92, 23, 25, 84, 21, 25, 8),
                row("deepseek-r1", 88, 22, 25, 84, 21, 25, 4),
                row("gpt-4.1", 84, 21, 25, 76, 19, 25, 8)
            ]
        },
        {
            name: "Reasoning",
            questionCount: 25,
            results: [
                row("claude-opus-4.6", 88, 22, 25, 84, 21, 25, 4),
                row("gpt-5.2", 92, 23, 25, 80, 20, 25, 12),
                row("claude-sonnet-4.6", 84, 21, 25, 72, 18, 25, 12),
                row("gemini-2.5-pro", 88, 22, 25, 72, 18, 25, 16),
                row("gpt-4.1", 80, 20, 25, 68, 17, 25, 12),
                row("deepseek-r1", 80, 20, 25, 80, 20, 25, 0)
            ]
        }
    ]
};
