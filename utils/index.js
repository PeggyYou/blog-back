

function _deepCopy(obj) {
  // 如果是原始資料類型，直接返回
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  // 根據原始資料的類型創建新的物件或陣列
  const clone = Array.isArray(obj) ? [] : {}

  // 遞迴地拷貝每個屬性或元素
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clone[key] = _deepCopy(obj[key])
    }
  }
  return clone
}

module.exports = {
  deepCopy(obj) {
    return _deepCopy(obj)
  }
}