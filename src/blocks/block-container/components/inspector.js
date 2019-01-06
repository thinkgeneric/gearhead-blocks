const {Component} = wp.element;

const {
  InspectorControls,
  PanelColorSettings,
  MediaUpload,
} = wp.editor;

const {
  PanelBody,
  RangeControl,
  IconButton,
} = wp.components;


export default class Inspector extends Component {
  constructor(props) {
    super(...arguments);
  }

  render() {
    const {
      containerBackgroundColor,
      containerPaddingTop,
      containerPaddingRight,
      containerPaddingBottom,
      containerPaddingLeft,
      containerMarginTop,
      containerMarginRight,
      containerMarginLeft,
      containerMarginBottom,
      containerImageId,
      containerImageUrl,
      containerDimRatio,
    } = this.props.attributes;
    const {setAttributes} = this.props;

    const onSelectImage = image => {
      setAttributes({
        containerImageId: image.id,
        containerImageUrl: image.url,
        containerImageAlt: image.alt,
      });
    };

    const onRemoveImage = () => {
      setAttributes({
        containerImageId: null,
        containerImageUrl: null,
        containerImageAlt: null,
      })
    };

    const onChangeBackgroundColor = value => setAttributes({containerBackgroundColor: value});

    return (
      <InspectorControls key="inspector">
        <PanelBody title='Container Options' initialOpen={true}>
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
            step={ .5 }
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
            label={ 'Margin Left (%)' }
            value={ containerMarginLeft }
            onChange={ ( value ) => this.props.setAttributes( { containerMarginLeft: value } ) }
            min={ 0 }
            max={ 20 }
            step={ .5 }
          />

          <RangeControl
            label={ 'Margin Right (%)' }
            value={ containerMarginRight }
            onChange={ ( value ) => this.props.setAttributes( { containerMarginRight: value } ) }
            min={ 0 }
            max={ 20 }
            step={ .5 }
          />
        </PanelBody>

        <PanelBody title="Background Options" initialOpen={false}>
          <p>Select a background image:</p>
          <MediaUpload
            onSelect={onSelectImage}
            type="image"
            value={containerImageId}
            render={ ( {open} ) => (
              <div>
                <IconButton
                  className="gh-container-inspector-media"
                  label="Edit Image"
                  icon="format-image"
                  onClick={open}
                >Select Image</IconButton>

                { containerImageUrl && !! containerImageUrl.length && (
                  <IconButton
                    className='gh-container-inspector-media'
                    label='Remove Image'
                    icon='dismiss'
                    onClick={onRemoveImage}
                  >Remove</IconButton>
                ) }

              </div>
            ) }
          />

          { containerImageUrl && !! containerImageUrl.lenght && (
            <RangeControl
              label='Image Opacity'
              value={containerDimRatio}
              onChange={ (value) => this.props.setAttributes( {containerDimRatio: value } ) }
              min={ 0 }
              max={ 100 }
              step={ 10 }
            />
          ) }

          <PanelColorSettings
            title='Background Color'
            initailOpen={ false }
            colorSettings={ [ {
              value: containerBackgroundColor,
              label: 'Background Color',
              onChange: onChangeBackgroundColor,
            } ] }
          />

        </PanelBody>
      </InspectorControls>
    );
  }
}
