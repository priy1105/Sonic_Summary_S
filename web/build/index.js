function zf(u, p) {
  for (var s = 0; s < p.length; s++) {
    const y = p[s];
    if (typeof y != "string" && !Array.isArray(y)) {
      for (const w in y)
        if (w !== "default" && !(w in u)) {
          const x = Object.getOwnPropertyDescriptor(y, w);
          x && Object.defineProperty(u, w, x.get ? x : {
            enumerable: !0,
            get: () => y[w]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(u, Symbol.toStringTag, { value: "Module" }));
}
function jf(u) {
  return u && u.__esModule && Object.prototype.hasOwnProperty.call(u, "default") ? u.default : u;
}
var Fi = { exports: {} }, zr = {}, Ai = { exports: {} }, Z = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Xa;
function Pf() {
  if (Xa) return Z;
  Xa = 1;
  var u = Symbol.for("react.element"), p = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), w = Symbol.for("react.profiler"), x = Symbol.for("react.provider"), z = Symbol.for("react.context"), _ = Symbol.for("react.forward_ref"), L = Symbol.for("react.suspense"), $ = Symbol.for("react.memo"), G = Symbol.for("react.lazy"), H = Symbol.iterator;
  function W(f) {
    return f === null || typeof f != "object" ? null : (f = H && f[H] || f["@@iterator"], typeof f == "function" ? f : null);
  }
  var oe = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, ee = Object.assign, A = {};
  function D(f, S, X) {
    this.props = f, this.context = S, this.refs = A, this.updater = X || oe;
  }
  D.prototype.isReactComponent = {}, D.prototype.setState = function(f, S) {
    if (typeof f != "object" && typeof f != "function" && f != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, f, S, "setState");
  }, D.prototype.forceUpdate = function(f) {
    this.updater.enqueueForceUpdate(this, f, "forceUpdate");
  };
  function se() {
  }
  se.prototype = D.prototype;
  function de(f, S, X) {
    this.props = f, this.context = S, this.refs = A, this.updater = X || oe;
  }
  var B = de.prototype = new se();
  B.constructor = de, ee(B, D.prototype), B.isPureReactComponent = !0;
  var K = Array.isArray, ge = Object.prototype.hasOwnProperty, ke = { current: null }, Te = { key: !0, ref: !0, __self: !0, __source: !0 };
  function $e(f, S, X) {
    var J, te = {}, ne = null, ae = null;
    if (S != null) for (J in S.ref !== void 0 && (ae = S.ref), S.key !== void 0 && (ne = "" + S.key), S) ge.call(S, J) && !Te.hasOwnProperty(J) && (te[J] = S[J]);
    var ie = arguments.length - 2;
    if (ie === 1) te.children = X;
    else if (1 < ie) {
      for (var ve = Array(ie), qe = 0; qe < ie; qe++) ve[qe] = arguments[qe + 2];
      te.children = ve;
    }
    if (f && f.defaultProps) for (J in ie = f.defaultProps, ie) te[J] === void 0 && (te[J] = ie[J]);
    return { $$typeof: u, type: f, key: ne, ref: ae, props: te, _owner: ke.current };
  }
  function lt(f, S) {
    return { $$typeof: u, type: f.type, key: S, ref: f.ref, props: f.props, _owner: f._owner };
  }
  function Ze(f) {
    return typeof f == "object" && f !== null && f.$$typeof === u;
  }
  function dt(f) {
    var S = { "=": "=0", ":": "=2" };
    return "$" + f.replace(/[=:]/g, function(X) {
      return S[X];
    });
  }
  var q = /\/+/g;
  function Ie(f, S) {
    return typeof f == "object" && f !== null && f.key != null ? dt("" + f.key) : S.toString(36);
  }
  function De(f, S, X, J, te) {
    var ne = typeof f;
    (ne === "undefined" || ne === "boolean") && (f = null);
    var ae = !1;
    if (f === null) ae = !0;
    else switch (ne) {
      case "string":
      case "number":
        ae = !0;
        break;
      case "object":
        switch (f.$$typeof) {
          case u:
          case p:
            ae = !0;
        }
    }
    if (ae) return ae = f, te = te(ae), f = J === "" ? "." + Ie(ae, 0) : J, K(te) ? (X = "", f != null && (X = f.replace(q, "$&/") + "/"), De(te, S, X, "", function(qe) {
      return qe;
    })) : te != null && (Ze(te) && (te = lt(te, X + (!te.key || ae && ae.key === te.key ? "" : ("" + te.key).replace(q, "$&/") + "/") + f)), S.push(te)), 1;
    if (ae = 0, J = J === "" ? "." : J + ":", K(f)) for (var ie = 0; ie < f.length; ie++) {
      ne = f[ie];
      var ve = J + Ie(ne, ie);
      ae += De(ne, S, X, ve, te);
    }
    else if (ve = W(f), typeof ve == "function") for (f = ve.call(f), ie = 0; !(ne = f.next()).done; ) ne = ne.value, ve = J + Ie(ne, ie++), ae += De(ne, S, X, ve, te);
    else if (ne === "object") throw S = String(f), Error("Objects are not valid as a React child (found: " + (S === "[object Object]" ? "object with keys {" + Object.keys(f).join(", ") + "}" : S) + "). If you meant to render a collection of children, use an array instead.");
    return ae;
  }
  function Je(f, S, X) {
    if (f == null) return f;
    var J = [], te = 0;
    return De(f, J, "", "", function(ne) {
      return S.call(X, ne, te++);
    }), J;
  }
  function _e(f) {
    if (f._status === -1) {
      var S = f._result;
      S = S(), S.then(function(X) {
        (f._status === 0 || f._status === -1) && (f._status = 1, f._result = X);
      }, function(X) {
        (f._status === 0 || f._status === -1) && (f._status = 2, f._result = X);
      }), f._status === -1 && (f._status = 0, f._result = S);
    }
    if (f._status === 1) return f._result.default;
    throw f._result;
  }
  var fe = { current: null }, j = { transition: null }, F = { ReactCurrentDispatcher: fe, ReactCurrentBatchConfig: j, ReactCurrentOwner: ke };
  function R() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return Z.Children = { map: Je, forEach: function(f, S, X) {
    Je(f, function() {
      S.apply(this, arguments);
    }, X);
  }, count: function(f) {
    var S = 0;
    return Je(f, function() {
      S++;
    }), S;
  }, toArray: function(f) {
    return Je(f, function(S) {
      return S;
    }) || [];
  }, only: function(f) {
    if (!Ze(f)) throw Error("React.Children.only expected to receive a single React element child.");
    return f;
  } }, Z.Component = D, Z.Fragment = s, Z.Profiler = w, Z.PureComponent = de, Z.StrictMode = y, Z.Suspense = L, Z.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = F, Z.act = R, Z.cloneElement = function(f, S, X) {
    if (f == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + f + ".");
    var J = ee({}, f.props), te = f.key, ne = f.ref, ae = f._owner;
    if (S != null) {
      if (S.ref !== void 0 && (ne = S.ref, ae = ke.current), S.key !== void 0 && (te = "" + S.key), f.type && f.type.defaultProps) var ie = f.type.defaultProps;
      for (ve in S) ge.call(S, ve) && !Te.hasOwnProperty(ve) && (J[ve] = S[ve] === void 0 && ie !== void 0 ? ie[ve] : S[ve]);
    }
    var ve = arguments.length - 2;
    if (ve === 1) J.children = X;
    else if (1 < ve) {
      ie = Array(ve);
      for (var qe = 0; qe < ve; qe++) ie[qe] = arguments[qe + 2];
      J.children = ie;
    }
    return { $$typeof: u, type: f.type, key: te, ref: ne, props: J, _owner: ae };
  }, Z.createContext = function(f) {
    return f = { $$typeof: z, _currentValue: f, _currentValue2: f, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, f.Provider = { $$typeof: x, _context: f }, f.Consumer = f;
  }, Z.createElement = $e, Z.createFactory = function(f) {
    var S = $e.bind(null, f);
    return S.type = f, S;
  }, Z.createRef = function() {
    return { current: null };
  }, Z.forwardRef = function(f) {
    return { $$typeof: _, render: f };
  }, Z.isValidElement = Ze, Z.lazy = function(f) {
    return { $$typeof: G, _payload: { _status: -1, _result: f }, _init: _e };
  }, Z.memo = function(f, S) {
    return { $$typeof: $, type: f, compare: S === void 0 ? null : S };
  }, Z.startTransition = function(f) {
    var S = j.transition;
    j.transition = {};
    try {
      f();
    } finally {
      j.transition = S;
    }
  }, Z.unstable_act = R, Z.useCallback = function(f, S) {
    return fe.current.useCallback(f, S);
  }, Z.useContext = function(f) {
    return fe.current.useContext(f);
  }, Z.useDebugValue = function() {
  }, Z.useDeferredValue = function(f) {
    return fe.current.useDeferredValue(f);
  }, Z.useEffect = function(f, S) {
    return fe.current.useEffect(f, S);
  }, Z.useId = function() {
    return fe.current.useId();
  }, Z.useImperativeHandle = function(f, S, X) {
    return fe.current.useImperativeHandle(f, S, X);
  }, Z.useInsertionEffect = function(f, S) {
    return fe.current.useInsertionEffect(f, S);
  }, Z.useLayoutEffect = function(f, S) {
    return fe.current.useLayoutEffect(f, S);
  }, Z.useMemo = function(f, S) {
    return fe.current.useMemo(f, S);
  }, Z.useReducer = function(f, S, X) {
    return fe.current.useReducer(f, S, X);
  }, Z.useRef = function(f) {
    return fe.current.useRef(f);
  }, Z.useState = function(f) {
    return fe.current.useState(f);
  }, Z.useSyncExternalStore = function(f, S, X) {
    return fe.current.useSyncExternalStore(f, S, X);
  }, Z.useTransition = function() {
    return fe.current.useTransition();
  }, Z.version = "18.3.1", Z;
}
var Za;
function qi() {
  return Za || (Za = 1, Ai.exports = Pf()), Ai.exports;
}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ja;
function Rf() {
  if (Ja) return zr;
  Ja = 1;
  var u = qi(), p = Symbol.for("react.element"), s = Symbol.for("react.fragment"), y = Object.prototype.hasOwnProperty, w = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, x = { key: !0, ref: !0, __self: !0, __source: !0 };
  function z(_, L, $) {
    var G, H = {}, W = null, oe = null;
    $ !== void 0 && (W = "" + $), L.key !== void 0 && (W = "" + L.key), L.ref !== void 0 && (oe = L.ref);
    for (G in L) y.call(L, G) && !x.hasOwnProperty(G) && (H[G] = L[G]);
    if (_ && _.defaultProps) for (G in L = _.defaultProps, L) H[G] === void 0 && (H[G] = L[G]);
    return { $$typeof: p, type: _, key: W, ref: oe, props: H, _owner: w.current };
  }
  return zr.Fragment = s, zr.jsx = z, zr.jsxs = z, zr;
}
var qa;
function Lf() {
  return qa || (qa = 1, Fi.exports = Rf()), Fi.exports;
}
var v = Lf(), $l = {}, Ui = { exports: {} }, Xe = {}, Vi = { exports: {} }, $i = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ba;
function Tf() {
  return ba || (ba = 1, (function(u) {
    function p(j, F) {
      var R = j.length;
      j.push(F);
      e: for (; 0 < R; ) {
        var f = R - 1 >>> 1, S = j[f];
        if (0 < w(S, F)) j[f] = F, j[R] = S, R = f;
        else break e;
      }
    }
    function s(j) {
      return j.length === 0 ? null : j[0];
    }
    function y(j) {
      if (j.length === 0) return null;
      var F = j[0], R = j.pop();
      if (R !== F) {
        j[0] = R;
        e: for (var f = 0, S = j.length, X = S >>> 1; f < X; ) {
          var J = 2 * (f + 1) - 1, te = j[J], ne = J + 1, ae = j[ne];
          if (0 > w(te, R)) ne < S && 0 > w(ae, te) ? (j[f] = ae, j[ne] = R, f = ne) : (j[f] = te, j[J] = R, f = J);
          else if (ne < S && 0 > w(ae, R)) j[f] = ae, j[ne] = R, f = ne;
          else break e;
        }
      }
      return F;
    }
    function w(j, F) {
      var R = j.sortIndex - F.sortIndex;
      return R !== 0 ? R : j.id - F.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var x = performance;
      u.unstable_now = function() {
        return x.now();
      };
    } else {
      var z = Date, _ = z.now();
      u.unstable_now = function() {
        return z.now() - _;
      };
    }
    var L = [], $ = [], G = 1, H = null, W = 3, oe = !1, ee = !1, A = !1, D = typeof setTimeout == "function" ? setTimeout : null, se = typeof clearTimeout == "function" ? clearTimeout : null, de = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function B(j) {
      for (var F = s($); F !== null; ) {
        if (F.callback === null) y($);
        else if (F.startTime <= j) y($), F.sortIndex = F.expirationTime, p(L, F);
        else break;
        F = s($);
      }
    }
    function K(j) {
      if (A = !1, B(j), !ee) if (s(L) !== null) ee = !0, _e(ge);
      else {
        var F = s($);
        F !== null && fe(K, F.startTime - j);
      }
    }
    function ge(j, F) {
      ee = !1, A && (A = !1, se($e), $e = -1), oe = !0;
      var R = W;
      try {
        for (B(F), H = s(L); H !== null && (!(H.expirationTime > F) || j && !dt()); ) {
          var f = H.callback;
          if (typeof f == "function") {
            H.callback = null, W = H.priorityLevel;
            var S = f(H.expirationTime <= F);
            F = u.unstable_now(), typeof S == "function" ? H.callback = S : H === s(L) && y(L), B(F);
          } else y(L);
          H = s(L);
        }
        if (H !== null) var X = !0;
        else {
          var J = s($);
          J !== null && fe(K, J.startTime - F), X = !1;
        }
        return X;
      } finally {
        H = null, W = R, oe = !1;
      }
    }
    var ke = !1, Te = null, $e = -1, lt = 5, Ze = -1;
    function dt() {
      return !(u.unstable_now() - Ze < lt);
    }
    function q() {
      if (Te !== null) {
        var j = u.unstable_now();
        Ze = j;
        var F = !0;
        try {
          F = Te(!0, j);
        } finally {
          F ? Ie() : (ke = !1, Te = null);
        }
      } else ke = !1;
    }
    var Ie;
    if (typeof de == "function") Ie = function() {
      de(q);
    };
    else if (typeof MessageChannel < "u") {
      var De = new MessageChannel(), Je = De.port2;
      De.port1.onmessage = q, Ie = function() {
        Je.postMessage(null);
      };
    } else Ie = function() {
      D(q, 0);
    };
    function _e(j) {
      Te = j, ke || (ke = !0, Ie());
    }
    function fe(j, F) {
      $e = D(function() {
        j(u.unstable_now());
      }, F);
    }
    u.unstable_IdlePriority = 5, u.unstable_ImmediatePriority = 1, u.unstable_LowPriority = 4, u.unstable_NormalPriority = 3, u.unstable_Profiling = null, u.unstable_UserBlockingPriority = 2, u.unstable_cancelCallback = function(j) {
      j.callback = null;
    }, u.unstable_continueExecution = function() {
      ee || oe || (ee = !0, _e(ge));
    }, u.unstable_forceFrameRate = function(j) {
      0 > j || 125 < j ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : lt = 0 < j ? Math.floor(1e3 / j) : 5;
    }, u.unstable_getCurrentPriorityLevel = function() {
      return W;
    }, u.unstable_getFirstCallbackNode = function() {
      return s(L);
    }, u.unstable_next = function(j) {
      switch (W) {
        case 1:
        case 2:
        case 3:
          var F = 3;
          break;
        default:
          F = W;
      }
      var R = W;
      W = F;
      try {
        return j();
      } finally {
        W = R;
      }
    }, u.unstable_pauseExecution = function() {
    }, u.unstable_requestPaint = function() {
    }, u.unstable_runWithPriority = function(j, F) {
      switch (j) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          j = 3;
      }
      var R = W;
      W = j;
      try {
        return F();
      } finally {
        W = R;
      }
    }, u.unstable_scheduleCallback = function(j, F, R) {
      var f = u.unstable_now();
      switch (typeof R == "object" && R !== null ? (R = R.delay, R = typeof R == "number" && 0 < R ? f + R : f) : R = f, j) {
        case 1:
          var S = -1;
          break;
        case 2:
          S = 250;
          break;
        case 5:
          S = 1073741823;
          break;
        case 4:
          S = 1e4;
          break;
        default:
          S = 5e3;
      }
      return S = R + S, j = { id: G++, callback: F, priorityLevel: j, startTime: R, expirationTime: S, sortIndex: -1 }, R > f ? (j.sortIndex = R, p($, j), s(L) === null && j === s($) && (A ? (se($e), $e = -1) : A = !0, fe(K, R - f))) : (j.sortIndex = S, p(L, j), ee || oe || (ee = !0, _e(ge))), j;
    }, u.unstable_shouldYield = dt, u.unstable_wrapCallback = function(j) {
      var F = W;
      return function() {
        var R = W;
        W = F;
        try {
          return j.apply(this, arguments);
        } finally {
          W = R;
        }
      };
    };
  })($i)), $i;
}
var ec;
function Mf() {
  return ec || (ec = 1, Vi.exports = Tf()), Vi.exports;
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var tc;
function Of() {
  if (tc) return Xe;
  tc = 1;
  var u = qi(), p = Mf();
  function s(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var y = /* @__PURE__ */ new Set(), w = {};
  function x(e, t) {
    z(e, t), z(e + "Capture", t);
  }
  function z(e, t) {
    for (w[e] = t, e = 0; e < t.length; e++) y.add(t[e]);
  }
  var _ = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), L = Object.prototype.hasOwnProperty, $ = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, G = {}, H = {};
  function W(e) {
    return L.call(H, e) ? !0 : L.call(G, e) ? !1 : $.test(e) ? H[e] = !0 : (G[e] = !0, !1);
  }
  function oe(e, t, n, r) {
    if (n !== null && n.type === 0) return !1;
    switch (typeof t) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
      default:
        return !1;
    }
  }
  function ee(e, t, n, r) {
    if (t === null || typeof t > "u" || oe(e, t, n, r)) return !0;
    if (r) return !1;
    if (n !== null) switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
    return !1;
  }
  function A(e, t, n, r, l, o, i) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = i;
  }
  var D = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    D[e] = new A(e, 0, !1, e, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    D[t] = new A(t, 1, !1, e[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    D[e] = new A(e, 2, !1, e.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    D[e] = new A(e, 2, !1, e, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    D[e] = new A(e, 3, !1, e.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(e) {
    D[e] = new A(e, 3, !0, e, null, !1, !1);
  }), ["capture", "download"].forEach(function(e) {
    D[e] = new A(e, 4, !1, e, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(e) {
    D[e] = new A(e, 6, !1, e, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(e) {
    D[e] = new A(e, 5, !1, e.toLowerCase(), null, !1, !1);
  });
  var se = /[\-:]([a-z])/g;
  function de(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(
      se,
      de
    );
    D[t] = new A(t, 1, !1, e, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(se, de);
    D[t] = new A(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(se, de);
    D[t] = new A(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    D[e] = new A(e, 1, !1, e.toLowerCase(), null, !1, !1);
  }), D.xlinkHref = new A("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(e) {
    D[e] = new A(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
  function B(e, t, n, r) {
    var l = D.hasOwnProperty(t) ? D[t] : null;
    (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (ee(t, n, l, r) && (n = null), r || l === null ? W(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
  }
  var K = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, ge = Symbol.for("react.element"), ke = Symbol.for("react.portal"), Te = Symbol.for("react.fragment"), $e = Symbol.for("react.strict_mode"), lt = Symbol.for("react.profiler"), Ze = Symbol.for("react.provider"), dt = Symbol.for("react.context"), q = Symbol.for("react.forward_ref"), Ie = Symbol.for("react.suspense"), De = Symbol.for("react.suspense_list"), Je = Symbol.for("react.memo"), _e = Symbol.for("react.lazy"), fe = Symbol.for("react.offscreen"), j = Symbol.iterator;
  function F(e) {
    return e === null || typeof e != "object" ? null : (e = j && e[j] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var R = Object.assign, f;
  function S(e) {
    if (f === void 0) try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      f = t && t[1] || "";
    }
    return `
` + f + e;
  }
  var X = !1;
  function J(e, t) {
    if (!e || X) return "";
    X = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (t) if (t = function() {
        throw Error();
      }, Object.defineProperty(t.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(t, []);
        } catch (g) {
          var r = g;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (g) {
          r = g;
        }
        e.call(t.prototype);
      }
      else {
        try {
          throw Error();
        } catch (g) {
          r = g;
        }
        e();
      }
    } catch (g) {
      if (g && r && typeof g.stack == "string") {
        for (var l = g.stack.split(`
`), o = r.stack.split(`
`), i = l.length - 1, a = o.length - 1; 1 <= i && 0 <= a && l[i] !== o[a]; ) a--;
        for (; 1 <= i && 0 <= a; i--, a--) if (l[i] !== o[a]) {
          if (i !== 1 || a !== 1)
            do
              if (i--, a--, 0 > a || l[i] !== o[a]) {
                var c = `
` + l[i].replace(" at new ", " at ");
                return e.displayName && c.includes("<anonymous>") && (c = c.replace("<anonymous>", e.displayName)), c;
              }
            while (1 <= i && 0 <= a);
          break;
        }
      }
    } finally {
      X = !1, Error.prepareStackTrace = n;
    }
    return (e = e ? e.displayName || e.name : "") ? S(e) : "";
  }
  function te(e) {
    switch (e.tag) {
      case 5:
        return S(e.type);
      case 16:
        return S("Lazy");
      case 13:
        return S("Suspense");
      case 19:
        return S("SuspenseList");
      case 0:
      case 2:
      case 15:
        return e = J(e.type, !1), e;
      case 11:
        return e = J(e.type.render, !1), e;
      case 1:
        return e = J(e.type, !0), e;
      default:
        return "";
    }
  }
  function ne(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case Te:
        return "Fragment";
      case ke:
        return "Portal";
      case lt:
        return "Profiler";
      case $e:
        return "StrictMode";
      case Ie:
        return "Suspense";
      case De:
        return "SuspenseList";
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case dt:
        return (e.displayName || "Context") + ".Consumer";
      case Ze:
        return (e._context.displayName || "Context") + ".Provider";
      case q:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case Je:
        return t = e.displayName || null, t !== null ? t : ne(e.type) || "Memo";
      case _e:
        t = e._payload, e = e._init;
        try {
          return ne(e(t));
        } catch {
        }
    }
    return null;
  }
  function ae(e) {
    var t = e.type;
    switch (e.tag) {
      case 24:
        return "Cache";
      case 9:
        return (t.displayName || "Context") + ".Consumer";
      case 10:
        return (t._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return t;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return ne(t);
      case 8:
        return t === $e ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof t == "function") return t.displayName || t.name || null;
        if (typeof t == "string") return t;
    }
    return null;
  }
  function ie(e) {
    switch (typeof e) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function ve(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function qe(e) {
    var t = ve(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
      var l = n.get, o = n.set;
      return Object.defineProperty(e, t, { configurable: !0, get: function() {
        return l.call(this);
      }, set: function(i) {
        r = "" + i, o.call(this, i);
      } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
        return r;
      }, setValue: function(i) {
        r = "" + i;
      }, stopTracking: function() {
        e._valueTracker = null, delete e[t];
      } };
    }
  }
  function Lr(e) {
    e._valueTracker || (e._valueTracker = qe(e));
  }
  function tu(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(), r = "";
    return e && (r = ve(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
  }
  function Tr(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function Bl(e, t) {
    var n = t.checked;
    return R({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
  }
  function nu(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
    n = ie(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
  }
  function ru(e, t) {
    t = t.checked, t != null && B(e, "checked", t, !1);
  }
  function Hl(e, t) {
    ru(e, t);
    var n = ie(t.value), r = t.type;
    if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
      e.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? Ql(e, t.type, n) : t.hasOwnProperty("defaultValue") && Ql(e, t.type, ie(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
  }
  function lu(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var r = t.type;
      if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
      t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
    }
    n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
  }
  function Ql(e, t, n) {
    (t !== "number" || Tr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
  }
  var Wn = Array.isArray;
  function hn(e, t, n, r) {
    if (e = e.options, t) {
      t = {};
      for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
      for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + ie(n), t = null, l = 0; l < e.length; l++) {
        if (e[l].value === n) {
          e[l].selected = !0, r && (e[l].defaultSelected = !0);
          return;
        }
        t !== null || e[l].disabled || (t = e[l]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Gl(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(s(91));
    return R({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
  }
  function ou(e, t) {
    var n = t.value;
    if (n == null) {
      if (n = t.children, t = t.defaultValue, n != null) {
        if (t != null) throw Error(s(92));
        if (Wn(n)) {
          if (1 < n.length) throw Error(s(93));
          n = n[0];
        }
        t = n;
      }
      t == null && (t = ""), n = t;
    }
    e._wrapperState = { initialValue: ie(n) };
  }
  function iu(e, t) {
    var n = ie(t.value), r = ie(t.defaultValue);
    n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
  }
  function uu(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
  }
  function su(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Kl(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? su(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
  }
  var Mr, au = (function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, n, r, l);
      });
    } : e;
  })(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
    else {
      for (Mr = Mr || document.createElement("div"), Mr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Mr.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
  function Bn(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Hn = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  }, Rc = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Hn).forEach(function(e) {
    Rc.forEach(function(t) {
      t = t + e.charAt(0).toUpperCase() + e.substring(1), Hn[t] = Hn[e];
    });
  });
  function cu(e, t, n) {
    return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Hn.hasOwnProperty(e) && Hn[e] ? ("" + t).trim() : t + "px";
  }
  function du(e, t) {
    e = e.style;
    for (var n in t) if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0, l = cu(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
    }
  }
  var Lc = R({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function Yl(e, t) {
    if (t) {
      if (Lc[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(s(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(s(60));
        if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(s(61));
      }
      if (t.style != null && typeof t.style != "object") throw Error(s(62));
    }
  }
  function Xl(e, t) {
    if (e.indexOf("-") === -1) return typeof t.is == "string";
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Zl = null;
  function Jl(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var ql = null, gn = null, vn = null;
  function fu(e) {
    if (e = fr(e)) {
      if (typeof ql != "function") throw Error(s(280));
      var t = e.stateNode;
      t && (t = nl(t), ql(e.stateNode, e.type, t));
    }
  }
  function pu(e) {
    gn ? vn ? vn.push(e) : vn = [e] : gn = e;
  }
  function mu() {
    if (gn) {
      var e = gn, t = vn;
      if (vn = gn = null, fu(e), t) for (e = 0; e < t.length; e++) fu(t[e]);
    }
  }
  function hu(e, t) {
    return e(t);
  }
  function gu() {
  }
  var bl = !1;
  function vu(e, t, n) {
    if (bl) return e(t, n);
    bl = !0;
    try {
      return hu(e, t, n);
    } finally {
      bl = !1, (gn !== null || vn !== null) && (gu(), mu());
    }
  }
  function Qn(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var r = nl(n);
    if (r === null) return null;
    n = r[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function") throw Error(s(231, t, typeof n));
    return n;
  }
  var eo = !1;
  if (_) try {
    var Gn = {};
    Object.defineProperty(Gn, "passive", { get: function() {
      eo = !0;
    } }), window.addEventListener("test", Gn, Gn), window.removeEventListener("test", Gn, Gn);
  } catch {
    eo = !1;
  }
  function Tc(e, t, n, r, l, o, i, a, c) {
    var g = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, g);
    } catch (C) {
      this.onError(C);
    }
  }
  var Kn = !1, Or = null, Ir = !1, to = null, Mc = { onError: function(e) {
    Kn = !0, Or = e;
  } };
  function Oc(e, t, n, r, l, o, i, a, c) {
    Kn = !1, Or = null, Tc.apply(Mc, arguments);
  }
  function Ic(e, t, n, r, l, o, i, a, c) {
    if (Oc.apply(this, arguments), Kn) {
      if (Kn) {
        var g = Or;
        Kn = !1, Or = null;
      } else throw Error(s(198));
      Ir || (Ir = !0, to = g);
    }
  }
  function tn(e) {
    var t = e, n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (n = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? n : null;
  }
  function yu(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function wu(e) {
    if (tn(e) !== e) throw Error(s(188));
  }
  function Dc(e) {
    var t = e.alternate;
    if (!t) {
      if (t = tn(e), t === null) throw Error(s(188));
      return t !== e ? null : e;
    }
    for (var n = e, r = t; ; ) {
      var l = n.return;
      if (l === null) break;
      var o = l.alternate;
      if (o === null) {
        if (r = l.return, r !== null) {
          n = r;
          continue;
        }
        break;
      }
      if (l.child === o.child) {
        for (o = l.child; o; ) {
          if (o === n) return wu(l), e;
          if (o === r) return wu(l), t;
          o = o.sibling;
        }
        throw Error(s(188));
      }
      if (n.return !== r.return) n = l, r = o;
      else {
        for (var i = !1, a = l.child; a; ) {
          if (a === n) {
            i = !0, n = l, r = o;
            break;
          }
          if (a === r) {
            i = !0, r = l, n = o;
            break;
          }
          a = a.sibling;
        }
        if (!i) {
          for (a = o.child; a; ) {
            if (a === n) {
              i = !0, n = o, r = l;
              break;
            }
            if (a === r) {
              i = !0, r = o, n = l;
              break;
            }
            a = a.sibling;
          }
          if (!i) throw Error(s(189));
        }
      }
      if (n.alternate !== r) throw Error(s(190));
    }
    if (n.tag !== 3) throw Error(s(188));
    return n.stateNode.current === n ? e : t;
  }
  function xu(e) {
    return e = Dc(e), e !== null ? ku(e) : null;
  }
  function ku(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = ku(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var Su = p.unstable_scheduleCallback, Cu = p.unstable_cancelCallback, Fc = p.unstable_shouldYield, Ac = p.unstable_requestPaint, Ce = p.unstable_now, Uc = p.unstable_getCurrentPriorityLevel, no = p.unstable_ImmediatePriority, Eu = p.unstable_UserBlockingPriority, Dr = p.unstable_NormalPriority, Vc = p.unstable_LowPriority, Nu = p.unstable_IdlePriority, Fr = null, xt = null;
  function $c(e) {
    if (xt && typeof xt.onCommitFiberRoot == "function") try {
      xt.onCommitFiberRoot(Fr, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
  }
  var ft = Math.clz32 ? Math.clz32 : Hc, Wc = Math.log, Bc = Math.LN2;
  function Hc(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Wc(e) / Bc | 0) | 0;
  }
  var Ar = 64, Ur = 4194304;
  function Yn(e) {
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return e & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return e;
    }
  }
  function Vr(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var r = 0, l = e.suspendedLanes, o = e.pingedLanes, i = n & 268435455;
    if (i !== 0) {
      var a = i & ~l;
      a !== 0 ? r = Yn(a) : (o &= i, o !== 0 && (r = Yn(o)));
    } else i = n & ~l, i !== 0 ? r = Yn(i) : o !== 0 && (r = Yn(o));
    if (r === 0) return 0;
    if (t !== 0 && t !== r && (t & l) === 0 && (l = r & -r, o = t & -t, l >= o || l === 16 && (o & 4194240) !== 0)) return t;
    if ((r & 4) !== 0 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - ft(t), l = 1 << n, r |= e[n], t &= ~l;
    return r;
  }
  function Qc(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
        return t + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Gc(e, t) {
    for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
      var i = 31 - ft(o), a = 1 << i, c = l[i];
      c === -1 ? ((a & n) === 0 || (a & r) !== 0) && (l[i] = Qc(a, t)) : c <= t && (e.expiredLanes |= a), o &= ~a;
    }
  }
  function ro(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
  }
  function _u() {
    var e = Ar;
    return Ar <<= 1, (Ar & 4194240) === 0 && (Ar = 64), e;
  }
  function lo(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function Xn(e, t, n) {
    e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - ft(t), e[t] = n;
  }
  function Kc(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
      var l = 31 - ft(n), o = 1 << l;
      t[l] = 0, r[l] = -1, e[l] = -1, n &= ~o;
    }
  }
  function oo(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
      var r = 31 - ft(n), l = 1 << r;
      l & t | e[r] & t && (e[r] |= t), n &= ~l;
    }
  }
  var ue = 0;
  function zu(e) {
    return e &= -e, 1 < e ? 4 < e ? (e & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var ju, io, Pu, Ru, Lu, uo = !1, $r = [], Ot = null, It = null, Dt = null, Zn = /* @__PURE__ */ new Map(), Jn = /* @__PURE__ */ new Map(), Ft = [], Yc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function Tu(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Ot = null;
        break;
      case "dragenter":
      case "dragleave":
        It = null;
        break;
      case "mouseover":
      case "mouseout":
        Dt = null;
        break;
      case "pointerover":
      case "pointerout":
        Zn.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Jn.delete(t.pointerId);
    }
  }
  function qn(e, t, n, r, l, o) {
    return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, t !== null && (t = fr(t), t !== null && io(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
  }
  function Xc(e, t, n, r, l) {
    switch (t) {
      case "focusin":
        return Ot = qn(Ot, e, t, n, r, l), !0;
      case "dragenter":
        return It = qn(It, e, t, n, r, l), !0;
      case "mouseover":
        return Dt = qn(Dt, e, t, n, r, l), !0;
      case "pointerover":
        var o = l.pointerId;
        return Zn.set(o, qn(Zn.get(o) || null, e, t, n, r, l)), !0;
      case "gotpointercapture":
        return o = l.pointerId, Jn.set(o, qn(Jn.get(o) || null, e, t, n, r, l)), !0;
    }
    return !1;
  }
  function Mu(e) {
    var t = nn(e.target);
    if (t !== null) {
      var n = tn(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = yu(n), t !== null) {
            e.blockedOn = t, Lu(e.priority, function() {
              Pu(n);
            });
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Wr(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = ao(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var r = new n.constructor(n.type, n);
        Zl = r, n.target.dispatchEvent(r), Zl = null;
      } else return t = fr(n), t !== null && io(t), e.blockedOn = n, !1;
      t.shift();
    }
    return !0;
  }
  function Ou(e, t, n) {
    Wr(e) && n.delete(t);
  }
  function Zc() {
    uo = !1, Ot !== null && Wr(Ot) && (Ot = null), It !== null && Wr(It) && (It = null), Dt !== null && Wr(Dt) && (Dt = null), Zn.forEach(Ou), Jn.forEach(Ou);
  }
  function bn(e, t) {
    e.blockedOn === t && (e.blockedOn = null, uo || (uo = !0, p.unstable_scheduleCallback(p.unstable_NormalPriority, Zc)));
  }
  function er(e) {
    function t(l) {
      return bn(l, e);
    }
    if (0 < $r.length) {
      bn($r[0], e);
      for (var n = 1; n < $r.length; n++) {
        var r = $r[n];
        r.blockedOn === e && (r.blockedOn = null);
      }
    }
    for (Ot !== null && bn(Ot, e), It !== null && bn(It, e), Dt !== null && bn(Dt, e), Zn.forEach(t), Jn.forEach(t), n = 0; n < Ft.length; n++) r = Ft[n], r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < Ft.length && (n = Ft[0], n.blockedOn === null); ) Mu(n), n.blockedOn === null && Ft.shift();
  }
  var yn = K.ReactCurrentBatchConfig, Br = !0;
  function Jc(e, t, n, r) {
    var l = ue, o = yn.transition;
    yn.transition = null;
    try {
      ue = 1, so(e, t, n, r);
    } finally {
      ue = l, yn.transition = o;
    }
  }
  function qc(e, t, n, r) {
    var l = ue, o = yn.transition;
    yn.transition = null;
    try {
      ue = 4, so(e, t, n, r);
    } finally {
      ue = l, yn.transition = o;
    }
  }
  function so(e, t, n, r) {
    if (Br) {
      var l = ao(e, t, n, r);
      if (l === null) zo(e, t, r, Hr, n), Tu(e, r);
      else if (Xc(l, e, t, n, r)) r.stopPropagation();
      else if (Tu(e, r), t & 4 && -1 < Yc.indexOf(e)) {
        for (; l !== null; ) {
          var o = fr(l);
          if (o !== null && ju(o), o = ao(e, t, n, r), o === null && zo(e, t, r, Hr, n), o === l) break;
          l = o;
        }
        l !== null && r.stopPropagation();
      } else zo(e, t, r, null, n);
    }
  }
  var Hr = null;
  function ao(e, t, n, r) {
    if (Hr = null, e = Jl(r), e = nn(e), e !== null) if (t = tn(e), t === null) e = null;
    else if (n = t.tag, n === 13) {
      if (e = yu(t), e !== null) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
    return Hr = e, null;
  }
  function Iu(e) {
    switch (e) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (Uc()) {
          case no:
            return 1;
          case Eu:
            return 4;
          case Dr:
          case Vc:
            return 16;
          case Nu:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var At = null, co = null, Qr = null;
  function Du() {
    if (Qr) return Qr;
    var e, t = co, n = t.length, r, l = "value" in At ? At.value : At.textContent, o = l.length;
    for (e = 0; e < n && t[e] === l[e]; e++) ;
    var i = n - e;
    for (r = 1; r <= i && t[n - r] === l[o - r]; r++) ;
    return Qr = l.slice(e, 1 < r ? 1 - r : void 0);
  }
  function Gr(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Kr() {
    return !0;
  }
  function Fu() {
    return !1;
  }
  function be(e) {
    function t(n, r, l, o, i) {
      this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = i, this.currentTarget = null;
      for (var a in e) e.hasOwnProperty(a) && (n = e[a], this[a] = n ? n(o) : o[a]);
      return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? Kr : Fu, this.isPropagationStopped = Fu, this;
    }
    return R(t.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var n = this.nativeEvent;
      n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Kr);
    }, stopPropagation: function() {
      var n = this.nativeEvent;
      n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Kr);
    }, persist: function() {
    }, isPersistent: Kr }), t;
  }
  var wn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
    return e.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, fo = be(wn), tr = R({}, wn, { view: 0, detail: 0 }), bc = be(tr), po, mo, nr, Yr = R({}, tr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: go, button: 0, buttons: 0, relatedTarget: function(e) {
    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
  }, movementX: function(e) {
    return "movementX" in e ? e.movementX : (e !== nr && (nr && e.type === "mousemove" ? (po = e.screenX - nr.screenX, mo = e.screenY - nr.screenY) : mo = po = 0, nr = e), po);
  }, movementY: function(e) {
    return "movementY" in e ? e.movementY : mo;
  } }), Au = be(Yr), ed = R({}, Yr, { dataTransfer: 0 }), td = be(ed), nd = R({}, tr, { relatedTarget: 0 }), ho = be(nd), rd = R({}, wn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), ld = be(rd), od = R({}, wn, { clipboardData: function(e) {
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  } }), id = be(od), ud = R({}, wn, { data: 0 }), Uu = be(ud), sd = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, ad = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, cd = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function dd(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = cd[e]) ? !!t[e] : !1;
  }
  function go() {
    return dd;
  }
  var fd = R({}, tr, { key: function(e) {
    if (e.key) {
      var t = sd[e.key] || e.key;
      if (t !== "Unidentified") return t;
    }
    return e.type === "keypress" ? (e = Gr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? ad[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: go, charCode: function(e) {
    return e.type === "keypress" ? Gr(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? Gr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), pd = be(fd), md = R({}, Yr, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Vu = be(md), hd = R({}, tr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: go }), gd = be(hd), vd = R({}, wn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), yd = be(vd), wd = R({}, Yr, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), xd = be(wd), kd = [9, 13, 27, 32], vo = _ && "CompositionEvent" in window, rr = null;
  _ && "documentMode" in document && (rr = document.documentMode);
  var Sd = _ && "TextEvent" in window && !rr, $u = _ && (!vo || rr && 8 < rr && 11 >= rr), Wu = " ", Bu = !1;
  function Hu(e, t) {
    switch (e) {
      case "keyup":
        return kd.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Qu(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var xn = !1;
  function Cd(e, t) {
    switch (e) {
      case "compositionend":
        return Qu(t);
      case "keypress":
        return t.which !== 32 ? null : (Bu = !0, Wu);
      case "textInput":
        return e = t.data, e === Wu && Bu ? null : e;
      default:
        return null;
    }
  }
  function Ed(e, t) {
    if (xn) return e === "compositionend" || !vo && Hu(e, t) ? (e = Du(), Qr = co = At = null, xn = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return $u && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Nd = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function Gu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Nd[e.type] : t === "textarea";
  }
  function Ku(e, t, n, r) {
    pu(r), t = br(t, "onChange"), 0 < t.length && (n = new fo("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
  }
  var lr = null, or = null;
  function _d(e) {
    ds(e, 0);
  }
  function Xr(e) {
    var t = Nn(e);
    if (tu(t)) return e;
  }
  function zd(e, t) {
    if (e === "change") return t;
  }
  var Yu = !1;
  if (_) {
    var yo;
    if (_) {
      var wo = "oninput" in document;
      if (!wo) {
        var Xu = document.createElement("div");
        Xu.setAttribute("oninput", "return;"), wo = typeof Xu.oninput == "function";
      }
      yo = wo;
    } else yo = !1;
    Yu = yo && (!document.documentMode || 9 < document.documentMode);
  }
  function Zu() {
    lr && (lr.detachEvent("onpropertychange", Ju), or = lr = null);
  }
  function Ju(e) {
    if (e.propertyName === "value" && Xr(or)) {
      var t = [];
      Ku(t, or, e, Jl(e)), vu(_d, t);
    }
  }
  function jd(e, t, n) {
    e === "focusin" ? (Zu(), lr = t, or = n, lr.attachEvent("onpropertychange", Ju)) : e === "focusout" && Zu();
  }
  function Pd(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return Xr(or);
  }
  function Rd(e, t) {
    if (e === "click") return Xr(t);
  }
  function Ld(e, t) {
    if (e === "input" || e === "change") return Xr(t);
  }
  function Td(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var pt = typeof Object.is == "function" ? Object.is : Td;
  function ir(e, t) {
    if (pt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
    var n = Object.keys(e), r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
      var l = n[r];
      if (!L.call(t, l) || !pt(e[l], t[l])) return !1;
    }
    return !0;
  }
  function qu(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function bu(e, t) {
    var n = qu(e);
    e = 0;
    for (var r; n; ) {
      if (n.nodeType === 3) {
        if (r = e + n.textContent.length, e <= t && r >= t) return { node: n, offset: t - e };
        e = r;
      }
      e: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = qu(n);
    }
  }
  function es(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? es(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function ts() {
    for (var e = window, t = Tr(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = Tr(e.document);
    }
    return t;
  }
  function xo(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function Md(e) {
    var t = ts(), n = e.focusedElem, r = e.selectionRange;
    if (t !== n && n && n.ownerDocument && es(n.ownerDocument.documentElement, n)) {
      if (r !== null && xo(n)) {
        if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
        else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
          e = e.getSelection();
          var l = n.textContent.length, o = Math.min(r.start, l);
          r = r.end === void 0 ? o : Math.min(r.end, l), !e.extend && o > r && (l = r, r = o, o = l), l = bu(n, o);
          var i = bu(
            n,
            r
          );
          l && i && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== i.node || e.focusOffset !== i.offset) && (t = t.createRange(), t.setStart(l.node, l.offset), e.removeAllRanges(), o > r ? (e.addRange(t), e.extend(i.node, i.offset)) : (t.setEnd(i.node, i.offset), e.addRange(t)));
        }
      }
      for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
    }
  }
  var Od = _ && "documentMode" in document && 11 >= document.documentMode, kn = null, ko = null, ur = null, So = !1;
  function ns(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    So || kn == null || kn !== Tr(r) || (r = kn, "selectionStart" in r && xo(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), ur && ir(ur, r) || (ur = r, r = br(ko, "onSelect"), 0 < r.length && (t = new fo("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = kn)));
  }
  function Zr(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var Sn = { animationend: Zr("Animation", "AnimationEnd"), animationiteration: Zr("Animation", "AnimationIteration"), animationstart: Zr("Animation", "AnimationStart"), transitionend: Zr("Transition", "TransitionEnd") }, Co = {}, rs = {};
  _ && (rs = document.createElement("div").style, "AnimationEvent" in window || (delete Sn.animationend.animation, delete Sn.animationiteration.animation, delete Sn.animationstart.animation), "TransitionEvent" in window || delete Sn.transitionend.transition);
  function Jr(e) {
    if (Co[e]) return Co[e];
    if (!Sn[e]) return e;
    var t = Sn[e], n;
    for (n in t) if (t.hasOwnProperty(n) && n in rs) return Co[e] = t[n];
    return e;
  }
  var ls = Jr("animationend"), os = Jr("animationiteration"), is = Jr("animationstart"), us = Jr("transitionend"), ss = /* @__PURE__ */ new Map(), as = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function Ut(e, t) {
    ss.set(e, t), x(t, [e]);
  }
  for (var Eo = 0; Eo < as.length; Eo++) {
    var No = as[Eo], Id = No.toLowerCase(), Dd = No[0].toUpperCase() + No.slice(1);
    Ut(Id, "on" + Dd);
  }
  Ut(ls, "onAnimationEnd"), Ut(os, "onAnimationIteration"), Ut(is, "onAnimationStart"), Ut("dblclick", "onDoubleClick"), Ut("focusin", "onFocus"), Ut("focusout", "onBlur"), Ut(us, "onTransitionEnd"), z("onMouseEnter", ["mouseout", "mouseover"]), z("onMouseLeave", ["mouseout", "mouseover"]), z("onPointerEnter", ["pointerout", "pointerover"]), z("onPointerLeave", ["pointerout", "pointerover"]), x("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), x("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), x("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), x("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), x("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), x("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var sr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Fd = new Set("cancel close invalid load scroll toggle".split(" ").concat(sr));
  function cs(e, t, n) {
    var r = e.type || "unknown-event";
    e.currentTarget = n, Ic(r, t, void 0, e), e.currentTarget = null;
  }
  function ds(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var r = e[n], l = r.event;
      r = r.listeners;
      e: {
        var o = void 0;
        if (t) for (var i = r.length - 1; 0 <= i; i--) {
          var a = r[i], c = a.instance, g = a.currentTarget;
          if (a = a.listener, c !== o && l.isPropagationStopped()) break e;
          cs(l, a, g), o = c;
        }
        else for (i = 0; i < r.length; i++) {
          if (a = r[i], c = a.instance, g = a.currentTarget, a = a.listener, c !== o && l.isPropagationStopped()) break e;
          cs(l, a, g), o = c;
        }
      }
    }
    if (Ir) throw e = to, Ir = !1, to = null, e;
  }
  function pe(e, t) {
    var n = t[Mo];
    n === void 0 && (n = t[Mo] = /* @__PURE__ */ new Set());
    var r = e + "__bubble";
    n.has(r) || (fs(t, e, 2, !1), n.add(r));
  }
  function _o(e, t, n) {
    var r = 0;
    t && (r |= 4), fs(n, e, r, t);
  }
  var qr = "_reactListening" + Math.random().toString(36).slice(2);
  function ar(e) {
    if (!e[qr]) {
      e[qr] = !0, y.forEach(function(n) {
        n !== "selectionchange" && (Fd.has(n) || _o(n, !1, e), _o(n, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[qr] || (t[qr] = !0, _o("selectionchange", !1, t));
    }
  }
  function fs(e, t, n, r) {
    switch (Iu(t)) {
      case 1:
        var l = Jc;
        break;
      case 4:
        l = qc;
        break;
      default:
        l = so;
    }
    n = l.bind(null, t, n, e), l = void 0, !eo || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
  }
  function zo(e, t, n, r, l) {
    var o = r;
    if ((t & 1) === 0 && (t & 2) === 0 && r !== null) e: for (; ; ) {
      if (r === null) return;
      var i = r.tag;
      if (i === 3 || i === 4) {
        var a = r.stateNode.containerInfo;
        if (a === l || a.nodeType === 8 && a.parentNode === l) break;
        if (i === 4) for (i = r.return; i !== null; ) {
          var c = i.tag;
          if ((c === 3 || c === 4) && (c = i.stateNode.containerInfo, c === l || c.nodeType === 8 && c.parentNode === l)) return;
          i = i.return;
        }
        for (; a !== null; ) {
          if (i = nn(a), i === null) return;
          if (c = i.tag, c === 5 || c === 6) {
            r = o = i;
            continue e;
          }
          a = a.parentNode;
        }
      }
      r = r.return;
    }
    vu(function() {
      var g = o, C = Jl(n), E = [];
      e: {
        var k = ss.get(e);
        if (k !== void 0) {
          var P = fo, M = e;
          switch (e) {
            case "keypress":
              if (Gr(n) === 0) break e;
            case "keydown":
            case "keyup":
              P = pd;
              break;
            case "focusin":
              M = "focus", P = ho;
              break;
            case "focusout":
              M = "blur", P = ho;
              break;
            case "beforeblur":
            case "afterblur":
              P = ho;
              break;
            case "click":
              if (n.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              P = Au;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              P = td;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              P = gd;
              break;
            case ls:
            case os:
            case is:
              P = ld;
              break;
            case us:
              P = yd;
              break;
            case "scroll":
              P = bc;
              break;
            case "wheel":
              P = xd;
              break;
            case "copy":
            case "cut":
            case "paste":
              P = id;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              P = Vu;
          }
          var O = (t & 4) !== 0, Ee = !O && e === "scroll", m = O ? k !== null ? k + "Capture" : null : k;
          O = [];
          for (var d = g, h; d !== null; ) {
            h = d;
            var N = h.stateNode;
            if (h.tag === 5 && N !== null && (h = N, m !== null && (N = Qn(d, m), N != null && O.push(cr(d, N, h)))), Ee) break;
            d = d.return;
          }
          0 < O.length && (k = new P(k, M, null, n, C), E.push({ event: k, listeners: O }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (k = e === "mouseover" || e === "pointerover", P = e === "mouseout" || e === "pointerout", k && n !== Zl && (M = n.relatedTarget || n.fromElement) && (nn(M) || M[Nt])) break e;
          if ((P || k) && (k = C.window === C ? C : (k = C.ownerDocument) ? k.defaultView || k.parentWindow : window, P ? (M = n.relatedTarget || n.toElement, P = g, M = M ? nn(M) : null, M !== null && (Ee = tn(M), M !== Ee || M.tag !== 5 && M.tag !== 6) && (M = null)) : (P = null, M = g), P !== M)) {
            if (O = Au, N = "onMouseLeave", m = "onMouseEnter", d = "mouse", (e === "pointerout" || e === "pointerover") && (O = Vu, N = "onPointerLeave", m = "onPointerEnter", d = "pointer"), Ee = P == null ? k : Nn(P), h = M == null ? k : Nn(M), k = new O(N, d + "leave", P, n, C), k.target = Ee, k.relatedTarget = h, N = null, nn(C) === g && (O = new O(m, d + "enter", M, n, C), O.target = h, O.relatedTarget = Ee, N = O), Ee = N, P && M) t: {
              for (O = P, m = M, d = 0, h = O; h; h = Cn(h)) d++;
              for (h = 0, N = m; N; N = Cn(N)) h++;
              for (; 0 < d - h; ) O = Cn(O), d--;
              for (; 0 < h - d; ) m = Cn(m), h--;
              for (; d--; ) {
                if (O === m || m !== null && O === m.alternate) break t;
                O = Cn(O), m = Cn(m);
              }
              O = null;
            }
            else O = null;
            P !== null && ps(E, k, P, O, !1), M !== null && Ee !== null && ps(E, Ee, M, O, !0);
          }
        }
        e: {
          if (k = g ? Nn(g) : window, P = k.nodeName && k.nodeName.toLowerCase(), P === "select" || P === "input" && k.type === "file") var I = zd;
          else if (Gu(k)) if (Yu) I = Ld;
          else {
            I = Pd;
            var U = jd;
          }
          else (P = k.nodeName) && P.toLowerCase() === "input" && (k.type === "checkbox" || k.type === "radio") && (I = Rd);
          if (I && (I = I(e, g))) {
            Ku(E, I, n, C);
            break e;
          }
          U && U(e, k, g), e === "focusout" && (U = k._wrapperState) && U.controlled && k.type === "number" && Ql(k, "number", k.value);
        }
        switch (U = g ? Nn(g) : window, e) {
          case "focusin":
            (Gu(U) || U.contentEditable === "true") && (kn = U, ko = g, ur = null);
            break;
          case "focusout":
            ur = ko = kn = null;
            break;
          case "mousedown":
            So = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            So = !1, ns(E, n, C);
            break;
          case "selectionchange":
            if (Od) break;
          case "keydown":
          case "keyup":
            ns(E, n, C);
        }
        var V;
        if (vo) e: {
          switch (e) {
            case "compositionstart":
              var Q = "onCompositionStart";
              break e;
            case "compositionend":
              Q = "onCompositionEnd";
              break e;
            case "compositionupdate":
              Q = "onCompositionUpdate";
              break e;
          }
          Q = void 0;
        }
        else xn ? Hu(e, n) && (Q = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (Q = "onCompositionStart");
        Q && ($u && n.locale !== "ko" && (xn || Q !== "onCompositionStart" ? Q === "onCompositionEnd" && xn && (V = Du()) : (At = C, co = "value" in At ? At.value : At.textContent, xn = !0)), U = br(g, Q), 0 < U.length && (Q = new Uu(Q, e, null, n, C), E.push({ event: Q, listeners: U }), V ? Q.data = V : (V = Qu(n), V !== null && (Q.data = V)))), (V = Sd ? Cd(e, n) : Ed(e, n)) && (g = br(g, "onBeforeInput"), 0 < g.length && (C = new Uu("onBeforeInput", "beforeinput", null, n, C), E.push({ event: C, listeners: g }), C.data = V));
      }
      ds(E, t);
    });
  }
  function cr(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function br(e, t) {
    for (var n = t + "Capture", r = []; e !== null; ) {
      var l = e, o = l.stateNode;
      l.tag === 5 && o !== null && (l = o, o = Qn(e, n), o != null && r.unshift(cr(e, o, l)), o = Qn(e, t), o != null && r.push(cr(e, o, l))), e = e.return;
    }
    return r;
  }
  function Cn(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function ps(e, t, n, r, l) {
    for (var o = t._reactName, i = []; n !== null && n !== r; ) {
      var a = n, c = a.alternate, g = a.stateNode;
      if (c !== null && c === r) break;
      a.tag === 5 && g !== null && (a = g, l ? (c = Qn(n, o), c != null && i.unshift(cr(n, c, a))) : l || (c = Qn(n, o), c != null && i.push(cr(n, c, a)))), n = n.return;
    }
    i.length !== 0 && e.push({ event: t, listeners: i });
  }
  var Ad = /\r\n?/g, Ud = /\u0000|\uFFFD/g;
  function ms(e) {
    return (typeof e == "string" ? e : "" + e).replace(Ad, `
`).replace(Ud, "");
  }
  function el(e, t, n) {
    if (t = ms(t), ms(e) !== t && n) throw Error(s(425));
  }
  function tl() {
  }
  var jo = null, Po = null;
  function Ro(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Lo = typeof setTimeout == "function" ? setTimeout : void 0, Vd = typeof clearTimeout == "function" ? clearTimeout : void 0, hs = typeof Promise == "function" ? Promise : void 0, $d = typeof queueMicrotask == "function" ? queueMicrotask : typeof hs < "u" ? function(e) {
    return hs.resolve(null).then(e).catch(Wd);
  } : Lo;
  function Wd(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function To(e, t) {
    var n = t, r = 0;
    do {
      var l = n.nextSibling;
      if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
        if (r === 0) {
          e.removeChild(l), er(t);
          return;
        }
        r--;
      } else n !== "$" && n !== "$?" && n !== "$!" || r++;
      n = l;
    } while (n);
    er(t);
  }
  function Vt(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
        if (t === "/$") return null;
      }
    }
    return e;
  }
  function gs(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "$" || n === "$!" || n === "$?") {
          if (t === 0) return e;
          t--;
        } else n === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  var En = Math.random().toString(36).slice(2), kt = "__reactFiber$" + En, dr = "__reactProps$" + En, Nt = "__reactContainer$" + En, Mo = "__reactEvents$" + En, Bd = "__reactListeners$" + En, Hd = "__reactHandles$" + En;
  function nn(e) {
    var t = e[kt];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[Nt] || n[kt]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = gs(e); e !== null; ) {
          if (n = e[kt]) return n;
          e = gs(e);
        }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function fr(e) {
    return e = e[kt] || e[Nt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
  }
  function Nn(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(s(33));
  }
  function nl(e) {
    return e[dr] || null;
  }
  var Oo = [], _n = -1;
  function $t(e) {
    return { current: e };
  }
  function me(e) {
    0 > _n || (e.current = Oo[_n], Oo[_n] = null, _n--);
  }
  function ce(e, t) {
    _n++, Oo[_n] = e.current, e.current = t;
  }
  var Wt = {}, Fe = $t(Wt), He = $t(!1), rn = Wt;
  function zn(e, t) {
    var n = e.type.contextTypes;
    if (!n) return Wt;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
    var l = {}, o;
    for (o in n) l[o] = t[o];
    return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
  }
  function Qe(e) {
    return e = e.childContextTypes, e != null;
  }
  function rl() {
    me(He), me(Fe);
  }
  function vs(e, t, n) {
    if (Fe.current !== Wt) throw Error(s(168));
    ce(Fe, t), ce(He, n);
  }
  function ys(e, t, n) {
    var r = e.stateNode;
    if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
    r = r.getChildContext();
    for (var l in r) if (!(l in t)) throw Error(s(108, ae(e) || "Unknown", l));
    return R({}, n, r);
  }
  function ll(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Wt, rn = Fe.current, ce(Fe, e), ce(He, He.current), !0;
  }
  function ws(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(s(169));
    n ? (e = ys(e, t, rn), r.__reactInternalMemoizedMergedChildContext = e, me(He), me(Fe), ce(Fe, e)) : me(He), ce(He, n);
  }
  var _t = null, ol = !1, Io = !1;
  function xs(e) {
    _t === null ? _t = [e] : _t.push(e);
  }
  function Qd(e) {
    ol = !0, xs(e);
  }
  function Bt() {
    if (!Io && _t !== null) {
      Io = !0;
      var e = 0, t = ue;
      try {
        var n = _t;
        for (ue = 1; e < n.length; e++) {
          var r = n[e];
          do
            r = r(!0);
          while (r !== null);
        }
        _t = null, ol = !1;
      } catch (l) {
        throw _t !== null && (_t = _t.slice(e + 1)), Su(no, Bt), l;
      } finally {
        ue = t, Io = !1;
      }
    }
    return null;
  }
  var jn = [], Pn = 0, il = null, ul = 0, ot = [], it = 0, ln = null, zt = 1, jt = "";
  function on(e, t) {
    jn[Pn++] = ul, jn[Pn++] = il, il = e, ul = t;
  }
  function ks(e, t, n) {
    ot[it++] = zt, ot[it++] = jt, ot[it++] = ln, ln = e;
    var r = zt;
    e = jt;
    var l = 32 - ft(r) - 1;
    r &= ~(1 << l), n += 1;
    var o = 32 - ft(t) + l;
    if (30 < o) {
      var i = l - l % 5;
      o = (r & (1 << i) - 1).toString(32), r >>= i, l -= i, zt = 1 << 32 - ft(t) + l | n << l | r, jt = o + e;
    } else zt = 1 << o | n << l | r, jt = e;
  }
  function Do(e) {
    e.return !== null && (on(e, 1), ks(e, 1, 0));
  }
  function Fo(e) {
    for (; e === il; ) il = jn[--Pn], jn[Pn] = null, ul = jn[--Pn], jn[Pn] = null;
    for (; e === ln; ) ln = ot[--it], ot[it] = null, jt = ot[--it], ot[it] = null, zt = ot[--it], ot[it] = null;
  }
  var et = null, tt = null, ye = !1, mt = null;
  function Ss(e, t) {
    var n = ct(5, null, null, 0);
    n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
  }
  function Cs(e, t) {
    switch (e.tag) {
      case 5:
        var n = e.type;
        return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, et = e, tt = Vt(t.firstChild), !0) : !1;
      case 6:
        return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, et = e, tt = null, !0) : !1;
      case 13:
        return t = t.nodeType !== 8 ? null : t, t !== null ? (n = ln !== null ? { id: zt, overflow: jt } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = ct(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, et = e, tt = null, !0) : !1;
      default:
        return !1;
    }
  }
  function Ao(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function Uo(e) {
    if (ye) {
      var t = tt;
      if (t) {
        var n = t;
        if (!Cs(e, t)) {
          if (Ao(e)) throw Error(s(418));
          t = Vt(n.nextSibling);
          var r = et;
          t && Cs(e, t) ? Ss(r, n) : (e.flags = e.flags & -4097 | 2, ye = !1, et = e);
        }
      } else {
        if (Ao(e)) throw Error(s(418));
        e.flags = e.flags & -4097 | 2, ye = !1, et = e;
      }
    }
  }
  function Es(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
    et = e;
  }
  function sl(e) {
    if (e !== et) return !1;
    if (!ye) return Es(e), ye = !0, !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Ro(e.type, e.memoizedProps)), t && (t = tt)) {
      if (Ao(e)) throw Ns(), Error(s(418));
      for (; t; ) Ss(e, t), t = Vt(t.nextSibling);
    }
    if (Es(e), e.tag === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var n = e.data;
            if (n === "/$") {
              if (t === 0) {
                tt = Vt(e.nextSibling);
                break e;
              }
              t--;
            } else n !== "$" && n !== "$!" && n !== "$?" || t++;
          }
          e = e.nextSibling;
        }
        tt = null;
      }
    } else tt = et ? Vt(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Ns() {
    for (var e = tt; e; ) e = Vt(e.nextSibling);
  }
  function Rn() {
    tt = et = null, ye = !1;
  }
  function Vo(e) {
    mt === null ? mt = [e] : mt.push(e);
  }
  var Gd = K.ReactCurrentBatchConfig;
  function pr(e, t, n) {
    if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
      if (n._owner) {
        if (n = n._owner, n) {
          if (n.tag !== 1) throw Error(s(309));
          var r = n.stateNode;
        }
        if (!r) throw Error(s(147, e));
        var l = r, o = "" + e;
        return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(i) {
          var a = l.refs;
          i === null ? delete a[o] : a[o] = i;
        }, t._stringRef = o, t);
      }
      if (typeof e != "string") throw Error(s(284));
      if (!n._owner) throw Error(s(290, e));
    }
    return e;
  }
  function al(e, t) {
    throw e = Object.prototype.toString.call(t), Error(s(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
  }
  function _s(e) {
    var t = e._init;
    return t(e._payload);
  }
  function zs(e) {
    function t(m, d) {
      if (e) {
        var h = m.deletions;
        h === null ? (m.deletions = [d], m.flags |= 16) : h.push(d);
      }
    }
    function n(m, d) {
      if (!e) return null;
      for (; d !== null; ) t(m, d), d = d.sibling;
      return null;
    }
    function r(m, d) {
      for (m = /* @__PURE__ */ new Map(); d !== null; ) d.key !== null ? m.set(d.key, d) : m.set(d.index, d), d = d.sibling;
      return m;
    }
    function l(m, d) {
      return m = Jt(m, d), m.index = 0, m.sibling = null, m;
    }
    function o(m, d, h) {
      return m.index = h, e ? (h = m.alternate, h !== null ? (h = h.index, h < d ? (m.flags |= 2, d) : h) : (m.flags |= 2, d)) : (m.flags |= 1048576, d);
    }
    function i(m) {
      return e && m.alternate === null && (m.flags |= 2), m;
    }
    function a(m, d, h, N) {
      return d === null || d.tag !== 6 ? (d = Li(h, m.mode, N), d.return = m, d) : (d = l(d, h), d.return = m, d);
    }
    function c(m, d, h, N) {
      var I = h.type;
      return I === Te ? C(m, d, h.props.children, N, h.key) : d !== null && (d.elementType === I || typeof I == "object" && I !== null && I.$$typeof === _e && _s(I) === d.type) ? (N = l(d, h.props), N.ref = pr(m, d, h), N.return = m, N) : (N = Ml(h.type, h.key, h.props, null, m.mode, N), N.ref = pr(m, d, h), N.return = m, N);
    }
    function g(m, d, h, N) {
      return d === null || d.tag !== 4 || d.stateNode.containerInfo !== h.containerInfo || d.stateNode.implementation !== h.implementation ? (d = Ti(h, m.mode, N), d.return = m, d) : (d = l(d, h.children || []), d.return = m, d);
    }
    function C(m, d, h, N, I) {
      return d === null || d.tag !== 7 ? (d = mn(h, m.mode, N, I), d.return = m, d) : (d = l(d, h), d.return = m, d);
    }
    function E(m, d, h) {
      if (typeof d == "string" && d !== "" || typeof d == "number") return d = Li("" + d, m.mode, h), d.return = m, d;
      if (typeof d == "object" && d !== null) {
        switch (d.$$typeof) {
          case ge:
            return h = Ml(d.type, d.key, d.props, null, m.mode, h), h.ref = pr(m, null, d), h.return = m, h;
          case ke:
            return d = Ti(d, m.mode, h), d.return = m, d;
          case _e:
            var N = d._init;
            return E(m, N(d._payload), h);
        }
        if (Wn(d) || F(d)) return d = mn(d, m.mode, h, null), d.return = m, d;
        al(m, d);
      }
      return null;
    }
    function k(m, d, h, N) {
      var I = d !== null ? d.key : null;
      if (typeof h == "string" && h !== "" || typeof h == "number") return I !== null ? null : a(m, d, "" + h, N);
      if (typeof h == "object" && h !== null) {
        switch (h.$$typeof) {
          case ge:
            return h.key === I ? c(m, d, h, N) : null;
          case ke:
            return h.key === I ? g(m, d, h, N) : null;
          case _e:
            return I = h._init, k(
              m,
              d,
              I(h._payload),
              N
            );
        }
        if (Wn(h) || F(h)) return I !== null ? null : C(m, d, h, N, null);
        al(m, h);
      }
      return null;
    }
    function P(m, d, h, N, I) {
      if (typeof N == "string" && N !== "" || typeof N == "number") return m = m.get(h) || null, a(d, m, "" + N, I);
      if (typeof N == "object" && N !== null) {
        switch (N.$$typeof) {
          case ge:
            return m = m.get(N.key === null ? h : N.key) || null, c(d, m, N, I);
          case ke:
            return m = m.get(N.key === null ? h : N.key) || null, g(d, m, N, I);
          case _e:
            var U = N._init;
            return P(m, d, h, U(N._payload), I);
        }
        if (Wn(N) || F(N)) return m = m.get(h) || null, C(d, m, N, I, null);
        al(d, N);
      }
      return null;
    }
    function M(m, d, h, N) {
      for (var I = null, U = null, V = d, Q = d = 0, Le = null; V !== null && Q < h.length; Q++) {
        V.index > Q ? (Le = V, V = null) : Le = V.sibling;
        var re = k(m, V, h[Q], N);
        if (re === null) {
          V === null && (V = Le);
          break;
        }
        e && V && re.alternate === null && t(m, V), d = o(re, d, Q), U === null ? I = re : U.sibling = re, U = re, V = Le;
      }
      if (Q === h.length) return n(m, V), ye && on(m, Q), I;
      if (V === null) {
        for (; Q < h.length; Q++) V = E(m, h[Q], N), V !== null && (d = o(V, d, Q), U === null ? I = V : U.sibling = V, U = V);
        return ye && on(m, Q), I;
      }
      for (V = r(m, V); Q < h.length; Q++) Le = P(V, m, Q, h[Q], N), Le !== null && (e && Le.alternate !== null && V.delete(Le.key === null ? Q : Le.key), d = o(Le, d, Q), U === null ? I = Le : U.sibling = Le, U = Le);
      return e && V.forEach(function(qt) {
        return t(m, qt);
      }), ye && on(m, Q), I;
    }
    function O(m, d, h, N) {
      var I = F(h);
      if (typeof I != "function") throw Error(s(150));
      if (h = I.call(h), h == null) throw Error(s(151));
      for (var U = I = null, V = d, Q = d = 0, Le = null, re = h.next(); V !== null && !re.done; Q++, re = h.next()) {
        V.index > Q ? (Le = V, V = null) : Le = V.sibling;
        var qt = k(m, V, re.value, N);
        if (qt === null) {
          V === null && (V = Le);
          break;
        }
        e && V && qt.alternate === null && t(m, V), d = o(qt, d, Q), U === null ? I = qt : U.sibling = qt, U = qt, V = Le;
      }
      if (re.done) return n(
        m,
        V
      ), ye && on(m, Q), I;
      if (V === null) {
        for (; !re.done; Q++, re = h.next()) re = E(m, re.value, N), re !== null && (d = o(re, d, Q), U === null ? I = re : U.sibling = re, U = re);
        return ye && on(m, Q), I;
      }
      for (V = r(m, V); !re.done; Q++, re = h.next()) re = P(V, m, Q, re.value, N), re !== null && (e && re.alternate !== null && V.delete(re.key === null ? Q : re.key), d = o(re, d, Q), U === null ? I = re : U.sibling = re, U = re);
      return e && V.forEach(function(_f) {
        return t(m, _f);
      }), ye && on(m, Q), I;
    }
    function Ee(m, d, h, N) {
      if (typeof h == "object" && h !== null && h.type === Te && h.key === null && (h = h.props.children), typeof h == "object" && h !== null) {
        switch (h.$$typeof) {
          case ge:
            e: {
              for (var I = h.key, U = d; U !== null; ) {
                if (U.key === I) {
                  if (I = h.type, I === Te) {
                    if (U.tag === 7) {
                      n(m, U.sibling), d = l(U, h.props.children), d.return = m, m = d;
                      break e;
                    }
                  } else if (U.elementType === I || typeof I == "object" && I !== null && I.$$typeof === _e && _s(I) === U.type) {
                    n(m, U.sibling), d = l(U, h.props), d.ref = pr(m, U, h), d.return = m, m = d;
                    break e;
                  }
                  n(m, U);
                  break;
                } else t(m, U);
                U = U.sibling;
              }
              h.type === Te ? (d = mn(h.props.children, m.mode, N, h.key), d.return = m, m = d) : (N = Ml(h.type, h.key, h.props, null, m.mode, N), N.ref = pr(m, d, h), N.return = m, m = N);
            }
            return i(m);
          case ke:
            e: {
              for (U = h.key; d !== null; ) {
                if (d.key === U) if (d.tag === 4 && d.stateNode.containerInfo === h.containerInfo && d.stateNode.implementation === h.implementation) {
                  n(m, d.sibling), d = l(d, h.children || []), d.return = m, m = d;
                  break e;
                } else {
                  n(m, d);
                  break;
                }
                else t(m, d);
                d = d.sibling;
              }
              d = Ti(h, m.mode, N), d.return = m, m = d;
            }
            return i(m);
          case _e:
            return U = h._init, Ee(m, d, U(h._payload), N);
        }
        if (Wn(h)) return M(m, d, h, N);
        if (F(h)) return O(m, d, h, N);
        al(m, h);
      }
      return typeof h == "string" && h !== "" || typeof h == "number" ? (h = "" + h, d !== null && d.tag === 6 ? (n(m, d.sibling), d = l(d, h), d.return = m, m = d) : (n(m, d), d = Li(h, m.mode, N), d.return = m, m = d), i(m)) : n(m, d);
    }
    return Ee;
  }
  var Ln = zs(!0), js = zs(!1), cl = $t(null), dl = null, Tn = null, $o = null;
  function Wo() {
    $o = Tn = dl = null;
  }
  function Bo(e) {
    var t = cl.current;
    me(cl), e._currentValue = t;
  }
  function Ho(e, t, n) {
    for (; e !== null; ) {
      var r = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
      e = e.return;
    }
  }
  function Mn(e, t) {
    dl = e, $o = Tn = null, e = e.dependencies, e !== null && e.firstContext !== null && ((e.lanes & t) !== 0 && (Ge = !0), e.firstContext = null);
  }
  function ut(e) {
    var t = e._currentValue;
    if ($o !== e) if (e = { context: e, memoizedValue: t, next: null }, Tn === null) {
      if (dl === null) throw Error(s(308));
      Tn = e, dl.dependencies = { lanes: 0, firstContext: e };
    } else Tn = Tn.next = e;
    return t;
  }
  var un = null;
  function Qo(e) {
    un === null ? un = [e] : un.push(e);
  }
  function Ps(e, t, n, r) {
    var l = t.interleaved;
    return l === null ? (n.next = n, Qo(t)) : (n.next = l.next, l.next = n), t.interleaved = n, Pt(e, r);
  }
  function Pt(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
    return n.tag === 3 ? n.stateNode : null;
  }
  var Ht = !1;
  function Go(e) {
    e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function Rs(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
  }
  function Rt(e, t) {
    return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Qt(e, t, n) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (r = r.shared, (b & 2) !== 0) {
      var l = r.pending;
      return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, Pt(e, n);
    }
    return l = r.interleaved, l === null ? (t.next = t, Qo(r)) : (t.next = l.next, l.next = t), r.interleaved = t, Pt(e, n);
  }
  function fl(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
      var r = t.lanes;
      r &= e.pendingLanes, n |= r, t.lanes = n, oo(e, n);
    }
  }
  function Ls(e, t) {
    var n = e.updateQueue, r = e.alternate;
    if (r !== null && (r = r.updateQueue, n === r)) {
      var l = null, o = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var i = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
          o === null ? l = o = i : o = o.next = i, n = n.next;
        } while (n !== null);
        o === null ? l = o = t : o = o.next = t;
      } else l = o = t;
      n = { baseState: r.baseState, firstBaseUpdate: l, lastBaseUpdate: o, shared: r.shared, effects: r.effects }, e.updateQueue = n;
      return;
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
  }
  function pl(e, t, n, r) {
    var l = e.updateQueue;
    Ht = !1;
    var o = l.firstBaseUpdate, i = l.lastBaseUpdate, a = l.shared.pending;
    if (a !== null) {
      l.shared.pending = null;
      var c = a, g = c.next;
      c.next = null, i === null ? o = g : i.next = g, i = c;
      var C = e.alternate;
      C !== null && (C = C.updateQueue, a = C.lastBaseUpdate, a !== i && (a === null ? C.firstBaseUpdate = g : a.next = g, C.lastBaseUpdate = c));
    }
    if (o !== null) {
      var E = l.baseState;
      i = 0, C = g = c = null, a = o;
      do {
        var k = a.lane, P = a.eventTime;
        if ((r & k) === k) {
          C !== null && (C = C.next = {
            eventTime: P,
            lane: 0,
            tag: a.tag,
            payload: a.payload,
            callback: a.callback,
            next: null
          });
          e: {
            var M = e, O = a;
            switch (k = t, P = n, O.tag) {
              case 1:
                if (M = O.payload, typeof M == "function") {
                  E = M.call(P, E, k);
                  break e;
                }
                E = M;
                break e;
              case 3:
                M.flags = M.flags & -65537 | 128;
              case 0:
                if (M = O.payload, k = typeof M == "function" ? M.call(P, E, k) : M, k == null) break e;
                E = R({}, E, k);
                break e;
              case 2:
                Ht = !0;
            }
          }
          a.callback !== null && a.lane !== 0 && (e.flags |= 64, k = l.effects, k === null ? l.effects = [a] : k.push(a));
        } else P = { eventTime: P, lane: k, tag: a.tag, payload: a.payload, callback: a.callback, next: null }, C === null ? (g = C = P, c = E) : C = C.next = P, i |= k;
        if (a = a.next, a === null) {
          if (a = l.shared.pending, a === null) break;
          k = a, a = k.next, k.next = null, l.lastBaseUpdate = k, l.shared.pending = null;
        }
      } while (!0);
      if (C === null && (c = E), l.baseState = c, l.firstBaseUpdate = g, l.lastBaseUpdate = C, t = l.shared.interleaved, t !== null) {
        l = t;
        do
          i |= l.lane, l = l.next;
        while (l !== t);
      } else o === null && (l.shared.lanes = 0);
      cn |= i, e.lanes = i, e.memoizedState = E;
    }
  }
  function Ts(e, t, n) {
    if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
      var r = e[t], l = r.callback;
      if (l !== null) {
        if (r.callback = null, r = n, typeof l != "function") throw Error(s(191, l));
        l.call(r);
      }
    }
  }
  var mr = {}, St = $t(mr), hr = $t(mr), gr = $t(mr);
  function sn(e) {
    if (e === mr) throw Error(s(174));
    return e;
  }
  function Ko(e, t) {
    switch (ce(gr, t), ce(hr, e), ce(St, mr), e = t.nodeType, e) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : Kl(null, "");
        break;
      default:
        e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Kl(t, e);
    }
    me(St), ce(St, t);
  }
  function On() {
    me(St), me(hr), me(gr);
  }
  function Ms(e) {
    sn(gr.current);
    var t = sn(St.current), n = Kl(t, e.type);
    t !== n && (ce(hr, e), ce(St, n));
  }
  function Yo(e) {
    hr.current === e && (me(St), me(hr));
  }
  var we = $t(0);
  function ml(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var Xo = [];
  function Zo() {
    for (var e = 0; e < Xo.length; e++) Xo[e]._workInProgressVersionPrimary = null;
    Xo.length = 0;
  }
  var hl = K.ReactCurrentDispatcher, Jo = K.ReactCurrentBatchConfig, an = 0, xe = null, ze = null, Pe = null, gl = !1, vr = !1, yr = 0, Kd = 0;
  function Ae() {
    throw Error(s(321));
  }
  function qo(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++) if (!pt(e[n], t[n])) return !1;
    return !0;
  }
  function bo(e, t, n, r, l, o) {
    if (an = o, xe = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, hl.current = e === null || e.memoizedState === null ? Jd : qd, e = n(r, l), vr) {
      o = 0;
      do {
        if (vr = !1, yr = 0, 25 <= o) throw Error(s(301));
        o += 1, Pe = ze = null, t.updateQueue = null, hl.current = bd, e = n(r, l);
      } while (vr);
    }
    if (hl.current = wl, t = ze !== null && ze.next !== null, an = 0, Pe = ze = xe = null, gl = !1, t) throw Error(s(300));
    return e;
  }
  function ei() {
    var e = yr !== 0;
    return yr = 0, e;
  }
  function Ct() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Pe === null ? xe.memoizedState = Pe = e : Pe = Pe.next = e, Pe;
  }
  function st() {
    if (ze === null) {
      var e = xe.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = ze.next;
    var t = Pe === null ? xe.memoizedState : Pe.next;
    if (t !== null) Pe = t, ze = e;
    else {
      if (e === null) throw Error(s(310));
      ze = e, e = { memoizedState: ze.memoizedState, baseState: ze.baseState, baseQueue: ze.baseQueue, queue: ze.queue, next: null }, Pe === null ? xe.memoizedState = Pe = e : Pe = Pe.next = e;
    }
    return Pe;
  }
  function wr(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function ti(e) {
    var t = st(), n = t.queue;
    if (n === null) throw Error(s(311));
    n.lastRenderedReducer = e;
    var r = ze, l = r.baseQueue, o = n.pending;
    if (o !== null) {
      if (l !== null) {
        var i = l.next;
        l.next = o.next, o.next = i;
      }
      r.baseQueue = l = o, n.pending = null;
    }
    if (l !== null) {
      o = l.next, r = r.baseState;
      var a = i = null, c = null, g = o;
      do {
        var C = g.lane;
        if ((an & C) === C) c !== null && (c = c.next = { lane: 0, action: g.action, hasEagerState: g.hasEagerState, eagerState: g.eagerState, next: null }), r = g.hasEagerState ? g.eagerState : e(r, g.action);
        else {
          var E = {
            lane: C,
            action: g.action,
            hasEagerState: g.hasEagerState,
            eagerState: g.eagerState,
            next: null
          };
          c === null ? (a = c = E, i = r) : c = c.next = E, xe.lanes |= C, cn |= C;
        }
        g = g.next;
      } while (g !== null && g !== o);
      c === null ? i = r : c.next = a, pt(r, t.memoizedState) || (Ge = !0), t.memoizedState = r, t.baseState = i, t.baseQueue = c, n.lastRenderedState = r;
    }
    if (e = n.interleaved, e !== null) {
      l = e;
      do
        o = l.lane, xe.lanes |= o, cn |= o, l = l.next;
      while (l !== e);
    } else l === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
  }
  function ni(e) {
    var t = st(), n = t.queue;
    if (n === null) throw Error(s(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch, l = n.pending, o = t.memoizedState;
    if (l !== null) {
      n.pending = null;
      var i = l = l.next;
      do
        o = e(o, i.action), i = i.next;
      while (i !== l);
      pt(o, t.memoizedState) || (Ge = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
    }
    return [o, r];
  }
  function Os() {
  }
  function Is(e, t) {
    var n = xe, r = st(), l = t(), o = !pt(r.memoizedState, l);
    if (o && (r.memoizedState = l, Ge = !0), r = r.queue, ri(As.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || Pe !== null && Pe.memoizedState.tag & 1) {
      if (n.flags |= 2048, xr(9, Fs.bind(null, n, r, l, t), void 0, null), Re === null) throw Error(s(349));
      (an & 30) !== 0 || Ds(n, t, l);
    }
    return l;
  }
  function Ds(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = xe.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, xe.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
  }
  function Fs(e, t, n, r) {
    t.value = n, t.getSnapshot = r, Us(t) && Vs(e);
  }
  function As(e, t, n) {
    return n(function() {
      Us(t) && Vs(e);
    });
  }
  function Us(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !pt(e, n);
    } catch {
      return !0;
    }
  }
  function Vs(e) {
    var t = Pt(e, 1);
    t !== null && yt(t, e, 1, -1);
  }
  function $s(e) {
    var t = Ct();
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: wr, lastRenderedState: e }, t.queue = e, e = e.dispatch = Zd.bind(null, xe, e), [t.memoizedState, e];
  }
  function xr(e, t, n, r) {
    return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = xe.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, xe.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
  }
  function Ws() {
    return st().memoizedState;
  }
  function vl(e, t, n, r) {
    var l = Ct();
    xe.flags |= e, l.memoizedState = xr(1 | t, n, void 0, r === void 0 ? null : r);
  }
  function yl(e, t, n, r) {
    var l = st();
    r = r === void 0 ? null : r;
    var o = void 0;
    if (ze !== null) {
      var i = ze.memoizedState;
      if (o = i.destroy, r !== null && qo(r, i.deps)) {
        l.memoizedState = xr(t, n, o, r);
        return;
      }
    }
    xe.flags |= e, l.memoizedState = xr(1 | t, n, o, r);
  }
  function Bs(e, t) {
    return vl(8390656, 8, e, t);
  }
  function ri(e, t) {
    return yl(2048, 8, e, t);
  }
  function Hs(e, t) {
    return yl(4, 2, e, t);
  }
  function Qs(e, t) {
    return yl(4, 4, e, t);
  }
  function Gs(e, t) {
    if (typeof t == "function") return e = e(), t(e), function() {
      t(null);
    };
    if (t != null) return e = e(), t.current = e, function() {
      t.current = null;
    };
  }
  function Ks(e, t, n) {
    return n = n != null ? n.concat([e]) : null, yl(4, 4, Gs.bind(null, t, e), n);
  }
  function li() {
  }
  function Ys(e, t) {
    var n = st();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && qo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
  }
  function Xs(e, t) {
    var n = st();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && qo(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
  }
  function Zs(e, t, n) {
    return (an & 21) === 0 ? (e.baseState && (e.baseState = !1, Ge = !0), e.memoizedState = n) : (pt(n, t) || (n = _u(), xe.lanes |= n, cn |= n, e.baseState = !0), t);
  }
  function Yd(e, t) {
    var n = ue;
    ue = n !== 0 && 4 > n ? n : 4, e(!0);
    var r = Jo.transition;
    Jo.transition = {};
    try {
      e(!1), t();
    } finally {
      ue = n, Jo.transition = r;
    }
  }
  function Js() {
    return st().memoizedState;
  }
  function Xd(e, t, n) {
    var r = Xt(e);
    if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, qs(e)) bs(t, n);
    else if (n = Ps(e, t, n, r), n !== null) {
      var l = Be();
      yt(n, e, r, l), ea(n, t, r);
    }
  }
  function Zd(e, t, n) {
    var r = Xt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
    if (qs(e)) bs(t, l);
    else {
      var o = e.alternate;
      if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
        var i = t.lastRenderedState, a = o(i, n);
        if (l.hasEagerState = !0, l.eagerState = a, pt(a, i)) {
          var c = t.interleaved;
          c === null ? (l.next = l, Qo(t)) : (l.next = c.next, c.next = l), t.interleaved = l;
          return;
        }
      } catch {
      } finally {
      }
      n = Ps(e, t, l, r), n !== null && (l = Be(), yt(n, e, r, l), ea(n, t, r));
    }
  }
  function qs(e) {
    var t = e.alternate;
    return e === xe || t !== null && t === xe;
  }
  function bs(e, t) {
    vr = gl = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function ea(e, t, n) {
    if ((n & 4194240) !== 0) {
      var r = t.lanes;
      r &= e.pendingLanes, n |= r, t.lanes = n, oo(e, n);
    }
  }
  var wl = { readContext: ut, useCallback: Ae, useContext: Ae, useEffect: Ae, useImperativeHandle: Ae, useInsertionEffect: Ae, useLayoutEffect: Ae, useMemo: Ae, useReducer: Ae, useRef: Ae, useState: Ae, useDebugValue: Ae, useDeferredValue: Ae, useTransition: Ae, useMutableSource: Ae, useSyncExternalStore: Ae, useId: Ae, unstable_isNewReconciler: !1 }, Jd = { readContext: ut, useCallback: function(e, t) {
    return Ct().memoizedState = [e, t === void 0 ? null : t], e;
  }, useContext: ut, useEffect: Bs, useImperativeHandle: function(e, t, n) {
    return n = n != null ? n.concat([e]) : null, vl(
      4194308,
      4,
      Gs.bind(null, t, e),
      n
    );
  }, useLayoutEffect: function(e, t) {
    return vl(4194308, 4, e, t);
  }, useInsertionEffect: function(e, t) {
    return vl(4, 2, e, t);
  }, useMemo: function(e, t) {
    var n = Ct();
    return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
  }, useReducer: function(e, t, n) {
    var r = Ct();
    return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = Xd.bind(null, xe, e), [r.memoizedState, e];
  }, useRef: function(e) {
    var t = Ct();
    return e = { current: e }, t.memoizedState = e;
  }, useState: $s, useDebugValue: li, useDeferredValue: function(e) {
    return Ct().memoizedState = e;
  }, useTransition: function() {
    var e = $s(!1), t = e[0];
    return e = Yd.bind(null, e[1]), Ct().memoizedState = e, [t, e];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(e, t, n) {
    var r = xe, l = Ct();
    if (ye) {
      if (n === void 0) throw Error(s(407));
      n = n();
    } else {
      if (n = t(), Re === null) throw Error(s(349));
      (an & 30) !== 0 || Ds(r, t, n);
    }
    l.memoizedState = n;
    var o = { value: n, getSnapshot: t };
    return l.queue = o, Bs(As.bind(
      null,
      r,
      o,
      e
    ), [e]), r.flags |= 2048, xr(9, Fs.bind(null, r, o, n, t), void 0, null), n;
  }, useId: function() {
    var e = Ct(), t = Re.identifierPrefix;
    if (ye) {
      var n = jt, r = zt;
      n = (r & ~(1 << 32 - ft(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = yr++, 0 < n && (t += "H" + n.toString(32)), t += ":";
    } else n = Kd++, t = ":" + t + "r" + n.toString(32) + ":";
    return e.memoizedState = t;
  }, unstable_isNewReconciler: !1 }, qd = {
    readContext: ut,
    useCallback: Ys,
    useContext: ut,
    useEffect: ri,
    useImperativeHandle: Ks,
    useInsertionEffect: Hs,
    useLayoutEffect: Qs,
    useMemo: Xs,
    useReducer: ti,
    useRef: Ws,
    useState: function() {
      return ti(wr);
    },
    useDebugValue: li,
    useDeferredValue: function(e) {
      var t = st();
      return Zs(t, ze.memoizedState, e);
    },
    useTransition: function() {
      var e = ti(wr)[0], t = st().memoizedState;
      return [e, t];
    },
    useMutableSource: Os,
    useSyncExternalStore: Is,
    useId: Js,
    unstable_isNewReconciler: !1
  }, bd = { readContext: ut, useCallback: Ys, useContext: ut, useEffect: ri, useImperativeHandle: Ks, useInsertionEffect: Hs, useLayoutEffect: Qs, useMemo: Xs, useReducer: ni, useRef: Ws, useState: function() {
    return ni(wr);
  }, useDebugValue: li, useDeferredValue: function(e) {
    var t = st();
    return ze === null ? t.memoizedState = e : Zs(t, ze.memoizedState, e);
  }, useTransition: function() {
    var e = ni(wr)[0], t = st().memoizedState;
    return [e, t];
  }, useMutableSource: Os, useSyncExternalStore: Is, useId: Js, unstable_isNewReconciler: !1 };
  function ht(e, t) {
    if (e && e.defaultProps) {
      t = R({}, t), e = e.defaultProps;
      for (var n in e) t[n] === void 0 && (t[n] = e[n]);
      return t;
    }
    return t;
  }
  function oi(e, t, n, r) {
    t = e.memoizedState, n = n(r, t), n = n == null ? t : R({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var xl = { isMounted: function(e) {
    return (e = e._reactInternals) ? tn(e) === e : !1;
  }, enqueueSetState: function(e, t, n) {
    e = e._reactInternals;
    var r = Be(), l = Xt(e), o = Rt(r, l);
    o.payload = t, n != null && (o.callback = n), t = Qt(e, o, l), t !== null && (yt(t, e, l, r), fl(t, e, l));
  }, enqueueReplaceState: function(e, t, n) {
    e = e._reactInternals;
    var r = Be(), l = Xt(e), o = Rt(r, l);
    o.tag = 1, o.payload = t, n != null && (o.callback = n), t = Qt(e, o, l), t !== null && (yt(t, e, l, r), fl(t, e, l));
  }, enqueueForceUpdate: function(e, t) {
    e = e._reactInternals;
    var n = Be(), r = Xt(e), l = Rt(n, r);
    l.tag = 2, t != null && (l.callback = t), t = Qt(e, l, r), t !== null && (yt(t, e, r, n), fl(t, e, r));
  } };
  function ta(e, t, n, r, l, o, i) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, i) : t.prototype && t.prototype.isPureReactComponent ? !ir(n, r) || !ir(l, o) : !0;
  }
  function na(e, t, n) {
    var r = !1, l = Wt, o = t.contextType;
    return typeof o == "object" && o !== null ? o = ut(o) : (l = Qe(t) ? rn : Fe.current, r = t.contextTypes, o = (r = r != null) ? zn(e, l) : Wt), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = xl, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
  }
  function ra(e, t, n, r) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && xl.enqueueReplaceState(t, t.state, null);
  }
  function ii(e, t, n, r) {
    var l = e.stateNode;
    l.props = n, l.state = e.memoizedState, l.refs = {}, Go(e);
    var o = t.contextType;
    typeof o == "object" && o !== null ? l.context = ut(o) : (o = Qe(t) ? rn : Fe.current, l.context = zn(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (oi(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && xl.enqueueReplaceState(l, l.state, null), pl(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function In(e, t) {
    try {
      var n = "", r = t;
      do
        n += te(r), r = r.return;
      while (r);
      var l = n;
    } catch (o) {
      l = `
Error generating stack: ` + o.message + `
` + o.stack;
    }
    return { value: e, source: t, stack: l, digest: null };
  }
  function ui(e, t, n) {
    return { value: e, source: null, stack: n ?? null, digest: t ?? null };
  }
  function si(e, t) {
    try {
      console.error(t.value);
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  var ef = typeof WeakMap == "function" ? WeakMap : Map;
  function la(e, t, n) {
    n = Rt(-1, n), n.tag = 3, n.payload = { element: null };
    var r = t.value;
    return n.callback = function() {
      zl || (zl = !0, Ci = r), si(e, t);
    }, n;
  }
  function oa(e, t, n) {
    n = Rt(-1, n), n.tag = 3;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var l = t.value;
      n.payload = function() {
        return r(l);
      }, n.callback = function() {
        si(e, t);
      };
    }
    var o = e.stateNode;
    return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
      si(e, t), typeof r != "function" && (Kt === null ? Kt = /* @__PURE__ */ new Set([this]) : Kt.add(this));
      var i = t.stack;
      this.componentDidCatch(t.value, { componentStack: i !== null ? i : "" });
    }), n;
  }
  function ia(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new ef();
      var l = /* @__PURE__ */ new Set();
      r.set(t, l);
    } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
    l.has(n) || (l.add(n), e = hf.bind(null, e, t, n), t.then(e, e));
  }
  function ua(e) {
    do {
      var t;
      if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function sa(e, t, n, r, l) {
    return (e.mode & 1) === 0 ? (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Rt(-1, 1), t.tag = 2, Qt(n, t, 1))), n.lanes |= 1), e) : (e.flags |= 65536, e.lanes = l, e);
  }
  var tf = K.ReactCurrentOwner, Ge = !1;
  function We(e, t, n, r) {
    t.child = e === null ? js(t, null, n, r) : Ln(t, e.child, n, r);
  }
  function aa(e, t, n, r, l) {
    n = n.render;
    var o = t.ref;
    return Mn(t, l), r = bo(e, t, n, r, o, l), n = ei(), e !== null && !Ge ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Lt(e, t, l)) : (ye && n && Do(t), t.flags |= 1, We(e, t, r, l), t.child);
  }
  function ca(e, t, n, r, l) {
    if (e === null) {
      var o = n.type;
      return typeof o == "function" && !Ri(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, da(e, t, o, r, l)) : (e = Ml(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (o = e.child, (e.lanes & l) === 0) {
      var i = o.memoizedProps;
      if (n = n.compare, n = n !== null ? n : ir, n(i, r) && e.ref === t.ref) return Lt(e, t, l);
    }
    return t.flags |= 1, e = Jt(o, r), e.ref = t.ref, e.return = t, t.child = e;
  }
  function da(e, t, n, r, l) {
    if (e !== null) {
      var o = e.memoizedProps;
      if (ir(o, r) && e.ref === t.ref) if (Ge = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) (e.flags & 131072) !== 0 && (Ge = !0);
      else return t.lanes = e.lanes, Lt(e, t, l);
    }
    return ai(e, t, n, r, l);
  }
  function fa(e, t, n) {
    var r = t.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden") if ((t.mode & 1) === 0) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, ce(Fn, nt), nt |= n;
    else {
      if ((n & 1073741824) === 0) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, ce(Fn, nt), nt |= e, null;
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, ce(Fn, nt), nt |= r;
    }
    else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, ce(Fn, nt), nt |= r;
    return We(e, t, l, n), t.child;
  }
  function pa(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
  }
  function ai(e, t, n, r, l) {
    var o = Qe(n) ? rn : Fe.current;
    return o = zn(t, o), Mn(t, l), n = bo(e, t, n, r, o, l), r = ei(), e !== null && !Ge ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Lt(e, t, l)) : (ye && r && Do(t), t.flags |= 1, We(e, t, n, l), t.child);
  }
  function ma(e, t, n, r, l) {
    if (Qe(n)) {
      var o = !0;
      ll(t);
    } else o = !1;
    if (Mn(t, l), t.stateNode === null) Sl(e, t), na(t, n, r), ii(t, n, r, l), r = !0;
    else if (e === null) {
      var i = t.stateNode, a = t.memoizedProps;
      i.props = a;
      var c = i.context, g = n.contextType;
      typeof g == "object" && g !== null ? g = ut(g) : (g = Qe(n) ? rn : Fe.current, g = zn(t, g));
      var C = n.getDerivedStateFromProps, E = typeof C == "function" || typeof i.getSnapshotBeforeUpdate == "function";
      E || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (a !== r || c !== g) && ra(t, i, r, g), Ht = !1;
      var k = t.memoizedState;
      i.state = k, pl(t, r, i, l), c = t.memoizedState, a !== r || k !== c || He.current || Ht ? (typeof C == "function" && (oi(t, n, C, r), c = t.memoizedState), (a = Ht || ta(t, n, a, r, k, c, g)) ? (E || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = c), i.props = r, i.state = c, i.context = g, r = a) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
    } else {
      i = t.stateNode, Rs(e, t), a = t.memoizedProps, g = t.type === t.elementType ? a : ht(t.type, a), i.props = g, E = t.pendingProps, k = i.context, c = n.contextType, typeof c == "object" && c !== null ? c = ut(c) : (c = Qe(n) ? rn : Fe.current, c = zn(t, c));
      var P = n.getDerivedStateFromProps;
      (C = typeof P == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (a !== E || k !== c) && ra(t, i, r, c), Ht = !1, k = t.memoizedState, i.state = k, pl(t, r, i, l);
      var M = t.memoizedState;
      a !== E || k !== M || He.current || Ht ? (typeof P == "function" && (oi(t, n, P, r), M = t.memoizedState), (g = Ht || ta(t, n, g, r, k, M, c) || !1) ? (C || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(r, M, c), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(r, M, c)), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || a === e.memoizedProps && k === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && k === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = M), i.props = r, i.state = M, i.context = c, r = g) : (typeof i.componentDidUpdate != "function" || a === e.memoizedProps && k === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && k === e.memoizedState || (t.flags |= 1024), r = !1);
    }
    return ci(e, t, n, r, o, l);
  }
  function ci(e, t, n, r, l, o) {
    pa(e, t);
    var i = (t.flags & 128) !== 0;
    if (!r && !i) return l && ws(t, n, !1), Lt(e, t, o);
    r = t.stateNode, tf.current = t;
    var a = i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return t.flags |= 1, e !== null && i ? (t.child = Ln(t, e.child, null, o), t.child = Ln(t, null, a, o)) : We(e, t, a, o), t.memoizedState = r.state, l && ws(t, n, !0), t.child;
  }
  function ha(e) {
    var t = e.stateNode;
    t.pendingContext ? vs(e, t.pendingContext, t.pendingContext !== t.context) : t.context && vs(e, t.context, !1), Ko(e, t.containerInfo);
  }
  function ga(e, t, n, r, l) {
    return Rn(), Vo(l), t.flags |= 256, We(e, t, n, r), t.child;
  }
  var di = { dehydrated: null, treeContext: null, retryLane: 0 };
  function fi(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function va(e, t, n) {
    var r = t.pendingProps, l = we.current, o = !1, i = (t.flags & 128) !== 0, a;
    if ((a = i) || (a = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), a ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), ce(we, l & 1), e === null)
      return Uo(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? ((t.mode & 1) === 0 ? t.lanes = 1 : e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824, null) : (i = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, i = { mode: "hidden", children: i }, (r & 1) === 0 && o !== null ? (o.childLanes = 0, o.pendingProps = i) : o = Ol(i, r, 0, null), e = mn(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = fi(n), t.memoizedState = di, e) : pi(t, i));
    if (l = e.memoizedState, l !== null && (a = l.dehydrated, a !== null)) return nf(e, t, i, r, a, l, n);
    if (o) {
      o = r.fallback, i = t.mode, l = e.child, a = l.sibling;
      var c = { mode: "hidden", children: r.children };
      return (i & 1) === 0 && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = c, t.deletions = null) : (r = Jt(l, c), r.subtreeFlags = l.subtreeFlags & 14680064), a !== null ? o = Jt(a, o) : (o = mn(o, i, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, i = e.child.memoizedState, i = i === null ? fi(n) : { baseLanes: i.baseLanes | n, cachePool: null, transitions: i.transitions }, o.memoizedState = i, o.childLanes = e.childLanes & ~n, t.memoizedState = di, r;
    }
    return o = e.child, e = o.sibling, r = Jt(o, { mode: "visible", children: r.children }), (t.mode & 1) === 0 && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
  }
  function pi(e, t) {
    return t = Ol({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
  }
  function kl(e, t, n, r) {
    return r !== null && Vo(r), Ln(t, e.child, null, n), e = pi(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
  }
  function nf(e, t, n, r, l, o, i) {
    if (n)
      return t.flags & 256 ? (t.flags &= -257, r = ui(Error(s(422))), kl(e, t, i, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = Ol({ mode: "visible", children: r.children }, l, 0, null), o = mn(o, l, i, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, (t.mode & 1) !== 0 && Ln(t, e.child, null, i), t.child.memoizedState = fi(i), t.memoizedState = di, o);
    if ((t.mode & 1) === 0) return kl(e, t, i, null);
    if (l.data === "$!") {
      if (r = l.nextSibling && l.nextSibling.dataset, r) var a = r.dgst;
      return r = a, o = Error(s(419)), r = ui(o, r, void 0), kl(e, t, i, r);
    }
    if (a = (i & e.childLanes) !== 0, Ge || a) {
      if (r = Re, r !== null) {
        switch (i & -i) {
          case 4:
            l = 2;
            break;
          case 16:
            l = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            l = 32;
            break;
          case 536870912:
            l = 268435456;
            break;
          default:
            l = 0;
        }
        l = (l & (r.suspendedLanes | i)) !== 0 ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, Pt(e, l), yt(r, e, l, -1));
      }
      return Pi(), r = ui(Error(s(421))), kl(e, t, i, r);
    }
    return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = gf.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, tt = Vt(l.nextSibling), et = t, ye = !0, mt = null, e !== null && (ot[it++] = zt, ot[it++] = jt, ot[it++] = ln, zt = e.id, jt = e.overflow, ln = t), t = pi(t, r.children), t.flags |= 4096, t);
  }
  function ya(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), Ho(e.return, t, n);
  }
  function mi(e, t, n, r, l) {
    var o = e.memoizedState;
    o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = l);
  }
  function wa(e, t, n) {
    var r = t.pendingProps, l = r.revealOrder, o = r.tail;
    if (We(e, t, r.children, n), r = we.current, (r & 2) !== 0) r = r & 1 | 2, t.flags |= 128;
    else {
      if (e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && ya(e, n, t);
        else if (e.tag === 19) ya(e, n, t);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
      r &= 1;
    }
    if (ce(we, r), (t.mode & 1) === 0) t.memoizedState = null;
    else switch (l) {
      case "forwards":
        for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && ml(e) === null && (l = n), n = n.sibling;
        n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), mi(t, !1, l, n, o);
        break;
      case "backwards":
        for (n = null, l = t.child, t.child = null; l !== null; ) {
          if (e = l.alternate, e !== null && ml(e) === null) {
            t.child = l;
            break;
          }
          e = l.sibling, l.sibling = n, n = l, l = e;
        }
        mi(t, !0, n, null, o);
        break;
      case "together":
        mi(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Sl(e, t) {
    (t.mode & 1) === 0 && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
  }
  function Lt(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), cn |= t.lanes, (n & t.childLanes) === 0) return null;
    if (e !== null && t.child !== e.child) throw Error(s(153));
    if (t.child !== null) {
      for (e = t.child, n = Jt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = Jt(e, e.pendingProps), n.return = t;
      n.sibling = null;
    }
    return t.child;
  }
  function rf(e, t, n) {
    switch (t.tag) {
      case 3:
        ha(t), Rn();
        break;
      case 5:
        Ms(t);
        break;
      case 1:
        Qe(t.type) && ll(t);
        break;
      case 4:
        Ko(t, t.stateNode.containerInfo);
        break;
      case 10:
        var r = t.type._context, l = t.memoizedProps.value;
        ce(cl, r._currentValue), r._currentValue = l;
        break;
      case 13:
        if (r = t.memoizedState, r !== null)
          return r.dehydrated !== null ? (ce(we, we.current & 1), t.flags |= 128, null) : (n & t.child.childLanes) !== 0 ? va(e, t, n) : (ce(we, we.current & 1), e = Lt(e, t, n), e !== null ? e.sibling : null);
        ce(we, we.current & 1);
        break;
      case 19:
        if (r = (n & t.childLanes) !== 0, (e.flags & 128) !== 0) {
          if (r) return wa(e, t, n);
          t.flags |= 128;
        }
        if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), ce(we, we.current), r) break;
        return null;
      case 22:
      case 23:
        return t.lanes = 0, fa(e, t, n);
    }
    return Lt(e, t, n);
  }
  var xa, hi, ka, Sa;
  xa = function(e, t) {
    for (var n = t.child; n !== null; ) {
      if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
      else if (n.tag !== 4 && n.child !== null) {
        n.child.return = n, n = n.child;
        continue;
      }
      if (n === t) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === t) return;
        n = n.return;
      }
      n.sibling.return = n.return, n = n.sibling;
    }
  }, hi = function() {
  }, ka = function(e, t, n, r) {
    var l = e.memoizedProps;
    if (l !== r) {
      e = t.stateNode, sn(St.current);
      var o = null;
      switch (n) {
        case "input":
          l = Bl(e, l), r = Bl(e, r), o = [];
          break;
        case "select":
          l = R({}, l, { value: void 0 }), r = R({}, r, { value: void 0 }), o = [];
          break;
        case "textarea":
          l = Gl(e, l), r = Gl(e, r), o = [];
          break;
        default:
          typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = tl);
      }
      Yl(n, r);
      var i;
      n = null;
      for (g in l) if (!r.hasOwnProperty(g) && l.hasOwnProperty(g) && l[g] != null) if (g === "style") {
        var a = l[g];
        for (i in a) a.hasOwnProperty(i) && (n || (n = {}), n[i] = "");
      } else g !== "dangerouslySetInnerHTML" && g !== "children" && g !== "suppressContentEditableWarning" && g !== "suppressHydrationWarning" && g !== "autoFocus" && (w.hasOwnProperty(g) ? o || (o = []) : (o = o || []).push(g, null));
      for (g in r) {
        var c = r[g];
        if (a = l != null ? l[g] : void 0, r.hasOwnProperty(g) && c !== a && (c != null || a != null)) if (g === "style") if (a) {
          for (i in a) !a.hasOwnProperty(i) || c && c.hasOwnProperty(i) || (n || (n = {}), n[i] = "");
          for (i in c) c.hasOwnProperty(i) && a[i] !== c[i] && (n || (n = {}), n[i] = c[i]);
        } else n || (o || (o = []), o.push(
          g,
          n
        )), n = c;
        else g === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, a = a ? a.__html : void 0, c != null && a !== c && (o = o || []).push(g, c)) : g === "children" ? typeof c != "string" && typeof c != "number" || (o = o || []).push(g, "" + c) : g !== "suppressContentEditableWarning" && g !== "suppressHydrationWarning" && (w.hasOwnProperty(g) ? (c != null && g === "onScroll" && pe("scroll", e), o || a === c || (o = [])) : (o = o || []).push(g, c));
      }
      n && (o = o || []).push("style", n);
      var g = o;
      (t.updateQueue = g) && (t.flags |= 4);
    }
  }, Sa = function(e, t, n, r) {
    n !== r && (t.flags |= 4);
  };
  function kr(e, t) {
    if (!ye) switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; ) t.alternate !== null && (n = t), t = t.sibling;
        n === null ? e.tail = null : n.sibling = null;
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; ) n.alternate !== null && (r = n), n = n.sibling;
        r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
    }
  }
  function Ue(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
    if (t) for (var l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
    else for (l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
    return e.subtreeFlags |= r, e.childLanes = n, t;
  }
  function lf(e, t, n) {
    var r = t.pendingProps;
    switch (Fo(t), t.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ue(t), null;
      case 1:
        return Qe(t.type) && rl(), Ue(t), null;
      case 3:
        return r = t.stateNode, On(), me(He), me(Fe), Zo(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (sl(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, mt !== null && (_i(mt), mt = null))), hi(e, t), Ue(t), null;
      case 5:
        Yo(t);
        var l = sn(gr.current);
        if (n = t.type, e !== null && t.stateNode != null) ka(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
        else {
          if (!r) {
            if (t.stateNode === null) throw Error(s(166));
            return Ue(t), null;
          }
          if (e = sn(St.current), sl(t)) {
            r = t.stateNode, n = t.type;
            var o = t.memoizedProps;
            switch (r[kt] = t, r[dr] = o, e = (t.mode & 1) !== 0, n) {
              case "dialog":
                pe("cancel", r), pe("close", r);
                break;
              case "iframe":
              case "object":
              case "embed":
                pe("load", r);
                break;
              case "video":
              case "audio":
                for (l = 0; l < sr.length; l++) pe(sr[l], r);
                break;
              case "source":
                pe("error", r);
                break;
              case "img":
              case "image":
              case "link":
                pe(
                  "error",
                  r
                ), pe("load", r);
                break;
              case "details":
                pe("toggle", r);
                break;
              case "input":
                nu(r, o), pe("invalid", r);
                break;
              case "select":
                r._wrapperState = { wasMultiple: !!o.multiple }, pe("invalid", r);
                break;
              case "textarea":
                ou(r, o), pe("invalid", r);
            }
            Yl(n, o), l = null;
            for (var i in o) if (o.hasOwnProperty(i)) {
              var a = o[i];
              i === "children" ? typeof a == "string" ? r.textContent !== a && (o.suppressHydrationWarning !== !0 && el(r.textContent, a, e), l = ["children", a]) : typeof a == "number" && r.textContent !== "" + a && (o.suppressHydrationWarning !== !0 && el(
                r.textContent,
                a,
                e
              ), l = ["children", "" + a]) : w.hasOwnProperty(i) && a != null && i === "onScroll" && pe("scroll", r);
            }
            switch (n) {
              case "input":
                Lr(r), lu(r, o, !0);
                break;
              case "textarea":
                Lr(r), uu(r);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof o.onClick == "function" && (r.onclick = tl);
            }
            r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
          } else {
            i = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = su(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = i.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = i.createElement(n, { is: r.is }) : (e = i.createElement(n), n === "select" && (i = e, r.multiple ? i.multiple = !0 : r.size && (i.size = r.size))) : e = i.createElementNS(e, n), e[kt] = t, e[dr] = r, xa(e, t, !1, !1), t.stateNode = e;
            e: {
              switch (i = Xl(n, r), n) {
                case "dialog":
                  pe("cancel", e), pe("close", e), l = r;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  pe("load", e), l = r;
                  break;
                case "video":
                case "audio":
                  for (l = 0; l < sr.length; l++) pe(sr[l], e);
                  l = r;
                  break;
                case "source":
                  pe("error", e), l = r;
                  break;
                case "img":
                case "image":
                case "link":
                  pe(
                    "error",
                    e
                  ), pe("load", e), l = r;
                  break;
                case "details":
                  pe("toggle", e), l = r;
                  break;
                case "input":
                  nu(e, r), l = Bl(e, r), pe("invalid", e);
                  break;
                case "option":
                  l = r;
                  break;
                case "select":
                  e._wrapperState = { wasMultiple: !!r.multiple }, l = R({}, r, { value: void 0 }), pe("invalid", e);
                  break;
                case "textarea":
                  ou(e, r), l = Gl(e, r), pe("invalid", e);
                  break;
                default:
                  l = r;
              }
              Yl(n, l), a = l;
              for (o in a) if (a.hasOwnProperty(o)) {
                var c = a[o];
                o === "style" ? du(e, c) : o === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, c != null && au(e, c)) : o === "children" ? typeof c == "string" ? (n !== "textarea" || c !== "") && Bn(e, c) : typeof c == "number" && Bn(e, "" + c) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (w.hasOwnProperty(o) ? c != null && o === "onScroll" && pe("scroll", e) : c != null && B(e, o, c, i));
              }
              switch (n) {
                case "input":
                  Lr(e), lu(e, r, !1);
                  break;
                case "textarea":
                  Lr(e), uu(e);
                  break;
                case "option":
                  r.value != null && e.setAttribute("value", "" + ie(r.value));
                  break;
                case "select":
                  e.multiple = !!r.multiple, o = r.value, o != null ? hn(e, !!r.multiple, o, !1) : r.defaultValue != null && hn(
                    e,
                    !!r.multiple,
                    r.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof l.onClick == "function" && (e.onclick = tl);
              }
              switch (n) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  r = !!r.autoFocus;
                  break e;
                case "img":
                  r = !0;
                  break e;
                default:
                  r = !1;
              }
            }
            r && (t.flags |= 4);
          }
          t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
        }
        return Ue(t), null;
      case 6:
        if (e && t.stateNode != null) Sa(e, t, e.memoizedProps, r);
        else {
          if (typeof r != "string" && t.stateNode === null) throw Error(s(166));
          if (n = sn(gr.current), sn(St.current), sl(t)) {
            if (r = t.stateNode, n = t.memoizedProps, r[kt] = t, (o = r.nodeValue !== n) && (e = et, e !== null)) switch (e.tag) {
              case 3:
                el(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && el(r.nodeValue, n, (e.mode & 1) !== 0);
            }
            o && (t.flags |= 4);
          } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[kt] = t, t.stateNode = r;
        }
        return Ue(t), null;
      case 13:
        if (me(we), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (ye && tt !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0) Ns(), Rn(), t.flags |= 98560, o = !1;
          else if (o = sl(t), r !== null && r.dehydrated !== null) {
            if (e === null) {
              if (!o) throw Error(s(318));
              if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(s(317));
              o[kt] = t;
            } else Rn(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ue(t), o = !1;
          } else mt !== null && (_i(mt), mt = null), o = !0;
          if (!o) return t.flags & 65536 ? t : null;
        }
        return (t.flags & 128) !== 0 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, (t.mode & 1) !== 0 && (e === null || (we.current & 1) !== 0 ? je === 0 && (je = 3) : Pi())), t.updateQueue !== null && (t.flags |= 4), Ue(t), null);
      case 4:
        return On(), hi(e, t), e === null && ar(t.stateNode.containerInfo), Ue(t), null;
      case 10:
        return Bo(t.type._context), Ue(t), null;
      case 17:
        return Qe(t.type) && rl(), Ue(t), null;
      case 19:
        if (me(we), o = t.memoizedState, o === null) return Ue(t), null;
        if (r = (t.flags & 128) !== 0, i = o.rendering, i === null) if (r) kr(o, !1);
        else {
          if (je !== 0 || e !== null && (e.flags & 128) !== 0) for (e = t.child; e !== null; ) {
            if (i = ml(e), i !== null) {
              for (t.flags |= 128, kr(o, !1), r = i.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, i = o.alternate, i === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = i.childLanes, o.lanes = i.lanes, o.child = i.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = i.memoizedProps, o.memoizedState = i.memoizedState, o.updateQueue = i.updateQueue, o.type = i.type, e = i.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
              return ce(we, we.current & 1 | 2), t.child;
            }
            e = e.sibling;
          }
          o.tail !== null && Ce() > An && (t.flags |= 128, r = !0, kr(o, !1), t.lanes = 4194304);
        }
        else {
          if (!r) if (e = ml(i), e !== null) {
            if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), kr(o, !0), o.tail === null && o.tailMode === "hidden" && !i.alternate && !ye) return Ue(t), null;
          } else 2 * Ce() - o.renderingStartTime > An && n !== 1073741824 && (t.flags |= 128, r = !0, kr(o, !1), t.lanes = 4194304);
          o.isBackwards ? (i.sibling = t.child, t.child = i) : (n = o.last, n !== null ? n.sibling = i : t.child = i, o.last = i);
        }
        return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = Ce(), t.sibling = null, n = we.current, ce(we, r ? n & 1 | 2 : n & 1), t) : (Ue(t), null);
      case 22:
      case 23:
        return ji(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && (t.mode & 1) !== 0 ? (nt & 1073741824) !== 0 && (Ue(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ue(t), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function of(e, t) {
    switch (Fo(t), t.tag) {
      case 1:
        return Qe(t.type) && rl(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return On(), me(He), me(Fe), Zo(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 5:
        return Yo(t), null;
      case 13:
        if (me(we), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null) throw Error(s(340));
          Rn();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return me(we), null;
      case 4:
        return On(), null;
      case 10:
        return Bo(t.type._context), null;
      case 22:
      case 23:
        return ji(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Cl = !1, Ve = !1, uf = typeof WeakSet == "function" ? WeakSet : Set, T = null;
  function Dn(e, t) {
    var n = e.ref;
    if (n !== null) if (typeof n == "function") try {
      n(null);
    } catch (r) {
      Se(e, t, r);
    }
    else n.current = null;
  }
  function gi(e, t, n) {
    try {
      n();
    } catch (r) {
      Se(e, t, r);
    }
  }
  var Ca = !1;
  function sf(e, t) {
    if (jo = Br, e = ts(), xo(e)) {
      if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
      else e: {
        n = (n = e.ownerDocument) && n.defaultView || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var l = r.anchorOffset, o = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, o.nodeType;
          } catch {
            n = null;
            break e;
          }
          var i = 0, a = -1, c = -1, g = 0, C = 0, E = e, k = null;
          t: for (; ; ) {
            for (var P; E !== n || l !== 0 && E.nodeType !== 3 || (a = i + l), E !== o || r !== 0 && E.nodeType !== 3 || (c = i + r), E.nodeType === 3 && (i += E.nodeValue.length), (P = E.firstChild) !== null; )
              k = E, E = P;
            for (; ; ) {
              if (E === e) break t;
              if (k === n && ++g === l && (a = i), k === o && ++C === r && (c = i), (P = E.nextSibling) !== null) break;
              E = k, k = E.parentNode;
            }
            E = P;
          }
          n = a === -1 || c === -1 ? null : { start: a, end: c };
        } else n = null;
      }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (Po = { focusedElem: e, selectionRange: n }, Br = !1, T = t; T !== null; ) if (t = T, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, T = e;
    else for (; T !== null; ) {
      t = T;
      try {
        var M = t.alternate;
        if ((t.flags & 1024) !== 0) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (M !== null) {
              var O = M.memoizedProps, Ee = M.memoizedState, m = t.stateNode, d = m.getSnapshotBeforeUpdate(t.elementType === t.type ? O : ht(t.type, O), Ee);
              m.__reactInternalSnapshotBeforeUpdate = d;
            }
            break;
          case 3:
            var h = t.stateNode.containerInfo;
            h.nodeType === 1 ? h.textContent = "" : h.nodeType === 9 && h.documentElement && h.removeChild(h.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(s(163));
        }
      } catch (N) {
        Se(t, t.return, N);
      }
      if (e = t.sibling, e !== null) {
        e.return = t.return, T = e;
        break;
      }
      T = t.return;
    }
    return M = Ca, Ca = !1, M;
  }
  function Sr(e, t, n) {
    var r = t.updateQueue;
    if (r = r !== null ? r.lastEffect : null, r !== null) {
      var l = r = r.next;
      do {
        if ((l.tag & e) === e) {
          var o = l.destroy;
          l.destroy = void 0, o !== void 0 && gi(t, n, o);
        }
        l = l.next;
      } while (l !== r);
    }
  }
  function El(e, t) {
    if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
      var n = t = t.next;
      do {
        if ((n.tag & e) === e) {
          var r = n.create;
          n.destroy = r();
        }
        n = n.next;
      } while (n !== t);
    }
  }
  function vi(e) {
    var t = e.ref;
    if (t !== null) {
      var n = e.stateNode;
      switch (e.tag) {
        case 5:
          e = n;
          break;
        default:
          e = n;
      }
      typeof t == "function" ? t(e) : t.current = e;
    }
  }
  function Ea(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Ea(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[kt], delete t[dr], delete t[Mo], delete t[Bd], delete t[Hd])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  function Na(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function _a(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Na(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function yi(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = tl));
    else if (r !== 4 && (e = e.child, e !== null)) for (yi(e, t, n), e = e.sibling; e !== null; ) yi(e, t, n), e = e.sibling;
  }
  function wi(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && (e = e.child, e !== null)) for (wi(e, t, n), e = e.sibling; e !== null; ) wi(e, t, n), e = e.sibling;
  }
  var Me = null, gt = !1;
  function Gt(e, t, n) {
    for (n = n.child; n !== null; ) za(e, t, n), n = n.sibling;
  }
  function za(e, t, n) {
    if (xt && typeof xt.onCommitFiberUnmount == "function") try {
      xt.onCommitFiberUnmount(Fr, n);
    } catch {
    }
    switch (n.tag) {
      case 5:
        Ve || Dn(n, t);
      case 6:
        var r = Me, l = gt;
        Me = null, Gt(e, t, n), Me = r, gt = l, Me !== null && (gt ? (e = Me, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : Me.removeChild(n.stateNode));
        break;
      case 18:
        Me !== null && (gt ? (e = Me, n = n.stateNode, e.nodeType === 8 ? To(e.parentNode, n) : e.nodeType === 1 && To(e, n), er(e)) : To(Me, n.stateNode));
        break;
      case 4:
        r = Me, l = gt, Me = n.stateNode.containerInfo, gt = !0, Gt(e, t, n), Me = r, gt = l;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!Ve && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
          l = r = r.next;
          do {
            var o = l, i = o.destroy;
            o = o.tag, i !== void 0 && ((o & 2) !== 0 || (o & 4) !== 0) && gi(n, t, i), l = l.next;
          } while (l !== r);
        }
        Gt(e, t, n);
        break;
      case 1:
        if (!Ve && (Dn(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
          r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
        } catch (a) {
          Se(n, t, a);
        }
        Gt(e, t, n);
        break;
      case 21:
        Gt(e, t, n);
        break;
      case 22:
        n.mode & 1 ? (Ve = (r = Ve) || n.memoizedState !== null, Gt(e, t, n), Ve = r) : Gt(e, t, n);
        break;
      default:
        Gt(e, t, n);
    }
  }
  function ja(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      n === null && (n = e.stateNode = new uf()), t.forEach(function(r) {
        var l = vf.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(l, l));
      });
    }
  }
  function vt(e, t) {
    var n = t.deletions;
    if (n !== null) for (var r = 0; r < n.length; r++) {
      var l = n[r];
      try {
        var o = e, i = t, a = i;
        e: for (; a !== null; ) {
          switch (a.tag) {
            case 5:
              Me = a.stateNode, gt = !1;
              break e;
            case 3:
              Me = a.stateNode.containerInfo, gt = !0;
              break e;
            case 4:
              Me = a.stateNode.containerInfo, gt = !0;
              break e;
          }
          a = a.return;
        }
        if (Me === null) throw Error(s(160));
        za(o, i, l), Me = null, gt = !1;
        var c = l.alternate;
        c !== null && (c.return = null), l.return = null;
      } catch (g) {
        Se(l, t, g);
      }
    }
    if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) Pa(t, e), t = t.sibling;
  }
  function Pa(e, t) {
    var n = e.alternate, r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (vt(t, e), Et(e), r & 4) {
          try {
            Sr(3, e, e.return), El(3, e);
          } catch (O) {
            Se(e, e.return, O);
          }
          try {
            Sr(5, e, e.return);
          } catch (O) {
            Se(e, e.return, O);
          }
        }
        break;
      case 1:
        vt(t, e), Et(e), r & 512 && n !== null && Dn(n, n.return);
        break;
      case 5:
        if (vt(t, e), Et(e), r & 512 && n !== null && Dn(n, n.return), e.flags & 32) {
          var l = e.stateNode;
          try {
            Bn(l, "");
          } catch (O) {
            Se(e, e.return, O);
          }
        }
        if (r & 4 && (l = e.stateNode, l != null)) {
          var o = e.memoizedProps, i = n !== null ? n.memoizedProps : o, a = e.type, c = e.updateQueue;
          if (e.updateQueue = null, c !== null) try {
            a === "input" && o.type === "radio" && o.name != null && ru(l, o), Xl(a, i);
            var g = Xl(a, o);
            for (i = 0; i < c.length; i += 2) {
              var C = c[i], E = c[i + 1];
              C === "style" ? du(l, E) : C === "dangerouslySetInnerHTML" ? au(l, E) : C === "children" ? Bn(l, E) : B(l, C, E, g);
            }
            switch (a) {
              case "input":
                Hl(l, o);
                break;
              case "textarea":
                iu(l, o);
                break;
              case "select":
                var k = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!o.multiple;
                var P = o.value;
                P != null ? hn(l, !!o.multiple, P, !1) : k !== !!o.multiple && (o.defaultValue != null ? hn(
                  l,
                  !!o.multiple,
                  o.defaultValue,
                  !0
                ) : hn(l, !!o.multiple, o.multiple ? [] : "", !1));
            }
            l[dr] = o;
          } catch (O) {
            Se(e, e.return, O);
          }
        }
        break;
      case 6:
        if (vt(t, e), Et(e), r & 4) {
          if (e.stateNode === null) throw Error(s(162));
          l = e.stateNode, o = e.memoizedProps;
          try {
            l.nodeValue = o;
          } catch (O) {
            Se(e, e.return, O);
          }
        }
        break;
      case 3:
        if (vt(t, e), Et(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
          er(t.containerInfo);
        } catch (O) {
          Se(e, e.return, O);
        }
        break;
      case 4:
        vt(t, e), Et(e);
        break;
      case 13:
        vt(t, e), Et(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (Si = Ce())), r & 4 && ja(e);
        break;
      case 22:
        if (C = n !== null && n.memoizedState !== null, e.mode & 1 ? (Ve = (g = Ve) || C, vt(t, e), Ve = g) : vt(t, e), Et(e), r & 8192) {
          if (g = e.memoizedState !== null, (e.stateNode.isHidden = g) && !C && (e.mode & 1) !== 0) for (T = e, C = e.child; C !== null; ) {
            for (E = T = C; T !== null; ) {
              switch (k = T, P = k.child, k.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Sr(4, k, k.return);
                  break;
                case 1:
                  Dn(k, k.return);
                  var M = k.stateNode;
                  if (typeof M.componentWillUnmount == "function") {
                    r = k, n = k.return;
                    try {
                      t = r, M.props = t.memoizedProps, M.state = t.memoizedState, M.componentWillUnmount();
                    } catch (O) {
                      Se(r, n, O);
                    }
                  }
                  break;
                case 5:
                  Dn(k, k.return);
                  break;
                case 22:
                  if (k.memoizedState !== null) {
                    Ta(E);
                    continue;
                  }
              }
              P !== null ? (P.return = k, T = P) : Ta(E);
            }
            C = C.sibling;
          }
          e: for (C = null, E = e; ; ) {
            if (E.tag === 5) {
              if (C === null) {
                C = E;
                try {
                  l = E.stateNode, g ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (a = E.stateNode, c = E.memoizedProps.style, i = c != null && c.hasOwnProperty("display") ? c.display : null, a.style.display = cu("display", i));
                } catch (O) {
                  Se(e, e.return, O);
                }
              }
            } else if (E.tag === 6) {
              if (C === null) try {
                E.stateNode.nodeValue = g ? "" : E.memoizedProps;
              } catch (O) {
                Se(e, e.return, O);
              }
            } else if ((E.tag !== 22 && E.tag !== 23 || E.memoizedState === null || E === e) && E.child !== null) {
              E.child.return = E, E = E.child;
              continue;
            }
            if (E === e) break e;
            for (; E.sibling === null; ) {
              if (E.return === null || E.return === e) break e;
              C === E && (C = null), E = E.return;
            }
            C === E && (C = null), E.sibling.return = E.return, E = E.sibling;
          }
        }
        break;
      case 19:
        vt(t, e), Et(e), r & 4 && ja(e);
        break;
      case 21:
        break;
      default:
        vt(
          t,
          e
        ), Et(e);
    }
  }
  function Et(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var n = e.return; n !== null; ) {
            if (Na(n)) {
              var r = n;
              break e;
            }
            n = n.return;
          }
          throw Error(s(160));
        }
        switch (r.tag) {
          case 5:
            var l = r.stateNode;
            r.flags & 32 && (Bn(l, ""), r.flags &= -33);
            var o = _a(e);
            wi(e, o, l);
            break;
          case 3:
          case 4:
            var i = r.stateNode.containerInfo, a = _a(e);
            yi(e, a, i);
            break;
          default:
            throw Error(s(161));
        }
      } catch (c) {
        Se(e, e.return, c);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function af(e, t, n) {
    T = e, Ra(e);
  }
  function Ra(e, t, n) {
    for (var r = (e.mode & 1) !== 0; T !== null; ) {
      var l = T, o = l.child;
      if (l.tag === 22 && r) {
        var i = l.memoizedState !== null || Cl;
        if (!i) {
          var a = l.alternate, c = a !== null && a.memoizedState !== null || Ve;
          a = Cl;
          var g = Ve;
          if (Cl = i, (Ve = c) && !g) for (T = l; T !== null; ) i = T, c = i.child, i.tag === 22 && i.memoizedState !== null ? Ma(l) : c !== null ? (c.return = i, T = c) : Ma(l);
          for (; o !== null; ) T = o, Ra(o), o = o.sibling;
          T = l, Cl = a, Ve = g;
        }
        La(e);
      } else (l.subtreeFlags & 8772) !== 0 && o !== null ? (o.return = l, T = o) : La(e);
    }
  }
  function La(e) {
    for (; T !== null; ) {
      var t = T;
      if ((t.flags & 8772) !== 0) {
        var n = t.alternate;
        try {
          if ((t.flags & 8772) !== 0) switch (t.tag) {
            case 0:
            case 11:
            case 15:
              Ve || El(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !Ve) if (n === null) r.componentDidMount();
              else {
                var l = t.elementType === t.type ? n.memoizedProps : ht(t.type, n.memoizedProps);
                r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
              }
              var o = t.updateQueue;
              o !== null && Ts(t, o, r);
              break;
            case 3:
              var i = t.updateQueue;
              if (i !== null) {
                if (n = null, t.child !== null) switch (t.child.tag) {
                  case 5:
                    n = t.child.stateNode;
                    break;
                  case 1:
                    n = t.child.stateNode;
                }
                Ts(t, i, n);
              }
              break;
            case 5:
              var a = t.stateNode;
              if (n === null && t.flags & 4) {
                n = a;
                var c = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    c.autoFocus && n.focus();
                    break;
                  case "img":
                    c.src && (n.src = c.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var g = t.alternate;
                if (g !== null) {
                  var C = g.memoizedState;
                  if (C !== null) {
                    var E = C.dehydrated;
                    E !== null && er(E);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(s(163));
          }
          Ve || t.flags & 512 && vi(t);
        } catch (k) {
          Se(t, t.return, k);
        }
      }
      if (t === e) {
        T = null;
        break;
      }
      if (n = t.sibling, n !== null) {
        n.return = t.return, T = n;
        break;
      }
      T = t.return;
    }
  }
  function Ta(e) {
    for (; T !== null; ) {
      var t = T;
      if (t === e) {
        T = null;
        break;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, T = n;
        break;
      }
      T = t.return;
    }
  }
  function Ma(e) {
    for (; T !== null; ) {
      var t = T;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var n = t.return;
            try {
              El(4, t);
            } catch (c) {
              Se(t, n, c);
            }
            break;
          case 1:
            var r = t.stateNode;
            if (typeof r.componentDidMount == "function") {
              var l = t.return;
              try {
                r.componentDidMount();
              } catch (c) {
                Se(t, l, c);
              }
            }
            var o = t.return;
            try {
              vi(t);
            } catch (c) {
              Se(t, o, c);
            }
            break;
          case 5:
            var i = t.return;
            try {
              vi(t);
            } catch (c) {
              Se(t, i, c);
            }
        }
      } catch (c) {
        Se(t, t.return, c);
      }
      if (t === e) {
        T = null;
        break;
      }
      var a = t.sibling;
      if (a !== null) {
        a.return = t.return, T = a;
        break;
      }
      T = t.return;
    }
  }
  var cf = Math.ceil, Nl = K.ReactCurrentDispatcher, xi = K.ReactCurrentOwner, at = K.ReactCurrentBatchConfig, b = 0, Re = null, Ne = null, Oe = 0, nt = 0, Fn = $t(0), je = 0, Cr = null, cn = 0, _l = 0, ki = 0, Er = null, Ke = null, Si = 0, An = 1 / 0, Tt = null, zl = !1, Ci = null, Kt = null, jl = !1, Yt = null, Pl = 0, Nr = 0, Ei = null, Rl = -1, Ll = 0;
  function Be() {
    return (b & 6) !== 0 ? Ce() : Rl !== -1 ? Rl : Rl = Ce();
  }
  function Xt(e) {
    return (e.mode & 1) === 0 ? 1 : (b & 2) !== 0 && Oe !== 0 ? Oe & -Oe : Gd.transition !== null ? (Ll === 0 && (Ll = _u()), Ll) : (e = ue, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Iu(e.type)), e);
  }
  function yt(e, t, n, r) {
    if (50 < Nr) throw Nr = 0, Ei = null, Error(s(185));
    Xn(e, n, r), ((b & 2) === 0 || e !== Re) && (e === Re && ((b & 2) === 0 && (_l |= n), je === 4 && Zt(e, Oe)), Ye(e, r), n === 1 && b === 0 && (t.mode & 1) === 0 && (An = Ce() + 500, ol && Bt()));
  }
  function Ye(e, t) {
    var n = e.callbackNode;
    Gc(e, t);
    var r = Vr(e, e === Re ? Oe : 0);
    if (r === 0) n !== null && Cu(n), e.callbackNode = null, e.callbackPriority = 0;
    else if (t = r & -r, e.callbackPriority !== t) {
      if (n != null && Cu(n), t === 1) e.tag === 0 ? Qd(Ia.bind(null, e)) : xs(Ia.bind(null, e)), $d(function() {
        (b & 6) === 0 && Bt();
      }), n = null;
      else {
        switch (zu(r)) {
          case 1:
            n = no;
            break;
          case 4:
            n = Eu;
            break;
          case 16:
            n = Dr;
            break;
          case 536870912:
            n = Nu;
            break;
          default:
            n = Dr;
        }
        n = Ba(n, Oa.bind(null, e));
      }
      e.callbackPriority = t, e.callbackNode = n;
    }
  }
  function Oa(e, t) {
    if (Rl = -1, Ll = 0, (b & 6) !== 0) throw Error(s(327));
    var n = e.callbackNode;
    if (Un() && e.callbackNode !== n) return null;
    var r = Vr(e, e === Re ? Oe : 0);
    if (r === 0) return null;
    if ((r & 30) !== 0 || (r & e.expiredLanes) !== 0 || t) t = Tl(e, r);
    else {
      t = r;
      var l = b;
      b |= 2;
      var o = Fa();
      (Re !== e || Oe !== t) && (Tt = null, An = Ce() + 500, fn(e, t));
      do
        try {
          pf();
          break;
        } catch (a) {
          Da(e, a);
        }
      while (!0);
      Wo(), Nl.current = o, b = l, Ne !== null ? t = 0 : (Re = null, Oe = 0, t = je);
    }
    if (t !== 0) {
      if (t === 2 && (l = ro(e), l !== 0 && (r = l, t = Ni(e, l))), t === 1) throw n = Cr, fn(e, 0), Zt(e, r), Ye(e, Ce()), n;
      if (t === 6) Zt(e, r);
      else {
        if (l = e.current.alternate, (r & 30) === 0 && !df(l) && (t = Tl(e, r), t === 2 && (o = ro(e), o !== 0 && (r = o, t = Ni(e, o))), t === 1)) throw n = Cr, fn(e, 0), Zt(e, r), Ye(e, Ce()), n;
        switch (e.finishedWork = l, e.finishedLanes = r, t) {
          case 0:
          case 1:
            throw Error(s(345));
          case 2:
            pn(e, Ke, Tt);
            break;
          case 3:
            if (Zt(e, r), (r & 130023424) === r && (t = Si + 500 - Ce(), 10 < t)) {
              if (Vr(e, 0) !== 0) break;
              if (l = e.suspendedLanes, (l & r) !== r) {
                Be(), e.pingedLanes |= e.suspendedLanes & l;
                break;
              }
              e.timeoutHandle = Lo(pn.bind(null, e, Ke, Tt), t);
              break;
            }
            pn(e, Ke, Tt);
            break;
          case 4:
            if (Zt(e, r), (r & 4194240) === r) break;
            for (t = e.eventTimes, l = -1; 0 < r; ) {
              var i = 31 - ft(r);
              o = 1 << i, i = t[i], i > l && (l = i), r &= ~o;
            }
            if (r = l, r = Ce() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * cf(r / 1960)) - r, 10 < r) {
              e.timeoutHandle = Lo(pn.bind(null, e, Ke, Tt), r);
              break;
            }
            pn(e, Ke, Tt);
            break;
          case 5:
            pn(e, Ke, Tt);
            break;
          default:
            throw Error(s(329));
        }
      }
    }
    return Ye(e, Ce()), e.callbackNode === n ? Oa.bind(null, e) : null;
  }
  function Ni(e, t) {
    var n = Er;
    return e.current.memoizedState.isDehydrated && (fn(e, t).flags |= 256), e = Tl(e, t), e !== 2 && (t = Ke, Ke = n, t !== null && _i(t)), e;
  }
  function _i(e) {
    Ke === null ? Ke = e : Ke.push.apply(Ke, e);
  }
  function df(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var n = t.updateQueue;
        if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
          var l = n[r], o = l.getSnapshot;
          l = l.value;
          try {
            if (!pt(o(), l)) return !1;
          } catch {
            return !1;
          }
        }
      }
      if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function Zt(e, t) {
    for (t &= ~ki, t &= ~_l, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
      var n = 31 - ft(t), r = 1 << n;
      e[n] = -1, t &= ~r;
    }
  }
  function Ia(e) {
    if ((b & 6) !== 0) throw Error(s(327));
    Un();
    var t = Vr(e, 0);
    if ((t & 1) === 0) return Ye(e, Ce()), null;
    var n = Tl(e, t);
    if (e.tag !== 0 && n === 2) {
      var r = ro(e);
      r !== 0 && (t = r, n = Ni(e, r));
    }
    if (n === 1) throw n = Cr, fn(e, 0), Zt(e, t), Ye(e, Ce()), n;
    if (n === 6) throw Error(s(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, pn(e, Ke, Tt), Ye(e, Ce()), null;
  }
  function zi(e, t) {
    var n = b;
    b |= 1;
    try {
      return e(t);
    } finally {
      b = n, b === 0 && (An = Ce() + 500, ol && Bt());
    }
  }
  function dn(e) {
    Yt !== null && Yt.tag === 0 && (b & 6) === 0 && Un();
    var t = b;
    b |= 1;
    var n = at.transition, r = ue;
    try {
      if (at.transition = null, ue = 1, e) return e();
    } finally {
      ue = r, at.transition = n, b = t, (b & 6) === 0 && Bt();
    }
  }
  function ji() {
    nt = Fn.current, me(Fn);
  }
  function fn(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var n = e.timeoutHandle;
    if (n !== -1 && (e.timeoutHandle = -1, Vd(n)), Ne !== null) for (n = Ne.return; n !== null; ) {
      var r = n;
      switch (Fo(r), r.tag) {
        case 1:
          r = r.type.childContextTypes, r != null && rl();
          break;
        case 3:
          On(), me(He), me(Fe), Zo();
          break;
        case 5:
          Yo(r);
          break;
        case 4:
          On();
          break;
        case 13:
          me(we);
          break;
        case 19:
          me(we);
          break;
        case 10:
          Bo(r.type._context);
          break;
        case 22:
        case 23:
          ji();
      }
      n = n.return;
    }
    if (Re = e, Ne = e = Jt(e.current, null), Oe = nt = t, je = 0, Cr = null, ki = _l = cn = 0, Ke = Er = null, un !== null) {
      for (t = 0; t < un.length; t++) if (n = un[t], r = n.interleaved, r !== null) {
        n.interleaved = null;
        var l = r.next, o = n.pending;
        if (o !== null) {
          var i = o.next;
          o.next = l, r.next = i;
        }
        n.pending = r;
      }
      un = null;
    }
    return e;
  }
  function Da(e, t) {
    do {
      var n = Ne;
      try {
        if (Wo(), hl.current = wl, gl) {
          for (var r = xe.memoizedState; r !== null; ) {
            var l = r.queue;
            l !== null && (l.pending = null), r = r.next;
          }
          gl = !1;
        }
        if (an = 0, Pe = ze = xe = null, vr = !1, yr = 0, xi.current = null, n === null || n.return === null) {
          je = 1, Cr = t, Ne = null;
          break;
        }
        e: {
          var o = e, i = n.return, a = n, c = t;
          if (t = Oe, a.flags |= 32768, c !== null && typeof c == "object" && typeof c.then == "function") {
            var g = c, C = a, E = C.tag;
            if ((C.mode & 1) === 0 && (E === 0 || E === 11 || E === 15)) {
              var k = C.alternate;
              k ? (C.updateQueue = k.updateQueue, C.memoizedState = k.memoizedState, C.lanes = k.lanes) : (C.updateQueue = null, C.memoizedState = null);
            }
            var P = ua(i);
            if (P !== null) {
              P.flags &= -257, sa(P, i, a, o, t), P.mode & 1 && ia(o, g, t), t = P, c = g;
              var M = t.updateQueue;
              if (M === null) {
                var O = /* @__PURE__ */ new Set();
                O.add(c), t.updateQueue = O;
              } else M.add(c);
              break e;
            } else {
              if ((t & 1) === 0) {
                ia(o, g, t), Pi();
                break e;
              }
              c = Error(s(426));
            }
          } else if (ye && a.mode & 1) {
            var Ee = ua(i);
            if (Ee !== null) {
              (Ee.flags & 65536) === 0 && (Ee.flags |= 256), sa(Ee, i, a, o, t), Vo(In(c, a));
              break e;
            }
          }
          o = c = In(c, a), je !== 4 && (je = 2), Er === null ? Er = [o] : Er.push(o), o = i;
          do {
            switch (o.tag) {
              case 3:
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var m = la(o, c, t);
                Ls(o, m);
                break e;
              case 1:
                a = c;
                var d = o.type, h = o.stateNode;
                if ((o.flags & 128) === 0 && (typeof d.getDerivedStateFromError == "function" || h !== null && typeof h.componentDidCatch == "function" && (Kt === null || !Kt.has(h)))) {
                  o.flags |= 65536, t &= -t, o.lanes |= t;
                  var N = oa(o, a, t);
                  Ls(o, N);
                  break e;
                }
            }
            o = o.return;
          } while (o !== null);
        }
        Ua(n);
      } catch (I) {
        t = I, Ne === n && n !== null && (Ne = n = n.return);
        continue;
      }
      break;
    } while (!0);
  }
  function Fa() {
    var e = Nl.current;
    return Nl.current = wl, e === null ? wl : e;
  }
  function Pi() {
    (je === 0 || je === 3 || je === 2) && (je = 4), Re === null || (cn & 268435455) === 0 && (_l & 268435455) === 0 || Zt(Re, Oe);
  }
  function Tl(e, t) {
    var n = b;
    b |= 2;
    var r = Fa();
    (Re !== e || Oe !== t) && (Tt = null, fn(e, t));
    do
      try {
        ff();
        break;
      } catch (l) {
        Da(e, l);
      }
    while (!0);
    if (Wo(), b = n, Nl.current = r, Ne !== null) throw Error(s(261));
    return Re = null, Oe = 0, je;
  }
  function ff() {
    for (; Ne !== null; ) Aa(Ne);
  }
  function pf() {
    for (; Ne !== null && !Fc(); ) Aa(Ne);
  }
  function Aa(e) {
    var t = Wa(e.alternate, e, nt);
    e.memoizedProps = e.pendingProps, t === null ? Ua(e) : Ne = t, xi.current = null;
  }
  function Ua(e) {
    var t = e;
    do {
      var n = t.alternate;
      if (e = t.return, (t.flags & 32768) === 0) {
        if (n = lf(n, t, nt), n !== null) {
          Ne = n;
          return;
        }
      } else {
        if (n = of(n, t), n !== null) {
          n.flags &= 32767, Ne = n;
          return;
        }
        if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
        else {
          je = 6, Ne = null;
          return;
        }
      }
      if (t = t.sibling, t !== null) {
        Ne = t;
        return;
      }
      Ne = t = e;
    } while (t !== null);
    je === 0 && (je = 5);
  }
  function pn(e, t, n) {
    var r = ue, l = at.transition;
    try {
      at.transition = null, ue = 1, mf(e, t, n, r);
    } finally {
      at.transition = l, ue = r;
    }
    return null;
  }
  function mf(e, t, n, r) {
    do
      Un();
    while (Yt !== null);
    if ((b & 6) !== 0) throw Error(s(327));
    n = e.finishedWork;
    var l = e.finishedLanes;
    if (n === null) return null;
    if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(s(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var o = n.lanes | n.childLanes;
    if (Kc(e, o), e === Re && (Ne = Re = null, Oe = 0), (n.subtreeFlags & 2064) === 0 && (n.flags & 2064) === 0 || jl || (jl = !0, Ba(Dr, function() {
      return Un(), null;
    })), o = (n.flags & 15990) !== 0, (n.subtreeFlags & 15990) !== 0 || o) {
      o = at.transition, at.transition = null;
      var i = ue;
      ue = 1;
      var a = b;
      b |= 4, xi.current = null, sf(e, n), Pa(n, e), Md(Po), Br = !!jo, Po = jo = null, e.current = n, af(n), Ac(), b = a, ue = i, at.transition = o;
    } else e.current = n;
    if (jl && (jl = !1, Yt = e, Pl = l), o = e.pendingLanes, o === 0 && (Kt = null), $c(n.stateNode), Ye(e, Ce()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
    if (zl) throw zl = !1, e = Ci, Ci = null, e;
    return (Pl & 1) !== 0 && e.tag !== 0 && Un(), o = e.pendingLanes, (o & 1) !== 0 ? e === Ei ? Nr++ : (Nr = 0, Ei = e) : Nr = 0, Bt(), null;
  }
  function Un() {
    if (Yt !== null) {
      var e = zu(Pl), t = at.transition, n = ue;
      try {
        if (at.transition = null, ue = 16 > e ? 16 : e, Yt === null) var r = !1;
        else {
          if (e = Yt, Yt = null, Pl = 0, (b & 6) !== 0) throw Error(s(331));
          var l = b;
          for (b |= 4, T = e.current; T !== null; ) {
            var o = T, i = o.child;
            if ((T.flags & 16) !== 0) {
              var a = o.deletions;
              if (a !== null) {
                for (var c = 0; c < a.length; c++) {
                  var g = a[c];
                  for (T = g; T !== null; ) {
                    var C = T;
                    switch (C.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Sr(8, C, o);
                    }
                    var E = C.child;
                    if (E !== null) E.return = C, T = E;
                    else for (; T !== null; ) {
                      C = T;
                      var k = C.sibling, P = C.return;
                      if (Ea(C), C === g) {
                        T = null;
                        break;
                      }
                      if (k !== null) {
                        k.return = P, T = k;
                        break;
                      }
                      T = P;
                    }
                  }
                }
                var M = o.alternate;
                if (M !== null) {
                  var O = M.child;
                  if (O !== null) {
                    M.child = null;
                    do {
                      var Ee = O.sibling;
                      O.sibling = null, O = Ee;
                    } while (O !== null);
                  }
                }
                T = o;
              }
            }
            if ((o.subtreeFlags & 2064) !== 0 && i !== null) i.return = o, T = i;
            else e: for (; T !== null; ) {
              if (o = T, (o.flags & 2048) !== 0) switch (o.tag) {
                case 0:
                case 11:
                case 15:
                  Sr(9, o, o.return);
              }
              var m = o.sibling;
              if (m !== null) {
                m.return = o.return, T = m;
                break e;
              }
              T = o.return;
            }
          }
          var d = e.current;
          for (T = d; T !== null; ) {
            i = T;
            var h = i.child;
            if ((i.subtreeFlags & 2064) !== 0 && h !== null) h.return = i, T = h;
            else e: for (i = d; T !== null; ) {
              if (a = T, (a.flags & 2048) !== 0) try {
                switch (a.tag) {
                  case 0:
                  case 11:
                  case 15:
                    El(9, a);
                }
              } catch (I) {
                Se(a, a.return, I);
              }
              if (a === i) {
                T = null;
                break e;
              }
              var N = a.sibling;
              if (N !== null) {
                N.return = a.return, T = N;
                break e;
              }
              T = a.return;
            }
          }
          if (b = l, Bt(), xt && typeof xt.onPostCommitFiberRoot == "function") try {
            xt.onPostCommitFiberRoot(Fr, e);
          } catch {
          }
          r = !0;
        }
        return r;
      } finally {
        ue = n, at.transition = t;
      }
    }
    return !1;
  }
  function Va(e, t, n) {
    t = In(n, t), t = la(e, t, 1), e = Qt(e, t, 1), t = Be(), e !== null && (Xn(e, 1, t), Ye(e, t));
  }
  function Se(e, t, n) {
    if (e.tag === 3) Va(e, e, n);
    else for (; t !== null; ) {
      if (t.tag === 3) {
        Va(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Kt === null || !Kt.has(r))) {
          e = In(n, e), e = oa(t, e, 1), t = Qt(t, e, 1), e = Be(), t !== null && (Xn(t, 1, e), Ye(t, e));
          break;
        }
      }
      t = t.return;
    }
  }
  function hf(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t), t = Be(), e.pingedLanes |= e.suspendedLanes & n, Re === e && (Oe & n) === n && (je === 4 || je === 3 && (Oe & 130023424) === Oe && 500 > Ce() - Si ? fn(e, 0) : ki |= n), Ye(e, t);
  }
  function $a(e, t) {
    t === 0 && ((e.mode & 1) === 0 ? t = 1 : (t = Ur, Ur <<= 1, (Ur & 130023424) === 0 && (Ur = 4194304)));
    var n = Be();
    e = Pt(e, t), e !== null && (Xn(e, t, n), Ye(e, n));
  }
  function gf(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), $a(e, n);
  }
  function vf(e, t) {
    var n = 0;
    switch (e.tag) {
      case 13:
        var r = e.stateNode, l = e.memoizedState;
        l !== null && (n = l.retryLane);
        break;
      case 19:
        r = e.stateNode;
        break;
      default:
        throw Error(s(314));
    }
    r !== null && r.delete(t), $a(e, n);
  }
  var Wa;
  Wa = function(e, t, n) {
    if (e !== null) if (e.memoizedProps !== t.pendingProps || He.current) Ge = !0;
    else {
      if ((e.lanes & n) === 0 && (t.flags & 128) === 0) return Ge = !1, rf(e, t, n);
      Ge = (e.flags & 131072) !== 0;
    }
    else Ge = !1, ye && (t.flags & 1048576) !== 0 && ks(t, ul, t.index);
    switch (t.lanes = 0, t.tag) {
      case 2:
        var r = t.type;
        Sl(e, t), e = t.pendingProps;
        var l = zn(t, Fe.current);
        Mn(t, n), l = bo(null, t, r, e, l, n);
        var o = ei();
        return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Qe(r) ? (o = !0, ll(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Go(t), l.updater = xl, t.stateNode = l, l._reactInternals = t, ii(t, r, e, n), t = ci(null, t, r, !0, o, n)) : (t.tag = 0, ye && o && Do(t), We(null, t, l, n), t = t.child), t;
      case 16:
        r = t.elementType;
        e: {
          switch (Sl(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = wf(r), e = ht(r, e), l) {
            case 0:
              t = ai(null, t, r, e, n);
              break e;
            case 1:
              t = ma(null, t, r, e, n);
              break e;
            case 11:
              t = aa(null, t, r, e, n);
              break e;
            case 14:
              t = ca(null, t, r, ht(r.type, e), n);
              break e;
          }
          throw Error(s(
            306,
            r,
            ""
          ));
        }
        return t;
      case 0:
        return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ht(r, l), ai(e, t, r, l, n);
      case 1:
        return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ht(r, l), ma(e, t, r, l, n);
      case 3:
        e: {
          if (ha(t), e === null) throw Error(s(387));
          r = t.pendingProps, o = t.memoizedState, l = o.element, Rs(e, t), pl(t, r, null, n);
          var i = t.memoizedState;
          if (r = i.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: i.cache, pendingSuspenseBoundaries: i.pendingSuspenseBoundaries, transitions: i.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
            l = In(Error(s(423)), t), t = ga(e, t, r, n, l);
            break e;
          } else if (r !== l) {
            l = In(Error(s(424)), t), t = ga(e, t, r, n, l);
            break e;
          } else for (tt = Vt(t.stateNode.containerInfo.firstChild), et = t, ye = !0, mt = null, n = js(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
          else {
            if (Rn(), r === l) {
              t = Lt(e, t, n);
              break e;
            }
            We(e, t, r, n);
          }
          t = t.child;
        }
        return t;
      case 5:
        return Ms(t), e === null && Uo(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, i = l.children, Ro(r, l) ? i = null : o !== null && Ro(r, o) && (t.flags |= 32), pa(e, t), We(e, t, i, n), t.child;
      case 6:
        return e === null && Uo(t), null;
      case 13:
        return va(e, t, n);
      case 4:
        return Ko(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Ln(t, null, r, n) : We(e, t, r, n), t.child;
      case 11:
        return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ht(r, l), aa(e, t, r, l, n);
      case 7:
        return We(e, t, t.pendingProps, n), t.child;
      case 8:
        return We(e, t, t.pendingProps.children, n), t.child;
      case 12:
        return We(e, t, t.pendingProps.children, n), t.child;
      case 10:
        e: {
          if (r = t.type._context, l = t.pendingProps, o = t.memoizedProps, i = l.value, ce(cl, r._currentValue), r._currentValue = i, o !== null) if (pt(o.value, i)) {
            if (o.children === l.children && !He.current) {
              t = Lt(e, t, n);
              break e;
            }
          } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
            var a = o.dependencies;
            if (a !== null) {
              i = o.child;
              for (var c = a.firstContext; c !== null; ) {
                if (c.context === r) {
                  if (o.tag === 1) {
                    c = Rt(-1, n & -n), c.tag = 2;
                    var g = o.updateQueue;
                    if (g !== null) {
                      g = g.shared;
                      var C = g.pending;
                      C === null ? c.next = c : (c.next = C.next, C.next = c), g.pending = c;
                    }
                  }
                  o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), Ho(
                    o.return,
                    n,
                    t
                  ), a.lanes |= n;
                  break;
                }
                c = c.next;
              }
            } else if (o.tag === 10) i = o.type === t.type ? null : o.child;
            else if (o.tag === 18) {
              if (i = o.return, i === null) throw Error(s(341));
              i.lanes |= n, a = i.alternate, a !== null && (a.lanes |= n), Ho(i, n, t), i = o.sibling;
            } else i = o.child;
            if (i !== null) i.return = o;
            else for (i = o; i !== null; ) {
              if (i === t) {
                i = null;
                break;
              }
              if (o = i.sibling, o !== null) {
                o.return = i.return, i = o;
                break;
              }
              i = i.return;
            }
            o = i;
          }
          We(e, t, l.children, n), t = t.child;
        }
        return t;
      case 9:
        return l = t.type, r = t.pendingProps.children, Mn(t, n), l = ut(l), r = r(l), t.flags |= 1, We(e, t, r, n), t.child;
      case 14:
        return r = t.type, l = ht(r, t.pendingProps), l = ht(r.type, l), ca(e, t, r, l, n);
      case 15:
        return da(e, t, t.type, t.pendingProps, n);
      case 17:
        return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ht(r, l), Sl(e, t), t.tag = 1, Qe(r) ? (e = !0, ll(t)) : e = !1, Mn(t, n), na(t, r, l), ii(t, r, l, n), ci(null, t, r, !0, e, n);
      case 19:
        return wa(e, t, n);
      case 22:
        return fa(e, t, n);
    }
    throw Error(s(156, t.tag));
  };
  function Ba(e, t) {
    return Su(e, t);
  }
  function yf(e, t, n, r) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function ct(e, t, n, r) {
    return new yf(e, t, n, r);
  }
  function Ri(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function wf(e) {
    if (typeof e == "function") return Ri(e) ? 1 : 0;
    if (e != null) {
      if (e = e.$$typeof, e === q) return 11;
      if (e === Je) return 14;
    }
    return 2;
  }
  function Jt(e, t) {
    var n = e.alternate;
    return n === null ? (n = ct(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
  }
  function Ml(e, t, n, r, l, o) {
    var i = 2;
    if (r = e, typeof e == "function") Ri(e) && (i = 1);
    else if (typeof e == "string") i = 5;
    else e: switch (e) {
      case Te:
        return mn(n.children, l, o, t);
      case $e:
        i = 8, l |= 8;
        break;
      case lt:
        return e = ct(12, n, t, l | 2), e.elementType = lt, e.lanes = o, e;
      case Ie:
        return e = ct(13, n, t, l), e.elementType = Ie, e.lanes = o, e;
      case De:
        return e = ct(19, n, t, l), e.elementType = De, e.lanes = o, e;
      case fe:
        return Ol(n, l, o, t);
      default:
        if (typeof e == "object" && e !== null) switch (e.$$typeof) {
          case Ze:
            i = 10;
            break e;
          case dt:
            i = 9;
            break e;
          case q:
            i = 11;
            break e;
          case Je:
            i = 14;
            break e;
          case _e:
            i = 16, r = null;
            break e;
        }
        throw Error(s(130, e == null ? e : typeof e, ""));
    }
    return t = ct(i, n, t, l), t.elementType = e, t.type = r, t.lanes = o, t;
  }
  function mn(e, t, n, r) {
    return e = ct(7, e, r, t), e.lanes = n, e;
  }
  function Ol(e, t, n, r) {
    return e = ct(22, e, r, t), e.elementType = fe, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
  }
  function Li(e, t, n) {
    return e = ct(6, e, null, t), e.lanes = n, e;
  }
  function Ti(e, t, n) {
    return t = ct(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
  }
  function xf(e, t, n, r, l) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = lo(0), this.expirationTimes = lo(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = lo(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
  }
  function Mi(e, t, n, r, l, o, i, a, c) {
    return e = new xf(e, t, n, a, c), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = ct(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Go(o), e;
  }
  function kf(e, t, n) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: ke, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
  }
  function Ha(e) {
    if (!e) return Wt;
    e = e._reactInternals;
    e: {
      if (tn(e) !== e || e.tag !== 1) throw Error(s(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (Qe(t.type)) {
              t = t.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        t = t.return;
      } while (t !== null);
      throw Error(s(171));
    }
    if (e.tag === 1) {
      var n = e.type;
      if (Qe(n)) return ys(e, n, t);
    }
    return t;
  }
  function Qa(e, t, n, r, l, o, i, a, c) {
    return e = Mi(n, r, !0, e, l, o, i, a, c), e.context = Ha(null), n = e.current, r = Be(), l = Xt(n), o = Rt(r, l), o.callback = t ?? null, Qt(n, o, l), e.current.lanes = l, Xn(e, l, r), Ye(e, r), e;
  }
  function Il(e, t, n, r) {
    var l = t.current, o = Be(), i = Xt(l);
    return n = Ha(n), t.context === null ? t.context = n : t.pendingContext = n, t = Rt(o, i), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = Qt(l, t, i), e !== null && (yt(e, l, i, o), fl(e, l, i)), i;
  }
  function Dl(e) {
    if (e = e.current, !e.child) return null;
    switch (e.child.tag) {
      case 5:
        return e.child.stateNode;
      default:
        return e.child.stateNode;
    }
  }
  function Ga(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function Oi(e, t) {
    Ga(e, t), (e = e.alternate) && Ga(e, t);
  }
  function Sf() {
    return null;
  }
  var Ka = typeof reportError == "function" ? reportError : function(e) {
    console.error(e);
  };
  function Ii(e) {
    this._internalRoot = e;
  }
  Fl.prototype.render = Ii.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(s(409));
    Il(e, t, null, null);
  }, Fl.prototype.unmount = Ii.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      dn(function() {
        Il(null, e, null, null);
      }), t[Nt] = null;
    }
  };
  function Fl(e) {
    this._internalRoot = e;
  }
  Fl.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Ru();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < Ft.length && t !== 0 && t < Ft[n].priority; n++) ;
      Ft.splice(n, 0, e), n === 0 && Mu(e);
    }
  };
  function Di(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function Al(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
  }
  function Ya() {
  }
  function Cf(e, t, n, r, l) {
    if (l) {
      if (typeof r == "function") {
        var o = r;
        r = function() {
          var g = Dl(i);
          o.call(g);
        };
      }
      var i = Qa(t, r, e, 0, null, !1, !1, "", Ya);
      return e._reactRootContainer = i, e[Nt] = i.current, ar(e.nodeType === 8 ? e.parentNode : e), dn(), i;
    }
    for (; l = e.lastChild; ) e.removeChild(l);
    if (typeof r == "function") {
      var a = r;
      r = function() {
        var g = Dl(c);
        a.call(g);
      };
    }
    var c = Mi(e, 0, !1, null, null, !1, !1, "", Ya);
    return e._reactRootContainer = c, e[Nt] = c.current, ar(e.nodeType === 8 ? e.parentNode : e), dn(function() {
      Il(t, c, n, r);
    }), c;
  }
  function Ul(e, t, n, r, l) {
    var o = n._reactRootContainer;
    if (o) {
      var i = o;
      if (typeof l == "function") {
        var a = l;
        l = function() {
          var c = Dl(i);
          a.call(c);
        };
      }
      Il(t, i, e, l);
    } else i = Cf(n, t, e, l, r);
    return Dl(i);
  }
  ju = function(e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var n = Yn(t.pendingLanes);
          n !== 0 && (oo(t, n | 1), Ye(t, Ce()), (b & 6) === 0 && (An = Ce() + 500, Bt()));
        }
        break;
      case 13:
        dn(function() {
          var r = Pt(e, 1);
          if (r !== null) {
            var l = Be();
            yt(r, e, 1, l);
          }
        }), Oi(e, 1);
    }
  }, io = function(e) {
    if (e.tag === 13) {
      var t = Pt(e, 134217728);
      if (t !== null) {
        var n = Be();
        yt(t, e, 134217728, n);
      }
      Oi(e, 134217728);
    }
  }, Pu = function(e) {
    if (e.tag === 13) {
      var t = Xt(e), n = Pt(e, t);
      if (n !== null) {
        var r = Be();
        yt(n, e, t, r);
      }
      Oi(e, t);
    }
  }, Ru = function() {
    return ue;
  }, Lu = function(e, t) {
    var n = ue;
    try {
      return ue = e, t();
    } finally {
      ue = n;
    }
  }, ql = function(e, t, n) {
    switch (t) {
      case "input":
        if (Hl(e, n), t = n.name, n.type === "radio" && t != null) {
          for (n = e; n.parentNode; ) n = n.parentNode;
          for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
            var r = n[t];
            if (r !== e && r.form === e.form) {
              var l = nl(r);
              if (!l) throw Error(s(90));
              tu(r), Hl(r, l);
            }
          }
        }
        break;
      case "textarea":
        iu(e, n);
        break;
      case "select":
        t = n.value, t != null && hn(e, !!n.multiple, t, !1);
    }
  }, hu = zi, gu = dn;
  var Ef = { usingClientEntryPoint: !1, Events: [fr, Nn, nl, pu, mu, zi] }, _r = { findFiberByHostInstance: nn, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Nf = { bundleType: _r.bundleType, version: _r.version, rendererPackageName: _r.rendererPackageName, rendererConfig: _r.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: K.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
    return e = xu(e), e === null ? null : e.stateNode;
  }, findFiberByHostInstance: _r.findFiberByHostInstance || Sf, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Vl.isDisabled && Vl.supportsFiber) try {
      Fr = Vl.inject(Nf), xt = Vl;
    } catch {
    }
  }
  return Xe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ef, Xe.createPortal = function(e, t) {
    var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Di(t)) throw Error(s(200));
    return kf(e, t, null, n);
  }, Xe.createRoot = function(e, t) {
    if (!Di(e)) throw Error(s(299));
    var n = !1, r = "", l = Ka;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Mi(e, 1, !1, null, null, n, !1, r, l), e[Nt] = t.current, ar(e.nodeType === 8 ? e.parentNode : e), new Ii(t);
  }, Xe.findDOMNode = function(e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(s(188)) : (e = Object.keys(e).join(","), Error(s(268, e)));
    return e = xu(t), e = e === null ? null : e.stateNode, e;
  }, Xe.flushSync = function(e) {
    return dn(e);
  }, Xe.hydrate = function(e, t, n) {
    if (!Al(t)) throw Error(s(200));
    return Ul(null, e, t, !0, n);
  }, Xe.hydrateRoot = function(e, t, n) {
    if (!Di(e)) throw Error(s(405));
    var r = n != null && n.hydratedSources || null, l = !1, o = "", i = Ka;
    if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (i = n.onRecoverableError)), t = Qa(t, null, e, 1, n ?? null, l, !1, o, i), e[Nt] = t.current, ar(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
      n,
      l
    );
    return new Fl(t);
  }, Xe.render = function(e, t, n) {
    if (!Al(t)) throw Error(s(200));
    return Ul(null, e, t, !1, n);
  }, Xe.unmountComponentAtNode = function(e) {
    if (!Al(e)) throw Error(s(40));
    return e._reactRootContainer ? (dn(function() {
      Ul(null, null, e, !1, function() {
        e._reactRootContainer = null, e[Nt] = null;
      });
    }), !0) : !1;
  }, Xe.unstable_batchedUpdates = zi, Xe.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
    if (!Al(n)) throw Error(s(200));
    if (e == null || e._reactInternals === void 0) throw Error(s(38));
    return Ul(e, t, n, !1, r);
  }, Xe.version = "18.3.1-next-f1338f8080-20240426", Xe;
}
var nc;
function If() {
  if (nc) return Ui.exports;
  nc = 1;
  function u() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u);
      } catch (p) {
        console.error(p);
      }
  }
  return u(), Ui.exports = Of(), Ui.exports;
}
var rc;
function Df() {
  if (rc) return $l;
  rc = 1;
  var u = If();
  return $l.createRoot = u.createRoot, $l.hydrateRoot = u.hydrateRoot, $l;
}
var Ff = Df(), le = qi();
const Af = /* @__PURE__ */ jf(le), Uf = /* @__PURE__ */ zf({
  __proto__: null,
  default: Af
}, [le]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vf = (u) => u.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), fc = (...u) => u.filter((p, s, y) => !!p && p.trim() !== "" && y.indexOf(p) === s).join(" ").trim();
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var $f = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wf = le.forwardRef(
  ({
    color: u = "currentColor",
    size: p = 24,
    strokeWidth: s = 2,
    absoluteStrokeWidth: y,
    className: w = "",
    children: x,
    iconNode: z,
    ..._
  }, L) => le.createElement(
    "svg",
    {
      ref: L,
      ...$f,
      width: p,
      height: p,
      stroke: u,
      strokeWidth: y ? Number(s) * 24 / Number(p) : s,
      className: fc("lucide", w),
      ..._
    },
    [
      ...z.map(([$, G]) => le.createElement($, G)),
      ...Array.isArray(x) ? x : [x]
    ]
  )
);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rt = (u, p) => {
  const s = le.forwardRef(
    ({ className: y, ...w }, x) => le.createElement(Wf, {
      ref: x,
      iconNode: p,
      className: fc(`lucide-${Vf(u)}`, y),
      ...w
    })
  );
  return s.displayName = `${u}`, s;
};
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bf = rt("ArrowDownToLine", [
  ["path", { d: "M12 17V3", key: "1cwfxf" }],
  ["path", { d: "m6 11 6 6 6-6", key: "12ii2o" }],
  ["path", { d: "M19 21H5", key: "150jfl" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lc = rt("ArrowRight", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hi = rt("AudioLines", [
  ["path", { d: "M2 10v3", key: "1fnikh" }],
  ["path", { d: "M6 6v11", key: "11sgs0" }],
  ["path", { d: "M10 3v18", key: "yhl04a" }],
  ["path", { d: "M14 8v7", key: "3a1oy3" }],
  ["path", { d: "M18 5v13", key: "123xd1" }],
  ["path", { d: "M22 10v3", key: "154ddg" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hf = rt("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qf = rt("CircleHelp", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oc = rt("Headphones", [
  [
    "path",
    {
      d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",
      key: "1xhozi"
    }
  ]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ic = rt("LoaderCircle", [
  ["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gf = rt("MicVocal", [
  [
    "path",
    {
      d: "m11 7.601-5.994 8.19a1 1 0 0 0 .1 1.298l.817.818a1 1 0 0 0 1.314.087L15.09 12",
      key: "80a601"
    }
  ],
  [
    "path",
    {
      d: "M16.5 21.174C15.5 20.5 14.372 20 13 20c-2.058 0-3.928 2.356-6 2-2.072-.356-2.775-3.369-1.5-4.5",
      key: "j0ngtp"
    }
  ],
  ["circle", { cx: "16", cy: "7", r: "5", key: "d08jfb" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kf = rt("Newspaper", [
  [
    "path",
    {
      d: "M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2",
      key: "7pis2x"
    }
  ],
  ["path", { d: "M18 14h-8", key: "sponae" }],
  ["path", { d: "M15 18h-5", key: "95g1m2" }],
  ["path", { d: "M10 6h8v4h-8V6Z", key: "smlsk5" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yf = rt("Plus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pc = rt("Radio", [
  ["path", { d: "M4.9 19.1C1 15.2 1 8.8 4.9 4.9", key: "1vaf9d" }],
  ["path", { d: "M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5", key: "u1ii0m" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ["path", { d: "M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5", key: "1j5fej" }],
  ["path", { d: "M19.1 4.9C23 8.8 23 15.1 19.1 19", key: "10b0cb" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const uc = rt("Sparkles", [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xf = rt("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);
var Zf = Object.defineProperty, bi = (u, p) => Zf(u, "name", { value: p, configurable: !0 });
function Qi(u, p) {
  if (typeof u == "function")
    return u(p);
  u != null && (u.current = p);
}
bi(Qi, "setRef");
function mc(...u) {
  return (p) => {
    let s = !1;
    const y = u.map((w) => {
      const x = Qi(w, p);
      return !s && typeof x == "function" && (s = !0), x;
    });
    if (s)
      return () => {
        for (let w = 0; w < y.length; w++) {
          const x = y[w];
          typeof x == "function" ? x() : Qi(u[w], null);
        }
      };
  };
}
bi(mc, "composeRefs");
function hc(...u) {
  return le.useCallback(mc(...u), u);
}
bi(hc, "useComposedRefs");
var Jf = Object.defineProperty, wt = (u, p) => Jf(u, "name", { value: p, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function gc(u) {
  const p = le.forwardRef((s, y) => {
    let { children: w, ...x } = s, z = null, _ = !1;
    const L = [];
    Gi(w) && typeof Wl == "function" && (w = Wl(w._payload)), le.Children.forEach(w, (W) => {
      var oe;
      if (xc(W)) {
        _ = !0;
        const ee = W;
        let A = "child" in ee.props ? ee.props.child : ee.props.children;
        Gi(A) && typeof Wl == "function" && (A = Wl(A._payload)), z = ep(ee, A), L.push((oe = z == null ? void 0 : z.props) == null ? void 0 : oe.children);
      } else
        L.push(W);
    }), z ? z = le.cloneElement(z, void 0, L) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !_ && le.Children.count(w) === 1 && le.isValidElement(w) && (z = w)
    );
    const $ = z ? wc(z) : void 0, G = hc(y, $);
    if (!z) {
      if (w || w === 0)
        throw new Error(
          _ ? rp(u) : np(u)
        );
      return w;
    }
    const H = yc(x, z.props ?? {});
    return z.type !== le.Fragment && (H.ref = y ? G : $), le.cloneElement(z, H);
  });
  return p.displayName = `${u}.Slot`, p;
}
wt(gc, "createSlot");
var qf = /* @__PURE__ */ gc("Slot"), vc = Symbol.for("radix.slottable");
// @__NO_SIDE_EFFECTS__
function bf(u) {
  const p = /* @__PURE__ */ wt((s) => "child" in s ? s.children(s.child) : s.children, "Slottable");
  return p.displayName = `${u}.Slottable`, p.__radixId = vc, p;
}
wt(bf, "createSlottable");
var ep = /* @__PURE__ */ wt((u, p) => {
  if ("child" in u.props) {
    const s = u.props.child;
    return le.isValidElement(s) ? le.cloneElement(s, void 0, u.props.children(s.props.children)) : null;
  }
  return le.isValidElement(p) ? p : null;
}, "getSlottableElementFromSlottable");
function yc(u, p) {
  const s = { ...p };
  for (const y in p) {
    const w = u[y], x = p[y];
    /^on[A-Z]/.test(y) ? w && x ? s[y] = (..._) => {
      const L = x(..._);
      return w(..._), L;
    } : w && (s[y] = w) : y === "style" ? s[y] = { ...w, ...x } : y === "className" && (s[y] = [w, x].filter(Boolean).join(" "));
  }
  return { ...u, ...s };
}
wt(yc, "mergeProps");
function wc(u) {
  var y, w;
  let p = (y = Object.getOwnPropertyDescriptor(u.props, "ref")) == null ? void 0 : y.get, s = p && "isReactWarning" in p && p.isReactWarning;
  return s ? u.ref : (p = (w = Object.getOwnPropertyDescriptor(u, "ref")) == null ? void 0 : w.get, s = p && "isReactWarning" in p && p.isReactWarning, s ? u.props.ref : u.props.ref || u.ref);
}
wt(wc, "getElementRef");
function xc(u) {
  return le.isValidElement(u) && typeof u.type == "function" && "__radixId" in u.type && u.type.__radixId === vc;
}
wt(xc, "isSlottable");
var tp = Symbol.for("react.lazy");
function Gi(u) {
  return u != null && typeof u == "object" && "$$typeof" in u && u.$$typeof === tp && "_payload" in u && kc(u._payload);
}
wt(Gi, "isLazyComponent");
function kc(u) {
  return typeof u == "object" && u !== null && "then" in u;
}
wt(kc, "isPromiseLike");
var np = /* @__PURE__ */ wt((u) => `${u} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), rp = /* @__PURE__ */ wt((u) => `${u} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), Wl = Uf[" use ".trim().toString()];
function Sc(u) {
  var p, s, y = "";
  if (typeof u == "string" || typeof u == "number") y += u;
  else if (typeof u == "object") if (Array.isArray(u)) {
    var w = u.length;
    for (p = 0; p < w; p++) u[p] && (s = Sc(u[p])) && (y && (y += " "), y += s);
  } else for (s in u) u[s] && (y && (y += " "), y += s);
  return y;
}
function Cc() {
  for (var u, p, s = 0, y = "", w = arguments.length; s < w; s++) (u = arguments[s]) && (p = Sc(u)) && (y && (y += " "), y += p);
  return y;
}
const sc = (u) => typeof u == "boolean" ? `${u}` : u === 0 ? "0" : u, ac = Cc, lp = (u, p) => (s) => {
  var y;
  if ((p == null ? void 0 : p.variants) == null) return ac(u, s == null ? void 0 : s.class, s == null ? void 0 : s.className);
  const { variants: w, defaultVariants: x } = p, z = Object.keys(w).map(($) => {
    const G = s == null ? void 0 : s[$], H = x == null ? void 0 : x[$];
    if (G === null) return null;
    const W = sc(G) || sc(H);
    return w[$][W];
  }), _ = s && Object.entries(s).reduce(($, G) => {
    let [H, W] = G;
    return W === void 0 || ($[H] = W), $;
  }, {}), L = p == null || (y = p.compoundVariants) === null || y === void 0 ? void 0 : y.reduce(($, G) => {
    let { class: H, className: W, ...oe } = G;
    return Object.entries(oe).every((ee) => {
      let [A, D] = ee;
      return Array.isArray(D) ? D.includes({
        ...x,
        ..._
      }[A]) : {
        ...x,
        ..._
      }[A] === D;
    }) ? [
      ...$,
      H,
      W
    ] : $;
  }, []);
  return ac(u, z, L, s == null ? void 0 : s.class, s == null ? void 0 : s.className);
}, eu = "-", op = (u) => {
  const p = up(u), {
    conflictingClassGroups: s,
    conflictingClassGroupModifiers: y
  } = u;
  return {
    getClassGroupId: (z) => {
      const _ = z.split(eu);
      return _[0] === "" && _.length !== 1 && _.shift(), Ec(_, p) || ip(z);
    },
    getConflictingClassGroupIds: (z, _) => {
      const L = s[z] || [];
      return _ && y[z] ? [...L, ...y[z]] : L;
    }
  };
}, Ec = (u, p) => {
  var z;
  if (u.length === 0)
    return p.classGroupId;
  const s = u[0], y = p.nextPart.get(s), w = y ? Ec(u.slice(1), y) : void 0;
  if (w)
    return w;
  if (p.validators.length === 0)
    return;
  const x = u.join(eu);
  return (z = p.validators.find(({
    validator: _
  }) => _(x))) == null ? void 0 : z.classGroupId;
}, cc = /^\[(.+)\]$/, ip = (u) => {
  if (cc.test(u)) {
    const p = cc.exec(u)[1], s = p == null ? void 0 : p.substring(0, p.indexOf(":"));
    if (s)
      return "arbitrary.." + s;
  }
}, up = (u) => {
  const {
    theme: p,
    prefix: s
  } = u, y = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return ap(Object.entries(u.classGroups), s).forEach(([x, z]) => {
    Ki(z, y, x, p);
  }), y;
}, Ki = (u, p, s, y) => {
  u.forEach((w) => {
    if (typeof w == "string") {
      const x = w === "" ? p : dc(p, w);
      x.classGroupId = s;
      return;
    }
    if (typeof w == "function") {
      if (sp(w)) {
        Ki(w(y), p, s, y);
        return;
      }
      p.validators.push({
        validator: w,
        classGroupId: s
      });
      return;
    }
    Object.entries(w).forEach(([x, z]) => {
      Ki(z, dc(p, x), s, y);
    });
  });
}, dc = (u, p) => {
  let s = u;
  return p.split(eu).forEach((y) => {
    s.nextPart.has(y) || s.nextPart.set(y, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), s = s.nextPart.get(y);
  }), s;
}, sp = (u) => u.isThemeGetter, ap = (u, p) => p ? u.map(([s, y]) => {
  const w = y.map((x) => typeof x == "string" ? p + x : typeof x == "object" ? Object.fromEntries(Object.entries(x).map(([z, _]) => [p + z, _])) : x);
  return [s, w];
}) : u, cp = (u) => {
  if (u < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let p = 0, s = /* @__PURE__ */ new Map(), y = /* @__PURE__ */ new Map();
  const w = (x, z) => {
    s.set(x, z), p++, p > u && (p = 0, y = s, s = /* @__PURE__ */ new Map());
  };
  return {
    get(x) {
      let z = s.get(x);
      if (z !== void 0)
        return z;
      if ((z = y.get(x)) !== void 0)
        return w(x, z), z;
    },
    set(x, z) {
      s.has(x) ? s.set(x, z) : w(x, z);
    }
  };
}, Nc = "!", dp = (u) => {
  const {
    separator: p,
    experimentalParseClassName: s
  } = u, y = p.length === 1, w = p[0], x = p.length, z = (_) => {
    const L = [];
    let $ = 0, G = 0, H;
    for (let D = 0; D < _.length; D++) {
      let se = _[D];
      if ($ === 0) {
        if (se === w && (y || _.slice(D, D + x) === p)) {
          L.push(_.slice(G, D)), G = D + x;
          continue;
        }
        if (se === "/") {
          H = D;
          continue;
        }
      }
      se === "[" ? $++ : se === "]" && $--;
    }
    const W = L.length === 0 ? _ : _.substring(G), oe = W.startsWith(Nc), ee = oe ? W.substring(1) : W, A = H && H > G ? H - G : void 0;
    return {
      modifiers: L,
      hasImportantModifier: oe,
      baseClassName: ee,
      maybePostfixModifierPosition: A
    };
  };
  return s ? (_) => s({
    className: _,
    parseClassName: z
  }) : z;
}, fp = (u) => {
  if (u.length <= 1)
    return u;
  const p = [];
  let s = [];
  return u.forEach((y) => {
    y[0] === "[" ? (p.push(...s.sort(), y), s = []) : s.push(y);
  }), p.push(...s.sort()), p;
}, pp = (u) => ({
  cache: cp(u.cacheSize),
  parseClassName: dp(u),
  ...op(u)
}), mp = /\s+/, hp = (u, p) => {
  const {
    parseClassName: s,
    getClassGroupId: y,
    getConflictingClassGroupIds: w
  } = p, x = [], z = u.trim().split(mp);
  let _ = "";
  for (let L = z.length - 1; L >= 0; L -= 1) {
    const $ = z[L], {
      modifiers: G,
      hasImportantModifier: H,
      baseClassName: W,
      maybePostfixModifierPosition: oe
    } = s($);
    let ee = !!oe, A = y(ee ? W.substring(0, oe) : W);
    if (!A) {
      if (!ee) {
        _ = $ + (_.length > 0 ? " " + _ : _);
        continue;
      }
      if (A = y(W), !A) {
        _ = $ + (_.length > 0 ? " " + _ : _);
        continue;
      }
      ee = !1;
    }
    const D = fp(G).join(":"), se = H ? D + Nc : D, de = se + A;
    if (x.includes(de))
      continue;
    x.push(de);
    const B = w(A, ee);
    for (let K = 0; K < B.length; ++K) {
      const ge = B[K];
      x.push(se + ge);
    }
    _ = $ + (_.length > 0 ? " " + _ : _);
  }
  return _;
};
function gp() {
  let u = 0, p, s, y = "";
  for (; u < arguments.length; )
    (p = arguments[u++]) && (s = _c(p)) && (y && (y += " "), y += s);
  return y;
}
const _c = (u) => {
  if (typeof u == "string")
    return u;
  let p, s = "";
  for (let y = 0; y < u.length; y++)
    u[y] && (p = _c(u[y])) && (s && (s += " "), s += p);
  return s;
};
function vp(u, ...p) {
  let s, y, w, x = z;
  function z(L) {
    const $ = p.reduce((G, H) => H(G), u());
    return s = pp($), y = s.cache.get, w = s.cache.set, x = _, _(L);
  }
  function _(L) {
    const $ = y(L);
    if ($)
      return $;
    const G = hp(L, s);
    return w(L, G), G;
  }
  return function() {
    return x(gp.apply(null, arguments));
  };
}
const he = (u) => {
  const p = (s) => s[u] || [];
  return p.isThemeGetter = !0, p;
}, zc = /^\[(?:([a-z-]+):)?(.+)\]$/i, yp = /^\d+\/\d+$/, wp = /* @__PURE__ */ new Set(["px", "full", "screen"]), xp = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, kp = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Sp = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Cp = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Ep = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Mt = (u) => Vn(u) || wp.has(u) || yp.test(u), bt = (u) => $n(u, "length", Tp), Vn = (u) => !!u && !Number.isNaN(Number(u)), Wi = (u) => $n(u, "number", Vn), jr = (u) => !!u && Number.isInteger(Number(u)), Np = (u) => u.endsWith("%") && Vn(u.slice(0, -1)), Y = (u) => zc.test(u), en = (u) => xp.test(u), _p = /* @__PURE__ */ new Set(["length", "size", "percentage"]), zp = (u) => $n(u, _p, jc), jp = (u) => $n(u, "position", jc), Pp = /* @__PURE__ */ new Set(["image", "url"]), Rp = (u) => $n(u, Pp, Op), Lp = (u) => $n(u, "", Mp), Pr = () => !0, $n = (u, p, s) => {
  const y = zc.exec(u);
  return y ? y[1] ? typeof p == "string" ? y[1] === p : p.has(y[1]) : s(y[2]) : !1;
}, Tp = (u) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  kp.test(u) && !Sp.test(u)
), jc = () => !1, Mp = (u) => Cp.test(u), Op = (u) => Ep.test(u), Ip = () => {
  const u = he("colors"), p = he("spacing"), s = he("blur"), y = he("brightness"), w = he("borderColor"), x = he("borderRadius"), z = he("borderSpacing"), _ = he("borderWidth"), L = he("contrast"), $ = he("grayscale"), G = he("hueRotate"), H = he("invert"), W = he("gap"), oe = he("gradientColorStops"), ee = he("gradientColorStopPositions"), A = he("inset"), D = he("margin"), se = he("opacity"), de = he("padding"), B = he("saturate"), K = he("scale"), ge = he("sepia"), ke = he("skew"), Te = he("space"), $e = he("translate"), lt = () => ["auto", "contain", "none"], Ze = () => ["auto", "hidden", "clip", "visible", "scroll"], dt = () => ["auto", Y, p], q = () => [Y, p], Ie = () => ["", Mt, bt], De = () => ["auto", Vn, Y], Je = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], _e = () => ["solid", "dashed", "dotted", "double", "none"], fe = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], j = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], F = () => ["", "0", Y], R = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], f = () => [Vn, Y];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [Pr],
      spacing: [Mt, bt],
      blur: ["none", "", en, Y],
      brightness: f(),
      borderColor: [u],
      borderRadius: ["none", "", "full", en, Y],
      borderSpacing: q(),
      borderWidth: Ie(),
      contrast: f(),
      grayscale: F(),
      hueRotate: f(),
      invert: F(),
      gap: q(),
      gradientColorStops: [u],
      gradientColorStopPositions: [Np, bt],
      inset: dt(),
      margin: dt(),
      opacity: f(),
      padding: q(),
      saturate: f(),
      scale: f(),
      sepia: F(),
      skew: f(),
      space: q(),
      translate: q()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", Y]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [en]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": R()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": R()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [...Je(), Y]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: Ze()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": Ze()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": Ze()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: lt()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": lt()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": lt()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [A]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [A]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [A]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [A]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [A]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [A]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [A]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [A]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [A]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", jr, Y]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: dt()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", Y]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: F()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: F()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", jr, Y]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [Pr]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", jr, Y]
        }, Y]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": De()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": De()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [Pr]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [jr, Y]
        }, Y]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": De()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": De()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", Y]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", Y]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [W]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [W]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [W]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...j()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...j(), "baseline"]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [...j(), "baseline"]
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [de]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [de]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [de]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [de]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [de]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [de]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [de]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [de]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [de]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [D]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [D]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [D]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [D]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [D]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [D]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [D]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [D]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [D]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [Te]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [Te]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", Y, p]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [Y, p, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [Y, p, "none", "full", "min", "max", "fit", "prose", {
          screen: [en]
        }, en]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [Y, p, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [Y, p, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [Y, p, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [Y, p, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", en, bt]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Wi]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Pr]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", Y]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", Vn, Wi]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", Mt, Y]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", Y]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", Y]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [u]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [se]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [u]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [se]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [..._e(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", Mt, bt]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", Mt, Y]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [u]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: q()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", Y]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", Y]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [se]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [...Je(), jp]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", zp]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, Rp]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [u]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [ee]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [ee]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [ee]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [oe]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [oe]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [oe]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [x]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [x]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [x]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [x]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [x]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [x]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [x]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [x]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [x]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [x]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [x]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [x]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [x]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [x]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [x]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [_]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [_]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [_]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [_]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [_]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [_]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [_]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [_]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [_]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [se]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [..._e(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [_]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [_]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [se]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: _e()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [w]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [w]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [w]
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": [w]
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": [w]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [w]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [w]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [w]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [w]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [w]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ..._e()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [Mt, Y]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [Mt, bt]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [u]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: Ie()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [u]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [se]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [Mt, bt]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [u]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", en, Lp]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [Pr]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [se]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...fe(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": fe()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [s]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [y]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [L]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", en, Y]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [$]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [G]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [H]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [B]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [ge]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [s]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [y]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [L]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [$]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [G]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [H]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [se]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [B]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [ge]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [z]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [z]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [z]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", Y]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: f()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", Y]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: f()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", Y]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [K]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [K]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [K]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [jr, Y]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [$e]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [$e]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [ke]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [ke]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", Y]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", u]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", Y]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [u]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": q()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": q()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": q()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": q()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": q()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": q()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": q()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": q()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": q()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": q()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": q()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": q()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": q()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": q()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": q()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": q()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": q()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": q()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", Y]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [u, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [Mt, bt, Wi]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [u, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}, Dp = /* @__PURE__ */ vp(Ip);
function Rr(...u) {
  return Dp(Cc(u));
}
const Fp = lp(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[.98]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80"
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 rounded-lg px-3",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: { variant: "default", size: "default" }
  }
), Yi = le.forwardRef(
  ({ className: u, variant: p, size: s, asChild: y = !1, ...w }, x) => {
    const z = y ? qf : "button";
    return /* @__PURE__ */ v.jsx(z, { className: Rr(Fp({ variant: p, size: s, className: u })), ref: x, ...w });
  }
);
Yi.displayName = "Button";
const Xi = le.forwardRef(
  ({ className: u, ...p }, s) => /* @__PURE__ */ v.jsx("div", { ref: s, className: Rr("rounded-2xl border bg-card text-card-foreground shadow-soft", u), ...p })
);
Xi.displayName = "Card";
const Zi = le.forwardRef(
  ({ className: u, ...p }, s) => /* @__PURE__ */ v.jsx("div", { ref: s, className: Rr("flex flex-col gap-1.5 p-6", u), ...p })
);
Zi.displayName = "CardHeader";
const Ji = le.forwardRef(
  ({ className: u, ...p }, s) => /* @__PURE__ */ v.jsx("div", { ref: s, className: Rr("p-6 pt-0", u), ...p })
);
Ji.displayName = "CardContent";
const Pc = le.forwardRef(
  ({ className: u, type: p, ...s }, y) => /* @__PURE__ */ v.jsx(
    "input",
    {
      type: p,
      className: Rr(
        "flex h-12 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm shadow-sm outline-none transition placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        u
      ),
      ref: y,
      ...s
    }
  )
);
Pc.displayName = "Input";
const Ap = ["Artificial intelligence", "Climate", "Space"], Up = [
  { id: "both", label: "News + Reddit", detail: "The full picture", icon: pc },
  { id: "news", label: "News", detail: "Trusted headlines", icon: Kf },
  { id: "reddit", label: "Reddit", detail: "Community pulse", icon: Hi }
];
function Vp({ data: u, onGenerate: p }) {
  const [s, y] = le.useState("both"), [w, x] = le.useState([]), [z, _] = le.useState(""), [L, $] = le.useState("idle"), [G, H] = le.useState(""), [W, oe] = le.useState("");
  le.useEffect(() => {
    u.status && u.status !== "idle" && ($(u.status), H(u.error ?? ""), oe(u.audioDataUrl ?? ""), u.topics && x(u.topics));
  }, [u.status, u.error, u.audioDataUrl, u.topics]);
  const ee = le.useMemo(() => {
    var K;
    const B = (K = w[0]) == null ? void 0 : K.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return B ? `sonic-summary-${B}.mp3` : "sonic-summary.mp3";
  }, [w]);
  function A(B = z) {
    const K = B.trim().replace(/\s+/g, " ");
    !K || w.some((ge) => ge.toLowerCase() === K.toLowerCase()) || w.length >= 3 || (x((ge) => [...ge, K]), _(""));
  }
  function D(B) {
    B.key === "Enter" && (B.preventDefault(), A());
  }
  function se(B) {
    B.preventDefault(), !(!w.length || L === "loading") && ($("loading"), H(""), oe(""), p({ requestId: `${Date.now()}-${Math.random().toString(36).slice(2)}`, topics: w, source: s }));
  }
  const de = ["Finding the stories", "Making sense of the conversation", "Recording your briefing"];
  return /* @__PURE__ */ v.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ v.jsxs("header", { className: "sticky top-0 z-50 mx-auto flex w-full max-w-7xl items-center justify-between border-b border-border/60 bg-background/90 px-5 py-4 backdrop-blur-md sm:px-8 lg:px-12", children: [
      /* @__PURE__ */ v.jsxs("a", { href: "#top", className: "flex items-center gap-3", "aria-label": "SonicSummary home", children: [
        /* @__PURE__ */ v.jsx("span", { className: "brand-mark", children: /* @__PURE__ */ v.jsx(Hi, { size: 21, strokeWidth: 2.3 }) }),
        /* @__PURE__ */ v.jsxs("span", { className: "text-[17px] font-bold tracking-[-.04em]", children: [
          "sonic",
          /* @__PURE__ */ v.jsx("span", { className: "text-primary", children: "summary" })
        ] })
      ] }),
      /* @__PURE__ */ v.jsxs("div", { className: "hidden items-center gap-2 rounded-full border bg-white/70 px-3 py-2 text-xs font-medium text-muted-foreground shadow-sm sm:flex", children: [
        /* @__PURE__ */ v.jsx("span", { className: "live-dot" }),
        " Your daily listening desk"
      ] }),
      /* @__PURE__ */ v.jsxs("a", { href: "#how-it-works", className: "inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground", children: [
        /* @__PURE__ */ v.jsx(Qf, { size: 17 }),
        " ",
        /* @__PURE__ */ v.jsx("span", { className: "hidden sm:inline", children: "How it works" })
      ] })
    ] }),
    /* @__PURE__ */ v.jsxs("main", { id: "top", className: "mx-auto grid w-full max-w-7xl gap-8 px-5 pb-14 pt-4 sm:px-8 md:pt-6 lg:grid-cols-[minmax(0,1fr)_330px] lg:gap-12 lg:px-12 lg:pt-8", children: [
      /* @__PURE__ */ v.jsxs("section", { className: "min-w-0", children: [
        /* @__PURE__ */ v.jsxs("div", { className: "mb-7 max-w-2xl", children: [
          /* @__PURE__ */ v.jsxs("div", { className: "eyebrow", children: [
            /* @__PURE__ */ v.jsx(uc, { size: 14 }),
            " A LITTLE MORE SIGNAL, A LOT LESS SCROLL"
          ] }),
          /* @__PURE__ */ v.jsxs("h1", { className: "mt-5 max-w-[720px] text-4xl font-semibold leading-[1.08] tracking-[-.055em] sm:text-5xl lg:text-[62px]", children: [
            "Catch up on what ",
            /* @__PURE__ */ v.jsx("span", { className: "headline-accent", children: "matters." })
          ] }),
          /* @__PURE__ */ v.jsx("p", { className: "mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg", children: "Choose a topic. We’ll bring together the headlines and the conversation, then turn it into a briefing you can listen to anywhere." })
        ] }),
        /* @__PURE__ */ v.jsxs(Xi, { className: "overflow-hidden border-white/80 bg-white/90", children: [
          /* @__PURE__ */ v.jsx(Zi, { className: "border-b border-border/70 pb-5 sm:px-7 sm:pt-7", children: /* @__PURE__ */ v.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
            /* @__PURE__ */ v.jsxs("div", { children: [
              /* @__PURE__ */ v.jsx("p", { className: "text-xs font-semibold uppercase tracking-[.15em] text-primary", children: "Your briefing" }),
              /* @__PURE__ */ v.jsx("h2", { className: "mt-1 text-xl font-semibold tracking-tight", children: "What are you curious about?" })
            ] }),
            /* @__PURE__ */ v.jsx("div", { className: "hidden h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-primary sm:flex", children: /* @__PURE__ */ v.jsx(Gf, { size: 21 }) })
          ] }) }),
          /* @__PURE__ */ v.jsxs(Ji, { className: "space-y-7 p-5 sm:p-7", children: [
            /* @__PURE__ */ v.jsxs("div", { children: [
              /* @__PURE__ */ v.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
                /* @__PURE__ */ v.jsx("label", { htmlFor: "topic-input", className: "text-sm font-semibold", children: "Topics" }),
                /* @__PURE__ */ v.jsx("span", { className: "text-xs text-muted-foreground", children: "Up to 3" })
              ] }),
              /* @__PURE__ */ v.jsxs("div", { className: "topic-input-wrap", onClick: () => {
                var B;
                return (B = document.getElementById("topic-input")) == null ? void 0 : B.focus();
              }, children: [
                w.map((B) => /* @__PURE__ */ v.jsxs("span", { className: "topic-chip", children: [
                  B,
                  /* @__PURE__ */ v.jsx("button", { type: "button", "aria-label": `Remove ${B}`, onClick: (K) => {
                    K.stopPropagation(), x((ge) => ge.filter((ke) => ke !== B));
                  }, children: /* @__PURE__ */ v.jsx(Xf, { size: 14 }) })
                ] }, B)),
                /* @__PURE__ */ v.jsx(
                  Pc,
                  {
                    id: "topic-input",
                    className: "min-w-[170px] flex-1 border-0 bg-transparent px-1 shadow-none focus-visible:ring-0",
                    value: z,
                    onChange: (B) => _(B.target.value),
                    onKeyDown: D,
                    placeholder: w.length ? "Add another topic…" : "Try “artificial intelligence”",
                    disabled: w.length >= 3 || L === "loading",
                    "aria-describedby": "topic-help"
                  }
                ),
                z.trim() && w.length < 3 && /* @__PURE__ */ v.jsxs(Yi, { type: "button", variant: "secondary", size: "sm", onClick: () => A(), children: [
                  /* @__PURE__ */ v.jsx(Yf, { size: 15 }),
                  " Add"
                ] })
              ] }),
              /* @__PURE__ */ v.jsx("p", { id: "topic-help", className: "mt-2 text-xs text-muted-foreground", children: "Press Enter to add a topic. A focused brief is usually best." }),
              !w.length && /* @__PURE__ */ v.jsxs("div", { className: "mt-4 flex flex-wrap items-center gap-2", children: [
                /* @__PURE__ */ v.jsx("span", { className: "mr-1 text-xs text-muted-foreground", children: "Try:" }),
                Ap.map((B) => /* @__PURE__ */ v.jsxs("button", { type: "button", onClick: () => A(B), className: "suggestion-chip", children: [
                  B,
                  /* @__PURE__ */ v.jsx(lc, { size: 12 })
                ] }, B))
              ] })
            ] }),
            /* @__PURE__ */ v.jsxs("fieldset", { children: [
              /* @__PURE__ */ v.jsx("legend", { className: "mb-3 text-sm font-semibold", children: "Listen from" }),
              /* @__PURE__ */ v.jsx("div", { className: "grid gap-2 sm:grid-cols-3", children: Up.map(({ id: B, label: K, detail: ge, icon: ke }) => /* @__PURE__ */ v.jsxs(
                "button",
                {
                  className: `source-option ${s === B ? "source-option-active" : ""}`,
                  type: "button",
                  "aria-pressed": s === B,
                  onClick: () => y(B),
                  children: [
                    /* @__PURE__ */ v.jsx("span", { className: "source-icon", children: /* @__PURE__ */ v.jsx(ke, { size: 17 }) }),
                    /* @__PURE__ */ v.jsxs("span", { className: "min-w-0 text-left", children: [
                      /* @__PURE__ */ v.jsx("span", { className: "block text-xs font-semibold", children: K }),
                      /* @__PURE__ */ v.jsx("span", { className: "mt-0.5 block truncate text-[10px] text-muted-foreground", children: ge })
                    ] }),
                    s === B && /* @__PURE__ */ v.jsx(Hf, { className: "ml-auto text-primary", size: 15 })
                  ]
                },
                B
              )) })
            ] }),
            /* @__PURE__ */ v.jsx("form", { onSubmit: se, children: /* @__PURE__ */ v.jsx(Yi, { className: "h-12 w-full rounded-xl text-[15px] shadow-[0_10px_22px_-10px_rgba(104,82,219,.7)]", disabled: !w.length || L === "loading", children: L === "loading" ? /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
              /* @__PURE__ */ v.jsx(ic, { className: "animate-spin", size: 18 }),
              " Building your briefing…"
            ] }) : /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
              /* @__PURE__ */ v.jsx(Hi, { size: 18 }),
              " Make my audio briefing ",
              /* @__PURE__ */ v.jsx(lc, { size: 17, className: "ml-auto" })
            ] }) }) }),
            L === "loading" && /* @__PURE__ */ v.jsxs("div", { className: "rounded-xl bg-violet-50/80 p-4", role: "status", "aria-live": "polite", children: [
              /* @__PURE__ */ v.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ v.jsx(ic, { className: "animate-spin text-primary", size: 18 }),
                /* @__PURE__ */ v.jsx("p", { className: "text-sm font-medium", children: "Putting the pieces together" })
              ] }),
              /* @__PURE__ */ v.jsx("div", { className: "mt-4 grid gap-2 sm:grid-cols-3", children: de.map((B, K) => /* @__PURE__ */ v.jsxs("div", { className: "flex items-center gap-2 text-[11px] text-muted-foreground", children: [
                /* @__PURE__ */ v.jsx("span", { className: "step-dot", children: K + 1 }),
                B
              ] }, B)) }),
              /* @__PURE__ */ v.jsx("div", { className: "progress-track mt-4", children: /* @__PURE__ */ v.jsx("span", {}) })
            ] }),
            L === "error" && /* @__PURE__ */ v.jsx("div", { role: "alert", className: "rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700", children: G }),
            L === "done" && W && /* @__PURE__ */ v.jsxs("div", { className: "audio-result", "aria-live": "polite", children: [
              /* @__PURE__ */ v.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
                /* @__PURE__ */ v.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ v.jsx("span", { className: "result-icon", children: /* @__PURE__ */ v.jsx(oc, { size: 19 }) }),
                  /* @__PURE__ */ v.jsxs("div", { children: [
                    /* @__PURE__ */ v.jsx("p", { className: "text-sm font-semibold", children: "Your briefing is ready" }),
                    /* @__PURE__ */ v.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: w.join(" · ") })
                  ] })
                ] }),
                /* @__PURE__ */ v.jsxs("a", { href: W, download: ee, className: "download-link", children: [
                  /* @__PURE__ */ v.jsx(Bf, { size: 15 }),
                  " Download"
                ] })
              ] }),
              /* @__PURE__ */ v.jsx("audio", { className: "mt-4 w-full", controls: !0, src: W, "aria-label": "Your audio briefing" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ v.jsx("p", { className: "mt-8 text-center text-xs text-muted-foreground", children: "Made for your ears, not your feed. Briefings are generated just for you." })
      ] }),
      /* @__PURE__ */ v.jsxs("aside", { id: "how-it-works", className: "space-y-4 lg:pt-2", children: [
        /* @__PURE__ */ v.jsxs("div", { className: "listen-card relative overflow-hidden rounded-3xl p-6 text-white sm:p-7", children: [
          /* @__PURE__ */ v.jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ v.jsxs("div", { className: "flex items-center gap-2 text-xs font-semibold text-white/75", children: [
              /* @__PURE__ */ v.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-300" }),
              " YOUR PERSONAL NEWSROOM"
            ] }),
            /* @__PURE__ */ v.jsx("h2", { className: "mt-6 max-w-[240px] text-2xl font-semibold leading-tight tracking-[-.04em]", children: "The important bits, in your own time." }),
            /* @__PURE__ */ v.jsx("p", { className: "mt-3 max-w-[245px] text-sm leading-6 text-white/70", children: "A thoughtful, audio-first catch-up built around the things you care about." }),
            /* @__PURE__ */ v.jsx("div", { className: "waveform", "aria-hidden": "true", children: Array.from({ length: 28 }, (B, K) => /* @__PURE__ */ v.jsx("span", { style: { height: `${12 + (K * 19 + 7) % 30}px`, opacity: 0.35 + K * 13 % 60 / 100 } }, K)) })
          ] }),
          /* @__PURE__ */ v.jsx("div", { className: "listen-orb", "aria-hidden": "true" })
        ] }),
        /* @__PURE__ */ v.jsxs(Xi, { className: "border-white/80 bg-white/80 shadow-sm", children: [
          /* @__PURE__ */ v.jsx(Zi, { className: "px-5 pb-3 pt-5", children: /* @__PURE__ */ v.jsx("p", { className: "text-sm font-semibold", children: "A simpler way to stay in the loop" }) }),
          /* @__PURE__ */ v.jsxs(Ji, { className: "space-y-4 px-5 pb-5", children: [
            /* @__PURE__ */ v.jsxs("div", { className: "how-row", children: [
              /* @__PURE__ */ v.jsx("span", { className: "how-icon", children: /* @__PURE__ */ v.jsx(uc, { size: 16 }) }),
              /* @__PURE__ */ v.jsxs("div", { children: [
                /* @__PURE__ */ v.jsx("p", { className: "text-xs font-semibold", children: "Pick what matters" }),
                /* @__PURE__ */ v.jsx("p", { className: "mt-1 text-xs leading-5 text-muted-foreground", children: "Choose a topic and the sources you trust." })
              ] })
            ] }),
            /* @__PURE__ */ v.jsxs("div", { className: "how-row", children: [
              /* @__PURE__ */ v.jsx("span", { className: "how-icon", children: /* @__PURE__ */ v.jsx(pc, { size: 16 }) }),
              /* @__PURE__ */ v.jsxs("div", { children: [
                /* @__PURE__ */ v.jsx("p", { className: "text-xs font-semibold", children: "We connect the dots" }),
                /* @__PURE__ */ v.jsx("p", { className: "mt-1 text-xs leading-5 text-muted-foreground", children: "Headlines and community perspectives, brought together." })
              ] })
            ] }),
            /* @__PURE__ */ v.jsxs("div", { className: "how-row", children: [
              /* @__PURE__ */ v.jsx("span", { className: "how-icon", children: /* @__PURE__ */ v.jsx(oc, { size: 16 }) }),
              /* @__PURE__ */ v.jsxs("div", { children: [
                /* @__PURE__ */ v.jsx("p", { className: "text-xs font-semibold", children: "Take it with you" }),
                /* @__PURE__ */ v.jsx("p", { className: "mt-1 text-xs leading-5 text-muted-foreground", children: "Listen here or save the MP3 for later." })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ v.jsx("p", { className: "px-2 text-center text-[11px] leading-5 text-muted-foreground", children: "Sources can be selected independently. AI summaries may miss context—explore original reporting for important decisions." })
      ] })
    ] }),
    /* @__PURE__ */ v.jsxs("footer", { className: "mx-auto flex max-w-7xl items-center justify-between border-t border-border/60 px-5 py-5 text-xs text-muted-foreground sm:px-8 lg:px-12", children: [
      /* @__PURE__ */ v.jsxs("span", { className: "font-semibold tracking-tight text-foreground/70", children: [
        "sonic",
        /* @__PURE__ */ v.jsx("span", { className: "text-primary", children: "summary" })
      ] }),
      /* @__PURE__ */ v.jsx("span", { children: "Less scrolling. Better listening." })
    ] })
  ] });
}
const Bi = /* @__PURE__ */ new WeakMap();
function $p(u) {
  const { parentElement: p, data: s, setTriggerValue: y } = u, w = p.querySelector("#sonic-summary-root");
  if (!(w instanceof HTMLElement))
    throw new Error("SonicSummary mount element was not found.");
  let x = Bi.get(p);
  return x || (x = Ff.createRoot(w), Bi.set(p, x)), x.render(
    /* @__PURE__ */ v.jsx(
      Vp,
      {
        data: s ?? { status: "idle" },
        onGenerate: (z) => y("generate", z)
      }
    )
  ), () => {
    x == null || x.unmount(), Bi.delete(p);
  };
}
export {
  $p as default
};
