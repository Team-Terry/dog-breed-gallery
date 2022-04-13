
const selectDog = document.getElementById('dogSelect');
const container =  document.querySelector('.container');
let imageDog;

//get dog list in select input
const getDogsList = async () => {
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    const data = await response.json();
    return data;
};
getDogsList()
    .then(data => {
        let breeds = data.message;
        Object.entries(breeds).forEach(name => {
            if(name[1].length > 0) {
                name[1].forEach((el) => {
                    selectDog.insertAdjacentHTML('beforeEnd', `<option class="dogBreed" value="${name[0]} ${el}">${name[0]} ${el}</option>`);
                });
            } else {
                selectDog.insertAdjacentHTML('beforeEnd', `<option class="dogBreed" value="${name[0]}">${name[0]}</option>`);
            }
        }); 
    })
    .catch(err => console.log('rejected:', err.message));

//get picture of dog of specyfic breed
const getDogPicture = async (dog) => {
    //constucting the slug of dog breed
    if(dog.includes(" ")) {
        dog =  dog.replace(/\s+/g, '/').toLowerCase();
    } else {
        dog =  dog.toLowerCase();
    }
    const response = await fetch(`https://dog.ceo/api/breed/${dog}/images/random`);

    const data = await response.json();
    return data;
};
//when page loads show picture of first breed from the list
getDogPicture('affenpinscher')
.then(data => {
    imageDog = document.createElement('img');
    imageDog.classList.add('dogImage');
    imageDog.alt = 'affenpinscher';
    imageDog.src = data.message;
    container.appendChild(imageDog);
})
.catch(err => console.log('rejected:', err.message));

//while selecting breed get the source url of the picture and set breed should be viewed
selectDog.addEventListener('change', (e) => {
    const breedName = e.target.value;
    getDogPicture(breedName)
    .then(data => {
        imageDog.alt = breedName;
        imageDog.src = data.message;
    })
    .catch(err => console.log('rejected:', err.message));
});
 


//Fetching the random dog picture at the start of the app
/* const getRandomDog = async () => {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    return data;
};
getRandomDog()
.then(data => {
    imageDog = document.createElement('img');
    imageDog.classList.add('dogImage');
    imageDog.alt = 'random dog image';
    imageDog.src = data.message;
    console.log(imageDog);
    header.appendChild(imageDog);
})
.catch(err => console.log('rejected:', err.message)); */




