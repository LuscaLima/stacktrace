import {
  child,
  Database,
  DataSnapshot,
  get as _get,
  onChildAdded,
  push as _push,
  ref as _ref,
  type DatabaseReference,
  type ThenableReference,
  type Unsubscribe
} from 'firebase/database'

function join(path: string[]) {
  return path.join('/')
}

type DatabaseHook = {
  ref: (path: string) => DatabaseReference
  get: (path?: string[]) => Promise<DataSnapshot>
  push: (value: any, path?: string[]) => ThenableReference
  added: (callback: (data: DataSnapshot) => void, path: string[]) => Unsubscribe
}

export default function useDatabase(
  database: Database,
  document: string
): DatabaseHook {
  const rootReference = ref()

  function ref(...path: string[]) {
    return _ref(database, join([document, ...path]))
  }

  function get(path?: string[]) {
    return _get(child(rootReference, join(path ?? ['/'])))
  }

  function push(value: any, path: string[] = []) {
    const reference = path.length ? ref(join(path)) : rootReference
    return _push(reference, value)
  }

  function added(callback: (data: DataSnapshot) => void, path: string[]) {
    const reference = path.length ? ref(join(path)) : rootReference
    return onChildAdded(reference, callback)
  }

  return {
    ref,
    get,
    push,
    added
  }
}
