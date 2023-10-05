// @ts-ignore - TS7016: Could not find a declaration file for module 'colorthief'.
import ColorThief from 'colorthief';

/** The number determines how many colors are extracted from the image */
const COLOR_COUNT = 2;
/** The number determines how many pixels are skipped before the next one is sampled.  */
const COLOR_QUALITY = 1;
/** The number determines how long the cache is valid.  */
const CACHE_EXPIRE_TIME = 1000 * 60 * 60 * 24 * 7;

/**
 * A singleton class that stores the avatar colors of users.
 */
class AvatarColorStore {
  static instance;
  colorThief = new ColorThief();

  loadAvatar(loginId) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = `https://avatars.githubusercontent.com/${loginId}?s=8&v=4`;
    });
  }

  async getColors(loginId) {
    // Create a unique key for this user's cache entry.
    const cacheKey = `color-cache:${loginId}`;

    const now = new Date().getTime();
    const colorCacheSerialized = localStorage.getItem(cacheKey);
    const colorCache = colorCacheSerialized ? JSON.parse(colorCacheSerialized) : null;

    // Check if the cache is stale or doesn't exist.
    if (!colorCache || now - colorCache.lastUpdated > CACHE_EXPIRE_TIME) {
      let colors;
      // a single white color causes error: https://github.com/lokesh/color-thief/issues/40#issuecomment-802424484
      try {
        colors = await this.loadAvatar(loginId)
          .then((img) =>
            this.colorThief.getPalette(img, COLOR_COUNT, COLOR_QUALITY)
          )
          .then((rgbs) => {
            return rgbs.map(
              (rgb) => `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
            );
          });
        // Store the updated cache entry with the unique key.
        localStorage.setItem(cacheKey, JSON.stringify({
          colors,
          lastUpdated: now,
        }));
      } catch (error) {
        console.error(
          `Cannot extract colors of the avatar of ${loginId}, error info: `,
          error
        );
        colors = Array(COLOR_COUNT).fill('rgb(255, 255, 255)');
      }

      return colors;
    }

    // Return the cached colors.
    return colorCache.colors;
  }

  static getInstance() {
    if (!AvatarColorStore.instance) {
      AvatarColorStore.instance = new AvatarColorStore();
    }
    return AvatarColorStore.instance;
  }
}

export const avatarColorStore = AvatarColorStore.getInstance();
