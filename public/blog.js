$(document).ready(function(){

  $('form.blog-form').on('submit', function(){
    var title = $('#title');
    var author = $('#author');
    var body = quill_article.container.firstChild.innerHTML;
    var body_prev = quill_article.getText();
    if (body_prev.length > 200) {
      body_prev = body_prev.substring(0,200) + '...';
    }
    var blog = {title: title.val(), body: body,
      body_preview: body_prev, hidden: false};
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

  var quill_article = new Quill('#article', {
    modules: {
      toolbar: ['bold', 'italic', 'underline', 'code', 'code-block', 'clean']
    },
    placeholder: 'Add your comment, no less than 11 chars...',
    theme: 'snow'
  });

  $('button[type="submit"]').attr('disabled', true);
  quill_article.on('text-change', function(){
    if (quill_article.getLength() < 11) {
      $('button[type="submit"]').attr('disabled', true);
    } else {
      $('button[type="submit"]').attr('disabled', false);
    }
  });

  $('#paginator').bootpag({
    total: $('#lastPage').val(),
    page: $('#pageNum').val(),
    maxVisible: 5,
    href: "p.{{number}}",
  });

});
