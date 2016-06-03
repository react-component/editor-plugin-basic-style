"use strict";
var React = require('react');
function noop(args) { }
;
var Split = {
    constructor: function (config) {
        if (config === void 0) { config = {}; }
        var callbacks = {
            getEditorState: noop,
            setEditorState: noop
        };
        return {
            name: '|',
            callbacks: callbacks,
            component: <span className="editor-icon-split"/>
        };
    },
    config: {}
};
exports.__esModule = true;
exports["default"] = Split;
//# sourceMappingURL=index.js.map