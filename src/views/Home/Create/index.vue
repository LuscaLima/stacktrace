<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { database } from '@/services/firebase'
import { useDatabase } from '@/hooks'
import { PhCaretLeft, PhCheck } from 'phosphor-vue'
import AppFormModel from '@/components/AppFormModel/index.vue'
import AppInput from '@/components/AppInput/index.vue'
import AppButton from '@/components/AppButton/index.vue'
import AppInputText from '@/components/AppInputText/index.vue'
import AppSelect from '@/components/AppSelect/index.vue'
import { categoryOptions } from '@/composables/categories'

const user = useUserStore()
const rooms = useDatabase(database, 'rooms')
const router = useRouter()
const state = reactive({
  room: {
    name: '',
    category: '',
    description: ''
  },
  isCreatingRoom: false
})

function handleGoBack() {
  router.push({ name: 'homeJoin' })
}

function handleCreateRoom() {
  if (!state.room.name || !state.room.category) {
    return
  }

  state.isCreatingRoom = true

  rooms
    .push({
      authorId: user.uid,
      ...state.room
    })
    .then(room => {
      router.push({ name: 'room', params: { id: room.key } })
    })
    .finally(() => {
      state.isCreatingRoom = false
    })
}
</script>

<template>
  <header class="flex">
    <div class="flex-1 flex justify-start items-center">
      <div>
        <AppButton link type="danger" @click="handleGoBack">
          <template #icon>
            <PhCaretLeft />
          </template>
        </AppButton>
      </div>
    </div>
    <div class="flex-1 flex justify-center items-center">
      <span
        class="font-primary text-brand-info-500 text-lg uppercase font-bold"
      >
        create room
      </span>
    </div>
    <div class="flex-1 flex items-center"></div>
  </header>
  <div class="flex-1 flex pt-8" @submit.prevent="handleCreateRoom">
    <AppFormModel fileds-placement="vertical">
      <div class="flex gap-4">
        <AppInput label="name" v-model="state.room.name" />
        <AppSelect
          :options="categoryOptions"
          label="category"
          v-model="state.room.category"
        />
      </div>
      <AppInputText
        v-model="state.room.description"
        label="description"
        height="8rem"
      />
      <template #footer>
        <AppButton type="primary" :loading="state.isCreatingRoom">
          <template #icon>
            <PhCheck />
          </template>
          create
        </AppButton>
      </template>
    </AppFormModel>
  </div>
</template>
