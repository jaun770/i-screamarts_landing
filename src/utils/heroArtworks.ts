// Utility to manage hero artwork images
// Supports dynamic loading of new assets: child_drawing_01 1.jpg ... child_drawing_51 1.jpg

// 1. Import all images explicitly or via glob (Vite specific)
// Using import.meta.glob for better scalability with 50+ files
const artworkModules = import.meta.glob('/src/assets/child_drawing_*.jpg', { eager: true, as: 'url' });

// 2. Extract URLs into an array
export const allHeroArtworks = Object.values(artworkModules);

// 3. Shuffle function (Fisher-Yates) to display random subset
export function getShuffledArtworks(count = 15): string[] {
    // Create a copy to shuffle
    const shuffled = [...allHeroArtworks];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Return requested number of items
    return shuffled.slice(0, count);
}
