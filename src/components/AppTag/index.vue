<script lang="ts" setup>
import { PhTagSimple } from 'phosphor-vue'
import { computed } from 'vue'

type propTypeOptions = 'info' | 'clear'

const props = withDefaults(
  defineProps<{
    type?: propTypeOptions
  }>(),
  { type: 'info' }
)

const typeClass = computed(() => `tag-${props.type}`)
</script>

<template>
  <span class="tag" :class="{ [typeClass]: true }">
    <slot name="icon">
      <PhTagSimple />
    </slot>
    <slot />
  </span>
</template>

<style>
.tag {
  @apply flex items-center gap-2 mb-2 px-3 py-0.5 w-fit text-base text-white rounded;
}

.tag-info {
  @apply bg-brand-info-500;
}

.tag-clear {
  @apply bg-slate-400;
}
</style>
