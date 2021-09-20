let cardsArr = fetch('cards.json')
    .then(data => data.json())

let container = document.querySelector('.cards-container');
let newCardBtn = document.querySelector('.add-new-card__btn');
let currentCardIndex = 0;


// load cards onload
cardsArr.then((data) => {
    while(true){
        if (container.offsetHeight > window.innerHeight * 1.5) {
            break;
        }
    
        // add new card
        let newCard = document.createElement('div');
        newCard.classList.add('cards__card');
        let newCardImg = document.createElement('div');
        newCardImg.innerHTML = `<img alt='' src='${data[currentCardIndex][0]}'>`;
        newCardImg.classList.add('img');
        let newCardText = document.createElement('div');
        newCardText.innerHTML = `<span>${data[currentCardIndex][1]}</span>`;
        newCardText.classList.add('text');
        newCard.append(newCardImg);
        newCard.append(newCardText);
    
    
        container.append(newCard);
    
        currentCardIndex++;
    }
});


// scroll event 
cardsArr.then(data => window.addEventListener('scroll' , () => addCard(data)))

function addCard(data) {
    // remove event if all cards are shown
    if (currentCardIndex == data.length) return false;

    if (pageYOffset + window.innerHeight * 1.5 >= document.body.offsetHeight) {
        // add new card
        let newCard = document.createElement('div');
        newCard.classList.add('cards__card');
        let newCardImg = document.createElement('div');
        newCardImg.innerHTML = `<img alt='' src='${data[currentCardIndex][0]}'>`;
        newCardImg.classList.add('img');
        let newCardText = document.createElement('div');
        newCardText.innerHTML = `<span>${data[currentCardIndex][1]}</span>`;
        newCardText.classList.add('text');
        newCard.append(newCardImg);
        newCard.append(newCardText);


        container.append(newCard);

        currentCardIndex++;
    }
};


newCardBtn.addEventListener('click' , (e) => {
    if (e.target.tagName == 'SPAN') {
        let imgSrc = newCardBtn.querySelector('.new-card-img');
        let imgText = newCardBtn.querySelector('.new-card-text');

        // check are field filled
        if (imgSrc.value == '' || imgText.value == '') return false;

        let newCardObj = [
            imgSrc.value,
            imgText.value
        ];

        // add new obj to json
        cardsArr.then(data => {
            let array = data;
            array.push(newCardObj);

            // fetch
            return fetch('cards.json',{
                method: 'POST',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": "YOUR_USERNAME",
                    "password": "YOUR_PASSWORD"
                })
            }).then(data => data.text())
            .then(data => console.log(data))
        })

        // reset inputs value
        imgSrc.value = '';
        imgText.value = '';
    }
})

fetch('cards.json',{
    method: 'POST',
    mode: "no-cors",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "username": "YOUR_USERNAME",
        "password": "YOUR_PASSWORD"
    })
}).then(data => data.text())
.then(data => console.log(data))