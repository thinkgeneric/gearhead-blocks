import classnames from 'classnames';

// Import CSS
import './styles/style.scss';
import './styles/editor.scss';
import Cover from './components/cover';

// Extend component
const { Component, Fragment } = wp.element;

const { 
  IconButton,
  Toolbar,
  SVG,
  Path,
  PanelBody,
  RangeControl,
  withNotices,
} = wp.components;

const {
  BlockControls,
  InspectorControls,
  BlockAlignmentToolbar,
  MediaPlaceholder,
  MediaUpload,
  MediaUploadCheck,
  AlignmentToolbar,
  RichText,
  withColors,
  PanelColorSettings,
  getColorClassName,
} = wp.editor;

const { compose } = wp.compose;

// Register Block
const { registerBlockType } = wp.blocks;

const blockAttributes = {
  title: {
    type: 'string',
    source: 'html',
    selector: 'h3',
  },
  dimRatio: {
		type: 'number',
		default: 50,
	},
  url: {
    type: 'string',
  },
  id: {
    type: 'number',
  },
  coverBackgroundColor: {
    type: 'string',
  },
  backgroundColor: {
		type: 'string',
	},
	customOverlayColor: {
		type: 'string',
	},
  dimRatio: {
    type: 'number',
    default: 50,
  },
  align: {
    type: 'string',
    default: 'full',
	},
	contentAlign: {
		type: 'string',
		default: 'center',
	},
  backgroundType: {
		type: 'string',
		default: 'image',
  },
  description: {
    type: 'string',
  }
}

const ALLOWED_MEDIA_TYPES = [ 'image' ];
const IMAGE_BACKGROUND_TYPE = 'image';


class GHCoverBlock extends Component {

  render() {
    const {
      attributes: {
        align,
        backgroundType,
        contentAlign,
        dimRatio,
        id,
        title,
        description,
        url,
      },
      backgroundColor,
      setBackgroundColor,
      noticeUI,
      attributes,
      editable,
      className,
      setAttributes,
      isSelected
    } = this.props;

    const onSelectMedia = ( media ) => {
      if ( ! media || ! media.url ) {
        setAttributes( { url: undefined, id: undefined } );
        return;
      }
      let mediaType;
      if (media.mediaType) {
        if (media.media_type === IMAGE_BACKGROUND_TYPE) {
          mediaType = IMAGE_BACKGROUND_TYPE;
        }
      } else {
        if (media.type !== IMAGE_BACKGROUND_TYPE) {
          return;
        }
        mediaType = media.type;
      }

      setAttributes( {
        url: media.url,
        id: media.id,
        backgroundType: mediaType,
      });

      console.log(media);
    };

    const setDimRatio = ( ratio ) => setAttributes( { dimRatio: ratio } );
    const setTitle = title => setAttributes( { title } );
    const setDescription = description => setAttributes( { description } );
    
    const style = {
      backgroundColor: backgroundColor.color,
    };

    const controls = (
      <Fragment>
					<BlockControls>
						{ !! url && (
							<Fragment>
								<AlignmentToolbar
									value={ contentAlign }
									onChange={ ( nextAlign ) => {
										setAttributes( { contentAlign: nextAlign } );
									} }
								/>
								<MediaUploadCheck>
									<Toolbar>
										<MediaUpload
											onSelect={ onSelectMedia }
											allowedTypes={ ALLOWED_MEDIA_TYPES }
											value={ id }
											render={ ( { open } ) => (
												<IconButton
													className="components-toolbar__control"
													label={ 'Edit media' }
													icon="edit"
													onClick={ open }
												/>
											) }
										/>
									</Toolbar>
								</MediaUploadCheck>
							</Fragment>
						) }
					</BlockControls>
					{ !! url && (
						<InspectorControls>
							<PanelBody title={ 'Cover Settings' }>
								<PanelColorSettings
									title={ 'Overlay' }
									initialOpen={ true }
									colorSettings={ [ {
										value: backgroundColor.color,
										onChange: setBackgroundColor,
										label: 'Overlay Color',
									} ] }
								>
									<RangeControl
										label={ 'Background Opacity' }
										value={ dimRatio }
										onChange={ setDimRatio }
										min={ 0 }
										max={ 100 }
										step={ 10 }
									/>
								</PanelColorSettings>
							</PanelBody>
						</InspectorControls>
					) }
				</Fragment>
    );

    if ( ! url ) {
      const hasTitle = ! RichText.isEmpty( title );
      const icon = hasTitle ? undefined : 'format-image';
      const label = hasTitle ? (
        <RichText
          tagName='h2'
          value={ title }
          onChange={ setTitle }
          inlineToolbar
        />
      ) : 'Cover';

      return (
        <Fragment>
          { controls }
          <MediaPlaceholder
            icon={ icon }
            className={ className }
            labels={ {
              title: label,
              instructions: 'Drag an image upload a new one or select a file.',
            } }
            onSelect={ onSelectMedia }
            accept="image/*,video/*"
            allowedTypes={ ALLOWED_MEDIA_TYPES }
          />
        </Fragment>
      );
    }
    const backgroundColorClass = getColorClassName( 'background-color', backgroundColor );
    const classes = classnames(
      className,
      backgroundColorClass,
      contentAlign !== 'center' && `has-${ contentAlign }-content`,
      'cover',
      'js-cover',
    );

    return (
      <Fragment>
        { controls }
        <div className={ classes } style={ style } >
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
          { ( ! RichText.isEmpty( title ) || isSelected ) && (
							<RichText
								tagName="h3"
								className="wp-block-cover-text cover__title"
								placeholder={ 'Write title…' }
								value={ title }
								onChange={ setTitle }
								inlineToolbar
							/>
						) }
           <div className='cover__description_box'>
           { ( ! RichText.isEmpty( description ) || isSelected ) && (
							<RichText
								tagName="spane"
								className="wp-block-cover-text cover__description_text"
								placeholder={ 'Write descrription…' }
								value={ description }
								onChange={ setDescription }
								inlineToolbar
							/>
						) }
           </div>
        </div>
      </div>
      </div>
      </Fragment>
    );
  } 

}

registerBlockType( 'gearhead-blocks/gh-cover', {
  title: "Gearhead Cover",
  description: "Add a cover element that features a splash image and some headline text.",
  icon: <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><Path d="M4 4h7V2H4c-1.1 0-2 .9-2 2v7h2V4zm6 9l-4 5h12l-3-4-2.03 2.71L10 13zm7-4.5c0-.83-.67-1.5-1.5-1.5S14 7.67 14 8.5s.67 1.5 1.5 1.5S17 9.33 17 8.5zM20 2h-7v2h7v7h2V4c0-1.1-.9-2-2-2zm0 18h-7v2h7c1.1 0 2-.9 2-2v-7h-2v7zM4 13H2v7c0 1.1.9 2 2 2h7v-2H4v-7z" /><Path d="M0 0h24v24H0z" fill="none" /></SVG>,
  category: 'gearhead-blocks',
  supports: {
		align: true,
	},
  keywords: [
    'cover',
    'gearhead',
    'hero',
  ],

  attributes: blockAttributes,

  getEditWrapperProps( { containerWidth } ) {
		if ( 'left' === containerWidth || 'right' === containerWidth || 'full' === containerWidth ) {
			return { 'data-align': containerWidth };
		}
  },
  
  // Render the block components
  edit: compose([
    withColors( { backgroundColor: 'background-color' } ),
    withNotices,
  ])(GHCoverBlock),

  // Save the attributes and markup
  save: function( props ) {

    // Setup the attributes
    return (
      <Cover { ...props } />
    );
  }
});

function dimRatioToClass( ratio ) {
	return ( ratio === 0 || ratio === 50 ) ?
		null :
		'has-background-dim-' + ( 10 * Math.round( ratio / 10 ) );
}

function backgroundImageStyles( url ) {
	return url ?
		{ backgroundImage: `url(${ url })` } :
		{};
}