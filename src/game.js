import React from 'react'
import ReactDOM from 'react-dom'
import './game.css'

function Square(props) {
  return (
    <button
      className={`square ${props.winnerSquare && 'winner-square'}`}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  )
}
function Board(props) {
  const renderSquare = (i) => {
    const { lines } = props
    return (
      <Square
        winnerSquare={lines ? lines.includes(i) : null}
        value={props.squares[i]}
        onClick={() => {
          props.onClick(i)
        }}
      />
    )
  }
  const renderSquares = () => {
    let doms = [],
      rows = []
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        rows.push(
          <React.Fragment key={i * 3 + j}>
            {renderSquare(i * 3 + j)}
          </React.Fragment>
        )
      }
      doms.push(
        <div className="board-row" key={`row_${i}`}>
          {rows}
        </div>
      )
      rows = []
    }
    return doms
  }
  return (
    <div>
      <div className="status">{status}</div>
      {renderSquares()}
    </div>
  )
}

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          row: null,
          column: null,
        },
      ],
      xIsNext: true,
      stepNumber: 0,
    }
  }
  handleClick = (i) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[this.state.stepNumber]
    const squares = current.squares.slice()
    const row = i % 3
    const column = parseInt(i / 3)
    this.state.history.slice(0, this.state.stepNumber + 1)
    if (calculateWinner(squares).winner || squares[i]) {
      return
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      history: history.concat([{ squares, row, column }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    })
  }
  jumpTo(stepNumber) {
    this.setState({ stepNumber, xIsNext: stepNumber % 2 === 0 })
  }
  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const { winner, lines } = calculateWinner(current.squares)
    let status
    if (winner) {
      status = `Winner is ${winner}`
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`
    }
    if (!winner && current.squares.indexOf(null) === -1) {
      status = `平局啦`
    }
    const moves = history.map((step, move) => {
      const desc = move
        ? 'Go to move #' + move + ':row-' + step.row + ',column-' + step.column
        : 'Go to fame start'
      return (
        <li
          key={move}
          className={this.state.stepNumber === move ? 'selected-history' : null}
        >
          <button
            onClick={() => {
              this.jumpTo(move)
            }}
          >
            {desc}
          </button>
        </li>
      )
    })

    return (
      <div className="game">
        <div className="game-board">
          <Board
            lines={lines}
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
}

// ========================================

// ReactDOM.render(<Game />, document.getElementById('root'))

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        lines: lines[i],
      }
    }
  }
  return {
    winner: null,
    lines: null,
  }
}

export default Game
