(function (window) {
	/**
	 * [Store description]
	 * objectStorage.setItem(object.field, value);
	 * objectStorage.getItem(object.field);
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
		/**
		 * ------------------------------------
		 * | 对sessionStorage的简单封装
		 * ------------------------------------
		 */
		sessionGetJson: function (key) {
			var str = sessionStorage.getItem(key);
			try { return JSON.parse(str); } catch (e) { return str; }
		},
		sessionSetJson: function (key, value) { return sessionStorage.setItem(key, typeof value == 'object' ? JSON.stringify(value) : value); }

	};

	var type = 'local';

	var objectStorage = {
		setType: function (value) {
			if (value != 'local' && value != 'session') {
				throw new Error('设置了错误的type,type仅能为local or session');
			}
			type = value;
		},
		getType: function () {
			return type;
		},
		setItem: function (key, value) {
			if (!key) { return ; }
			var objKey = undefined;
			var objValue = undefined;
			if (key.split('.').length > 1) { //分离对象键、值
				objKey = key.split('.')[0];
				objValue = key.split('.')[1];
				var oldValues = Store[type + 'GetJson'](objKey);
				var newValues = {};
				for (var k in oldValues) { //克隆对象 
					newValues[k] = oldValues[k];
				}
				newValues[objValue] = value;
				Store[type + 'SetJson'](objKey, newValues);
			} else {
				Store[type + 'SetJson'](key, value);
			}
		},
		getItem: function (key) {
			if (!key) { return ; }
			var objKey = undefined;
			var objValue = undefined;
			if (key.split('.').length > 1) {
				objKey = key.split('.')[0];
				objValue = key.split('.')[1];
				var values =  Store[type + 'GetJson'](objKey);
				if (!values) { 
					Store[type + 'SetJson'](objKey, {});
					return undefined;
				} else { 
					return values[objValue];
				}
			} else {
				return Store[type + 'GetJson'](key);
			}
		}
	}

	return window.objectStorage = objectStorage;
}) (window);