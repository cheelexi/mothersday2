// Listen for click on "Click to Start" button
document.getElementById("title").addEventListener('click', function() {
    // Hide the "Click to Start" text
    document.getElementById("title").style.display = "none";
    // Show the puzzle container and shuffle button
    document.getElementById("puzzle-container").style.display = "block";
    document.getElementById("shuffle-btn").style.display = "block";
});


// variables
const song = new Audio("sounds/xiaomeiman.mp3")
const stage = document.getElementById("stage")
const title = document.getElementById("title")
const screenDuration = 5000 // ms
let isPlaying = false
const screens = [
    {
        image: "img/mompic.png",
        imageAnimation: "growSpinImage",
        text: "Most Caring 🥹",
        textAnimation: "fade",
        textColor: "#ff781f"
    },
    {
        image: "img/flowermom.jpg",
        imageAnimation: "fade",
        text: "the cutest 😂",
        textAnimation: "fade",
        textColor: "#00a86b"
    },
    {
        image: "img/Youngme.JPG",
        imageAnimation: "spinImage",
        text: "Most Patient 😡",
        textAnimation: "fade",
        textColor: "#663399"
    },
    {
        image: "img/kissmom.png",
        imageAnimation: "spinImage",
        text: "Most loving 🥳",
        textAnimation: "fadein",
        textColor: "#663399"
    },
    {
        image: "img/family.JPG",
        imageAnimation: "fadeIn",
        text: "Happy Family🥰",
        textAnimation: "fadeIn",
        textColor: "#E07CA0"
    },
    {
        image: "img/flower.png",
        imageAnimation: "fadeIn",
        text: "送你一束花🌹",
        textAnimation: "fadeIn",
        textColor: "#E07CA0"
    },
];

// play on press
stage.addEventListener('click', _ => {
    if (isPlaying)
        return;
    
    isPlaying = true;
    song.play();
    title.innerText = "";

    // Wait for the puzzle to be solved
    document.addEventListener('puzzleSolved', startMainAnimation);
    
    setTimeout(() => {
        title.innerText = "You're the..."
        runThroughScreens();
    }, 2000);
});

function addScreen(options, deleteAfter) {
    console.log(options);

    const imageElementString = `
    <img src="${options.image}" class="image ${options.imageAnimation || ""}">
    `;
    const textElementString = `
    <div style="${options.textColor ? `color: ${options.textColor}` : ''}" class="text ${options.textColor || ""}">
        ${options.text}
    </div>
    `;

    const imageElement = stringToDom(imageElementString);
    const textElement = stringToDom(textElementString);

    stage.append(imageElement);
    stage.append(textElement);

    if (deleteAfter) {
        setTimeout(() => {
            imageElement.remove();
            textElement.remove();
        }, screenDuration);
    }
}

function runThroughScreens(i = 0) {
    if (i >= screens.length)
        return;
    
    addScreen(screens[i], i === screens.length - 1 ? false : true);

    setTimeout(() => {
        runThroughScreens(++i);
    }, screenDuration);
}

function stringToDom(htmlString) {
    const dom = new DOMParser();
    const domParsed = dom.parseFromString(htmlString, "text/html");
    return domParsed.body.children[0];
}

// CSS styles for centering images
const style = document.createElement('style');
style.innerHTML = `
    .image {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-width: 100%;
        max-height: 100%;
    }
    @media only screen and (max-width: 600px) {
        /* Adjust the size and position of the image for smaller screens */
        .image {
            width: 80%; /* Adjust the width as needed */
            height: auto; /* Maintain aspect ratio */
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
`;
document.head.appendChild(style);

function startMainAnimation() {
    // Your code to start the main animation
    // For example:
    // title.innerText = "";
    // runThroughScreens();
}
