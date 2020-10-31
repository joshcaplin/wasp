import React, {Component} from 'react'
import {render} from 'react-dom'

import { Wasp } from '../../src'

export default class Demo extends Component {
  render() {
    return <div>
      <h1>wasp Demo</h1>
      <Wasp/>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
