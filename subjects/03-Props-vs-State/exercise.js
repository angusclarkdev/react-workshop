////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make the "Go to Step 2" button work. [x]
//
// In order to do this, you'll have to make tabs a "pure component" so that it
// no longer manages its own state. Instead add a prop to tell it which tab to
// show, and then move the state up to the <App>.
//
// Also, be sure that clicking on the individual tabs still works.
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import * as styles from "./styles";
import data from "./data";
import { throws } from "assert";

const Tabs = ({ data, handleClick, activeIndex }) => {

  const renderTabs = () => {
    return data.map((tab, index) => {
      const style =
        activeIndex === index
          ? styles.activeTab
          : styles.tab;


      return (
        <div
          className="Tab"
          key={tab.name}
          style={style}
          onClick={() => handleClick(index)}
        >
          {tab.name}
        </div>
      );
    });
  }

  const renderPanel = () => {
    const tab = data[activeIndex];

    return (
      <div>
        <p>{tab.description}</p>
      </div>
    );
  }
    return (
      <div>
        <div style={styles.tabList}>{renderTabs()}</div>
        <div style={styles.tabPanels}>{renderPanel()}</div>
      </div>
    );
  
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0
    };
  }

  selectTab = (activeIndex) => {
    this.setState({ activeIndex });
  } 
  render() {
    return (
      <div>
        <h1>Props v. State</h1>
        <button onClick={() => this.selectTab(1)}> Go to "Step 2"</button>
        <Tabs 
        data={this.props.tabs} 
        handleClick={this.selectTab} 
        activeIndex={this.state.activeIndex} />
      </div>
    );
  }
}

ReactDOM.render(<App tabs={data} />, document.getElementById("app"));

require("./tests").run();
