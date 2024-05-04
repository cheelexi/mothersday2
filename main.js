const flower = {
    image: "img/flower.png",
    imageAnimation: "fadeIn",
    text: "Here is your flower",
    textAnimation: "fadeIn",
    textColor: "#E07CA0"
};

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
            imageAnimation: "spinImage",
            text: "You Are the Most...",
            textAnimation: "fade",
            textColor: "#4169e1"
        },
        {
            image: "img/caring.png",
            imageAnimation: "growSpinImage",
            text: "Most Caring🥹",
            textAnimation: "fade",
            textColor: "#ff781f"
        },
        {
            image: "img/flowermom.jpg",
            imageAnimation: "fade",
            text: "the cutest😅",
            textAnimation: "fade",
            textColor: "#00a86b"
        },
        {
            image: "img/Youngme.JPG",
            imageAnimation: "spinImage",
            text: "Most Patient😡",
            textAnimation: "fade",
            textColor: "#663399"
        },
        {
            image: "img/kissmom.png",
            imageAnimation: "spinImage",
            text: "Most loving🥳",
            textAnimation: "fadein",
            textColor: "#663399"
        },
        {
            image: "img/patient.png",
            imageAnimation: "spinImage",
            text: "Mother🤩",
            textAnimation: "fadein",
            textColor: "#663399"
        },
        {
            image: "img/family.JPG",
            imageAnimation: "fadeIn",
            text: "我们是快乐一家子🥰",
            textAnimation: "fadeIn",
            textColor: "#E07CA0"
        },
        {
            image: console.log(flower.image),
            text: console.log(flower.text),
            textColor: console.log(flower.textColor)
        },
        
    ]
    
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

})()
