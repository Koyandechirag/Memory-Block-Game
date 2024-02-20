document.querySelector(".control-buttons span").onclick = function () {
    // Promp window to ask for name
    let yourName = prompt("What's Your Name?");

    if (yourName == null || yourName == "") {
        document.querySelector(".name span").innerHTML = 'Unknow';
    }else {
        document.querySelector(".name span").innerHTML = yourName;
    }

    // Remove splash screen
    document.querySelector(".control-buttons").remove();
};

let duration = 1000;

let blocksContainer = document.querySelector(".memory-game-blocks");

// Create Array from game blocks
let blocks = Array.from(blocksContainer.children);


// Create range of keys
let orderRange = Array.from(Array(blocks.length).keys());

shuffle(orderRange);


// Add order Css property to game blocks
blocks.forEach((block, index) => {
    block.style.order = orderRange[index];

    // Add Css Order Property
    block.style.order = orderRange[index];

    // Add Click Event
    block.addEventListener('click', function() {

        // Trigger the Flip block function
        flipBlock(block);
    });

});


// Flip Block Function
function flipBlock (selectedBlock) {

    // Add Class is-flipped
   selectedBlock.classList.add('is-flipped');

    // Collect All flipped cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    // If there Two Selected Blocks
    if (allFlippedBlocks.length == 2) {

        // Stop clicking function
        stopClicking();

        // Check Matched Block Function
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}

// Stop clicking function
function stopClicking() {

    // Add Class No Clicking on Main Container
    blocksContainer.classList.add('no-clicking');

    setTimeout(() => {

        // Remove Class No Clicking After the Duration
        blocksContainer.classList.remove('no-clicking');

    }, duration);
}

// Check Matched Block
function checkMatchedBlocks(firstBlock, secondBlock) {
    let triesElement = document.querySelector('.tries span');

    if (firstBlock.dataset.technology == secondBlock.dataset.technology) {

        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
        
        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

        document.getElementById('success').play();

    } else {

        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {

            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');

        }, duration);

        document.getElementById('fail').play();
    }
}


// Shuffle function
function shuffle (array) {

    // Setting Vars
    let current = array.length,
        temp,
        random;

    while (current > 0) {

        // Get Random Number
        random = Math.floor(Math.random() * current);

        // Decrease Length By One 
        current--;

        // [1] Save Current Element in Stash
        temp = array[current];

        // [2] Current Element = Random Element
        array[current] = array[random];

        // [3] Random Element = Get Element from Stash 
        array[random] = temp;
    }

    return array;
}


// Current Array [9, 2, 10, 4, 5, 6, 7, 3, 1, 8]

/*
[1] Save Current Element in Stash
[2] Current Element = Random Element
[3] Rnadom Element = Get Element from Stash 
*/
