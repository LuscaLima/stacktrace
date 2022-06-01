<script lang="ts" setup>
type sizePropOptions = 'small' | 'medium'

withDefaults(
  defineProps<{
    url?: string | null
    size: sizePropOptions
  }>(),
  { size: 'medium' }
)
</script>

<template>
  <div
    class="rounded-full overflow-hidden"
    :class="[size === 'medium' ? 'w-10 h-10' : 'w-7 h-7']"
  >
    <img v-if="url" :src="url" alt="user avatar" />
  </div>
</template>
