(function (window) {
	/**
	 * [Store description]
	 * objectLocalstorage.setItem(object.field, value);
	 * objectLocalstorage.getItem(object.field);
	 */
	var Store = { 
		/**
		 * ------------------------------------
		 * | 对localStorage的简单封装
		 * ------------------------------------
		 */
		localGetJson: function (key) {
			var str = localStorage.getItem(key);
			try { return JSON.parse(str); } catch (e) { return str; }
		},
		localSetJson: function (key, value) { return localStorage.setItem(key, typeof value == 'object' ? JSON.stringify(value) : value); },
	};

	var objectLocalstorage = {
		setItem: function (key, value) {
			if (!key) { return ; }
			var objKey = undefined;
			var objValue = undefined;
			if (key.split('.').length > 1) { //分离对象键、值
				objKey = key.split('.')[0];
				objValue = key.split('.')[1];
				var oldValues = Store.localGetJson(objKey);
				var newValues = {};
				newValues[objValue] = value;
				for (var k in oldValues) { //克隆对象 
					newValues[k] = oldValues[k];
				}
				Store.localSetJson(objKey, newValues);
			} else {
				Store.localSetJson(key, value);
			}
		},
		getItem: function (key) {
			if (!key) { return ; }
			var objKey = undefined;
			var objValue = undefined;
			if (key.split('.').length > 1) {
				objKey = key.split('.')[0];
				objValue = key.split('.')[1];
				var values =  Store.localGetJson(objKey);
				if (!values) { 
					Store.localSetJson(objKey, {});
					return undefined;
				} else { 
					return values[objValue];
				}
			} else {
				return Store.localGetJson(key);
			}
		}
	}

	return window.objectLocalstorage = objectLocalstorage;
}) (window);