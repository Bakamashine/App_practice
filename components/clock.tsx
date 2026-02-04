// Source - https://stackoverflow.com/a/41237774
// Posted by KevinH
// Retrieved 2026-02-04, License - CC BY-SA 3.0

import React from "react";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h2>Время</h2>
        <h4 className="clock">{this.state.date.toLocaleTimeString()}</h4>
      </div>
    );
  }
}

export default Clock