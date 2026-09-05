<!-- PostsFilterFab.svelte — 分类与标签悬浮按钮（文章区专属） -->
<script>
  import { onMount } from 'svelte';
  import { subscribeScroll } from '../../assets/js/scroll-manager.js';
  import Icon from '@iconify/svelte';

  let isVisible = $state(false);
  let isUnavailable = $state(false);
  let isCompact = $state(false);

  function syncAvailability() {
    const hasDetail = !!document.querySelector('.post-content');
    const hasList = !!document.querySelector('.posts-page');
    const w = window.innerWidth;

    if (hasDetail) {
      // 文章详情页：≤1000px 显示
      isUnavailable = w > 1000;
      isCompact = false;
    } else if (hasList) {
      // 列表页：≤768px 显示，且缩小
      isUnavailable = w > 768;
      isCompact = true;
    } else {
      isUnavailable = true;
    }
  }

  onMount(() => {
    syncAvailability();
    isVisible = window.scrollY > 100;
    const unsub = subscribeScroll((y) => { isVisible = y > 100; });

    const onResize = () => syncAvailability();
    window.addEventListener('resize', onResize);
    document.addEventListener('swup:content:replace', syncAvailability);

    return () => {
      unsub();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('swup:content:replace', syncAvailability);
    };
  });
</script>

<button
  class="back-to-widget"
  class:visible={isVisible}
  class:unavailable={isUnavailable}
  class:compact={isCompact}
  id="posts-filter-fab"
  aria-label="分类与标签"
  aria-haspopup="dialog"
  aria-expanded="false"
>
  <Icon icon="la:tags" class="back-to-widget-icon" />
</button>

<style>
  @media (min-width: 1001px) {
    #posts-filter-fab {
      display: none;
    }
  }

  #posts-filter-fab.compact {
    width: 40px;
    height: 40px;
  }

  #posts-filter-fab.compact :global(.back-to-widget-icon) {
    width: 18px;
    height: 18px;
  }
</style>
