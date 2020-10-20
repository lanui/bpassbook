/**
 * this Utils lib only used in extension envirement
 */
import extension from './extensionizer';

/**
 *
 * @param {*} part
 */
export const getExtensionUrl = (part) => {
  if (!part || !extension || !extension.runtime) return '';
  return extension.runtime.getURL(part);
};

export const extVersion = () => {
  const manifest = extension.runtime.getManifest();
  return manifest ? manifest.version : '';
};

/**
 *
 */
export function checkForError() {
  const lastError = extension.runtime.lastError;

  if (!lastError) {
    return;
  }
  if (lastError.stack && lastError.message) {
    return lastError;
  }

  return new Error(lastError.message);
}

export function validBookItem(item) {
  const keysRequired = ['username', 'password', 'tips', 'hostname'];
  if (typeof item !== 'object') return false;
  for (let i = 0; i < keysRequired.length; i++) {
    if (!item.hasOwnProperty(keysRequired[i]) || item[keysRequired[i]] == '') return false;
  }
  return true;
}

export function openTab(url) {
  if (!url) return;
}

export function openActivedTab(url) {
  const tabs = extension.tabs;
  if (!tabs || !tabs.query || !url) {
    return;
  }

  tabs.query({ url, currentWindow: true }, function (findTabs) {
    if (!findTabs || findTabs.length === 0) {
      tabs.create({ url, active: true });
    } else {
      tabs.update(findTabs[0].id, { active: true });
    }
  });
}
