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
      showPieceLookControls: false,
      opacity: 1,
      color: props.material.color.getHexString(),
      emissive: props.material.emissive.getHexString(),
      specular: props.material.specular.getHexString(),
      shininess: props.material.shininess,
      iMax: 15,
      jMax: 25,
      iBoundsMax: 150,
      jBoundsMax: 300
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

  togglePieceLook() {
    this.setState({ showPieceLookControls: !this.state.showPieceLookControls })
  }

  change(value) {
    return (event) => {
      let stateUpdate = {};
      stateUpdate[value] = event.target.value;
      this.setState(stateUpdate);
      this.props.material[value] = event.target.value;
    }
  }

  redraw() {
    this.props.pieceMeshes.forEach(mesh => {
      this.props.scene.remove(mesh);
    });
    this.props.redraw(this.state.iMax, this.state.jMax, this.state.iBoundsMax, this.state.jBoundsMax);
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
        <div>
          <button onClick={this.togglePieceLook.bind(this)}>Show/Hide controls to modify piece style</button>
        </div>
        {this.state.showPieceLookControls && <div>
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
        </div>}
        <div>
          <button onClick={this.toggleDisplacementAnimation.bind(this)}>Toggle Displacement Animation</button>
        </div>
        <Slider max={200} step={1} value='iMax' name='Number pieces along width' material={this.state} updateComponent={this} updateFunc={this.redraw.bind(this)} />
        <Slider max={200} step={1} value='jMax' name='Number pieces along length' material={this.state} updateComponent={this} updateFunc={this.redraw.bind(this)} />
        <Slider max={500} step={1} value='iBoundsMax' name='width' material={this.state} updateComponent={this} updateFunc={this.redraw.bind(this)} />
        <Slider max={500} step={1} value='jBoundsMax' name='length' material={this.state} updateComponent={this} updateFunc={this.redraw.bind(this)} />
      </div>
    );
  }
}

export default DefaultComponent;
