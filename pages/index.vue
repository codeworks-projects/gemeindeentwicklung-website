<template>
  <main>
    <section id="intro" class="intro bg-primary">
      <div class="center">
        <div class="top">
          <div class="gallery-ct">
            <SimpleHomeGallery :photos="galleryPhotos" />
          </div>
          <div class="details">
            <h1>{{ $t('introText') }}</h1>
            <p class="top-desc">{{ $t('introDesc') }}</p>
            <a href="#contact">
              <Button :value="$t('goIn')" />
            </a>
          </div>
        </div>
        <div class="bottom">
          <div class="col extended-desc-ct">
            <p class="extended-desc">{{ $t('introExtendedDescPartOne') }}</p>
            <p class="extended-desc">{{ $t('introExtendedDescPartTwo') }}</p>
            <a :href="homeVideoLink" target="_blank">
              <div class="simplified-cta">
                {{ $t('seeCampaignVideo') }}
              </div>
            </a>
          </div>
          <div class="col quote-ct">
            <Icon :name="topQuoteIcoName" class="quote" />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import locations from '@/data/locations.json'

export default {
  data() {
    return {
      galleryPhotos: [
        '/image/home/1.jpeg',
        '/image/home/2.jpeg',
        '/image/home/3.jpeg',
        '/image/home/4.jpeg',
      ],
      explanationsStepIndex: 0,
      contactForm: {},
      submittedContactForm: false,
      isSubmittingContactForm: false,
    }
  },

  computed: {
    features() {
      return [
        {
          image: '/image/features/first.jpeg',
          title: this.$t('natureFeatureTitle'),
          desc: this.$t('natureFeatureDesc'),
        },
        {
          image: '/image/features/second.jpeg',
          title: this.$t('buildingFeatureTitle'),
          desc: this.$t('buildingFeatureDesc'),
        },
        {
          image: '/image/features/third.jpeg',
          title: this.$t('mobilityFeatureTitle'),
          desc: this.$t('mobilityFeatureDesc'),
        },
      ]
    },

    explanations() {
      return [
        {
          image: '/image/explanations/one.svg',
          title: this.$t('explanations.one.title'),
          desc: this.$t('explanations.one.desc'),
          secDesc: this.$t('explanations.one.secDesc'),
        },
        {
          image: '/image/explanations/two.svg',
          title: this.$t('explanations.two.title'),
          desc: this.$t('explanations.two.desc'),
        },
      ]
    },

    faqs() {
      return [
        {
          title: this.$t('faqs.one.title'),
          desc: this.$t('faqs.one.desc'),
        },
        {
          title: this.$t('faqs.two.title'),
          desc: this.$t('faqs.two.desc'),
        },
        {
          title: this.$t('faqs.three.title'),
          desc: this.$t('faqs.three.desc'),
        },
        {
          title: this.$t('faqs.four.title'),
          desc: this.$t('faqs.four.desc'),
        },
        {
          title: this.$t('faqs.five.title'),
          desc: this.$t('faqs.five.desc'),
        },
      ]
    },

    topQuoteIcoName() {
      return 'home-quote-' + this.$i18n.locale
    },

    namePrefixes() {
      return [
        {
          name: this.$t('sir'),
          value: 'Sig.',
        },
        {
          name: this.$t('madam'),
          value: 'Sigra.',
        },
        {
          name: this.$t('other'),
          value: 'Altro.',
        },
      ]
    },

    locationsList() {
      return locations.map((location) => ({
        value: location['E-Mail'],
        name: this.getLocationName(location),
      }))
    },

    explanationBoxTranslation() {
      const itemLength =
        typeof window !== 'undefined' && window.innerWidth < 980
          ? 100
          : this.explanationLength
      return itemLength * this.explanationsStepIndex
    },

    explanationLength() {
      return 100 / this.explanations.length
    },

    homeVideoLink() {
      switch (this.$i18n.locale) {
        case 'it':
          return 'https://youtu.be/6p_7Wh5HVsk'
      }

      return 'https://youtu.be/l08dol0aSrI'
    },

    faqVideoLink() {
      switch (this.$i18n.locale) {
        case 'it':
          return 'https://youtu.be/9Y3IGZBXOm4'
      }

      return 'https://youtu.be/w43n1akmHHo'
    },

    emailContactAddress() {
      switch (this.$i18n.locale) {
        case 'it':
          return 'territorio.paesaggio.beniculturali@provincia.bz.it'
      }

      return 'raum.landschaft.denkmalpflege@provinz.bz.it'
    },
  },

  methods: {
    showNextExplanation() {
      if (this.explanationsStepIndex < this.explanations.length - 1) {
        this.explanationsStepIndex += 1
      }
    },

    showPreviousExplanation() {
      if (this.explanationsStepIndex > 0) {
        this.explanationsStepIndex -= 1
      }
    },

    getLocationName(location) {
      switch (this.$i18n.locale) {
        case 'it':
          return location.Comune
      }
      return location.Gemeinde
    },

    submitContactForm() {
      this.isSubmittingContactForm = true

      const sendFormData = { ...this.contactForm }
      sendFormData.language = this.$i18n.locale

      this.$axios
        .post(
          'https://import.codeworks.build/gemeindeentwicklung/sendmail.php',
          {
            t: 'bfyfdfgsjsg',
            d: sendFormData,
          }
        )
        .then(
          (response) => {
            this.isSubmittingContactForm = false
            if (response.data && response.data.status === true) {
              this.submittedContactForm = true
              // this.resetFields()
            } else {
              this.notifyError()
            }
          },
          () => {
            this.isSubmittingContactForm = false
            this.notifyError()
          }
        )
    },

    resetFields() {
      const setForm = { ...this.contactForm }

      for (const [fieldId, value] of Object.entries(this.contactForm)) {
        setForm[fieldId] = value === true ? false : ''
      }

      this.contactForm = setForm
    },
  },
}
</script>

<style lang="postcss" scoped>
main {
  @apply overflow-hidden;
}

section {
  @apply py-28;
}

.simplified-cta {
  @apply text-base text-yellow uppercase mt-3 font-bold;
}

h2 {
  @apply block text-3xl font-bold whitespace-pre-wrap;

  max-width: 500px;

  &.centered {
    @apply text-center;

    max-width: initial;
  }

  &.color-inverted {
    @apply text-white;
  }
}

.section-desc {
  @apply block text-base mt-3;

  max-width: 700px;

  &.centered {
    @apply text-center;

    max-width: initial;
  }

  &.color-inverted {
    @apply text-white;
  }
}

.intro {
  @apply text-white mt-20;

  & .top {
    @apply flex gap-8 -mt-40;

    & .gallery-ct {
      @apply bg-placeholder;

      width: 65%;
      height: 400px;
      flex-shrink: 0;
    }

    & .details {
      & h1 {
        @apply font-bold text-5xl mt-20;
      }

      & .top-desc {
        @apply font-medium text-base py-3;
      }
    }
  }

  & .bottom {
    @apply flex;

    & .col {
      @apply w-1/2;

      &.extended-desc-ct {
        @apply mt-12;

        & .extended-desc {
          @apply block text-base mt-5 whitespace-pre-wrap;
        }
      }

      &.quote-ct {
        @apply relative;

        & .quote {
          @apply absolute right-0;

          width: 400px;
          bottom: -200px;
        }
      }
    }
  }
}

.features {
  & .features-gallery {
    @apply flex gap-5 mt-10;

    & .feature {
      @apply flex-1;

      & .image {
        @apply bg-placeholder bg-cover bg-center;

        height: 250px;
      }

      & .title {
        @apply text-xl mt-5 font-bold;
      }

      & .desc {
        @apply text-sm mt-2;
      }
    }
  }
}

.explanations {
  & .explanations-ct {
    @apply mt-12 overflow-hidden;

    & .inner-slide {
      @apply flex items-start justify-center transition;

      white-space: nowrap;

      & .explanation {
        @apply inline-block w-1/3 px-5 text-center text-white;

        & .image {
          @apply relative bg-center bg-no-repeat mx-auto rounded-full;

          width: 100px;
          height: 100px;
          background-color: #53c7a8;
          background-size: 60% auto;

          & .number {
            @apply absolute -bottom-2 right-2 bg-yellow text-primary text-center rounded-full;

            width: 30px;
            height: 30px;
            line-height: 30px;
          }
        }

        & .title {
          @apply text-lg font-bold mt-6;

          white-space: initial;
        }

        & .desc {
          @apply text-base mt-1;

          white-space: initial;

          &.second {
            @apply mt-3;
          }
        }
      }
    }
  }

  & .explanation-controls {
    @apply hidden mt-20;

    & .progress-bar {
      @apply bg-white bg-opacity-50;

      height: 2px;

      & .inner-bar {
        @apply h-full bg-white transition;
      }
    }

    & .controls {
      @apply flex justify-center mt-4;

      & .arrow {
        @apply flex items-center justify-center;

        width: 35px;
        height: 35px;

        & .ico {
          @apply text-yellow fill-current;

          width: 20px;
          height: 20px;
        }
      }
    }
  }
}

.faqs {
  & .faqs-ct {
    @apply mt-10;
  }

  & .info-action {
    & .more-questions-title {
      @apply text-base font-bold border-t border-placeholder pt-6;
    }
  }
}

.map {
  background-color: #f4f0f0;
}

.contact-form {
  & .badge {
    @apply absolute -top-12 right-0 w-36 h-36 bg-center bg-contain bg-no-repeat;

    background-image: url(~assets/icon/everyday-for-future.svg?inline);
  }

  & .form-ct {
    @apply mt-12;

    & .row {
      @apply flex gap-10 mb-6;

      & .col {
        @apply w-1/2;

        & .required-label {
          @apply text-sm float-right text-white opacity-50;
        }
      }
    }

    & .button {
      @apply mt-10;
    }
  }
}

@media only screen and (max-width: 980px) {
  section {
    @apply py-16;
  }

  h2 {
    @apply break-words;
  }

  h2.centered,
  .section-desc.centered {
    @apply px-5;
  }

  .intro {
    @apply mt-24 pb-24;

    & .top {
      @apply flex-col -mt-32;

      & .gallery-ct {
        @apply w-full;

        height: 70vw;
      }

      & .details {
        & h1 {
          @apply mt-0;
        }
      }
    }

    & .bottom {
      @apply block;

      & .col {
        @apply w-full;

        &.quote-ct {
          & .quote {
            width: 400px;
            bottom: -360px;
          }
        }
      }
    }
  }

  .features {
    padding-top: 300px;

    & .features-gallery {
      @apply flex-col gap-12;
    }
  }

  .explanations {
    & .explanations-ct {
      & .inner-slide {
        @apply block;

        & .explanation {
          @apply w-full;
        }
      }
    }

    & .explanation-controls {
      @apply block;
    }
  }

  .contact-form {
    & .badge {
      @apply hidden;
    }

    & .form-ct {
      & .row {
        @apply flex-col gap-0 mb-0;

        & .col {
          @apply w-full mb-6;

          &.mobile-hidden {
            @apply hidden;
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 400px) {
  .intro {
    & .bottom {
      & .col {
        &.quote-ct {
          & .quote {
            width: 90vw;
            bottom: -85vw;
          }
        }
      }
    }
  }
}
</style>
