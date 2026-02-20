import { Header } from "@/components/header";
import type { Metadata } from "next";
import { JetBrains_Mono, Lora } from "next/font/google";
import "./globals.css";

const lora = Lora({
    variable: "--font-lora",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    style: ["normal", "italic"]
});

const jetbrainsMono = JetBrains_Mono({
    variable: "--font-jetbrains-mono",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
    title: "Lang Gap — LLM Language Benchmark",
    description:
        "How much do LLMs degrade outside English? Identical questions in English & Russian, compared across top models."
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${lora.variable} ${jetbrainsMono.variable}`}>
            <body className="antialiased flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <footer className="px-6 pb-6 md:px-12 lg:px-16">
                    <div className="mx-auto max-w-3xl flex items-baseline justify-between text-xs text-muted-foreground font-mono">
                        <span>
                            Made by{" "}
                            <a
                                href="https://dibenko.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline underline-offset-4 hover:text-foreground transition-colors"
                            >
                                Nikita Snetkov
                            </a>
                        </span>
                        <span>
                            Completely open source on{" "}
                            <a
                                href="https://github.com/dibenkobit/lang-gap"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline underline-offset-4 hover:text-foreground transition-colors"
                            >
                                GitHub
                            </a>
                        </span>
                    </div>
                </footer>
            </body>
        </html>
    );
}
