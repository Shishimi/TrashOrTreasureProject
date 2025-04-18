<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
const selectedAnswer = ref<string>('') // stores the answer clicked by the user

//to handle the answer click
const handleAnswerClick = (answer: string) => {
  selectedAnswer.value = answer
}
</script>

<template>
    <div class="gameplay-page">
      <img class="homeBG" src="./assets/home-bg.png" />
      <img class="logo" src="./assets/logo.png" />
      <router-link :to="{ path: '/' }">
      <img class="home-btn" src="./assets/logo.png" />
    </router-link>
    <div class="feedback">
    <img class="selectedAnswer" src="./assets/selected-answer-box.png" />
    <img class="correctAnswer" src="./assets/correct-answer-box.png" />
    </div>
    <img class="questionBox" src="./assets/question-box.png" />  
    <img class="Answer1" src="./assets/default-answer-box.png" @click="handleAnswerClick('Answer 1')"/>
    <img class="Answer2" src="./assets/default-answer-box.png" @click="handleAnswerClick('Answer 2')"/>
    <img class="Answer3" src="./assets/default-answer-box.png" @click="handleAnswerClick('Answer 3')"/>
    <img class="Answer4" src="./assets/default-answer-box.png" @click="handleAnswerClick('Answer 4')"/>
    <router-link :to="{ path: '/register' }">
      <img class="profileButton" src="./assets/profile-btn.png" />
    </router-link>
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
  
.questionBox {
  width: 50vw;
  display: block;
  position: absolute;
  top: 5%;
  left: 25vw;
}

.Answer1 {
  cursor: pointer;
  width: 33vw;
  display: block;
  position: absolute;
  top: 30vh;
  left: 12vw;
}

.Answer2 {
  cursor: pointer;
  width: 33vw;
  display: block;
  position: absolute;
  top: 30vh;
  left: 55vw;
}

.Answer3 {
  cursor: pointer;
  width: 33vw;
  display: block;
  position: absolute;
  top: 60vh;
  left: 12vw;
}

.Answer4 {
  cursor: pointer;
  width: 33vw;
  display: block;
  position: absolute;
  top: 60vh;
  left: 55vw;
}

.Answer1:hover, .Answer2:hover, .Answer3:hover, .Answer4:hover{
  transform: scale(1.1);
}

.profileButton {
  cursor: pointer;
  border: none;
  width: 25vw;
  height: 11vh;
  position: fixed;
  left: 80vw;
  top: 27.5vw;
  z-index: 1;
}

.profileButton:hover {
  transform: scale(1.2);
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

  .profileButton {
    height: 25vh;
    top: 0;
  }

}
  </style>
  