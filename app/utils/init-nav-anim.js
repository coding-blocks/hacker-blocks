/**
 * Created by umair on 2/25/17.
 */

var initNavAnim = function () {
  var menu_active = $('#masthead.header_v1 .navbar-nav>li.menu-item.active,#masthead.header_v1 .navbar-nav>li.menu-item.current-menu-parent, #masthead.header_v1 .navbar-nav>li.menu-item.current-menu-ancestor');
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


  var $header = $('#masthead.header_v1'),
    off_Top = ($('.content-pusher').length > 0) ? $('.content-pusher').offset().top : 0,
    menuH = $header.outerHeight(),
    latestScroll = 0;
  if ($(window).scrollTop() > 2) {
    $header.removeClass('affix-top').addClass('affix');
  }
  $(window).scroll(function() {
    var current = $(this).scrollTop();
    if (current > 2) {
      $header.removeClass('affix-top').addClass('affix');
    } else {
      $header.removeClass('affix').addClass('affix-top');
      $('#toolbar').removeClass('menu-scroll');
      $header.removeClass('menu-scroll');
    }
    if (!$('body').hasClass('thim-search-active')) {
      if (current > latestScroll && current > menuH + off_Top) {
        if (!$header.hasClass('menu-hidden')) {
          $header.addClass('menu-hidden');
          $('#toolbar').removeClass('menu-scroll');
          $header.removeClass('menu-scroll');
        }
      } else {
        if ($header.hasClass('menu-hidden')) {
          $header.removeClass('menu-hidden');
          $('#toolbar').addClass('menu-scroll');
          $header.addClass('menu-scroll');
        }
      }
    }
    latestScroll = current;
  });
  var $header_v4 = $('#masthead.header_v4'),
    off_Top_v4 = ($('.content-pusher').length > 0) ? $('.content-pusher').offset().top : 0,
    menuH_v4 = $header.outerHeight(),
    latestScroll_v4 = 0;
  if ($(window).scrollTop() > 2) {
    $header_v4.removeClass('affix-top').addClass('affix');
  }
  $(window).scroll(function() {
    var current_v4 = $(this).scrollTop();
    if (current_v4 > 2) {
      $header_v4.removeClass('affix-top').addClass('affix');
    } else {
      $header_v4.removeClass('affix').addClass('affix-top');
      $('#top-menu').removeClass('menu-scroll-v4');
      $header_v4.removeClass('menu-scroll-v4');
    }
    if (!$('body').hasClass('thim-search-active') && !$('body').hasClass('thim-popup-active')) {
      if (current_v4 > latestScroll_v4 && current_v4 > menuH_v4 + off_Top_v4) {
        if (!$header_v4.hasClass('menu-hidden-v4')) {
          if ($(window).scrollTop() > 100) {
            $header_v4.addClass('menu-hidden-v4');
          }
          $('#top-menu').removeClass('menu-scroll-v4');
          $header_v4.removeClass('menu-scroll-v4');
        }
      } else {
        if ($header_v4.hasClass('menu-hidden-v4')) {
          $header_v4.removeClass('menu-hidden-v4');
          $('#top-menu').addClass('menu-scroll-v4');
          $header_v4.addClass('menu-scroll-v4');
        }
      }
    }
    latestScroll_v4 = current_v4;
  });
  var $header_v2 = $('#masthead.header_v2'),
    off_Top_v2 = ($('.content-pusher').length > 0) ? $('.content-pusher').offset().top : 0,
    menuH_v2 = $header.outerHeight(),
    latestScroll_v2 = 0;
  if ($(window).scrollTop() > 2) {
    $header_v2.removeClass('affix-top').addClass('affix');
  }
  $(window).scroll(function() {
    var current_v2 = $(this).scrollTop();
    if (current_v2 > 2) {
      $header_v2.removeClass('affix-top').addClass('affix');
    } else {
      $header_v2.removeClass('affix').addClass('affix-top');
      $('#top-menu').removeClass('menu-scroll-v2');
      $header_v2.removeClass('menu-scroll-v2');
    }
    if (!$('body').hasClass('thim-search-active') && !$('body').hasClass('thim-popup-active')) {
      if (current_v2 > latestScroll_v2 && current_v2 > menuH_v2 + off_Top_v2) {
        if (!$header_v2.hasClass('menu-hidden-v2')) {
          if ($(window).scrollTop() > 100) {
            $header_v2.addClass('menu-hidden-v2');
          }
          $('#top-menu').removeClass('menu-scroll-v2');
          $header_v2.removeClass('menu-scroll-v2');
        }
      } else {
        if ($header_v2.hasClass('menu-hidden-v2')) {
          $header_v2.removeClass('menu-hidden-v2');
          $('#top-menu').addClass('menu-scroll-v2');
          $header_v2.addClass('menu-scroll-v2');
        }
      }
    }
    latestScroll_v2 = current_v2;
  });
  var $header_v3 = $('#masthead.header_v3'),
    off_Top_v3 = ($('.content-pusher').length > 0) ? $('.content-pusher').offset().top : 0,
    menuH_v3 = $header.outerHeight(),
    latestScroll_v3 = 0;
  if ($(window).scrollTop() > 2) {
    $header_v3.removeClass('affix-top').addClass('affix');
  }
  $(window).scroll(function() {
    var current_v3 = $(this).scrollTop();
    if (current_v3 > 2) {
      $header_v3.removeClass('affix-top').addClass('affix');
    } else {
      $header_v3.removeClass('affix').addClass('affix-top');
      $('#top-menu').removeClass('menu-scroll-v3');
      $header_v3.removeClass('menu-scroll-v3');
    }
    if (!$('body').hasClass('thim-search-active') && !$('body').hasClass('thim-popup-active')) {
      if (current_v3 > latestScroll_v3 && current_v3 > menuH_v3 + off_Top_v3) {
        if (!$header_v3.hasClass('menu-hidden-v3')) {
          if ($(window).scrollTop() > 100) {
            $header_v3.addClass('menu-hidden-v3');
          }
          $('#top-menu').removeClass('menu-scroll-v3');
          $header_v3.removeClass('menu-scroll-v3');
        }
      } else {
        if ($header_v3.hasClass('menu-hidden-v3')) {
          $header_v3.removeClass('menu-hidden-v3');
          $('#top-menu').addClass('menu-scroll-v3');
          $header_v3.addClass('menu-scroll-v3');
        }
      }
    }
    latestScroll_v3 = current_v3;
  });
  $('.wrapper-container:not(.mobile-menu-open) .site-header .navbar-nav >li,.wrapper-container:not(.mobile-menu-open) .site-header .navbar-nav li,.site-header .navbar-nav li ul li').on({
    'mouseenter': function() {
      $(this).children('.sub-menu').stop(true, false).fadeIn(250);
    },
    'mouseleave': function() {
      $(this).children('.sub-menu').stop(true, false).fadeOut(250);
    }
  });
  if ($(window).width() > 768) {
    var menu_active = $('#masthead.header_v1 .navbar-nav>li.menu-item.active,#masthead.header_v1 .navbar-nav>li.menu-item.current-menu-parent, #masthead.header_v1 .navbar-nav>li.menu-item.current-menu-ancestor');
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
  }
  $('.header_v1 .menu-item.widget_area:not(.dropdown_full_width),.header_v1 .menu-item.multicolumn:not(.dropdown_full_width)').each(function() {
    var elem = $(this),
      elem_Left = elem.offset().left,
      sub_menu = elem.find('>.sub-menu');
    if (sub_menu.length > 0) {
      var left = (elem.width() - sub_menu.width()) / 2;
      if (Math.abs(left) > elem_Left) {
        sub_menu.css('left', elem_Left * Math.abs(left) / left);
      } else {
        sub_menu.css('left', left);
      }
    }
  });


  /*init login popup*/
  $(document).on('click', 'body:not(".loggen-in") .thim-enroll-course-button', function(e) {
    if ($(window).width() > 767) {
      if ($('.thim-login-popup .login').length) {
        e.preventDefault();
        $('.thim-login-popup .login').trigger('click');
      }
    } else {
      e.preventDefault();
      var redirect = $(this).data('redirect');
      window.location = redirect;
    }
  });
  $(document).on('click', '#thim-popup-login .close-popup', function(event) {
    event.preventDefault();
    $('body').removeClass('thim-popup-active');
    $('#thim-popup-login').removeClass('active');
  });
  $(document).on('click', '.thim-login-popup .login', function(event) {
    if ($(window).width() > 767) {
      event.preventDefault();
      $('body').addClass('thim-popup-active');
      $('#thim-popup-login').addClass('active');
    }
  });
  $(document).on('click', '#thim-popup-login', function(e) {
    if ($(e.target).attr('id') == 'thim-popup-login') {
      $('body').removeClass('thim-popup-active');
      $('#thim-popup-login').removeClass('active');
    }
  });
};

export default initNavAnim;
