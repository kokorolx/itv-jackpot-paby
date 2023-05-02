<template>
  <div class="sign-component flex flex-col justify-center items-center">
    <div class="sign-icon bg-gray-300 rounded-full w-16 h-16 flex justify-center items-center mb-4" :class="{ spin: spinning }">
      {{ startingLetter }}
    </div>
    <h2 class="text-lg font-bold" :class="{ spin: spinning }">{{ signName }}</h2>
  </div>
</template>

<script>


export default {
  props: {
    startingLetter: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    spinning: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    signName() {
      switch (this.startingLetter) {
        case 'C':
          return 'Cherry';
        case 'L':
          return 'Lemon';
        case 'O':
          return 'Orange';
        case 'W':
          return 'Watermelon';
        default:
          return '';
      }
    }
  }
}
</script>

<style>
.sign-icon {
  font-size: 2rem;
}

.spin {
  animation-name: spin;
  animation-duration: 0.5s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

</style>
