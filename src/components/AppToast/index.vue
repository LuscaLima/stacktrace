<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, reactive } from 'vue'
import useToast, { type ToastPayload } from '@/hooks/useToast'
import ToastItem from './ToastItem.vue'

const toast = useToast()

const state = reactive<{
  queue: ToastPayload[]
}>({
  queue: []
})

const showToast = computed(() => !!state.queue.length)

function addToast(payload: ToastPayload) {
  state.queue.unshift(payload)
}

function removeToast(id: number) {
  state.queue = state.queue.filter(toast => toast.id !== id)
}

onMounted(() => {
  toast.listen(addToast)
})

onBeforeUnmount(() => {
  toast.off()
})
</script>

<template>
  <teleport to="body">
    <div
      v-if="showToast"
      class="absolute left-1/2 top-8 -translate-x-1/2 flex flex-col items-center gap-4 z-20"
    >
      <ToastItem
        v-for="toast in state.queue"
        :key="toast.id"
        v-bind="toast"
        @close="removeToast"
      />
    </div>
  </teleport>
</template>
