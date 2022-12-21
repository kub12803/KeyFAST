//store API url
const API_URL = 'https://random-word-api.herokuapp.com/word?number=5'

// have html parsed first
document.addEventListener("DOMContentLoaded", function() {
    const wordDisplayElement = document.getElementById('wordBlock')
    let inputField = document.getElementById('wordInput')
    let lettersCorrect = 0
    let startTime = 60 // seconds

    inputField.addEventListener('input', () => {
        startTimer()
    }, {once: true})

    inputField.addEventListener('input', () => {
        const arrayLetter = wordDisplayElement.querySelectorAll('span')
        const letterInput = inputField.value.split('')

        arrayLetter.forEach((charSpan, index) => {
            const character = letterInput[index]
            if (character == null) 
            {
                if (lettersCorrect > 0)
                {
                    lettersCorrect--
                }
                charSpan.classList.remove('correct')
                charSpan.classList.remove('incorrect')
            }
            else if (character == charSpan.innerText) 
            {
                if (character == ' ')
                {
                    lettersCorrect--
                }
                charSpan.classList.add('correct')
                charSpan.classList.remove('incorrect')
                lettersCorrect++
                console.log(lettersCorrect)
            }
            else 
            {
                charSpan.classList.add('incorrect')
                charSpan.classList.remove('correct')
            }
        })
    })

    console.log("score: " + getScore(lettersCorrect))

    // fetch api
    function getWords() 
    {
        return fetch(API_URL)
            .then(res => res.json())
    }

    // timer
    function startTimer() {
        var timeRemaining = startTime
      setInterval(() => {
        if (timeRemaining === 30)
        {
            inputField.setAttribute('disabled', true)
            return
        }
        timeRemaining -= 1
        timer.innerText = timeRemaining
      }, 1000)
      
    }

    function getScore(letters)
    {
        score = Math.floor(letters / 2)
        return score
    }

    // render words
    async function renderWords() 
    {
        const words = [];
        words.push(await getWords());
        text = "";
        for (let i = 0; i < words.length; i++)
        {
            text += words[i];
        }
        str = text.replaceAll(',', ' ');
        str.split('').forEach(character => {
            const charSpan = document.createElement('span')
            charSpan.innerText = character;
            wordDisplayElement.appendChild(charSpan);
        })
        document.getElementById('loader').style.display = 'none'
    }
    renderWords();
});