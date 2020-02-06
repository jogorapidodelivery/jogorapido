export default class Form {
    statusColor
    _lista = []
    constructor(_cs) {
        this.statusColor = _cs
        return this
    }
    addItem = (_item) => {
        this._lista.push(_item)
    }
    getItem = (_pn) => {
        return this._lista.find(({ postName }) => postName === _pn)
    }
    getNext = (_pn) => {
        const _t = this._lista.length
        let _i = this._lista.findIndex(({ postName }) => postName === _pn);
        if (_i + 1 < _t) {
            return this._lista[_i + 1];
        }
        return undefined;
    }
    setItem = (_pn, value) => {
        const _item = this._lista.filter(({ postName }) => postName === _pn).pop()
        _item && _item.setValue && _item.setValue(value)
    }
    removeItem = (_pn) => {
        this._lista = this._lista.filter(({ postName }) => postName !== _pn)
    }
    check = (hiddenInputs = {}) => new Promise((_resolve, _reject) => {
        const { body_view:_bv, body_post:_bp, body_rsa: _br } = hiddenInputs;
        const _err = this._lista.filter(({ getValid }) => !getValid());
        if (_err.length === 0) {
            let _s = { body_view: _bv || {}, body_post: _bp || {}, body_rsa: _br || {}}
            this._lista.forEach(({ getValue, postType, postName }) => {
                if(_s[`body_${postType}`]) _s[`body_${postType}`][postName] = getValue()
            })
            _resolve(_s)
        } else {
            const _labels = _err.map(({ placeHouder, renderShakeError }, key) => {
                if (renderShakeError) renderShakeError(key * 1)
                return placeHouder.toLowerCase();
            })
            const labelsList = [..._labels]
            let labelsStr = _labels.pop()
            let _plural = _labels.length > 0 ? "s" : ""
            labelsStr = `${_labels.join(", ")}${_plural === "s" ? " e " : ""}${labelsStr}`
            _reject({labelsList, labelsStr})
        }
    })
}