<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { refresh } from '@/composables/login'
import AppContainer from '@/components/AppContainer/index.vue'
import AppAvatar from '@/components/AppAvatar/index.vue'
import AppModal from '@/components/AppModal/index.vue'

const user = useUserStore()

onMounted(() => {
  refresh(user.setUserData)
})
</script>

<template>
  <AppModal />
  <div class="w-full min-h-screen bg-slate-50">
    <header
      class="flex justify-between items-center px-16 h-14 border-b-[1px] border-slate-300"
    >
      <div class="w-48">
        <router-link :to="{ name: 'home' }">
          <img src="@/assets/img/logo.svg" alt="StackTrace logo" />
        </router-link>
      </div>
      <div class="flex w-fit">
        <div v-if="user.hasUser" class="flex items-center gap-4">
          <h2 class="font-primary font-medium">
            {{ user.name }}
          </h2>
          <AppAvatar :url="user.photoURL" />
        </div>
      </div>
    </header>
    <AppContainer>
      <router-view />
    </AppContainer>
  </div>
</template>
