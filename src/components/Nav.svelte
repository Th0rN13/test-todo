<script>
  import NavLink from 'UI/NavLink.svelte';
  import Loading from 'UI/Loading.svelte';
  import { curUser } from 'store/store.js';

  export let segment;
</script>

<nav class="nav">
  <Loading />
  <NavLink
    selected={!segment}
    href={`.`}
    name='User List'
  />
  {#if segment === 'user'}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 494.148 494.148">
      <path d="M405.284,201.188L130.804,13.28C118.128,4.596,105.356,0,94.74,0C74.216,0,61.52,16.472,61.52,44.044v406.124
        c0,27.54,12.68,43.98,33.156,43.98c10.632,0,23.2-4.6,35.904-13.308l274.608-187.904c17.66-12.104,27.44-28.392,27.44-45.884
        C432.632,229.572,422.964,213.288,405.284,201.188z"/>
    </svg>
    <NavLink
      selected
      href={null}
      name={`${$curUser}`}
    />
  {/if}
</nav>

<style lang="postcss">
  .nav {
    border-bottom: 1px solid rgba(255,62,0,0.1);
    font-weight: 300;
    padding: 0 1em;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  svg {
    width: 16px;
    margin-left: 8px;
    & path {
      fill: #3498db;
    }
  }
</style>
