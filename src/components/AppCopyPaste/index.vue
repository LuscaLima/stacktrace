<script lang="ts" setup>
import { useClipboard } from '@vueuse/core'
import { PhCopy } from 'phosphor-vue'

const emits = defineEmits<{ (e: 'copy'): void }>()
const props = defineProps<{
  copyText: string
  alias?: string
}>()

const { copy } = useClipboard({ source: props.copyText })

function handleCopy() {
  copy()
  emits('copy')
}
</script>

<template>
  <div
    class="inline-flex justify-between items-center w-fit px-3 py-2 border-[1px] border-slate-300 rounded bg-white"
  >
    <strong class="font-semibold mr-2 text-slate-700">
      {{ alias || copyText }}
    </strong>
    <button
      class="flex justify-center items-center ml-2 text-slate-500 text-2xl cursor-pointer"
      @click="handleCopy"
    >
      <PhCopy />
    </button>
  </div>
</template>
