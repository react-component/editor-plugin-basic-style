// export this package's api

import { List } from 'immutable';
import { inlineStyleComponentFactory, blockStyleComponentFactory } from './utils';

import Split from './Spilit';
import SuperScript from './SuperScript';
import SubScript from './SubScript';
import FontSize from './FontSize';
import FontColor from './FontColor';

const Bold = inlineStyleComponentFactory('bold');
const Italic = inlineStyleComponentFactory('italic');
const Underline = inlineStyleComponentFactory('underline');
const StrikeThrough = inlineStyleComponentFactory('strikethrough');

const AlignLeft = blockStyleComponentFactory('align-left', { textAlign: 'left' });
const AlignRight = blockStyleComponentFactory('align-right', { textAlign: 'right'});
const AlignMiddle = blockStyleComponentFactory('align-middle', { textAlign: 'center' });
const AlignJustify = blockStyleComponentFactory('align-justify', { textAlign: 'justify' });

const EditorPluginBasicStyle = List([
  FontSize,
  FontColor,
  Bold,
  Italic,
  Split,
  Underline,
  StrikeThrough,
  SuperScript,
  SubScript,
  AlignLeft,
  AlignRight,
  AlignMiddle,
  AlignJustify,
]);
export default EditorPluginBasicStyle;
