import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Header } from "@/components/header";
import "./globals.css";

export const metadata: Metadata = {
    title: "Lang Gap — How much do LLMs lose outside English?",
    description:
        "Identical questions in English and Russian, tested across top AI models. We measure the accuracy gap."
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
            <body className="antialiased flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <footer className="px-6 py-6 md:px-12 lg:px-16 border-t mt-16">
                    <div className="mx-auto max-w-3xl flex items-baseline justify-between text-xs text-muted-foreground font-sans">
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
                            Open source on{" "}
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
