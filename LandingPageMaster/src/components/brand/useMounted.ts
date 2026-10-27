import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** False on the server and during hydration, true afterwards, without a setState-in-effect. */
export function useMounted(): boolean {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
