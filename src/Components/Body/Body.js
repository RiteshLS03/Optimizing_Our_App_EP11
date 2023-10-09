import { useEffect,useState } from "react";
import { RestaurantCard , ShimmarUI} from "../Index";
import { SwiggyAPI_URL } from "../config.js";
import "./Body.css"
import { Link } from "react-router-dom";
import { filterData } from "../../utils/helper";
import useOnline from "../../utils/useOnline";


function Body () {
  
  const [allRestaurants , setAllRestaurants] = useState(0);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState(""); //useState is a function that return an array. First Element is state varible and second element is function that how we want to change the state

  useEffect(()=>{
    getResturants()
  },[])


  async function  getResturants(){

    try {
      const response = await fetch(SwiggyAPI_URL);
      const json = await response.json();
console.log(json);
      async function checkJsonData(jsondata){
        for(i=0;i < jsondata?.data?.cards.length; i++){

          let checkData = json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle?.restaurants
          if(checkData !== undefined){
            return checkData;

          }
        }
      }
      const resData = await checkJsonData(json);
      console.log(resData);
      setAllRestaurants(resData);
      setFilteredRestaurants(resData);

    } catch (error) {
      console.log(error)
    }
  } 

  const isOnline = useOnline();

  if(!isOnline){
    <h1>🔴Sorry , please check your internet connection</h1>
  }


  return (
  (<>
      <div className="container">
        <div className="search-nav">
          <input
            type="text"
            id="searchbar"
            placeholder="Search, Order, Enjoy!"
            value={searchText}
            onChange={(e) => {
             setSearchText(e.target.value);
            }}
          />
          <button 
            onClick={() => {
              // need to filter the data
              const data = filterData(searchText, allRestaurants);
              // and set it to the hook
              setFilteredRestaurants(data);
            }}
          >
            Search
          </button>
        </div>

        {/* CARDS */}
      <div className="cards">
       {  
  !allRestaurants ?
      <ShimmarUI /> :
      filteredRestaurants?.map((restaurant) => 
         {
           return ( 
            <Link style={{ "textDecoration": "none", "color":"inherit" }} to={"/restaurant/"+restaurant?.info?.id} key={restaurant?.info?.id}>
              <div className="body-rest" >
              <RestaurantCard  restaurant={...restaurant}  />
              </div>
            </Link>
           )
          })
       }
      </div>
    </div> 
        </>
    ))
  }

  export default Body;