import React  from "react";

import { IMG_CDN_LINK } from "../config";
import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineClockCircle } from "react-icons/ai";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import MAINRESSHIMMAR from "./MainRestaurantShimmarUI/MAINRESSHIMMAR";
import useRestaurant from "../../utils/useRestaurant";


import "./MainRestaurant.css";

const MainRestaurant = () => {
  const params = useParams();
  const { id } = params;
  const [restaurant , menuItems] = useRestaurant(id);

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
