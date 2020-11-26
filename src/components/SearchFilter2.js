import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import data from "./data.json";
import './Comp.css';

class SearchFilter2 extends Component {
  state = {
      genralItems: [],
    itemsToDisplay: [],
    itemsToUse: [],
    cuisines: [],
    price: "",
    distance: ""
  };
  render() {
    return (
      <div className = "search-filter">
        <Grid container spacing={1} className="restfilter">
        <Grid item xs={6} sm={6} lg={2} className="">
            Cuisines: &nbsp;
            <select id="restfilter"  className="input-field" onChange={this.optionSelected}>
              <option value="any">Choose Any</option>
              {this.state.cuisines.map(cuisine => {
                return <option value={cuisine}>{cuisine}</option>;
              })}
            </select>
          </Grid>
          <Grid item xs={6} sm={6} lg={2} className="">
            Sort by: &nbsp;
            <select id="sortfilter"  className="input-field" onChange={this.sortBy}>
              <option value="ranking">Distance</option>
              <option value="asc">Near to Far</option>
              <option value="des">Far to Near</option>
            </select>
          </Grid>
          <Grid item xs={12} sm={12} lg={8} className="">
          <form id="filter-form">
            <input
                type="text"
                className="input-field"
                id="price_filter"
                required
                placeholder="Filter price from..."
                onChange={this.handleChange.bind(this)}
                onInput={this.filterPrice()}
                name="price_filter"
            />
            &emsp;
            <Button variant="contained" onClick={this.filterPrice}>Price Filter</Button>
          <input
              type="text"
              className="input-field"
              id="distance_filter"
              required
              placeholder="Filter distance from..."
              onChange={this.handleChange.bind(this)}
              onInput={this.filterDistance()}
              name="distance_filter"
          />
          &emsp;
          <Button variant="contained" onClick={this.filterDistance} >Distance Filter</Button>
          </form>
        </Grid>
        </Grid>
        <div className="restcontainer">
          {this.state.itemsToDisplay.map(rest => {
            let cuisines = rest["Cuisine Style"]
              .substring(1, rest["Cuisine Style"].length - 2)
              .split(",");
            return (
              <div className="rest">
                <div className="restinfo">
                  <i
                    className="fas fa-map-marker"
                    style={{ color: "orangered", fontSize: "12px" }}
                  ></i>
                  &nbsp;
                  <span className="restcity">{rest["City"]}</span>
                  <br />
                  <span className="restname">{rest["Name"]}</span>
                  <div className="restcuisines">
                    {cuisines.map(cuisine => {
                      let cuisineToShow = cuisine.substring(
                        1,
                        cuisine.length - 1
                      );
                      cuisineToShow = cuisineToShow.includes("'")
                        ? cuisineToShow.substring(1, cuisineToShow.length)
                        : cuisineToShow;
                      return (
                        <div pill className="restcuisine" variant="light">
                          {cuisineToShow}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="sepline"></div>
                <div className="reststats">
                  <div className="pricing">
                   N{rest["Number of Reviews"]}
                  </div>
                  <div className="local-distance">
                    {rest["Rating"]} km
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  optionSelected = () => {
    var e = document.getElementById("restfilter");
    var selected = e.options[e.selectedIndex].text;
    if (selected === "Choose Any")
      this.setState({ itemsToDisplay: [...this.state.itemsToUse] });
    else {
      let itemsToDisplay = [];
      itemsToDisplay = this.state.itemsToUse.filter(item =>
        item["Cuisine Style"].toLowerCase().includes(selected.toLowerCase())
      );
      this.setState({ itemsToDisplay });
    }
  };

  sortBy = () => {
    var e = document.getElementById("sortfilter");
    var selected = e.options[e.selectedIndex].value;

    if (selected === "ranking")
      this.setState({ itemsToDisplay: [...this.state.itemsToUse] });
    else if (selected === "asc") {
      let itemsToDisplay = [...this.state.itemsToDisplay];
      itemsToDisplay.sort(function(a, b) {
        return a["Rating"] - b["Rating"];
      });
      this.setState({ itemsToDisplay });
    } else {
      let itemsToDisplay = [...this.state.itemsToDisplay];
      itemsToDisplay.sort(function(a, b) {
        return b["Rating"] - a["Rating"];
      });
      this.setState({ itemsToDisplay });
    }
  }; 

  handleChange(event) {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }
  filterPrice = () => { 
    if (this.state.price_filter !== undefined){
        let x = document.getElementsByClassName('pricing');
        for (let i = 0; i < x.length; i++) { 
            let y = x[i].textContent.replace(/\D/g, "")
            let currentPrice = this.state.price_filter.replace(/\D/g, "")
            currentPrice = parseInt(currentPrice, 10)
            y = parseInt(y, 10)
            console.log( typeof currentPrice)
            console.log( y, currentPrice)
            if (y > currentPrice){ 
                x[i].parentNode.parentNode.style.display="none";
            }else { 
                x[i].parentNode.parentNode.style.display="inline";			 
            }
        }
    }
    else return;
  }
  filterDistance = () => { 
    if (this.state.distance_filter !== undefined){
        let x = document.getElementsByClassName('local-distance');
        for (let i = 0; i < x.length; i++) { 
            let y = x[i].textContent.replace(/\D/g, "")
            let currentDistance = this.state.distance_filter.replace(/\D/g, "")
            currentDistance = parseInt(currentDistance, 10)
            y = parseInt(y, 10)
            console.log( typeof currentDistance)
            console.log( y, currentDistance)
            if (y > currentDistance){ 
                x[i].parentNode.parentNode.style.display="none";
            }else { 
                x[i].parentNode.parentNode.style.display="inline";			 
            }
        }
    }
    else return;
  }
  /*filterPrice = () => {
    if (this.state.price_filter === undefined){
      this.setState({ itemsToDisplay: [...this.state.itemsToDisplay] });
    }else {
      let filteredItems = [];
      console.log(this.state.itemsToDisplay)
      filteredItems = this.state.itemsToDisplay.filter(item =>{
        if (item["Number of Reviews"] < this.state.price_filter){
            return item["Number of Reviews"];
        }
        });
        this.setState({ itemsToDisplay: filteredItems});
    }
  };*/

  componentDidMount() {
    this.reRenderList();
  }

  reRenderList() {
    var cuisines = [];
    let itemsToDisplay = [];
    for (var i = 0; i < data.length; i++) {
        itemsToDisplay.push(data[i]);
      data[i]["Cuisine Style"]
        .substring(1, data[i]["Cuisine Style"].length - 2)
        .split(",")
        .forEach(cuisine => {
          let c = cuisine.substring(1, cuisine.length - 1);
          c = c.includes("'") ? c.substring(1, c.length) : c;
          if (cuisines.indexOf(c) < 0) {
            cuisines.push(c);
          }
        });
    }
    this.setState({generalItems: itemsToDisplay});
    this.setState({ cuisines });

    this.setState({ itemsToDisplay }, () => {
      this.setState({ itemsToUse: [...this.state.itemsToDisplay] });
    });
  }
}

export default SearchFilter2;
