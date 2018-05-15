'use strict';

(function() {
  var GET_URL = 'https://js.dump.academy/code-and-magick/data';
  var POST_URL = 'https://js.dump.academy/code-and-magick';
  var TIMEOUT_IN_MS = 10000;

  var createRequest = function(method, url) {
    return function(onLoad, onError, data) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function() {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function() {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function() {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT_IN_MS;

      xhr.open(method, url);
      xhr.send(data);
    };
  };

  var load = createRequest('GET', GET_URL);
  var save = createRequest('POST', POST_URL);

  window.backend = {
    load: load,
    save: save
  };
})();
