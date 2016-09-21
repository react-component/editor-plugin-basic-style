// use jsx to render html, do not modify simple.html

import 'rc-editor-plugin-basic-style/assets/index.less';
import { EditorCore, Toolbar, GetHTML, toEditorState } from 'rc-editor-core';
import 'rc-editor-core/assets/index.css';
import EditorPluginBasicStyle from 'rc-editor-plugin-basic-style';
import React from 'react';
import ReactDOM from 'react-dom';
import 'rc-select/assets/index.css';

const plugins = [EditorPluginBasicStyle];
const toolbars = [['fontSize', '|',
  'fontColor',
  'bold', 'italic', 'underline', 'strikethrough', '|',
  'superscript', 'subscript', '|',
  'align-justify', 'align-left', 'align-right', 'align-middle']];

function onChange(editorState) {
  console.log(GetText(editorState));
}
const Editor = React.createClass({
  getInitialState() {
    return {
      html: '',
    };
  },
  onChange(editorState) {
    this.setState({
      html: GetHTML(editorState),
    });
  },
  render() {
    return (<div>
      <div dangerouslySetInnerHTML={{__html: this.state.html}}></div>
      <EditorCore
        ref="editor"
        plugins={plugins}
        pluginConfig={{prefixCls: 'rc'}}
        toolbars={toolbars}
        onChange={this.onChange}
        defaultValue={toEditorState('12312313123 [色眯眯] 123 13')}
      />
    </div>);
  }
})
ReactDOM.render(<Editor />, document.getElementById('__react-content'));

