$(document).on('turbolinks:load', function() {

  //グローバル変数
  var nowModalSyncer = null ;		//現在開かれているモーダルコンテンツ
  var modalClassSyncer = "modal-syncer" ;		//モーダルを開くリンクに付けるクラス名

  //モーダルのリンクを取得する
  var modals = document.getElementsByClassName( modalClassSyncer ) ;

  //モーダルウィンドウを出現させるクリックイベント
  for(var i=0,l=modals.length; l>i; i++){

	  //全てのリンクにタッチイベントを設定する
	  modals[i].onclick = function(){

		  //ボタンからフォーカスを外す
		  this.blur() ;

		  //ターゲットとなるコンテンツを確認
	  	var target = this.getAttribute( "data-target" ) ;

		  //ターゲットが存在しなければ終了
	  	if( typeof( target )=="undefined" || !target || target==null ){
		  	return false ;
		  }

  		//コンテンツとなる要素を取得
  		nowModalSyncer = document.getElementById( target ) ;

  		//ターゲットが存在しなければ終了
  		if( nowModalSyncer == null ){
  			return false ;
  		}

      //キーボード操作などにより、オーバーレイが多重起動するのを防止する
      // if($("#modal-overlay")[0]) return false ;		//新しくモーダルウィンドウを起動しない [下とどちらか選択]
      if($("#modal-overlay")[0]) $("#modal-overlay").remove() ;		//現在のモーダルウィンドウを削除して新しく起動する [上とどちらか選択]

      //オーバーレイ用のHTMLコードを、[body]内の最後に生成する
      $("body").append('<div id="modal-overlay"></div>');

      //[$modal-overlay]をフェードインさせる
      $("#modal-overlay").fadeIn("slow");

      //[$modal-content]をフェードインさせる
      $(nowModalSyncer).fadeIn("slow");

      // コンテンツをセンタリングする
      centeringModalSyncer(nowModalSyncer);


      $("#modal-overlay,#modal-close").unbind().click(function(){
      //[#modal-overlay]、または[#modal-close]をクリックしたら起こる処理

        //[#modal-overlay]と[#modal-close]をフェードアウトする
        // $("#modal-content,#modal-overlay").fadeOut("slow",function(){
        //[#modal-content]と[#modal-overlay]をフェードアウトした後に…
        $( "#" + target + ",#modal-overlay" ).fadeOut( "fast" , function() {
           //フェードアウト後、[#modal-overlay]をHTML(DOM)上から削除
          $("#modal-overlay").remove();
        });
        //現在のコンテンツ情報を削除
        // nowModalSyncer = null ;
      });
    };
  };

var timer = false;
//リサイズされたら、センタリングをする関数[centeringModalSyncer()]を実行する
$( window ).resize(function() {
  if (timer !== false) {
      clearTimeout(timer);
  }
  timer = setTimeout(function() {
    centeringModalSyncer(nowModalSyncer);
  }, 200);
});

  //センタリングをする関数
  function centeringModalSyncer(){

    //モーダルウィンドウが開いてなければ終了
    if( nowModalSyncer == null ) return false ;

  	//画面(ウィンドウ)の幅を取得し、変数[w]に格納
  	var w = $(window).width();

  	//画面(ウィンドウ)の高さを取得し、変数[h]に格納
  	var h = $(window).height();

  	//コンテンツ(#modal-content)の幅を取得し、変数[cw]に格納
  	// var cw = $("#modal-content").outerWidth({margin:true});
  	var cw = $(nowModalSyncer).outerWidth();

  	//コンテンツ(#modal-content)の高さを取得し、変数[ch]に格納
  	// var ch = $("#modal-content").outerHeight({margin:true});
  	var ch = $(nowModalSyncer).outerHeight();

    //センタリングを実行する
    $(nowModalSyncer).css( {"left": ((w - cw)/2) + "px","top": ((h - ch)/2) + "px"} ) ;
  }

});
