import React, { useEffect, useRef } from 'react'
// import Immutable from 'immutable'
// const a = Immutable.fromJS({
//   a: {
//     data: 1,
//   },
//   b: {
//     newData: {
//       data: 1,
//     },
//   },
// })
// const target1 = a.get('a')
// const target2 = a.getIn(['b', 'newData'])

function TestC(props) {
  const mounted = useRef()
  useEffect(() => {
    console.log('Update')
    if (!mounted.current) {
      mounted.current = true
    } else {
      // console.log('Update')
    }
  })
  // console.log(`Rendering TestC :`, props)
  return <div>{props.count.count}</div>
}

// export default TestC
export default TestC = React.memo(TestC)
