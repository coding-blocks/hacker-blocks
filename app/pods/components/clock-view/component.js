import Ember from 'ember';

export default Ember.Component.extend({
    seconds: null,
    minutes: null,
    hours: null,
    date: null,
    day: null,
    month: null,
    year: null,

    didRender() {
    
    var _this = this;

    let monthNames = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"];

    let daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        setInterval( function() {
            var seconds = new Date().getSeconds();
            var sdegree = seconds * 6;
            var srotate = "rotate(" + sdegree + "deg)";
            $("#sec").css({"-moz-transform" : srotate, "-webkit-transform" : srotate});

        }, 1000 );

        setInterval( function() {
            var hours = new Date().getHours();
            var mins = new Date().getMinutes();
            var hdegree = hours * 30 + (mins / 2);
            var hrotate = "rotate(" + hdegree + "deg)";

            $("#hour").css({"-moz-transform" : hrotate, "-webkit-transform" : hrotate});

        }, 1000 );

        setInterval( function() {
            var mins = new Date().getMinutes();
            var mdegree = mins * 6;
            var mrotate = "rotate(" + mdegree + "deg)";

            $("#min").css({"-moz-transform" : mrotate, "-webkit-transform" : mrotate});

        }, 1000 );

        Ember.run.later( function() {
            var date = new Date();
            _this.set('seconds', date.getSeconds()< 10 ? '0' + date.getSeconds() : date.getSeconds());
            _this.set('minutes',date.getMinutes()< 10 ? '0' + date.getMinutes() + ':': date.getMinutes() + ':');
            _this.set('hours',date.getHours()< 10 ? '0' + date.getHours() + ':': date.getHours() + ':');
            _this.set('date', date.getDate());
            _this.set('day', daysArray[date.getDay()]);
            _this.set('month', monthNames[date.getMonth()]);
            _this.set('year', date.getFullYear() + ', ');
        }, 1000);
  }  
});
