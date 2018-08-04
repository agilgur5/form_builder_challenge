import shortid from 'shortid'

// TODO: use immer or a better state mechanism

function defaultCondValue (parentType) {
  switch (parentType) {
    case 'text':
      return ''
    case 'number':
      return '0'
    case 'yes-no':
      return 'yes'
  }
}

export function addInput (inputs, parentType = null) {
  let newInput = {
    id: shortid.generate(),
    question: '',
    type: 'text',
    subInputs: []
  }
  if (parentType) {
    newInput.condition = {
      cond: 'eq',
      value: defaultCondValue(parentType)
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
