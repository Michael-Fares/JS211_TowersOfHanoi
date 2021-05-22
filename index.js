// * This js file is incomplete. It will log to the console the elements you click
    // call another function and set stone. You will have to work through the logic
    // of the game as you know it from building it in the terminal. Work through the
    // puzzle slowly, stepping through the flow of logic, and making the game work.
    // Have fun!!
// * First run the program in your browser with live server and double-click on the row you'd like to select an element from.

let stone = null

// this function is called when a row is clicked. 
// Open your inspector tool to see what is being captured and can be used.
const selectRow = (row) => {
  
  const currentRow = row.getAttribute("data-row")
  
  console.log("Yay, we clicked an item", row)
  console.log("Here is the rows's id: ", row.id)
  console.log("Here is the rows's data-size: ", currentRow)
  if(stone) {
  dropStone(row.id)
  } else {
    pickUpStone(row.id)
  }
} 

// this function can be called to get the last stone in the stack
// but there might be something wrong with it...
// why am I having to click twice before this function is invoked??
const pickUpStone = (rowID) => {
  const selectedRow = document.getElementById(rowID);
  let stone = selectedRow.lastChild;
  console.log(stone)
  selectedRow.removeChild(stone)
  console.log('current stone', stone)
}

// You could use this function to drop the stone but you'll need to toggle between pickUpStone & dropStone
// Once you figure that out you'll need to figure out if its a legal move...
// Something like: if(!stone){pickupStone} else{dropStone}

const dropStone = (rowID) => {
  console.log('stone to be dropped', stone)
  document.getElementById(rowID).appendChild(stone)
  stone = null
}

// * Remember you can use your logic from 'main.js' to maintain the rules of the game. But how? Follow the flow of data just like falling dominoes.

