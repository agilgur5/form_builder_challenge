import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  state = {
    inputs: []
  }

  render = () => {
    let {inputs} = this.state
    return <div>
      {inputs.map((input, index) =>
        <InputComponent input={input}
          deleteSelf={() => this._deleteInput(index)}
          changeSelf={(k, v) => this._changeInput(index, k, v)} />
      )}
      <button onClick={this._addInput}>Add Input</button>
    </div>
  }

  // TODO: use immer or a better state mechanism
  _addInput = () => {
    this.setState((state) => ({inputs: state.inputs.concat({
      question: '',
      type: 'text',
      subInputs: []
    })}))
  }
  _changeInput = (index, key, value) => {
    this.setState((state) => ({inputs: state.inputs.map((input, index2) => {
      // no changes
      if (index !== index2) {
        return input
      }
      // found our input
      let change = {[key]: value}
      return {
        ...input,
        ...change
      }
    })}))
  }
  _deleteInput = (index) => {
    this.setState((state) => ({inputs: [
      ...state.inputs.slice(0, index),
      ...state.inputs.slice(index + 1)
    ]}))
  }
}

class InputComponent extends React.Component {
  render = () => {
    let {input, deleteSelf, changeSelf} = this.props
    let {condition, question, type, subInputs} = input

    return <div>
      {condition
        ? <div>Condition: <input type='radio' value={condition} /></div>
        : null}
      <div>Question: <input type='text' value={question} /></div>
      <div>Type: <input type='radio' value={type} /></div>
      <button onClick={deleteSelf}>Delete</button>
      {/* TODO: complete below */}
      <button onClick={this._addInput}>Add Sub-Input</button>
      {subInputs.map((subInput) => <InputComponent input={subInput} />)}
    </div>
  }
}

const element = document.createElement('div')
document.body.appendChild(element)
ReactDOM.render(<App />, element)
