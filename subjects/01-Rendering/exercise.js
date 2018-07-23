////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Render `data.title` in an <h1>
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
import React, { Component } from "react";
import ReactDOM from "react-dom";
import sortBy from "sort-by";
//  import { link } from "fs";
import './rendering.css'

const data = {
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
      sort: false,
      menuItems: data.items  
    } 
  } 

  filterByType = () => {
    if (this.state.filtered === 'all') {
      return this.state.menuItems

    }  
    return this.state.menuItems.filter(i => i.type === this.state.filtered)
  }

  sortItems = () => {
    let sortedItems = this.filterByType();

    if (this.state.sort) {
      sortedItems = sortedItems.sort(sortBy("name"))
    }

    return sortedItems.map(i => <li className='list-item' key={i.id}> {i.name} </li>)
  }

  render() { 
    return (
      <div className='wrapper'>
        <h1 className="title"> Menu </h1>
        <div className="options">
        <select name="" id="" onChange={(e) => this.setState({ filtered: e.target.value, sort: false })}>
          <option value="all"> all </option>
          <option value="mexican"> mexican </option>
          <option value="english"> english </option>
        </select>
        <br/>
        <br />
        <button className='btn-sort' onClick={() => this.setState({ sort: !this.state.sort })}> Sort Alphabetically </button>
        </div>
        <ul className='menu-list'>
         {this.sortItems()}
        </ul>
      </div>  
    )
  }
}

  ReactDOM.render(<Menu />, document.getElementById("app"));

require("./tests").run();
