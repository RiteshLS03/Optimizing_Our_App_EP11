export function filterData(searchText,allRestaurants){
    const filterData = allRestaurants.filter((allRestaurants)=>
    allRestaurants?.info?.name?.toLowerCase()?.includes(searchText?.toLowerCase()));
    return filterData
  }