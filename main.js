import React from 'react'
import ReactDOM from 'react-dom'
import { Tabs, Tab, Button, Glyphicon, FormControl } from 'react-bootstrap'

import CreateInput from './components/createInput.js'

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
      <Tabs id='mainTabs'>
        <Tab eventKey={1} title='Create' className={styles.tab}>
          {inputs.map((input, index) =>
            <CreateInput key={input.id} input={input}
              deleteSelf={this._deleteInput(index)}
              changeSelf={this._changeInput(index)} />
          )}
          <Button bsStyle='success' onClick={this._addInput}>
            <Glyphicon glyph='plus' /> Add Input
          </Button>
        </Tab>
        <Tab eventKey={2} title='Preview' className={styles.tab} />
        <Tab eventKey={3} title='Export' className={styles.tab} >
          <FormControl componentClass='textarea' readOnly rows='10'
            value={JSON.stringify({inputs})} />
        </Tab>
      </Tabs>
    </div>
  }

  _addInput = () => {
    this.setState((state) => ({inputs: addInput(state.inputs)}))
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

const element = document.createElement('div')
document.body.appendChild(element)
ReactDOM.render(<App />, element)
