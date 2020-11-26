import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import data from "./data.json";
import './Comp.css';

const SearchFilter = () => {

  const [input, setInput] = useState({price: "", distance: ""})
  const [genItems, setGenItems] = useState([]);
  const [catFiltered, setCatFiltered] = useState([]);
  const [priceFiltered, setPriceFiltered] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  
  const generateList = () => {
    var fresh_cuisines = [];
    var fresh_items = [];
    for (var i = 0; i < data.length; i++) {
      fresh_items.push(data[i]);
      data[i]["Cuisine Style"]
        .substring(1, data[i]["Cuisine Style"].length - 2)
        .split(",")
        .forEach(fresh_cuisine => {
          let c = fresh_cuisine.substring(1, fresh_cuisine.length - 1);
          c = c.includes("'") ? c.substring(1, c.length) : c;
          if (fresh_cuisines.indexOf(c) < 0) {
            fresh_cuisines.push(c);
          }
        });
    }

      setCuisines(fresh_cuisines);
      setGenItems(fresh_items);
      setCatFiltered(fresh_items);
      setDisplayItems(fresh_items);
  }

  const handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
}

  const categoryFilter = () => {
    setInput({price: "", distance: ""})
    var e = document.getElementById("restfilter");
    var selected = e.options[e.selectedIndex].text;
    if (selected === "Choose Any")
        generateList()
    else {
      let new_items = [];
      new_items = genItems.filter(item =>
        item["Cuisine Style"].toLowerCase().includes(selected.toLowerCase())
      );
      setCatFiltered(new_items);
      setDisplayItems(new_items);
    }
  };

  const priceFilter = () => {
    input.distance = "";
    input.price = parseInt(input.price, 10)
    if (isNaN(input.price)){
      setDisplayItems(catFiltered)
      setPriceFiltered(catFiltered)
    }else{
      let new_items = [];
      new_items = catFiltered.filter(item =>{
          return item["Number of Reviews"] < input.price;
        });
      setPriceFiltered(new_items)
     setDisplayItems(new_items);
    }
  };

  const distanceFilter = () => {
    input.price = parseInt(input.price, 10)
    input.distance = parseInt(input.distance, 10)
    let usableItems = []
    if (isNaN(input.price)){
     usableItems = catFiltered;
    }else{
      usableItems = priceFiltered;
    }
    if (isNaN(input.distance)){
      setDisplayItems(usableItems);
    }else{
      let new_items = [];
      new_items = usableItems.filter(item =>{
        return item["Rating"] < input.distance;
      });
      setDisplayItems(new_items);
    }
  };
 
 
   const sortBy = () => {
     var e = document.getElementById("sortfilter");
     var selected = e.options[e.selectedIndex].value;
 
     if (selected === "ranking")
       setDisplayItems(displayItems);
     else if (selected === "asc") {
       let new_items = [...displayItems];
       new_items.sort(function(a, b) {
         return a["Rating"] - b["Rating"];
       });
       setDisplayItems(new_items);
     } else {
      let new_items = [...displayItems];
       new_items.sort(function(a, b) {
         return b["Rating"] - a["Rating"];
       });
       setDisplayItems(new_items);
     }
   };



  useEffect(() => {
    generateList();
    }, []
  )
  return (
    <div className = "search-filter">
    <Grid container spacing={1} className="restfilter">
    <Grid item xs={6} sm={6} lg={2} className="">
        Cuisines: &nbsp;
        <select id="restfilter"  className="input-field" onChange={categoryFilter}>
          <option value="any">Choose Any</option>
          {cuisines.map(cuisine => {
            return <option value={cuisine}>{cuisine}</option>;
          })}
        </select>
      </Grid>
      <Grid item xs={6} sm={6} lg={2} className="">
        Sort by: &nbsp;
        <select id="sortfilter"  className="input-field" onChange={sortBy}>
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
            value={input.price || ""}
            onChange={handleInputChange}
            name="price"
        />
        &emsp;
        <Button variant="contained" onClick={priceFilter}>Price Filter</Button>
      <input
          type="text"
          className="input-field"
          id="distance_filter"
          required
          placeholder="Filter distance from..."
          value={input.distance || ""}
          onChange={handleInputChange}
          //onInput={distanceFilter}
          name="distance"
      />
      &emsp;
      <Button variant="contained" onClick={distanceFilter}>Distance Filter</Button>
      </form>
    </Grid>
    </Grid>
      <div className="restcontainer">
      {displayItems.map(rest => {
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
              <div>
                <i
                  style={{ fontSize: "15px" }}
                  className="far fa-comment-alt"
                ></i>
                &nbsp;
                Price: N{rest["Number of Reviews"]}
              </div>
              <div>
                <i style={{ fontSize: "15px" }} className="far fa-star"></i>
                &nbsp;
                Distance: {rest["Rating"]} km
              </div>
            </div>
          </div>
        );
      })}
    </div>
    </div>
  )

 




}
export default SearchFilter;
/*return (
      <div className = "search-filter">
        <div className="restfilter">
          <div>
            Choose a cuisine : &nbsp;
            <select id="restfilter" onChange={optionSelected}>
              <option value="any">Choose Any</option>
              {cuisines.map(cuisine => {
                return <option value={cuisine}>{cuisine}</option>;
              })}
            </select>
          </div>
          <div>
            Sort by : &nbsp;
            <select id="sortfilter" onChange={sortBy}>
              <option value="ranking">Ranking</option>
              <option value="asc">Rating: Low to High</option>
              <option value="des">Rating: High to Low</option>
            </select>
          </div>
        </div>
        <div className="restcontainer">
          {displayItems.map(rest => {
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
                  <div>
                    <i
                      style={{ fontSize: "15px" }}
                      className="far fa-comment-alt"
                    ></i>
                    &nbsp;
                    {rest["Number of Reviews"]}
                  </div>
                  <div>
                    <i style={{ fontSize: "15px" }} className="far fa-star"></i>
                    &nbsp;
                    {rest["Rating"]}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  
    const filterOnSearch = event => {
   if (
      !event.target.value ||
      event.target.value === " " ||
      event.target.value === ""
    )
    setDisplayItems(itemsToUse);
    else {
      let displayItems = [];
      displayItems = itemsToUse.filter(
        item =>
          item["Name"]
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) ||
          item["Cuisine Style"]
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) ||
          item["City"].toLowerCase().includes(event.target.value.toLowerCase())
      );
      setItemToDisplay(displayItems);
    }
  }

  const optionSelected = () => {
    var e = document.getElementById("restfilter");
    var selected = e.options[e.selectedIndex].text;

    if (selected === "Choose Any")
      SetItemsToDisplay(itemsToUse);
    else {
      let displayItems = [];
      displayItems = itemsToUse.filter(item =>
        item["Cuisine Style"].toLowerCase().includes(selected.toLowerCase())
      );
      SetItemsToDisplay(displayItems);
    }
  };

  const sortBy = () => {
    var e = document.getElementById("sortfilter");
    var selected = e.options[e.selectedIndex].value;

    if (selected === "ranking")
      SetItemsToDisplay(itemsToUse);
    else if (selected === "asc") {
      let displayItems = [...displayItems];
      displayItems.sort(function(a, b) {
        return a["Rating"] - b["Rating"];
      });
      SetItemsToDisplay(displayItems);
    } else {
      let displayItems = [...displayItems];
      displayItems.sort(function(a, b) {
        return b["Rating"] - a["Rating"];
      });
      SetItemsToDisplay(displayItems);
    }
  };

  reRenderList() {
    var cuisines = [];
    var displayItems = [];
    for (var i = 0; i < data.length; i++) {
      displayItems.push(data[i]);
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

    setCuisines(cuisines);

    this.setState({ displayItems }, () => {
      this.setState({ itemsToUse: [...this.state.displayItems] });
    });
  }

  useEffect(() => {
    reRenderList();
    }, []
  )

  }


export default SearchFilter;*/
