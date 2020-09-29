import extension from '../extensionizer';

import { APITYPE_CREATE_ENV3, APITYPE_LOGOUT, APITYPE_LOGIN } from '../cnst/api-cnst';

class WhispererController {
  constructor(opts = {}) {
    this.name = opts.name || 'default';
    this.runtime = extension.runtime;
    this.includeTlsChannelId = Boolean(opts.includeTlsChannelId);
  }

  /**
   *
   * @param {*} apiType
   * @param {*} data
   */
  async sendSimpleMsg(apiType, data) {
    return new Promise((resolve, reject) => {
      try {
        this.runtime.sendMessage(
          {
            apiType,
            data,
          },
          {
            includeTlsChannelId: this.includeTlsChannelId,
          },
          (response) => {
            if (response.error) {
              reject(response.error);
            } else {
              resolve(response);
            }
          }
        );
      } catch (e) {
        reject(e);
      }
    });
  }

  async sendCreateEnv3(sendData) {
    return new Promise((resolve, reject) => {
      try {
        this.runtime.sendMessage(
          {
            apiType: APITYPE_CREATE_ENV3,
            data: sendData,
          },
          {
            includeTlsChannelId: this.includeTlsChannelId,
          },
          function (response) {
            console.log('<<<<response>>>>', response);
            if (!response) reject('none');
            if (response.error) {
              reject(response.error);
            } else {
              resolve(response);
            }
          }
        );
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * P3 login
   * @param {*} password
   */
  // async login(password) {
  //   return new Promise((resolve,reject) => {
  //     this.runtime.sendMessage(
  //       {
  //         apiType: APITYPE_UPDATE_UNLOCKED,
  //         password,
  //       },
  //       {
  //         includeTlsChannelId: true,
  //       },
  //       (initState) =>{
  //         if (!initState){
  //           reject({ code: 100002, message: 'Error: Incorrect password' })
  //         }
  //         if (initState.error){
  //           reject(initState.error)
  //         }else {
  //           resolve(initState)
  //         }
  //       }
  //     )
  //   });
  // }

  /**
   *
   */
  async logout() {
    return new Promise((resolve, reject) => {
      this.runtime.sendMessage(
        {
          apiType: APITYPE_LOGOUT,
        },
        {
          includeTlsChannelId: true,
        },
        (initState) => {
          if (initState.error) {
            reject(initState.error);
          } else {
            resolve(initState);
          }
        }
      );
    });
  }
}

export default WhispererController;
