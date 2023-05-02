<template>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 fixed inset-0 flex items-center justify-center" v-if="show">
    <div class="bg-white rounded-lg shadow-md p-6 mx-auto w-1/2">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
