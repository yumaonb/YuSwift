<!-- BackToBottom.svelte — 到底部按钮 -->
<script>
  import { onMount } from 'svelte';
  import { subscribeScroll } from '../../assets/js/scroll-manager.js';
  import Icon from '@iconify/svelte';

  let isVisible = $state(false);

  function scrollToBottom() {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  }

  onMount(() => {
    isVisible = window.scrollY > 100;
    const unsub = subscribeScroll((y) => { isVisible = y > 100; });
    return unsub;
  });
</script>

<button class="back-to-widget" class:visible={isVisible} aria-label="到底部" onclick={scrollToBottom}>
  <Icon icon="la:arrow-down" class="back-to-widget-icon" />
</button>
