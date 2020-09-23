import extension from '@/lib/extensionizer';

import {
  APITYPE_UPDATE_UNLOCKED,
  APITYPE_LOGOUT,
  APITYPE_UPDATE_PBITEM,
  APITYPE_DELETE_PBITEM,
} from '@/lib/cnst/api-cnst';

const LOG_PREFIFIX = 'MessageController';

class MessageController {
  constructor() {
    this.runtime = extension.runtime;
  }

  async login(password) {
    return new Promise((resolve, reject) => {
      this.runtime.sendMessage(
        {
          apiType: APITYPE_UPDATE_UNLOCKED,
          password,
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
            console.log(LOG_PREFIFIX + '>>>>', initState);
            reject(initState.error);
          } else {
            resolve(initState);
          }
        }
      );
    });
  }

  async updatePassbookItem(item) {
    return new Promise((resolve, reject) => {
      this.runtime.sendMessage(
        {
          apiType: APITYPE_UPDATE_PBITEM,
          data: item,
        },
        {
          includeTlsChannelId: true,
        },
        (initState) => {
          if (initState.error) {
            console.log(LOG_PREFIFIX + '>>>>', initState);
            reject(initState.error);
          } else {
            resolve(initState);
          }
        }
      );
    });
  }

  //APITYPE_DELETE_PBITEM
  async deletePassbookItem(item) {
    return new Promise((resolve, reject) => {
      this.runtime.sendMessage(
        {
          apiType: APITYPE_DELETE_PBITEM,
          data: item,
        },
        {
          includeTlsChannelId: true,
        },
        (initState) => {
          if (initState.error) {
            console.log(LOG_PREFIFIX + '>>>>', initState);
            reject(initState.error);
          } else {
            resolve(initState);
          }
        }
      );
    });
  }
}

export default MessageController;
