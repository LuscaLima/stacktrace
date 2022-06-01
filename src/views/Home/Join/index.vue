<script lang="ts" setup>
import { computed, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { database } from '@/services/firebase'
import { PhCircleNotch, PhPlus, PhSignIn } from 'phosphor-vue'
import { useDebounceFn } from '@vueuse/core'
import { useDatabase } from '@/hooks'
import AppButton from '@/components/AppButton/index.vue'
import AppInput from '@/components/AppInput/index.vue'
import AppSelect from '@/components/AppSelect/index.vue'
import JoinRoom, { type Room } from './JoinRoom.vue'
import { categoryOptions, getJoinRoomCategory } from '@/composables/categories'
import { login } from '@/composables/login'

type roomsType = { [key: string]: Room }

const DEBOUNCE_WAITING_TIME = 500 // 0.5 second
const router = useRouter()
const user = useUserStore()
const rooms = useDatabase(database, 'rooms')
const debounceFilter = useDebounceFn(debounceFilterFn, DEBOUNCE_WAITING_TIME)
const state = reactive({
  rooms: {} as roomsType,
  isRoomsLoading: false,
  selectedRoomCode: '',
  filterRoomName: '',
  filterRoomCategory: 'all'
})

const filteredRooms = computed(() => {
  const rooms: roomsType = {}

  for (const key in state.rooms) {
    if (
      matchRoomName(state.rooms[key].name) &&
      matchRoomCategory(state.rooms[key].category)
    ) {
      rooms[key] = state.rooms[key]
    }
  }

  return rooms
})
const hasFilteredRooms = computed(
  () => !!Object.keys(filteredRooms.value).length
)

function debounceFilterFn(roomName: string) {
  state.filterRoomName = roomName
}

function handleSelectRoom(code: string) {
  state.selectedRoomCode = code
}

function matchRoomName(name: string) {
  return name.toLowerCase().includes(state.filterRoomName.toLowerCase().trim())
}

function matchRoomCategory(category: string) {
  return (
    state.filterRoomCategory === 'all' || category === state.filterRoomCategory
  )
}

function handleJoinRoom() {
  if (!state.selectedRoomCode) {
    return
  }

  router.push({ name: 'room', params: { id: state.selectedRoomCode } })
}

async function handleCreateRoom() {
  if (!user.hasUser) {
    await login(user.setUserData)
  }

  router.push({ name: 'homeCreate' })
}

onMounted(() => {
  state.isRoomsLoading = true

  rooms
    .get()
    .then(rooms => {
      if (rooms.exists()) {
        state.rooms = rooms.val()
      }
    })
    .finally(() => {
      state.isRoomsLoading = false
    })
})
</script>

<template>
  <header class="flex">
    <div class="flex-1 flex items-center">
      <AppInput
        placeholder="search room by name"
        :model-value="state.filterRoomName"
        @update:model-value="debounceFilter"
      />
    </div>
    <div class="flex-1 flex justify-center items-center">
      <span
        class="font-primary text-brand-info-500 text-lg uppercase font-bold"
      >
        open rooms
      </span>
    </div>
    <div class="flex-1 flex items-center">
      <AppSelect
        v-model="state.filterRoomCategory"
        placeholder="select category"
        :options="[
          { key: '0', label: 'All categories', value: 'all' },
          ...categoryOptions
        ]"
      />
    </div>
  </header>
  <div
    v-if="state.isRoomsLoading"
    class="flex-1 flex justify-center items-center w-full text-brand-info-500 text-4xl"
  >
    <PhCircleNotch class="animate-spin" />
  </div>
  <template v-else>
    <div
      v-if="hasFilteredRooms"
      class="flex-1 flex flex-wrap gap-y-2 -mx-1 py-8"
    >
      <div class="w-1/3 px-1" v-for="(room, code) in filteredRooms">
        <JoinRoom
          :code="String(code)"
          :name="room.name"
          :category="getJoinRoomCategory(room.category)"
          :description="room.description"
          :is-selected="String(code) === state.selectedRoomCode"
          @click="() => handleSelectRoom(String(code))"
        />
      </div>
    </div>
    <div v-else class="flex-1 flex flex-col justify-center items-center">
      <img src="@/assets/img/no_data.svg" alt="no rooms found" class="w-32" />
      <p class="mt-4 font-primary text-xl text-slate-600">
        sorry, no rooms found
      </p>
    </div>
    <footer class="flex justify-end items-center gap-4">
      <div>
        <AppButton type="clear" @click="handleCreateRoom">
          <template #icon>
            <PhPlus />
          </template>
          create room
        </AppButton>
      </div>
      <div>
        <AppButton :disabled="!state.selectedRoomCode" @click="handleJoinRoom">
          <template #icon>
            <PhSignIn />
          </template>
          join the room
        </AppButton>
      </div>
    </footer>
  </template>
</template>
