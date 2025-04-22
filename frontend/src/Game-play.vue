<script setup lang="ts">
import axios from 'axios'
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted} from 'vue'
import { useRouter } from 'vue-router'
import {supabase} from '@/supabase'
import {read} from "node:fs";

const questions = ref<any[]>([])

const currentIndex = ref(0)

const currentQuestion = ref<any | null>(null)

const quizStartTime = ref<number | null>(null)

const shuffledAnswers = ref<{ text: string; isCorrect: boolean }[]>([]);

const router = useRouter()

const currentScore = ref(0)

const questionStartTime = ref(0)

const timeTaken = ref(0)
const timerInterval = ref(null)

const showAuthMessage = ref(false)
const isLoggedIn = ref(false)


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

const submitScore = async () => {
  const UserID = localStorage.getItem('user_id')
  const Username = localStorage.getItem('username')
  const Score = currentScore.value
  const totalTimeMs = Date.now() - (quizStartTime.value || Date.now())
  const totalTimeSec = Math.floor(totalTimeMs/1000)
  const readableTime = `${Math.floor(totalTimeSec / 60)}m ${totalTimeSec % 60}s`

  if (!Username) {
    alert ("You're not logged in.")
    return
  }

  const { data: existing, error: fetchError } = await supabase
      .from('Leaderboard')
      .select('*')
      .eq('Username', Username)
      .maybeSingle()

  if (fetchError){
    console.error("Error checking leaderboard:", fetchError.message)
    alert("Error checking leaderboard")
    return
  }

  if (existing){
    const { error: updateError } = await supabase
        .from('Leaderboard')
        .update({Score, Time: readableTime })
        .eq('Username', Username)

    if (updateError) {
      console.error("Failed to update score:", updateError.message)
      alert("Failed to update score.")
    } else{
      console.log("score updated!")
      alert("Score updated successfully")
    }
  } else {
    const {error: insertError } = await supabase
        .from('Leaderboard')
        .insert([{UserID, Username, Score, Time: readableTime }])

    if (insertError){
      console.error("Failed to insert score:", insertError.message)
      alert("Failed to submit score.")
    } else{
      console.log("Score inserted!")
      alert("Score submitted successfully!")
    }
  }
}

const loadNextQuestion = () => {
  if (currentIndex.value >= questions.value.length){
    alert("You're done! All questions answered.")
    return
  }

  timeTaken.value = 0
  questionStartTime.value = Date.now()
  if (timerInterval.value) clearInterval(timerInterval.value)

  timerInterval.value = setInterval(() => {
    timeTaken.value = Math.floor((Date.now() - questionStartTime.value) / 1000)
  }, 1000)

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
  if (timerInterval.value) clearInterval(timerInterval.value)

  const seconds = timeTaken.value
  const maxPoints = 100
  const decayRate = 0.1
  const pointsEarned = Math.max(0, Math.floor(maxPoints * Math.exp(-decayRate * seconds)))

  if (answer.isCorrect){
    currentScore.value += pointsEarned
    alert(`Correct! You earned ${pointsEarned} points.`)
  } else{
    alert("Wrong")
  }

  currentIndex.value++
  loadNextQuestion()
}

const logout = () => {
  localStorage.removeItem('user_id')
  localStorage.removeItem('username')
  isLoggedIn.value = false
  router.push('/login')
}
onMounted(() => {
  const userID = localStorage.getItem('user_id')
  if (!userID){
    showAuthMessage.value = true
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } else {
    isLoggedIn.value = true
    quizStartTime.value = Date.now()
    fetchQuestions()
  }
})
</script>

<template>
    <div class="gameplay-page">
      <div v-if="showAuthMessage" class="auth-warning">
        🚫 You must be logged in to play. Redirecting to login...
      </div>

      <img class="homeBG" src="./assets/home-bg.png" />
      <router-link :to="{ path: '/' }">
      <img class="home-btn" src="./assets/logo.png" />
      </router-link>
      <img
        v-if="isLoggedIn"
        @click="logout"
        class="logout-image"
        src="./assets/logout-btn.png"
        alt="Logout"
        />
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
      <div v-if="isLoggedIn && currentQuestion">
        <div v-if="shuffledAnswers.length">
          <div class="hud">
            <div class="score">Score: {{ currentScore }}</div>
            <div class="timer">Time: {{ timeTaken }}s</div>
          </div>

          <div class="submitScore-wrapper" @click="submitScore">
            <img src="./assets/submit-btn.png" class="submitScore-img" />
          </div>

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
      </div>
      <router-link :to="{ path: '/register' }">
      <img class="profileButton" src="./assets/profile-btn.png" />
    </router-link>
    </div>
  </template>
  
  
<style scoped>

.hud {
  position: fixed; /* force to viewport, not parent */
  top: 0;
  left: 0;
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px 20px;
  z-index: 9999; /* above EVERYTHING */
  box-sizing: border-box;
}

.score,
.timer {
  flex: 1;
  text-align: center;
}

.auth-warning {
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ffdede;
  border: 2px solid red;
  color: #a10000;
  font-weight: bold;
  padding: 1rem 2rem;
  border-radius: 8px;
  z-index: 9999;
  text-align: center;
}

.logout-image {
  position: fixed;
  top: 200px;
  right: -10px;
  width: 275px;
  cursor: pointer;
  z-index: 9999;
}
.questionText {
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 600px;
  text-align: center;
  font-family: bubblyFont,sans-serif;
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
  font-family: bubblyFont,sans-serif;
  font-size: 1.8rem;
  font-weight: normal;
  color: #222;
  pointer-events: none;
}

.answerText1 { top: 340px; left: 300px; }
.answerText2 { top: 340px; left: 1130px; }
.answerText3 { top: 625px; left: 300px; }
.answerText4 { top: 625px; left: 1130px; }

.gameplay-page {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;

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

.logout-image:hover{
  transform: scale(1.1);
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

  .submitScore-wrapper {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    cursor: pointer;
  }

  .submitScore-img {
    width: 200px;      /* Adjust size as needed */
    height: auto;
    transition: transform 0.2s;
  }

  .submitScore-wrapper:hover .submitScore-img {
    transform: scale(1.2);
  }
}
  </style>
  