import { name, age } from './message'
// let sum = (a, b) => {
//   import { name, age } from './message'
//   console.log(name)
//   return a + b
// }
class say {
  name() {
    return name
  }
  age() {
    return age
  }
}
let s = new say()
console.log(s.name)
