$(function() {
  $('#conteudo').trumbowyg({
    lang: 'pt',
    svgPath: '/svg/trumbowyg.svg',
    resetCss: true
  });
})

var novoTitulo = document.getElementById('novoTitulo');
var inputTitulo = document.getElementById('titulo');

inputTitulo.addEventListener(
  'input',
  function() {
    novoTitulo.innerHTML = inputTitulo.value;
  }
);
