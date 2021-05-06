import React, { useState, useRef } from 'react'
import _ from 'lodash'

function List() {
  const initArray = [1, 2, 3, 4, 5]
  const [array, setArray] = useState(initArray)
  // 处理翻转数组
  const handleReverse = () =>
    setArray((array) => {
      array.reverse()
      return [...array]
    })

  const [value, setValue] = useState('')

  const debouncedSave = useRef(
    _.debounce((nextValue) => {
      if (nextValue) {
        setArray(() => array.filter((item) => item == nextValue))
      } else {
        setArray(initArray)
      }
    }, 1000)
  ).current

  const handleChange = (event) => {
    const { value: nextValue } = event.target
    setValue(nextValue)
    debouncedSave(nextValue)
  }

  return (
    <>
      <input value={value} onChange={handleChange} />
      <button onClick={handleReverse}>翻转</button>
      {array.map((i) => (
        <div key={i}>{i}</div>
      ))}
    </>
  )
}

export default List
