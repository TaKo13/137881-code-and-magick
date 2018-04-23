'use  strict';
window.userDialog = (function() {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var userDialog = document.querySelector('.setup');
  var dialogHandle = userDialog.querySelector('.upload');
  var userDialogOpen = document.querySelector('.setup-open');
  var userDialogClose = userDialog.querySelector('.setup-close');

  userDialog.classList.remove('hidden');

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

      userDialog.style.top = userDialog.offsetTop - shift.y + 'px';
      userDialog.style.left = userDialog.offsetLeft - shift.x + 'px';
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
