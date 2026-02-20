"use client";

import { Github, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type StarsResponse = {
    stars: number | null;
    formatted: string | null;
};

function fallbackApproximate(stars: number | null): string | null {
    if (typeof stars !== "number") return null;
    if (stars < 1_000) return `${stars}`;
    if (stars < 1_000_000) return `${Math.floor(stars / 100) / 10}k`;
    return `${Math.floor(stars / 100_000) / 10}M`;
}

export function GitHubStarsBadge({ isScrolled }: { isScrolled: boolean }) {
    const [display, setDisplay] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        let controller: AbortController | null = null;

        async function load() {
            controller = new AbortController();

            try {
                const response = await fetch("/api/github-stars", {
                    cache: "no-store",
                    signal: controller.signal
                });

                if (!response.ok) {
                    if (!cancelled && !controller.signal.aborted) {
                        setDisplay(null);
                    }
                    return;
                }

                const data = (await response.json()) as StarsResponse;
                if (!cancelled && !controller.signal.aborted) {
                    setDisplay(data.formatted ?? fallbackApproximate(data.stars));
                }
            } catch {
                if (!cancelled && controller && !controller.signal.aborted) {
                    setDisplay(null);
                }
            }
        }

        load();
        const intervalId = setInterval(load, 5 * 60 * 1000);

        return () => {
            cancelled = true;
            clearInterval(intervalId);
            if (controller) controller.abort();
        };
    }, []);

    const accessibleLabel = useMemo(() => {
        if (!display) return "View project on GitHub";
        return `View project on GitHub, currently ${display} stars`;
    }, [display]);

    return (
        <Link
            href="https://github.com/dibenkobit/lang-gap"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={accessibleLabel}
            className={cn(
                "group inline-flex h-8 items-center rounded-md transition-all duration-300",
                isScrolled ? "px-0" : "px-0.5"
            )}
        >
            <span
                className={cn(
                    "inline-flex h-full items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950 px-2 text-zinc-100",
                    "shadow-[0_8px_24px_-16px_rgba(0,0,0,0.95)] transition-all duration-200",
                    "group-hover:border-zinc-700 group-hover:bg-zinc-900"
                )}
            >
                <Github className="size-3.5 text-zinc-100" />
                <span
                    aria-hidden
                    className="h-3.5 w-px bg-zinc-800 transition-colors duration-200 group-hover:bg-zinc-700"
                />

                <span className="inline-flex min-w-[2.4rem] items-center justify-center gap-1 font-mono text-[11px] tabular-nums text-zinc-100">
                    <Star className="size-2.5 fill-current text-amber-400" />
                    <AnimatePresence mode="popLayout" initial={false}>
                        {display ? (
                            <motion.span
                                key={display}
                                initial={{ y: 4, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -4, opacity: 0 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 320,
                                    damping: 20,
                                    mass: 0.7
                                }}
                            >
                                {display}
                            </motion.span>
                        ) : null}
                    </AnimatePresence>
                </span>
            </span>
        </Link>
    );
}
