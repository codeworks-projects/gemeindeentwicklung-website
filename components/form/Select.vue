<template>
  <div
    class="select"
    :class="{
      disabled: disabled,
      'not-valid': !valid,
      fill: aspect === 'fill',
    }"
  >
    <InputLabel v-if="label" :text="label" :required="required" />
    <div class="selector">
      {{ prefix ? prefix : '' }}
      <select v-model="selected" :required="required">
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      required: true,
    },
    prefix: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    aspect: {
      type: String,
      default: 'default',
      validator(value) {
        return ['default', 'fill'].includes(value)
      },
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    valid: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    selected: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },
}
</script>

<style lang="postcss" scoped>
.select {
  & .selector {
    @apply inline-block bg-primary-hover px-6 py-3 text-base font-medium cursor-pointer;

    & select {
      @apply bg-transparent text-white text-base font-medium bg-no-repeat cursor-pointer;

      -webkit-appearance: none;
      background-position: 100% center;
      background-size: 16px auto;
      background-image: url(~assets/icon/arrow-down-yellow.svg?inline);

      & option {
        @apply bg-primary-hover;
      }

      &:focus {
        @apply outline-none;
      }
    }
  }

  &.not-valid {
    & .selector {
      @apply bg-light-red;
    }
  }

  &.fill {
    & .selector {
      @apply block;

      & select {
        @apply w-full;
      }
    }
  }

  &.disabled {
    @apply pointer-events-none opacity-25;
  }
}
</style>
