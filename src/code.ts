import {Observable} from 'rxjs';

const observable = new Observable(subscriber => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
    }, 1000);
});

addItem('just before subscribe');
observable.subscribe({
    next(x) {
        addItem('got value ' + x);
    },
    error(err) {
        addItem('something wrong occurred: ' + err);
    },
    complete() {
        addItem('done');
    }
});
addItem('just after subscribe');

let obs = new Observable(observer => {
    observer.next('Testing observer');
    observer.next('How do you do?');
    observer.complete();
    observer.next('never will execute');
});

obs.subscribe(
    (x: any) => addItem(x),
    (error: any) => addItem(error),
    () => addItem('completed')
);

function addItem(val: any) {
    const node = document.createElement('li');
    const textNode = document.createTextNode(val);
    node.appendChild(textNode);
    document.getElementById('output').appendChild(node);
}