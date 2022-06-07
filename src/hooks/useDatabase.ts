import {
  child,
  Database,
  DataSnapshot,
  get as _get,
  onChildAdded,
  push as _push,
  ref as _ref,
  runTransaction,
  TransactionResult,
  update as _update,
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
  transaction: (
    callback: (data: any) => unknown,
    path: string[]
  ) => Promise<TransactionResult>
  push: (value: any, path?: string[]) => ThenableReference
  added: (callback: (data: DataSnapshot) => void, path: string[]) => Unsubscribe
  update: (value: any, path?: string[]) => Promise<void>
}

export default function useDatabase(
  database: Database,
  document: string
): DatabaseHook {
  const rootReference = ref()

  function pathReference(path: string[] = []) {
    return path.length ? ref(join(path)) : rootReference
  }

  function ref(...path: string[]) {
    return _ref(database, join([document, ...path]))
  }

  function get(path: string[] = ['/']) {
    return _get(child(rootReference, join(path)))
  }

  function transaction(callback: (data: any) => unknown, path: string[] = []) {
    return runTransaction(pathReference(path), callback)
  }

  function push(value: any, path: string[] = []) {
    return _push(pathReference(path), value)
  }

  function added(callback: (data: DataSnapshot) => void, path: string[]) {
    return onChildAdded(pathReference(path), callback)
  }

  function update(value: any, path: string[] = []) {
    return _update(pathReference(path), value)
  }

  return {
    ref,
    get,
    transaction,
    push,
    added,
    update
  }
}
