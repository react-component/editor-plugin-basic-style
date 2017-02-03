import * as React from 'react';
import classnames from 'classnames';
import ColorPicker from 'rc-color-picker';
import { Entity, DraftInlineStyle } from 'draft-js';
import { noop, getApplyFontStyleFunc } from '../utils';
import  editorUtils from 'rc-editor-utils';
import { OrderedSet } from 'immutable';
const { getCurrentInlineStyle, getCurrentEntity } = editorUtils;
import ColorPickerBtn from './ColorPickerBtn';

import 'rc-color-picker/assets/index.css';

const defaultFontColor = '000';
const PREFIX = 'FONTCOLOR_';
const fontColor = {
  constructor(config) {
    const callbacks = {
      getEditorState: noop,
      setEditorState: noop,
    };

    const applyStyle = getApplyFontStyleFunc(PREFIX, callbacks);

    function changeSelect({ color }) {
      const colorString = color.substring(1);
      applyStyle(`${PREFIX}${colorString}`);
    }
    function customStyleFn(styleSet: DraftInlineStyle) {
       return styleSet.map(style => {
        if (style.indexOf(PREFIX) !== -1) {
          const color = '#' + style.substring(PREFIX.length);
          return {
            color,
          }
        }
        return {};
      }).reduce( (prev, curr) => Object.assign(prev, curr));
    }
    return {
      name: 'fontColor',
      callbacks,
      customStyleFn,
      component: (props) => {
        const editorState = callbacks.getEditorState();
        const currentStyle = getCurrentInlineStyle(editorState);
        const currentFontColor = currentStyle && currentStyle.find( item => item.indexOf(`${PREFIX}`) !== -1);
        const fontColor = currentFontColor ? currentFontColor.substring(PREFIX.length) : defaultFontColor;
        return (
        <ColorPicker
          defaultColor={`#${defaultFontColor}`}
          animation="slide-up"
          color={`#${fontColor}`}
          onChange={changeSelect}
        >
          <ColorPickerBtn />
        </ColorPicker>);
      }
    }
  }
}

export default fontColor;
