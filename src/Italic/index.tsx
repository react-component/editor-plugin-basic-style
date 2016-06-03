import * as React from 'react';
import * as classnames from 'classnames';
import { RichUtils } from 'draft-js';
function noop(args?: any): any {};

const ItalicStyle = {
  constructor: function(config = {}) {
    const callbacks = {
      getEditorState: noop,
      setEditorState: noop,
    };

    function toggleStyle(styleName : string) {
      const { getEditorState, setEditorState } = callbacks;
      setEditorState(RichUtils.toggleInlineStyle(
        getEditorState(),
        styleName
      ));
    }
    return {
      name: 'italic',
      callbacks,
      component: (props) => {
        const currentStyle = callbacks.getEditorState().getCurrentInlineStyle();
        console.log('>> currentStyle', currentStyle);
        const classNames = classnames({
          ['editor-icon']: true,
          ['editor-icon-italic']: true,
          'active': currentStyle.has('ITALIC')
        });
        return <span onMouseDown={() => toggleStyle('ITALIC')} className={classNames} />
      }
    }
  },
  config: {},
}

export default ItalicStyle;
