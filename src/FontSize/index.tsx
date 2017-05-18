import React  from 'react';
import RcSelect from 'rc-select';
import setImmediate from 'fbjs/lib/setImmediate';
import { Entity, DraftInlineStyle } from 'draft-js';
import { noop, getToggleFontStyleFunc } from '../utils';
import  editorUtils from 'rc-editor-utils';
const { getCurrentInlineStyle, getCurrentEntity } = editorUtils;

declare module 'rc-select' {
  interface Option {}
}

const Option = RcSelect.Option;

const sizeArray = [];

for (let i = 12; i < 24; i+=2) {
  sizeArray.push(i);
}
const PREFIX = 'FONTSIZE_';

function customStyleFn(styleSet: DraftInlineStyle) {
   return styleSet.map(style => {
     if (style.indexOf(PREFIX) !== -1) {
       const fontSize = Number(style.substring(PREFIX.length));
       return {
         fontSize,
       }
     }
     return {};
   }).reduce((prev, curr) => Object.assign(prev, curr));
}

const FontSize = {
  constructor(config) {
    const callbacks = {
      getEditorState: noop,
      setEditorState: noop,
      setInlineStyleOverride: noop,
    };

    const toggleStyle = getToggleFontStyleFunc(PREFIX, callbacks);

    function changeSelect({key}) {
      const applyStyle = () => toggleStyle(`${PREFIX}${key}`);
      if (callbacks.getEditorState().getSelection().isCollapsed()) {
        setImmediate(applyStyle);
      } else {
        applyStyle();
      }
    }

    return {
      name: 'fontSize',
      callbacks,
      customStyleFn,
      component: (props) => {
        const editorState = callbacks.getEditorState();
        const currentStyle = getCurrentInlineStyle(editorState);
        const currentFontSize = currentStyle && currentStyle.find( item => item.indexOf(`${PREFIX}`) !== -1);
        const fontSizeNumber = currentFontSize ? currentFontSize.substring(PREFIX.length) : 16;
        const options = sizeArray.map( item =>
          <Option key={item} value={item + ''} style={{fontSize: item}}>{item}px</Option>
        );
        const value = {
          key: fontSizeNumber + '',
          label: fontSizeNumber + 'px'
        };

        return <span onClick={(ev) => { ev.preventDefault(); ev.stopPropagation();}} >
            <RcSelect
            labelInValue
            prefixCls={`${config.prefixCls}-select`}
            onChange={changeSelect}
            style={{width: 80, marginRight: 6}}
            value={value}
          >
            {options}
          </RcSelect>
        </span>
      }
    }
  }
}

export default FontSize;
