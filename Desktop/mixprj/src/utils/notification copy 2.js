import push from 'push.js';
let promise

function Notification() {
  this.create = (title = '', body = '', icon = '') => {
    promise = push.create(title, {
      body,
      icon,
      timeout: 12000,
    });
  }

  this.onClick = (click) => { click }

  this.close = () => { promise.then(function (notification) { notification.close() }) }
}



export const notification = new Notification()