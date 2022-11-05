<template>
  <div
    class="accordion"
    :class="{
      expanded: localExpaned,
      disabled,
      'fully-expanded': fullyExpanded,
    }"
  >
    <div class="title clickable" @click="toggleExpansion()">
      <div class="text">{{ title }}</div>
      <div class="arrow">
        <Icon name="arrow-down" />
      </div>
    </div>
    <div ref="content" class="content">
      <div class="data"><slot /></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Accordion',

  props: {
    title: {
      type: String,
      required: true,
    },
    expanded: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      localExpaned: false,
      fullyExpanded: false,
    }
  },

  watch: {
    expanded(expanded) {
      this.updateExpandedStatus(expanded)
    },
  },

  mounted() {
    this.updateExpandedStatus(this.expanded)
  },

  methods: {
    toggleExpansion() {
      this.updateExpandedStatus(!this.localExpaned)
      this.$emit('toggledExpansion', this.localExpaned)
    },

    updateExpandedStatus(status) {
      this.localExpaned = status
      this.handleExpansionStatus()
    },

    handleExpansionStatus() {
      clearTimeout(this.expansionTimeout)

      if (this.localExpaned) {
        const maxHeight = this.$refs.content.scrollHeight + 1000
        this.$refs.content.style.maxHeight = maxHeight + 'px'

        const self = this
        this.expansionTimeout = setTimeout(function () {
          self.fullyExpanded = true
        }, parseFloat(getComputedStyle(this.$refs.content).transitionDuration) *
          1000)
      } else {
        this.fullyExpanded = false
        this.$refs.content.style.maxHeight = null
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.accordion {
  & .title {
    @apply border-t border-placeholder py-6 font-bold;

    & .text {
      @apply inline-block text-base text-black uppercase;

      max-width: 800px;
    }

    & .arrow {
      @apply float-right text-center;

      width: 50px;
      transition: transform 0.3s ease;
      transform-origin: center;

      & svg {
        @apply text-yellow fill-current;

        width: 18px;
        height: 18px;
      }
    }
  }

  & .content {
    @apply overflow-hidden;

    max-height: 0;
    transition: max-height 0.3s ease;

    & .data {
      @apply pb-6;

      max-width: 800px;

      & p {
        @apply whitespace-pre-wrap;
      }
    }
  }

  &.expanded {
    & .arrow {
      transform: rotate(180deg) translateY(-2px);
    }
  }

  &.fully-expanded {
    & .content {
      @apply overflow-visible;
    }
  }

  &.disabled {
    @apply pointer-events-none opacity-25;
  }
}

@media only screen and (max-width: 980px) {
  .accordion {
    & .title {
      & .text {
        max-width: calc(100% - 60px);
      }
    }
  }
}
</style>
