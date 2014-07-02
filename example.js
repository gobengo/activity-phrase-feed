require('./test/dom');
var ActivityPhraseFeed = require('./index');

var feed = new ActivityPhraseFeed();

feed.once('render', function () {
    console.log('initial');
    print();
});

setInterval(function () {
    feed.add({
        actor: 'ben',
        verb: 'post',
        object: 'lolz'
    });
}, 1000);

feed.on('add', function () {
    console.log('Something was added! New HTML')
    print();
});

function print() {
    console.log(feed.el.innerHTML + '\n')
}
