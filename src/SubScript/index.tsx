import * as React from 'react';
import classnames from 'classnames';
import { RichUtils, Entity } from 'draft-js';
import { noop, getToggleEntityFunc, findEntities, getCurrentEntity } from '../utils';

function exportFunction (content: string, entityData: Object = {}) {
  return `<sub>${content}</sub>`;
}

const SubScript = {
  constructor: function(config = {}) {
    const callbacks = {
      getEditorState: noop,
      setEditorState: noop,
    };

    const toggleBlock = getToggleEntityFunc(callbacks);

    return {
      name: 'subscript',
      callbacks,
      decorators: [{
        strategy: findEntities('subscript'),
        component: (props) => <sub>{props.children}</sub>
      }],
      component: (props) => {
        const editorState = callbacks.getEditorState();
        const currentEntityKey = getCurrentEntity(editorState);
        const isSuperScript = currentEntityKey ? Entity.get(currentEntityKey).getType() === 'subscript' : false;
        
        const classNames = classnames({
          ['editor-icon']: true,
          ['editor-icon-subscript']: true,
          'active': isSuperScript
        });
        return <span onMouseDown={() => toggleBlock('subscript', { export: exportFunction })} className={classNames} />
      }
    }
  },
  config: {},
}

export default SubScript;
