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
    }
  }
  handleError = err => {
    console.error(err)
  }
  render() {
    return (
      <>
        <QrReader
          delay={300}
          onError={this.handleError}
          onResult={this.handleScan}
          style={{ width: '100%' }}
        />
        <p>{this.state.result.text}</p>
      </>
    )
  }
}
export default QRCodeReader;