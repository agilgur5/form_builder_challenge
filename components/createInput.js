import React from 'react'
import { Button, Glyphicon, Well, Form, FormGroup, ControlLabel, FormControl,
  Col } from 'react-bootstrap'

import { addInput, changeInput, deleteInput } from '../actions.js'

import styles from './sharedInput.cssm'

export default class CreateInput extends React.Component {
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
              <option value='gt'>Greater than</option>
              <option value='lt'>Less than</option>
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

    return <div className={styles.input}>
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

      <div className={subInputs.length > 0 ? styles.subInputList : null}>
        {subInputs.map((subInput, index) =>
          <CreateInput key={subInput.id} input={subInput} parentType={type}
            deleteSelf={this._deleteSubInput(index)}
            changeSelf={this._changeSubInput(index)} />
        )}
      </div>
    </div>
  }

  // subInput changes
  _addSubInput = () => {
    let {type, subInputs} = this.props.input
    // parentType of subInput is the current type
    this.props.changeSelf('subInputs', addInput(subInputs, type))
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
    this.props.changeSelf('condition', {
      ...this.props.input.condition,
      cond
    })
  }
  _changeCondValue = (ev) => {
    let value = ev.target.value // store outside of synthetic ev
    this.props.changeSelf('condition', {
      ...this.props.input.condition,
      value
    })
  }
}
