const key_map = new Map([
    //white:
    ["a", "C3"],["s", "D3"],["d", "E3"],["f", "F3"],["g", "G3"],["h", "A3"],["j", "B3"],["k", "C4"],["l", "D4"],[";", "E4"],["'", "F4"],["4", "G4"],["5", "A4"],["6", "B4"],["+", "C5"],["z", "D5"],["x", "E5"],["c", "F5"],["v", "G5"],["b", "A5"],["n", "B5"],["m", "C6"],[",", "D6"],[".", "E6"],["/", "F6"],["1", "G6"],["2", "A6"],["3", "B6"],

    //black:
    ["q", "Db3"],["w", "Eb3"],["e", "Gb3"],["r", "Ab3"],["t", "Bb3"],["y", "Db4"],["u", "Eb4"],["i", "Gb4"],["o", "Ab4"],["p", "Bb4"],["[", "Db5"],["]", "Eb5"],["7", "Gb5"],["8", "Ab5"],["9", "Bb5"],["-", "Db6"],["*", "Eb6"],["=", "Gb6"],["!", "Ab6"],["@", "Bb6"],
])

const pianoKeys = document.querySelectorAll(".piano-keys .key"),
      keysCheckbox = document.querySelector(".keys-checkbox input"),
      angryMozart = document.getElementById("madmozart1")

let allKeys = [],
    audio = new Audio('tunes/a.wav')

const playTune = (key)=>{
    audio.src = `tunes/${key}.mp3`
    audio.play()

    const clickedKey = document.querySelector(`[data-key="${key}"]`)
    if(clickedKey){
        clickedKey.classList.add("active")
        setTimeout(()=>{
            clickedKey.classList.remove("active")
        }, 150)
    } else{
        console.error(`No element found for key: ${key}`)
    }
}

const handleWrongKey = ()=>{
    angryMozart.style.display = 'block'
    setTimeout(()=>{
        angryMozart.style.display = 'none'
    }, 1000)
}

const checkUserInput = (key)=>{
    if(!allKeys.includes(key)){
        handleWrongKey()
    }
}

pianoKeys.forEach(key=>{
    allKeys.push(key.dataset.key)
    key.addEventListener("click", ()=>{
        const keyPressed = key.dataset.key
        playTune(keyPressed)
        checkUserInput(keyPressed)
    })
})

/*const handleVolume = (e)=>{
    audio.volume = e.target.value
}*/
const volumeUpButton = document.getElementById('volume-up')
const volumeDownButton = document.getElementById('volume-down')
const changeVolume = (increment)=>{
  let newVolume = audio.volume + increment
  if (newVolume > 1) newVolume = 1
  if (newVolume < 0) newVolume = 0
  audio.volume = newVolume

  volumeUpButton.addEventListener('click', ()=>changeVolume(0.1))
  volumeDownButton.addEventListener('click', ()=>changeVolume(-0.1))
}

const showHideKeys = ()=>{
    pianoKeys.forEach(key => key.classList.toggle("hide"))
}

const pressedKey = (e)=>{
    const keyPressed = e.key
    console.log(keyPressed)
    let mp3_file = key_map.get(keyPressed)
    if(allKeys.includes(keyPressed)){
        playTune(mp3_file)
    }else{
        handleWrongKey()
    }
}

keysCheckbox.addEventListener("click", showHideKeys)
document.addEventListener("keydown", pressedKey)