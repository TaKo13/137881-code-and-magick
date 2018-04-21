'user strict';

(function() {
  var shopElement = document.querySelector('.setup-artifacts-shop');
  var draggedItem = null;
  var artifactsElement = document.querySelector('.setup-artifacts');

  shopElement.addEventListener('dragstart', function(evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      artifactsElement.style.outline = '2px dashed red';
      draggedItem = evt.target;
    }
  });

  artifactsElement.addEventListener('dragover', function(evt) {
    evt.preventDefault();
    return false;
  });

  shopElement.addEventListener('dragend', function(evt) {
    evt.preventDefault();
    artifactsElement.style.outline = '';
  });

  artifactsElement.addEventListener('drop', function(evt) {
    evt.target.style.backgroundColor = '';

    if (evt.target.tagName.toLowerCase() !== 'img') {
      var item = draggedItem.cloneNode();
      item.setAttribute('draggable', false);

      evt.target.appendChild(item);
    }

    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragenter', function(evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function(evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });
})();
