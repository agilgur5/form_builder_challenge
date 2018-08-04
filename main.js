import React from 'react'
import ReactDOM from 'react-dom'

import { addInput, changeInput, deleteInput } from './actions.js'

import styles from './main.cssm'

class App extends React.Component {
  state = {
    inputs: []
  }

  render = () => {
    let {inputs} = this.state
    return <div>
      {inputs.map((input, index) =>
        <InputComponent key={input.id} input={input}
          deleteSelf={this._deleteInput(index)}
          changeSelf={this._changeInput(index)} />
      )}
      <button onClick={this._addInput}>Add Input</button>
    </div>
  }

  _addInput = () => {
    this.setState((state) => ({inputs: addInput(state.inputs, false)}))
  }
  _changeInput = (index) => (key, value) => {
    this.setState((state) => ({inputs:
      changeInput(state.inputs, index, key, value)
    }))
  }
  _deleteInput = (index) => () => {
    this.setState((state) => ({inputs: deleteInput(state.inputs, index)}))
  }
}

class InputComponent extends React.Component {
  render = () => {
    let {input, deleteSelf} = this.props
    let {condition, question, type, subInputs} = input

    return <div className={styles.subInput}>
      {condition
        ? <div>Condition: <input type='radio' value={condition} /></div>
        : null}
      <div>Question: <input type='text' value={question} /></div>
      <div>Type: <input type='radio' value={type} /></div>
      <button onClick={deleteSelf}>Delete</button>
      <button onClick={this._addSubInput}>Add Sub-Input</button>
      {subInputs.map((subInput, index) =>
        <InputComponent key={subInput.id} input={subInput}
          deleteSelf={this._deleteSubInput(index)}
          changeSelf={this._changeSubInput(index)} />
      )}
    </div>
  }

  _addSubInput = () => {
    let subInputs = this.props.input.subInputs
    this.props.changeSelf('subInputs', addInput(subInputs))
  }
  _changeSubInput = (index) => (key, value) => {
    let subInputs = this.props.input.subInputs
    this.props.changeSelf(
      'subInputs',
      changeInput(subInputs, index, key, value)
    )
  }
  _deleteSubInput = (index) => () => {
    let subInputs = this.props.input.subInputs
    this.props.changeSelf('subInputs', deleteInput(subInputs, index))
  }
}

const element = document.createElement('div')
document.body.appendChild(element)
ReactDOM.render(<App />, element)
