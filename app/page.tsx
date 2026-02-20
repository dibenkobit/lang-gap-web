import { BenchmarkTable } from "@/components/benchmark/benchmark-table";
import { latestReport } from "@/lib/data/report";

function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export default function Home() {
    const r = latestReport;

    const questionBreakdown = [
        r.questionCount.coding > 0 && `${r.questionCount.coding} coding`,
        r.questionCount.reasoning > 0 && `${r.questionCount.reasoning} reasoning`,
    ]
        .filter(Boolean)
        .join(" + ");

    return (
        <div className="p-6 md:p-12">
            <div className="mx-auto max-w-3xl space-y-8">
                <header className="space-y-1">
                    <h1 className="text-4xl font-semibold tracking-tight">Lang Gap</h1>
                    <p className="text-muted-foreground text-lg">
                        Identical questions in English & Russian.
                        <br className="hidden sm:block" /> How much do LLMs degrade outside English?
                    </p>
                </header>

                <section className="space-y-4">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 font-mono text-sm text-muted-foreground">
                        <span>{r.id}</span>
                        <span className="opacity-40">/</span>
                        <span>{formatDate(r.generatedAt)}</span>
                        <span className="opacity-40">/</span>
                        <span>{r.modelCount} models</span>
                        <span className="opacity-40">/</span>
                        <span>
                            {r.questionCount.total} questions
                            {questionBreakdown && (
                                <span className="opacity-60"> ({questionBreakdown})</span>
                            )}
                        </span>
                    </div>

                    <BenchmarkTable report={r} />
                </section>

                <footer className="border-t pt-6 text-xs text-muted-foreground leading-relaxed">
                    <p>
                        100 original questions (50 coding, 50 reasoning), written from scratch to
                        avoid benchmark contamination. Coding questions evaluated via sandbox
                        execution; reasoning via answer extraction. All models called via OpenRouter
                        at temperature=0.
                    </p>
                </footer>
            </div>

        </div>
    );
}
