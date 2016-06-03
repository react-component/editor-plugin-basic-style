"use strict";
var React = require('react');
var classnames = require('classnames');
var draft_js_1 = require('draft-js');
function noop(args) { }
;
var ItalicStyle = {
    constructor: function (config) {
        if (config === void 0) { config = {}; }
        var callbacks = {
            getEditorState: noop,
            setEditorState: noop
        };
        function toggleStyle(styleName) {
            var getEditorState = callbacks.getEditorState, setEditorState = callbacks.setEditorState;
            setEditorState(draft_js_1.RichUtils.toggleInlineStyle(getEditorState(), styleName));
        }
        return {
            name: 'italic',
            callbacks: callbacks,
            component: function (props) {
                var currentStyle = callbacks.getEditorState().getCurrentInlineStyle();
                console.log('>> currentStyle', currentStyle);
                var classNames = classnames((_a = {},
                    _a['editor-icon'] = true,
                    _a['editor-icon-italic'] = true,
                    _a['active'] = currentStyle.has('ITALIC'),
                    _a
                ));
                return <span onMouseDown={function () { return toggleStyle('ITALIC'); }} className={classNames}/>;
                var _a;
            }
        };
    },
    config: {}
};
exports.__esModule = true;
exports["default"] = ItalicStyle;
//# sourceMappingURL=index.js.map