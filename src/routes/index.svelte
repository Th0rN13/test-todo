<script context="module">
  import { getUserList, post } from 'helpers/api.js';
  export async function preload({params}, session) {
    const page = session.page || 1;
    const { userCount, userList } = await getUserList(page, 5, this.fetch);
    return { userCount, userList };
  }
</script>

<script>
  import { curUser, isLoading, pageStore } from 'store/store.js';
  import AnimPage from 'components/AnimatePage.svelte';
  import UserList from 'components/UserList.svelte';
  import Paging from 'components/Paging.svelte';
  import { stores } from '@sapper/app';
  const { session } = stores();

  export let userCount;
  export let userList;
  let perPage = 5;
  let maxUsers = 10;
  $isLoading = false;

  $: updatePage($session.page);

  async function updatePage () {
    const page = $session.page
    if (process.browser) {
      $isLoading = true;
      const response = await post('paging', {
        page,
      });
      ({ userList } = await getUserList(page, perPage, fetch));
      $isLoading = false;
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
