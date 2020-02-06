export const getItemByKeys = (_obj, _like, _empty = undefined) => {
    _like = _like.split(".")
    if (_obj[_like[0]] === undefined) return _empty
    return _like.reduce((xs, x) => (xs && xs[x]) ? xs[x] : _empty, _obj)
}
export const setItemByKeys = (_obj, _likes, _value) => {
    if (typeof _likes === "string") _likes = _likes.split(".")
    const lastName = _likes !== undefined && _likes.length > 1 ? _likes.pop() : false
    for (let i = 0; i < _likes.length; i++) {
        _obj = _obj[_likes[i]] = _obj[_likes[i]] || {}
    }
    if (lastName) _obj = _obj[lastName] = _value
    return _obj
}
export const unique = (_arr, key) => {
    return _arr.filter((s1, pos, arr) => arr.findIndex((s2) => s2[key] === s1[key]) === pos)
}
export const min = (_arr, key) => {
    return _arr.reduce((_min, p) => p[key] < _min ? p[key] : _min, _arr[0][key])
}
export const max = (_arr, key) => {
    return _arr.reduce((_max, p) => p[key] > _max ? p[key] : _max, _arr[0][key])
}