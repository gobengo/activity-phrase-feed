'use strict';

module.exports = ActivityPhraseFeed;

var Feed = require('stream-feed');
var activityMocks = require('activity-mocks');
var cycle = require('stream-cycle');
var phraser = require('activity-phraser');
var raf = require('raf');
var inherits = require('inherits');

function ActivityPhraseFeed(el) {
  if ( ! (this instanceof ActivityPhraseFeed)) {
    return new ActivityPhraseFeed(el);
  }
  Feed.call(this);
  var self = this;
  this.el = el || document.createElement('ul');

  // initial activities
  activityMocks.toArray().forEach(function (a) {
    self.add(a);
  });

  // periodic adds
  setInterval(function () {
    self.write(createActivity());
  }, 2000);

  // infinity more!
  cycle(activityMocks.toArray()).pipe(self.more);
  // fetch more on click
  this.el.addEventListener('click', function () {
    self.fetchMore(10);
  });

  this._renderLoop();
}
inherits(ActivityPhraseFeed, Feed);

/**
 * Render as HTML
 * The phrases are sorted because why not
 */
ActivityPhraseFeed.prototype.toHTML = function() {
  var html = this
    .map(phraser.phrase.bind(phraser))
    .sort()
    .map(function (phrase) {
      return "<li>phrase</li>".replace('phrase', phrase);
    })
    .join('\n');
  return html;
};

/**
 * Kick off a requestAnimationFrame-based loop
 * On each tick, if toHTML has changed, .el.innerHTML will be set to it
 */
ActivityPhraseFeed.prototype._renderLoop = function loop() {
  var self = this;
  var el = this.el;
  var lastHtml;
  raf(function loop() {
    var newHtml = self.toHTML();
    if (newHtml !== lastHtml) {
      el.innerHTML = self.toHTML();
      self.trigger('render');
    }
    lastHtml = newHtml;
    raf(loop);
  });
};

function createActivity(id) {
    var mocks = activityMocks.toArray()
    var a = mocks[Math.floor(Math.random() * mocks.length)];
    a.id = id;
    return a;
}
