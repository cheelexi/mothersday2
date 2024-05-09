(() => {
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
        
    ]

    // Add this function definition to create and animate hearts
    function createHearts() {
        const heartsContainer = document.getElementById("hearts-container");

        for (let i = 0; i < 10; i++) { // Adjust the number of hearts as needed
            const heart = document.createElement("div");
            heart.classList.add("heart");
            heartsContainer.appendChild(heart);
        }
    }

    // play on press
    stage.addEventListener('click', _ => {
        if (isPlaying)
            return
        
        isPlaying = true
        song.play()
        title.innerText = ""
        
        setTimeout(() => {
            title.innerText = "You're the..."
            runThroughScreens()
            createHearts(); // Call createHearts() here
        }, 2000)
    })

    function addScreen (options, deleteAfter) {

        console.log(options)

        const imageElementString = `
        <img src="${
            options.image
        }" class="image ${
            options.imageAnimation || ""
        }">
        `
        const textElementString = `
        <div style="${
            options.textColor ?
            `color: ${options.textColor}` :
            ''
        }" class="text ${
            options.textColor || ""
        }">${
            options.text
        }</div>
        `

        const imageElement = stringToDom(imageElementString)
        const textElement = stringToDom(textElementString)

        stage.append(imageElement)
        stage.append(textElement)

        if (deleteAfter) {
            setTimeout(() => {
                imageElement.remove()
                textElement.remove()
            }, screenDuration)
        }
    }

    function runThroughScreens (i = 0) {
        if (i >= screens.length)
            return
        
        addScreen(screens[i], i === screens.length - 1 ? false : true)

        setTimeout(() => {
            runThroughScreens(++i)
        }, screenDuration)
    }

    function stringToDom (htmlString) {
        const dom = new DOMParser()
        const domParsed = dom.parseFromString(htmlString, "text/html")
        return domParsed.body.children[0]
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

    // Add these styles for the hearts
    style.innerHTML += `
        #hearts-container {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        .heart {
            position: absolute;
            width: 20px; /* Adjust size as needed */
            height: 20px; /* Adjust size as needed */
            background-color: red; /* or any other color */
            border-radius: 50%;
            animation: heartbeat 1s infinite alternate; /* Add animation */
        }

        @keyframes heartbeat {
            from {
                transform: scale(1);
            }
            to {
                transform: scale(1.2);
            }
        }
    `;
})();

