import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  // Set up hook so selecting a category dynamically filters the 
  // grocery list
  const [selectedCategory, setSelectedCategory] = useState("All");
  // Set up hook for filtering shopping list when searching for an item
  const [searchQuery, setFilterByQuery] = useState("")
  // Set up hook for the new grocery submit state
  const [allGroceryData, setSubmittedData] = useState(items)

  // Handle the addition when a new grocery has been submitted and add to
  // the array
  function handleSubmit(newGrocery) {
    const newGroceryArray = [...allGroceryData, newGrocery]
    setSubmittedData(newGroceryArray)
  }
  
  // Handle the search filter state
  function handleSearchFilter(e) {
    setFilterByQuery(e.target.value)
  }

  // Create a binding that filters ALL THE GROCERY DATA (including new
  // form submissions) based on the search query. .includes allows for
  // partial case matching!
  const itemsFilteredBySearch = allGroceryData.filter((item) => {
    if (searchQuery === "") {
      return item;
    } else if (item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return item;
    }
  })

  // Handles the selected category state
  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  // Builds off of the search query filter to subsequently filter if
  // a category is selected
  const itemsToDisplay = itemsFilteredBySearch.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });


  return (
    <div className="ShoppingList">
      <ItemForm 
        onItemFormSubmit = {handleSubmit}
      />
      <Filter 
        search={searchQuery}
        category={selectedCategory}
        onSearchChange={handleSearchFilter} 
        onCategoryChange={handleCategoryChange} 
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
