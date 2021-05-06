import React from 'react'
export default class SnapshotSample extends React.Component {
  constructor(props) {
    super(props)
    this.listRef = React.createRef()
    this.state = {
      messages: [], //用于保存子div
      scrollHeight: 0,
    }
  }

  handleMessage() {
    //用于增加msg
    this.setState((pre) => ({
      messages: [`msg: ${pre.messages.length}`, ...pre.messages],
    }))
  }
  componentDidMount() {
    for (let i = 0; i < 50; i++) this.handleMessage() //初始化20条
    this.timeID = window.setInterval(() => {
      //设置定时器
      if (this.state.messages.length > 200) {
        //大于200条，终止
        window.clearInterval(this.timeID)
        return
      } else {
        this.handleMessage()
      }
    }, 1000)
  }
  componentWillUnmount() {
    //清除定时器
    window.clearInterval(this.timeID)
  }
  getSnapshotBeforeUpdate() {
    //很关键的，我们获取当前listRef的scrollHeight，传到componentDidUpdate 的参数perScrollHeight
    return this.listRef.current.scrollHeight
  }
  componentDidUpdate(perProps, perState, perScrollHeight) {
    const curScrollTop = this.listRef.current.scrollTop
    if (curScrollTop < 5) return
    this.listRef.current.scrollTop =
      curScrollTop + (this.listRef.current.scrollHeight - perScrollHeight)
    //加上增加的div高度，就相当于不动
  }
  render() {
    return (
      <>
        <h3>聊天消息</h3>
        <div
          className="wrap"
          ref={this.listRef}
          style={{ height: '500px', overflow: 'scroll' }}
        >
          {this.state.messages.map((msg) => (
            <div>{msg} </div>
          ))}
        </div>
      </>
    )
  }
}
