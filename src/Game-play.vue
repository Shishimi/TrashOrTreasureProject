<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div class="gameplay-page">
      <img class="homeBG" src="./assets/home-bg.png" />
      <img class="logo" src="./assets/logo.png" />
      <router-link :to="{ path: '/' }">
      <img class="home-btn" src="./assets/logo.png" />
    </router-link>
    <div class="content">
    <div class="feedback">
    <img class="selectedAnswer" src="./assets/selected-answer-box.png" />
    <img class="correctAnswer" src="./assets/correct-answer-box.png" />
    </div>
    <img class="questionBox" src="./assets/question-box.png" />
    <div class="answersChoices">   
    <img class="Answer1" src="./assets/default-answer-box.png" />
    <img class="Answer2" src="./assets/default-answer-box.png" />
    <img class="Answer3" src="./assets/default-answer-box.png" />
    <img class="Answer4" src="./assets/default-answer-box.png" />
    </div>
    </div>
    </div>
  </template>
  
  
  <style scoped>

  .gameplay-page {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}
  
  .homeBG {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
  }

  .home-btn {
    display: block;
  width: 18vw;
  height: 9vh;
  position: fixed;
  left: 2vw;
  top: 23vh;
  z-index: 1;
}

.home-btn:hover {
  transform: scale(1.2);
}
  
.content {
  position: absolute;
  top: 10vw;
  left: 60vw;
  transform: translate(-50%, -50%);
  z-index: 2;
  display: grid;
  grid-template-rows: auto auto auto; 
  gap: 2vh;
  width: 40vw; 
}

.questionBox {
  width: 100%;
  height: auto;
}

/* Answers container uses grid to create a 2x2 layout */
.answers {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1vh;
}

@media (min-width: 1024px) {
  .homeBG {
    height: 100vh;
    width: 100vw;
    top: 0;
  }

  .home-btn {
    height: 18vh;
    top: 3vh;
  }

  .home-btn:hover {
    transform: scale(1.2);
  }

  .logo {
    height: 22vh;
    top: 0vh;
  }

  .content {
    grid-template-rows: auto auto auto;
    gap: 2vh;
    width: 70vw;
  }

}
  </style>
  