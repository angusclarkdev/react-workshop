////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Modify <ListView> so that it only renders the list items that are visible!
//
// Got extra time?
//
// - Render fewer rows as the size of the window changes (hint: Listen
//   for the window's "resize" event)
// - Remember the scroll position when you refresh the page
////////////////////////////////////////////////////////////////////////////////
import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import * as RainbowListDelegate from "./RainbowListDelegate";

class ListView extends React.Component {
  static propTypes = {
    numRows: PropTypes.number.isRequired,
    rowHeight: PropTypes.number.isRequired,
    renderRowAtIndex: PropTypes.func.isRequired
  };

  state = {
    containerHeight: window.innerHeight,
    scrollPos: 0
  }

  container = React.createRef()

  trackViewportSize = () => {
    this.setState({ containerHeight: this.container.current.style.height });
  }

  trackScrollPos = () => {
    this.setState({ scrollPos: this.container.current.scrollTop })
    // console.log(document.body.scrollTop);
  }

  componentDidMount () {
    if (this.container.current) {
      // this.trackViewportSize()
      this.container.current.addEventListener('scroll', this.trackScrollPos)
    }
  }

  render() {  
    // window.addEventListener('resize', this.trackViewportSize)
    const { numRows, rowHeight, renderRowAtIndex } = this.props;
    const totalHeight = numRows * rowHeight;
    let numRowsAvailable = Math.round((this.state.containerHeight + this.state.scrollPos) / rowHeight) + 4;

    const items = [];

    let index = 0;
    while (index < numRowsAvailable) {
      items.push(<li key={index}>{renderRowAtIndex(index)}</li>);
      index++;
    }

    return (
      <div style={{ height: "100vh", overflowY: "scroll" }} ref={this.container}>
        <ol>{items}</ol>
      </div>
    );
  }
}

ReactDOM.render(
  <ListView
    numRows={500}
    rowHeight={RainbowListDelegate.rowHeight}
    renderRowAtIndex={RainbowListDelegate.renderRowAtIndex}
  />,
  document.getElementById("app")
);
