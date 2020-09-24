export const UNKNOW_ERR = '999999';
export const INCORRECT_PWD = '100002';

export const UNKNOWN_MESSAGE = 'Error: unknown exception.';

/**
 * 异常返回
 * @param {*} errorMsg
 * @param {*} param1
 */
export const errorMessage = (errorMsg, { code = UNKNOW_ERR, originApi = '' }) => {
  return {
    originApi: originApi,
    error: {
      code: code,
      message: errorMsg || UNKNOWN_MESSAGE,
    },
  };
};

/**
 * 正常返回
 * @param {*} originApi
 * @param {*} data
 */
export const responseMessage = (originApi = '', data = {}) => {
  return {
    originApi: originApi,
    data,
  };
};

export const responseInitState = (originApi = '', initState = {}) => {
  return {
    apiType: 'initState',
    originApi,
    data: initState,
  };
};
