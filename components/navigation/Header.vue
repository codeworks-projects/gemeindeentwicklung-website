<template>
  <section>
    <header class="header-container center">
      <div class="left-section-header">
        <Icon name="province-logo" class="province-logo" />
        {{ $t('autonomousProvince') }}
      </div>
      <div class="right-section-header">
        <span
          :class="{ lang: true, current: locale === 'de' }"
          @click="changeLanguage('de')"
          >{{ isMobile ? 'de' : 'deu' }}</span
        >
        <span
          :class="{ lang: true, current: locale === 'it' }"
          @click="changeLanguage('it')"
          >{{ isMobile ? 'it' : 'ita' }}</span
        >
        <span
          :class="{ lang: true, current: locale === 'lad' }"
          @click="changeLanguage('lad')"
          >{{ isMobile ? 'la' : 'lad' }}</span
        >
      </div>
      <div v-if="isMobile" class="line"></div>
    </header>
    <div class="center">
      <div class="top-menu">
        <a
          v-for="voice in menuVoices"
          :key="voice.sectionId"
          :href="'#' + voice.sectionId"
          class="voice"
          >{{ voice.name }}</a
        ><a href="#contact">
          <Button :value="$t('nowJoin')" class="button" />
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isMobile: false,
    }
  },

  computed: {
    locale() {
      return this.$i18n.locale
    },

    menuVoices() {
      return [
        {
          name: this.$t('project'),
          sectionId: 'intro',
        },
        {
          name: this.$t('strongPoints'),
          sectionId: 'features',
        },
        {
          name: this.$t('howItWorks'),
          sectionId: 'explanation',
        },
        {
          name: this.$t('faq'),
          sectionId: 'faq',
        },
      ]
    },
  },

  methods: {
    changeLanguage(lang) {
      this.$i18n.setLocale(lang)
    },
  },
}
</script>

<style lang="postcss" scoped>
.header-container {
  @apply flex justify-between items-center h-12 mt-2;

  & .left-section-header {
    @apply text-sm flex items-center gap-3;

    & .province-logo {
      @apply h-10 w-auto;
    }
  }

  & .right-section-header {
    @apply uppercase flex gap-6 text-sm flex-wrap;

    & .lang {
      @apply cursor-pointer;

      &:hover {
        opacity: 0.8;
      }

      &.current {
        @apply font-bold;
      }
    }
  }
}

.top-menu {
  @apply text-right mt-4 font-bold;

  & .voice {
    @apply mx-3 uppercase text-sm;
  }

  & .button {
    @apply ml-4;
  }
}

@media only screen and (max-width: 980px) {
  .header-container {
    @apply text-base py-2 mb-0 relative;

    & .left-section-header {
      @apply gap-2 leading-none text-xs;

      max-width: 60%;
    }

    & .right-section-header {
      @apply gap-3 text-right justify-end;

      & .lang {
        @apply font-normal;
      }
    }

    & .line {
      @apply absolute bottom-0;

      border-bottom: 1px solid lightgray;
      width: 100vw;
      left: -25px;
    }
  }

  .top-menu {
    @apply hidden;
  }
}
</style>
