<script lang="ts" setup>
import { computed } from 'vue'
import { PhTagSimple } from 'phosphor-vue'

export type Room = {
  name: string
  category: string
  description: string
}

const props = withDefaults(
  defineProps<{
    code: string
    name: string
    category: string
    description: string
    isSelected?: boolean
  }>(),
  { isSelected: false }
)

const formatedCode = computed(() => props.code.replace('-', '#'))
</script>

<template>
  <div
    class="flex-1 p-4 rounded border-2 border-white bg-white cursor-pointer transition-all duration-200"
    :class="{
      'border-brand-primary-500 ': isSelected,
      'hover:border-brand-danger-500': !isSelected
    }"
  >
    <header class="flex flex-wrap">
      <div class="flex justify-between w-full">
        <div class="overflow-hidden whitespace-nowrap text-ellipsis">
          <strong class="font-primary font-normal">{{ name }}</strong>
        </div>
        <span
          class="inline-block px-2 py-1 text-xs border-[1px] border-brand-info-300 bg-brand-info-200 rounded-sm"
        >
          {{ formatedCode }}
        </span>
      </div>
      <span class="inline-flex items-center gap-2 my-1 text-sm">
        <PhTagSimple /> {{ category }}
      </span>
    </header>
    <div class="w-full mt-1">
      <p class="font-secondary text-sm text-slate-500">
        {{ description }}
      </p>
    </div>
  </div>
</template>
