import React, {Component} from 'react'
import {render} from 'react-dom'

import { Wasp } from '../../src'

export default class Demo extends Component {
  render() {
    let sampleList = [
      '1 - aaa',
      '2 - bbb',
      '3 - ccc',
      '4 - ddd',
      '5 - eee',
      '6 - fff',
    ];

    return <div>
      <h1>WASP drag &amp; drop demo:</h1>
      <Wasp
        itemsToList={sampleList}
      />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
