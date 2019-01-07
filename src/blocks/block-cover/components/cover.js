const { Component } = wp.element;

const { RichText, getColorClassName } = wp.editor;

import classnames from 'classnames';

export default class Cover extends Component {
  constructor( props ) {
    super( ...arguments );
  }

  render() {

    const { attributes: { contentAlign, url, title, dimRatio, backgroundColor, description } } = this.props;

    console.log(this.props);

    const backgroundColorClass = getColorClassName( 'background-color', backgroundColor );

    const classes = classnames(
      this.props.className,
      'cover',
      'js-cover',
      backgroundColorClass,
      {
        [ `has-${ contentAlign }-content` ]: contentAlign !== 'center',  
      }
    );

    const style = {};

    return (
      <div className={ classes} style={ style } >
        <div className='container cover__container'>
        { !! url && (
          <div className='cover__image_box'>
            <img 
              className={ classnames(
                'cover__image',
                dimRatioToClass( dimRatio ),
                {
                  'has-background-dim': dimRatio !== 0,
                }
              ) }
              src={ url }
            />
          </div>
        ) }
        <div className='cover__text_box'>
           { ! RichText.isEmpty( title ) && (
             <RichText.Content tagName="h3" className="wp-block-cover-text cover__title" value={ title } />
           ) }
           <div className='cover__description_box'>
            { ! RichText.isEmpty( description ) && (
              <RichText.Content tagName="spane" className="wp-block-cover-text cover__description_text" value={ description } />
            ) }
           </div>
        </div>
      </div>
      </div>
    );
  }
}
 // todo expor tthis to utilities
function dimRatioToClass( ratio ) {
	return ( ratio === 0 || ratio === 50 ) ?
		null :
		'has-background-dim-' + ( 10 * Math.round( ratio / 10 ) );
}