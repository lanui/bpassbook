import AppContextController from '@/corejs/controllers/AppContextController'

import LocalStore from '@/lib/storage/local-store'
import { version } from '@/manifest.json'

async function initCtx(){
  const localStorage = new LocalStore()
  let initState = await localStorage.get() || {}
  recordFirstTimeInfo(initState)

  return new AppContextController({ initState })

  function recordFirstTimeInfo(initState) {
    if (!('firstTimeInfo' in initState)) {
      initState.firstTimeInfo = {
        version,
        date: Date.now(),
      }
    }
  }
}

export default initCtx
