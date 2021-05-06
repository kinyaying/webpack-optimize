import React from 'react'
import moment from 'moment'
import _ from 'lodash'
import imgUrl from './assets/bg.jpg'
export default function () {
  console.log('moment--->', _, moment().format('MMMM Do YYYY, h:mm:ss a'))
  return <img src={imgUrl} />
}
