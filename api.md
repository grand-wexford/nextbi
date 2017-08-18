# API Documentation

API Server: <http://{host:port}/fw/json/mdl/>
Формат запроса: <http://{host:port}/fw/json/mdl/{moduleId}/{command}?>
Пример инициализации графа: <http://192.168.50.151:8080/fw/json/mdl/101/onInit?width=600&height=800>

URL запроса состоит из:
 moduleId {number} – идентификатор модуля
 command {string} – название команды
 В GET строке передаются параметры относящиеся к модулю

Возможные значения:

```js
moduleId oneOf( 101 )
command oneOf([
    'onInit', // Инициализация
    'onFiltered', // Поиск по тексту
    'onInit',
    ])
```
