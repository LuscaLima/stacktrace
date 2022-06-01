import { useAuth } from '@/hooks'

const auth = useAuth()

export async function login(callback: Function) {
  const userData = await auth.login()

  if (userData) {
    const { displayName: name, email, photoURL, uid } = userData

    callback({ name, email, photoURL, uid })
  }
}
