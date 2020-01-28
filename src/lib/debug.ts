export function debug_setGlobal(arrayOfObjects: {}) {
  Object.keys(arrayOfObjects).forEach( e => {
    // @ts-ignore
    window.debug = window.debug || {}
    // @ts-ignore
    window.debug[e] = arrayOfObjects[e]
  })
}