import React, { useState, Component, Fragment } from 'react'
import cx from 'classnames'
import caver from '../klaytn/caver';

import BloodContract from './BloodContract';

import './Auth.scss';
/**
 * Auth component manages authentication.
 * It provides two different access method.
 * 1) By keystore(json file) + password
 * 2) By privatekey
 */
function Auth() {
  const [privateKey, setPrivateKey] = useState('')

  const print = () => {
    console.log('pk', privateKey)
  }

  const handleChange = (e) => {
    setPrivateKey(e.target.value)
  }

  /**
   * reset method reset states to intial state.
   */
  const reset = () => {
    setPrivateKey('')
  }

  /**
   * handleLogin method
   */
  const handleLogin = () => {
    //const { accessType, keystore, password, privateKey } = this.state
    integrateWallet(privateKey)
  }

  /**
   * getWallet method get wallet instance from caver.
   */
  const getWallet = () => {
    if (caver.klay.accounts.wallet.length) {
      return caver.klay.accounts.wallet[0]
    }
  }

  /**
   * integrateWallet method integrate wallet instance to caver.
   * In detail, this method works like the step below:
   * 1) it takes private key as an input argument.
   * 2) get wallet instance through caver with private key.
   * 3) set wallet instance to session storage for storing wallet instance
   * cf) session storage stores item until tab is closed.
   */
   const integrateWallet = (privateKey) => {
    console.log('pk:', privateKey)
    // const walletInstance = caver.klay.accounts.privateKeyToAccount(privateKey)
    // caver.klay.accounts.wallet.add(walletInstance)
    caver.klay.accounts.wallet.add(privateKey);
    // 기존 wallet.add 가 아닌 Keyring으로 접근해봤다.
    // caver.wallet.add(caver.wallet.keyring.createFromPrivateKey(privateKey))

    console.log("Whole Wallet Instance : ", caver.klay.accounts.wallet)
    console.log("Caver Wallet Access :", caver.klay.accounts.wallet[0])
    const walletInstance = caver.klay.accounts.wallet && caver.klay.accounts.wallet[0]
    // //세션에 개인키 저장 후 SC 접근 마다 객체 만드는 어거지
    sessionStorage.setItem('walletInstance', JSON.stringify(walletInstance))
    console.log("Caver Wallet Length : ",caver.klay.accounts.wallet.length)
    
    // 개인 조회 키 암호 설정 test
    BloodContract.methods.set_InquiryPW('0x54ea798eed97f16c35d2265e94cc2d275ca67055',1000).send({
      from:walletInstance.address,
      gas:'2000000'
    })
 
    reset()
  }

  /**
   * removeWallet method removes
   * 1) wallet instance from caver.klay.accounts
   * 2) 'walletInstance' value from session storage.
   */
  const removeWallet = () => {
    caver.klay.accounts.wallet.clear()
    sessionStorage.removeItem('walletInstance')
    reset()
  }

  return (
      <Fragment>
          <label className="Auth__label">Private Key:</label>
          <input
          type='text'
          className="Auth__input"
          name="privateKey"
          value={privateKey}
          onChange={handleChange}
          />
          <button className="Auth__button" onClick={handleLogin}>Login</button>
      </Fragment>
  )
}

export default Auth