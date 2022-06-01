<script lang="ts" setup>
withDefaults(
  defineProps<{
    filedsPlacement?: 'horizontal' | 'vertical'
  }>(),
  {
    filedsPlacement: 'horizontal'
  }
)
</script>

<template>
  <form class="flex-1 flex flex-col gap-4">
    <div
      class="flex-1 flex gap-4"
      :class="{ 'flex-col': filedsPlacement === 'vertical' }"
    >
      <slot />
    </div>
    <footer class="flex justify-end">
      <div class="flex gap-4">
        <slot name="footer" />
      </div>
    </footer>
  </form>
</template>
