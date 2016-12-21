$(document).ready(function(){

  $('form.comment-form').on('submit', function(){
    var pid = $('#pid');
    var nickname = $('#commenter');
    var body = $('#comment');
    var comment = {nickname: nickname.val(), body: body.val()};
    $.ajax({
      type: 'POST',
      url: '/post/'+pid.val(),
      data: comment,
      success: function(data){
        location.reload();
      }
    });
    return false;
  });

});
