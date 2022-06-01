<script lang="ts" setup>
import AppAvatar from '../AppAvatar/index.vue'
export type Question = Record<string, QuestionData>

export type QuestionData = {
  author: {
    name: string
    photoURL: string
  }
  title: string
  content: string
  createdAt: number
  isAnswered: boolean
  isHighlighted: boolean
  updatedAt: number
}

defineProps<QuestionData>()
</script>

<template>
  <article
    class="flex flex-col gap-3 p-4 bg-white border-[1px] border-slate-200 rounded"
  >
    <header class="w-full">
      <router-link
        to="#"
        class="text-lg text-brand-primary-600 hover:text-brand-primary-400"
      >
        {{ title }}
      </router-link>
    </header>
    <footer class="flex items-center gap-2 text-sm text-slate-600">
      <span>by</span>
      <AppAvatar size="small" :url="author.photoURL" />
      <strong class="font-semibold">{{ author.name }}</strong>
      <span>on</span>
      <time pubdate>{{ new Date(createdAt).toLocaleString() }}</time>
    </footer>
  </article>
</template>
