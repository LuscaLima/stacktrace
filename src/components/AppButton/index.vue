<script lang="ts" setup>
import { computed, useSlots } from 'vue'
import { PhCircleNotch } from 'phosphor-vue'

type propTypeOptions = 'primary' | 'danger' | 'clear'

const slots = useSlots()
const props = withDefaults(
  defineProps<{
    type?: propTypeOptions
    loading?: boolean
    disabled?: boolean
    link?: boolean
  }>(),
  {
    type: 'primary',
    loading: false,
    disabled: false,
    link: false
  }
)

const typeClass = computed(() => `btn-${props.type}`)
const linkClass = computed(() => `btn-link-${props.type}`)
const isDisabled = computed(() => props.disabled || props.loading)
const hasLabel = computed(() => slots.default && slots.default()[0].children) // TODO: improve this
</script>

<template>
  <button
    class="btn"
    :class="[{ [typeClass]: !props.link, [linkClass]: props.link }]"
    :disabled="isDisabled"
  >
    <PhCircleNotch v-if="loading" class="text-2xl animate-spin" />
    <span v-else class="text-2xl leading-none">
      <slot name="icon" />
    </span>
    <span v-if="hasLabel">
      <slot />
    </span>
  </button>
</template>

<style>
.btn {
  @apply inline-flex justify-center items-center grow-0 gap-3 w-full px-3 py-2 uppercase text-gray-50 text-center rounded transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed;
}

.btn-primary {
  @apply bg-brand-primary-500 hover:bg-brand-primary-600 focus:bg-brand-primary-600 disabled:hover:bg-brand-primary-500;
}

.btn-danger {
  @apply bg-brand-danger-500 hover:bg-brand-danger-600 focus:bg-brand-danger-600 disabled:hover:bg-brand-danger-500;
}

.btn-clear {
  @apply bg-slate-400 hover:bg-slate-500 focus:bg-slate-500 disabled:hover:bg-slate-400;
}

.btn-link-danger {
  @apply bg-transparent text-brand-danger-500;
}
</style>
