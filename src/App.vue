<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import AppContainer from './components/AppContainer/index.vue'
import AppAvatar from './components/AppAvatar/index.vue'

const user = useUserStore()
</script>

<template>
  <div class="w-full min-h-screen bg-slate-50">
    <header
      class="flex justify-between items-center px-16 h-14 border-b-[1px] border-slate-300"
    >
      <div>
        <h1 class="font-primary">StackTrace</h1>
      </div>
      <div class="flex w-fit">
        <div v-if="user.hasUser" class="flex items-center gap-4">
          <h2 class="font-primary">{{ user.name }}</h2>
          <AppAvatar :url="user.photoURL" />
        </div>
      </div>
    </header>
    <AppContainer>
      <router-view />
    </AppContainer>
  </div>
</template>
