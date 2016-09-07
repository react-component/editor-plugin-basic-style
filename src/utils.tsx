import * as React from 'react';
import { Entity, RichUtils, Modifier, EditorState, ContentState, SelectionState, EntityInstance } from 'draft-js';
import classnames from 'classnames';
import {ContentBlock} from "draft-js";
import { getCurrentInlineStyle, replaceEntityData, getSelectedBlock, getToggleStyleFunc, getToggleBlockStyleFunc } from 'rc-editor-utils';

export function noop(args?: any): any {}

export function getToggleFontStyleFunc(prefix, callbacks) {
  return function toggleStyle(styleName: string) {
    const { getEditorState, setEditorState } = callbacks;
    let editorState = getEditorState();
    const currentStyle = getCurrentInlineStyle(editorState);

    currentStyle.forEach( style => {
      if (style.indexOf(`${prefix}_`) !== -1 && style !== styleName ) {
        editorState = RichUtils.toggleInlineStyle(editorState, style);
      }
    });
    editorState = RichUtils.toggleInlineStyle(editorState, styleName);

    setEditorState(editorState);
  }
}

export function findEntities(entityType: string) {
  return function findEntitiesFunc(contentBlock, callback) {
    contentBlock.findEntityRanges(
      (character) => {
        const entityKey = character.getEntity();
        return (
          entityKey !== null &&
          Entity.get(entityKey).getType() === entityType
        );
      },
      callback
    );
  }
}

export function getSelectionText(editorState, selection) {
  const anchorKey = selection.getAnchorKey();
  const currentContent = editorState.getCurrentContent();
  const currentBlock = currentContent.getBlockForKey(anchorKey);
  return currentBlock.getText();
}

export function getApplyEntityFunc(callbacks) {
  return function applyEntity(entityType: string, data: Object = {}, entityMode: string = 'MUTABLE') {
    const { getEditorState, setEditorState } = callbacks;
    const editorState = getEditorState();
    const selection = editorState.getSelection();
    const currentEntity = getCurrentEntity(editorState);

    const entityKey = Entity.create(entityType, entityMode, data);

    const replacedContent = Modifier.applyEntity(
      editorState.getCurrentContent(),
      selection,
      entityKey
    );
    return setEditorState(EditorState.push(editorState, replacedContent, 'toggle-block'));
  }
}

export function getToggleEntityFunc(callbacks) {
  return function toggleEntity(entityType: string, data: Object = {}, entityMode: string = 'MUTABLE') {
    const { getEditorState, setEditorState } = callbacks;
    const editorState = getEditorState();
    const selection = editorState.getSelection();
    let entityKey = null;
    const currentEntity = getCurrentEntity(editorState);
    if (!currentEntity || Entity.get(currentEntity).getType() !== entityType) {
      entityKey = Entity.create(entityType, entityMode, data);
    }
    const replacedContent = Modifier.applyEntity(
      editorState.getCurrentContent(),
      selection,
      entityKey
    );

    return setEditorState(EditorState.push(editorState, replacedContent, 'toggle-block'));
  }
}

export function getCurrentEntity(editorState: EditorState): string {
  let entity;
  const selection = editorState.getSelection();
  let start = selection.getStartOffset();
  let end = selection.getEndOffset();
  if (start === end && start === 0) {
    end = -1;
  } else if (start === end) {
    start = start - 1;
  }
  const block = getSelectedBlock(editorState);
  for (let i = start; i < end; i++) {
    const currentEntity = block.getEntityAt(i);
    if (!currentEntity) {
      entity = undefined;
      break;
    }
    if (i === start) {
      entity = currentEntity;
    } else {
      if (entity !== currentEntity) {
        entity = undefined;
        break;
      }
    }
  }
  return entity;
}

export function inlineStyleComponentFactory(name: string, style: Object = {}) {
  return {
    constructor() {
      const callbacks = {
        getEditorState: noop,
        setEditorState: noop,
      };
      const upperName = name.toUpperCase();
      const toggleStyle = getToggleStyleFunc(callbacks);
      return {
        name: name,
        callbacks,
        component: (props) => {
          const currentStyle = getCurrentInlineStyle(callbacks.getEditorState());
          const classNames = classnames({
            ['editor-icon']: true,
            [`editor-icon-${name}`]: true,
            'active': currentStyle.has(upperName)
          });
          return <span onMouseDown={() => toggleStyle(upperName)} className={classNames} />
        }
      }
    },
    config: {},
  }
}

export function blockStyleComponentFactory(name: string, style) {
  return {
    constructor() {
      const callbacks = {
        getEditorState: noop,
        setEditorState: noop,
      };
      const blockRenderMap = {
        [`${name}`]: {
          element: (props) => <div {...props} style={style} />,
          style,
        },
      };
      const toggleBlockStyle = getToggleBlockStyleFunc(callbacks);
      return {
        name,
        callbacks,
        blockRenderMap,
        component: (prop) => {
          const selectedBlock = getSelectedBlock(callbacks.getEditorState());
          const classNames = classnames({
            ['editor-icon']: true,
            [`editor-icon-${name}`]: true,
            'active': selectedBlock.getType() === name,
          });

          return <span onMouseDown={() => toggleBlockStyle(name)} className={classNames} />
        }
      };
    },
    config: {},
  }
}
