<script>
  import { goto } from '@sapper/app';
  import { curUser, isLoading } from 'store/store.js';

  export let userList = [];
  function goTodo (id, name) {
    $curUser = name;
    $isLoading = true;
    goto(`/user/${id}`);
  }
</script>

<table>
  <thead>
    <tr>
      <td>Name</td>
      <td>Email</td>
      <td>Phone</td>
    </tr>
  </thead>
  <tbody>
    {#each userList as {id, name, email, phone} (id)}
      <tr>
        <td>
          <span on:click={() => goTodo(id, name)}>
            {name}
          </span>
        </td>
        <td>{email}</td>
        <td>{phone}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style lang="postcss">
  td {
    padding: 8px;
  }
  table {
    border-collapse: collapse;
    & thead {
      border-bottom: 3px solid #3498db;
    }
    & td {
      width: 33.333%;
      border-right: 1px solid #3498db;
    }
    & td:last-child {
      border-right: none;
    }
    & tr:nth-child(2n) {
      background-color: #ecf0f1;
    }
  }
  span {
    display: block;
    padding: 4px;
    cursor: pointer;
    position: relative;
    transition: 0.3s;
    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      height: 2px;
      transform: scaleX(0.2);
      transform-origin: center left;
      transition: 0.3s;
      background-color: #3498db;
    }
    &:hover::after {
      transform: scaleX(1);
    }
    &:hover {
      color: #3498db;
    }
  }
</style>