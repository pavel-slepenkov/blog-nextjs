(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[105],{227:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getDomainLocale=function(e,t,n,o){return!1},("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1551:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n(2648).Z,r=n(7273).Z,u=o(n(7294)),a=n(1003),l=n(7795),i=n(4465),c=n(2692),f=n(8245),s=n(9246),d=n(227),p=n(3468);let v=new Set;function g(e,t,n,o){if(a.isLocalURL(t)){if(!o.bypassPrefetchedCheck){let r=void 0!==o.locale?o.locale:"locale"in e?e.locale:void 0,u=t+"%"+n+"%"+r;if(v.has(u))return;v.add(u)}Promise.resolve(e.prefetch(t,n,o)).catch(e=>{})}}function h(e){return"string"==typeof e?e:l.formatUrl(e)}let y=u.default.forwardRef(function(e,t){let n,o;let{href:l,as:v,children:y,prefetch:m,passHref:b,replace:k,shallow:E,scroll:C,locale:M,onClick:S,onMouseEnter:L,onTouchStart:_,legacyBehavior:O=!1}=e,w=r(e,["href","as","children","prefetch","passHref","replace","shallow","scroll","locale","onClick","onMouseEnter","onTouchStart","legacyBehavior"]);n=y,O&&("string"==typeof n||"number"==typeof n)&&(n=u.default.createElement("a",null,n));let P=!1!==m,j=u.default.useContext(c.RouterContext),T=u.default.useContext(f.AppRouterContext),x=null!=j?j:T,I=!j,{href:R,as:D}=u.default.useMemo(()=>{if(!j){let e=h(l);return{href:e,as:v?h(v):e}}let[t,n]=a.resolveHref(j,l,!0);return{href:t,as:v?a.resolveHref(j,v):n||t}},[j,l,v]),N=u.default.useRef(R),K=u.default.useRef(D);O&&(o=u.default.Children.only(n));let U=O?o&&"object"==typeof o&&o.ref:t,[H,J,V]=s.useIntersection({rootMargin:"200px"}),Z=u.default.useCallback(e=>{(K.current!==D||N.current!==R)&&(V(),K.current=D,N.current=R),H(e),U&&("function"==typeof U?U(e):"object"==typeof U&&(U.current=e))},[D,U,R,V,H]);u.default.useEffect(()=>{x&&J&&P&&g(x,R,D,{locale:M})},[D,R,J,M,P,null==j?void 0:j.locale,x]);let A={ref:Z,onClick(e){O||"function"!=typeof S||S(e),O&&o.props&&"function"==typeof o.props.onClick&&o.props.onClick(e),x&&!e.defaultPrevented&&function(e,t,n,o,r,l,i,c,f,s){let{nodeName:d}=e.currentTarget,p="A"===d.toUpperCase();if(p&&(function(e){let{target:t}=e.currentTarget;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)||!a.isLocalURL(n)))return;e.preventDefault();let v=()=>{"beforePopState"in t?t[r?"replace":"push"](n,o,{shallow:l,locale:c,scroll:i}):t[r?"replace":"push"](o||n,{forceOptimisticNavigation:!s})};f?u.default.startTransition(v):v()}(e,x,R,D,k,E,C,M,I,P)},onMouseEnter(e){O||"function"!=typeof L||L(e),O&&o.props&&"function"==typeof o.props.onMouseEnter&&o.props.onMouseEnter(e),x&&(P||!I)&&g(x,R,D,{locale:M,priority:!0,bypassPrefetchedCheck:!0})},onTouchStart(e){O||"function"!=typeof _||_(e),O&&o.props&&"function"==typeof o.props.onTouchStart&&o.props.onTouchStart(e),x&&(P||!I)&&g(x,R,D,{locale:M,priority:!0,bypassPrefetchedCheck:!0})}};if(!O||b||"a"===o.type&&!("href"in o.props)){let B=void 0!==M?M:null==j?void 0:j.locale,Q=(null==j?void 0:j.isLocaleDomain)&&d.getDomainLocale(D,B,null==j?void 0:j.locales,null==j?void 0:j.domainLocales);A.href=Q||p.addBasePath(i.addLocale(D,B,null==j?void 0:j.defaultLocale))}return O?u.default.cloneElement(o,A):u.default.createElement("a",Object.assign({},w,A),n)});t.default=y,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},9246:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(e){let{rootRef:t,rootMargin:n,disabled:i}=e,c=i||!u,[f,s]=o.useState(!1),[d,p]=o.useState(null);o.useEffect(()=>{if(u){if(!c&&!f&&d&&d.tagName){let e=function(e,t,n){let{id:o,observer:r,elements:u}=function(e){let t;let n={root:e.root||null,margin:e.rootMargin||""},o=l.find(e=>e.root===n.root&&e.margin===n.margin);if(o&&(t=a.get(o)))return t;let r=new Map,u=new IntersectionObserver(e=>{e.forEach(e=>{let t=r.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)})},e);return t={id:n,observer:u,elements:r},l.push(n),a.set(n,t),t}(n);return u.set(e,t),r.observe(e),function(){if(u.delete(e),r.unobserve(e),0===u.size){r.disconnect(),a.delete(o);let t=l.findIndex(e=>e.root===o.root&&e.margin===o.margin);t>-1&&l.splice(t,1)}}}(d,e=>e&&s(e),{root:null==t?void 0:t.current,rootMargin:n});return e}}else if(!f){let o=r.requestIdleCallback(()=>s(!0));return()=>r.cancelIdleCallback(o)}},[d,c,n,t,f]);let v=o.useCallback(()=>{s(!1)},[]);return[p,f,v]};var o=n(7294),r=n(4686);let u="function"==typeof IntersectionObserver,a=new Map,l=[];("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},9008:function(e,t,n){e.exports=n(3121)},1664:function(e,t,n){e.exports=n(1551)},4357:function(e,t,n){"use strict";n.d(t,{Z:function(){return c}});var o=n(7294);function r(e,t,r,u){void 0===r&&(r=n.g),void 0===u&&(u={});var a=(0,o.useRef)(),l=u.capture,i=u.passive,c=u.once;(0,o.useEffect)(function(){a.current=t},[t]),(0,o.useEffect)(function(){if(r&&r.addEventListener){var t=function(e){return a.current(e)},n={capture:l,passive:i,once:c};return r.addEventListener(e,t,n),function(){r.removeEventListener(e,t,n)}}},[e,r,l,i,c])}var u={},a=function(){},l={classList:{add:a,remove:a}},i=function(e,t,a){void 0===a&&(a=n.g);var i=e?function(e,t){if(void 0===t&&(t=void 0!==n.g&&n.g.localStorage?n.g.localStorage:"undefined"!=typeof globalThis&&globalThis.localStorage?globalThis.localStorage:"undefined"!=typeof window&&window.localStorage?window.localStorage:"undefined"!=typeof localStorage?localStorage:null),t){var a,l=(a=t,{get:function(e,t){var n=a.getItem(e);return null==n?"function"==typeof t?t():t:JSON.parse(n)},set:function(e,t){a.setItem(e,JSON.stringify(t))}});return function(t){var n,a,i,c,f,s,d;return n=l.get,a=l.set,i=(0,o.useRef)(null),f=(c=(0,o.useState)(function(){return n(e,t)}))[0],s=c[1],r("storage",function(t){if(t.key===e){var n=JSON.parse(t.newValue);f!==n&&s(n)}}),(0,o.useEffect)(function(){return i.current=(u[e]||(u[e]={callbacks:[],value:t}),u[e].callbacks.push(s),{deregister:function(){var t=u[e].callbacks,n=t.indexOf(s);n>-1&&t.splice(n,1)},emit:function(t){u[e].value!==t&&(u[e].value=t,u[e].callbacks.forEach(function(e){s!==e&&e(t)}))}}),function(){i.current.deregister()}},[t,e]),d=(0,o.useCallback)(function(t){var n="function"==typeof t?t(f):t;a(e,n),s(n),i.current.emit(t)},[f,a,e]),[f,d]}}return o.useState}(e,t):o.useState,c=a.matchMedia?a.matchMedia("(prefers-color-scheme: dark)"):{},f="(prefers-color-scheme: dark)"===c.media,s=a.document&&a.document.body||l;return{usePersistedDarkModeState:i,getDefaultOnChange:function(e,t,n){return void 0===e&&(e=s),void 0===t&&(t="dark-mode"),void 0===n&&(n="light-mode"),function(o){e.classList.add(o?t:n),e.classList.remove(o?n:t)}},mediaQueryEventTarget:{addEventListener:function(e,t){return c.addListener&&c.addListener(t)},removeEventListener:function(e,t){return c.removeListener&&c.removeListener(t)}},getInitialValue:function(e){return f?c.matches:e}}};function c(e,t){void 0===e&&(e=!1),void 0===t&&(t={});var n=t.element,u=t.classNameDark,a=t.classNameLight,l=t.onChange,c=t.storageKey;void 0===c&&(c="darkMode");var f=t.storageProvider,s=t.global,d=(0,o.useMemo)(function(){return i(c,f,s)},[c,f,s]),p=d.getDefaultOnChange,v=d.mediaQueryEventTarget,g=(0,d.usePersistedDarkModeState)((0,d.getInitialValue)(e)),h=g[0],y=g[1],m=(0,o.useMemo)(function(){return l||p(n,u,a)},[l,n,u,a,p]);return(0,o.useEffect)(function(){m(h)},[m,h]),r("change",function(e){return y(e.matches)},v),{value:h,enable:(0,o.useCallback)(function(){return y(!0)},[y]),disable:(0,o.useCallback)(function(){return y(!1)},[y]),toggle:(0,o.useCallback)(function(){return y(function(e){return!e})},[y])}}}}]);