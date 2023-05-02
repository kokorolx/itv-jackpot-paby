<template>
  <div class="start-page flex flex-col justify-center items-center h-screen px-4">
    <header class="text-center mb-8">
      <h1 class="text-4xl font-bold">My Jackpot Game</h1>
      <p class="text-lg">Get ready to win big!</p>
    </header>
    <div class="w-full">
      <div class="flex items-stretch justify-center">
        <div class="w-full p-4 border">
          <SignComponent ref="sign1" :startingLetter="startingLetters[0]" :spinning="signsSpinning[0]" :index="0" />
        </div>
        <div class="w-full p-4 border">
          <SignComponent ref="sign2" :startingLetter="startingLetters[1]" :spinning="signsSpinning[1]" :index="1" />
        </div>
        <div class="w-full p-4 border">
          <SignComponent ref="sign3" :startingLetter="startingLetters[2]" :spinning="signsSpinning[2]" :index="2" />
        </div>
      </div>
    </div>
    <button @click="startGame"
      :class="['bg-yellow-500 text-white py-3 px-6 rounded-lg text-xl font-bold mt-8', { 'opacity-50': gameStarted }]">
      <span v-if="gameStarted">
        <i class="fas fa-spinner fa-spin mr-2"></i>
        Rolling...
      </span>
      <span v-else>
        Start Game
      </span>
    </button>

    <div class="flex items-center mt-3">
      <p class="text-lg font-bold mr-4" v-if="gameSession?.credit > 0">Credit: {{ gameSession?.credit }}</p>
      <p class="text-lg font-bold mr-4 text-red-500" v-else>Out of credit, please reload page to play again</p>
      <CashOutButton></CashOutButton>
    </div>

    <modal :show="showModal">
      <div>
        <h2 class="text-xl font-bold mb-4 text-center">{{ modalTitle }}</h2>
        <p class="mb-4 text-center">{{ message }}</p>
        <button
          class="mx-auto flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          @click="showModal = false">
          Close
        </button>
      </div>
    </modal>

  </div>
</template>

<script>
import SignComponent from '~/components/SignComponent.vue';
import CashOutButton from '~/components/CashOutButton.vue'
import Modal from '~/components/Modal.vue';

import axios from 'axios';

export default {
  components: {
    SignComponent
  },
  data() {
    return {
      gameStarted: false,
      signsSpinning: [false, false, false],
      availableLetters: ['C', 'L', 'O', 'W'],
      startingLetters: ['C', 'L', 'O'],
      startingIntervals: [null, null, null],
      gameSession: null,
      message: '',
      modalTitle: '',
      showModal: false
    };
  },
  mounted() {
    this.createSession();
  },
  methods: {
    async createSession() {
      try {
        const response = await axios.post(`${process.env.API_URL}/games`, {});
        this.gameSession = response.data.game;
      } catch (error) {
        console.error(error); // handle any errors
      }
    },
    async startGame() {
      if (!this.gameStarted) {
        this.gameStarted = true
        this.signsSpinning = [true, true, true]

        axios.post(`${process.env.API_URL}/games/roll`, {
          gameID: this.gameSession.id
        }).then((res) => {
          let result = res.data

          for (let index = 0; index < this.startingLetters.length; index++) {
            let timeout = (index + 1) * 1000

            this.startingIntervals[index] = setInterval(() => {
              this.$set(this.startingLetters, index, this.randomStartingLetter(index))
            }, 200);

            setTimeout(() => {
              this.$set(this.signsSpinning, index, false)
              if (this.startingIntervals[index]) {
                clearInterval(this.startingIntervals[index])
                if (index == this.startingLetters.length - 1) { // Stop the latest interval
                  this.handleRolled(result)
                }
              }

              for (let index = 0; index < result.result.length; index++) {
                this.$set(this.startingLetters, index, result.result[index])
              }

            }, timeout)
          }
        }).catch((error) => {
          console.log("====error", error)
        })
      }
    },
    handleRolled(result) {
      this.message = result.game.isWin ? 'You win' : 'You lose'
      this.modalTitle = result.game.isWin ? 'Yay!!' : 'Opps!'

      if (result.message) {
        this.message = result.message
      }
      this.gameStarted = false
      this.gameSession = result.game
      this.showModal = true
    },
    randomStartingLetter(index) {
      const randomInx = Math.floor(Math.random() * this.availableLetters.length)
      return this.availableLetters[randomInx]
    }
  }
}
</script>

<style scoped>
.start-page {
  background-color: #f5f5f5;
}

.table {
  width: 70%;
  margin: 0 auto;
}
</style>
