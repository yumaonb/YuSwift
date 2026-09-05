<!-- BackToTop.svelte — 返回顶部按钮 -->
<script>
  import { onMount } from 'svelte';
  import { subscribeScroll } from '../../assets/js/scroll-manager.js';
  import Icon from '@iconify/svelte';

  let isVisible = $state(false);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onMount(() => {
    isVisible = window.scrollY > 100;
    const unsub = subscribeScroll((y) => { isVisible = y > 100; });
    return unsub;
  });
</script>

<button class="back-to-widget" class:visible={isVisible} aria-label="返回顶部" onclick={scrollToTop}>
  <Icon icon="la:arrow-up" class="back-to-widget-icon" />
</button>
