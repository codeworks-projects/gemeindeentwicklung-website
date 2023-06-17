<template>
  <footer>
    <div class="center">
      <p>
        @ {{ $t('entityName') }} .
        <a href="https://www.provinz.bz.it/de/impressum.asp" target="_blank">{{
          $t('impressum')
        }}</a>
        .
        <a
          :href="
            '/pdf/privacy-cookie-policy' +
            ($i18n.locale === 'lad' ? '-lad' : '') +
            '.pdf'
          "
          target="_blank"
          >{{ $t('terms') }}</a
        >
      </p>
    </div>
  </footer>
</template>

<style lang="postcss" scoped>
footer {
  @apply py-4 text-sm;
}
</style>
