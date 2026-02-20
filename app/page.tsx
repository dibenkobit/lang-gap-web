export default function Home() {
    return (
        <div className="min-h-screen flex items-center justify-center p-8">
            <main className="max-w-2xl space-y-8">
                <h1 className="text-5xl font-normal">Lang Gap</h1>
                <p className="text-xl leading-relaxed">
                    The distance between what you <em>know</em> and what you
                    can <em>say</em> — that's the gap we're closing.
                </p>
                <p className="font-mono text-muted-foreground">
                    system.status: online — fonts.loaded: true —
                    scanlines.active: true
                </p>
            </main>
        </div>
    );
}
