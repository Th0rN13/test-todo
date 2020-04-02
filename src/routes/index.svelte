<script context="module">
  import { getUserList, post, setApiUrl } from 'helpers/api.js';
  export async function preload(_, session) {
    const page = session.page || 1;
    setApiUrl(session.apiUrl);
    const { userCount, userList } = await getUserList(page, 5, this.fetch);
    return { preloadPage: page, userCount, userList };
  }
</script>

<script>
  import { isLoading } from 'store/store.js';
  import AnimPage from 'components/AnimatePage.svelte';
  import UserList from 'components/UserList.svelte';
  import Paging from 'components/Paging.svelte';
  import { stores } from '@sapper/app';
  const { session } = stores();

  export let userCount;
  export let userList;
  export let preloadPage;
  let perPage = 5;

  $: updatePage($session.page);
  $: $isLoading = (userList, false);
  $isLoading = false;

  async function updatePage () {
    const page = $session.page;
    if (preloadPage === page) return;
    $isLoading = true;
    if (process.browser) {
      await post('paging', { page });
    }
  }
</script>

<AnimPage>
  <div>
    <UserList userList={userList} />
    <Paging bind:page={$session.page} pageCount={Math.ceil(userCount / perPage)}/>
  </div>
</AnimPage>

<style lang="postcss">
  div {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    overflow: auto;
    padding: 10vh 10vw;
  }
</style>

<svelte:head>
  <title>Users list</title>
</svelte:head>
