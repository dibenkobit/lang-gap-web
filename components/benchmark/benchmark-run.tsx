"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { BenchmarkReport } from "@/lib/data/report";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { GapChart } from "./gap-chart";

function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    });
}

export function BenchmarkRun({ report }: { report: BenchmarkReport }) {
    const visibleCategories = report.categories.filter((c) => c.questionCount > 0);

    const defaultTab =
        visibleCategories.find((c) => c.name === "Overall")?.name ??
        visibleCategories[0]?.name ??
        "Overall";

    if (visibleCategories.length === 0) {
        return <p className="text-muted-foreground text-sm">No results in this report.</p>;
    }

    return (
        <div className="space-y-5">
            <p className="text-sm text-muted-foreground">
                Last run {formatDate(report.generatedAt)} by{" "}
                <a
                    href={`https://github.com/${report.author}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                >
                    @{report.author}
                </a>
            </p>

            <Tabs defaultValue={defaultTab}>
                <TabsList variant="line" className="border-b pb-2 mb-5">
                    {visibleCategories.map((category) => (
                        <TabsTrigger key={category.name} value={category.name}>
                            {category.name}
                            <span className="text-muted-foreground ml-1.5 text-xs tabular-nums">
                                {category.questionCount}
                            </span>
                        </TabsTrigger>
                    ))}
                </TabsList>
                {visibleCategories.map((category) => (
                    <TabsContent key={category.name} value={category.name} className="space-y-5">
                        <GapChart data={category.results} />
                        <DataTable columns={columns} data={category.results} />
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}
