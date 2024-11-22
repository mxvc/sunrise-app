import { Component } from 'react'
import './app.less'

class App extends Component {

  componentDidMount () {
    console.log('app componentDidMount')
  }

  componentDidShow () {
    console.log('app componentDidShow')
  }

  componentDidHide () {}

  componentDidCatchError () {
    console.log('app componentDidCatchError')
  }

  // this.props.children 是将要会渲染的页面
  render () {
    console.log('app render')
    return this.props.children
  }
}

export default App
