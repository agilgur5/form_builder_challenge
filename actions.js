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

function newCondition (parentType) {
  return {
    cond: 'eq',
    value: defaultCondValue(parentType)
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
    newInput.condition = newCondition(parentType)
  }
  return inputs.concat(newInput)
}

export function changeInput (inputs, index, key, value) {
  return inputs.map((input, index2) => {
    // not the input we are looking for, so no changes
    if (index !== index2) {
      return input
    }

    let change = {[key]: value}
    // type affects all subInputs' conditions, so reset all of them
    if (key === 'type') {
      let resetCondition = newCondition(value)
      change.subInputs = input.subInputs.map((subInput) => {
        return {
          ...subInput,
          condition: resetCondition
        }
      })
    }

    return {
      ...input,
      ...change
    }
  })
}

export function deleteInput (inputs, index) {
  return [
    ...inputs.slice(0, index),
    ...inputs.slice(index + 1)
  ]
}
