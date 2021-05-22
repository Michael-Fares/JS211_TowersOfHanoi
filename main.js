'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// In all functions, use bracket notation to define and access startStack and endStack dynamically eg startStack = stacks[startStack // can be a or b or c depending on user input], endStack = stacks[endStack // can be a or b or c depending on user input ]

// Next, what do you think this function should do?
const movePiece = (startStack, endStack) => {
  // define the 'piece' to be moved as the number popped off of the start stack array.
  let piece = stacks[startStack].pop()
  // To 'move' the piece use the push method to add that piece to the end of the end stack array.
  stacks[endStack].push(piece)
}

const isLegal = (startStack, endStack) => {
// store the stack arrays to be accessed in varibales, to make the array methods below easier to visualize and work with.
  startStack = stacks[startStack]
  endStack = stacks[endStack]

  // define the piece to be tested for a legal move as the last item in the startStack array, using array.length-1, which will always access last item in array, but not mutate it.
  let piece = startStack[startStack.length-1]
  
  for (let i =0; i<= endStack.length; i++) {
     // Allowing a legal move: First check to see if the end stack length does not equal zero, eg if the end stack is empty, then the move by deault is legal
    if (endStack.length === 0) {
      return true
        // Not allowing an illegal move: if the piece is going to be less than any number already in the end stack array it is supposed to be placed on, then then this is a legal move, so return true for legal move. Else, don't allow it to be placed there, e.g. return "false" to signal an illegal move. 
    } else if (piece < endStack[i]) {
      return true
    }
     else {
      return false
    }
  }
}


const checkForWin = () => {
  // What is a win in Towers of Hanoi? When should this function run?
  // first convert the object key values to strings, so it is straightforward to test if they are strictly equal to a win eg '4,3,2,1'
  // checkForWin should run after every legal move. 
  let winInB = stacks.b.toString()
  let winInC = stacks.c.toString()
 
  // if the user acheives a win by moving all pieces in same order to either stack b (WinInB) or stack c (WinInC), return true for a win. Else, return false.
  if (winInB === '4,3,2,1' || winInC === '4,3,2,1') {
    console.log('You won!')
    return true
  } else {
    return false
  }
 }

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  // Check if the move is legal by calling the isLegal function.  
  // If so, then move the piece by calling the move piece function, and then check for a win
  // else, tell the user the move is illegal
  if(isLegal(startStack, endStack)){
   movePiece(startStack,endStack)
   checkForWin()
  } else {
    console.log('You cannot put a bigger piece on top of a smaller one')
  }
}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
