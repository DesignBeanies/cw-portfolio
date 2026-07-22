"use client";

import { useEffect } from "react";

import { lockPageScroll, resetPageScrollLock, unlockPageScroll } from "@/lib/scrollLock";

export function useScrollLock(locked: boolean) {
  useEffect(() => {
    resetPageScrollLock();
  }, []);

  useEffect(() => {
    if (!locked) return;

    lockPageScroll();
    return () => unlockPageScroll();
  }, [locked]);
}
