export class c {
  // --- Internal Helpers ---

  static _safeParse(json) {
    try {
      return JSON.parse(json);
    } catch {
      return json;
    }
  }

  static _encode(value) {
    return encodeURIComponent(value);
  }

  static _decode(value) {
    return decodeURIComponent(value);
  }

  static _getExpiry(expireText) {
    let days = 1; // default: 1 day

    if (typeof expireText === 'string') {
      const match = expireText.match(/^(\d+)\s*days?$/i);
      if (match) {
        days = parseInt(match[1], 10);
      } else {
        console.warn(`[c] Invalid expiration format: "${expireText}". Using default (1 day).`);
      }
    }

    const date = new Date();
    date.setTime(date.getTime() + days * 864e5);
    return date.toUTCString();
  }

  // --- Public API ---

  static add(name, value, expireText = null) {
    const expires = this._getExpiry(expireText);
    const isComplex = typeof value === 'object';
    const storedValue = isComplex ? JSON.stringify(value) : String(value);

    document.cookie = `${name}=${this._encode(storedValue)}; expires=${expires}; path=/; SameSite=Lax`;
  }

  static get(name) {
    const nameEQ = name + '=';
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(nameEQ)) {
        const rawValue = this._decode(cookie.substring(nameEQ.length));
        return this._safeParse(rawValue); // Returns object/array/string based on content
      }
    }

    return '';
  }

  static delete(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; SameSite=Lax`;
  }
}
