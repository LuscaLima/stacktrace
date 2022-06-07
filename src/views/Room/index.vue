<script lang="ts" setup>
import { computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { database } from '@/services/firebase'
import { useDatabase, useModal, useToast } from '@/hooks'
import { useUserStore } from '@/stores/user'
import {
  PhList,
  PhPaperPlaneTilt,
  PhPencilSimpleLine,
  PhQuestion,
  PhX,
  PhXCircle
} from 'phosphor-vue'
import { getJoinRoomCategory } from '@/composables/categories'
import { login } from '@/composables/login'
import AppCopyPaste from '@/components/AppCopyPaste/index.vue'
import AppFormModel from '@/components/AppFormModel/index.vue'
import AppInput from '@/components/AppInput/index.vue'
import AppInputText from '@/components/AppInputText/index.vue'
import AppButton from '@/components/AppButton/index.vue'
import AppTag from '@/components/AppTag/index.vue'
import AppAlert from '@/components/AppAlert/index.vue'
import AppQuestion, { type Question } from '@/components/AppQuestion/index.vue'
import router from '@/router'

type Room = {
  authorId: string
  name: string
  category: string
  description: string
  isInactive?: boolean
}

const route = useRoute()
const room = useDatabase(database, `rooms/${route.params.id}`)
const questions = useDatabase(database, 'questions')
const user = useUserStore()
const modal = useModal()
const toast = useToast()
const state = reactive({
  room: {} as Room,
  questions: {} as Question,
  isAsking: false,
  question: {
    title: '',
    content: ''
  }
})

const urlRoomCode = computed(() => `${location.host}/room/${route.params.id}`)
const isSendDisabled = computed(
  () => !state.question.title || !state.question.content
)
const quantityOfQuestions = computed(() => Object.keys(state.questions).length)
const hasQuestions = computed(() => !!quantityOfQuestions.value)
const hasCloseRoomButton = computed(
  () => state.room.authorId === user.uid && !state.room.isInactive
)

function handleCopyUrlRoomCode() {
  toast.dispatch({ type: 'success', message: 'code copied successfully' })
}

function handleCloseRoom() {
  modal.open({
    type: 'warn',
    title: 'Close room',
    content:
      'Do you really want to close this room? This action cannot be undone',
    okHandler: () => {
      room.update({ isInactive: true }).then(() => {
        modal.close()
        state.room.isInactive = true
      })
    }
  })
}

function handleToggleAsking() {
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
      uid: user.uid,
      name: user.name,
      photoURL: user.photoURL
    },
    title: state.question.title,
    content: state.question.content,
    likes: {},
    likesCount: 0,
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

function handleQuestionClick(questionId: string) {
  router.push({
    name: 'question',
    params: {
      roomId: route.params.id,
      questionId
    }
  })
}

async function handleQuestionLike(questionId: string) {
  if (!user.hasUser) {
    await login(user.setUserData)
  }

  const userId = user.uid as string

  questions
    .transaction(
      question => {
        if (question) {
          if (question.likes && question.likes[userId]) {
            question.likesCount--
            question.likes[userId] = null
          } else {
            question.likesCount++

            if (!question.likes) {
              question.likes = {}
            }

            question.likes[userId] = true
          }
        }

        return question
      },
      [String(route.params.id), questionId]
    )
    .then(question => {
      state.questions[questionId] = question.snapshot.val()
    })
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
  <header class="flex items-start flex-wrap py-8 text-slate-700">
    <div class="flex-1">
      <div class="flex justify-between w-full mb-4">
        <h1 class="font-primary text-4xl font-bold">{{ state.room.name }}</h1>
      </div>
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
    <div class="flex flex-col gap-2">
      <AppCopyPaste
        :copy-text="urlRoomCode"
        :alias="String(route.params.id)"
        @copy="handleCopyUrlRoomCode"
      />
      <AppButton
        v-if="hasCloseRoomButton"
        type="danger"
        @click="handleCloseRoom"
      >
        <template #icon>
          <PhXCircle />
        </template>
        close room
      </AppButton>
    </div>
  </header>
  <template v-if="!state.room.isInactive">
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
          <AppButton type="clear" @click="handleToggleAsking">
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
        <AppButton @click="handleToggleAsking">
          <template #icon>
            <PhPencilSimpleLine />
          </template>
          ask a question
        </AppButton>
      </div>
    </div>
  </template>
  <template v-else>
    <AppAlert title="This room is closed">
      This room was closed by its creator. Therefore, it is no longer possible
      to register questions here.
    </AppAlert>
  </template>
  <div class="flex">
    <div v-if="!hasQuestions" class="flex-1 flex flex-col items-center py-8">
      <img
        src="@/assets/img/not_found.svg"
        alt="no questions yet"
        class="w-72"
      />
      <p class="mt-4 font-primary text-xl text-slate-600 text-center">
        hmm, looks like there's nothing here...
        <span v-if="!state.room.isInactive">
          Be the first to submit a question
        </span>
      </p>
    </div>
    <div v-else class="flex-1 flex flex-col gap-4 py-4">
      <div class="flex gap-2 items-center my-2 text-base uppercase">
        <PhList />
        <h3 class="text-slate-700">questions in this room</h3>
      </div>
      <AppQuestion
        v-for="(question, id) in state.questions"
        :key="id"
        v-bind="question"
        @go="() => handleQuestionClick(id)"
        @like="() => handleQuestionLike(id)"
      />
    </div>
  </div>
</template>
