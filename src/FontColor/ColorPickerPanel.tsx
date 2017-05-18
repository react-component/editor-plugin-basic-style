import React  from 'react';
import ReactDOM from 'react-dom';
import Trigger from 'rc-trigger';
import placements from './placements';

const ColorSet = (
  `ffffff,000000,eeece1,1f497d,4f81bd,c0504d,9bbb59,8064a2,4bacc6,f79646,
  'f2f2f2,7f7f7f,ddd9c3,c6d9f0,dbe5f1,f2dcdb,ebf1dd,e5e0ec,dbeef3,fdeada,
  'd8d8d8,595959,c4bd97,8db3e2,b8cce4,e5b9b7,d7e3bc,ccc1d9,b7dde8,fbd5b5,
  'bfbfbf,3f3f3f,938953,548dd4,95b3d7,d99694,c3d69b,b2a2c7,92cddc,fac08f,
  'a5a5a5,262626,494429,17365d,366092,953734,76923c,5f497a,31859b,e36c09,
  '7f7f7f,0c0c0c,1d1b10,0f243e,244061,632423,4f6128,3f3151,205867,974806,
  'c00000,ff0000,ffc000,ffff00,92d050,00b050,00b0f0,0070c0,002060,7030a0,`).split(',');

function noop () {}
function newArray(length, iterator) {
  if (Array.prototype.fill) {
    return new Array(length).fill(0).map(iterator);
  }
  return (new Array(length).join('').split('')).map(iterator);
}

export default class ColorPickerPanel extends React.Component<any, any> {
  private pickerPanelInstance: Element;
  private triggerInstance: Element;
  private _pickerElement: React.ReactElement<any>;
  private _canvas: any = {};

  static defaultProps = {
    defaultColor: '#F00',
    defaultAlpha: 100,
    onChange: noop,
    onOpen: noop,
    onClose: noop,
    prefixCls: 'rc-editor',
    children: <span className="rc-color-picker-trigger"/>,
    placement: 'topLeft',
    style: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      currentColor: this.getDefaultColor(props),
      open: false,
    };
    this._canvas = {};
  }

  fillCanvasColor = () => {
    for (const color in this._canvas) {
      if (this._canvas.hasOwnProperty(color)) {
        const canvas = this._canvas[color] as HTMLCanvasElement;
        if (canvas && !canvas.getAttribute('filled')) {
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = color;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          this._canvas[color].setAttribute('filled', true);
        }
      }
    }
  }

  getDefaultColor(props = this.props) {
    return props.defaultColor || '#000';
  }

  reset = () => {
    this.pickColor(this.getDefaultColor(), true);
  }

  pickColor(currentColor, closeModal = false) {
    this.props.onChange ? this.props.onChange({ color: currentColor }) : null;
    this.setState({
      currentColor,
      open: closeModal ? false : this.state.open,
    });
  }

  onVisibleChange = (open) => {
    this.setState({ open }, () => {
      if (open) {
        this.fillCanvasColor();
        ReactDOM.findDOMNode(this.pickerPanelInstance).focus();
      }
    })
  }

  renderColorPickerCell = (color, idx, text = '', ele = 'li') => {
    const Ele = ele;
    return <Ele className={`${this.props.prefixCls}-color-picker-cell`} key={idx}>
      <a tabIndex={0} onMouseDown={(e) => { this.pickColor(color, true); e.preventDefault(); }}>
        <canvas className={`${this.props.prefixCls}-color-picker-celldiv`} ref={(ele) => this._canvas[color] = ele}></canvas>
        {text}
      </a>
    </Ele>
  }

  getPickerElement() {
    if (!this._pickerElement) {
      this._pickerElement = <div className={`${this.props.prefixCls}-color-picker-panel`} ref={(ele) => this.pickerPanelInstance = ele}>
        <div className={`${this.props.prefixCls}-color-picker-color-auto`} onMouseDown={this.reset} >
          <ul>{this.renderColorPickerCell('#000', 0, '自动')}</ul>
        </div>
        <div className={`${this.props.prefixCls}-color-picker-first-row`}>
          <ul>{newArray(10, (_, idx) => this.renderColorPickerCell(`#${ColorSet[idx]}`, idx + 1))}</ul>
        </div>
        <table>
          <tbody>
          {newArray(5, (_, row) =>
            <tr className={`${this.props.prefixCls}-color-picker-compactrow`} key={row}>
              {newArray(10, (_, idx) => this.renderColorPickerCell(`#${ColorSet[idx + (row + 1) * 10]}`, (row * 10 ) + idx + 1, null,  'td'))}
            </tr>)
          }
          </tbody>
        </table>
        <span>标准颜色</span>
        <div className={`${this.props.prefixCls}-color-picker-last-row`}>
          <ul>{newArray(10, (_, idx) => this.renderColorPickerCell(`#${ColorSet[idx + 60]}`, idx + 1))}</ul>
        </div>
      </div>;
    }
    return this._pickerElement;
  }

  render() {
    const {
      prefixCls,
      placement,
      style,
      getCalendarContainer,
      align,
      animation,
      disabled,
      transitionName,
    } = this.props;
    let children = this.props.children;

    if (children) {
      children = React.cloneElement(children, {
        ref: ele => this.triggerInstance = ele,
        unselectable: true,
      });
    }

    return <Trigger
          popup={this.getPickerElement()}
          popupAlign={align}
          builtinPlacements={placements}
          popupPlacement={placement}
          action={disabled ? [] : ['click']}
          destroyPopupOnHide
          getPopupContainer={getCalendarContainer}
          popupStyle={style}
          popupAnimation={animation}
          popupTransitionName={transitionName}
          popupVisible={this.state.open}
          onPopupVisibleChange={this.onVisibleChange}
          prefixCls={`${prefixCls}-color-picker`}
        >
          {children}
        </Trigger>
  }
}
