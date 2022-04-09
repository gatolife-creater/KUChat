import React, { Component } from 'react'
import {QrReader} from 'react-qr-reader'

class QRCodeReader extends Component {
  state = {
    result: 'No result'
  }

  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })
      console.log(this.state.result);
    }
  }
  handleError = err => {
    console.error(err)
  }
  render() {
    return (
      <div>
        <QrReader
          delay={300}
          onError={this.handleError}
          onResult={this.handleScan}
          style={{ width: '100%' }}
        />
        {/* <p>{this.state.result}</p> */}
      </div>
    )
  }
}
export default QRCodeReader;