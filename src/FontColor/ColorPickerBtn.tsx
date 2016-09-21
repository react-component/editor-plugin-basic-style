import * as React from 'react';

export default function ColorPickerBtn(props) {
  const _props = Object.assign({}, props, {style: {}});
  return (<span {..._props} className="editor-icon-wrapper" >
    <span className={props.classNames} />
    <span className="font-color-preview" style={props.style} />
  </span>);
}
