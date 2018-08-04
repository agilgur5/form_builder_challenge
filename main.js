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
  renderConditionValue = (condition, parentType) => {
    switch (parentType) {
      case 'text':
        return <FormControl type='text' value={condition.value}
          onChange={this._changeCondValue} />
      case 'number':
        return <FormControl type='number' value={condition.value}
          onChange={this._changeCondValue} />
      case 'yes-no':
        return <FormControl componentClass='select' value={condition.value}
          onChange={this._changeCondValue}>
          <option value='yes'>Yes</option>
          <option value='no'>No</option>
        </FormControl>
    }
  }
  renderCondition = (condition, parentType) => {
    return <FormGroup>
      <Col sm={2} componentClass={ControlLabel}>Condition</Col>
      <Col sm={6}>
        <FormControl componentClass='select' value={condition.cond}
          onChange={this._changeCondCond}>
          <option value='eq'>Equals</option>
          {parentType === 'number'
            ? <React.Fragment>
              <option value='geq'>Greater than</option>
              <option value='leq'>Less than</option>
            </React.Fragment>
            : null}
        </FormControl>
      </Col>
      <Col sm={4}>
        {this.renderConditionValue(condition, parentType)}
      </Col>
    </FormGroup>
  }

  render = () => {
    let {input, parentType, deleteSelf} = this.props
    let {condition, question, type, subInputs} = input

    return <div className={styles.subInput}>
      <Well>
        <Form horizontal>
          {condition
            ? this.renderCondition(condition, parentType)
            : null}
          <FormGroup>
            <Col sm={2} componentClass={ControlLabel}>Question</Col>
            <Col sm={10}>
              <FormControl type='text' value={question}
                onChange={this._changeQuestion} />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={2} componentClass={ControlLabel}>Type</Col>
            <Col sm={10}>
              <FormControl componentClass='select' value={type}
                onChange={this._changeType}>
                <option value='text'>Text</option>
                <option value='number'>Number</option>
                <option value='yes-no'>Yes / No</option>
              </FormControl>
            </Col>
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
        <InputComponent key={subInput.id} input={subInput} parentType={type}
          deleteSelf={this._deleteSubInput(index)}
          changeSelf={this._changeSubInput(index)} />
      )}
    </div>
  }

  // subInput changes
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

  // self changes
  _changeQuestion = (ev) => {
    let val = ev.target.value // store outside of synthetic ev
    this.props.changeSelf('question', val)
  }
  _changeType = (ev) => {
    let val = ev.target.value // store outside of synthetic ev
    this.props.changeSelf('type', val)
  }
  _changeCondCond = (ev) => {
    let cond = ev.target.value // store outside of synthetic ev
    // early return if condition didn't change
    if (cond === this.props.input.condition.cond) { return }

    let value = 0
    switch (cond) {
      case 'text':
        value = ''
        break
      case 'number':
        value = 0
        break
      case 'yes-no':
        value = 'yes'
        break
    }
    this.props.changeSelf('condition', {cond, value})
  }
  _changeCondValue = (ev) => {
    let value = ev.target.value // store outside of synthetic ev
    this.props.changeSelf('condition', {
      ...this.props.input.condition,
      value
    })
  }
}

const element = document.createElement('div')
document.body.appendChild(element)
ReactDOM.render(<App />, element)
