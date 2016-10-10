$(function() {
  $('a.deletar-post').on('click', function(e) {
    e.preventDefault();
    var postId = $(this).data('id');

    $.ajax({
      url: '/post/' + postId,
      type: 'DELETE'
    })

    window.location.reload();
  })
})
