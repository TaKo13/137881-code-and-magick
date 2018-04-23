'use  strict';
window.userDialog = (function() {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var MIN_BOTTOM_GAP = 200;

  var userDialog = document.querySelector('.setup');
  var dialogHandle = userDialog.querySelector('.upload');

  var userDialogOpen = document.querySelector('.setup-open');
  var userDialogClose = userDialog.querySelector('.setup-close');

  userDialog.classList.remove('hidden');

  dialogHandle.addEventListener('click', function(e) {
    e.preventDefault();
  });

  var initialDialogPosition = {
    top: userDialog.offsetTop,
    left: userDialog.offsetLeft
  };

  var openUserDialog = function() {
    userDialog.classList.remove('hidden');
  };

  var closeUserDialog = function() {
    userDialog.classList.add('hidden');

    userDialog.style.top = initialDialogPosition.top + 'px';
    userDialog.style.left = initialDialogPosition.left + 'px';
  };

  var onUserDialogOpenClick = function() {
    openUserDialog();
  };

  var onUserDialogCloseClick = function() {
    closeUserDialog();
  };

  var onUserDialogOpenEnterKeyDown = function(e) {
    if (e.keyCode === ENTER_KEYCODE) {
      openUserDialog();
    }
  };

  var onEscKeydown = function(e) {
    if (e.keyCode === ESC_KEYCODE) {
      closeUserDialog();
    }
  };

  var onUserDialogEnterKeyDown = function(e) {
    if (e.keyCode === ENTER_KEYCODE && e.target === userDialogClose) {
      closeUserDialog();
    }
  };

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
        y: userDialog.offsetTop - shift.y,
        x: userDialog.offsetLeft - shift.x
      };

      if (finalCoords.y < 0) {
        finalCoords.y = 0;
      }

      if (finalCoords.y > window.innerHeight - MIN_BOTTOM_GAP) {
        finalCoords.y = window.innerHeight - MIN_BOTTOM_GAP;
      }

      if (finalCoords.x < 0 + userDialog.clientWidth / 2) {
        finalCoords.x = 0 + userDialog.clientWidth / 2;
      }

      if (finalCoords.x > window.innerWidth - userDialog.clientWidth / 2) {
        finalCoords.x = window.innerWidth - userDialog.clientWidth / 2;
      }

      userDialog.style.top = finalCoords.y + 'px';
      userDialog.style.left = finalCoords.x + 'px';
    };

    var onMouseUp = function(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  userDialog.addEventListener('keydown', onUserDialogEnterKeyDown);
  userDialogOpen.addEventListener('click', onUserDialogOpenClick);
  userDialogOpen.addEventListener('keydown', onUserDialogOpenEnterKeyDown);
  userDialogClose.addEventListener('click', onUserDialogCloseClick);

  return {
    element: userDialog,
    onEscClose: onEscKeydown
  };
})();
