# objectStorage

## what can it do
### Allow use setitems with field of object in localstorage

## Getting Started
* setItem:
```javascript
/**
 * @param  {string} field "object.key"
 */
objectStorage.setItem(field: string, value: any);
// eg:
objectStorage.setItem('example.test', 'test');
```
* getItem:
```javascript
/**
 * @param  {string} field "object.key"
 */
objectStorage.getItem(field: string);
// eg:
objectStorage.setItem('example.test'); // 'test'
```
* switch to sessionStorage
```javascript
objectStorage.setType('session');
```
* switch to LocalStorage
```javascript
objectStorage.setType('local');
```
* get current type
```javascript
objectStorage.getType(); // 'local' or 'session'
```
