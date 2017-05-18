import React  from 'react';

function noop(args?: any): any {};

const Split = {
  constructor(config = {}) {
    const callbacks = {
      getEditorState: noop,
      setEditorState: noop,
    };

    return {
      name: '|',
      callbacks,
      component: <span className="editor-icon-split"/>,
    };
  },
  config: {},
};

export default Split;
