$(function(){
  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.image) {
      var html = `<div class="main__content__messages">
      <div class="main__content__messages--poster">
      <div class="main__content__messages--poster--name">
      ${message.name}
      </div>
      <div class="main__content__messages--poster--time">
      ${message.created_at}
      </div>
      </div>
      <div class="main__content__messages--text">
      ${message.text}
      </div>
      <img class="aaaa" src="${message.image}">
      </div>`

    } else {
      var html = `<div class="main__content__messages">
        <div class="main__content__messages--poster">
          <div class="main__content__messages--poster--name">
           ${message.name}
          </div>
          <div class="main__content__messages--poster--time">
            ${message.created_at}
          </div>
        </div>
        <div class="main__content__messages--text">
        ${message.text}
        </div>
      
      </div>`
    }
    return html
  }

  $(".main__footer__form").on("submit",function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr("action");
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $(".main__content").append(html);
      $('.main__content').animate({ scrollTop: $('.main__content')[0].scrollHeight});
      $(".main__footer__form__input-box--text").val('');
      $(".main__footer__form--send").prop("disabled", false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました")
      $(".main__footer__form--send").prop("disabled", false);
    })
    })
});
