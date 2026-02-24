class StorageService {
	constructor() {}

	setItem(key, value, expiryDate = null) {
		var expires = new Date();
		if (expiryDate == null) {
			expires.setTime(expires.getTime() + 24 * 60 * 60 * 1000);
		} else {
			expires = expiryDate;
		}

		localStorage.setItem(key, value);
		localStorage.setItem(key + "_expires", expires.toUTCString());
	}

	getItem(key, deserialize = false) {
		var now = new Date();
		var expiryDate = new Date();
		var expires = localStorage.getItem(key + "_expires");
		if (expires != null) {
			expiryDate = new Date(expires);

			if (expiryDate < now) {
				this.delItem(key);
				this.delItem(key + "_expires");
				return "";
			}
		}

		var item = localStorage.getItem(key);
		if (item != null && item.length > 0 && deserialize) {
			item = JSON.parse(item);
		}

		return item;
	}
	delItem(key) {
		localStorage.removeItem(key);
		localStorage.removeItem(key + "_expires");
	}
}

const localStorageService = new StorageService();
