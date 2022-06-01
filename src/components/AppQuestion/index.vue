<script lang="ts" setup>
import AppAvatar from '../AppAvatar/index.vue'
export type Question = Record<string, QuestionData>

export type QuestionData = {
  author: {
    name: string
    photoURL: string
  }
  content: string
  createdAt: number
  isAnswered: boolean
  isHighlighted: boolean
  updatedAt: number
}

defineProps<QuestionData>()
</script>

<template>
  <div class="flex gap-2 cursor-pointer">
    <AppAvatar :url="author.photoURL" />
    <div class="flex-1 flex p-4 bg-white border-[1px] border-slate-200 rounded">
      {{ content }}
    </div>
  </div>
</template>
