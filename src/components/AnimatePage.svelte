<script>
  import { fly } from 'svelte/transition';
</script>

<div in:fly|local={{ x: 200, duration: 300}} out:fly|local={{ x: -200, duration: 300}}>
  <slot/>
</div>

<style lang="postcss">
  div {
    position: absolute;
    display: flex;
    justify-content: center;
    height: 100%;
    width: 100%;
  }
</style>
