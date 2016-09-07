import * as React from 'react';
import RcSelect from 'rc-select';
import { Entity } from 'draft-js';
import { noop, getToggleFontStyleFunc } from '../utils';
import  editorUtils from 'rc-editor-utils';
const { getCurrentInlineStyle, getCurrentEntity } = editorUtils;

declare module 'rc-select' {
  interface Option {};
}
const Option = RcSelect.Option;

const colorArray = ['red', 'blue', 'green', 'yellow'];
const PREFIX = 'FONTCOLOR_';
const styleMap = {};
colorArray.forEach(color => {
  styleMap[`${PREFIX}_${color}`] = {
    color,
  };
});

const fontColor = {
  constructor() {
    const callbacks = {
      getEditorState: noop,
      setEditorState: noop,
    };

    const toggleStyle = getToggleFontStyleFunc(PREFIX, callbacks);

    function changeSelect(fontSize) {
      toggleStyle(`${PREFIX}_${fontSize}`);
    }

    return {
      name: 'fontColor',
      callbacks,
      styleMap,
      component: (props) => {
        const editorState = callbacks.getEditorState();
        const currentStyle = getCurrentInlineStyle(editorState);
        const currentFontSize = currentStyle.find( item => item.indexOf(`${PREFIX}_`) !== -1);
        const fontColor = currentFontSize ? currentFontSize.substring(PREFIX.length + 1) : '';
        const options = colorArray.map( item =>
          <Option key={item} value={item} style={{backgroundColor: item}}> </Option>
        );
        return <RcSelect onChange={changeSelect} style={{width: 80}} value={fontColor}>
          {options}
        </RcSelect>
      }
    }
  }
}

export default fontColor;
