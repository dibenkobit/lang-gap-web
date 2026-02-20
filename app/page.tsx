import { BenchmarkTable } from "@/components/benchmark/benchmark-table";
import { latestReport } from "@/lib/data/report";

function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    });
}

export default function Home() {
    const r = latestReport;

    return (
        <div className="px-6 py-6 md:px-12 md:py-10 lg:px-16 lg:py-10">
            <div className="mx-auto max-w-3xl space-y-10">
                <section id="methodology" className="scroll-mt-16">
                    <div className="rounded-lg border px-5 py-4 space-y-3">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Methodology
                        </p>
                        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
                            <dt className="text-muted-foreground">Questions</dt>
                            <dd>100 original · 50 coding, 50 reasoning</dd>
                            <dt className="text-muted-foreground">Source</dt>
                            <dd>Written from scratch (no leakage)</dd>
                            <dt className="text-muted-foreground">Evaluation</dt>
                            <dd>Sandbox execution + answer matching</dd>
                            <dt className="text-muted-foreground">Controls</dt>
                            <dd>temperature=0 via OpenRouter</dd>
                        </dl>
                    </div>
                </section>

                <section className="space-y-6">
                    <p className="text-sm text-muted-foreground">
                        {formatDate(r.generatedAt)} · {r.modelCount} models ·{" "}
                        {r.questionCount.total} questions
                    </p>

                    <BenchmarkTable report={r} />
                </section>
            </div>
        </div>
    );
}
