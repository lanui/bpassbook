import log from 'loglevel'

import storeTransform from 'obs-store/lib/transform'
import asStream from 'obs-store/lib/asStream'
import debounce from 'debounce-stream'
import endOfStream from 'end-of-stream'
import PortStream from 'extension-port-stream'

import extension from '@/lib/extensionizer'
import LocalStore from '@/lib/storage/local-store'
import ContextController from '@/corejs/context-controller'
import createStreamSink from '@/lib/storage/createStreamSink'

import {
  ENVIRONMENT_TYPE_POPUP,
  ENVIRONMENT_TYPE_APP,
  ENVIRONMENT_TYPE_BACKGROUND,
  APITYPE_INIT_STATE,
  APITYPE_UPDATE_UNLOCKED,
  APITYPE_PWD_INCORRECT,
  APITYPE_LOGIN_PASS,
  APITYPE_REDIRECT_APP,
  APITYPE_LOGOUT,
} from './corejs/enums'
import pump from 'pump'

global.browser = require('webextension-polyfill');

global.extension = extension

global.$local = new LocalStore()

// alert(`Hello ${store.getters.foo}!`);
/** global variables */
let popupIsOpen = false

let versionedData

const openTabsIDs ={}

const clientOpenStatus = () =>{
  return Boolean(popupIsOpen) || Boolean(Object.keys(openTabsIDs).length)
}

const extensionInternalProcessHash = {
  [ENVIRONMENT_TYPE_POPUP]:true,
  [ENVIRONMENT_TYPE_APP]:true,
  [ENVIRONMENT_TYPE_BACKGROUND]:true
}

initialize().catch(log.error)



async function initialize() {
  const initState = await loadStateFromPersistence()
  console.log(">initState>>>", initState)
  setupController(initState ||{ })
}

async function setupController(initState) {
  const controller = new ContextController({
    initState
  })
  global.ctx = controller

  pump(
    asStream(controller.store),
    debounce(1000),
    storeTransform(versionifyData),
    createStreamSink(persistData),
    (err) => {
      log.error('Save persist data error',err)
    }
  )

  function versionifyData(state) {
    versionedData.data = state

    return versionedData
  }

  async function persistData(state) {
    console.log("persistData",state)
    if(!state){
      throw new Error('state is missing')
    }

    if(!state.data){
      throw new Error('data is missing')
    }

    if($local.isSupported){
      try{
        await $local.set(state)
      }catch(err){
        log.error('error setting state in local store:',err)
      }
    }
  }

  //
  extension.runtime.onConnect.addListener(connectRemote)


  function connectRemote(remotePort) {

    const processName = remotePort.name

    const isInternalProcess = extensionInternalProcessHash[processName]

    if (isInternalProcess) {
      const portStream = new PortStream(remotePort)

      console.log("internal process", processName)
      const data = controller.store.getState()

      console.log("send data>>>>>", data, sendData)
      if(processName === ENVIRONMENT_TYPE_POPUP) {
        popupIsOpen = true
        endOfStream(portStream,()=>{
          popupIsOpen = false
          controller.isClientOpen = clientOpenStatus()
        })
      } else if (processName === ENVIRONMENT_TYPE_APP) {
        const tabId = remotePort.sender.tab.id
        openTabsIDs[tabId] = true
        console.log(">>>>>", processName, data, remotePort)
      }
      const isUnlocked = Boolean(controller.appStateController.isUnlocked)
      const sendData = Object.assign({}, data, { isUnlocked})
      console.log("send data connect>>", getSendData())
      remotePort.postMessage({ apiType: 'initState', data: getSendData() })
    } else {
      console.log("external process", processName)
    }

    remotePort.onMessage.addListener(async (msg) =>{

      if(msg && msg.apiType ){
        log.warn(`recive --type:${msg.apiType}`,msg.data)
        switch (msg.apiType) {
          case APITYPE_UPDATE_UNLOCKED:
            const curstate = controller.store.getState()
            console.log("APITYPE_UPDATE_UNLOCKED", msg.data, curstate)
            if (msg.data && msg.data.password && curstate.env3) {
              log.warn('send local...', msg.data.password, curstate.env3)
              const v3 = await controller.appStateController.unlock(msg.data.password, curstate.env3)

              if(v3){
                const newState = getSendData()
                remotePort.postMessage({ apiType: APITYPE_INIT_STATE, data: newState,redirect:'/index'})
              }else{
                remotePort.postMessage({ apiType: APITYPE_PWD_INCORRECT ,error:{message:'password incorrect.'}})
              }
            }
            break;
          case APITYPE_LOGOUT:
            await controller.appStateController.locked()
            remotePort.postMessage({ apiType: 'initState', data: getSendData() })
            break;

          default:
            break;
        }
      }
    })


    function getSendData() {
      const storeState = controller.store.getState()
      const sendData = controller.appStateController.getAppState()
      const extendObj = {
        isUnlocked: Boolean(controller.appStateController.isUnlocked),
        selectAddress: controller.appStateController.selectAddress,
        ...controller.appStateController.store.getState(),
      }
      return Object.assign({}, storeState, sendData, extendObj)
    }

  }



}

function recviceMessageHandler(data){
  if(!data){
    log.log(">>>>>>>>")
  }
}

/**
 * get state
 */
async function loadStateFromPersistence(){
  versionedData = (await $local.get()) || {meta:{version:1}}
  console.log("versionedData local>>>",versionedData)
  return versionedData.data
}


