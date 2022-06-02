<script lang="ts" setup>
import { PhWarning } from 'phosphor-vue'

defineProps<{ title?: string }>()
</script>

<template>
  <div
    class="flex gap-4 p-4 rounded text-white bg-brand-warn-500 bg-opacity-80"
  >
    <div class="flex justify-center items-start text-2xl">
      <PhWarning />
    </div>
    <div class="flex-1 flex flex-col">
      <header v-if="title" class="w-full leading-none">
        <strong class="font-semibold">
          {{ title }}
        </strong>
      </header>
      <div class="flex">
        <p class="">
          <slot />
        </p>
      </div>
    </div>
  </div>
</template>
