import Ember from 'ember';
import initNavAnim from '../../../utils/init-nav-anim';

export default Ember.Component.extend({
  didRender() {
    var $el, leftPos, newWidth,
      $mainNav = $("#main-menu");

    $mainNav.append("<li id='magic-line'></li>");
    var $magicLine = $("#magic-line");

    $magicLine
      .width($("#main-menu .active a").width())
      .css("left", $("#main-menu .active a").offset().left)
      .data("origLeft", $magicLine.position().left)
      .data("origWidth", $magicLine.width());

    $("#main-menu li a").hover(function() {
      $el = $(this);
      leftPos = $el.offset().left;
      newWidth = $el.width();
      $magicLine.stop().animate({
        left: leftPos,
        width: newWidth
      });
    }, function() {
      $magicLine.stop().animate({
        left: $magicLine.data("origLeft"),
        width: $magicLine.data("origWidth")
      });
    });
    initNavAnim();
  }
});
