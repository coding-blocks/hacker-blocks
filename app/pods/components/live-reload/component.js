import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
    seconds: null,
    minutes: null,
    days: null,
    hours: null,
    routing: Ember.inject.service('-routing'),
    didRender() {
        this._super(...arguments);
        var _this = this;
        const currentContest = _this.get('contest');
        let unixTime = currentContest.get('startTime');

        const timer = setInterval(function () {
            var current = new Date();
            var future = unixTime * 1000;
            var diff = future - current;
            var tempTime = moment.duration(diff);


            if (diff <= 100) {
              // TODO: Force model refresh if possible.
              _this.get ('routing').router.replaceWith ('contests.contest', currentContest.get('id'));
              clearInterval (timer);
              return;
            }

            _this.set('seconds', tempTime.seconds());
            _this.set('minutes', tempTime.minutes());
            _this.set('hours', tempTime.hours());
            _this.set('days', tempTime.days());

        }, 1000);
    }
});
