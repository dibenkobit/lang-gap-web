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
        <div className="p-6 md:p-12 lg:p-16">
            <div className="mx-auto max-w-3xl space-y-10">
                <header className="space-y-4">
                    <h1 className="text-2xl font-semibold tracking-tight">Lang Gap</h1>
                    <aside className="rounded-lg bg-muted/40 px-4 py-3 space-y-1.5">
                        <p className="text-xs font-medium text-muted-foreground">Methodology</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            100 original questions (50 coding, 50 reasoning), written from scratch
                            to avoid benchmark contamination. Coding evaluated via sandbox
                            execution; reasoning via answer extraction. All models called at
                            temperature=0.
                        </p>
                    </aside>
                </header>

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
