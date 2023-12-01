import "./App.css";
import { useEffect, useState } from "react";
import wineData from "./wine-data.json";
import WineBottle from "./WineBottle"

function App() {

  const [newcart, setNewcart] = useState([]);
  const [totalPrice, settotalPrice] = useState(0);

  const [filters, setFilters] = useState([]);
  const [countries, setCountries] = useState([]);
  const [sort, setSort] = useState([]);
  const [sortDirection, setSortDirection] = useState("");

  const [displayData, setDisplayData] = useState(wineData)

  const handleClick = (name, price) => {
    if (!newcart.includes(name)) {
      setNewcart([...newcart, name])
      handletotalPrice(price)
    }
  };

  const handleRemove = (name) => {
    if (newcart.includes(name)) {
      const index = newcart.indexOf(name)
      console.log(index)
      let updatedCart = [...newcart]
      updatedCart.splice(index, 1)
      setNewcart(updatedCart)
      var item = wineData.find(obj => {
        return obj.name == name
      })
      handletotalPrice(-item.price)
    }
  }

  const handletotalPrice = (price) => settotalPrice(
    totalPrice + price
  )

  const handleFilter = (newFilter) => {
    let newFilters = filters;
    if (filters.includes(newFilter)){
      const index = filters.indexOf(newFilter)
      newFilters.splice(index, 1)
    } else {
      newFilters = [...filters, newFilter]
    }
    setFilters(newFilters);
    filterData(newFilters, countries)
  }

  const handleCountries = (newCountry) => {
    let newCountries = countries;
    if (countries.includes(newCountry)){
      const index = countries.indexOf(newCountries)
      newCountries.splice(index,1)
    } else {
      newCountries = [...countries, newCountry]
    }
    setCountries(newCountries);
    filterData(filters, newCountries)
  }

  const filterData = (filters, countries) => {
    let filteredData = getSortedData();
    if (filters.length != 0) {
      filteredData = filteredData.filter((item)=>filters.includes(item.type))    
    }
    if (countries.length != 0) {
      filteredData = filteredData.filter((item)=>countries.includes(item.country))
    }
    setDisplayData(filteredData)
  }

  const sortAscClick = () => {
    let sortedData = [... displayData];
    sortedData.sort((item1, item2)=>item1.price - item2.price);
    setDisplayData(sortedData);
    setSortDirection("lowToHigh")
  }

  const sortDescClick = () => {
    let sortedData = [... displayData];
    sortedData.sort((item1, item2)=>item2.price - item1.price);
    setDisplayData(sortedData);
    setSortDirection("highToLow")
  }

  const getSortedData = () => {
    let sortedData = [... wineData];
    if (sortDirection == "highToLow") {
      sortedData.sort((item1, item2)=>item2.price - item1.price);
    } else if (sortDirection == "lowToHigh") {
      sortedData.sort((item1, item2)=>item1.price - item2.price);
    } 
    setDisplayData(sortedData); 
    return sortedData
  }

  return (
    <div className="App">
      <div className="Title"><h1>Max's Wine Cellar</h1></div>
      <div className="Filters">
      <h4>
        <p><u>Type</u></p>
        <input type="checkbox" id="red" name="red" value="red" onClick={() => handleFilter("Red")}></input>
        <label for="red">Red</label><br/>
        <input type="checkbox" id="white" name="white" value="white" onClick={() => handleFilter("White")}></input>
        <label for="white">White</label>
        <p><u>Countries</u></p>
        <input type="checkbox" id="france" name="france" value="france" onClick={() => handleCountries("France")}></input>
        <label for="france">France</label><br/>
        <input type="checkbox" id="argentina" name="argentina" value="argentina" onClick={() => handleCountries("Argentina")}></input>
        <label for="argentina">Argentina</label><br/>
        <input type="checkbox" id="spain" name="spain" value="spain" onClick={() => handleCountries("Spain")}></input>
        <label for="spain">Spain</label><br/>
        <input type="checkbox" id="australia" name="australia" value="australia" onClick={() => handleCountries("Australia")}></input>
        <label for="australia">Australia</label><br/>
        <input type="checkbox" id="new-zealand" name="new-zealand" value="new-zealand" onClick={() => handleCountries("New Zealand")}></input>
        <label for="new-zealand">New Zealand</label><br/>
        <input type="checkbox" id="chile" name="chile" value="chile" onClick={() => handleCountries("Chile")}></input>
        <label for="chile">Chile</label><br/>
        <p><u>Sort</u></p>
        <button onClick={sortAscClick}>Sort Price Low to High</button><br/>
        <button onClick={sortDescClick}>Sort Price High to Low</button>
      </h4>
      </div>
      <div className ="Body">
      {displayData.map((item, index) => (
        <p><WineBottle name={item.name} country={item.country} type={item.type} price={item.price} image={item.image} onClick={() => {
          handleClick(item.name, item.price)
        }}/></p>
      ))}
      </div>

      <div className="Cart">
        <h2>Favorites</h2>
        {newcart.map((name) => {
          return (
            <span>
              <p>{name}</p>
              <button onClick={() => handleRemove(name)}>Remove</button>
            </span>
          )
        })}
        <p>{totalPrice}</p>
      </div>
    </div>
  );
}

export default App;
