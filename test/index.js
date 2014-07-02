var assert = require('chai').assert;
var sinon = require('sinon');

var ActivityPhraseFeed = require('activity-phrase-feed');
var activityMocks = require('activity-mocks');

describe('activity-phrase-feed', function () {
    it('can be constructed', function () {
        var feed = new ActivityPhraseFeed();
        assert.ok(feed);
    });
});

var mocks = activityMocks.toArray();
function createActivity(id) {
    var a = activityMocks.create('livefyre.sitePostCollection');
    // var a = mocks[Math.floor(Math.random() * mocks.length)];
    a.id = id;
    return a;
}

// create an array of N activities
function nActivities(n) {
    var i = 0;
    var activities = [];
    while (i < n) {
        activities.push(createActivity(i));
        i++;
    }
    return activities;
}
