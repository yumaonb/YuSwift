// swup-widgets.js — swup 切页联动：侧边按钮显隐管理
// 模块脚本只执行一次，无需 init guard
(function() {
  var container = document.getElementById('side-widgets');
  if (!container) return;

  var QUIET_MS = 150;
  var CAP_MS = 2500;
  var CAP_EXTEND_MS = 400;
  var MAX_SUSPEND_MS = 6000;
  var settleTimer = null;
  var capTimer = null;
  var watching = false;
  var suspendStart = 0;
  var lastScrollAt = 0;

  function onScroll() {
    lastScrollAt = Date.now();
    if (settleTimer) clearTimeout(settleTimer);
    settleTimer = setTimeout(settle, QUIET_MS);
  }

  function startWatch() {
    if (watching) return;
    watching = true;
    window.addEventListener('scroll', onScroll, { passive: true });
    settleTimer = setTimeout(settle, QUIET_MS);
  }

  function teardown() {
    if (settleTimer) { clearTimeout(settleTimer); settleTimer = null; }
    if (capTimer) { clearTimeout(capTimer); capTimer = null; }
    if (watching) {
      watching = false;
      window.removeEventListener('scroll', onScroll);
    }
  }

  function settle() {
    teardown();
    container.classList.remove('navigating');
  }

  function capTick() {
    capTimer = null;
    var scrollActive = watching && Date.now() - lastScrollAt < QUIET_MS;
    var withinCeiling = Date.now() - suspendStart < MAX_SUSPEND_MS;
    if (scrollActive && withinCeiling) {
      capTimer = setTimeout(capTick, CAP_EXTEND_MS);
      return;
    }
    settle();
  }

  document.addEventListener('swup:visit:start', function() {
    teardown();
    container.classList.add('navigating');
    container.querySelectorAll('.back-to-widget').forEach(function(b) {
      b.classList.remove('visible');
    });
    suspendStart = Date.now();
    lastScrollAt = 0;
    capTimer = setTimeout(capTick, CAP_MS);
  });

  document.addEventListener('swup:content:replace', startWatch);
})();
