import Wallet from 'ethereumjs-wallet'
import hdkey from 'ethereumjs-wallet/hdkey'
import { toChecksumAddress } from 'ethereumjs-util'

import { HD_PATHS } from '../settings'

// const hdkey = require('ethereumjs-wallet/hdkey')

const bip39 = require('bip39')



export const getMnemonic = bip39.generateMnemonic

class WalletCreator {
  constructor(opts = {}) {
    const { password, mnemonics } = opts
    this.password = password
    this.mnemonics = mnemonics
  }

  setPassword(password) {
    if (password === undefined
      || typeof password === 'object'
      || typeof password === 'function') {
      throw new Error('password must set a value.')
    }
    this.password = password
  }

  getPassword() {
    return this.password || ''
  }

  generateMnemonic() {
    this.mnemonics = bip39.generateMnemonic()
    return this.mnemonics
  }

  getMnemonic() {
    return this.mnemonics || ''
  }

  getSeeds(){
    const str = this.mnemonics || ''
    return (this.mnemonics || '').trim().toLowerCase().match(/\w+/gu)
  }

  precheck() {
    return this.password === undefined || !this.mnemonics || !bip39.validateMnemonic(this.mnemonics)
  }

  async createWallet() {
    const self = this
    if (self.password === undefined) {
      throw new Error('Set password first.')
    }

    if (!self.mnemonics || !bip39.validateMnemonic(self.mnemonics)) {
      throw new Error(`mnemonics args illegal.`)
    }

    const hdwallet = await hdkey.fromMasterSeed(await bip39.mnemonicToSeed(self.mnemonics))

    const wallet = await hdwallet.derivePath(HD_PATHS.ledger).getWallet()

    self.wallet = wallet

    return wallet

  }

  getWallet() {
    return this.wallet
  }

  getAddress(){
    if(!this.wallet) return ''
    if(!this.firstAddress){
      const hexAddress = '0x'+ this.wallet.getAddress().toString('hex')
      this.firstAddress = toChecksumAddress(hexAddress)
    }
    return this.firstAddress
  }

  getV3() {
    if (!this.wallet && !this.password) {
      throw new Error('no wallet or password.')
    } else {
      return this.wallet.toV3(this.password)
    }
  }

  getV3Json() {
    if (this.wallet && this.password) {
      return this.wallet.toV3String(this.password)
    } else {
      return undefined
    }
  }

  fromV3(v3, password) {
    if (!v3 || !password) {
      throw new Error('arguments v3 or password lost.')
    }

    try {
      return Wallet.fromV3(v3, password)
    } catch (err) {
      throw err
    }
  }
}

export const creator = new WalletCreator()

export const createWallet = async (mnemonics, password) => {
  if (!mnemonics || !bip39.validateMnemonic(mnemonics)) {
    throw new Error(`mnemonics args illegal.`)
  }

  if (typeof password !== 'string' || password.length < 3) {
    throw new Error(`password args illegal.`)
  }

  console.log('hdkey>>>', bip39.mnemonicToSeedSync(mnemonics))
  var hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeedSync(mnemonics))

  var wallet = hdwallet.derivePath(HD_PATHS.ledger).getWallet()
  console.log("wallet address", wallet.getAddress().toString('hex'))
  console.log("Wallet Address:", wallet.getAddressString())

  const v3 = wallet.toV3String(password)
  console.log('v3>>JSON>>', v3)

  var v3wallet = Wallet.fromV3(v3, password)

  return wallet
}
