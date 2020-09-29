import extension from './extensionizer';

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
