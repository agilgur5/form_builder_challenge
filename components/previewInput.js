import React from 'react'
import { FormGroup, ControlLabel, FormControl, Radio } from 'react-bootstrap'

import styles from './sharedInput.cssm'

export default class PreviewInput extends React.Component {
  state = {
    // NOTE: null and undefined don't work as props to <input>, so
    // using '' instead, but this will match when equals is blank  ¯\_(ツ)_/¯
    // null terminator doesn't quite work either :/
    value: ''
  }

  renderType = (type) => {
    let {value} = this.state

    switch (type) {
      case 'text':
        return <FormControl type='text' value={value}
          onChange={this._changeValue} />
      case 'number':
        return <FormControl type='number' value={value}
          onChange={this._changeValue} />
      case 'yes-no':
        return <div>
          <Radio inline value='yes' checked={value === 'yes'}
            onChange={this._changeValue}>
            Yes
          </Radio>
          <Radio inline value='no' checked={value === 'no'}
            onChange={this._changeValue}>
            No
          </Radio>
        </div>
    }
  }

  _filterSubInput = (subInput) => {
    let {value} = this.state
    let condition = subInput.condition

    switch (condition.cond) {
      case 'eq':
        return value === condition.value
      case 'geq':
        return value >= condition.value
      case 'leq':
        return value <= condition.value
    }
  }

  render = () => {
    let {question, type, subInputs} = this.props.input

    return <div className={styles.input}>
      <FormGroup>
        <ControlLabel>{question}</ControlLabel>
        {this.renderType(type)}
      </FormGroup>

      <div className={subInputs.length > 0 ? styles.subInputList : null}>
        {subInputs.filter(this._filterSubInput).map((subInput) =>
          <PreviewInput key={subInput.id} input={subInput} />
        )}
      </div>
    </div>
  }

  _changeValue = (ev) => {
    this.setState({value: ev.target.value})
  }
}