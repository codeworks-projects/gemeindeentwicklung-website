<template>
  <div>
    <Header />
    <Nuxt class="page" />
    <Footer />
    <NotificationCenter />
  </div>
</template>

<style lang="postcss">
html {
  @apply font-sans;

  font-size: 16px;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  scroll-behavior: smooth;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
