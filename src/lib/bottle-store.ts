"use client";

import { useSyncExternalStore } from "react";
import type { LabelDesignId } from "./label-designs";

type State = { label: LabelDesignId; webgl: "idle" | "loading" | "ready" | "fallback" };

let state: State = { label: "mumith", webgl: "idle" };
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((l) => l());

export const bottleStore = {
  get: () => state,
  set(partial: Partial<State>) {
    state = { ...state, ...partial };
    emit();
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};

const serverState: State = { label: "mumith", webgl: "idle" };

export function useBottleStore<T>(selector: (s: State) => T): T {
  return useSyncExternalStore(
    bottleStore.subscribe,
    () => selector(bottleStore.get()),
    () => selector(serverState),
  );
}

/** Normalized pointer position (-1..1) relative to the viewport, used for hover tilt. */
export const pointer = { x: 0, y: 0 };
