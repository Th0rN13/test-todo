<script>
  const PREV_PAGE = -10;
  const NEXT_PAGE = -20;
  const FIRST_PAGE = -30;
  const LAST_PAGE = -40;
  export let page = 1;
  export let pageCount = 10;
  let pagesArray = [];

  function recalcPages() {
    pagesArray = [
      FIRST_PAGE,
      PREV_PAGE,
      ...Array.from({length: pageCount}, (_, i) => i + 1),
      NEXT_PAGE,
      LAST_PAGE];
  }

  function disabledPage (pageToCheck) {
    switch (pageToCheck) {
      case PREV_PAGE: return page === 1;
      case NEXT_PAGE: return page === pageCount;
      case FIRST_PAGE: return page === 1;
      case LAST_PAGE: return page === pageCount;
      default: return false;
    }
  }

  function renderPageName (pageToRender) {
    switch (pageToRender) {
      case PREV_PAGE: return 'Previous';
      case NEXT_PAGE: return 'Next';
      case FIRST_PAGE: return 'First';
      case LAST_PAGE: return 'Last';
      default: return pageToRender;
    }
  }

  function handlePageClick (pageToSwitch) {
    switch (pageToSwitch) {
      case PREV_PAGE:
        if (page > 1) page--;
        break;
      case NEXT_PAGE:
        if (page < pageCount) page++;
        break;
      case FIRST_PAGE:
        page = 1;
        break;
      case LAST_PAGE:
        page = pageCount;
        break;
      default: page = pageToSwitch;
    }
  }

  $: recalcPages(page, pageCount)
</script>

<div class="pagesWrapper">
  {#each pagesArray as pageEl (pageEl)}
    <div
      class="page"
      class:active={pageEl === page}
      class:disabled={disabledPage(pageEl)}
      class:text={pageEl < 0}
      on:click={() => handlePageClick(pageEl)}
    >
      {renderPageName(pageEl)}
    </div>
  {/each}
</div>

<style lang="postcss">
  .pagesWrapper {
    display: flex;
    align-self: center;
  }
  .page {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #2c3e50;
    height: 32px;
    width: 32px;
    cursor: pointer;
    transition: 0.3s;
    &::after {
      content: '';
      position: absolute;
      top: 100%;
      height: 2px;
      left: 0;
      width: 100%;
      transform: scale(0.2);
      transition: 0.3s;
      background: #3498db;
    }
    &:hover::after{
      transform: scale(1);
    }
  }
  .active {
    background: #3498db;
    color: #ecf0f1;
    border-radius: 50%;
    &::after {
      content: none;
    }
  }
  .text {
    width: 80px;
  }
  .disabled {
    color: #ecf0f1;
    cursor: default;
    &::after{
      content: none;
    }
  }
</style>