export function getLocalInputs () {
  return JSON.parse(window.localStorage.getItem('inputs'))
}

export function setLocalInputs (jsonObj) {
  return window.localStorage.setItem('inputs', JSON.stringify(jsonObj))
}

export function initLocalStorage () {
  // initialize localStorage if it doesn't exist
  if (!getLocalInputs()) {
    setLocalInputs({inputs: []})
  }
}
