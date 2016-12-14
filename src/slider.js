import React from 'react';

class DefaultComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.material[this.props.value]
    };
  }

  change (event) {
    this.setState({ value: event.target.value });
    this.props.material[this.props.value] = event.target.value;
  }

  render() {
    return <div>
      <label>{this.props.value}: {this.state.value}</label><input
        type="range"
        min={this.props.min | 0} max={this.props.max || 1} defaultValue={this.props.material[this.props.value]}
        onInput={this.change.bind(this)}
        step={this.props.step || 0.01} />
    </div>;
  }
}

export default DefaultComponent;
