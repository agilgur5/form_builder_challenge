import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Glyphicon, Well, Form, FormGroup, ControlLabel,
  FormControl, Col } from 'react-bootstrap'

import { addInput, changeInput, deleteInput } from './actions.js'

import 'bootstrap-css-only'
import styles from './main.cssm'

class App extends React.Component {
  state = {
    inputs: []
  }

  render = () => {
    let {inputs} = this.state
    return <div className={styles.root}>
      {inputs.map((input, index) =>
        <InputComponent key={input.id} input={input}
          deleteSelf={this._deleteInput(index)}
          changeSelf={this._changeInput(index)} />
      )}
      <Button bsStyle='success' onClick={this._addInput}>
        <Glyphicon glyph='plus' /> Add Input
      </Button>
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
  renderCondition = (condition) => {
    return <FormGroup>
      <Col sm={2} componentClass={ControlLabel}>Condition</Col>
      <Col sm={10}><FormControl type='radio' value={condition} /></Col>
    </FormGroup>
  }

  render = () => {
    let {input, deleteSelf} = this.props
    let {condition, question, type, subInputs} = input

    return <div className={styles.subInput}>
      <Well>
        <Form horizontal>
          {condition
            ? this.renderCondition(condition)
            : null}
          <FormGroup>
            <Col sm={2} componentClass={ControlLabel}>Question</Col>
            <Col sm={10}><FormControl type='text' value={question} /></Col>
          </FormGroup>
          <FormGroup>
            <Col sm={2} componentClass={ControlLabel}>Type</Col>
            <Col sm={10}><FormControl type='radio' value={type} /></Col>
          </FormGroup>
          <Button onClick={deleteSelf}>
            <Glyphicon glyph='minus' /> Delete
          </Button>
          <Button className={styles.addSubInput} bsStyle='success'
            onClick={this._addSubInput}>
            <Glyphicon glyph='plus' /> Add Sub-Input
          </Button>
        </Form>
      </Well>
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
