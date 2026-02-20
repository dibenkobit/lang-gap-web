"use client";

import { useEffect } from "react";

export function DebugBanner() {
    useEffect(() => {
        alert(
            "WARNING: All data and results on this page are NOT valid. Published for debug purposes only."
        );
    }, []);

    return (
        <div className="bg-yellow-400 text-yellow-950 text-center text-sm font-semibold px-4 py-2">
            All data and results are NOT valid — published for debug purposes
            only
        </div>
    );
}
