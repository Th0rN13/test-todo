<script context="module">
  import { getTodoList, getSingleUser } from 'helpers/api.js';
  export async function preload({params}) {
    const userId = params.user;
    const [todoList, {name}] = await Promise.all([
      getTodoList(userId, this.fetch),
      (process.browser) ? { name: '' } : getSingleUser(userId, this.fetch)
    ]);
    return { todoList, name: name };
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
  <title>Todo list</title>
</svelte:head>
