<script setup lang="ts">
import axios from 'axios'
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted} from 'vue'
const selectedAnswer = ref<string>('') // stores the answer clicked by the user

const questions = ref<any[]>([])

const currentIndex = ref(0)

const currentQuestion = ref<any | null>(null)

const shuffledAnswers = ref<string[]>([])

const answered = ref(false)
const fetchQuestions = async () => {
  const {data} = await axios.get(
      'https://fdzsbhvpcdmsnjitqudi.supabase.co/rest/v1/QuizQuestions',
      {
        headers: {
          apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkenNiaHZwY2Rtc25qaXRxdWRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MzExMTgsImV4cCI6MjA2MDQwNzExOH0.nPmzqfZQKSqteiq2waJoJVneFmh1tvrZ6eODMCZVuLw',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkenNiaHZwY2Rtc25qaXRxdWRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MzExMTgsImV4cCI6MjA2MDQwNzExOH0.nPmzqfZQKSqteiq2waJoJVneFmh1tvrZ6eODMCZVuLw'
        },
        params: {
          select: '*'
        }
      }
  )
  questions.value = data.sort(() => Math.random() - 0.5)

  currentIndex.value = 0
  loadNextQuestion()
}

const loadNextQuestion = () => {
  if (currentIndex.value >= questions.value.length){
    alert("You're done! All questions answered.")
    return
  }

  currentQuestion.value = questions.value[currentIndex.value]

  if (!currentQuestion.value){
    return
  }

  shuffledAnswers.value = [
    { text: currentQuestion.value.Answer, isCorrect: true },
    { text: currentQuestion.value.WrongAnswer1, isCorrect: false },
    { text: currentQuestion.value.WrongAnswer2, isCorrect: false },
    { text: currentQuestion.value.WrongAnswer3, isCorrect: false }
  ].sort(() => Math.random() - 0.5)
}
//to handle the answer click
const handleAnswerClick = (answer: { text: string, isCorrect: boolean}) =>{
  console.log('You clicked:', answer.text)

  if (answer.isCorrect){
    alert("Correct!")
  } else{
    alert("Wrong")
  }

  currentIndex.value++
  loadNextQuestion()
}

onMounted(fetchQuestions)
</script>

<template>
    <div class="gameplay-page">
      <img class="homeBG" src="./assets/home-bg.png" />
      <router-link :to="{ path: '/' }">
      <img class="home-btn" src="./assets/logo.png" />
      </router-link>

    <!-- <div class="feedback">
    <img class="selectedAnswer" src="./assets/selected-answer-box.png" />
    <img class="correctAnswer" src="./assets/correct-answer-box.png" />
    </div>
    <img class="questionBox" src="./assets/question-box.png" />
      <div class="questionText">{{ currentQuestion?.Question}}</div>
    <img
        class="Answer1"
        src="./assets/default-answer-box.png"
        @click="handleAnswerClick(shuffledAnswers[0])"/>
      <p class="answerText1">{{ shuffledAnswers[0]}}</p>

    <img class="Answer2"
         src="./assets/default-answer-box.png"
         @click="handleAnswerClick(shuffledAnswers[1])"/>
      <p class="answerText2">{{ shuffledAnswers[1]}}</p>

    <img class="Answer3"
         src="./assets/default-answer-box.png"
         @click="handleAnswerClick(shuffledAnswers[2])"/>
      <p class="answerText3">{{ shuffledAnswers[2]}}</p>
    <img class="Answer4"
         src="./assets/default-answer-box.png"
         @click="handleAnswerClick('shuffledAnswers[3]')"/>
      <p class="answerText4">{{ shuffledAnswers[3]}}</p>
      -->
      <div v-if="shuffledAnswers.length">
        <img class="questionBox" src="./assets/question-box.png" />
        <div class="questionText">{{ currentQuestion?.Question }}</div>

        <img class="Answer1" src="./assets/default-answer-box.png" @click="handleAnswerClick(shuffledAnswers[0])" />
        <p class="answerText1">{{ shuffledAnswers[0].text }}</p>

        <img class="Answer2" src="./assets/default-answer-box.png" @click="handleAnswerClick(shuffledAnswers[1])" />
        <p class="answerText2">{{ shuffledAnswers[1].text }}</p>

        <img class="Answer3" src="./assets/default-answer-box.png" @click="handleAnswerClick(shuffledAnswers[2])" />
        <p class="answerText3">{{ shuffledAnswers[2].text }}</p>

        <img class="Answer4" src="./assets/default-answer-box.png" @click="handleAnswerClick(shuffledAnswers[3])" />
        <p class="answerText4">{{ shuffledAnswers[3].text }}</p>
      </div>

      <router-link :to="{ path: '/register' }">
      <img class="profileButton" src="./assets/profile-btn.png" />
    </router-link>
    </div>
  </template>
  
  
<style scoped>

.answer-wrapper{
  position: relative;
  width: 300px;
  height: 80px;
  margin: 15px auto;
  cursor: pointer;
}

.answer-img {
  width: 100%;
  height: auto;
  z-index: 0;
  position: relative;
}

.answer-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  font-size: 1.2rem;
  font-weight: bold;
  color: #222;
  text-align: center;
  pointer-events: none;
}

.questionText {
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 600px;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  word-wrap: break-word;
  white-space: normal;
}

.answerText1, .answerText2, .answerText3, .answerText4 {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 500px;
  word-wrap: break-word;
  white-space: normal;
  text-align: center;
  font-size: 1.8rem;
  font-weight: normal;
  color: #222;
  pointer-events: none;
}

.answerText1 { top: 350px; left: 260px; }
.answerText2 { top: 350px; left: 1050px; }
.answerText3 { top: 640px; left: 260px; }
.answerText4 { top: 640px; left: 1050px; }

.gameplay-page {
    /* position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden; */
}
  
  .homeBG {
    position: absolute;
    max-width: 100vw;
    overflow-x: hidden;
    z-index: 0;
    left: 0;
    top: 22vh;
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
  