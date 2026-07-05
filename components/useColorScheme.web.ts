import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

// Server-rendered HTML is always light; switching to the real scheme only
// after hydration keeps the first client render identical to the server one.
export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const colorScheme = useRNColorScheme();
  return hasHydrated ? (colorScheme ?? 'light') : 'light';
}
