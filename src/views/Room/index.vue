<script lang="ts" setup>
import { computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { database } from '@/services/firebase'
import { useDatabase } from '@/hooks'
import { useUserStore } from '@/stores/user'
import {
  PhList,
  PhPaperPlaneTilt,
  PhPencilSimpleLine,
  PhQuestion,
  PhX
} from 'phosphor-vue'
import { getJoinRoomCategory } from '@/composables/categories'
import { login } from '@/composables/login'
import AppCopyPaste from '@/components/AppCopyPaste/index.vue'
import AppFormModel from '@/components/AppFormModel/index.vue'
import AppInput from '@/components/AppInput/index.vue'
import AppInputText from '@/components/AppInputText/index.vue'
import AppButton from '@/components/AppButton/index.vue'
import AppTag from '@/components/AppTag/index.vue'
import AppQuestion, { type Question } from '@/components/AppQuestion/index.vue'

type Room = {
  authorId: string
  name: string
  category: string
  description: string
}

const route = useRoute()
const room = useDatabase(database, `rooms/${route.params.id}`)
const questions = useDatabase(database, 'questions')
const user = useUserStore()
const state = reactive({
  room: {} as Room,
  questions: {} as Question,
  isAsking: false,
  question: {
    title: '',
    content: ''
  }
})

const isSendDisabled = computed(
  () => !state.question.title || !state.question.content
)
const quantityOfQuestions = computed(() => Object.keys(state.questions).length)
const hasQuestions = computed(() => !!quantityOfQuestions.value)

function toggleAsking() {
  resetQuestion()
  state.isAsking = !state.isAsking
}

async function handleSend() {
  if (!state.question.content) {
    return
  }

  if (!user.hasUser) {
    await login(user.setUserData)
  }

  const newQuestion = {
    author: {
      name: user.name,
      photoURL: user.photoURL
    },
    title: state.question.title,
    content: state.question.content,
    isHighlighted: false,
    isAnswered: false,
    createdAt: Date.now(),
    updatedAt: Date.now()
  }

  questions.push(newQuestion, [String(route.params.id)]).then(() => {
    resetQuestion()
  })
}

function resetQuestion() {
  state.question.title = ''
  state.question.content = ''
}

function getRoomInfos() {
  room.get().then(roomData => {
    if (roomData.exists()) {
      state.room = roomData.val()
    }
  })
}

function getRoomQuestions() {
  questions.added(
    data => {
      if (data.key) {
        state.questions = {
          [data.key]: data.val(),
          ...state.questions
        }
      }
    },
    [String(route.params.id)]
  )
}

onMounted(() => {
  getRoomInfos()
  getRoomQuestions()
})
</script>

<template>
  <header class="flex items-center flex-wrap py-8 text-slate-700">
    <div class="flex justify-between w-full mb-4">
      <h1 class="font-primary text-4xl font-bold">{{ state.room.name }}</h1>
      <AppCopyPaste text="some" />
    </div>
    <div>
      <div class="flex gap-2">
        <AppTag>{{ getJoinRoomCategory(state.room.category) }}</AppTag>
        <AppTag type="clear">
          <template #icon>
            <PhQuestion />
          </template>
          {{ quantityOfQuestions }} questions
        </AppTag>
      </div>
      <p class="text-lg">{{ state.room.description }}</p>
    </div>
  </header>
  <div
    v-if="state.isAsking"
    class="flex p-4 border-2 border-brand-primary-500 bg-white rounded"
  >
    <AppFormModel fileds-placement="vertical" @submit.prevent="handleSend">
      <AppInput
        v-model="state.question.title"
        label="title"
        placeholder="be clear and concise"
      />
      <AppInputText
        v-model="state.question.content"
        label="content"
        placeholder="what do you want to ask?"
        height="8rem"
      />
      <template #footer>
        <AppButton type="clear" @click="toggleAsking">
          <template #icon>
            <PhX />
          </template>
          close
        </AppButton>
        <AppButton :disabled="isSendDisabled">
          <template #icon>
            <PhPaperPlaneTilt />
          </template>
          send
        </AppButton>
      </template>
    </AppFormModel>
  </div>
  <div v-else class="flex justify-end">
    <div>
      <AppButton @click="toggleAsking">
        <template #icon>
          <PhPencilSimpleLine />
        </template>
        ask a question
      </AppButton>
    </div>
  </div>
  <div class="flex">
    <div v-if="!hasQuestions" class="flex-1 flex flex-col items-center py-8">
      <img
        src="@/assets/img/not_found.svg"
        alt="no questions yet"
        class="w-72"
      />
      <p class="mt-4 font-primary text-xl text-slate-600 text-center">
        hmm, looks like there's nothing here... Be the first to submit a
        question
      </p>
    </div>
    <div v-else class="flex-1 flex flex-col gap-4 py-4">
      <div class="flex gap-2 items-center my-2 text-base uppercase">
        <PhList />
        <h3 class="text-slate-700">questions in this room</h3>
      </div>
      <AppQuestion v-for="question in state.questions" v-bind="question" />
    </div>
  </div>
</template>
