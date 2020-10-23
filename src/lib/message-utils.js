export const UNKNOW_ERR = '999999';
export const INCORRECT_PWD = '100002';

export const UNKNOWN_MESSAGE = 'Error: unknown exception.';

/**
 * 异常返回
 * @param {*} errorMsg
 * @param {*} param1
 */
export const errorMessage = (errorMsg, { code = UNKNOW_ERR, originApi = '' }) => {
  let message = UNKNOWN_MESSAGE;
  if (typeof errorMsg === 'object' && errorMsg instanceof Error) {
    message = errorMsg.message;
  } else if (typeof errorMsg === 'string') {
    message = errorMsg;
  }

  return {
    originApi: originApi,
    error: {
      code: code || UNKNOW_ERR,
      message,
    },
  };
};

export const responseError = (apiType, error) => {
  if (typeof error === 'object') {
  } else if (typeof error === 'string') {
    error = {
      code: UNKNOW_ERR,
      message: error,
    };
  } else if (typeof error === 'number') {
    error = {
      code: error,
      message: `${apiType} message handle fail.`,
    };
  } else {
    error = {
      code: UNKNOW_ERR,
      message: 'unknown error.',
    };
  }

  return {
    originApi: apiType || '',
    error,
  };
};

/**
 * 正常返回
 * @param {string} originApi the requestAPIType
 * @param {object|string|number,boolean} data response data
 * @return {object} [apiType=initState,originApi,data]
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
