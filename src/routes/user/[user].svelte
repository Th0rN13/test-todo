<script context="module">
  import { getTodoList, getSingleUser } from 'helpers/api.js';
  export async function preload({params}, session) {
    const userId = params.user;
    const [todoList, {name}] = await Promise.all([
      getTodoList(userId, this),
      (process.browser) ? { name: '' } : getSingleUser(userId, this),
    ]);
    return { todoList, name };
  }
</script>

<script>
  import { curUser, isLoading } from 'store/store.js';
  import AnimPage from 'components/AnimatePage.svelte';
  import TodoList from 'components/TodoList.svelte';
  export let todoList;
  export let name;
  if (!$curUser && name) $curUser = name;
  $isLoading = false;
</script>

<AnimPage>
  <TodoList todoList={todoList} />
</AnimPage>

<svelte:head>
  <title>Todo list for user: {$curUser}</title>
</svelte:head>
