$(document).ready(function(){

  $('form.comment-form').on('submit', function(){
    var pid = $('#pid');
    var nickname = $('#commenter');
    var body = quill_comment.container.firstChild.innerHTML;
    var comment = {nickname: nickname.val(), body: body};
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

  var quill_comment = new Quill('#comment', {
    modules: {
      toolbar: ['bold', 'italic', 'underline', 'code', 'code-block', 'clean']
    },
    placeholder: 'Add your comment, no less than 11 chars...',
    theme: 'snow'
  });

  $('button[type="submit"]').attr('disabled', true);
  quill_comment.on('text-change', function(){
    if (quill_comment.getLength() < 11) {
      $('button[type="submit"]').attr('disabled', true);
    } else {
      $('button[type="submit"]').attr('disabled', false);
    }
  });

});
