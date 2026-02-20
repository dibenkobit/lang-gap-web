const REPOSITORY = "dibenkobit/lang-gap";
const CACHE_TTL_SECONDS = 300;
const STALE_TTL_SECONDS = 3600;

type GitHubRepoResponse = {
    stargazers_count?: number;
};

function formatStars(count: number): string {
    if (count >= 1_000_000) {
        const millions = (count / 1_000_000).toFixed(1).replace(/\.0$/, "");
        return `${millions}M`;
    }
    if (count >= 1_000) {
        const thousands = (count / 1_000).toFixed(1).replace(/\.0$/, "");
        return `${thousands}k`;
    }
    return `${count}`;
}

function fallbackResponse() {
    return Response.json(
        { stars: null, formatted: null },
        {
            status: 200,
            headers: {
                "cache-control": `s-maxage=${Math.floor(CACHE_TTL_SECONDS / 6)}, stale-while-revalidate=${Math.floor(
                    STALE_TTL_SECONDS / 6
                )}`
            }
        }
    );
}

export async function GET() {
    const controller = new AbortController();
    const timeoutMs = 5000;
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const response = await fetch(`https://api.github.com/repos/${REPOSITORY}`, {
            signal: controller.signal,
            next: { revalidate: CACHE_TTL_SECONDS },
            headers: {
                Accept: "application/vnd.github+json",
                "User-Agent": "lang-gap-web"
            }
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            return fallbackResponse();
        }

        const data = (await response.json()) as GitHubRepoResponse;
        const stars = typeof data.stargazers_count === "number" ? data.stargazers_count : null;

        return Response.json(
            {
                stars,
                formatted: stars === null ? null : formatStars(stars)
            },
            {
                status: 200,
                headers: {
                    "cache-control": `s-maxage=${CACHE_TTL_SECONDS}, stale-while-revalidate=${STALE_TTL_SECONDS}`
                }
            }
        );
    } catch {
        clearTimeout(timeoutId);
        return fallbackResponse();
    }
}
