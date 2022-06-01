<script lang="ts" setup>
import { computed } from 'vue'
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption
} from '@headlessui/vue'
import { PhCheck, PhCaretDown } from 'phosphor-vue'

export type optionType = {
  key: string | number
  label: string
  value?: string | number
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{
    label?: string
    modelValue: string
    options: optionType[]
    placeholder?: string
  }>(),
  { label: '', placeholder: 'Select' }
)
defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const selectedOption = computed<optionType>(
  () =>
    props.options.find(option => option.value === props.modelValue) ?? {
      key: 0,
      label: props.placeholder,
      disabled: true
    }
)
</script>

<template>
  <Listbox
    v-slot="{ open }"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div class="flex flex-col gap-2 w-full">
      <div v-if="label" class="text-slate-500">
        <ListboxLabel class="inline-block after:content-[':']">
          {{ label }}
        </ListboxLabel>
      </div>
      <div class="relative">
        <ListboxButton
          class="relative inline-flex w-full px-3 py-2 font-primary border-[1px] text-slate-700 border-slate-300 rounded bg-white outline-0 placeholder:text-slate-300 focus:border-brand-primary-500 focus-visible:border-brand-primary-500 transition-all duration-200"
        >
          <span
            class="block truncate"
            :class="{ 'text-slate-300': !selectedOption.value }"
          >
            {{ selectedOption?.label }}
          </span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <PhCaretDown
              class="h-5 w-5 text-gray-400 transition-all duration-200"
              :class="{ 'rotate-180': open }"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="option in options"
              :key="option?.key"
              :value="option.value"
              :disabled="option.disabled"
              as="template"
            >
              <li
                :class="[
                  active
                    ? 'bg-brand-info-200 text-brand-primary-600'
                    : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-10 pr-4'
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate'
                  ]"
                >
                  {{ option.label }}
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-brand-primary-600"
                >
                  <PhCheck class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </div>
  </Listbox>
</template>
