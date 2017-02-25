/**
 * Created by umair on 2/25/17.
 */

var initMagicLine = function () {
  var menu_active = $('#masthead.header_v1 .navbar-nav>li.menu-item.current-menu-item,#masthead.header_v1 .navbar-nav>li.menu-item.current-menu-parent, #masthead.header_v1 .navbar-nav>li.menu-item.current-menu-ancestor');
  if (menu_active.length > 0) {
    menu_active.before('<span id="magic-line"></span>');
    var menu_active_child = menu_active.find('>a,>span.disable_link'),
      menu_left = menu_active.position().left,
      menu_child_left = parseInt(menu_active_child.css('padding-left')),
      magic = $('#magic-line');
    magic.width(menu_active_child.width()).css("left", Math.round(menu_child_left + menu_left)).data('magic-width', magic.width()).data('magic-left', magic.position().left);
  } else {
    var first_menu = $('#masthead.header_v1 .navbar-nav>li.menu-item:first-child');
    first_menu.after('<span id="magic-line"></span>');
    var magic = $('#magic-line');
    magic.data('magic-width', 0);
  }
  var nav_H = parseInt($('.site-header .navigation').outerHeight());
  magic.css('bottom', nav_H - (nav_H - 90) / 2 - 64);
  $('#masthead .navbar-nav>li.menu-item').on({
    'mouseenter': function() {
      var elem = $(this).find('>a,>span.disable_link'),
        new_width = elem.width(),
        parent_left = elem.parent().position().left,
        left = parseInt(elem.css('padding-left'));
      if (!magic.data('magic-left')) {
        magic.css('left', Math.round(parent_left + left));
        magic.data('magic-left', 'auto');
      }
      magic.stop().animate({
        left: Math.round(parent_left + left),
        width: new_width
      });
    },
    'mouseleave': function() {
      magic.stop().animate({
        left: magic.data('magic-left'),
        width: magic.data('magic-width')
      });
    }
  });
};

export default initMagicLine;
