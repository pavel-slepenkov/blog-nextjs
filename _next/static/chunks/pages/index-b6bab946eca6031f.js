(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5557:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(4369)}])},2419:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var o=n(5893),a=n(8420),s=n(6159);function i(e){let{dateString:t}=e,n=(0,a.Z)(t);return(0,o.jsx)("time",{dateTime:t,children:(0,s.Z)(n,"LLLL d, yyyy")})}},7046:function(e,t,n){"use strict";n.d(t,{ZP:function(){return f},y7:function(){return j}});var o=n(5893),a=n(9008),s=n.n(a),i=n(536),r=n.n(i),l=n(1664),c=n.n(l),d=n(7294),_=n(4357),u=n(4109),g=n.n(u);let h=()=>{let e=(0,_.Z)(!1);return(0,o.jsxs)("div",{className:g().darkModeToggle,children:[(0,o.jsx)("button",{type:"button",onClick:e.disable,children:"\uD83C\uDF1E"}),(0,o.jsx)("button",{type:"button",onClick:e.enable,children:"\uD83C\uDF1A"})]})};var m=n(3869),p=n.n(m);let x=()=>{let[e,t]=(0,d.useState)(!1);(0,d.useEffect)(()=>{let e=localStorage.getItem("cookieConsent");t(!e)},[]);let n=()=>{localStorage.setItem("cookieConsent","true"),t(!1)};return e?(0,o.jsxs)("div",{className:p().cookieContainer,children:[(0,o.jsx)("p",{className:p().cookieContainer2,children:"This website uses cookies to ensure you get the best experience. By continuing to use this site, you consent to the use of cookies."}),(0,o.jsx)("button",{className:p().cookieContainerBtn,onClick:n,children:"Accept"})]}):null},j="Pavel Slepenkov's personal blog",k="stories about BI, python, salesforce and data analysis";function f(e){let{children:t,home:n}=e;return(0,o.jsxs)("div",{className:r().container,children:[(0,o.jsxs)(s(),{children:[(0,o.jsx)("link",{rel:"icon",href:"/favicon.ico"}),(0,o.jsx)("link",{href:"https://unpkg.com/prismjs@1.23.0/themes/prism-okaidia.css",rel:"stylesheet"}),(0,o.jsx)("meta",{charset:"UTF-8"}),(0,o.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,o.jsx)("meta",{name:"description",content:"".concat(j,": ").concat(k)}),(0,o.jsx)("meta",{"http-equiv":"cache-control",content:"Private"}),(0,o.jsx)("meta",{"http-equiv":"Expires",content:"366000"}),(0,o.jsx)("meta",{property:"og:locale",content:"en_US"}),(0,o.jsx)("meta",{name:"og:title",content:j}),(0,o.jsx)("meta",{property:"og:description",content:k}),(0,o.jsx)("meta",{property:"og:type",content:"article"}),(0,o.jsx)("meta",{property:"og:site_name",content:"pavelslepenkov.info"}),(0,o.jsx)("meta",{property:"og:image",content:"/og.png"}),(0,o.jsx)("meta",{name:"twitter:title",content:"Pavel Slepenkov's personal blog"}),(0,o.jsx)("meta",{name:"twitter:description",content:k}),(0,o.jsx)("meta",{name:"twitter:card",content:"summary_large_image"}),(0,o.jsx)("meta",{property:"twitter:image",content:"/og.png"}),(0,o.jsx)("meta",{name:"keywords",content:"python, BI, sql, salesforce, data engineering, apex, soql, data analisys"}),(0,o.jsx)("script",{async:!0,src:"https://www.googletagmanager.com/gtag/js?id=UA-63037633-1"}),(0,o.jsx)("script",{dangerouslySetInnerHTML:{__html:"\n                            window.dataLayer = window.dataLayer || [];\n                            function gtag(){dataLayer.push(arguments);}\n                            gtag('js', new Date());\n                            gtag('config', 'UA-63037633-1');\n                    "}}),(0,o.jsx)("style",{children:"@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300&family=Spectral:wght@300;600&display=swap');"})]}),(0,o.jsx)("div",{className:"no-print",children:(0,o.jsxs)("header",{className:r().header,children:[(0,o.jsxs)("div",{className:"navbar-link centered",children:[(0,o.jsx)(c(),{href:"/",className:"".concat(r().devNull),children:"Technical notes"}),"—————",(0,o.jsx)(c(),{href:"/cv",className:r().devNull,children:"CV"}),"—————",(0,o.jsx)(c(),{href:"/books",className:r().devNull,children:"Books & Readings"})]}),(0,o.jsx)(h,{})]})}),(0,o.jsx)("main",{children:t}),!n&&(0,o.jsx)("div",{className:r().backToHome,children:(0,o.jsx)(c(),{href:"/",children:"⇐ back to home"})}),(0,o.jsx)(x,{})]})}},5023:function(e,t,n){"use strict";function o(e){return e?e.replace(/ /g,"-").replace(/'_'/g,"-"):""}n.d(t,{o:function(){return o}})},4369:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return g},default:function(){return h}});var o=n(5893),a=n(9008),s=n.n(a),i=n(1664),r=n.n(i),l=n(7046),c=n(5696),d=n.n(c),_=n(5023),u=n(2419),g=!0;function h(e){let{allPostsData:t}=e;return(0,o.jsxs)(l.ZP,{home:!0,children:[(0,o.jsx)(s(),{children:(0,o.jsx)("title",{children:l.y7})}),(0,o.jsxs)("section",{className:"".concat(d().headingMd," ").concat(d().padding1px),children:[(0,o.jsxs)("h2",{className:d().headingLg,children:[(0,o.jsx)("b",{children:"["})," Blog ",(0,o.jsx)("b",{children:"]"})]}),(0,o.jsx)("ul",{className:d().list,children:t.map(e=>{let{id:t,date:n,title:a,tag:s}=e;return(0,o.jsxs)("li",{className:d().listItem,children:[(0,o.jsxs)(r(),{href:"/posts/".concat(t),children:["↠ ",a]}),(0,o.jsx)("br",{}),(0,o.jsxs)("small",{className:d().lightText,children:[(0,o.jsx)(u.Z,{dateString:n}),s.map(e=>(0,o.jsx)("span",{className:d().tag,children:(0,o.jsxs)(r(),{href:"/tag/".concat((0,_.o)(e)),children:["[",e,"]"]})},e))]})]},t)})})]})]})}},536:function(e){e.exports={container:"layout_container__fbLkO",header:"layout_header__kY0Lt",headerImage:"layout_headerImage__b37zH",headerHomeImage:"layout_headerHomeImage__qKKc7",backToHome:"layout_backToHome__9sjx_",devNull:"layout_devNull__CjwH1"}},5696:function(e){e.exports={heading2Xl:"utils_heading2Xl___9fFP",headingXl:"utils_headingXl__u25Y2",headingLg:"utils_headingLg__5535D",headingMd:"utils_headingMd__gD1Ok",borderCircle:"utils_borderCircle__s2nTm",colorInherit:"utils_colorInherit__mSH_x",padding1px:"utils_padding1px__PWQKR",list:"utils_list__4Mu4l",listItem:"utils_listItem__s2m6i",lightText:"utils_lightText__eUzGY",tag:"utils_tag__r8GDN",tagPageDate:"utils_tagPageDate__REomr",wrapper:"utils_wrapper__d_oQ9",card:"utils_card__L8D_y","dark-mode":"utils_dark-mode__KRUAU",bottomPined:"utils_bottomPined__Dr9ll"}},3869:function(e){e.exports={cookieContainer:"CookieBanner_cookieContainer__FrnO6",cookieContainer2:"CookieBanner_cookieContainer2__8Ib1x",cookieContainerBtn:"CookieBanner_cookieContainerBtn__uQIgc"}},4109:function(e){e.exports={"light-mode":"DarkModeToggle_light-mode__PQB__","dark-mode":"DarkModeToggle_dark-mode__OIr8Y",navbar:"DarkModeToggle_navbar__yDbOX",darkModeToggle:"DarkModeToggle_darkModeToggle__m5z3H","toggle-control":"DarkModeToggle_toggle-control__5JdBc",dmcheck:"DarkModeToggle_dmcheck__P0eTR"}}},function(e){e.O(0,[105,358,774,888,179],function(){return e(e.s=5557)}),_N_E=e.O()}]);