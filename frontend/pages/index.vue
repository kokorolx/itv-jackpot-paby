<template>
  <div class="welcome-page flex flex-col justify-center items-center h-screen">
    <h1 class="text-4xl font-bold mb-8">Welcome to the Zengaming's Jackpot Game!</h1>
    <p class="text-lg mb-8">Click the button below to start playing.</p>
    <nuxt-link to="/start" class="bg-yellow-500 text-white py-3 px-6 rounded-lg text-xl font-bold">
      Start Game
    </nuxt-link>
  </div>
</template>

<style>
.welcome-page {
  background-color: #f5f5f5;
}
</style>
