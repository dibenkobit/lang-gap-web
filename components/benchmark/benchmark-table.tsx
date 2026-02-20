"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { BenchmarkReport } from "@/lib/data/report";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { GapChart } from "./gap-chart";

export function BenchmarkTable({ report }: { report: BenchmarkReport }) {
    const visibleCategories = report.categories.filter((c) => c.questionCount > 0);

    const defaultTab =
        visibleCategories.find((c) => c.name === "Overall")?.name ??
        visibleCategories[0]?.name ??
        "Overall";

    if (visibleCategories.length === 0) {
        return <p className="text-muted-foreground text-sm">No results in this report.</p>;
    }

    return (
        <div className="space-y-8">
            <Tabs defaultValue={defaultTab}>
                <div className="border-b pb-2 mb-6">
                    <TabsList variant="line">
                        {visibleCategories.map((category) => (
                            <TabsTrigger key={category.name} value={category.name}>
                                {category.name}
                                <span className="text-muted-foreground ml-1.5 text-xs tabular-nums">
                                    {category.questionCount}
                                </span>
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>
                {visibleCategories.map((category) => (
                    <TabsContent key={category.name} value={category.name} className="space-y-6">
                        <GapChart data={category.results} />
                        <div className="rounded-lg border">
                            <DataTable
                                columns={columns}
                                data={category.results}
                                caption={
                                    <>
                                        run #{report.id} · ran by{" "}
                                        <a
                                            href={`https://github.com/${report.author}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-foreground transition-colors"
                                        >
                                            @{report.author}
                                        </a>
                                    </>
                                }
                            />
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}
