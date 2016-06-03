// export this package's api

import { List } from 'immutable';

import Bold from './Bold';
import Italic from './Italic';
import Split from './Spilit';

const EditorPluginBasicStyle = List([
  Bold,
  Italic,
  Split
]);

export default EditorPluginBasicStyle;
