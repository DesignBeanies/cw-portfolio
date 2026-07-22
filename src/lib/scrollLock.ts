let lockCount = 0;
let lockedScrollY = 0;

export function lockPageScroll() {
  if (lockCount === 0) {
    lockedScrollY = window.scrollY;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }
  lockCount += 1;
}

export function unlockPageScroll() {
  if (lockCount === 0) return;

  lockCount -= 1;
  if (lockCount > 0) return;

  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";

  window.scrollTo(0, lockedScrollY);
}

/** Clears a stuck scroll lock (e.g. after HMR or a fast panel toggle). */
export function resetPageScrollLock() {
  lockCount = 0;
  lockedScrollY = 0;

  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";
}
