$(document).on('turbolinks:load', function() {
  $('.Header').hide();
  $(window).scroll(function() { // スクロール毎にイベントが発火する
    console.log("scroll");
      // windowがスクロールされた時に実行する処理
    $("#pixcel").html($(window).scrollTop());
    var scr_count = $(window).scrollTop();

    if(200 < scr_count) {
      $(".Header").fadeIn();
      } else {
      $('.Header').hide();
    }
  });
});
