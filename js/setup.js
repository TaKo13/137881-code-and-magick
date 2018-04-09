'use  strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document
  .querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');

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
