import React, { PropTypes } from 'react';

/* Single task component that displays the task name on the page and sets onClick event */
class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = { t: this.props.t };
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      t: newProps.t
    });
  }

  handleClick() {
    this.props.setct(this.state.t, this.props.tcol);
  }

  render() {
    return (
      <div><button className="tmenuelmt hidebtn tleft" onClick={this.handleClick}>{this.state.t.name}</button></div>
    );
  }
}

Task.propTypes = {
  t: PropTypes.object.isRequired,
  tcol: PropTypes.string.isRequired,
  setct: PropTypes.func.isRequired
};

export default Task;