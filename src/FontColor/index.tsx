import * as React from 'react';
import classnames from 'classnames';
import ColorPicker from 'rc-color-picker';
import { Entity, DraftInlineStyle } from 'draft-js';
import { noop, getApplyFontStyleFunc } from '../utils';
import  editorUtils from 'rc-editor-utils';
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
      }).reduce(Object.assign);
    }
    return {
      name: 'fontColor',
      callbacks,
      customStyleFn,
      component: (props) => {
        const editorState = callbacks.getEditorState();
        const currentStyle = getCurrentInlineStyle(editorState);
        const currentFontColor = currentStyle.find( item => item.indexOf(`${PREFIX}`) !== -1);
        const fontColor = currentFontColor ? currentFontColor.substring(PREFIX.length) : defaultFontColor;

        console.log('>> currentFontColor', fontColor);
        const classNames = classnames({
          ['editor-icon']: true,
          ['editor-icon-font-color']: true,
        });

        return (
        <ColorPicker
          defaultColor={`#${defaultFontColor}`}
          animation="slide-up"
          color={`#${fontColor}`}
          onChange={changeSelect}
        >
          <ColorPickerBtn classNames={classNames} />
        </ColorPicker>);
      }
    }
  }
}

export default fontColor;
