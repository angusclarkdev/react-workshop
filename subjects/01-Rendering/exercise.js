////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Render `DATA.title` in an <h1>
// - Render a <ul> with each of `DATA.items` as an <li> [x]
// - Now only render an <li> for mexican food (hint: use DATA.items.filter(...)) [x]
// - Sort the items in alphabetical order by name (hint: use sort-by https://github.com/staygrimm/sort-by#example)
//
// Got extra time?
//
// - Add a <select> dropdown to make filtering on `type` dynamic [x]
// - Add a <button> to toggle the sort order (hint: You'll need an `updateThePage` []
//   function that calls `ReactDOM.render`, and then you'll need to call it in
//   the event handlers of the form controls)
////////////////////////////////////////////////////////////////////////////////
import React, {Component} from "react";
import ReactDOM from "react-dom";
import sortBy from "sort-by";
//  import { link } from "fs";

const DATA = {
  title: "Menu",
  items: [
    { id: 1, name: "tacos", type: "mexican" },
    { id: 2, name: "burrito", type: "mexican" },
    { id: 3, name: "tostada", type: "mexican" },
    { id: 4, name: "mushy peas", type: "english" },
    { id: 5, name: "fish and chips", type: "english" },
    { id: 6, name: "black pudding", type: "english" }
  ]
};

class Menu extends Component {
  constructor () {
    super()

    this.state = {
      filtered: 'all',
      sort: false  
    } 
  } 
 
 get filterByType() {
    if (this.state.filtered === "all" && this.state.sort === true) {
      return DATA.items
        .sort(sortBy('name'))
        .map(i => <li key={i.id}> {i.name} </li>)

    } else if (this.state.filtered === "all" && this.state.sort === false) {
        return DATA.items
          .map(i => <li key={i.id}> {i.name} </li>)

    } else if (this.state.sort === true) {
        return DATA.items
          .sort(sortBy('name'))
          .filter(i => i.type === this.state.filtered)
          .map(i => <li key={i.id}> {i.name} </li>)

   } return DATA.items
     .filter(i => i.type === this.state.filtered)
     .map(i => <li key={i.id}> {i.name} </li>)
  }

  // filteredItems = this.filterByType();
  render() { 
    return (
      <div>
        <h1> {DATA.title} </h1>
        <select name="" id="" onChange={(e) => this.setState({ filtered: e.target.value })}>
          <option value="all"> all </option>
          <option value="mexican"> mexican </option>
          <option value="english"> english </option>
        </select>
        <br/>
        <br />
        <button onClick={() => this.setState({ sort: !this.state.sort })}> Sort Alphabetically </button>
        <ul>
         {this.filterByType}
        </ul>
      </div>  
    )
  }
}

  ReactDOM.render(<Menu />, document.getElementById("app"));

require("./tests").run();
