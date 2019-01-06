const {Component} = wp.element;

import classnames from 'classnames';

export default class Container extends Component {

  constructor(props) {
    super(...arguments);
  }

  render() {
    const {
      attributes: {
        containerBackgroundColor,
        containerAlignment,
        containerPaddingTop,
        containerPaddingRight,
        containerPaddingBottom,
        containerPaddingLeft,
        containerMarginTop,
        containerMarginRight,
        containerMarginLeft,
        containerMarginBottom,
        containerWidth,
        containerMaxWidth
      }
    } = this.props;

    return (
      <div
        style={{
          backgroundColor: containerBackgroundColor,
          textAlign: containerAlignment,
          paddingLeft: containerPaddingLeft,
          paddingRight: containerPaddingRight,
          paddingTop: containerPaddingTop,
          paddingBottom: containerPaddingBottom,
          marginTop: containerMarginTop,
          marginRight: containerMarginRight,
          marginLeft: containerMarginLeft,
          marginBottom: containerMarginBottom,
        }}
        className={classnames(this.props.className, `align${containerWidth}`, 'gh-container')}
      >{this.props.children}</div>
    );
  }
}
