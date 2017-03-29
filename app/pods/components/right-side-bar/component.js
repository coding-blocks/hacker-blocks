import Ember from 'ember';

export default Ember.Component.extend({
  isOpen() {
    return $('.right-sidebar').hasClass('open');
  },
  didRender() {
    var _this = this;
    var $sidebar = $('#rightsidebar');
    var $overlay = $('.overlay');

    //Close sidebar
    $(window).click(function (e) {
      var $target = $(e.target);
      if (e.target.nodeName.toLowerCase() === 'i') { $target = $(e.target).parent(); }

      if (!$target.hasClass('js-right-sidebar') && _this.isOpen() && $target.parents('#rightsidebar').length === 0) {
        if (!$target.hasClass('bars')) $overlay.fadeOut();
        $sidebar.removeClass('open');
      }
    });

    $('.js-right-sidebar').on('click', function () {
      $sidebar.toggleClass('open');
      if (_this.isOpen()) { $overlay.fadeIn(); } else { $overlay.fadeOut(); }
    });
  }
});
