import { sleep } from '../../utils/sleep';
import { avatarColorStore } from './AvatarColorStore';

import { useState } from 'react';

export const useLoadedAvatars = (contributors) => {
  const [loadedAvatars, setLoadedAvatars] = useState(0);

  const load = async (onLoaded) => {
    const promises = contributors.map(async (contributor) => {
      await avatarColorStore.getColors(contributor);
      // hacking way to prevent React to batch updates
      await sleep(1);
      setLoadedAvatars((loadedAvatars) => loadedAvatars + 1);
    });

    await Promise.all(promises);
    onLoaded && onLoaded();
  };

  return [loadedAvatars, load];
};