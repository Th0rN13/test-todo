<script>
  import { isLoading } from 'store/store.js';
</script>

<div>
  {#if $isLoading}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 30">
      <rect x="0" y="0" width="4" height="10" fill="#333">
        <animateTransform attributeType="xml"
          attributeName="transform" type="translate"
          values="0 0; 0 20; 0 0"
          begin="0" dur="0.6s" repeatCount="indefinite" />
      </rect>
      <rect x="10" y="0" width="4" height="10" fill="#333">
        <animateTransform attributeType="xml"
          attributeName="transform" type="translate"
          values="0 0; 0 20; 0 0"
          begin="0.2s" dur="0.6s" repeatCount="indefinite" />
      </rect>
      <rect x="20" y="0" width="4" height="10" fill="#333">
        <animateTransform attributeType="xml"
          attributeName="transform" type="translate"
          values="0 0; 0 20; 0 0"
          begin="0.4s" dur="0.6s" repeatCount="indefinite" />
      </rect>
    </svg>
  {:else}
    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <polygon points="202.624,478.016 0,291.36 70.512,214.8 191.968,326.656 431.44,33.984 512,99.904 "/>
    </svg>
  {/if}
</div>

<style lang="postcss">
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    margin-right: 16px;
  }
  svg {
    width: 100%;
    height: 100%;
    & rect {
      fill: #e67e22;
    }
    & polygon {
      fill: #3498db;
    }
  }

</style>
