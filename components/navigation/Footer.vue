<template>
  <footer>
    <div class="center">
      <p>
        @ {{ $t('entityName') }} .
        <a href="https://www.provinz.bz.it/de/privacy.asp" target="_blank">{{
          $t('terms')
        }}</a>
      </p>
    </div>
  </footer>
</template>

<style lang="postcss" scoped>
footer {
  @apply py-4 text-sm;
}
</style>
