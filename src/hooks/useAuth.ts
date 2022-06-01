import { auth, GoogleAuthProvider, signInWithPopup } from '@/services/firebase'
import type { User } from 'firebase/auth'

const provider = new GoogleAuthProvider()

type AuthHook = {
  login: () => Promise<User>
}

export default function useAuth(): AuthHook {
  function login(): Promise<User> {
    return new Promise(async (resolve, reject) => {
      const result = await signInWithPopup(auth, provider)

      if (result.user) {
        resolve(result.user)
      }

      reject()
    })
  }

  return {
    login
  }
}
