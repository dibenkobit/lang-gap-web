"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";
import {
    type ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart";
import type { ModelResult } from "@/lib/data/report";

const chartConfig = {
    en: { label: "English", color: "oklch(0.65 0.10 250)" },
    ru: { label: "Russian", color: "oklch(0.58 0.20 40)" }
} satisfies ChartConfig;

function shortName(name: string): string {
    return name.replace("Claude ", "").replace("DeepSeek ", "DS ");
}

export function GapChart({ data }: { data: ModelResult[] }) {
    const chartData = data.map((r) => ({
        model: r.displayName,
        en: r.en.percentage,
        ru: r.ru.percentage
    }));

    const allValues = data.flatMap((r) => [r.en.percentage, r.ru.percentage]);
    const minValue = Math.min(...allValues);
    const yMin = Math.max(0, Math.floor((minValue - 5) / 10) * 10);

    const barSize = Math.max(14, Math.min(28, Math.floor(220 / data.length)));
    const needsAngle = data.length > 8;

    return (
        <ChartContainer config={chartConfig} className="h-[340px] w-full">
            <BarChart data={chartData} barGap={2} margin={{ top: 20, bottom: needsAngle ? 20 : 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                    dataKey="model"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11 }}
                    tickFormatter={shortName}
                    angle={needsAngle ? -30 : 0}
                    textAnchor={needsAngle ? "end" : "middle"}
                    height={needsAngle ? 60 : 30}
                />
                <YAxis
                    domain={[yMin, 100]}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v: number) => `${v}%`}
                    tick={{ fontSize: 11 }}
                    width={42}
                />
                <ChartTooltip
                    content={
                        <ChartTooltipContent
                            formatter={(value, name) => (
                                <>
                                    <div
                                        className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                                        style={{
                                            backgroundColor: `var(--color-${name})`
                                        }}
                                    />
                                    <div className="flex flex-1 items-center justify-between leading-none">
                                        <span className="text-muted-foreground">
                                            {chartConfig[name as keyof typeof chartConfig]?.label ??
                                                name}
                                        </span>
                                        <span className="text-foreground font-sans font-medium tabular-nums">
                                            {value}%
                                        </span>
                                    </div>
                                </>
                            )}
                        />
                    }
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="en" fill="var(--color-en)" radius={[4, 4, 0, 0]} barSize={barSize}>
                    <LabelList
                        position="top"
                        offset={6}
                        className="fill-foreground"
                        fontSize={10}
                        formatter={(v: number) => `${v}%`}
                    />
                </Bar>
                <Bar dataKey="ru" fill="var(--color-ru)" radius={[4, 4, 0, 0]} barSize={barSize}>
                    <LabelList
                        position="top"
                        offset={6}
                        className="fill-foreground"
                        fontSize={10}
                        formatter={(v: number) => `${v}%`}
                    />
                </Bar>
            </BarChart>
        </ChartContainer>
    );
}
