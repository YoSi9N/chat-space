$(function(){
  var auildHTML = function(message) {
    if (message.text && message.image) {
      var html = `<div class="main__content__messages" data-message-id="${message.id}">
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
    } else if (message.text) {
      var html = `<div class="main__content__messages" data-message-id="${message.id}">
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
    } else if (message.image) {
      var html = `<div class="main__content__messages" data-message-id="${message.id}">
                    <div class="main__content__messages--poster">
                      <div class="main__content__messages--poster--name">
                        ${message.name}
                      </div>
                      <div class="main__content__messages--poster--time">
                      ${message.created_at}
                      </div>
                    </div>
                    <img class="aaaa" src="${message.image}">
                  </div>`
    };
    return html;
  };
  var reloadMessages = function() {
    var last_message_id = $(".main__content__messages:last").data("message-id")
    var href = 'api/messages#index {:format=>"json"}' 
    $.ajax({
      url: href,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
        var insertHTML = '';
        if(messages.length){
        $.each(messages, function(i, message) {
            insertHTML += auildHTML(message)
            $('.main__content').append(insertHTML);
          });
          $('.main__content').animate({ scrollTop: $('.main__content')[0].scrollHeight});
        }
    })
    .fail(function() {
      alert('error');
    });
  };


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
      var html = auildHTML(data);
      $(".main__content").append(html);
      $('.main__content').animate({ scrollTop: $('.main__content')[0].scrollHeight});
      $(".main__footer__form")[0].reset();
      $(".main__footer__form--send").prop("disabled", false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました")
      $(".main__footer__form--send").prop("disabled", false);
  })
  
});
  setInterval(reloadMessages, 7000);
});
