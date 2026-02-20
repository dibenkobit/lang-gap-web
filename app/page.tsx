import { BenchmarkRun } from "@/components/benchmark/benchmark-run";
import type { ModelResult } from "@/lib/data/report";
import { latestReport } from "@/lib/data/report";

function computeStats(results: ModelResult[]) {
    if (results.length === 0) return null;
    const gaps = results.map((r) => r.delta);
    const avg = gaps.reduce((a, b) => a + b, 0) / gaps.length;
    return {
        avg: Math.round(avg * 10) / 10,
        worst: results.reduce((a, b) => (a.delta >= b.delta ? a : b)),
        best: results.reduce((a, b) => (a.delta <= b.delta ? a : b))
    };
}

export default function Home() {
    const overall = latestReport.categories.find((c) => c.name === "Overall");
    const stats = overall ? computeStats(overall.results) : null;

    return (
        <div className="px-6 py-10 md:px-12 md:py-14 lg:px-16">
            <div className="mx-auto max-w-3xl">
                {/* Hero + Stats */}
                <section className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono tabular-nums">
                            <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5">
                                {latestReport.questionCount.total} questions
                            </span>
                            <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5">
                                {latestReport.modelCount} models
                            </span>
                            <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5">
                                EN vs RU
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
                            How much do LLMs lose
                            <br />
                            outside English?
                        </h1>
                        <p className="text-muted-foreground text-base md:text-lg max-w-lg leading-relaxed">
                            Same questions. Same models. Two languages.
                            <br className="hidden sm:block" />
                            We measure the accuracy drop from English to Russian.
                        </p>
                    </div>

                    {stats && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                            <div className="rounded-xl border bg-muted/50 px-4 py-4 space-y-1">
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Average Gap
                                </p>
                                <p className="text-2xl sm:text-3xl font-bold tabular-nums font-mono">
                                    {stats.avg}%
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    across {latestReport.modelCount} models
                                </p>
                            </div>
                            <div className="rounded-xl border bg-emerald-50/60 px-4 py-4 space-y-1">
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Smallest Gap
                                </p>
                                <p className="text-2xl sm:text-3xl font-bold tabular-nums font-mono">
                                    {stats.best.delta}%
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {stats.best.displayName}
                                </p>
                            </div>
                            <div className="rounded-xl border bg-orange-50/60 px-4 py-4 space-y-1">
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Largest Gap
                                </p>
                                <p className="text-2xl sm:text-3xl font-bold tabular-nums font-mono">
                                    {stats.worst.delta}%
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {stats.worst.displayName}
                                </p>
                            </div>
                        </div>
                    )}
                </section>

                {/* Benchmark */}
                <section id="last-run" className="scroll-mt-16 mt-16">
                    <BenchmarkRun report={latestReport} />
                </section>

                {/* Methodology */}
                <section id="methodology" className="scroll-mt-16 mt-16">
                    <h2 className="text-lg font-semibold tracking-tight">
                        How It Works
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1 max-w-lg">
                        Every model gets the same questions in English and Russian.
                        We compare how many each gets right.
                    </p>

                    {/* Pipeline */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="rounded-xl border px-4 py-4 space-y-1.5">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                1 &middot; Questions
                            </p>
                            <p className="text-sm">
                                {latestReport.questionCount.coding} coding
                                + {latestReport.questionCount.reasoning} reasoning
                                problems, written from scratch. Russian
                                versions are native — not machine-translated.
                            </p>
                        </div>
                        <div className="rounded-xl border px-4 py-4 space-y-1.5">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                2 &middot; Prompting
                            </p>
                            <p className="text-sm">
                                Every question goes to every model through{" "}
                                <a
                                    href="https://openrouter.ai"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline underline-offset-4 hover:text-foreground/80 transition-colors"
                                >
                                    OpenRouter
                                </a>
                                . Same provider, same settings,{" "}
                                <span className="font-mono text-xs">temperature=0</span>.
                            </p>
                        </div>
                        <div className="rounded-xl border px-4 py-4 space-y-1.5">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                3 &middot; Evaluation
                            </p>
                            <p className="text-sm">
                                Coding answers are executed against test cases
                                in a sandbox. Reasoning answers are compared to
                                known correct values. No LLM-as-judge.
                            </p>
                        </div>
                        <div className="rounded-xl border px-4 py-4 space-y-1.5">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                4 &middot; Scoring
                            </p>
                            <p className="text-sm">
                                For each model we report EN accuracy, RU accuracy,
                                and the gap between them. A gap of 0% means the model
                                performs equally in both languages.
                            </p>
                        </div>
                    </div>

                    {/* Trust signals */}
                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span>Original questions — no training-data overlap</span>
                        <span className="hidden sm:inline">&middot;</span>
                        <span>Fixed settings — every run uses the same config</span>
                    </div>
                </section>
            </div>
        </div>
    );
}
