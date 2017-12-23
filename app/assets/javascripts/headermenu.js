$(document).on('turbolinks:load', function() {
  $(function() {
      $('#navToggle').click(function(){//headerに .openNav を付加・削除
          $('header').toggleClass('openNav');// 指定した要素にクラス名を付けたり、消したりすることが出来る
      });
  });
});
