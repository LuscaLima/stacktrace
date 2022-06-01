import { defineStore } from 'pinia'

type User = {
  name: string | null
  email: string | null
  photoURL: string | null
  uid: string | null
}

const useUserStore = defineStore({
  id: 'user',

  state: (): User => ({
    name: '',
    email: '',
    photoURL: '',
    uid: ''
  }),

  getters: {
    hasUser(): boolean {
      return Boolean(this.uid)
    }
  },

  actions: {
    setUserData({ name, email, photoURL, uid }: User) {
      this.name = name
      this.email = email
      this.photoURL = photoURL
      this.uid = uid
    }
  }
})

type userStore = typeof useUserStore

export { useUserStore, type User, type userStore }
