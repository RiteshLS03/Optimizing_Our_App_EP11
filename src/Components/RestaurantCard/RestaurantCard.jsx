import React from "react";
import "./RestaurantCard.css";
import { IMG_CDN_LINK } from "../config";
import {AiFillStar} from "react-icons/ai"

function RestaurantCard({ restaurant }) {
  const { name , costForTwo, cuisines , cloudinaryImageId  , avgRatingString} = restaurant?.info
  return (
    <div className="card-data" id={restaurant?.info?.id} >
      <img
        src={
          IMG_CDN_LINK +
          cloudinaryImageId
        }
      />
      {/*image*/}
      <div className="cardinfo">
        <h4 className="cardinfo_name">{name}</h4> {/*restaurantName*/}
        <div className="restaurant_price-rating">
        <h3>{costForTwo}</h3> {/*price */}
        <h3 className="cardinfo_ratings"><AiFillStar />{avgRatingString}</h3>{/*  */}
        </div>
        <h3 className="cardinfo_cuisines">{cuisines.join(", ")}</h3> {/* cuisines */}
      </div>
    </div>
  );
}

export default RestaurantCard;

