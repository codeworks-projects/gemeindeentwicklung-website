<template>
  <div
    class="gallery"
    :style="{ backgroundImage: 'url(' + currentImageUrl + ')' }"
  >
    <div class="controls">
      <div class="arrow clickable" @click="showPreviousImage">
        <Icon name="arrow-left" class="ico" />
      </div>
      <div class="arrow clickable" @click="showNextImage">
        <Icon name="arrow-right" class="ico" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    photos: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      currentImageIndex: 0,
    }
  },

  computed: {
    currentImageUrl() {
      return this.photos[this.currentImageIndex]
    },
  },

  methods: {
    showNextImage() {
      if (this.currentImageIndex < this.photos.length - 1) {
        this.currentImageIndex += 1
      } else {
        this.currentImageIndex = 0
      }
    },

    showPreviousImage() {
      if (this.currentImageIndex > 0) {
        this.currentImageIndex -= 1
      } else {
        this.currentImageIndex = this.photos.length - 1
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.gallery {
  @apply relative w-full h-full bg-cover bg-center;

  & .controls {
    @apply absolute flex items-center bottom-3 right-3;

    & .arrow {
      @apply flex items-center justify-center select-none;

      width: 35px;
      height: 35px;

      & .ico {
        @apply text-white fill-current;

        width: 16px;
        height: 16px;
      }
    }
  }
}
</style>
