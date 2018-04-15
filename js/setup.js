'use  strict';

var NUMBERS_OF_WIZARDS = 4;
var FIRST_NAMES_WIZARD = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var LAST_NAMES_WIZARD = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALLS_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document
  .querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');

var getRandomItemFromArray = function(array) {
  var index = Math.floor(Math.random() * array.length);

  return array[index];
};

var wizards = []; // Сгенерировать массив из 4 магов

for (var i = 0; i < NUMBERS_OF_WIZARDS; i++) {
  wizards.push({
    name:
      getRandomItemFromArray(FIRST_NAMES_WIZARD) +
      ' ' +
      getRandomItemFromArray(LAST_NAMES_WIZARD),
    coatColor: getRandomItemFromArray(COAT_COLORS),
    eyesColor: getRandomItemFromArray(EYES_COLORS)
  });
}

var createWizards = function(wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
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

userDialog.querySelector('.setup-similar').classList.remove('hidden');

var setup = document.querySelector('.setup');
var openSetup = function() {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onEscKeydown);
};
var closeSetup = function() {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onEscKeydown);
};

var onSetupOpenClick = function() {
  openSetup();
};
var onSetupCloseClick = function() {
  closeSetup();
};

var onSetupOpenEnterKeyDown = function(e) {
  if (e.keyCode === ENTER_KEYCODE) {
    openSetup();
  }
};
var onEscKeydown = function(e) {
  if (e.keyCode === ESC_KEYCODE && e.target !== setupUserName) {
    closeSetup();
  }
};
var onSetupWizardFormEnterKeyDown = function(e) {
  if (e.keyCode === ENTER_KEYCODE && e.target === setupClose) {
    closeSetup();
  }
};

var setupOpen = document.querySelector('.setup-open');
var setupWizardForm = document.querySelector('.setup-wizard-form');
var setupUserName = setupWizardForm.querySelector('.setup-user-name');
var setupClose = setupWizardForm.querySelector('.setup-close');

document.addEventListener('keydown', onEscKeydown);
setupOpen.addEventListener('click', onSetupOpenClick);
setupOpen.addEventListener('keydown', onSetupOpenEnterKeyDown);
setupClose.addEventListener('click', onSetupCloseClick);
setupWizardForm.addEventListener('keydown', onSetupWizardFormEnterKeyDown);

var wizardEyes = document
  .querySelector('.setup-wizard')
  .querySelector('.wizard-eyes');
var wizardEyesInput = setupWizardForm.elements.namedItem('eyes-color');
var fireballWrapInput = setupWizardForm.elements.namedItem('fireball-color');
var setupFireballWrap = document.querySelector('.setup-fireball-wrap');
var onSetupFireballWrapClick = function() {
  var color = getRandomItemFromArray(FIREBALLS_COLORS);
  setupFireballWrap.style.background = color;
  fireballWrapInput.value = color;
};
var onWizardEyesClick = function() {
  var color = getRandomItemFromArray(EYES_COLORS);
  wizardEyes.style.fill = color;
  wizardEyesInput.value = color;
};

wizardEyes.addEventListener('click', onWizardEyesClick);
setupFireballWrap.addEventListener('click', onSetupFireballWrapClick);
