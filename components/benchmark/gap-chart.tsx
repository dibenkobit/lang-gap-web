"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
    type ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import type { ModelResult } from "@/lib/data/report";

const chartConfig = {
    en: { label: "English", color: "oklch(0.55 0.15 250)" },
    ru: { label: "Russian", color: "oklch(0.65 0.18 35)" },
} satisfies ChartConfig;

export function GapChart({ data }: { data: ModelResult[] }) {
    const chartData = data.map((r) => ({
        model: r.displayName,
        en: r.en.percentage,
        ru: r.ru.percentage,
    }));

    return (
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart data={chartData} barGap={2}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                    dataKey="model"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value: string) =>
                        value.replace("Claude ", "").replace(" Pro", "")
                    }
                />
                <YAxis
                    domain={[0, 100]}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v: number) => `${v}%`}
                    tick={{ fontSize: 12 }}
                    width={45}
                />
                <ChartTooltip
                    content={
                        <ChartTooltipContent
                            formatter={(value, name) => (
                                <>
                                    <div
                                        className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                                        style={{
                                            backgroundColor: `var(--color-${name})`,
                                        }}
                                    />
                                    <div className="flex flex-1 items-center justify-between leading-none">
                                        <span className="text-muted-foreground">
                                            {chartConfig[
                                                name as keyof typeof chartConfig
                                            ]?.label ?? name}
                                        </span>
                                        <span className="text-foreground font-mono font-medium tabular-nums">
                                            {value}%
                                        </span>
                                    </div>
                                </>
                            )}
                        />
                    }
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="en" fill="var(--color-en)" radius={[4, 4, 0, 0]} barSize={28} />
                <Bar dataKey="ru" fill="var(--color-ru)" radius={[4, 4, 0, 0]} barSize={28} />
            </BarChart>
        </ChartContainer>
    );
}
