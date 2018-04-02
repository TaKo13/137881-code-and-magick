'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;
var TEXT_WIDTH = 50;
var MAX_BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var PADDING = 25;
var TEXT_X = CLOUD_X + PADDING;
var TEXT_Y = CLOUD_Y + PADDING;

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function(arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function(ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';

  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', TEXT_X, TEXT_Y);
  ctx.fillText('Список результатов:', TEXT_X, TEXT_Y + FONT_GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var barShift = i * BAR_WIDTH + i * BAR_GAP;
    var itemHeight = MAX_BAR_HEIGHT * times[i] / maxTime;
    var itemX = CLOUD_X + PADDING + barShift;
    var itemY = CLOUD_Y + CLOUD_HEIGHT - itemHeight - PADDING;

    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 128,' + Math.random() + ')';
    }

    ctx.fillRect(itemX, itemY, BAR_WIDTH, itemHeight);
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), itemX, itemY - 5);
    ctx.fillText(players[i], itemX, itemY + itemHeight + FONT_GAP);
  }
};
