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
                        <div className="grid grid-cols-3 gap-3 sm:gap-4">
                            <div className="rounded-lg border px-3 py-3 sm:px-4">
                                <p className="text-xl sm:text-2xl font-bold tabular-nums">
                                    {stats.avg}%
                                </p>
                                <p className="text-[11px] sm:text-xs text-muted-foreground mt-1">
                                    Average gap
                                </p>
                            </div>
                            <div className="rounded-lg border px-3 py-3 sm:px-4">
                                <p className="text-xl sm:text-2xl font-bold tabular-nums">
                                    {stats.best.delta}%
                                </p>
                                <p className="text-[11px] sm:text-xs text-muted-foreground mt-1 truncate">
                                    Smallest
                                    <span className="hidden sm:inline">
                                        {" · "}
                                        {stats.best.displayName}
                                    </span>
                                </p>
                            </div>
                            <div className="rounded-lg border px-3 py-3 sm:px-4">
                                <p className="text-xl sm:text-2xl font-bold tabular-nums">
                                    {stats.worst.delta}%
                                </p>
                                <p className="text-[11px] sm:text-xs text-muted-foreground mt-1 truncate">
                                    Largest
                                    <span className="hidden sm:inline">
                                        {" · "}
                                        {stats.worst.displayName}
                                    </span>
                                </p>
                            </div>
                        </div>
                    )}
                </section>

                {/* Benchmark */}
                <section id="last-run" className="scroll-mt-16 mt-10 pt-10 border-t">
                    <BenchmarkRun report={latestReport} />
                </section>

                {/* Methodology */}
                <section id="methodology" className="scroll-mt-16 mt-10 pt-10 border-t">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Methodology
                    </p>
                    <p className="text-sm text-muted-foreground mt-3">
                        Zero contamination · Sandbox execution · temperature=0
                    </p>
                    <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm mt-4">
                        <dt className="text-muted-foreground">Questions</dt>
                        <dd>
                            {latestReport.questionCount.total} original ·{" "}
                            {latestReport.questionCount.coding} coding,{" "}
                            {latestReport.questionCount.reasoning} reasoning
                        </dd>
                        <dt className="text-muted-foreground">Source</dt>
                        <dd>Written from scratch — no dataset overlap, no leakage</dd>
                        <dt className="text-muted-foreground">Evaluation</dt>
                        <dd>Sandbox execution + deterministic answer matching</dd>
                        <dt className="text-muted-foreground">Controls</dt>
                        <dd>temperature=0, routed via OpenRouter for consistency</dd>
                    </dl>
                </section>
            </div>
        </div>
    );
}
