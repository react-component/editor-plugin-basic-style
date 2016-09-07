import * as React from 'react';
import classnames from 'classnames';
import { RichUtils, Entity } from 'draft-js';
import { noop, getToggleEntityFunc, findEntities, getCurrentEntity } from '../utils';

function exportFunction (content: string, entityData: Object = {}) {
  return `<sup>${content}</sup>`;
}

const SuperScript = {
  constructor: function(config = {}) {
    const callbacks = {
      getEditorState: noop,
      setEditorState: noop,
    };

    const toggleBlock = getToggleEntityFunc(callbacks);

    return {
      name: 'superscript',
      callbacks,
      decorators: [{
        strategy: findEntities('superscript'),
        component: (props) => <sup>{props.children}</sup>
      }],
      component: (props) => {
        const editorState = callbacks.getEditorState();
        const currentEntityKey = getCurrentEntity(editorState);
        const isSuperScript = currentEntityKey ? Entity.get(currentEntityKey).getType() === 'superscript' : false;
        
        const classNames = classnames({
          ['editor-icon']: true,
          ['editor-icon-superscript']: true,
          'active': isSuperScript
        });
        return <span onMouseDown={() => toggleBlock('superscript', { export: exportFunction })} className={classNames} />
      }
    }
  },
  config: {},
}

export default SuperScript;
