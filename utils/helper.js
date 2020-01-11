'use strict';

class Helper {
  static isDefined (value) {
    return typeof value !== 'undefined' && value !== null
  }

  static isNull (value) {
    return !Helper.isDefined(value)
  }

  static isNotEmpty (value) {
    return !Helper.isEmpty(value)
  }

  static isEmpty (obj) {
    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== 'object') return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) return false
    }

    return true
  }

  static isEquals (a, b) {
    // Create arrays of property names
    let aProps = Object.getOwnPropertyNames(a);
    let bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length !== bProps.length) {
      return false
    }

    for (let i = 0; i < aProps.length; i++) {
      let propName = aProps[i];

      // If values of same property are not equal,
      // objects are not equivalent
      if (a[propName] !== b[propName]) {
        return false
      }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true
  }

  static getValue (value, defValue) {
    return Helper.isDefined(value) ? value : (Helper.isDefined(defValue) ? defValue : null)
  }

  static getNotEmptyValue (value, defValue) {
    let valueString = Helper.isDefined(value) ? value.toString() : null;
    let defValueString = Helper.isDefined(defValue) ? defValue.toString() : null;
    return Helper.isNotEmpty(valueString) ? value : (Helper.isNotEmpty(defValueString) ? defValue : null)
  }

  static cloneObj (obj) {
    let result = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        result[key] = obj[key]
      }
    }
    return result
  }

  static isInteger (num) {
    return (num ^ 0) === num
  }

  static getCaseInsensitiveAttr (obj, key, defValue = null) {
    let caseInsensitiveObj = Object.keys(obj).reduce((c, k) => {
      c[k.toLowerCase()] = obj[k];
      return c
    }, {});

    return this.getValue(caseInsensitiveObj[key.toLowerCase()], defValue)
  }
}

export default Helper
