// Setup the block
const { Component } = wp.element;

// Import block components
const {
  InspectorControls,
  PanelColorSettings,
  MediaUpload,
} = wp.editor;

// Import Inspector components
const {
	PanelBody,
	RangeControl,
	IconButton,
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		// Setup the attributes
		const { containerPaddingTop, containerPaddingRight, containerPaddingBottom, containerPaddingLeft, containerMarginTop, containerMarginBottom, containerMaxWidth, containerBackgroundColor, containerDimRatio, containerImgURL, containerImgID, containerImgAlt } = this.props.attributes;
		const { setAttributes } = this.props;

		const onSelectImage = img => {
			setAttributes( {
				containerImgID: img.id,
				containerImgURL: img.url,
				containerImgAlt: img.alt,
			} );
		};

		const onRemoveImage = () => {
			setAttributes({
				containerImgID: null,
				containerImgURL: null,
				containerImgAlt: null,
			});
		}

		// Update color values
		const onChangeBackgroundColor = value => setAttributes( { containerBackgroundColor: value } );

		return (
		<InspectorControls key="inspector">
			<PanelBody title={ 'Container Options' } initialOpen={ true }>
				<RangeControl
					label={ 'Padding Top (%)' }
					value={ containerPaddingTop }
					onChange={ ( value ) => this.props.setAttributes( { containerPaddingTop: value } ) }
					min={ 0 }
					max={ 20 }
					step={ .5 }
				/>

				<RangeControl
					label={ 'Padding Bottom (%)' }
					value={ containerPaddingBottom }
					onChange={ ( value ) => this.props.setAttributes( { containerPaddingBottom: value } ) }
					min={ 0 }
					max={ 20 }
					step={ .5 }
				/>

				<RangeControl
					label={ 'Padding Left (%)' }
					value={ containerPaddingLeft }
					onChange={ ( value ) => this.props.setAttributes( { containerPaddingLeft: value } ) }
					min={ 0 }
					max={ 20 }
					step={ .5 }
				/>

				<RangeControl
					label={ 'Padding Right (%)' }
					value={ containerPaddingRight }
					onChange={ ( value ) => this.props.setAttributes( { containerPaddingRight: value } ) }
					min={ 0 }
					max={ 20 }
					step={ .5 }
				/>

				<RangeControl
					label={ 'Margin Top (%)' }
					value={ containerMarginTop }
					onChange={ ( value ) => this.props.setAttributes( { containerMarginTop: value } ) }
					min={ 0 }
					max={ 20 }
					step={ 1 }
				/>

				<RangeControl
					label={ 'Margin Bottom (%)' }
					value={ containerMarginBottom }
					onChange={ ( value ) => this.props.setAttributes( { containerMarginBottom: value } ) }
					min={ 0 }
					max={ 20 }
					step={ .5 }
				/>

				<RangeControl
					label={ 'Inside Container Max Width (px)' }
					value={ containerMaxWidth }
					onChange={ ( value ) => this.props.setAttributes( { containerMaxWidth: value } ) }
					min={ 500 }
					max={ 1600 }
					step={ 1 }
				/>
			</PanelBody>

			<PanelBody title={ 'Background Options' } initialOpen={ false }>
				<p>{ 'Select a background image:' }</p>
				<MediaUpload
					onSelect={ onSelectImage }
					type="image"
					value={ containerImgID }
					render={ ( { open } ) => (
						<div>
							<IconButton
								className="gh-container-inspector-media"
								label={ 'Edit image' }
								icon="format-image"
								onClick={ open }
							>
								{ 'Select Image' }
							</IconButton>

							{ containerImgURL && !! containerImgURL.length && (
								<IconButton
									className="gh-container-inspector-media"
									label={ 'Remove Image' }
									icon="dismiss"
									onClick={ onRemoveImage }
								>
									{ 'Remove' }
								</IconButton>
							) }
						</div>
					) }
				>
				</MediaUpload>

				{ containerImgURL && !! containerImgURL.length && (
					<RangeControl
						label={ 'Image Opacity' }
						value={ containerDimRatio }
						onChange={ ( value ) => this.props.setAttributes( { containerDimRatio: value } ) }
						min={ 0 }
						max={ 100 }
						step={ 10 }
					/>
				) }

				<PanelColorSettings
					title={ 'Background Color' }
					initialOpen={ false }
					colorSettings={ [ {
						value: containerBackgroundColor,
						label: 'Background Color',
						onChange: onChangeBackgroundColor,
					} ] }
				>
				</PanelColorSettings>
			</PanelBody>
		</InspectorControls>
		);
	}
}
