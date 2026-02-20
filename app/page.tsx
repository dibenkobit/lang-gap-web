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
                        Methodology
                    </h2>

                    <div className="flex flex-wrap gap-2 mt-3">
                        <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                            Zero contamination
                        </span>
                        <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                            Sandbox execution
                        </span>
                        <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                            temperature=0
                        </span>
                    </div>

                    <div className="mt-4 rounded-xl border bg-muted/30 divide-y">
                        <div className="px-4 py-3 flex gap-4 text-sm">
                            <span className="font-medium shrink-0 w-20">Questions</span>
                            <span className="text-muted-foreground">
                                {latestReport.questionCount.total} original &middot;{" "}
                                {latestReport.questionCount.coding} coding,{" "}
                                {latestReport.questionCount.reasoning} reasoning
                            </span>
                        </div>
                        <div className="px-4 py-3 flex gap-4 text-sm">
                            <span className="font-medium shrink-0 w-20">Source</span>
                            <span className="text-muted-foreground">
                                Written from scratch — no dataset overlap, no leakage
                            </span>
                        </div>
                        <div className="px-4 py-3 flex gap-4 text-sm">
                            <span className="font-medium shrink-0 w-20">Evaluation</span>
                            <span className="text-muted-foreground">
                                Sandbox execution + deterministic answer matching
                            </span>
                        </div>
                        <div className="px-4 py-3 flex gap-4 text-sm">
                            <span className="font-medium shrink-0 w-20">Controls</span>
                            <span className="text-muted-foreground">
                                temperature=0, routed via OpenRouter for consistency
                            </span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
