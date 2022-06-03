<script lang="ts" setup>
import { computed, onMounted } from 'vue'
// import type { ToastPayload } from '@/hooks/useToast'
import { PhCheckCircle, PhX } from 'phosphor-vue'

const emits = defineEmits<{ (e: 'close', id: number): void }>()
const props = withDefaults(
  defineProps<{
    id: number
    type?: string
    message: string
  }>(),
  {
    type: 'default'
  }
)

const hasIcon = computed(() => props.type !== 'default')

onMounted(() => {
  const LIMIT_CLOSE_TIME = 3000 // 3s

  setTimeout(() => {
    emits('close', props.id)
  }, LIMIT_CLOSE_TIME)
})
</script>

<template>
  <div
    class="flex justify-center gap-4 w-fit px-4 py-2 text-slate-700 bg-white rounded shadow-xl"
  >
    <div
      v-if="hasIcon"
      class="flex justify-center items-start text-2xl text-brand-success-500"
    >
      <PhCheckCircle />
    </div>
    <div class="flex-1">
      {{ message }}
    </div>
    <button
      class="flex justify-center items-center text-md text-slate-300 leading-none hover:text-slate-500"
      @click="() => $emit('close', id)"
    >
      <PhX />
    </button>
  </div>
</template>
