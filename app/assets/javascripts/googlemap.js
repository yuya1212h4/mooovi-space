$(document).on('turbolinks:load', function() {

var map = initMap();

  // クリックを行うと、現在位置の取得を行う
  $(".current_position").on('click', '#current_position', function() {
    CurrentPosition(map);
  });
});

// 地図を埋め込むための関数
function initMap() {
  var marker = [];
  var infoWindow = [];

 // 地図の作成
  var mapLatLng = new google.maps.LatLng({lat: gon.markerData[0]['lat'], lng: gon.markerData[0]['lng']}); // 緯度経度のデータ作成
  var map = new google.maps.Map( document.getElementById('map'), { // #mapに地図を埋め込む
    center: mapLatLng, // 地図の中心を指定
    zoom: 15 // 地図のズームを指定
  });

 // マーカー毎の処理
 for (var i = 0; i < gon.markerData.length; i++) {
        markerLatLng = new google.maps.LatLng({lat: gon.markerData[i]['lat'], lng: gon.markerData[i]['lng']}); // 緯度経度のデータ作成
        marker[i] = new google.maps.Marker({ // マーカーの追加
         position: markerLatLng, // マーカーを立てる位置を指定
            map: map // マーカーを立てる地図を指定
       });

     infoWindow[i] = new google.maps.InfoWindow({ // 吹き出しの追加
         content: '<div class="map">' + gon.markerData[i]['name'] + '</div>' // 吹き出しに表示する内容
       });
    infoWindow[i].open(map, marker[i]);// 吹き出しの表示を最初からしておく
     markerEvent(i, marker[i]); // マーカーにクリックイベントを追加
 }
 return map;
}




function CurrentPosition(map){ //現在位置の取得

  $current_url = window.location.href;
  if( $current_url.match(/\/users/) && navigator.geolocation )// Geolocation APIに対応しているかどうかの判断を行う
  {
    // 現在位置を取得できる場合の処理
    console.log( "あなたの端末では、現在位置を取得することができます。" ) ;
    // 現在位置を取得する
    navigator.geolocation.getCurrentPosition(

      function successFunc(position) { // 取得に成功した場合の関数

        // 取得したデータの整理
        var data = position.coords;

        // データの整理
        var lat = data.latitude;
        var lng = data.longitude;
        var alt = data.altitude;
        var accLatlng = data.accuracy ;
        var accAlt = data.altitudeAccuracy ;
        var heading = data.heading ;			//0=北,90=東,180=南,270=西
        var speed = data.speed ;

        // HTMLへの書き出し
        var innerHTML = '<dl><dt>緯度</dt><dd>' + lat + '</dd><dt>経度</dt><dd>' + lng + '</dd><dt>高度</dt><dd>' + alt + '</dd><dt>緯度、経度の精度</dt><dd>' + accLatlng + '</dd><dt>高度の精度</dt><dd>' + accAlt + '</dd><dt>方角</dt><dd>' + heading + '</dd><dt>速度</dt><dd>' + speed + '</dd></dl>' ;
        $("#current_result").append(innerHTML);

        // 位置情報
        var latlng = new google.maps.LatLng( lat , lng ) ;

        // マーカーの新規出力
        new google.maps.Marker( {
          map: map ,
          position: latlng ,
        });
        // 地図の中心を現在位置に変更
		    map.setCenter( latlng ) ;
      }
       , errorFunc , optionObj ) ;


  }
  // Geolocation APIに対応していない
  else
  {
    // 現在位置を取得できない場合の処理
    console.log( "あなたの端末では、現在位置を取得できません。" ) ;
    // エラーメッセージ
    var errorMessage = "お使いの端末は、GeoLacation APIに対応していません。" ;
    $("#result").append(errorMessage);
  }
};


function errorFunc() { // 取得に失敗した場合の関数
  // エラーコード(error.code)の番号
  // 0:UNKNOWN_ERROR				原因不明のエラー
  // 1:PERMISSION_DENIED			利用者が位置情報の取得を許可しなかった
  // 2:POSITION_UNAVAILABLE		電波状況などで位置情報が取得できなかった
  // 3:TIMEOUT					位置情報の取得に時間がかかり過ぎた…

  // エラー番号に対応したメッセージ
  var errorInfo = [
    "原因不明のエラーが発生しました…。" ,
    "位置情報の取得が許可されませんでした…。" ,
    "電波状況などで位置情報が取得できませんでした…。" ,
    "位置情報の取得に時間がかかり過ぎてタイムアウトしました…。"
  ] ;

  // エラー番号
  var errorNo = error.code ;

  // エラーメッセージ
  var errorMessage = "[エラー番号: " + errorNo + "]\n" + errorInfo[ errorNo ] ;

  // アラート表示
  console.log( errorMessage ) ;

  // HTMLに書き出し
  var innerHTML = '<p>' + errorMessage + '</p>';
  $('#result').append(innerHTML);
};

function optionObj() { // 現在位置の取得の際ｎオプションの指定
  console.log("オプション");
};


// マーカーにクリックイベントを追加
function markerEvent(i, marker) {
  marker.addListener('click', function() { // マーカーをクリックしたとき
    var insertHTML = buildAddUserInfo(gon.markerData[i]['name']);
    $('#insert').html(insertHTML);
  });
}

// 表示を行うhtmlの形成
function buildAddUserInfo(name){
  var html = `
    <p>${name}</p>
  `;
  return html;
}
