<script lang="ts" setup>
import { PhChat, PhCheckCircle, PhThumbsUp, PhTrash } from 'phosphor-vue'
import { computed } from 'vue'
import AppAvatar from '../AppAvatar/index.vue'

export type Question = Record<string, QuestionData>
export type QuestionData = {
  author: {
    uid: string
    name: string
    photoURL: string
  }
  title: string
  content: string
  createdAt: number
  likes?: Record<string, boolean>
  likesCount: number
  isAnswered: boolean
  isHighlighted: boolean
  updatedAt: number
}

defineEmits<{
  (e: 'like'): void
  (e: 'go'): void
}>()
const props = defineProps<QuestionData>()

const likeWeight = computed(() =>
  props.likes && props.likes[props.author.uid] ? 'fill' : 'regular'
)
</script>

<template>
  <article
    class="flex flex-col gap-3 p-4 bg-white border-[1px] border-slate-200 rounded"
  >
    <header class="w-full">
      <a
        @click.prevent="$emit('go')"
        class="text-lg font-semibold text-brand-primary-500 hover:brightness-150 cursor-pointer"
      >
        {{ title }}
      </a>
    </header>
    <footer class="flex justify-between text-sm text-slate-500">
      <div class="flex items-center gap-2">
        <span>by</span>
        <AppAvatar size="small" :url="author.photoURL" />
        <strong class="font-semibold">{{ author.name }}</strong>
        <span>on</span>
        <time>{{ new Date(createdAt).toLocaleString() }}</time>
      </div>
      <div class="flex items-center gap-2 text-xl">
        <span>
          <PhCheckCircle class="text-brand-success-500" />
        </span>
        <span>
          <PhChat class="text-brand-primary-500" />
        </span>
        <span @click="$emit('like')">
          <PhThumbsUp :weight="likeWeight" class="text-brand-warn-500" />
        </span>
        <span>
          <PhTrash class="text-brand-danger-500" />
        </span>
      </div>
    </footer>
  </article>
</template>
