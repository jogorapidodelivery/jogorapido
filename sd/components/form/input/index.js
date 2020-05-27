import React, {Component, Fragment, createRef} from 'react';
import {
  TextInput,
  View,
  Text,
  Keyboard,
  TouchableOpacity,
  Vibration,
} from 'react-native';
import * as validar from '../../../uteis/form/ValidString';
import * as mascara from '../../../uteis/form/MaskString';
import {View as ViewAnimatable} from 'react-native-animatable';
import _styl from './styl';
import _attributes from './data/attributes';
import InputDate from './partial/inputDate';
import {cor} from '@root/app.json';
export default class Input extends Component {
  static defaultProps = {
    styleName: 'padrao',
    placeHouder: '',
    postType: 'post',
    returnKeyType: 'done',
    customInput: {},
    value: '',
    min: 3,
    max: undefined,
    type: 'min',
  };
  _styleName;
  _input = createRef();
  _modal = createRef();
  _isValid = false;
  _sc;
  _wc;
  _dc;
  _bgValidate = '';
  _ViewAnimatable;
  constructor(props) {
    super(props);
    const {styleName, form, postName, postType, placeHouder} = props;
    this.state = {
      isFocus: false,
      showModal: false,
      shakeError: false,
      stylErrorAnimatable: cor[form.statusColor.disableColor || '01'],
      value: this._formatValue(),
    };
    this._validValue();
    const {value} = this.state;
    this._styleName = styleName;
    this._sc = cor[form.statusColor.successColor || '01'];
    this._wc = cor[form.statusColor.warnColor || '01'];
    this._dc = cor[form.statusColor.disableColor || '01'];
    this._bgValidate =
      value.length === 0 ? this._dc : this._isValid ? this._sc : this._wc;
    if (form && form.addItem) {
      form.addItem({
        getValue: this._getValue,
        setValue: this._setValue,
        setFocus: this.focus,
        getValid: this._getValid,
        setValid: this._setValid,
        renderShakeError: this._shakeError,
        postName,
        postType,
        placeHouder,
      });
    }
  }
  _shakeError = _delay => {
    Vibration.vibrate(100);
    this.setState({stylErrorAnimatable: this._wc}, () => {
      this._ViewAnimatable.animate('shake', undefined, _delay);
    });
  };
  _formatValue(_str = undefined) {
    if (_str === undefined) {
      _str = this.props.value;
    }
    const {type} = this.props;
    if (type === 'data') {
      return InputDate.tratarDados({value: _str, ...this.props}).valueRender;
    }
    return mascara[type] ? mascara[type](_str) : _str;
  }
  componentWillUnmount() {
    const {form, postName} = this.props;
    if (form && form.removeItem) {
      form.removeItem(postName);
    }
  }
  _formatText = _txt => {
    let {isFocus} = this.state;
    const {max, postName, form, onSubmit} = this.props;
    const value = this._validarEFormatar(_txt);
    if (form && form.getNext && max !== undefined && value.length >= max) {
      isFocus = false;
      const next = form.getNext(postName);
      if (next === undefined) {
        (onSubmit || Keyboard.dismiss)();
      } else if (next.setFocus !== undefined) {
        next.setFocus();
      }
    }
    this.setState({value, isFocus});
    return value;
  };
  _getValue = () => {
    return this.state.value;
  };
  _setValue = value => {
    const {type} = this.props;
    if (type === 'data') {
      this._modal && this._modal.current && this._modal.current.setValue(value);
    } else {
      this.setState({value});
    }
  };
  _getValid = () => {
    return this._isValid;
  };
  _setValid = bln => {
    const {value} = this.state;
    this._isValid = bln;
    this._bgValidate =
      value.length === 0 ? this._dc : this._isValid ? this._sc : this._wc;
    this.setState({value: `${value}`});
  };
  _validValue(_str = undefined) {
    if (_str === undefined) {
      _str = this.props.value || '';
    }
    const {type, min, compare, form} = this.props;
    if (validar[type]) {
      let args = [_str];
      if (type === 'min') {
        args.push(min || 3);
      }
      this._isValid = validar[type].apply(undefined, args);
      if (this._isValid && compare && form && form.getItem) {
        const _domCompare = form.getItem(compare);
        if (_domCompare) {
          this._isValid = _domCompare.getValue() === _str;
          _domCompare.setValid(this._isValid);
        }
      }
    } else {
      this._isValid = false;
    }
  }
  _renderIcon(_action) {
    const {stylWarpIcon, stylTextIcon} = _styl[this._styleName];
    const {value, styl, color, onPress} = this.props[_action] || {};
    return value ? (
      <TouchableOpacity onPress={onPress} style={stylWarpIcon}>
        <Text style={[stylTextIcon, {color: cor[color]}, styl]}>{value}</Text>
      </TouchableOpacity>
    ) : (
      <Fragment />
    );
  }
  _blur = () => {
    this.setState({isFocus: false, stylErrorAnimatable: this._dc});
  };
  _focus = () => {
    this.setState({isFocus: true, stylErrorAnimatable: this._dc});
  };

  _validarEFormatar = _txt => {
    this._validValue(_txt);
    const value = this._formatValue(_txt);
    this._bgValidate =
      value.length === 0 ? this._dc : this._isValid ? this._sc : this._wc;
    return value;
  };
  get _renderItem() {
    const {
      disabled,
      returnKeyType,
      onSubmit,
      placeHouder,
      type,
      max,
    } = this.props;
    const {
      stylWarpInput,
      stylTextInput,
      stylLavel,
      stylWarpWarning,
      stylBlobWarning,
    } = _styl[this._styleName];
    const {isFocus, value, stylErrorAnimatable} = this.state;
    const backgroundColor = this._bgValidate;
    let _attr = _attributes(type || '');
    if (max !== undefined) {
      _attr.maxLength = max;
    }
    return (
      <Fragment>
        {this._renderIcon('leftIcon')}
        {(isFocus || value.length > 0) && (
          <View style={stylWarpWarning}>
            <View style={[stylBlobWarning, {backgroundColor}]} />
          </View>
        )}
        <View style={stylWarpInput}>
          {(isFocus || value.length > 0) && placeHouder !== '' && (
            <Text style={stylLavel}>{placeHouder}</Text>
          )}
          <TextInput
            ref={this._input}
            {..._attr}
            placeholderTextColor={
              stylErrorAnimatable ? stylErrorAnimatable : this._dc
            }
            style={[
              stylTextInput,
              stylErrorAnimatable && {color: stylErrorAnimatable || 'gray'},
            ]}
            editable={!disabled}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmit || Keyboard.dismiss}
            defaultValue={value}
            onFocus={this._focus}
            onBlur={this._blur}
            onChangeText={this._formatText}
            pointerEvents={type === 'data' ? 'none' : 'auto'}
            placeholder={isFocus ? '' : placeHouder}
          />
        </View>
        {this._renderIcon('rightIcon')}
      </Fragment>
    );
  }
  // formato de banco de dados yyyy-dd-mm
  _pressModal = showModal => {
    let {value} = this.state;
    this._validarEFormatar(value);
    this.setState({showModal, value});
  };
  _dateChange = value => {
    this._validarEFormatar(value);
    this.setState({value});
  };
  _data = () => {
    const {customInput} = this.props;
    const {showModal, value} = this.state;
    return (
      <InputDate
        ref={this._modal}
        onCloseModal={this._pressModal.bind(this, false)}
        showModal={showModal}
        value={value}
        customInput={customInput}
        onChante={this._dateChange}
      />
    );
  };
  get _renderTouchable() {
    const {style} = this.props;
    const {stylContainer} = _styl[this._styleName];
    const {type} = this.props;
    return (
      <Fragment>
        {this[`_${type}`] && this[`_${type}`]()}
        <TouchableOpacity
          style={[stylContainer, style]}
          onPress={this._pressModal.bind(this, true)}>
          {this._renderItem}
        </TouchableOpacity>
      </Fragment>
    );
  }
  get _renderDef() {
    const {underline, style} = this.props;
    const {stylErrorAnimatable} = this.state;
    const {stylContainer, stylInderline, stylWarpConteiner} = _styl[
      this._styleName
    ];
    return (
      <View style={[stylContainer, style]}>
        <View style={stylWarpConteiner}>{this._renderItem}</View>
        {underline && (
          <View
            style={[
              stylInderline,
              {
                backgroundColor: stylErrorAnimatable
                  ? stylErrorAnimatable
                  : cor[underline.color],
              },
            ]}
          />
        )}
      </View>
    );
  }
  focus = () => {
    this._input.current.focus();
  };
  render() {
    const {type} = this.props;
    return (
      <ViewAnimatable
        useNativeDriver={true}
        ref={_ref => (this._ViewAnimatable = _ref)}>
        {type === 'data' ? this._renderTouchable : this._renderDef}
      </ViewAnimatable>
    );
  }
}
