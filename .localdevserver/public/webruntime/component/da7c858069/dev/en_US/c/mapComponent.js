Webruntime.moduleRegistry.define('c/mapComponent', ['lwc', '@salesforce/i18n/locale', 'lightning/configProvider', '@salesforce/i18n/dir', 'force/lds', 'wire-service'], function (lwc, locale, configProvider, dir, lds, wireService) { 'use strict';

    locale = locale && locale.hasOwnProperty('default') ? locale['default'] : locale;
    dir = dir && dir.hasOwnProperty('default') ? dir['default'] : dir;

    function stylesheet(hostSelector, shadowSelector, nativeShadow) {
      return "_:-ms-lang(x)" + shadowSelector + ", svg" + shadowSelector + " {pointer-events: none;}\n";
    }
    var _implicitStylesheets = [stylesheet];

    function tmpl($api, $cmp, $slotset, $ctx) {
      const {
        fid: api_scoped_frag_id,
        h: api_element
      } = $api;
      return [api_element("svg", {
        className: $cmp.computedClass,
        attrs: {
          "focusable": "false",
          "data-key": $cmp.name,
          "aria-hidden": "true"
        },
        key: 2
      }, [api_element("use", {
        attrs: {
          "xlink:href": lwc.sanitizeAttribute("use", "http://www.w3.org/2000/svg", "xlink:href", api_scoped_frag_id($cmp.href))
        },
        key: 3
      }, [])])];
    }

    var _tmpl = lwc.registerTemplate(tmpl);
    tmpl.stylesheets = [];

    if (_implicitStylesheets) {
      tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets);
    }
    tmpl.stylesheetTokens = {
      hostAttribute: "lightning-primitiveIcon_primitiveIcon-host",
      shadowAttribute: "lightning-primitiveIcon_primitiveIcon"
    };

    const proto = {
      add(className) {
        if (typeof className === 'string') {
          this[className] = true;
        } else {
          Object.assign(this, className);
        }

        return this;
      },

      invert() {
        Object.keys(this).forEach(key => {
          this[key] = !this[key];
        });
        return this;
      },

      toString() {
        return Object.keys(this).filter(key => this[key]).join(' ');
      }

    };
    function classSet(config) {
      if (typeof config === 'string') {
        const key = config;
        config = {};
        config[key] = true;
      }

      return Object.assign(Object.create(proto), config);
    }

    /**
     * Takes label strings with placeholder params (`{0}`) and updates the label with given `args`
     * @param {string} str - any label string requiring injections of other strings/params (e.g., 'foo {0}')
     * @param  {string|array} arguments - string(s) to be injected into the `string` param
     * @returns {string} fully replaced string, e.g., '{0} is a {1}' -> 'Hal Jordan is a Green Lantern'
     */

    // NOTE: lightning-utils is a public library. adding new utils here means we

    /**
     * Create a deep copy of an object or array
     * @param {object|array} obj - item to be copied
     * @returns {object|array} copy of the item
     */
    function deepCopy(obj) {
      if (Object(obj) !== obj) {
        // primitives
        return obj;
      }

      if (obj instanceof Set) {
        return new Set(obj);
      }

      if (obj instanceof Date) {
        return new Date(obj);
      }

      if (typeof obj === 'function') {
        return obj.bind({});
      }

      if (Array.isArray(obj)) {
        const obj2 = [];
        const len = obj.length;

        for (let i = 0; i < len; i++) {
          obj2.push(deepCopy(obj[i]));
        }

        return obj2;
      }

      const result = Object.create({});
      let keys = Object.keys(obj);

      if (obj instanceof Error) {
        // Error properties are non-enumerable
        keys = Object.getOwnPropertyNames(obj);
      }

      const len = keys.length;

      for (let i = 0; i < len; i++) {
        const key = keys[i];
        result[key] = deepCopy(obj[key]);
      }

      return result;
    }

    const urlRegexString = "((?:(?:https?|ftp):\\/\\/(?:[\\w\\-\\|=%~#\\/+*@\\.,;:\\?!']|&){0,2047}(?:[\\(\\)\\.\\w=\\/+#-]*)[^\\s()\\.<>,;\\[\\]`'\"])|(?:\\b(?:[a-z0-9](?:[-a-z0-9]{0,62}[a-z0-9])?\\.)+(?:AC|AD|AE|AERO|AF|AG|AI|AL|AM|AN|AO|AQ|AR|ARPA|AS|ASIA|AT|AU|AW|AX|AZ|BA|BB|BD|BE|BF|BG|BH|BI|BIZ|BJ|BM|BN|BO|BR|BS|BT|BV|BW|BY|BZ|CA|CAT|CC|CD|CF|CG|CH|CI|CK|CL|CM|CN|CO|COM|COOP|CR|CU|CV|CX|CY|CZ|DE|DJ|DK|DM|DO|DZ|EC|EDU|EE|EG|ER|ES|ET|EU|FI|FJ|FK|FM|FO|FR|GA|GB|GD|GE|GF|GG|GH|GI|GL|GM|GN|GOV|GP|GQ|GR|GS|GT|GU|GW|GY|HK|HM|HN|HR|HT|HU|ID|IE|IL|IM|IN|INFO|INT|IO|IQ|IR|IS|IT|JE|JM|JO|JOBS|JP|KE|KG|KH|KI|KM|KN|KP|KR|KW|KY|KZ|LA|LB|LC|LI|LK|LR|LS|LT|LU|LV|LY|MA|MC|MD|ME|MG|MH|MIL|MK|ML|MM|MN|MO|MOBI|MP|MQ|MR|MS|MT|MU|MUSEUM|MV|MW|MX|MY|MZ|NA|NAME|NC|NE|NET|NF|NG|NI|NL|NO|NP|NR|NU|NZ|OM|ORG|PA|PE|PF|PG|PH|PK|PL|PM|PN|PR|PRO|PS|PT|PW|PY|QA|RE|RO|RS|RU|RW|SA|SB|SC|SD|SE|SG|SH|SI|SJ|SK|SL|SM|SN|SO|SR|ST|SU|SV|SY|SZ|TC|TD|TEL|TF|TG|TH|TJ|TK|TL|TM|TN|TO|TP|TR|TRAVEL|TT|TV|TW|TZ|UA|UG|UK|US|UY|UZ|VA|VC|VE|VG|VI|VN|VU|WF|WS|XN--0ZWM56D|XN--11B5BS3A9AJ6G|XN--80AKHBYKNJ4F|XN--9T4B11YI5A|XN--DEBA0AD|XN--FIQS8S|XN--FIQZ9S|XN--G6W251D|XN--HGBK6AJ7F53BBA|XN--HLCJ6AYA9ESC7A|XN--J6W193G|XN--JXALPDLP|XN--KGBECHTV|XN--KPRW13D|XN--KPRY57D|XN--MGBAAM7A8H|XN--MGBERP4A5D4AR|XN--P1AI|XN--WGBH1C|XN--ZCKZAH|YE|YT|ZA|ZM|ZW)(?!@(?:[a-z0-9](?:[-a-z0-9]{0,62}[a-z0-9])?\\.)+(?:AC|AD|AE|AERO|AF|AG|AI|AL|AM|AN|AO|AQ|AR|ARPA|AS|ASIA|AT|AU|AW|AX|AZ|BA|BB|BD|BE|BF|BG|BH|BI|BIZ|BJ|BM|BN|BO|BR|BS|BT|BV|BW|BY|BZ|CA|CAT|CC|CD|CF|CG|CH|CI|CK|CL|CM|CN|CO|COM|COOP|CR|CU|CV|CX|CY|CZ|DE|DJ|DK|DM|DO|DZ|EC|EDU|EE|EG|ER|ES|ET|EU|FI|FJ|FK|FM|FO|FR|GA|GB|GD|GE|GF|GG|GH|GI|GL|GM|GN|GOV|GP|GQ|GR|GS|GT|GU|GW|GY|HK|HM|HN|HR|HT|HU|ID|IE|IL|IM|IN|INFO|INT|IO|IQ|IR|IS|IT|JE|JM|JO|JOBS|JP|KE|KG|KH|KI|KM|KN|KP|KR|KW|KY|KZ|LA|LB|LC|LI|LK|LR|LS|LT|LU|LV|LY|MA|MC|MD|ME|MG|MH|MIL|MK|ML|MM|MN|MO|MOBI|MP|MQ|MR|MS|MT|MU|MUSEUM|MV|MW|MX|MY|MZ|NA|NAME|NC|NE|NET|NF|NG|NI|NL|NO|NP|NR|NU|NZ|OM|ORG|PA|PE|PF|PG|PH|PK|PL|PM|PN|PR|PRO|PS|PT|PW|PY|QA|RE|RO|RS|RU|RW|SA|SB|SC|SD|SE|SG|SH|SI|SJ|SK|SL|SM|SN|SO|SR|ST|SU|SV|SY|SZ|TC|TD|TEL|TF|TG|TH|TJ|TK|TL|TM|TN|TO|TP|TR|TRAVEL|TT|TV|TW|TZ|UA|UG|UK|US|UY|UZ|VA|VC|VE|VG|VI|VN|VU|WF|WS|XN--0ZWM56D|XN--11B5BS3A9AJ6G|XN--80AKHBYKNJ4F|XN--9T4B11YI5A|XN--DEBA0AD|XN--FIQS8S|XN--FIQZ9S|XN--G6W251D|XN--HGBK6AJ7F53BBA|XN--HLCJ6AYA9ESC7A|XN--J6W193G|XN--JXALPDLP|XN--KGBECHTV|XN--KPRW13D|XN--KPRY57D|XN--MGBAAM7A8H|XN--MGBERP4A5D4AR|XN--P1AI|XN--WGBH1C|XN--ZCKZAH|YE|YT|ZA|ZM|ZW))(?:/[\\w\\-=?/.&;:%~,+@#*]{0,2048}(?:[\\w=/+#-]|\\([^\\s()]*\\)))?(?:$|(?=\\.$)|(?=\\.\\s)|(?=[^\\w\\.]))))";
    const emailRegexString = '([\\w-\\.\\+_]{1,64}@(?:[\\w-]){1,255}(?:\\.[\\w-]{1,255}){1,10})';
    const newLineRegexString = '(\r\n|\r|\n)';
    const createHttpHref = function (url) {
      let href = url;

      if (url.toLowerCase().lastIndexOf('http', 0) !== 0 && url.toLowerCase().lastIndexOf('ftp', 0) !== 0) {
        href = `http://${href}`;
      }

      return href;
    };
    const createEmailHref = function (email) {
      return `mailto:${email}`;
    };

    /**
     * Utility function to generate an unique guid.
     * used on state objects to provide a performance aid when iterating
     * through the items and marking them for render
     * @returns {String} an unique string ID
     */
    function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      }

      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    function classListMutation(classList, config) {
      Object.keys(config).forEach(key => {
        if (typeof key === 'string' && key.length) {
          if (config[key]) {
            classList.add(key);
          } else {
            classList.remove(key);
          }
        }
      });
    }

    /**
    A string normalization utility for attributes.
    @param {String} value - The value to normalize.
    @param {Object} config - The optional configuration object.
    @param {String} [config.fallbackValue] - The optional fallback value to use if the given value is not provided or invalid. Defaults to an empty string.
    @param {Array} [config.validValues] - An optional array of valid values. Assumes all input is valid if not provided.
    @return {String} - The normalized value.
    **/
    function normalizeString(value, config = {}) {
      const {
        fallbackValue = '',
        validValues,
        toLowerCase = true
      } = config;
      let normalized = typeof value === 'string' && value.trim() || '';
      normalized = toLowerCase ? normalized.toLowerCase() : normalized;

      if (validValues && validValues.indexOf(normalized) === -1) {
        normalized = fallbackValue;
      }

      return normalized;
    }
    /**
    A boolean normalization utility for attributes.
    @param {Any} value - The value to normalize.
    @return {Boolean} - The normalized value.
    **/

    function normalizeBoolean(value) {
      return typeof value === 'string' || !!value;
    }

    const isIE11 = isIE11Test(navigator);
    const isChrome = isChromeTest(navigator);
    const isSafari = isSafariTest(window.safari); // The following functions are for tests only

    function isIE11Test(navigator) {
      // https://stackoverflow.com/questions/17447373/how-can-i-target-only-internet-explorer-11-with-javascript
      return /Trident.*rv[ :]*11\./.test(navigator.userAgent);
    }
    function isChromeTest(navigator) {
      // https://stackoverflow.com/questions/4565112/javascript-how-to-find-out-if-the-user-browser-is-chrome
      return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    }
    function isSafariTest(safari) {
      // via https://stackoverflow.com/a/9851769
      return safari && safari.pushNotification && safari.pushNotification.toString() === '[object SafariRemoteNotification]';
    }

    /**
     * Set an attribute on an element, if it's a normal element
     * it will use setAttribute, if it's an LWC component
     * it will use the public property
     *
     * @param {HTMLElement} element The element to act on
     * @param {String} attribute the attribute to set
     * @param {Any} value the value to set
     */

    // hide panel on scroll

    var _tmpl$1 = void 0;

    // Taken from https://github.com/jonathantneal/svg4everybody/pull/139
    // Remove this iframe-in-edge check once the following is resolved https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8323875/
    const isEdgeUA = /\bEdge\/.(\d+)\b/.test(navigator.userAgent);
    const inIframe = window.top !== window.self;
    const isIframeInEdge = isEdgeUA && inIframe;
    var isIframeInEdge$1 = lwc.registerComponent(isIframeInEdge, {
      tmpl: _tmpl$1
    });

    // Taken from https://git.soma.salesforce.com/aura/lightning-global/blob/999dc35f948246181510df6e56f45ad4955032c2/src/main/components/lightning/SVGLibrary/stamper.js#L38-L60
    function fetchSvg(url) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();

        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(xhr.responseText);
            } else {
              reject(xhr);
            }
          }
        };
      });
    }

    // Which looks like it was inspired by https://github.com/jonathantneal/svg4everybody/blob/377d27208fcad3671ed466e9511556cb9c8b5bd8/lib/svg4everybody.js#L92-L107
    // Modify at your own risk!

    const newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/;
    const webkitUA = /\bAppleWebKit\/(\d+)\b/;
    const olderEdgeUA = /\bEdge\/12\.(\d+)\b/;
    const isIE = newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537;
    const supportsSvg = !isIE && !isIframeInEdge$1;
    var supportsSvg$1 = lwc.registerComponent(supportsSvg, {
      tmpl: _tmpl$1
    });

    /**
    This polyfill injects SVG sprites into the document for clients that don't
    fully support SVG. We do this globally at the document level for performance
    reasons. This causes us to lose namespacing of IDs across sprites. For example,
    if both #image from utility sprite and #image from doctype sprite need to be
    rendered on the page, both end up as #image from the doctype sprite (last one
    wins). SLDS cannot change their image IDs due to backwards-compatibility
    reasons so we take care of this issue at runtime by adding namespacing as we
    polyfill SVG elements.

    For example, given "/assets/icons/action-sprite/svg/symbols.svg#approval", we
    replace the "#approval" id with "#${namespace}-approval" and a similar
    operation is done on the corresponding symbol element.
    **/
    const svgTagName = /svg/i;

    const isSvgElement = el => el && svgTagName.test(el.nodeName);

    const requestCache = {};
    const symbolEls = {};
    const svgFragments = {};
    const spritesContainerId = 'slds-svg-sprites';
    let spritesEl;
    function polyfill(el) {
      if (!supportsSvg$1 && isSvgElement(el)) {
        if (!spritesEl) {
          spritesEl = document.createElement('svg');
          spritesEl.xmlns = 'http://www.w3.org/2000/svg';
          spritesEl['xmlns:xlink'] = 'http://www.w3.org/1999/xlink';
          spritesEl.style.display = 'none';
          spritesEl.id = spritesContainerId;
          document.body.insertBefore(spritesEl, document.body.childNodes[0]);
        }

        Array.from(el.getElementsByTagName('use')).forEach(use => {
          // We access the href differently in raptor and in aura, probably
          // due to difference in the way the svg is constructed.
          const src = use.getAttribute('xlink:href') || use.getAttribute('href');

          if (src) {
            // "/assets/icons/action-sprite/svg/symbols.svg#approval" =>
            // ["/assets/icons/action-sprite/svg/symbols.svg", "approval"]
            const parts = src.split('#');
            const url = parts[0];
            const id = parts[1];
            const namespace = url.replace(/[^\w]/g, '-');
            const href = `#${namespace}-${id}`;

            if (url.length) {
              // set the HREF value to no longer be an external reference
              if (use.getAttribute('xlink:href')) {
                use.setAttribute('xlink:href', href);
              } else {
                use.setAttribute('href', href);
              } // only insert SVG content if it hasn't already been retrieved


              if (!requestCache[url]) {
                requestCache[url] = fetchSvg(url);
              }

              requestCache[url].then(svgContent => {
                // create a document fragment from the svgContent returned (is parsed by HTML parser)
                if (!svgFragments[url]) {
                  const svgFragment = document.createRange().createContextualFragment(svgContent);
                  svgFragments[url] = svgFragment;
                }

                if (!symbolEls[href]) {
                  const svgFragment = svgFragments[url];
                  const symbolEl = svgFragment.querySelector(`#${id}`);
                  symbolEls[href] = true;
                  symbolEl.id = `${namespace}-${id}`;
                  spritesEl.appendChild(symbolEl);
                }
              });
            }
          }
        });
      }
    }

    const validNameRe = /^([a-zA-Z]+):([a-zA-Z]\w*)$/;
    const underscoreRe = /_/g;
    let pathPrefix;
    const tokenNameMap = Object.assign(Object.create(null), {
      action: 'lightning.actionSprite',
      custom: 'lightning.customSprite',
      doctype: 'lightning.doctypeSprite',
      standard: 'lightning.standardSprite',
      utility: 'lightning.utilitySprite'
    });
    const tokenNameMapRtl = Object.assign(Object.create(null), {
      action: 'lightning.actionSpriteRtl',
      custom: 'lightning.customSpriteRtl',
      doctype: 'lightning.doctypeSpriteRtl',
      standard: 'lightning.standardSpriteRtl',
      utility: 'lightning.utilitySpriteRtl'
    });
    const defaultTokenValueMap = Object.assign(Object.create(null), {
      'lightning.actionSprite': '/assets/icons/action-sprite/svg/symbols.svg',
      'lightning.actionSpriteRtl': '/assets/icons/action-sprite/svg/symbols.svg',
      'lightning.customSprite': '/assets/icons/custom-sprite/svg/symbols.svg',
      'lightning.customSpriteRtl': '/assets/icons/custom-sprite/svg/symbols.svg',
      'lightning.doctypeSprite': '/assets/icons/doctype-sprite/svg/symbols.svg',
      'lightning.doctypeSpriteRtl': '/assets/icons/doctype-sprite/svg/symbols.svg',
      'lightning.standardSprite': '/assets/icons/standard-sprite/svg/symbols.svg',
      'lightning.standardSpriteRtl': '/assets/icons/standard-sprite/svg/symbols.svg',
      'lightning.utilitySprite': '/assets/icons/utility-sprite/svg/symbols.svg',
      'lightning.utilitySpriteRtl': '/assets/icons/utility-sprite/svg/symbols.svg'
    });

    const getDefaultBaseIconPath = (category, nameMap) => defaultTokenValueMap[nameMap[category]];

    const getBaseIconPath = (category, direction) => {
      const nameMap = direction === 'rtl' ? tokenNameMapRtl : tokenNameMap;
      return configProvider.getToken(nameMap[category]) || getDefaultBaseIconPath(category, nameMap);
    };

    const getMatchAtIndex = index => iconName => {
      const result = validNameRe.exec(iconName);
      return result ? result[index] : '';
    };

    const getCategory = getMatchAtIndex(1);
    const getName = getMatchAtIndex(2);
    const isValidName = iconName => validNameRe.test(iconName);
    const getIconPath = (iconName, direction = 'ltr') => {
      pathPrefix = pathPrefix !== undefined ? pathPrefix : configProvider.getPathPrefix();

      if (isValidName(iconName)) {
        const baseIconPath = getBaseIconPath(getCategory(iconName), direction);

        if (baseIconPath) {
          // This check was introduced the following MS-Edge issue:
          // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/9655192/
          // If and when this get fixed, we can safely remove this block of code.
          if (isIframeInEdge$1) {
            // protocol => 'https:' or 'http:'
            // host => hostname + port
            const origin = `${window.location.protocol}//${window.location.host}`;
            return `${origin}${pathPrefix}${baseIconPath}#${getName(iconName)}`;
          }

          return `${pathPrefix}${baseIconPath}#${getName(iconName)}`;
        }
      }

      return '';
    };
    const computeSldsClass = iconName => {
      if (isValidName(iconName)) {
        const category = getCategory(iconName);
        const name = getName(iconName).replace(underscoreRe, '-');
        return `slds-icon-${category}-${name}`;
      }

      return '';
    };

    class LightningPrimitiveIcon extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.iconName = void 0;
        this.src = void 0;
        this.svgClass = void 0;
        this.size = 'medium';
        this.variant = void 0;
        this.privateIconSvgTemplates = configProvider.getIconSvgTemplates();
      }

      get inlineSvgProvided() {
        return !!this.privateIconSvgTemplates;
      }

      renderedCallback() {
        if (this.iconName !== this.prevIconName && !this.inlineSvgProvided) {
          this.prevIconName = this.iconName;
          const svgElement = this.template.querySelector('svg');
          polyfill(svgElement);
        }
      }

      get href() {
        return this.src || getIconPath(this.iconName, dir);
      }

      get name() {
        return getName(this.iconName);
      }

      get normalizedSize() {
        return normalizeString(this.size, {
          fallbackValue: 'medium',
          validValues: ['xx-small', 'x-small', 'small', 'medium', 'large']
        });
      }

      get normalizedVariant() {
        // NOTE: Leaving a note here because I just wasted a bunch of time
        // investigating why both 'bare' and 'inverse' are supported in
        // lightning-primitive-icon. lightning-icon also has a deprecated
        // 'bare', but that one is synonymous to 'inverse'. This 'bare' means
        // that no classes should be applied. So this component needs to
        // support both 'bare' and 'inverse' while lightning-icon only needs to
        // support 'inverse'.
        return normalizeString(this.variant, {
          fallbackValue: '',
          validValues: ['bare', 'error', 'inverse', 'warning', 'success']
        });
      }

      get computedClass() {
        const {
          normalizedSize,
          normalizedVariant
        } = this;
        const classes = classSet(this.svgClass);

        if (normalizedVariant !== 'bare') {
          classes.add('slds-icon');
        }

        switch (normalizedVariant) {
          case 'error':
            classes.add('slds-icon-text-error');
            break;

          case 'warning':
            classes.add('slds-icon-text-warning');
            break;

          case 'success':
            classes.add('slds-icon-text-success');
            break;

          case 'inverse':
          case 'bare':
            break;

          default:
            // if custom icon is set, we don't want to set
            // the text-default class
            if (!this.src) {
              classes.add('slds-icon-text-default');
            }

        }

        if (normalizedSize !== 'medium') {
          classes.add(`slds-icon_${normalizedSize}`);
        }

        return classes.toString();
      }

      resolveTemplate() {
        const name = this.iconName;

        if (isValidName(name)) {
          const [spriteName, iconName] = name.split(':');
          const template = this.privateIconSvgTemplates[`${spriteName}_${iconName}`];

          if (template) {
            return template;
          }
        }

        return _tmpl;
      }

      render() {
        if (this.inlineSvgProvided) {
          return this.resolveTemplate();
        }

        return _tmpl;
      }

    }

    lwc.registerDecorators(LightningPrimitiveIcon, {
      publicProps: {
        iconName: {
          config: 0
        },
        src: {
          config: 0
        },
        svgClass: {
          config: 0
        },
        size: {
          config: 0
        },
        variant: {
          config: 0
        }
      }
    });

    var _lightningPrimitiveIcon = lwc.registerComponent(LightningPrimitiveIcon, {
      tmpl: _tmpl
    });

    function tmpl$1($api, $cmp, $slotset, $ctx) {
      const {
        c: api_custom_element,
        d: api_dynamic,
        h: api_element
      } = $api;
      return [api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
        props: {
          "iconName": $cmp.state.iconName,
          "size": $cmp.size,
          "variant": $cmp.variant,
          "src": $cmp.state.src
        },
        key: 2
      }, []), $cmp.alternativeText ? api_element("span", {
        classMap: {
          "slds-assistive-text": true
        },
        key: 3
      }, [api_dynamic($cmp.alternativeText)]) : null];
    }

    var _tmpl$2 = lwc.registerTemplate(tmpl$1);
    tmpl$1.stylesheets = [];
    tmpl$1.stylesheetTokens = {
      hostAttribute: "lightning-icon_icon-host",
      shadowAttribute: "lightning-icon_icon"
    };

    /**
     * Represents a visual element that provides context and enhances usability.
     */

    class LightningIcon extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.state = {};
        this.alternativeText = void 0;
      }

      /**
       * A uri path to a custom svg sprite, including the name of the resouce,
       * for example: /assets/icons/standard-sprite/svg/test.svg#icon-heart
       * @type {string}
       */
      get src() {
        return this.privateSrc;
      }

      set src(value) {
        this.privateSrc = value; // if value is not present, then we set the state back
        // to the original iconName that was passed
        // this might happen if the user sets a custom icon, then
        // decides to revert back to SLDS by removing the src attribute

        if (!value) {
          this.state.iconName = this.iconName;
          this.classList.remove('slds-icon-standard-default');
        } // if isIE11 and the src is set
        // we'd like to show the 'standard:default' icon instead
        // for performance reasons.


        if (value && isIE11) {
          this.setDefault();
          return;
        }

        this.state.src = value;
      }
      /**
       * The Lightning Design System name of the icon.
       * Names are written in the format 'utility:down' where 'utility' is the category,
       * and 'down' is the specific icon to be displayed.
       * @type {string}
       * @required
       */


      get iconName() {
        return this.privateIconName;
      }

      set iconName(value) {
        this.privateIconName = value; // if src is set, we don't need to validate
        // iconName

        if (this.src) {
          return;
        }

        if (isValidName(value)) {
          const isAction = getCategory(value) === 'action'; // update classlist only if new iconName is different than state.iconName
          // otherwise classListMutation receives class:true and class: false and removes slds class

          if (value !== this.state.iconName) {
            classListMutation(this.classList, {
              'slds-icon_container_circle': isAction,
              [computeSldsClass(value)]: true,
              [computeSldsClass(this.state.iconName)]: false
            });
          }

          this.state.iconName = value;
        } else {
          console.warn(`<lightning-icon> Invalid icon name ${value}`); // eslint-disable-line no-console
          // Invalid icon names should render a blank icon. Remove any
          // classes that might have been previously added.

          classListMutation(this.classList, {
            'slds-icon_container_circle': false,
            [computeSldsClass(this.state.iconName)]: false
          });
          this.state.iconName = undefined;
        }
      }
      /**
       * The size of the icon. Options include xx-small, x-small, small, medium, or large.
       * The default is medium.
       * @type {string}
       * @default medium
       */


      get size() {
        return normalizeString(this.state.size, {
          fallbackValue: 'medium',
          validValues: ['xx-small', 'x-small', 'small', 'medium', 'large']
        });
      }

      set size(value) {
        this.state.size = value;
      }
      /**
       * The variant changes the appearance of a utility icon.
       * Accepted variants include inverse, success, warning, and error.
       * Use the inverse variant to implement a white fill in utility icons on dark backgrounds.
       * @type {string}
       */


      get variant() {
        return normalizeVariant(this.state.variant, this.state.iconName);
      }

      set variant(value) {
        this.state.variant = value;
      }

      connectedCallback() {
        this.classList.add('slds-icon_container');
      }

      setDefault() {
        this.state.src = undefined;
        this.state.iconName = 'standard:default';
        this.classList.add('slds-icon-standard-default');
      }

    }

    lwc.registerDecorators(LightningIcon, {
      publicProps: {
        alternativeText: {
          config: 0
        },
        src: {
          config: 3
        },
        iconName: {
          config: 3
        },
        size: {
          config: 3
        },
        variant: {
          config: 3
        }
      },
      track: {
        state: 1
      }
    });

    var _lightningIcon = lwc.registerComponent(LightningIcon, {
      tmpl: _tmpl$2
    });

    function normalizeVariant(variant, iconName) {
      // Unfortunately, the `bare` variant was implemented to do what the
      // `inverse` variant should have done. Keep this logic for as long as
      // we support the `bare` variant.
      if (variant === 'bare') {
        // TODO: Deprecation warning using strippable assertion
        variant = 'inverse';
      }

      if (getCategory(iconName) === 'utility') {
        return normalizeString(variant, {
          fallbackValue: '',
          validValues: ['error', 'inverse', 'warning', 'success']
        });
      }

      return 'inverse';
    }

    function tmpl$2($api, $cmp, $slotset, $ctx) {
      const {
        c: api_custom_element,
        h: api_element,
        d: api_dynamic,
        s: api_slot
      } = $api;
      return [api_element("article", {
        className: $cmp.computedWrapperClassNames,
        key: 2
      }, [api_element("header", {
        classMap: {
          "slds-card__header": true,
          "slds-grid": true
        },
        key: 3
      }, [api_element("div", {
        classMap: {
          "slds-media": true,
          "slds-media_center": true,
          "slds-has-flexi-truncate": true
        },
        key: 4
      }, [$cmp.hasIcon ? api_element("div", {
        classMap: {
          "slds-media__figure": true
        },
        key: 6
      }, [api_custom_element("lightning-icon", _lightningIcon, {
        props: {
          "iconName": $cmp.iconName,
          "size": "small"
        },
        key: 7
      }, [])]) : null, api_element("div", {
        classMap: {
          "slds-media__body": true,
          "slds-truncate": true
        },
        key: 8
      }, [api_element("h2", {
        key: 9
      }, [api_element("span", {
        classMap: {
          "slds-text-heading_small": true
        },
        key: 10
      }, [$cmp.hasStringTitle ? api_dynamic($cmp.title) : null, !$cmp.hasStringTitle ? api_slot("title", {
        attrs: {
          "name": "title"
        },
        key: 13
      }, [], $slotset) : null])])])]), api_element("div", {
        classMap: {
          "slds-no-flex": true
        },
        key: 14
      }, [api_slot("actions", {
        attrs: {
          "name": "actions"
        },
        key: 15
      }, [], $slotset)])]), api_element("div", {
        classMap: {
          "slds-card__body": true
        },
        key: 16
      }, [api_slot("", {
        key: 17
      }, [], $slotset)]), $cmp.showFooter ? api_element("div", {
        classMap: {
          "slds-card__footer": true
        },
        key: 19
      }, [api_slot("footer", {
        attrs: {
          "name": "footer"
        },
        key: 20
      }, [], $slotset)]) : null])];
    }

    var _tmpl$3 = lwc.registerTemplate(tmpl$2);
    tmpl$2.slots = ["title", "actions", "", "footer"];
    tmpl$2.stylesheets = [];
    tmpl$2.stylesheetTokens = {
      hostAttribute: "lightning-card_card-host",
      shadowAttribute: "lightning-card_card"
    };

    function isNarrow(variant) {
      return typeof variant === 'string' && variant.toLowerCase() === 'narrow';
    }
    function isBase(variant) {
      return typeof variant === 'string' && variant.toLowerCase() === 'base';
    }

    /**
     * Cards apply a container around a related grouping of information.
     * @slot title Placeholder for the card title, which can be represented by a header or h1 element.
     * The title is displayed at the top of the card, to the right of the icon.
     * Alternatively, use the title attribute if you don't need to pass in extra markup in your title.
     * @slot actions Placeholder for actionable components, such as lightning-button or lightning-button-menu.
     * Actions are displayed on the top right corner of the card next to the title.
     * @slot footer Placeholder for the card footer, which is displayed at the bottom of the card and is usually optional.
     * For example, the footer can display a "View All" link to navigate to a list view.
     * @slot default Placeholder for your content in the card body.
     */

    class LightningCard extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.title = void 0;
        this.iconName = void 0;
        this.privateVariant = 'base';
        this.showFooter = true;
      }

      set variant(value) {
        if (isNarrow(value) || isBase(value)) {
          this.privateVariant = value;
        } else {
          this.privateVariant = 'base';
        }
      }
      /**
       * The variant changes the appearance of the card.
       * Accepted variants include base or narrow.
       * This value defaults to base.
       *
       * @type {string}
       * @default base
       */


      get variant() {
        return this.privateVariant;
      }

      renderedCallback() {
        // initial check for no items
        if (this.footerSlot) {
          this.showFooter = this.footerSlot.assignedElements().length !== 0;
        }
      }

      get footerSlot() {
        return this.template.querySelector('slot[name=footer]');
      }

      get computedWrapperClassNames() {
        return classSet('slds-card').add({
          'slds-card_narrow': isNarrow(this.privateVariant)
        });
      }

      get hasIcon() {
        return !!this.iconName;
      }

      get hasStringTitle() {
        return !!this.title;
      }

    }

    lwc.registerDecorators(LightningCard, {
      publicProps: {
        title: {
          config: 0
        },
        iconName: {
          config: 0
        },
        variant: {
          config: 3
        }
      },
      track: {
        privateVariant: 1,
        showFooter: 1
      }
    });

    var _lightningCard = lwc.registerComponent(LightningCard, {
      tmpl: _tmpl$3
    });

    function tmpl$3($api, $cmp, $slotset, $ctx) {
      const {
        d: api_dynamic,
        h: api_element
      } = $api;
      return [api_element("div", {
        className: $cmp.computedClass,
        attrs: {
          "role": "status"
        },
        key: 2
      }, [$cmp.validAlternativeText ? api_element("span", {
        classMap: {
          "slds-assistive-text": true
        },
        key: 3
      }, [api_dynamic($cmp.alternativeText)]) : null, api_element("div", {
        classMap: {
          "slds-spinner__dot-a": true
        },
        key: 4
      }, []), api_element("div", {
        classMap: {
          "slds-spinner__dot-b": true
        },
        key: 5
      }, [])])];
    }

    var _tmpl$4 = lwc.registerTemplate(tmpl$3);
    tmpl$3.stylesheets = [];
    tmpl$3.stylesheetTokens = {
      hostAttribute: "lightning-spinner_spinner-host",
      shadowAttribute: "lightning-spinner_spinner"
    };

    /**
     * Displays an animated spinner.
     */

    class LightningSpinner extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.alternativeText = void 0;
        this.size = 'medium';
        this.variant = void 0;
      }

      connectedCallback() {
        this.classList.add('slds-spinner_container');
        this.template.addEventListener('mousewheel', this.stopScrolling);
        this.template.addEventListener('touchmove', this.stopScrolling);
      }

      get normalizedVariant() {
        return normalizeString(this.variant, {
          fallbackValue: 'base',
          validValues: ['base', 'brand', 'inverse']
        });
      }

      get normalizedSize() {
        return normalizeString(this.size, {
          fallbackValue: 'medium',
          validValues: ['small', 'medium', 'large']
        });
      }

      get computedClass() {
        const {
          normalizedVariant,
          normalizedSize
        } = this;
        const classes = classSet('slds-spinner'); // add variant-specific class

        if (normalizedVariant !== 'base') {
          classes.add(`slds-spinner_${normalizedVariant}`);
        } // add size-specific class


        classes.add(`slds-spinner_${normalizedSize}`);
        return classes.toString();
      } // alternativeText validation


      get validAlternativeText() {
        const hasAlternativeText = !!this.alternativeText; // if we have an empty value output a console warning

        if (!hasAlternativeText) {
          // eslint-disable-next-line no-console
          console.warn(`<lightning-spinner> The alternativeText attribute should not be empty. Please add a description of what is causing the wait.`);
        }

        return hasAlternativeText;
      } // prevent scrolling


      stopScrolling(event) {
        event.preventDefault();
      }

    }

    lwc.registerDecorators(LightningSpinner, {
      publicProps: {
        alternativeText: {
          config: 0
        },
        size: {
          config: 0
        },
        variant: {
          config: 0
        }
      }
    });

    var _lightningSpinner = lwc.registerComponent(LightningSpinner, {
      tmpl: _tmpl$4
    });

    function stylesheet$1(hostSelector, shadowSelector, nativeShadow) {
      return ".slds-map" + shadowSelector + " {height: 100%;}\n";
    }
    var _implicitStylesheets$1 = [stylesheet$1];

    function tmpl$4($api, $cmp, $slotset, $ctx) {
      const {
        b: api_bind,
        h: api_element
      } = $api;
      const {
        _m0
      } = $ctx;
      return [api_element("iframe", {
        style: $cmp.frameStyle,
        attrs: {
          "src": $cmp.src,
          "title": $cmp.title,
          "width": $cmp.width,
          "height": $cmp.height
        },
        key: 2,
        on: {
          "load": _m0 || ($ctx._m0 = api_bind($cmp.handleContentLoad))
        }
      }, [])];
    }

    var _tmpl$5 = lwc.registerTemplate(tmpl$4);
    tmpl$4.stylesheets = [];
    tmpl$4.stylesheetTokens = {
      hostAttribute: "lightning-primitiveIframe_primitiveIframe-host",
      shadowAttribute: "lightning-primitiveIframe_primitiveIframe"
    };

    // Closure to hold the APIs if and when available
    const Domains = [];
    function registerDomain(domain) {
      if (!domain || domain === '') {
        return;
      }

      const found = Domains.find(item => item.domain === domain);

      if (found) {
        found.ref += 1;
      } else {
        Domains.push({
          domain,
          ref: 1
        });
      }
    }
    function unregisterDomain(domain) {
      if (!domain || domain === '') {
        return;
      }

      const index = Domains.findIndex(item => item.domain === domain);

      if (index >= 0) {
        const found = Domains[index];
        found.ref -= 1;

        if (found.ref === 0) {
          Domains.splice(index, 1);
        }
      }
    }

    /**
     * Class representing primitive iframe.
     * @extends Element
     */

    class LightningPrimitiveIframe extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.src = void 0;
        this.domain = void 0;
        this.width = '100%';
        this.height = '100%';
        this.frameStyle = '';
        this.title = void 0;
      }

      connectedCallback() {
        registerDomain(this.src);
      }

      disconnectedCallback() {
        unregisterDomain(this.src);
      }

      handleContentLoad() {
        const iframeload = new CustomEvent('iframeload', {
          detail: {
            callbacks: {
              postToWindow: this.postToWindow.bind(this)
            }
          }
        });
        this.contentWindow = this.template.querySelector('iframe').contentWindow;
        this.dispatchEvent(iframeload);
      }

      postToWindow(message) {
        if (this.contentWindow) {
          this.contentWindow.postMessage(message, this.domain);
        }
      }

    }

    lwc.registerDecorators(LightningPrimitiveIframe, {
      publicProps: {
        src: {
          config: 0
        },
        domain: {
          config: 0
        },
        width: {
          config: 0
        },
        height: {
          config: 0
        },
        frameStyle: {
          config: 0
        },
        title: {
          config: 0
        }
      },
      publicMethods: ["postToWindow"]
    });

    var _lightningPrimitiveIframe = lwc.registerComponent(LightningPrimitiveIframe, {
      tmpl: _tmpl$5
    });

    function tmpl$5($api, $cmp, $slotset, $ctx) {
      const {
        d: api_dynamic,
        h: api_element,
        c: api_custom_element,
        b: api_bind
      } = $api;
      const {
        _m0,
        _m1
      } = $ctx;
      return [api_element("li", {
        classMap: {
          "slds-coordinates__item": true
        },
        key: 2,
        on: {
          "click": _m1 || ($ctx._m1 = api_bind($cmp.handleClick))
        }
      }, [api_element("span", {
        classMap: {
          "slds-assistive-text": true
        },
        attrs: {
          "aria-live": "polite"
        },
        key: 3
      }, [api_dynamic($cmp.computedAssistiveText)]), api_element("button", {
        classMap: {
          "slds-coordinates__item-action": true,
          "slds-button_reset": true,
          "slds-media": true
        },
        attrs: {
          "aria-pressed": $cmp.selected
        },
        key: 4,
        on: {
          "mouseover": _m0 || ($ctx._m0 = api_bind($cmp.handleMouseOver))
        }
      }, [api_element("span", {
        classMap: {
          "slds-media__figure": true
        },
        key: 5
      }, [api_custom_element("lightning-icon", _lightningIcon, {
        props: {
          "iconName": $cmp.iconName,
          "alternativeText": "Coordinate"
        },
        key: 6
      }, [])]), api_element("span", {
        classMap: {
          "slds-media__body": true
        },
        key: 7
      }, [api_element("span", {
        classMap: {
          "slds-text-link": true
        },
        key: 8
      }, [api_dynamic($cmp.itemTitle)]), api_element("span", {
        key: 9
      }, [api_dynamic($cmp.itemAddress)])])])])];
    }

    var _tmpl$6 = lwc.registerTemplate(tmpl$5);
    tmpl$5.stylesheets = [];
    tmpl$5.stylesheetTokens = {
      hostAttribute: "lightning-primitiveCoordinateItem_primitiveCoordinateItem-host",
      shadowAttribute: "lightning-primitiveCoordinateItem_primitiveCoordinateItem"
    };

    var labelSelectedItem = 'is currently selected';

    const i18n = {
      labelSelectedItemString: labelSelectedItem
    };

    class LightningPrimitiveCoordinateItem extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.itemAddress = void 0;
        this.itemTitle = void 0;
        this.iconName = void 0;
        this.guid = void 0;
        this.selected = false;
      }

      /**
       * getter for the i18 constant containing the localized strings
       */
      get i18n() {
        return i18n;
      }

      connectedCallback() {
        this.dispatchEvent(new CustomEvent('privatecoordinateregister', {
          bubbles: true,
          cancelable: true,
          composed: true,
          detail: {
            key: this.guid
          }
        }));
      }

      get computedAssistiveText() {
        if (this.selected === true) {
          return `${this.itemTitle} ${i18n.labelSelectedItemString}`;
        }

        return '';
      }

      handleMouseOver() {
        const coordinatehover = new CustomEvent('coordinatesmouseover', {
          detail: {
            key: this.guid
          }
        });
        this.dispatchEvent(coordinatehover);
      }

      handleClick() {
        const coordinateclick = new CustomEvent('coordinateclick', {
          detail: {
            key: this.guid
          }
        });
        this.dispatchEvent(coordinateclick);
      }

    }

    lwc.registerDecorators(LightningPrimitiveCoordinateItem, {
      publicProps: {
        itemAddress: {
          config: 0
        },
        itemTitle: {
          config: 0
        },
        iconName: {
          config: 0
        },
        guid: {
          config: 0
        },
        selected: {
          config: 0
        }
      }
    });

    var _lightningPrimitiveCoordinateItem = lwc.registerComponent(LightningPrimitiveCoordinateItem, {
      tmpl: _tmpl$6
    });

    function tmpl$6($api, $cmp, $slotset, $ctx) {
      const {
        gid: api_scoped_id,
        b: api_bind,
        c: api_custom_element,
        h: api_element,
        d: api_dynamic,
        fid: api_scoped_frag_id,
        t: api_text,
        k: api_key,
        i: api_iterator
      } = $api;
      const {
        _m0,
        _m1,
        _m2,
        _m3
      } = $ctx;
      return [api_element("div", {
        classMap: {
          "slds-map_container": true
        },
        key: 2
      }, [api_element("div", {
        classMap: {
          "slds-map": true
        },
        key: 3
      }, [api_custom_element("lightning-primitive-iframe", _lightningPrimitiveIframe, {
        props: {
          "id": api_scoped_id("mapContainer"),
          "title": $cmp.i18n.primitiveMapIframeTitle,
          "src": $cmp.mapSrc,
          "domain": $cmp.mapDomain
        },
        key: 4,
        on: {
          "iframeload": _m0 || ($ctx._m0 = api_bind($cmp.handleIframeLoad))
        }
      }, [])]), $cmp.showFooter ? api_element("div", {
        classMap: {
          "slds-p-around_medium": true
        },
        key: 6
      }, [api_element("a", {
        classMap: {
          "slds-button": true,
          "slds-button_brand": true
        },
        attrs: {
          "href": api_scoped_frag_id($cmp.mapHref),
          "target": "_blank"
        },
        key: 7
      }, [api_dynamic($cmp.i18n.openInGoogleMapsString)])]) : null]), $cmp.showCoordinatesSidebar ? api_element("div", {
        classMap: {
          "slds-coordinates": true
        },
        key: 9
      }, [api_element("div", {
        classMap: {
          "slds-coordinates__header": true
        },
        key: 10
      }, [api_element("h2", {
        classMap: {
          "slds-coordinates__title": true
        },
        key: 11
      }, [api_dynamic($cmp.markersTitle), api_text(" ("), api_dynamic($cmp._coordinates.length), api_text(")")])]), api_element("ul", {
        classMap: {
          "slds-coordinates__list": true
        },
        key: api_key(12, $cmp.computeGuid),
        on: {
          "privatecoordinateregister": _m3 || ($ctx._m3 = api_bind($cmp.handleCoordinateRegister))
        }
      }, api_iterator($cmp._coordinates, function (coordinate) {
        return api_element("li", {
          classMap: {
            "slds-coordinates__item": true
          },
          key: api_key(14, coordinate.key)
        }, [api_custom_element("lightning-primitive-coordinate-item", _lightningPrimitiveCoordinateItem, {
          props: {
            "itemTitle": coordinate.title,
            "itemAddress": coordinate.formattedAddress,
            "iconName": coordinate.icon,
            "guid": coordinate.key
          },
          key: api_key(15, coordinate.key),
          on: {
            "coordinateclick": _m1 || ($ctx._m1 = api_bind($cmp.handleCoordinateClick)),
            "coordinatesmouseover": _m2 || ($ctx._m2 = api_bind($cmp.handleCoordinateHover))
          }
        }, [])]);
      }))]) : null];
    }

    var _tmpl$7 = lwc.registerTemplate(tmpl$6);
    tmpl$6.stylesheets = [];

    if (_implicitStylesheets$1) {
      tmpl$6.stylesheets.push.apply(tmpl$6.stylesheets, _implicitStylesheets$1);
    }
    tmpl$6.stylesheetTokens = {
      hostAttribute: "lightning-map_map-host",
      shadowAttribute: "lightning-map_map"
    };

    var labelOpenInGoogleMaps = 'Open in Google Maps';

    var labelCoordinatesTitle = 'Markers';

    var labelIframeTitle = 'Map Container';

    /**
     * Build a human readable string of address components.
     * e.g. "1 Market St, San Francisco CA"
     * @param {Object} coordinate - either a Latitude, Longitude pair or address components.
     * @returns {String} - formatted address.
     */

    function formatAddress(coordinate) {
      let formattedAddress;

      if (coordinate.Latitude && coordinate.Longitude && !coordinate.Street) {
        formattedAddress = `${coordinate.Latitude}, ${coordinate.Longitude}`;
      } else {
        formattedAddress = [coordinate.Street, coordinate.City, coordinate.State].filter(value => value) // remove falsy values
        .join(', ');
      }

      return formattedAddress;
    }
    /**
     * Convert a passed-in string to Title Case.
     * e.g. hello world => Hello World
     * @param {String} string  - a string
     * @returns {String} titleCasedString - A String In Title Case Format
     */

    function titleCase(string) {
      return normalizeString(string).split(' ').map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(' ');
    }

    function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

    function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    const i18n$1 = {
      openInGoogleMapsString: labelOpenInGoogleMaps,
      coordinatesTitleString: labelCoordinatesTitle,
      primitiveMapIframeTitle: labelIframeTitle
    };
    const EXTERNAL_GOOGLE_MAPS_URL = 'https://www.google.com/maps/place/';
    /**
     * Displays a map with markers for one or more locations.
     */

    class LightningMap extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this._mapHref = EXTERNAL_GOOGLE_MAPS_URL;
        this._coordinates = [];
        this._activeCoordinate = null;
        this._markersTitle = i18n$1.coordinatesTitleString;
        this.privateZoomLevel = null;
        this.privateCenter = null;
        this.privateMarkers = null;
        this.privateCoordinateItems = [];
        this.mapDomain = `https://maps${configProvider.getCoreInfo().untrustedContentDomain}:${configProvider.getCoreInfo().securePort}`;
        this.mapSrc = `${this.mapDomain}/lightningmaps/mapsloader?resource=primitiveMap&version=${configProvider.getCoreInfo().internalAppVersion}`;
        this.showFooter = false;
        this.listView = 'auto';
      }

      /**
       * @param {Integer} value - Corresponds to zoom levels defined in Google Maps API
       * If not specified, automatically chooses an appropriate zoom level
       * to show all markers with comfortable margins.
       */
      set zoomLevel(value) {
        this.privateZoomLevel = value;
        this.postToIframe({
          zoomLevel: this.privateZoomLevel
        });
      }
      /**
       * The zoom levels as defined by Google Maps API.
       * If a zoom level is not specified, a default zoom level is applied to accommodate all markers on the map.
       * @type {number}
       */


      get zoomLevel() {
        return this.privateZoomLevel;
      }
      /**
       * @param {Object} value - A single address value to center the map around
       */


      set center(value) {
        this.privateCenter = value;
        const computedCenter = this.primitivifyMarker(deepCopy(this.center));
        this.postToIframe({
          center: computedCenter
        });
      }
      /**
       * A location to use as the map's center.
       * If center is not specified, the map centers automatically.
       *
       * @type {object}
       */


      get center() {
        return this.privateCenter;
      }
      /**
       * Setter for the markersTitle property.
       * @param {String} title - A title string for the list of locations
       */


      set markersTitle(title) {
        this._markersTitle = titleCase(title);
      }
      /**
       * Provides the heading title for the markers. Required if specifying multiple markers.
       * The title is displayed below the map as a header for the list of clickable addresses.
       *
       * @type {string}
       */


      get markersTitle() {
        return this._markersTitle;
      }
      /**
       * Setter for the selectedMarkerValue property.
       * @param {String} value - The value of the selected marker
       */


      set selectedMarkerValue(value) {
        const selectedMarker = this._coordinatesMapByValue[value];
        const selectedMarkerKey = selectedMarker && selectedMarker.key;
        this.selectMarker(selectedMarkerKey);
      }
      /**
       * Provides the value of the currently selected marker.
       * If the selected marker does not have the value property specified, then returns undefined.
       * @type {String}
       */


      get selectedMarkerValue() {
        const selectedMarker = this._coordinatesMapByKey[this._activeMarkerId];
        return selectedMarker && selectedMarker.value;
      }
      /**
       * Setter function, for mapMarkers.
       * Depending on the number of markers passed, we display a single view map or
       * a map with multiple markers and a list of coordinates
       * @param {Object[]} mapMarkers - the markers array with the following format:
       * map-markers = [
       *  {
       *      location: {
       *           City: 'San Francisco',
       *           Country: 'USA',
       *           PostalCode: '94105',
       *           state: 'CA',
       *           street: '50 Fremont St',
       *       },
       *      value: 'unique identifier 001',
       *      // Extra info for tile in sidebar
       *      icon: 'standard:account',
       *      title: 'Julies Kitchen', // e.g. Account.Name
       *  },
       *  {
       *      location: {
       *          City: 'San Francisco',
       *          Country: 'USA',
       *          PostalCode: '94105',
       *          State: 'CA',
       *          Street: '30 Fremont St.',
       *      },
       *      value: 'unique identifier 002',
       *      icon: 'standard:account',
       *      title: 'Tender Greens', // e.g. Account.Name
       *  }
       */


      set mapMarkers(mapMarkers) {
        this.privateMarkers = mapMarkers;
        this.initMarkers(mapMarkers);
        this._activeCoordinate = mapMarkers[0];
      }
      /**
       * One or more objects with the address or latitude and longitude to be displayed on the map.
       * If latitude and longitude are provided, the address is ignored.
       * @type {array}
       * @required
       */


      get mapMarkers() {
        return this.privateMarkers;
      }
      /**
       * getter for the i18 constant containing the localized strings
       */


      get i18n() {
        return i18n$1;
      }
      /**
       * returns the href link to open the map on an external window.
       * e.g. "https://www.google.com/maps/place/1+Market+St,+San+Francisco,+CA+94105"
       */


      get mapHref() {
        const activeCoordinate = this._activeCoordinate.location;
        let mapHrefURL = '';

        if (activeCoordinate.Latitude && activeCoordinate.Longitude) {
          mapHrefURL = encodeURI(`${EXTERNAL_GOOGLE_MAPS_URL}${activeCoordinate.Latitude},${activeCoordinate.Longitude}`);
        } else {
          mapHrefURL = encodeURI(`${EXTERNAL_GOOGLE_MAPS_URL}${normalizeString(activeCoordinate.Street)}+${normalizeString(activeCoordinate.City)}+${normalizeString(activeCoordinate.State)}+${normalizeString(activeCoordinate.PostalCode)}`);
        }

        return mapHrefURL;
      }
      /**
       * Controls the visibility of the coordinates list-view/sidebar.
       * See listView attribute.
       */


      get showCoordinatesSidebar() {
        const outputs = {
          visible: true,
          hidden: false,
          auto: this._coordinates && this._coordinates.length > 1
        };
        return outputs[this.listView];
      }

      connectedCallback() {
        classListMutation(this.classList, {
          'slds-grid': true,
          'slds-has-coordinates': this.showCoordinatesSidebar
        });
        window.addEventListener('message', this.handleMessage.bind(this));
      }
      /**
       * Function to normalize and store the coordinates being passed.
       * We store an array with all the coordindates as well as a map for easy access.
       * @param {Object} mapMarkers - Array of Coordindates
       */


      initMarkers(mapMarkers) {
        const mapMarkersLength = mapMarkers.length;
        const coordinates = [];
        const coordinatesMapByKey = {};
        const coordinatesMapByValue = {};
        let i = 0,
            coordinate = {},
            key;

        for (i; i < mapMarkersLength; i++) {
          key = guid();
          coordinate = deepCopy(mapMarkers[i]);
          coordinate.key = key;
          coordinate.formattedAddress = formatAddress(coordinate.location);

          if (!coordinate.icon) {
            coordinate.icon = 'standard:location';
          }

          coordinates.push(coordinate);
          coordinatesMapByKey[key] = coordinate;

          if (coordinate.value) {
            coordinatesMapByValue[coordinate.value] = coordinate;
          }
        }

        this._coordinates = coordinates;
        this._coordinatesMapByKey = coordinatesMapByKey;
        this._coordinatesMapByValue = coordinatesMapByValue;

        const markers = this._coordinates.map(marker => this.primitivifyMarker(marker));

        this.postToIframe({
          markers
        });
      }

      handleCoordinateRegister(event) {
        event.stopPropagation(); // suppressing event since its not part of public API

        this.privateCoordinateItems.push(event.srcElement);
      }
      /**
       * Click handler for the coordinate click.
       * On click we post the coordinate key to the primitive map so it can get selected
       * @param {Object} event - The event object containing the key of the coordinate clicked
       */


      handleCoordinateClick(event) {
        const key = event.detail.key;
        this.selectMarker(key);
        this.postToIframe({
          activeMarkerId: this._activeMarkerId
        });
      }
      /**
       * Click handler for the coordinate hover.
       * @param {Object} event - The event object containing the key of the coordinate hovered
       */


      handleCoordinateHover(event) {
        this._hoverMarkerId = event.detail.key;
        this.postToIframe({
          hoverMarkerId: this._hoverMarkerId
        });
      }
      /**
       * Handle messages from the child iframe
       * @param {Object} event - The event object
       */


      handleMessage(event) {
        const messageType = event.data && event.data.event;

        if (messageType === 'markerselect') {
          const key = event.data.key;
          this.selectMarker(key);
        }
      }

      selectMarker(key) {
        const activeCoordinate = this._coordinatesMapByKey[key];
        this._activeCoordinate = activeCoordinate;
        this._activeMarkerId = key; // unselect other child coordinateitems from the coordinates list

        this.privateCoordinateItems.forEach(coordinate => {
          if (coordinate.guid === key) {
            coordinate.selected = true;
          } else {
            coordinate.selected = false;
          }
        }); // fire select event
        // eslint-disable-next-line lightning-global/no-custom-event-bubbling

        const markerSelectEvent = new CustomEvent('markerselect', {
          bubbles: true
        });
        this.dispatchEvent(markerSelectEvent);
      }
      /**
       * Create marker for sending to primitive map.
       * Extract only information that is relevant to primitive map
       * @param {Object} marker  - a marker containing location and related information.
       * @returns {Object} marker - a marker with only keys relevant to primitive map.
       */


      primitivifyMarker(marker) {
        let primitifiedMarker = null;

        if (marker && marker.location) {
          primitifiedMarker = _objectSpread({
            key: marker.key,
            title: marker.title,
            description: marker.description
          }, marker.location);
        }

        return primitifiedMarker;
      }
      /**
       * Method helper to posts messages to the map iframe
       * @param {Object} data - The payload to post to the iframe
       */


      postToIframe(data) {
        if (this.iframeLoaded) {
          this.mapIframe.callbacks.postToWindow(data);
        }
      }
      /**
       * handler function for when the iframe is loaded, at which point we
       * store a reference for the callback postToWindow method for iframe communication.
       * We also post the first payload of coordindates to the primitive map
       * @param {Object} event - The event object containing the postToWindow callback
       */


      handleIframeLoad(event) {
        const center = this.center ? this.primitivifyMarker(deepCopy(this.center)) : null;
        const zoomLevel = this.zoomLevel;
        const markers = deepCopy(this._coordinates).map(marker => this.primitivifyMarker(marker));
        this.iframeLoaded = true;
        this.mapIframe = event.detail;
        this.postToIframe({
          center,
          markers,
          zoomLevel
        });
      }

    }

    lwc.registerDecorators(LightningMap, {
      publicProps: {
        showFooter: {
          config: 0
        },
        listView: {
          config: 0
        },
        zoomLevel: {
          config: 3
        },
        center: {
          config: 3
        },
        markersTitle: {
          config: 3
        },
        selectedMarkerValue: {
          config: 3
        },
        mapMarkers: {
          config: 3
        }
      },
      track: {
        _mapHref: 1,
        _coordinates: 1,
        _activeCoordinate: 1,
        _markersTitle: 1
      }
    });

    var _lightningMap = lwc.registerComponent(LightningMap, {
      tmpl: _tmpl$7
    });

    function tmpl$7($api, $cmp, $slotset, $ctx) {
      const {
        c: api_custom_element
      } = $api;
      return [api_custom_element("lightning-card", _lightningCard, {
        classMap: {
          "slds-is-relative": true
        },
        key: 2
      }, [$cmp.isLoading ? api_custom_element("lightning-spinner", _lightningSpinner, {
        props: {
          "alternativeText": "Loading",
          "variant": "brand"
        },
        key: 4
      }, []) : null, api_custom_element("lightning-map", _lightningMap, {
        props: {
          "mapMarkers": $cmp.mapMarkers,
          "markersTitle": $cmp.markersTitle,
          "selectedMarkerValue": $cmp.selectedMarkerValue,
          "listView": $cmp.listViewSetting,
          "center": $cmp.mapCenter
        },
        key: 5
      }, [])])];
    }

    var _tmpl$8 = lwc.registerTemplate(tmpl$7);
    tmpl$7.stylesheets = [];
    tmpl$7.stylesheetTokens = {
      hostAttribute: "lwc-mapComponent_mapComponent-host",
      shadowAttribute: "lwc-mapComponent_mapComponent"
    };

    const DEFAULT_TOAST_MODE = 'dismissible';
    const DEFAULT_VARIANT = 'info';
    const DEFAULT_DURATION = 3000;
    const WARN_MESSAGES = {
      IGNORING_MESSAGE_DATA: 'Ignoring messageData attribute in toast definition, messageData should be an array of action links.',
      MISSING_TITLE_AND_MESSAGE: "Toast definition is invalid. Missing both attributes 'title' and 'message'. At east one of them should be present",
      TOAST_DEFINITION_SHOULD_BE_OBJECT: "The toast definition should be an object, for example: { title: 'Title text', message: 'Message text' }"
    };

    function setPropertyIfTruthyValue(obj, prop, propValue) {
      if (propValue) {
        obj[prop] = propValue;
      }
    }

    function getStringProp(obj, prop) {
      let value = obj[prop] ? obj[prop] : undefined;

      if (value && !(typeof value === 'string')) {
        console.warn(`Attribute '${prop}' should have a string value.`); // eslint-disable-line no-console

        value = undefined;
      }

      return value;
    }

    function getMessageData(definition) {
      const msgData = definition.messageData;
      const msgDataIsArray = Array.isArray(msgData);

      if (msgData && !msgDataIsArray) {
        console.warn(WARN_MESSAGES.IGNORING_MESSAGE_DATA); // eslint-disable-line no-console
      }

      return msgData && msgDataIsArray ? msgData : undefined;
    }

    function getValidToastDefinition(toastDefinition) {
      const toastDefinitionIsObject = toastDefinition !== null && typeof toastDefinition === 'object' && !Array.isArray(toastDefinition);

      if (!toastDefinitionIsObject) {
        console.warn(WARN_MESSAGES.TOAST_DEFINITION_SHOULD_BE_OBJECT); // eslint-disable-line no-console

        return null;
      }

      const title = getStringProp(toastDefinition, 'title');
      const message = getStringProp(toastDefinition, 'message');

      if (!title && !message) {
        console.warn(WARN_MESSAGES.MISSING_TITLE_AND_MESSAGE); // eslint-disable-line no-console

        return null;
      }

      return toastDefinition;
    }

    function getNormalizedToastDefinition(validDefinition) {
      const normalizedToastDefinition = {};
      const title = getStringProp(validDefinition, 'title');
      const message = getStringProp(validDefinition, 'message');
      const messageData = getMessageData(validDefinition);
      normalizedToastDefinition.type = normalizeString(validDefinition.variant, {
        fallbackValue: DEFAULT_VARIANT,
        validValues: ['info', 'success', 'warning', 'error']
      });
      normalizedToastDefinition.mode = normalizeString(validDefinition.mode, {
        fallbackValue: DEFAULT_TOAST_MODE,
        validValues: ['dismissible', 'pester', 'sticky']
      });
      normalizedToastDefinition.duration = DEFAULT_DURATION;
      setPropertyIfTruthyValue(normalizedToastDefinition, 'title', title);
      setPropertyIfTruthyValue(normalizedToastDefinition, 'message', message);
      setPropertyIfTruthyValue(normalizedToastDefinition, 'messageData', messageData);
      return normalizedToastDefinition;
    }

    function getToastEventArgument(normalizedToastDefinition) {
      const eventArguments = {
        mode: normalizedToastDefinition.mode,
        duration: normalizedToastDefinition.duration,
        type: normalizedToastDefinition.type
      };

      if (normalizedToastDefinition.title && normalizedToastDefinition.message) {
        eventArguments.title = normalizedToastDefinition.title;
      }

      eventArguments.message = normalizedToastDefinition.message ? normalizedToastDefinition.message : normalizedToastDefinition.title;

      if (normalizedToastDefinition.messageData) {
        eventArguments.messageTemplate = eventArguments.message;
        eventArguments.messageTemplateData = normalizedToastDefinition.messageData;
      }

      return eventArguments;
    }

    function showToast(toastDefinition, eventDispatcher) {
      const validToastDefinition = getValidToastDefinition(toastDefinition);
      const shouldShowToast = validToastDefinition !== null;

      if (validToastDefinition !== null) {
        const normalizedToast = getNormalizedToastDefinition(validToastDefinition);
        eventDispatcher(getToastEventArgument(normalizedToast));
      }

      return shouldShowToast;
    }

    function tmpl$8($api, $cmp, $slotset, $ctx) {
      const {
        c: api_custom_element,
        d: api_dynamic,
        gid: api_scoped_id,
        b: api_bind,
        h: api_element
      } = $api;
      const {
        _m0,
        _m1
      } = $ctx;
      return [api_element("button", {
        className: $cmp.computedButtonClass,
        attrs: {
          "name": $cmp.name,
          "accesskey": $cmp.computedAccessKey,
          "title": $cmp.computedTitle,
          "type": $cmp.normalizedType,
          "value": $cmp.value,
          "aria-describedby": api_scoped_id($cmp.computedAriaDescribedBy),
          "aria-label": $cmp.computedAriaLabel,
          "aria-controls": api_scoped_id($cmp.computedAriaControls),
          "aria-expanded": $cmp.computedAriaExpanded,
          "aria-live": $cmp.computedAriaLive,
          "aria-atomic": $cmp.computedAriaAtomic
        },
        props: {
          "disabled": $cmp.disabled
        },
        key: 2,
        on: {
          "focus": _m0 || ($ctx._m0 = api_bind($cmp.handleButtonFocus)),
          "blur": _m1 || ($ctx._m1 = api_bind($cmp.handleButtonBlur))
        }
      }, [$cmp.showIconLeft ? api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
        props: {
          "iconName": $cmp.iconName,
          "svgClass": $cmp.computedIconClass,
          "variant": "bare"
        },
        key: 4
      }, []) : null, api_dynamic($cmp.label), $cmp.showIconRight ? api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
        props: {
          "iconName": $cmp.iconName,
          "svgClass": $cmp.computedIconClass,
          "variant": "bare"
        },
        key: 6
      }, []) : null])];
    }

    var _tmpl$9 = lwc.registerTemplate(tmpl$8);
    tmpl$8.stylesheets = [];
    tmpl$8.stylesheetTokens = {
      hostAttribute: "lightning-button_button-host",
      shadowAttribute: "lightning-button_button"
    };

    function tmpl$9($api, $cmp, $slotset, $ctx) {
      return [];
    }

    var _tmpl$a = lwc.registerTemplate(tmpl$9);
    tmpl$9.stylesheets = [];
    tmpl$9.stylesheetTokens = {
      hostAttribute: "lightning-primitiveButton_primitiveButton-host",
      shadowAttribute: "lightning-primitiveButton_primitiveButton"
    };

    class LightningPrimitiveButton extends lwc.LightningElement {
      get disabled() {
        return this.state.disabled;
      }

      set disabled(value) {
        this.state.disabled = normalizeBoolean(value);
      }

      set accessKey(value) {
        this.state.accesskey = value;
      }

      get accessKey() {
        return this.state.accesskey;
      }

      get computedAccessKey() {
        return this.state.accesskey;
      }

      get title() {
        return this.state.title;
      }

      set title(value) {
        this.state.title = value;
      }

      get ariaLabel() {
        return this.state.ariaLabel;
      }

      set ariaLabel(value) {
        this.state.ariaLabel = value;
      }

      get computedAriaLabel() {
        return this.state.ariaLabel;
      }

      get ariaDescribedBy() {
        return this.state.ariaDescribedBy;
      }

      set ariaDescribedBy(value) {
        this.state.ariaDescribedBy = value;
      }

      get computedAriaDescribedBy() {
        return this.state.ariaDescribedBy;
      }

      get ariaControls() {
        return this.state.ariaControls;
      }

      set ariaControls(value) {
        this.state.ariaControls = value;
      }

      get computedAriaControls() {
        return this.state.ariaControls;
      }

      get ariaExpanded() {
        return this.state.ariaExpanded;
      }

      set ariaExpanded(value) {
        this.state.ariaExpanded = normalizeString(value, {
          fallbackValue: undefined,
          validValues: ['true', 'false']
        });
      }

      get computedAriaExpanded() {
        return this.state.ariaExpanded || null;
      }

      set ariaLive(value) {
        this.state.ariaLive = value;
      }

      get ariaLive() {
        return this.state.ariaLive;
      }

      get computedAriaLive() {
        return this.state.ariaLive;
      }

      get ariaAtomic() {
        return this.state.ariaAtomic || null;
      }

      set ariaAtomic(value) {
        this.state.ariaAtomic = normalizeString(value, {
          fallbackValue: undefined,
          validValues: ['true', 'false']
        });
      }

      get computedAriaAtomic() {
        return this.state.ariaAtomic || null;
      }

      focus() {}

      constructor() {
        super(); // Workaround for an IE11 bug where click handlers on button ancestors
        // receive the click event even if the button element has the `disabled`
        // attribute set.

        this.state = {
          accesskey: null,
          ariaAtomic: null,
          ariaControls: null,
          ariaDescribedBy: null,
          ariaExpanded: null,
          ariaLabel: null,
          ariaLive: null,
          disabled: false
        };

        if (isIE11) {
          this.template.addEventListener('click', event => {
            if (this.disabled) {
              event.stopImmediatePropagation();
            }
          });
        }
      }

    }

    lwc.registerDecorators(LightningPrimitiveButton, {
      publicProps: {
        disabled: {
          config: 3
        },
        accessKey: {
          config: 3
        },
        title: {
          config: 3
        },
        ariaLabel: {
          config: 3
        },
        ariaDescribedBy: {
          config: 3
        },
        ariaControls: {
          config: 3
        },
        ariaExpanded: {
          config: 3
        },
        ariaLive: {
          config: 3
        },
        ariaAtomic: {
          config: 3
        }
      },
      publicMethods: ["focus"],
      track: {
        state: 1
      }
    });

    var LightningPrimitiveButton$1 = lwc.registerComponent(LightningPrimitiveButton, {
      tmpl: _tmpl$a
    });

    /**
     * A clickable element used to perform an action.
     */

    class LightningButton extends LightningPrimitiveButton$1 {
      constructor(...args) {
        super(...args);
        this.name = void 0;
        this.value = void 0;
        this.label = void 0;
        this.variant = 'neutral';
        this.iconName = void 0;
        this.iconPosition = 'left';
        this.type = 'button';
        this.title = null;
        this._order = null;
      }

      render() {
        return _tmpl$9;
      }

      get computedButtonClass() {
        return classSet('slds-button').add({
          'slds-button_neutral': this.normalizedVariant === 'neutral',
          'slds-button_brand': this.normalizedVariant === 'brand',
          'slds-button_outline-brand': this.normalizedVariant === 'brand-outline',
          'slds-button_destructive': this.normalizedVariant === 'destructive',
          'slds-button_text-destructive': this.normalizedVariant === 'destructive-text',
          'slds-button_inverse': this.normalizedVariant === 'inverse',
          'slds-button_success': this.normalizedVariant === 'success',
          'slds-button_first': this._order === 'first',
          'slds-button_middle': this._order === 'middle',
          'slds-button_last': this._order === 'last'
        }).toString();
      }

      get computedTitle() {
        return this.title;
      }

      get normalizedVariant() {
        return normalizeString(this.variant, {
          fallbackValue: 'neutral',
          validValues: ['base', 'neutral', 'brand', 'brand-outline', 'destructive', 'destructive-text', 'inverse', 'success']
        });
      }

      get normalizedType() {
        return normalizeString(this.type, {
          fallbackValue: 'button',
          validValues: ['button', 'reset', 'submit']
        });
      }

      get normalizedIconPosition() {
        return normalizeString(this.iconPosition, {
          fallbackValue: 'left',
          validValues: ['left', 'right']
        });
      }

      get showIconLeft() {
        return this.iconName && this.normalizedIconPosition === 'left';
      }

      get showIconRight() {
        return this.iconName && this.normalizedIconPosition === 'right';
      }

      get computedIconClass() {
        return classSet('slds-button__icon').add({
          'slds-button__icon_left': this.normalizedIconPosition === 'left',
          'slds-button__icon_right': this.normalizedIconPosition === 'right'
        }).toString();
      }

      handleButtonFocus() {
        this.dispatchEvent(new CustomEvent('focus'));
      }

      handleButtonBlur() {
        this.dispatchEvent(new CustomEvent('blur'));
      }
      /**
       * Sets focus on the button.
       */


      focus() {
        if (this._connected) {
          this.template.querySelector('button').focus();
        }
      }
      /**
       * Clicks the button.
       */


      click() {
        if (this._connected) {
          this.template.querySelector('button').click();
        }
      }
      /**
       * {Function} setOrder - Sets the order value of the button when in the context of a button-group or other ordered component
       * @param {String} order -  The order string (first, middle, last)
       */


      setOrder(order) {
        this._order = order;
      }
      /**
       * Once we are connected, we fire a register event so the button-group (or other) component can register
       * the buttons.
       */


      connectedCallback() {
        this._connected = true;
        const privatebuttonregister = new CustomEvent('privatebuttonregister', {
          bubbles: true,
          detail: {
            callbacks: {
              setOrder: this.setOrder.bind(this),
              setDeRegistrationCallback: deRegistrationCallback => {
                this._deRegistrationCallback = deRegistrationCallback;
              }
            }
          }
        });
        this.dispatchEvent(privatebuttonregister);
      }

      disconnectedCallback() {
        this._connected = false;

        if (this._deRegistrationCallback) {
          this._deRegistrationCallback();
        }
      }

    }

    LightningButton.delegatesFocus = true;

    lwc.registerDecorators(LightningButton, {
      publicProps: {
        name: {
          config: 0
        },
        value: {
          config: 0
        },
        label: {
          config: 0
        },
        variant: {
          config: 0
        },
        iconName: {
          config: 0
        },
        iconPosition: {
          config: 0
        },
        type: {
          config: 0
        }
      },
      publicMethods: ["focus", "click"],
      track: {
        title: 1,
        _order: 1
      }
    });

    var _lightningButton = lwc.registerComponent(LightningButton, {
      tmpl: _tmpl$9
    });
    LightningButton.interopMap = {
      exposeNativeEvent: {
        click: true,
        focus: true,
        blur: true
      }
    };

    function tmpl$a($api, $cmp, $slotset, $ctx) {
      const {
        b: api_bind,
        c: api_custom_element
      } = $api;
      const {
        _m0
      } = $ctx;
      return [api_custom_element("lightning-button", _lightningButton, {
        props: {
          "label": $cmp.buttonText
        },
        key: 2,
        on: {
          "click": _m0 || ($ctx._m0 = api_bind($cmp.handleButtonClick))
        }
      }, [])];
    }

    var _tmpl$b = lwc.registerTemplate(tmpl$a);
    tmpl$a.stylesheets = [];
    tmpl$a.stylesheetTokens = {
      hostAttribute: "lightning-noticeFooter_noticeFooter-host",
      shadowAttribute: "lightning-noticeFooter_noticeFooter"
    };

    var labelOkButton = 'OK';

    const i18n$2 = {
      okButton: labelOkButton
    };

    class NoticeFooter extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.handleClickCallback = void 0;
      }

      get buttonText() {
        return `${i18n$2.okButton}`;
      }

      handleButtonClick() {
        if (typeof this.handleClickCallback === 'function') {
          this.handleClickCallback.call();
        }
      }

    }

    lwc.registerDecorators(NoticeFooter, {
      publicProps: {
        handleClickCallback: {
          config: 0
        }
      }
    });

    lwc.registerComponent(NoticeFooter, {
      tmpl: _tmpl$b
    });

    function tmpl$b($api, $cmp, $slotset, $ctx) {
      const {
        d: api_dynamic,
        k: api_key,
        h: api_element,
        i: api_iterator
      } = $api;
      return api_iterator($cmp.formattedParts, function (part) {
        return [part.isLink ? api_element("a", {
          attrs: {
            "target": "_blank",
            "href": part.href,
            "rel": "noopener"
          },
          key: api_key(4, part.key)
        }, [api_dynamic(part.value)]) : null, part.isText ? api_dynamic(part.value) : null, part.isNewline ? api_element("br", {
          key: api_key(7, part.key)
        }, []) : null];
      });
    }

    var _tmpl$c = lwc.registerTemplate(tmpl$b);
    tmpl$b.stylesheets = [];
    tmpl$b.stylesheetTokens = {
      hostAttribute: "lightning-formattedText_formattedText-host",
      shadowAttribute: "lightning-formattedText_formattedText"
    };

    /*
     * Regex was taken from aura lib and refactored
     */

    const linkRegex = new RegExp(`(${newLineRegexString})|${urlRegexString}|${emailRegexString}`, 'gi');
    const emailRegex = new RegExp(emailRegexString, 'gi');
    const newLineRegex = new RegExp(newLineRegexString, 'gi');

    function getTextPart(text) {
      return {
        isText: true,
        value: text
      };
    }

    function getUrlPart(url) {
      return {
        isLink: true,
        value: url,
        href: createHttpHref(url)
      };
    }

    function getEmailPart(email) {
      return {
        isLink: true,
        value: email,
        href: createEmailHref(email)
      };
    }

    function getNewlinePart() {
      return {
        isNewline: true
      };
    }

    function getLinkPart(link) {
      if (link.match(newLineRegex)) {
        return getNewlinePart();
      } else if (link.match(emailRegex)) {
        return getEmailPart(link);
      }

      return getUrlPart(link);
    }

    function parseToFormattedLinkifiedParts(text) {
      const parts = [];
      const re = linkRegex;
      let match;

      while ((match = re.exec(text)) !== null) {
        const indexOfMatch = text.indexOf(match[0]);
        let link = match[0];
        const endsWithQuote = link && link.endsWith('&quot'); // If we found an email or url match, then create a text part for everything
        // up to the match and then create the part for the email or url

        if (indexOfMatch > 0) {
          parts.push(getTextPart(text.slice(0, text.indexOf(match[0]))));
        }

        if (endsWithQuote) {
          link = link.slice(0, link.lastIndexOf('&quot'));
        }

        parts.push(getLinkPart(link));

        if (endsWithQuote) {
          parts.push(getTextPart('&quot'));
        }

        text = text.substring(re.lastIndex);
        re.lastIndex = 0;
      }

      if (text != null && text !== '') {
        parts.push(getTextPart(text));
      }

      return parts;
    }
    function parseToFormattedParts(text) {
      return text.split(newLineRegex).map((part, index) => {
        return index % 2 === 0 ? getTextPart(part) : getNewlinePart();
      });
    }

    /**
     * Displays text, replaces newlines with line breaks, and linkifies if requested.
     */

    class FormattedText extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.value = '';
        this._linkify = false;
      }

      /**
       * If present, URLs and email addresses are displayed in anchor tags.
       * They are displayed in plain text by default.
       * @type {boolean}
       * @default false
       */
      get linkify() {
        return this._linkify;
      }

      set linkify(value) {
        this._linkify = normalizeBoolean(value);
      }

      get formattedParts() {
        if (!this.value || typeof this.value !== 'string') {
          return [];
        }

        return this.linkify ? parseToFormattedLinkifiedParts(this.value) : parseToFormattedParts(this.value);
      }

    }

    lwc.registerDecorators(FormattedText, {
      publicProps: {
        value: {
          config: 0
        },
        linkify: {
          config: 3
        }
      },
      track: {
        _linkify: 1
      }
    });

    var _lightningFormattedText = lwc.registerComponent(FormattedText, {
      tmpl: _tmpl$c
    });

    function tmpl$c($api, $cmp, $slotset, $ctx) {
      const {
        d: api_dynamic,
        h: api_element,
        c: api_custom_element
      } = $api;
      return [$cmp.messageTitle ? api_element("p", {
        key: 2
      }, [api_element("strong", {
        key: 3
      }, [api_dynamic($cmp.messageTitle)])]) : null, api_element("p", {
        key: 4
      }, [api_custom_element("lightning-formatted-text", _lightningFormattedText, {
        props: {
          "value": $cmp.messageBody,
          "linkify": "true"
        },
        key: 5
      }, [])])];
    }

    var _tmpl$d = lwc.registerTemplate(tmpl$c);
    tmpl$c.stylesheets = [];
    tmpl$c.stylesheetTokens = {
      hostAttribute: "lightning-noticeContent_noticeContent-host",
      shadowAttribute: "lightning-noticeContent_noticeContent"
    };

    class NoticeContent extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.messageTitle = void 0;
        this.messageBody = void 0;
      }

    }

    lwc.registerDecorators(NoticeContent, {
      publicProps: {
        messageTitle: {
          config: 0
        },
        messageBody: {
          config: 0
        }
      }
    });

    lwc.registerComponent(NoticeContent, {
      tmpl: _tmpl$d
    });

    const ShowToastEventName = 'lightning__showtoast';
    class ShowToastEvent extends CustomEvent {
      constructor(toast) {
        super(ShowToastEventName, {
          composed: true,
          cancelable: true,
          bubbles: true
        });
        showToast(toast, forceShowToastAttributes => {
          Object.defineProperties(this, {
            toastAttributes: {
              value: forceShowToastAttributes,
              writable: false
            }
          });
        });
      }

    }

    const apexInvoker = lds.getApexInvoker("", "ContactMapController", "getNearbyJobOrders", false);
    wireService.register(apexInvoker, lds.generateGetApexWireAdapter("", "ContactMapController", "getNearbyJobOrders", false));

    const LONGITUDE_FIELD = 'Contact.MailingLatitude';
    const LATITUDE_FIELD = 'Contact.MailingLongitude';
    const CONTACT_NAME = 'Contact.Name';
    const CONTACT_FIELDS = [CONTACT_NAME, LONGITUDE_FIELD, LATITUDE_FIELD];

    class mapComponent extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.proximity = void 0;
        this.listVisibility = void 0;
        this.isRendered = void 0;
        this.contactId = void 0;
        this.contactName = void 0;
        this.contactLongitude = void 0;
        this.contactLatitude = void 0;
        this.mapMarkers = [];
        this.mapCenter = void 0;
        this.markersTitle = void 0;
        this.selectedMarkerValue = void 0;
        this.listViewSetting = void 0;
        this.isLoading = true;
      }

      // Getter and Setter to allow for logic to run on recordId change
      get recordId() {
        return contactId;
      }

      set recordId(value) {
        this.setAttribute('contactId', value);
        this.contactId = value;
      }

      wiredRecord({
        error,
        data
      }) {
        // Error handling
        if (data) {
          this.error = undefined;
          this.contactName = data.fields.Name.value;
          this.contactLatitude = data.fields.MailingLatitude.value;
          this.contactLongitude = data.fields.MailingLongitude.value;
        } else if (error) {
          this.error = error; //this.contactId = undefined;

          this.mapMarkers = [];
        }
      }

      wiredJobsJSON({
        error,
        data
      }) {
        if (data) {
          this.createMapMarkers(JSON.parse(data));
        } else if (error) {
          this.isLoading = false;
          this.dispatchEvent(new ShowToastEvent({
            title: 'Error loading Jobs Near Contact',
            message: error.message,
            variant: 'error'
          }));
        }
      }

      createMapMarkers(jobData) {
        const newMarkers = jobData.map(job => {
          return {
            title: job.Job_Title__c,
            description: job.Name + '</br>' + job.ExpECM__Organization__r.Name,
            location: {
              Latitude: job.geoloc__Latitude__s,
              Longitude: job.geoloc__Longitude__s
            }
          };
        });
        newMarkers.unshift({
          value: 'contact',
          icon: 'standard:user',
          title: this.contactName,
          // Name of person
          location: {
            Latitude: this.contactLatitude,
            Longitude: this.contactLongitude
          }
        });
        this.mapCenter = {
          location: {
            Latitude: this.contactLatitude,
            Longitude: this.contactLongitude
          }
        };
        this.markersTitle = 'Nearby Jobs';
        this.selectedMarkerValue = 'contact';
        this.mapMarkers = newMarkers;
        this.listViewSetting = this.listVisibility;
        this.isLoading = false;
      }

    }

    lwc.registerDecorators(mapComponent, {
      publicProps: {
        proximity: {
          config: 0
        },
        listVisibility: {
          config: 0
        },
        recordId: {
          config: 3
        }
      },
      wire: {
        wiredRecord: {
          adapter: lds.getRecord,
          params: {
            recordId: "contactId"
          },
          static: {
            fields: CONTACT_FIELDS
          },
          method: 1
        },
        wiredJobsJSON: {
          adapter: apexInvoker,
          params: {
            latitude: "contactLatitude",
            longitude: "contactLongitude",
            proximity: "proximity"
          },
          static: {},
          method: 1
        }
      }
    });

    var mapComponent$1 = lwc.registerComponent(mapComponent, {
      tmpl: _tmpl$8
    });

    return mapComponent$1;

});
