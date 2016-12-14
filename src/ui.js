import React from 'react';
import ReactDOM from 'react-dom';
import '../css/ui.css';
import { SketchPicker } from 'react-color';
import * as THREE from 'three';

import Slider from './slider';

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
      </div>
    );
  }
}

export default DefaultComponent;
