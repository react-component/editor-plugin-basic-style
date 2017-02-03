import * as React from 'react';
import classnames from 'classnames';

export default function ColorPickerBtn(props) {
  const _props = Object.assign({}, props, {style: {}});
  const classNames = classnames({
    ['editor-icon']: true,
    ['editor-icon-font-color']: true,
  });

  return (<span {..._props} className="editor-icon-wrapper" >
    <span className={classNames} />
    <span className="font-color-preview" style={props.style} />
  </span>);
}
