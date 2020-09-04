import extension from './extensionizer'

/**
 *
 */
export function checkForError() {
  const lastError = extension.runtime.lastError

  if(!lastError) {
    return
  }
  if(lastError.stack && lastError.message) {
    return lastError
  }

  return new Error(lastError.message)
}
