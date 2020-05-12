import {Platform} from 'react-native';
import {normalize} from '@sd/uteis/NumberUteis';
const {font, cor, size, spaces} = require('@root/app.json');
export const space = {
  p1: normalize(5), // extra pequeno
  p2: normalize(10), // pequeno
  m1: normalize(20), // extra medio
  m2: normalize(15), // medio
  g1: normalize(30), // grande
  g2: normalize(35), // extra grande
};

const _n = _s => {
  if (_s === undefined) {
    return {};
  }
  if (typeof _s === 'string' || typeof _s === 'number') {
    const t = normalize(space[_s] || _s);
    const l = t;
    const r = t;
    const b = t;
    return {t, l, b, r};
  } else {
    const {t, l, b, r} = _s;
    return {
      ...(t && {t: normalize(space[t] || t)}),
      ...(l && {l: normalize(space[l] || l)}),
      ...(r && {r: normalize(space[r] || r)}),
      ...(b && {b: normalize(space[b] || b)}),
    };
  }
};
const _ta = {
  c: 'center',
  r: 'right',
  l: 'left',
};
const _fd = {
  r: 'row',
  c: 'column',
};
const ai = {
  c: 'center',
  s: 'flex-start',
  e: 'flex-end',
};
const jc = {
  ...ai,
  sb: 'space-between',
  sa: 'space-around',
};
const _pos = {
  a: 'absolute',
  r: 'relative',
};
const _actions = {
  jc: (_styl, _s) => {
    _styl.justifyContent = jc[_s];
  },
  ai: (_styl, _s) => {
    _styl.alignItems = jc[_s];
  },
  as: (_styl, _s) => {
    _styl.alignSelf = ai[_s];
  },
  fd: (_styl, _s) => {
    _styl.flexDirection = _fd[_s];
  },
  pos: (_styl, _s) => {
    _styl.position = _pos[_s];
  },
  scale: (_styl, _s) => {
    _styl.width = normalize(_s);
    _styl.height = normalize(_s);
  },
  p: (_styl, _s) => {
    const {t, l, b, r} = _n(_s);
    if (t) {
      _styl.paddingTop = t;
    }
    if (r) {
      _styl.paddingRight = t;
    }
    if (b) {
      _styl.paddingBottom = b;
    }
    if (l) {
      _styl.paddingLeft = l;
    }
  },
  m: (_styl, _s) => {
    const {t, l, b, r} = _n(_s);
    if (t) {
      _styl.marginTop = t;
    }
    if (r) {
      _styl.marginRight = t;
    }
    if (b) {
      _styl.marginBottom = b;
    }
    if (l) {
      _styl.marginLeft = l;
    }
  },
  font: (_styl, _f) => {
    const {fs, c, fw, lh, td, ta} = {
      ta: 'l',
      fs: 'p1',
      c: 3,
      fw: 'normal',
      ...(_f && _f),
    };
    if (fs) {
      _styl.fontSize = size[fs] || normalize(fs);
    }
    if (c) {
      _styl.color = cor[c] || c;
    }
    if (fw) {
      _styl.fontWeight = fw;
    } // enum('normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900'),
    if (lh) {
      _styl.lineHeight = size[lh] || normalize(lh);
    }
    if (ta) {
      _styl.textAlign = _ta[ta] || ta;
    }
    if (td) {
      _styl.textDecorationLine = td;
    } // enum('none', 'underline', 'line-through', 'underline line-through')
    // fontStyle:"", //enum('normal', 'italic'),
    // fontFamily:""
  },
  border: (_styl, _s) => {
    const {tr, tl, br, bl, w, c, radius} = {radius: 0, ...(_s && _s)};
    if (c) {
      _styl.borderColor = cor[c] || c;
    }
    if (w) {
      _styl.borderWidth = normalize(space[w] || w);
    }
    if (tr || radius) {
      _styl.borderTopEndRadius = normalize(space[tr] || tr || radius);
    }
    if (tl || radius) {
      _styl.borderTopLeftRadius = normalize(space[tl] || tl || radius);
    }
    if (br || radius) {
      _styl.borderBottomEndRadius = normalize(space[br] || radius || radius);
    }
    if (bl || radius) {
      _styl.borderBottomLeftRadius = normalize(space[bl] || bl || radius);
    }
  },
  t: (_styl, top) => {
    if (top) {
      _styl.top = normalize(top);
    }
  },
  l: (_styl, left) => {
    if (left) {
      _styl.left = normalize(left);
    }
  },
  r: (_styl, right) => {
    if (right) {
      _styl.right = normalize(right);
    }
  },
  b: (_styl, bottom) => {
    if (bottom) {
      _styl.bottom = normalize(bottom);
    }
  },
  w: (_styl, width) => {
    if (width) {
      _styl.width = normalize(width);
    }
  },
  h: (_styl, height) => {
    if (height) {
      _styl.height = normalize(height);
    }
  },
  bg: (_styl, c) => {
    if (c) {
      _styl.backgroundColor = cor[c] || c;
    }
  },
};
export const stylDefault = {
  bold: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
    color: cor['08'],
  },
  normal: {
    fontWeight: 'normal',
  },
  icon: {
    fontFamily: 'icomoon',
    fontSize: normalize(size['08']),
  },
  p: {
    fontFamily: font[Platform.OS],
    fontSize: normalize(size['03']),
    color: cor['20'],
    fontWeight: 'normal',
  },
  h1: {
    marginTop: normalize(spaces['03']),
    marginBottom: normalize(spaces['02']),
    textAlign: 'center',
    fontFamily: font[Platform.OS],
    fontSize: normalize(size['04']),
    color: cor['08'],
    fontWeight: 'bold',
  },
  span: {
    fontFamily: font[Platform.OS],
    fontSize: normalize(size['02']),
    color: cor['04'],
    fontWeight: 'normal',
  },
};
export const createStyle = _styles => {
  let _r = {};
  Object.keys(_styles).forEach(_v => {
    if (_actions[_v] !== undefined) {
      _actions[_v](_r, _styles[_v]);
    }
  });
  return _r;
};
