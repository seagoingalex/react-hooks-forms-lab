import { React, useState } from "react";
import { v4 as uuid } from "uuid";
// The `uuid` library can be used to generate a unique id
function ItemForm({ onItemFormSubmit }) {

  // Create hooks to render a CONTROLLED form
  const [itemName, setName] = useState("")
  const [itemCategory, setCategory] = useState("Produce")

  // Handle the form name input
  function handleNameInput(e) {
    setName(e.target.value)
  }
    
  // Handle the form category input
  function handleCategorySelect(e) {
    setCategory(e.target.value)
  }  

  // Declare the callback function when a new grocery item is submitted
  function formSubmit(e) {
    //It's a form, so always do your preventDefault()
    e.preventDefault();
    // Create a new grocery based on the things that were input
    // into the controlled form 
    const newGrocery = { 
      id: uuid(),
      name: itemName, 
      category: itemCategory }  
    // And run the function passed in as a property to update the 
    // grocery list array in the ShoppingList component!
    onItemFormSubmit(newGrocery)
  }

  return (
    <form onSubmit={formSubmit} className="NewItem">
      <label>
        Name:
        <input onChange={handleNameInput} type="text" name="name" value = {itemName} />
      </label>

      <label>
        Category:
        <select onChange={handleCategorySelect} value={itemCategory} name="category">
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
