// Import dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import Container from './components/container';

import './styles/style.scss';
import './styles/editor.scss';

const { Component } = wp.element;

const { registerBlockType } = wp.blocks;

const {
  BlockControls,
  BlockAlignmentToolbar,
  InnerBlocks,
} = wp.editor;

const blockAttributes = {
  containerPaddingTop: {
    type: 'number',
    default: 0,
  },
  containerPaddingRight: {
    type: 'number',
    default: 0,
  },
  containerPaddingBottom: {
    type: 'number',
    default: 0,
  },
  containerPaddingLeft: {
    type: 'number',
    default: 0,
  },
  containerMarginTop: {
    type: 'number',
    default: 0,
  },
  containerMarginRight: {
    type: 'number',
    default: 0,
  },
  containerMarginBottom: {
    type: 'number',
    default: 0,
  },
  containerMarginLeft: {
    type: 'number',
    default: 0,
  },
  containerWidth: {
    type: 'string',
    default: 'center',
  },
  containerMaxWidth: {
    type: 'number',
    default: 1600,
  },
  containerBackgroundColor: {
    type: 'string',
    default: '#fff',
  },
  containerImageUrl: {
    type: 'string',
    source: 'attribute',
    attribute: 'src',
    selector: 'img',
  },
  containerImageId: {
    type: 'number',
  },
  containerImageAlt: {
    type: 'string',
    source: 'attribute',
    attribute: 'alt',
    selector: 'img',
  },
  containerDimRatio: {
    type: 'number',
    default: 50,
  },
};

class GearheadContainerBlock extends Component {
  render() {

    // Setup the attributes
    const {
      attributes: {
        containerPaddingTop,
        containerPaddingRight,
        containerPaddingBottom,
        containerPaddingLeft,
        containerMarginTop,
        containerMarginBottom,
        containerWidth,
        containerMaxWidth,
        containerBackgroundColor,
        containerImageUrl,
        containerImageId,
        containerImageAlt,
        containerDimRatio,
      },
      attributes,
      isSelected,
      editable,
      className,
      setAttributes
    } = this.props;

    const onSelectImage = image => {
      setAttributes( {
        containerImageUrl: image.id,
        containerImageId: image.url,
        containerImageAlt: image.alt,
      } );
    };

    return [
      // Show the alignment toolbar on focus
      <BlockControls>
        <BlockAlignmentToolbar
          value={ containerWidth }
          onChange={ containerWidth => setAttributes( { containerWidth } ) }
          controls={ [ 'center', 'full' ] }
        />
      </BlockControls>,
      // Show the block controls on focus
      <Inspector
        { ...{ setAttributes, ...this.props } }
      />,
      // Show the container markup in the editor
      <Container { ...this.props }>
        <div class="gh-container-inside">
          { containerImageUrl && !! containerImageUrl.length && (
            <div class="gh-container-image-wrap">
              <img
                className={ classnames(
                  'gh-container-image',
                  dimRatioToClass( containerDimRatio ),
                  {
                    'has-background-dim': containerDimRatio !== 0,
                  }
                ) }
                src={ containerImageUrl }
                alt={ containerImageAlt }
              />
            </div>
          ) }

          <div
            class="gh-container-content"
            style={ {
              maxWidth: `${containerMaxWidth}px`,
            } }
          >
            <InnerBlocks />
          </div>
        </div>
      </Container>
    ];
  }
}

// Register the block
registerBlockType( 'gearhead-blocks/gh-container', {
  title: 'Container',
  description: 'Add a container block to wrap several blocks in a parent container',
  icon: 'editor-table',
  category: 'gearhead-blocks',
  keywords: [
    'container',
    'section',
    'gearhead',
  ],

  attributes: blockAttributes,

  getEditWrapperProps( { containerWidth } ) {
    if ( 'left' === containerWidth || 'right' === containerWidth || 'full' === containerWidth) {
      return { 'data-align': containerWidth };
    }
  },

  // Render the block components
  edit: GearheadContainerBlock,

  // Save the attributes and markup
  save: function( props ) {

    // Setup the attributes
    const {
      containerPaddingTop,
      containerPaddingRight,
      containerPaddingBottom,
      containerPaddingLeft,
      containerMarginTop,
      containerMarginBottom,
      containerWidth,
      containerMaxWidth,
      containerBackgroundColor,
      containerImageUrl,
      containerImageid,
      containerImageAlt,
      containerDimRatio,
    } = props.attributes;

    return (
      <Container {...this.props}>
        <div class="gh-container-inside">
          { containerImageUrl && containerImageUrl.lenght && (
            <div className="ab-container-image-wrap">
              <img
                className={classnames(
                  'gh-container-image',
                  dimRatioToClass(containerDimRatio),
                  {
                    'has-background-dim': containerDimRatio !== 0,
                  }
                )}
                src={containerImgURL}
                alt={containerImgAlt}
              />
            </div>
          ) }

          <div
            className="ab-container-content"
            style={{
              maxWidth: `${containerMaxWidth}px`,
            }}
          >
            <InnerBlocks.Content/>
          </div>
        </div>
      </Container>
    );
  },
} );

function dimRatioToClass( ratio ) {
  return ( ratio === 0 || ratio === 50 ) ?
    null :
    'has-background-dim-' + ( 10 * Math.round( ratio / 10 ) );
}

function backgroundImageStyles( url ) {
  return url ?
    { backgroundImage: `url(${ url })` } :
    undefined;
}
