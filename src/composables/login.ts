import { useAuth } from '@/hooks'
import type { User } from 'firebase/auth'

const auth = useAuth()

export async function login(callback: Function) {
  const userData = await auth.login()

  if (userData) {
    const { displayName: name, email, photoURL, uid } = userData

    callback({ name, email, photoURL, uid })
  }
}

export function refresh(callback: Function) {
  auth.refresh((userData: User) => {
    if (userData) {
      const { displayName: name, email, photoURL, uid } = userData

      callback({ name, email, photoURL, uid })
    }
  })
}
