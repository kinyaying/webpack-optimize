// import '@babel/polyfill'
import React, { useState, useRef } from 'react'
import { HashRouter, Route, Link } from 'react-router-dom'
import ReactDom from 'react-dom'
import moment from 'moment'
import Home from './home'
import Game from './game'
import List from './list'
import Immutable from './immutable'
import './index.css'
import 'bootstrap/scss/bootstrap.scss'
import SnapshotSample from './SnapshotSample'
import SnapshotSampleOptimize from './SnapshotSampleOptimize'

// const Game = () => import(/* webpackChunkName: "game" */ './game')
// const List = () => import(/* webpackChunkName: "list" */ './list')

function App() {
  const immutableRef = useRef(null)
  let [count, setCount] = useState({ count: 5 })
  let [n, setN] = useState(5)
  const changeProps = () => {
    console.log('changeProps', count)
    n++
    count.count++
    setN(n)
  }
  return (
    <>
      {location.hash.indexOf('/snapshotSample') == -1 ? (
        // <Immutable count={count} ref={immutableRef} />
        // <button onClick={changeProps}>changeProps</button>
        <HashRouter>
          <ul className="ul">
            <Link to={`/`}>Home</Link>
            <Link to={`/game`}>Game</Link>
            <Link to={`/list`}>List</Link>
          </ul>
          <div className="content">
            <Route path="/game" component={Game} />
            <Route path="/list" component={List} />
            <Route path="/" exact component={Home} />
          </div>
        </HashRouter>
      ) : (
        <HashRouter>
          <Route path="/snapshotSample" component={SnapshotSample} />
          <Route
            path="/snapshotSampleOptimize"
            component={SnapshotSampleOptimize}
          />
        </HashRouter>
      )}
    </>
  )
}

ReactDom.render(<App />, document.getElementById('root'))
