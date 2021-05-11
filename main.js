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
let startStack = stacks.a
let endStack = stacks.b
// Next, what do you think this function should do?
const movePiece = () => {

  // define the 'piece' to be moved as the number popped off of the start stack array.
  const piece = startStack.pop()
  // use the push method to add that piece to the end of the end stack array
  
  endStack.push(piece)

}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = () => {
  // define the 'piece' to be moved as the number popped off of the start stack array.
  const piece = startStack.pop()
  
  // if the piece is going to be larger than any number already in the stack array it is supposed to be placed on, then don't allow it to be placed there, e.g. return "false" to signal an illegal move, else return true for legal move.
  for (let i =0; i<= endStack.length; i++) {
    if (piece > i) {
      return false
    } else {
      return true
    }
  }
}

// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {

}

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  if(isLegal) {
    movePiece()
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
