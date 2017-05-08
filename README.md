# objectStorage

## what can it do
### Allow use setitems with field of object in localstorage

## Getting Started
* setItem:
```javascript
objectStorage.setItem(object.field, value);
```
* getItem:
```javascript
objectStorage.getItem(object.field);
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
objectStorage.getType('local'); // 'local' or 'session'
```