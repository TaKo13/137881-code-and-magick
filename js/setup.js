'use  strict';

(function() {
  var userDialogElement = window.userDialog.element;
  var similarListElement = userDialogElement.querySelector(
    '.setup-similar-list'
  );

  var similarWizardTemplate = document
    .querySelector('#similar-wizard-template')
    .content.querySelector('.setup-similar-item');

  var getRandomItemFromArray = function(array) {
    var index = Math.floor(Math.random() * array.length);

    return array[index];
  };

  var wizards = []; // Сгенерировать массив из 4 магов

  for (var i = 0; i < window.wizardConstants.NUMBERS_OF_WIZARDS; i++) {
    wizards.push({
      name:
        getRandomItemFromArray(window.wizardConstants.FIRST_NAMES_WIZARD) +
        ' ' +
        getRandomItemFromArray(window.wizardConstants.LAST_NAMES_WIZARD),
      coatColor: getRandomItemFromArray(window.wizardConstants.COAT_COLORS),
      eyesColor: getRandomItemFromArray(window.wizardConstants.EYES_COLORS)
    });
  }

  var createWizards = function(wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent =
      wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var createFragment = function(wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(createWizards(wizards[i]));
    }

    return similarListElement.appendChild(fragment);
  };

  createFragment(wizards);

  userDialogElement.querySelector('.setup-similar').classList.remove('hidden');

  var setupWizardForm = userDialogElement.querySelector('.setup-wizard-form');
  var setupUserName = setupWizardForm.querySelector('.setup-user-name');

  document.addEventListener('keydown', function(e) {
    if (e.target !== setupUserName) {
      window.userDialog.onEscClose(e);
    }
  });

  var wizardEyes = document
    .querySelector('.setup-wizard')
    .querySelector('.wizard-eyes');
  var wizardEyesInput = setupWizardForm.elements.namedItem('eyes-color');
  var fireballWrapInput = setupWizardForm.elements.namedItem('fireball-color');
  var setupFireballWrap = document.querySelector('.setup-fireball-wrap');
  var onSetupFireballWrapClick = function() {
    var color = getRandomItemFromArray(window.wizardConstants.FIREBALLS_COLORS);
    setupFireballWrap.style.background = color;
    fireballWrapInput.value = color;
  };
  var onWizardEyesClick = function() {
    var color = getRandomItemFromArray(window.wizardConstants.EYES_COLORS);
    wizardEyes.style.fill = color;
    wizardEyesInput.value = color;
  };

  wizardEyes.addEventListener('click', onWizardEyesClick);
  setupFireballWrap.addEventListener('click', onSetupFireballWrapClick);
})();
