import React,{useState,useEffect} from "react";
import {
    IMG_CDN_LINK,
    MAIN_Restaurnat_API_URL,
    MENU_ITEM_TYPE_KEY,
    RESTAURANT_TYPE_KEY,
  } from ".././Components/config";

const useRestaurant = (id) => {
// return restaurant data 
// get Data from the API

const [restaurant , setRestaurant] = useState(null);
// const [restaurant, setRestaurant] = useState(null);
const [menuItems, setMenuItems] = useState([]);

useEffect(() => {
  getRestaurantInfo();
}, []);

async function getRestaurantInfo() {
  try {
    const data = await fetch(MAIN_Restaurnat_API_URL + id);
    const json = await data.json();
    console.log(json);

    // set restaurant data
    const restaurantData =
      json?.data?.cards
        ?.map((x) => x.card)
        ?.find((x) => x && x.card["@type"] === RESTAURANT_TYPE_KEY)?.card
        ?.info || null;
    setRestaurant(restaurantData);

    // sete menu item data
    const menuItemsData =
      json?.data?.cards
        .find((x) => x.groupedCard)
        ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map((x) => x.card?.card)
        ?.filter((x) => x["@type"] == MENU_ITEM_TYPE_KEY)
        ?.map((x) => x.itemCards)
        .flat()
        .map((x) => x.card?.info) || [];

    const uniqueMenuItems = [];
    menuItemsData.forEach((item) => {
      if (!uniqueMenuItems.find((x) => x.id === item.id)) {
        uniqueMenuItems.push(item);
      }
    });
    setMenuItems(uniqueMenuItems);
  } catch (error) {
    setMenuItems([]);
    setRestaurant(null);
    console.log(error);
  }
}

return [restaurant, menuItems]
}

export default useRestaurant;