<template>
  <button class="cash-out-btn" :class="{ 'unClickable': unClickable }" @mouseover="handleMouseOver" @click="handleClick">
    CASH OUT
  </button>
</template>

<script>
export default {
  data() {
    return {
      unClickable: false,
    };
  },
  methods: {
    handleMouseOver() {
      this.unClickable = false;
      const randomNum = Math.random();

      // there is a 50% chance that the button moves in a random direction by 300px
      if (randomNum <= 0.5) {
        const btn = document.querySelector('.cash-out-btn');
        btn.style.transform = `translate(${Math.random() * 300}px, ${Math.random() * 300}px)`;
      }

      // there is a 40% chance that it becomes unclickable
      if (randomNum <= 0.4) {
        this.unClickable = true;
      }
    },
    handleClick() {
      if (!this.unClickable) {
        // move credits to user's account
        // this.$store.commit('moveCreditsToAccount');
        alert('Move credits to account inprogress')
      }
    },
  },
};
</script>

<style>
.cash-out-btn {
  background-color: green;
  color: white;
  font-size: 1.5rem;
  padding: 1rem 2rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.cash-out-btn:hover {
  background-color: yellow;
}

.unClickable {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
