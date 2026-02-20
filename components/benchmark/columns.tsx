"use client";

import type { Column, ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ModelResult, ModelScore } from "@/lib/data/report";

const PROVIDER_COLORS: Record<string, string> = {
    Anthropic: "bg-orange-400",
    OpenAI: "bg-emerald-400",
    Google: "bg-blue-400",
    DeepSeek: "bg-violet-400"
};

function gapColor(delta: number): string {
    if (delta === 0) return "border-emerald-200 bg-emerald-50 text-emerald-700";
    if (delta <= 5) return "border-amber-200 bg-amber-50 text-amber-700";
    if (delta <= 15) return "border-orange-200 bg-orange-50 text-orange-700";
    return "border-red-200 bg-red-50 text-red-700";
}

function ScoreCell({ percentage, correct, total }: ModelScore) {
    return (
        <div className="text-right font-sans">
            <span className="font-medium">{percentage}%</span>
            <span className="text-muted-foreground ml-1.5 text-xs">
                {correct}/{total}
            </span>
        </div>
    );
}

function SortableHeader({
    column,
    children,
    className
}: {
    column: Column<ModelResult, unknown>;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <button
            type="button"
            className={`inline-flex items-center gap-1 hover:text-foreground/80 transition-colors ${className ?? ""}`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            {children}
            <ArrowUpDown className="size-3 opacity-40" />
        </button>
    );
}

export const columns: ColumnDef<ModelResult>[] = [
    {
        accessorKey: "displayName",
        header: ({ column }) => <SortableHeader column={column}>Model</SortableHeader>,
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <span
                    className={`size-2 rounded-full shrink-0 ${PROVIDER_COLORS[row.original.provider] ?? "bg-gray-400"}`}
                />
                <span className="font-medium">{row.original.displayName}</span>
                <span className="text-muted-foreground text-xs hidden sm:inline">
                    {row.original.provider}
                </span>
            </div>
        )
    },
    {
        id: "en",
        accessorFn: (row) => row.en.percentage,
        header: ({ column }) => (
            <div className="flex justify-end">
                <SortableHeader column={column}>EN</SortableHeader>
            </div>
        ),
        cell: ({ row }) => <ScoreCell {...row.original.en} />
    },
    {
        id: "ru",
        accessorFn: (row) => row.ru.percentage,
        header: ({ column }) => (
            <div className="flex justify-end">
                <SortableHeader column={column}>RU</SortableHeader>
            </div>
        ),
        cell: ({ row }) => <ScoreCell {...row.original.ru} />
    },
    {
        accessorKey: "delta",
        header: ({ column }) => (
            <div className="flex justify-end">
                <SortableHeader column={column}>Gap</SortableHeader>
            </div>
        ),
        cell: ({ row }) => {
            const delta = row.original.delta;
            return (
                <div className="flex justify-end">
                    <Badge variant="outline" className={`font-sans text-xs ${gapColor(delta)}`}>
                        {delta === 0 ? "0%" : `\u2212${delta}%`}
                    </Badge>
                </div>
            );
        }
    }
];
