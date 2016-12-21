$(document).ready(function(){

  $('form.blog-form').on('submit', function(){
    var title = $('#title');
    var author = $('#author');
    var body = $('#body');
    var blog = {title: title.val(), author: author.val(), body: body.val()};
    $.ajax({
      type: 'POST',
      url: '/',
      data: blog,
      success: function(data){
        location.reload();
      }
    });
    return false;
  });

});
