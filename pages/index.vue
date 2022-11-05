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
            <a href="#features">
              <Button :value="$t('goIn')" />
            </a>
          </div>
        </div>
        <div class="bottom">
          <div class="col extended-desc-ct">
            <p class="extended-desc">{{ $t('introExtendedDescPartOne') }}</p>
            <p class="extended-desc">{{ $t('introExtendedDescPartTwo') }}</p>
            <a href="#features">
              <div class="simplified-cta">
                {{ $t('learnMoreAboutProject') }}
              </div>
            </a>
          </div>
          <div class="col quote-ct">
            <Icon :name="topQuoteIcoName" class="quote" />
          </div>
        </div>
      </div>
    </section>

    <section id="features" class="features">
      <div class="center">
        <h2>{{ $t('featuresTitle') }}</h2>
        <!--<p class="section-desc">{{ $t('featuresDesc') }}</p>-->
        <div class="features-gallery">
          <div v-for="feature in features" :key="feature.title" class="feature">
            <div
              class="image"
              :style="{ backgroundImage: 'url(' + feature.image + ')' }"
            ></div>
            <h3 class="title">{{ feature.title }}</h3>
            <p class="desc">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section id="explanation" class="explanations bg-primary">
      <div class="center">
        <h2 class="color-inverted centered">{{ $t('explanationTitle') }}</h2>
        <!--<p class="section-desc color-inverted centered">
          {{ $t('explanationDesc') }}
        </p>-->
        <div class="explanations-ct">
          <div
            class="inner-slide"
            :style="{
              transform: 'translateX(-' + explanationBoxTranslation + '%)',
            }"
          >
            <div
              v-for="(explanation, index) in explanations"
              :key="explanation.title"
              class="explanation"
            >
              <div
                class="image"
                :style="{ backgroundImage: 'url(' + explanation.image + ')' }"
              >
                <div class="number">{{ index + 1 }}.</div>
              </div>
              <h3 class="title">{{ explanation.title }}</h3>
              <p class="desc">{{ explanation.desc }}</p>
              <p class="desc second">{{ explanation.secDesc }}</p>
            </div>
          </div>
        </div>
        <div class="explanation-controls">
          <div class="progress-bar">
            <div
              class="inner-bar"
              :style="{
                width: explanationLength + '%',
                transform:
                  'translateX(' +
                  explanationLength * explanationsStepIndex * 3 +
                  '%)',
              }"
            ></div>
          </div>
          <div class="controls">
            <div class="arrow clickable" @click="showPreviousExplanation">
              <Icon name="arrow-left" class="ico" />
            </div>
            <div class="arrow clickable" @click="showNextExplanation">
              <Icon name="arrow-right" class="ico" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="faqs">
      <div class="center">
        <h2>{{ $t('moreQuestions') }}</h2>
        <p class="section-desc">{{ $t('moreQuestionsDesc') }}</p>
        <div class="faqs-ct">
          <Accordion
            v-for="faq in faqs"
            :key="faq.title"
            :title="faq.title"
            class="faq"
          >
            <p>{{ faq.desc }}</p>
          </Accordion>
        </div>
        <div class="info-action">
          <p class="more-questions-title">{{ $t('moreQuestionsAsk') }}</p>
          <a href="#contact">
            <div class="simplified-cta">
              {{ $t('joinToday') }}
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- <section class="map">
      <h2 class="centered">{{ $t('mapTitle') }}</h2>
      <p class="section-desc centered">
        {{ $t('mapDesc') }}
      </p>
      TODO: add here map
    </section> -->

    <section id="contact" class="contact-form bg-primary">
      <div class="center relative">
        <h2 class="color-inverted">{{ $t('contactTitle') }}</h2>
        <p class="section-desc color-inverted">
          {{ $t('contactDesc') }}
        </p>
        <div class="badge" />
        <div class="form-ct">
          <div class="row">
            <div class="col">
              <Select
                v-model="contactForm.reason"
                :options="contactOptions"
                :label="$t('reason')"
                aspect="fill"
                required
              />
            </div>
            <div class="col mobile-hidden">
              <div class="required-label">* {{ $t('required') }}</div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <TextInput
                v-model="contactForm.name"
                :label="$t('name')"
                aspect="fill"
                required
              />
            </div>
            <div class="col">
              <TextInput
                v-model="contactForm.surname"
                :label="$t('surname')"
                aspect="fill"
                required
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <TextInput
                v-model="contactForm.email"
                :label="$t('email')"
                type="email"
                aspect="fill"
                required
              />
            </div>
            <div class="col">
              <TextInput
                v-model="contactForm.phone"
                :label="$t('phone')"
                aspect="fill"
                type="tel"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <Select
                v-model="contactForm.location"
                :options="locationsList"
                :label="$t('leavingLocation')"
                aspect="fill"
                required
              />
            </div>
            <div class="col mobile-hidden" />
          </div>
          <Checkbox v-model="contactForm.acceptTerms">
            <i18n path="acceptTerms" tag="span">
              <template #terms>
                <a
                  href="ttps://www.provinz.bz.it/de/privacy.asp"
                  target="_blank"
                  >{{ $t('terms') }}</a
                >
              </template>
            </i18n>
          </Checkbox>
          <Button
            :value="
              submittedContactForm
                ? $t('submittedFormConfirmation')
                : $t('goIn')
            "
            :description="
              submittedContactForm
                ? $t('submittedFormConfirmationDesc')
                : $t('goInDesc')
            "
            :loading="isSubmittingContactForm"
            class="button"
            @click="submitContactForm"
          />
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

    contactOptions() {
      return [] // TODO
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
        case 'de':
          return location.Gemeinde
      }
      return ''
    },

    submitContactForm() {
      this.isSubmittingContactForm = true
      // TODO
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
          @apply relative bg-center bg-no-repeat mx-auto;

          width: 100px;
          height: 100px;
          background-color: #53c7a8;
          background-size: 60% auto;
          border-radius: 50%;

          & .number {
            @apply absolute -bottom-2 right-2 bg-yellow text-primary text-center;

            width: 30px;
            height: 30px;
            line-height: 30px;
            border-radius: 50%;
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
            width: 90vw;
            bottom: -85vw;
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
</style>
