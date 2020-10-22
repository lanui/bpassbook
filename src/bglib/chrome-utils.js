/**
 *
 */
export const stopPasswordSaving = () => {
  if (chrome && chrome.privacy) {
    chrome.privacy.services.passwordSavingEnabled.set({ scope: 'regular', value: false });
  }
};

export const stopAutofillEnabled = () => {
  if (chrome && chrome.privacy) {
    chrome.privacy.services.autofillEnabled.set({ scope: 'regular', value: false });
  }
};

/**
 *
 * @param {*} options
 */
export const openFirstInstallPage = (options) => {
  const url = chrome.runtime.getURL('popup/popup.html');
  return new Promise((resolve, reject) => {
    chrome.tabs.create({ url }, (newTab) => {
      const error = checkForError();
      if (error) {
        reject(error);
      }
      resolve(newTab);
    });
  });
};

function checkForError() {
  const lastError = chrome.runtime.lastError;
  if (!lastError) {
    return;
  }

  if (lastError.stack && lastError.message) {
    return lastError;
  }

  return new Error(lastError.message);
}
