import React from 'react';
import ReactDOM from 'react-dom';
import '../css/ui.css';
import { SketchPicker } from 'react-color';
import * as THREE from 'three';

import Slider from './slider';
import Texture from './texture';

class DefaultComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showColorPicker: false,
      showEmissivePicker: false,
      showSpecularPicker: false,
      opacity: 1,
      color: props.material.color.getHexString(),
      emissive: props.material.emissive.getHexString(),
      specular: props.material.specular.getHexString(),
      shininess: props.material.shininess
    };
  }

  toggleColorPicker() {
    this.setState({ showColorPicker: !this.state.showColorPicker, showEmissivePicker: false, showSpecularPicker: false });
  }

  toggleEmissivePicker() {
    this.setState({ showColorPicker: false, showEmissivePicker: !this.state.showEmissivePicker, showSpecularPicker: false });
  }

  toggleSpecularPicker() {
    this.setState({ showColorPicker: false, showEmissivePicker: false, showSpecularPicker: !this.state.showSpecularPicker });
  }

  colorChange(color, event) {
    this.setState({ color });
    this.props.material.color = new THREE.Color(color.hex);
    event.preventDefault();
  }

  emissiveChange(color, event) {
    this.setState({ emissive: color });
    this.props.material.emissive = new THREE.Color(color.hex);
    event.preventDefault();
  }

  specularChange(color, event) {
    this.setState({ specular: color });
    this.props.material.specular = new THREE.Color(color.hex);
    event.preventDefault();
  }

  disableControls() {
    this.props.controls.enabled = false;
  }

  enableControls() {
    this.props.controls.enabled = true;
  }

  toggleRotation() {
    this.props.controls.autoRotate = !this.props.controls.autoRotate;
  }

  toggleDisplacementAnimation() {
    this.props.animations.displacement = !this.props.animations.displacement;
    this.props.material.displacementScale = 0;
  }

  change(value) {
    return (event) => {
      let stateUpdate = {};
      stateUpdate[value] = event.target.value;
      this.setState(stateUpdate);
      this.props.material[value] = event.target.value;
    }
  }

  render() {
    return (
      <div className='ui'
        onMouseDown={this.disableControls.bind(this)}
        onMouseUp={this.enableControls.bind(this)} >
        <div>
          <button onClick={this.toggleRotation.bind(this)}>Toggle Autorotation</button>
        </div>
        <div>
          <button onClick={this.toggleColorPicker.bind(this)}>Pick Material Color</button>
        </div>
        {this.state.showColorPicker && <div>
          <SketchPicker
            color={ this.state.color }
            onChange={this.colorChange.bind(this)} />
        </div>}
        <div>
          <button onClick={this.toggleEmissivePicker.bind(this)}>Pick Material Emmisive</button>
        </div>
        {this.state.showEmissivePicker && <div>
          <SketchPicker
            color={ this.state.emissive }
            onChange={this.emissiveChange.bind(this)} />
        </div>}
        <div>
          <button onClick={this.toggleSpecularPicker.bind(this)}>Pick Material Specular</button>
        </div>
        {this.state.showSpecularPicker && <div>
          <SketchPicker
            color={ this.state.specular }
            onChange={this.specularChange.bind(this)} />
        </div>}
        <Slider value='opacity' material={this.props.material} />
        <Slider value='shininess' max={1000} step={1} material={this.props.material} />
        <Slider value='reflectivity' material={this.props.material} />
        <Texture value='map' material={this.props.material} />
        <Texture value='lightMap' material={this.props.material} />
        <Texture value='emissiveMap' material={this.props.material} />
        <Texture value='normalMap' material={this.props.material} />
        <Texture value='bumpMap' defaultValue="images/displacement_2.jpg" material={this.props.material} />
        <Slider value='bumpScale' material={this.props.material} />
        <Texture value='displacementMap' defaultValue="images/displacement_2.jpg" material={this.props.material} />
        <Slider value='displacementScale' material={this.props.material} />
        <Slider value='displacementBias' material={this.props.material} />
        <div>
          <button onClick={this.toggleDisplacementAnimation.bind(this)}>Toggle Displacement Animation</button>
        </div>
      </div>
    );
  }
}

export default DefaultComponent;
