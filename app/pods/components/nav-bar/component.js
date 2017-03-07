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

       initNavAnim();
  }
});
