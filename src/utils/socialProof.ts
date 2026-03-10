export function getConsistentViewCount(seed: string | number): number {
    if (!seed) return 18; // Default fallback

    const seedString = String(seed);
    let hash = 0;

    for (let i = 0; i < seedString.length; i++) {
        hash = seedString.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Ensure consistent random number between 15 and 30
    return (Math.abs(hash) % 16) + 15;
}
