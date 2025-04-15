<template>
    <div class="gameplay-page">
      <img class="homeBG" src="./assets/home-bg.png" />
      <img class="logo" src="./assets/logo.png" />
  
      <div class="QAform">
        <img class="questionBox" src="./assets/question-box.png" />
        <img class="defaultAnswer" src="./assets/default-answer-box.png" />
        <img class="selectedAnswer" src="./assets/selected-answer-box.png" />
        <img class="correctAnswer" src="./assets/correct-answer-box.png" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  
  </script>
  
  <style scoped>
  
  .homeBG {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
  }
  
  .logo {
    width: 200px;
    position: absolute;
    left: 1rem;
    top: 1rem;
    z-index: 1;
  }
  
  </style>
  