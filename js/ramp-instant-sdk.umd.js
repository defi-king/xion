(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.rampInstantSdk = {}));
}(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function unwrapExports (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var bodyScrollLock_min = createCommonjsModule(function (module, exports) {
    !function(e,t){t(exports);}(commonjsGlobal,function(exports){function r(e){if(Array.isArray(e)){for(var t=0,o=Array(e.length);t<e.length;t++)o[t]=e[t];return o}return Array.from(e)}Object.defineProperty(exports,"__esModule",{value:!0});var l=!1;if("undefined"!=typeof window){var e={get passive(){l=!0;}};window.addEventListener("testPassive",null,e),window.removeEventListener("testPassive",null,e);}var d="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&/iP(ad|hone|od)/.test(window.navigator.platform),c=[],u=!1,a=-1,s=void 0,v=void 0,f=function(t){return c.some(function(e){return !(!e.options.allowTouchMove||!e.options.allowTouchMove(t))})},m=function(e){var t=e||window.event;return !!f(t.target)||(1<t.touches.length||(t.preventDefault&&t.preventDefault(),!1))},o=function(){setTimeout(function(){void 0!==v&&(document.body.style.paddingRight=v,v=void 0),void 0!==s&&(document.body.style.overflow=s,s=void 0);});};exports.disableBodyScroll=function(i,e){if(d){if(!i)return void console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");if(i&&!c.some(function(e){return e.targetElement===i})){var t={targetElement:i,options:e||{}};c=[].concat(r(c),[t]),i.ontouchstart=function(e){1===e.targetTouches.length&&(a=e.targetTouches[0].clientY);},i.ontouchmove=function(e){var t,o,n,r;1===e.targetTouches.length&&(o=i,r=(t=e).targetTouches[0].clientY-a,!f(t.target)&&(o&&0===o.scrollTop&&0<r?m(t):(n=o)&&n.scrollHeight-n.scrollTop<=n.clientHeight&&r<0?m(t):t.stopPropagation()));},u||(document.addEventListener("touchmove",m,l?{passive:!1}:void 0),u=!0);}}else{n=e,setTimeout(function(){if(void 0===v){var e=!!n&&!0===n.reserveScrollBarGap,t=window.innerWidth-document.documentElement.clientWidth;e&&0<t&&(v=document.body.style.paddingRight,document.body.style.paddingRight=t+"px");}void 0===s&&(s=document.body.style.overflow,document.body.style.overflow="hidden");});var o={targetElement:i,options:e||{}};c=[].concat(r(c),[o]);}var n;},exports.clearAllBodyScrollLocks=function(){d?(c.forEach(function(e){e.targetElement.ontouchstart=null,e.targetElement.ontouchmove=null;}),u&&(document.removeEventListener("touchmove",m,l?{passive:!1}:void 0),u=!1),c=[],a=-1):(o(),c=[]);},exports.enableBodyScroll=function(t){if(d){if(!t)return void console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");t.ontouchstart=null,t.ontouchmove=null,c=c.filter(function(e){return e.targetElement!==t}),u&&0===c.length&&(document.removeEventListener("touchmove",m,l?{passive:!1}:void 0),u=!1);}else(c=c.filter(function(e){return e.targetElement!==t})).length||o();};});
    });

    var bodyScrollLock = unwrapExports(bodyScrollLock_min);

    var baseWidgetUrl = 'https://widget-instant.ramp.network/';

    function doFetchPurchase(apiUrl, purchaseExternalId, token) {
        return __awaiter(this, void 0, void 0, function () {
            var rawResponse, response, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch(apiUrl + "/host-api/purchase/" + purchaseExternalId + "?secret=" + token, {
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            })];
                    case 1:
                        rawResponse = _b.sent();
                        if (!rawResponse.ok) {
                            throw new Error("Request for purchase #" + purchaseExternalId + " failed");
                        }
                        return [4 /*yield*/, rawResponse.json()];
                    case 2:
                        response = _b.sent();
                        return [2 /*return*/, response];
                    case 3:
                        _a = _b.sent();
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    function delay(ms) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, ms); })];
            });
        });
    }

    var EventSeverity;
    (function (EventSeverity) {
        EventSeverity["VERBOSE"] = "VERBOSE";
        EventSeverity["DEBUG"] = "DEBUG";
        EventSeverity["INFO"] = "INFO";
        EventSeverity["WARNING"] = "WARNING";
        EventSeverity["ERROR"] = "ERROR";
        EventSeverity["CRITICAL"] = "CRITICAL";
    })(EventSeverity || (EventSeverity = {}));
    (function (WidgetEventTypes) {
        WidgetEventTypes["WIDGET_CLOSE"] = "WIDGET_CLOSE";
        WidgetEventTypes["WIDGET_CONFIG_DONE"] = "WIDGET_CONFIG_DONE";
        WidgetEventTypes["WIDGET_CONFIG_FAILED"] = "WIDGET_CONFIG_FAILED";
        WidgetEventTypes["PURCHASE_CREATED"] = "PURCHASE_CREATED";
        WidgetEventTypes["PURCHASE_SUCCESSFUL"] = "PURCHASE_SUCCESSFUL";
        WidgetEventTypes["PURCHASE_FAILED"] = "PURCHASE_FAILED";
    })(exports.RampInstantEventTypes || (exports.RampInstantEventTypes = {}));
    var InternalEventTypes;
    (function (InternalEventTypes) {
        InternalEventTypes["WIDGET_CLOSE_REQUEST"] = "WIDGET_CLOSE_REQUEST";
        InternalEventTypes["WIDGET_CLOSE_REQUEST_CANCELLED"] = "WIDGET_CLOSE_REQUEST_CANCELLED";
        InternalEventTypes["WIDGET_CLOSE_REQUEST_CONFIRMED"] = "WIDGET_CLOSE_REQUEST_CONFIRMED";
    })(InternalEventTypes || (InternalEventTypes = {}));

    function getRandomIntString() {
        try {
            return String(crypto.getRandomValues(new Uint32Array(1))[0]);
        }
        catch (_a) {
            // if `crypto` is not supported, fall back to Math.random
            // tslint:disable-next-line:no-magic-numbers
            return String(Math.floor(Math.random() * 10000000));
        }
    }
    var widgetDesktopWidth = 895;
    var widgetDesktopHeight = 590;
    var minWidgetMobileWidth = 375;
    var minWidgetMobileHeight = 667;
    function normalizeConfigAndLogErrorsOnInvalidFields(config) {
        var errors = [];
        var configCopy = __assign({}, config);
        if (![
            'desktop',
            'mobile',
            'hosted-desktop',
            'hosted-mobile',
            'hosted-auto',
            'auto',
            'embedded-desktop',
            'embedded-mobile',
        ].includes(config.variant)) {
            configCopy.variant = 'desktop';
            errors.push({
                fieldName: 'variant',
                description: 'Invalid value for `variant` config field ',
                exampleValue: "'desktop'",
                severity: EventSeverity.WARNING,
            });
        }
        if (config.variant === 'embedded-desktop' || config.variant === 'embedded-mobile') {
            validateContainerNode(config.containerNode, config.variant);
        }
        if (!['embedded-desktop', 'embedded-mobile'].includes(configCopy.variant)) {
            delete configCopy.containerNode;
        }
        logErrors(errors);
        return configCopy;
    }
    function logErrors(errors) {
        if (!errors.length) {
            return;
        }
        // tslint:disable:no-console
        console.group('Config errors');
        errors.forEach(function (error) {
            console.group(error.fieldName);
            console.log(error.description);
            console.log("Example expected value: " + error.exampleValue);
            console.log("Severity: " + error.severity);
            console.groupEnd();
        });
        console.groupEnd();
        // tslint:enable:no-console
    }
    function initEventListenersDict() {
        var widgetEventTypes = Array.from(Object.values(exports.RampInstantEventTypes));
        var internalEventTypes = Array.from(Object.values(InternalEventTypes));
        return __spreadArrays(widgetEventTypes, internalEventTypes).reduce(function (listenersDict, eventType) {
            listenersDict[eventType] = [];
            return listenersDict;
        }, {});
    }
    function countListenersForEvent(listeners, event, internal) {
        if (internal === void 0) { internal = false; }
        return listeners[event].filter(function (handler) { return handler.internal === internal; }).length;
    }
    function determineWidgetVariant(config) {
        var _a;
        var mediaQuery = '(min-width: 920px) and (min-height: 630px)';
        var variant = (_a = config.variant) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase();
        if (variant === 'mobile' ||
            variant === 'desktop' ||
            variant === 'hosted-mobile' ||
            variant === 'hosted-desktop') {
            return variant;
        }
        if (variant === 'embedded-desktop') {
            return 'desktop';
        }
        if (variant === 'embedded-mobile') {
            return 'mobile';
        }
        var isDesktop = window.matchMedia(mediaQuery).matches;
        if (variant === 'hosted-auto') {
            return isDesktop ? 'hosted-desktop' : 'hosted-mobile';
        }
        return isDesktop ? 'desktop' : 'mobile';
    }
    function isHtmlElement(element) {
        return typeof element.blur === 'function';
    }
    function validateContainerNode(containerNode, variant) {
        if (!document.body) {
            throw new Error("Couldn't find <body> element.");
        }
        if (!(containerNode instanceof HTMLElement)) {
            throw new Error('Container node has to be a proper HTML element.');
        }
        if (!document.body.contains(containerNode)) {
            throw new Error('Container node must be attached to the document.');
        }
        var _a = containerNode.getBoundingClientRect(), width = _a.width, height = _a.height;
        if (variant === 'embedded-desktop') {
            if (width < widgetDesktopWidth) {
                throw new Error("Container node must be at least " + widgetDesktopWidth + "px wide.");
            }
            if (height < widgetDesktopHeight) {
                throw new Error("Container node must be at least " + widgetDesktopHeight + "px tall.");
            }
        }
        else if (variant === 'embedded-mobile') {
            if (width < minWidgetMobileWidth) {
                throw new Error("Container node must be at least " + minWidgetMobileWidth + "px wide.");
            }
            if (height < minWidgetMobileHeight) {
                throw new Error("Container node must be at least " + minWidgetMobileHeight + "px wide.");
            }
        }
    }

    function initWidgetIframeUrl(config) {
        var baseUrl = new URL(config.url || baseWidgetUrl);
        var hostUrl = window.location.origin;
        var containerNode = config.containerNode, url = config.url, configWithoutIframeUrl = __rest(config, ["containerNode", "url"]);
        var preparedConfig = __assign(__assign({}, configWithoutIframeUrl), { hostUrl: hostUrl });
        Object.entries(preparedConfig).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            if (value) {
                baseUrl.searchParams.append(key, value);
            }
        });
        return baseUrl.toString();
    }
    function initDOMNodeWithOverlay(url, dispatch, config) {
        var body = document.querySelector('body');
        var shadowHost = document.createElement('div');
        shadowHost.style.width = '100%';
        shadowHost.style.height = '100%';
        var shadow = shadowHost.attachShadow({ mode: 'open' });
        shadow.appendChild(getStylesForShadowDom(config.variant));
        var iframe = prepareIframeNode(url, config.variant);
        var overlay = prepareOverlayNode(iframe, dispatch);
        overlay.appendChild(iframe);
        shadow.appendChild(overlay);
        return {
            body: body,
            iframe: iframe,
            overlay: overlay,
            shadow: shadow,
            shadowHost: shadowHost,
        };
    }
    function initDOMNodeWithoutOverlay(url, _dispatch, config) {
        var body = document.querySelector('body');
        var shadowHost = document.createElement('div');
        shadowHost.style.width = '100%';
        shadowHost.style.height = '100%';
        var shadow = shadowHost.attachShadow({ mode: 'open' });
        var container = document.createElement('div');
        container.classList.add('embedded-container');
        shadow.appendChild(container);
        var loader = document.createElement('div');
        loader.classList.add('loader-container');
        // tslint:disable:max-line-length
        loader.innerHTML = "\n    <svg width=\"92\" height=\"60\" viewBox=\"0 0 51 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"loader\">\n      <path d=\"M16.2232 18.8309L22.282 24.912C22.7953 25.4272 22.7948 26.2647 22.281 26.7792L17.651 31.4158C16.8619 32.1947 15.5719 32.1947 14.7828 31.4158L0.591812 17.4093C-0.197271 16.6305 -0.197271 15.3571 0.591812 14.5783L14.7828 0.584122C15.5719 -0.194707 16.8619 -0.194707 17.651 0.584122L22.281 5.22078C22.7948 5.73535 22.7953 6.57281 22.282 7.08795L16.2232 13.1691C14.645 14.7267 14.645 17.2733 16.2232 18.8309Z\" fill=\"#21BF73\"></path>\n      <path d=\"M34.4433 18.8309L28.3845 24.912C27.8712 25.4272 27.8717 26.2647 28.3855 26.7792L33.0155 31.4158C33.8046 32.1947 35.0946 32.1947 35.8837 31.4158L50.0747 17.4093C50.8638 16.6305 50.8638 15.3571 50.0747 14.5783L35.8837 0.584122C35.0946 -0.194707 33.8046 -0.194707 33.0155 0.584122L28.3855 5.22078C27.8717 5.73535 27.8712 6.57281 28.3845 7.08795L34.4433 13.1691C36.0215 14.7267 36.0215 17.2733 34.4433 18.8309Z\" fill=\"#0A6E5C\"></path>\n      <path d=\"M17.8128 17.157C17.1737 16.518 17.1737 15.482 17.8128 14.843L24.1765 8.47926C24.8155 7.84025 25.8515 7.84025 26.4905 8.47926L32.8542 14.843C33.4932 15.482 33.4932 16.518 32.8542 17.157L26.4905 23.5207C25.8515 24.1598 24.8155 24.1598 24.1765 23.5207L17.8128 17.157Z\" fill=\"#21BF73\"></path>\n    </svg>";
        // tslint:enable:max-line-length
        container.appendChild(loader);
        shadow.appendChild(getStylesForShadowDom(config.variant));
        var iframe = prepareIframeNode(url, config.variant, config.containerNode);
        container.appendChild(iframe);
        return {
            body: body,
            iframe: iframe,
            overlay: null,
            shadow: shadow,
            shadowHost: shadowHost,
        };
    }
    function importFonts() {
        if (document.querySelector('[data-ramp-font]')) {
            return;
        }
        var font = document.createElement('link');
        font.setAttribute('href', 'https://fonts.googleapis.com/css?family=Poppins:200,400,500,600,700&display=swap&subset=latin-ext');
        font.setAttribute('rel', 'stylesheet');
        font.setAttribute('data-ramp-font', '');
        document.head.appendChild(font);
    }
    function prepareIframeNode(url, variant, containerNode) {
        var iframe = document.createElement('iframe');
        iframe.setAttribute('src', url);
        if (containerNode) {
            iframe.setAttribute('width', variant === 'desktop'
                ? widgetDesktopWidth.toString()
                : containerNode.getBoundingClientRect().width.toString());
            iframe.setAttribute('height', variant === 'desktop'
                ? widgetDesktopHeight.toString()
                : containerNode.getBoundingClientRect().height.toString());
        }
        else {
            iframe.setAttribute('width', variant === 'desktop' ? widgetDesktopWidth.toString() : window.innerWidth.toString());
            iframe.setAttribute('height', variant === 'desktop' ? widgetDesktopHeight.toString() : window.innerHeight.toString());
        }
        iframe.classList.add('iframe');
        return iframe;
    }
    function prepareOverlayNode(iframe, dispatch) {
        var overlay = document.createElement('div');
        overlay.classList.add('overlay');
        var loader = document.createElement('div');
        loader.classList.add('loader-container');
        // tslint:disable:max-line-length
        loader.innerHTML = "\n    <svg width=\"92\" height=\"60\" viewBox=\"0 0 51 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"loader\">\n      <path d=\"M16.2232 18.8309L22.282 24.912C22.7953 25.4272 22.7948 26.2647 22.281 26.7792L17.651 31.4158C16.8619 32.1947 15.5719 32.1947 14.7828 31.4158L0.591812 17.4093C-0.197271 16.6305 -0.197271 15.3571 0.591812 14.5783L14.7828 0.584122C15.5719 -0.194707 16.8619 -0.194707 17.651 0.584122L22.281 5.22078C22.7948 5.73535 22.7953 6.57281 22.282 7.08795L16.2232 13.1691C14.645 14.7267 14.645 17.2733 16.2232 18.8309Z\" fill=\"#21BF73\"></path>\n      <path d=\"M34.4433 18.8309L28.3845 24.912C27.8712 25.4272 27.8717 26.2647 28.3855 26.7792L33.0155 31.4158C33.8046 32.1947 35.0946 32.1947 35.8837 31.4158L50.0747 17.4093C50.8638 16.6305 50.8638 15.3571 50.0747 14.5783L35.8837 0.584122C35.0946 -0.194707 33.8046 -0.194707 33.0155 0.584122L28.3855 5.22078C27.8717 5.73535 27.8712 6.57281 28.3845 7.08795L34.4433 13.1691C36.0215 14.7267 36.0215 17.2733 34.4433 18.8309Z\" fill=\"#0A6E5C\"></path>\n      <path d=\"M17.8128 17.157C17.1737 16.518 17.1737 15.482 17.8128 14.843L24.1765 8.47926C24.8155 7.84025 25.8515 7.84025 26.4905 8.47926L32.8542 14.843C33.4932 15.482 33.4932 16.518 32.8542 17.157L26.4905 23.5207C25.8515 24.1598 24.8155 24.1598 24.1765 23.5207L17.8128 17.157Z\" fill=\"#21BF73\"></path>\n    </svg>";
        // tslint:enable:max-line-length
        overlay.appendChild(loader);
        overlay.addEventListener('click', function (event) {
            if (event.target !== iframe && !overlay.querySelectorAll('.close-modal').length) {
                dispatch({
                    type: InternalEventTypes.WIDGET_CLOSE_REQUEST,
                    payload: null,
                    internal: true,
                });
            }
        });
        return overlay;
    }
    function areUrlsEqual(url0, url1) {
        return new URL(url0).toString() === new URL(url1).toString();
    }
    function isCloseModalAlreadyOpen(containerNode) {
        return containerNode.querySelectorAll('.close-modal').length !== 0;
    }
    function prepareCloseModalNode(dispatch) {
        var container = document.createElement('div');
        container.classList.add('close-modal');
        var textEl = document.createElement('div');
        textEl.classList.add('close-modal__text');
        textEl.textContent = 'Are you sure you want to exit Ramp Instant and abandon the transaction?';
        var buttonContainer = document.createElement('div');
        buttonContainer.classList.add('close-modal__button-container');
        var cancelButton = document.createElement('button');
        cancelButton.setAttribute('type', 'button');
        cancelButton.classList.add('close-modal__button');
        cancelButton.classList.add('close-modal__button--cancel');
        cancelButton.textContent = 'Cancel';
        cancelButton.addEventListener('click', function (event) {
            event.stopPropagation();
            dispatch({
                type: InternalEventTypes.WIDGET_CLOSE_REQUEST_CANCELLED,
                payload: null,
                internal: true,
            });
        });
        var exitButton = document.createElement('button');
        exitButton.setAttribute('type', 'button');
        exitButton.classList.add('close-modal__button');
        exitButton.classList.add('close-modal__button--exit');
        exitButton.textContent = 'Exit';
        exitButton.addEventListener('click', function (event) {
            event.stopPropagation();
            dispatch({
                type: InternalEventTypes.WIDGET_CLOSE_REQUEST_CONFIRMED,
                payload: null,
                internal: true,
            });
        });
        buttonContainer.appendChild(cancelButton);
        buttonContainer.appendChild(exitButton);
        container.appendChild(textEl);
        container.appendChild(buttonContainer);
        return container;
    }
    function getStylesForShadowDom(variant) {
        var styles = document.createElement('style');
        var isMobile = variant === 'mobile';
        styles.textContent = "\n    .overlay {\n      position: fixed;\n      z-index: 1000;\n      width: 100vw;\n      height: 100vh;\n      top: 0;\n      left: 0;\n      background-color: rgba(166, 174, 185, 0.7);\n      display: flex;\n      flex-flow: row nowrap;\n      justify-content: center;\n      " + (isMobile ? 'align-items: flex-start;' : 'align-items: center;') + "\n    }\n\n    .embedded-container {\n      z-index: 1000;\n      width: 100%;\n      height: 100%;\n      display: flex;\n      flex-flow: row nowrap;\n      justify-content: center;\n      " + (isMobile ? 'align-items: flex-start;' : 'align-items: center;') + "\n      min-width: " + (isMobile ? minWidgetMobileWidth : widgetDesktopWidth) + "px;\n      min-height: " + (isMobile ? minWidgetMobileHeight : widgetDesktopHeight) + "px;\n    }\n\n    .loader-container {\n      align-self: center;\n    }\n\n    .loader {\n      transform-origin: center;\n      animation: logoAnimation 4s linear infinite;\n      width: 100px;\n      height: auto;\n      align-self: center;\n    }\n\n    .loader path:nth-child(3) {\n      transform-origin: center;\n      position: relative;\n    }\n\n    .loader path:nth-child(1) {\n      transform-origin: center;\n      position: relative;\n      animation: box1Animation 4s linear infinite;\n      transform: scale(0.4) translateX(6px);\n    }\n\n    .loader path:nth-child(2) {\n      transform-origin: center;\n      position: relative;\n      animation: box4Animation 4s linear infinite;\n      transform: scale(0.4) translateX(-6px);\n    }\n\n    @keyframes logoAnimation {\n      10% {\n        transform: rotate(180deg);\n      }\n      30%{\n        transform: rotate(360deg);\n      }\n      70% {\n        transform: rotate(360deg);\n      }\n      90% {\n        transform: rotate(520deg);\n      }\n      100% {\n        transform: rotate(720deg);\n      }\n    }\n\n    @keyframes box1Animation {\n      0%, 10% {\n        transform: scale(0.4) translateX(6px);\n      }\n      30%, 70% {\n        transform: scale(1) translateX(0);\n      }\n      90% {\n        transform: scale(0.4) translateX(6px);\n      }\n    }\n\n\n    @keyframes box4Animation {\n      0%, 10% {\n        transform: scale(0.4) translateX(-6px);\n      }\n      30%, 70% {\n        transform: scale(1) translateX(0);\n      }\n      90% {\n        transform: scale(0.4) translateX(-6px);\n      }\n    }\n\n    .iframe {\n      border: none;\n      user-select: none;\n      visibility: hidden;\n      position: absolute;\n    }\n\n    .iframe.visible {\n      visibility: visible;\n      position: unset;\n    }\n\n    .close-modal {\n      font-family: 'Poppins', sans-serif;\n      width: 678px;\n      height: 276px;\n      position: absolute;\n      left: 50%;\n      top: 50%;\n      transform: translate(-50%, -50%);\n      z-index: 9999;\n      box-shadow: 0px 54px 200px rgba(36, 37, 57, 0.2);\n      display: flex;\n      flex-flow: column nowrap;\n      justify-content: flex-start;\n      align-items: center;\n      padding: 35px;\n      border-radius: 8px;\n      background: #fff;\n\n      box-sizing: border-box;\n    }\n\n    .close-modal * {\n      box-sizing: border-box;\n    }\n\n    .close-modal__text {\n      margin: 40px auto 30px;\n      font-weight: 600;\n      font-size: 24px;\n      line-height: 36px;\n      text-align: center;\n\n      color: #242539;\n    }\n\n    .close-modal__button-container {\n      width: 318px;\n      display: flex;\n      flex-flow: row nowrap;\n      justify-content: space-between;\n      align-items: center;\n    }\n\n    .close-modal__button {\n      background: #fff;\n      border: 2px solid #EDEEF3;\n      border-radius: 74px;\n      width: 152px;\n      height: 56px;\n      cursor: pointer;\n      font-weight: 600;\n      font-size: 14px;\n      line-height: 21px;\n      color: #2B2D56;\n      text-transform: uppercase;\n    }\n\n    .close-modal__button--exit {\n      background: #DD3E56;\n      box-shadow: 0px 8px 34px rgba(221, 62, 86, 0.4);\n      color: #fff;\n      border-color: transparent;\n    }\n  ";
        return styles;
    }

    var RampInstantSDK = /** @class */ (function () {
        function RampInstantSDK(config) {
            this._listeners = initEventListenersDict();
            this._isVisible = false;
            this._isPollingForSwapStatus = false;
            this._purchasePollingCredentials = null;
            importFonts();
            this.unsubscribe = this.unsubscribe.bind(this);
            this.on = this.on.bind(this);
            this.show = this.show.bind(this);
            this._handleEscapeClick = this._handleEscapeClick.bind(this);
            this._dispatchEvent = this._dispatchEvent.bind(this);
            this._subscribeToWidgetEvents = this._subscribeToWidgetEvents.bind(this);
            this._on = this._on.bind(this);
            this._processPurchasePollingLoop = this._processPurchasePollingLoop.bind(this);
            this._registerSdkEventHandlers = this._registerSdkEventHandlers.bind(this);
            this._runPostSubscribeHooks = this._runPostSubscribeHooks.bind(this);
            this._subscribeToWidgetEvents = this._subscribeToWidgetEvents.bind(this);
            this._rawNormalizedConfig = normalizeConfigAndLogErrorsOnInvalidFields(__assign({ variant: 'desktop' }, config));
            var widgetVariant = determineWidgetVariant(this._rawNormalizedConfig);
            this._config = __assign(__assign({}, this._rawNormalizedConfig), { variant: widgetVariant, widgetInstanceId: getRandomIntString() });
        }
        RampInstantSDK.prototype.show = function () {
            if (this._isVisible) {
                throw new Error('Widget is already visible - you can only call this once per instance');
            }
            if (document.activeElement && isHtmlElement(document.activeElement)) {
                document.activeElement.blur();
            }
            this._registerSdkEventHandlers();
            window.addEventListener('message', this._subscribeToWidgetEvents);
            if (this._isConfiguredAsHosted()) {
                this._showUsingHostedMode();
            }
            else if (this._isConfiguredAsEmbedded()) {
                this._showUsingEmbeddedMode();
            }
            else if (this._isConfiguredWithOverlay()) {
                this._showUsingOverlayMode();
            }
            window.addEventListener('keydown', this._handleEscapeClick, true);
            return this;
        };
        RampInstantSDK.prototype.on = function (type, callback) {
            this._on(type, callback, false);
            return this;
        };
        RampInstantSDK.prototype.unsubscribe = function (type, callback) {
            var _this = this;
            if (type === '*') {
                var allTypes = Object.entries(this._listeners);
                allTypes.forEach(function (_a) {
                    var key = _a[0], eventHandlers = _a[1];
                    var filteredHandlers = eventHandlers.filter(function (l) { return l.callback !== callback; });
                    _this._listeners[key] = filteredHandlers;
                });
            }
            else {
                this._listeners[type] = this._listeners[type].filter(function (l) { return l.callback !== callback; });
            }
            return this;
        };
        RampInstantSDK.prototype._on = function (type, callback, internal) {
            if (type !== '*' && !this._listeners[type]) {
                // tslint:disable-next-line:no-console
                console.warn("Unknown / unsupported event name - '" + type + "'. This listener will have no effect.");
            }
            if (type === '*') {
                var allTypes = Object.values(this._listeners);
                allTypes.forEach(function (eventHandlers) { return eventHandlers.push({ callback: callback, internal: internal }); });
            }
            else {
                this._listeners[type].push({ callback: callback, internal: internal });
            }
            this._runPostSubscribeHooks(type, internal);
        };
        RampInstantSDK.prototype._subscribeToWidgetEvents = function (event) {
            if (!event.data) {
                return;
            }
            if (!areUrlsEqual(event.origin, this._config.url || baseWidgetUrl)) {
                return;
            }
            var eventData = event.data;
            if (!eventData.widgetInstanceId ||
                eventData.widgetInstanceId !== this._config.widgetInstanceId) {
                return;
            }
            this._dispatchEvent(eventData);
        };
        RampInstantSDK.prototype._registerSdkEventHandlers = function () {
            var _this = this;
            this._on(exports.RampInstantEventTypes.WIDGET_CLOSE, function (_event) {
                var _a, _b;
                if (_this._isConfiguredAsHosted()) {
                    try {
                        (_a = _this.widgetWindow) === null || _a === void 0 ? void 0 : _a.close();
                    }
                    catch (e) {
                        throw new Error('Could not close the widget window');
                    }
                }
                else {
                    (_b = _this.domNodes) === null || _b === void 0 ? void 0 : _b.shadowHost.remove();
                    bodyScrollLock.clearAllBodyScrollLocks();
                }
                _this._teardownEventSubscriptions();
            }, true);
            var onConfigEvent = function () {
                var _a, _b;
                if (_this._isConfiguredAsHosted()) {
                    return;
                }
                (_a = _this.domNodes) === null || _a === void 0 ? void 0 : _a.iframe.classList.add('visible');
                var loader = (_b = _this.domNodes) === null || _b === void 0 ? void 0 : _b.shadow.querySelector('.loader-container');
                if (loader) {
                    loader.remove();
                }
            };
            this._on(exports.RampInstantEventTypes.WIDGET_CONFIG_DONE, onConfigEvent, true);
            this._on(exports.RampInstantEventTypes.WIDGET_CONFIG_FAILED, onConfigEvent, true);
            this._on(InternalEventTypes.WIDGET_CLOSE_REQUEST, function (_event) {
                if (_this._isConfiguredAsHosted() || _this._isConfiguredAsEmbedded()) {
                    return;
                }
                if (_this._config.variant === 'mobile' || isCloseModalAlreadyOpen(_this.domNodes.overlay)) {
                    return;
                }
                _this.domNodes.overlay.appendChild(prepareCloseModalNode(_this._dispatchEvent));
            }, true);
            this._on(InternalEventTypes.WIDGET_CLOSE_REQUEST_CONFIRMED, function (_event) {
                _this._dispatchEvent({
                    type: exports.RampInstantEventTypes.WIDGET_CLOSE,
                    payload: null,
                    widgetInstanceId: _this._config.widgetInstanceId,
                });
            }, true);
            this._on(InternalEventTypes.WIDGET_CLOSE_REQUEST_CANCELLED, function (_event) {
                if (_this._isConfiguredAsHosted() || _this._isConfiguredAsEmbedded()) {
                    return;
                }
                var modal = _this.domNodes.overlay.querySelector('.close-modal');
                if (modal) {
                    modal.remove();
                }
            }, true);
            this._on(exports.RampInstantEventTypes.PURCHASE_CREATED, function (event) {
                _this._purchasePollingCredentials = {
                    apiUrl: event.payload.apiUrl,
                    purchaseExternalId: event.payload.purchase.id,
                    token: event.payload.purchaseViewToken,
                };
                // tslint:disable-next-line:no-floating-promises
                _this._processPurchasePollingLoop(_this._purchasePollingCredentials);
            }, true);
        };
        RampInstantSDK.prototype._dispatchEvent = function (event) {
            var type = event.type;
            this._listeners[type].forEach(function (handler) { return handler.callback(event); });
        };
        RampInstantSDK.prototype._handleEscapeClick = function (event) {
            var escKeyCode = 27;
            if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === escKeyCode) {
                this._dispatchEvent({
                    type: InternalEventTypes.WIDGET_CLOSE_REQUEST,
                    payload: null,
                    internal: true,
                });
            }
        };
        // Event subscriptions aren't cleared so that host can receive a PAYMENT_SUCCESSFUL event
        // even after the widget has been closed
        RampInstantSDK.prototype._teardownEventSubscriptions = function () {
            window.removeEventListener('keydown', this._handleEscapeClick, true);
            window.removeEventListener('message', this._subscribeToWidgetEvents);
        };
        RampInstantSDK.prototype._processPurchasePollingLoop = function (_a) {
            var apiUrl = _a.apiUrl, purchaseExternalId = _a.purchaseExternalId, token = _a.token;
            return __awaiter(this, void 0, void 0, function () {
                var purchase;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this._isPollingForSwapStatus = true;
                            _b.label = 1;
                        case 1:
                            if (!(countListenersForEvent(this._listeners, exports.RampInstantEventTypes.PURCHASE_SUCCESSFUL) > 0 ||
                                countListenersForEvent(this._listeners, exports.RampInstantEventTypes.PURCHASE_FAILED) > 0)) return [3 /*break*/, 4];
                            // tslint:disable-next-line:no-magic-numbers
                            return [4 /*yield*/, delay(1000)];
                        case 2:
                            // tslint:disable-next-line:no-magic-numbers
                            _b.sent();
                            return [4 /*yield*/, doFetchPurchase(apiUrl, purchaseExternalId, token)];
                        case 3:
                            purchase = _b.sent();
                            if (!purchase) {
                                return [3 /*break*/, 1];
                            }
                            if (purchase.actions.find(function (action) { return action.newStatus === 'RELEASED'; })) {
                                this._dispatchEvent({
                                    type: exports.RampInstantEventTypes.PURCHASE_SUCCESSFUL,
                                    payload: {
                                        purchase: purchase,
                                    },
                                    widgetInstanceId: this._config.widgetInstanceId,
                                });
                                return [2 /*return*/];
                            }
                            if (purchase.actions.find(function (action) { return action.newStatus === 'ERROR'; })) {
                                this._dispatchEvent({
                                    type: exports.RampInstantEventTypes.PURCHASE_FAILED,
                                    payload: null,
                                    widgetInstanceId: this._config.widgetInstanceId,
                                });
                                return [2 /*return*/];
                            }
                            return [3 /*break*/, 1];
                        case 4:
                            this._isPollingForSwapStatus = false;
                            return [2 /*return*/];
                    }
                });
            });
        };
        RampInstantSDK.prototype._runPostSubscribeHooks = function (eventType, isHandlerInternal) {
            /*
             *  Handles a case where a host subscribes to these events after
             *  the `PURCHASE_CREATED` event is fired
             */
            if ((eventType === '*' ||
                eventType === exports.RampInstantEventTypes.PURCHASE_SUCCESSFUL ||
                exports.RampInstantEventTypes.PURCHASE_FAILED) &&
                this._purchasePollingCredentials &&
                !this._isPollingForSwapStatus) {
                // tslint:disable-next-line:no-floating-promises
                this._processPurchasePollingLoop(this._purchasePollingCredentials);
            }
        };
        RampInstantSDK.prototype._showUsingEmbeddedMode = function () {
            var _a, _b;
            var widgetUrl = initWidgetIframeUrl(this._config);
            this.domNodes = initDOMNodeWithoutOverlay(widgetUrl, this._dispatchEvent, this._config);
            if (!((_a = this.domNodes) === null || _a === void 0 ? void 0 : _a.body)) {
                throw new Error("Couldn't find <body> element.");
            }
            (_b = this._config.containerNode) === null || _b === void 0 ? void 0 : _b.appendChild(this.domNodes.shadowHost);
            this._isVisible = true;
        };
        RampInstantSDK.prototype._showUsingOverlayMode = function () {
            var _a;
            var widgetUrl = initWidgetIframeUrl(this._config);
            this.domNodes = initDOMNodeWithOverlay(widgetUrl, this._dispatchEvent, this._config);
            if (!((_a = this.domNodes) === null || _a === void 0 ? void 0 : _a.body)) {
                throw new Error("Couldn't find <body> element.");
            }
            this.domNodes.body.appendChild(this.domNodes.shadowHost);
            this._isVisible = true;
            bodyScrollLock.disableBodyScroll(this.domNodes.iframe);
        };
        RampInstantSDK.prototype._showUsingHostedMode = function () {
            var _a;
            var widgetUrl = initWidgetIframeUrl(this._config);
            this.widgetWindow = (_a = window.open(widgetUrl), (_a !== null && _a !== void 0 ? _a : undefined));
        };
        RampInstantSDK.prototype._isConfiguredWithOverlay = function () {
            return ['desktop', 'mobile'].includes(this._config.variant);
        };
        RampInstantSDK.prototype._isConfiguredAsHosted = function () {
            return ['hosted-desktop', 'hosted-mobile'].includes(this._config.variant);
        };
        RampInstantSDK.prototype._isConfiguredAsEmbedded = function () {
            return ['embedded-desktop', 'embedded-mobile'].includes(this._rawNormalizedConfig.variant);
        };
        return RampInstantSDK;
    }());

    exports.RampInstantSDK = RampInstantSDK;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ramp-instant-sdk.umd.js.map
