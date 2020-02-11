import mitt from 'mitt'

// https://nodejs.org/api/events.html
// https://ourcodeworld.com/articles/read/445/how-to-use-event-emitters-with-es5-and-es6-in-node-js-easily
// https://codepen.io/developit/pen/rjMEwW

const NBEvent = mitt

const event = new NBEvent()

export default event
export { event, NBEvent }
