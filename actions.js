import shortid from 'shortid'

// TODO: use immer or a better state mechanism

export function addInput (inputs, isSubInput = true) {
  let newInput = {
    id: shortid.generate(),
    question: '',
    type: 'text',
    subInputs: []
  }
  if (isSubInput) {
    newInput.condition = {
      cond: 'eq',
      value: ''
    }
  }
  return inputs.concat(newInput)
}

export function changeInput (inputs, index, key, value) {
  return inputs.map((input, index2) => {
    // no changes
    if (index !== index2) {
      return input
    }
    // found our input
    return {
      ...input,
      ...{[key]: value}
    }
  })
}

export function deleteInput (inputs, index) {
  return [
    ...inputs.slice(0, index),
    ...inputs.slice(index + 1)
  ]
}
