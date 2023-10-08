import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  IMG_CDN_LINK,
  MAIN_Restaurnat_API_URL,
  MENU_ITEM_TYPE_KEY,
  RESTAURANT_TYPE_KEY,
} from "../config";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineClockCircle } from "react-icons/ai";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import MAINRESSHIMMAR from "./MainRestaurantShimmarUI/MAINRESSHIMMAR";

import "./MainRestaurant.css";

const MainRestaurant = () => {
  const params = useParams();
  const { id } = params;
  console.log(params);

  const [restaurant, setRestaurant] = useState(null);
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

  return !restaurant ? (
    <MAINRESSHIMMAR />
  ) : (
    <>
      {/* Got help from the git repo CHE/NA */}
      <div className="restaurant_menu">
        <div className="restaurant_summary">
          <div className="main_restaurant_restaurant-header">
            <div className="info_left">
              <h2>{restaurant?.name}</h2>
              <h5>{restaurant?.cuisines?.join(", ")}</h5>
              <h5>
                {restaurant?.areaName}, {restaurant?.sla?.lastMileTravelString}
              </h5>
            </div>
            <div className="info_right">
              <h4>
                <AiFillStar /> {restaurant?.avgRatingString}
              </h4>
              <h6>{restaurant?.totalRatingsString}</h6>
            </div>
          </div>
          {/* Price and Timing */}
          <div className="main_restaurant_restaurant-body">
            <div className="main_restaurant_restaurant-body_upper">
              <h3>
                <AiOutlineClockCircle />
                {restaurant?.sla?.slaString}
              </h3>
              <h3>
                <HiOutlineCurrencyRupee />
                {restaurant?.costForTwoMessage}
              </h3>
            </div>
          </div>
        </div>
        {/* restaurant lists */}
        <div className="restaurant_lists">
          <div className="menu-items-container">
            <div className="menu-title-wrap">
              <h3 className="menu-title">Recommended</h3>
              <h3 className="menu-count">({menuItems.length})Items</h3>
            </div>
            <div className="menu-items-lists">
              {menuItems.map((item) => (
                <div className="menu-item" key={item?.id}>
                  <div className="menu-item-details">
                    <h4 className="item-title">{item.name}</h4>
                    <p className="item-description">{item?.description}</p>

                    <p>
                      {item?.price > 0
                        ? new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                          }).format(item.price / 100)
                        : " "}{" "}
                    </p>
                  </div>
                  <div className="menu-img-wrapper">
                    <div className="menu-img">{item?.imageId && (
                      <img
                        src={IMG_CDN_LINK + item?.imageId}
                        alt={item?.name}
                      />
                    )}
                    <button className="add-btn">Add +</button>
                    </div>
                    
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainRestaurant;
