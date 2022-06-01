import type { optionType } from '@/components/AppSelect/index.vue'

export const categoryOptions: optionType[] = [
  {
    key: 1,
    label: 'Desktop Development',
    value: 'desktop_development'
  },
  {
    key: 2,
    label: 'Web Development',
    value: 'web_development'
  },
  {
    key: 3,
    label: 'Mobile Development',
    value: 'mobile_development'
  },
  {
    key: 4,
    label: 'Infrastructure',
    value: 'infrastructure'
  },
  {
    key: 5,
    label: 'Computer Networks',
    value: 'computer_networks'
  },
  {
    key: 6,
    label: 'Operational Systems',
    value: 'operational_systems'
  },
  {
    key: 7,
    label: 'Computer Architecture',
    value: 'computer_architecture'
  }
]

export function getJoinRoomCategory(value: string) {
  return categoryOptions.find(category => category.value === value)?.label ?? ''
}
