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

const sizeArray = [12, 14, 18, 24];
const PREFIX = 'FONTSIZE_';
const styleMap = {};
sizeArray.forEach(fontSize => {
  styleMap[`${PREFIX}_${fontSize}`] = {
    fontSize,
  };
});

const FontSize = {
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
      name: 'fontSize',
      callbacks,
      styleMap,
      component: (props) => {
        const editorState = callbacks.getEditorState();
        const currentStyle = getCurrentInlineStyle(editorState);
        const currentFontSize = currentStyle.find( item => item.indexOf(`${PREFIX}_`) !== -1);
        const fontSizeNumber = currentFontSize ? currentFontSize.substring(PREFIX.length + 1) : 16;
        const options = sizeArray.map( item =>
          <Option key={item} value={item} style={{fontSize: item}}>{item}px</Option>
        );
        return <RcSelect onChange={changeSelect} style={{width: 80}} value={Number(fontSizeNumber)}>
          {options}
        </RcSelect>
      }
    }
  }
}

export default FontSize;
