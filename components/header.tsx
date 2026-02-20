"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GitHubStarsBadge } from "@/components/github-stars-badge";
import { cn } from "@/lib/utils";

const navLinks = [
    { label: "Benchmark", href: "#last-run" },
    { label: "How It Works", href: "#methodology" }
];

const SCROLL_THRESHOLD = 10;

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (current) => {
        setIsScrolled(current >= SCROLL_THRESHOLD);
    });

    useEffect(() => {
        setIsScrolled(scrollY.get() >= SCROLL_THRESHOLD);
    }, [scrollY]);

    return (
        <>
            <nav
                className={cn(
                    "fixed left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 lg:px-16",
                    isScrolled ? "top-4" : "top-2 py-4"
                )}
            >
                <div
                    className={cn(
                        "mx-auto w-full transition-all duration-300",
                        isScrolled ? "max-w-3xl" : "max-w-4xl"
                    )}
                >
                    <div
                        className={cn(
                            "flex w-full items-center justify-between px-1 py-2.5 font-sans transition-all duration-300 sm:px-3 sm:py-3 md:px-4",
                            isScrolled &&
                                "rounded-xl border border-border/70 bg-background/80 px-2 shadow-sm inset-shadow-sm inset-shadow-white/20 backdrop-blur-lg sm:rounded-2xl sm:px-4"
                        )}
                    >
                        <div className="flex items-center gap-8">
                            <Link
                                href="/"
                                className="text-sm font-semibold tracking-tight transition-colors hover:text-foreground/80"
                            >
                                Lang Gap
                            </Link>
                            <div className="hidden items-center gap-5 sm:flex">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        className={cn(
                                            "text-xs transition-colors hover:text-foreground",
                                            isScrolled
                                                ? "text-foreground/80"
                                                : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                        <GitHubStarsBadge isScrolled={isScrolled} />
                    </div>
                </div>
            </nav>
            <div aria-hidden className="h-24 md:h-28" />
        </>
    );
}
