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

// I think the next think I need to do is define these more dynamically eg startStack = stacks['argument1'], endStack = stacks[argument2]
// Next, what do you think this function should do?
const movePiece = (startStack, endStack) => {
  // define the 'piece' to be moved as the number popped off of the start stack array.
  // why is it not recognizing the pop method here??
  let piece = stacks[startStack].pop()
  // use the push method to add that piece to the end of the end stack array
  stacks[endStack].push(piece)
}




const isLegal = (startStack, endStack) => {
  // define the 'piece' to be moved as the number popped off of the start stack array.
  startStack = stacks[startStack]
  endStack = stacks[endStack]
  let piece = startStack.pop()
  // push the piece back on top of the original array, because we are only trying to see if the move would be legal, we don't want to mutuate the array by actually popping anyting in this function
  startStack.push(piece)
  
  // if the piece is going to be larger than any number already in the stack array it is supposed to be placed on, then don't allow it to be placed there, e.g. return "false" to signal an illegal move, else return true for legal move. First check to see if the end stack length does not equal zero, eg if the end stack is empty, then the move by deault it legal

  // is it only the of moving to an empty peg that it won't recognize the move as legal for some reason
  for (let i =0; i<= endStack.length; i++) {
    if (endStack.length === 0) {
      return true
    } else if (piece < endStack[i +1]) {
      return true
    }
     else {
      return false
    }
  }
}

// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {
  // first convert the object key values to strings, so it is straightforward to test if they are strictly equal to a win eg '4,3,2,1'
  let winInB = stacks.b.toString()
  let winInC = stacks.c.toString()
 
  if (winInB === '4,3,2,1' || winInC === '4,3,2,1') {
    console.log('You won!')
    return true
  } else {
    return false
  }
 }

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  
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
