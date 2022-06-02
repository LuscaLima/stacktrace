import { auth, GoogleAuthProvider, signInWithPopup } from '@/services/firebase'
import { onAuthStateChanged, type User } from 'firebase/auth'

const provider = new GoogleAuthProvider()

type AuthHook = {
  login: () => Promise<User>
  refresh: (callback: Function) => void
}

export default function useAuth(): AuthHook {
  async function login(): Promise<User> {
    const result = await signInWithPopup(auth, provider)

    return result.user
  }

  onAuthStateChanged

  function refresh(callback: Function) {
    const unsubscribe = onAuthStateChanged(auth, userData => {
      callback(userData)
    })

    unsubscribe()
  }

  return {
    login,
    refresh
  }
}
