// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import Container from './components/container';

// Import CSS
import './styles/style.scss';
import './styles/editor.scss';

// Extend component
const { Component } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;

// Register editor components
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
	containerMarginBottom: {
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
	containerImgURL: {
		type: 'string',
		source: 'attribute',
		attribute: 'src',
		selector: 'img',
	},
	containerImgID: {
		type: 'number',
	},
	containerImgAlt: {
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

class GHContainerBlock extends Component {

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
				containerImgURL,
				containerImgID,
				containerImgAlt,
				containerDimRatio,
			},
			attributes,
			isSelected,
			editable,
			className,
			setAttributes
		} = this.props;

		const onSelectImage = img => {
			setAttributes( {
				containerImgID: img.id,
				containerImgURL: img.url,
				containerImgAlt: img.alt,
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
					{ containerImgURL && !! containerImgURL.length && (
						<div class="gh-container-image-wrap">
							<img
								className={ classnames(
									'gh-container-image',
									dimRatioToClass( containerDimRatio ),
									{
										'has-background-dim': containerDimRatio !== 0,
									}
								) }
								src={ containerImgURL }
								alt={ containerImgAlt }
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
	title: 'Gearhead Container',
	description: 'Add a container block to wrap several blocks in a parent container.',
	icon: 'editor-table',
	category: 'gearhead-blocks',
	keywords: [
		'container',
		'section',
		'gearhead',
	],

	attributes: blockAttributes,

	getEditWrapperProps( { containerWidth } ) {
		if ( 'left' === containerWidth || 'right' === containerWidth || 'full' === containerWidth ) {
			return { 'data-align': containerWidth };
		}
	},

	// Render the block components
	edit: GHContainerBlock,

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
			containerImgURL,
			containerImgID,
			containerImgAlt,
			containerDimRatio,
		} = props.attributes;

		// Save the block markup for the front end
		return (
			<Container { ...props }>
				<div class="gh-container-inside">
					{ containerImgURL && !! containerImgURL.length && (
						<div class="gh-container-image-wrap">
							<img
								className={ classnames(
									'gh-container-image',
									'container',
									dimRatioToClass( containerDimRatio ),
									{
										'has-background-dim': containerDimRatio !== 0,
									}
								) }
								src={ containerImgURL }
								alt={ containerImgAlt }
							/>
						</div>
					) }

					<div
						class="gh-container-content"
						style={ {
							maxWidth: `${containerMaxWidth}px`,
						} }
					>
						<InnerBlocks.Content />
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
