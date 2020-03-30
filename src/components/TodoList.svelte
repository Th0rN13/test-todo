<script>
  import { quintOut } from 'svelte/easing';
  import { crossfade } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  export let todoList = [];

  const [send, receive] = crossfade({
    fallback(node, params) {
      const style = getComputedStyle(node);
      const transform = style.transform === 'none' ? '' : style.transform;

      return {
        duration: 300,
        easing: quintOut,
        css: t => `
          transform: ${transform} scale(${t});
          opacity: ${t}
        `
      };
    }
  });

  function add(input) {
    const todo = {
      id: Math.floor(Math.random() * 100000000),
      completed: false,
      title: input.value
    };
    todoList = [todo, ...todoList];
    input.value = '';
  }

  function remove(todo) {
    todoList = todoList.filter(t => t !== todo);
  }
</script>

<div class="wrapper">
  <div class='board'>
    <input
      class="new-todo"
      placeholder="Add new todo"
      on:keydown="{event => event.which === 13 && add(event.target)}"
    >
    <div class='left'>
      <h2>Todo</h2>
      {#each todoList.filter(t => !t.completed) as todo (todo.id)}
        <label
          in:receive="{{key: todo.id}}"
          out:send="{{key: todo.id}}"
          animate:flip
        >
          <input type=checkbox bind:checked={todo.completed}>
          <span>{todo.title}</span>
          <button on:click="{() => remove(todo)}">x</button>
        </label>
      {/each}
    </div>

    <div class='right'>
      <h2>Completed</h2>
      {#each todoList.filter(t => t.completed) as todo (todo.id)}
        <label
          in:receive="{{key: todo.id}}"
          out:send="{{key: todo.id}}"
          animate:flip
        >
          <input type=checkbox bind:checked={todo.completed}>
          <span>{todo.title}</span>
          <button on:click="{() => remove(todo)}">x</button>
        </label>
      {/each}
    </div>
  </div>

</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    padding: 10vh 10vw;
    overflow: auto;
  }
  .new-todo {
    font-size: 1.4em;
    width: 100%;
    margin: 0;
    padding: 0 16px;
  }
  .board {
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    height: fit-content;
  }
  .left, .right {
    width: 50%;
    padding: 16px;
  }
  h2 {
    font-size: 2em;
    font-weight: 200;
    user-select: none;
    margin: 0.5em 0;
    border-bottom: 2px solid #3498db;
  }
  label {
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1em;
    line-height: 1.2;
    padding: 0.5em;
    margin: 0 auto 0.5em auto;
    border-radius: 2px;
    background-color: #ecf0f1;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    user-select: none;
    &:hover {
      border-bottom: 2px solid #3498db;
    }
  }

  input {
    margin: 0 8px 0 0;
  }

  span {
    text-align: left;
    flex: 0 1 100%;
  }

  .right label {
    color: #ecf0f1;
    background-color: #2980b9;
    &:hover {
      border-bottom: 2px solid #ecf0f1;
    }
  }

  button {
    float: right;
    height: 1em;
    box-sizing: border-box;
    padding: 0 0.5em;
    line-height: 1;
    background-color: transparent;
    border: none;
    color: rgb(170,30,30);
    opacity: .2;
    transition: opacity 0.2s;
    cursor: pointer;
  }

  label:hover button {
    opacity: 1;
  }
</style>
