<!-- PostsFilterFab.svelte — 分类与标签悬浮按钮（文章区专属） -->
<script>
  import { onMount } from 'svelte';
  import { subscribeScroll } from '../../assets/js/scroll-manager.js';
  import Icon from '@iconify/svelte';

  let isVisible = $state(false);
  let isUnavailable = $state(false);

  function syncAvailability() {
    isUnavailable = !document.querySelector('.posts-sidebar');
  }

  onMount(() => {
    syncAvailability();
    isVisible = window.scrollY > 100;
    const unsub = subscribeScroll((y) => { isVisible = y > 100; });

    document.addEventListener('swup:content:replace', syncAvailability);

    return () => {
      unsub();
      document.removeEventListener('swup:content:replace', syncAvailability);
    };
  });
</script>

<button
  class="back-to-widget"
  class:visible={isVisible}
  class:unavailable={isUnavailable}
  id="posts-filter-fab"
  aria-label="分类与标签"
  aria-haspopup="dialog"
  aria-expanded="false"
>
  <Icon icon="la:tags" class="back-to-widget-icon" />
</button>

<style>
  @media (min-width: 769px) {
    #posts-filter-fab {
      display: none;
    }
  }
</style>
