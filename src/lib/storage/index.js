import LocalStorage from './local-store'

export const hasEnv3 = async () => {
  const local = new LocalStorage()
  const ret = await local.get()

  return Boolean(ret.data.env3)
}

export const getData = async () => {
  const local = new LocalStorage()
  const ret = await local.get()
  return ret
}

