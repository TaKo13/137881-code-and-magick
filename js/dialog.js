'use  strict';

var MIN_BOTTOM_GAP = 200;

var dialogHandle = setup.querySelector('.upload');

dialogHandle.addEventListener('click', function(e) {
  e.preventDefault();
});

dialogHandle.addEventListener('mousedown', function(evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function(moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var finalCoords = {
      y: setup.offsetTop - shift.y,
      x: setup.offsetLeft - shift.x
    };

    if (finalCoords.y < 0) {
      finalCoords.y = 0;
    }

    if (finalCoords.y > window.innerHeight - MIN_BOTTOM_GAP) {
      finalCoords.y = window.innerHeight - MIN_BOTTOM_GAP;
    }

    if (finalCoords.x < 0 + setup.clientWidth / 2) {
      finalCoords.x = 0 + setup.clientWidth / 2;
    }

    if (finalCoords.x > window.innerWidth - setup.clientWidth / 2) {
      finalCoords.x = window.innerWidth - setup.clientWidth / 2;
    }

    setup.style.top = finalCoords.y + 'px';
    setup.style.left = finalCoords.x + 'px';
  };

  var onMouseUp = function(upEvt) {
    upEvt.preventDefault();
    upEvt.stopPropagation();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
