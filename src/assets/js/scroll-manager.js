// scroll-manager.js — 全局共享 scroll 监听器
// 所有需要监听 scrollY 的组件共用一个事件回调，减少重复绑定
let ticking = false;
const subscribers = new Set();

function notify() {
  ticking = false;
  const y = window.scrollY;
  for (const fn of subscribers) fn(y);
}

function onScroll() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(notify);
  }
}

/**
 * 注册 scroll 回调，返回取消注册函数
 * @param {(scrollY: number) => void} fn
 * @returns {() => void}
 */
export function subscribeScroll(fn) {
  if (subscribers.size === 0) {
    window.addEventListener('scroll', onScroll, { passive: true });
  }
  subscribers.add(fn);
  return () => {
    subscribers.delete(fn);
    if (subscribers.size === 0) {
      window.removeEventListener('scroll', onScroll);
    }
  };
}
