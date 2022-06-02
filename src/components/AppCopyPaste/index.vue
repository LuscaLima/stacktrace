<script lang="ts" setup>
import { useClipboard } from '@vueuse/core'
import { PhCopy } from 'phosphor-vue'

const props = defineProps<{ text: string }>()

const { copy } = useClipboard({ source: props.text })
</script>

<template>
  <div
    class="inline-flex justify-between items-center w-fit px-3 py-2 border-[1px] border-slate-300 rounded bg-white"
  >
    <strong class="font-semibold mr-2">
      {{ text }}
    </strong>
    <div
      class="flex justify-center items-center ml-2 text-slate-600 text-2xl cursor-pointer"
      @click="() => copy()"
    >
      <PhCopy />
    </div>
  </div>
</template>
