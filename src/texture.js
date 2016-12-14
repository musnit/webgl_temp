import React from 'react';
import * as THREE from 'three';

class DefaultComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defaultValue || 'images/amber_texture.jpg'
    };
  }

  change (event) {
    this.setState({ value: event.target.value });
    var texture = THREE.ImageUtils.loadTexture(event.target.value);
    this.props.material[this.props.value] = texture;
    this.props.material.needsUpdate = true;
  }

  render() {
    return <div>
      <label>{this.props.value} Texture: </label>
      <select value={this.state.value} onChange={this.change.bind(this)}>
        <option value="images/amber_texture.jpg">Amber</option>
        <option value="images/glass_texture.jpg">Glass</option>
        <option value="images/rainbow_texture.png">Rainbow</option>
        <option value="images/displacement_map.jpg">Displacement</option>
        <option value="images/displacement_2.jpg">Displacement 2</option>
      </select>
    </div>;
  }
}

export default DefaultComponent;
