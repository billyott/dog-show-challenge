document.addEventListener('DOMContentLoaded', () => {

const DOGURL = 'http://localhost:3000/dogs'

//************* html elements *************
const dogTableBody = document.querySelector('#table-body')
const editForm = document.querySelector('#dog-form')

//************* functions *************

function renderDogRow(dog) {
    const dogTr = document.createElement('tr')
    dogTr.dataset.id = dog.id
    
    const nameTd = document.createElement('td')
    nameTd.textContent = `${dog.name}`
    
    const breedTd = document.createElement('td')
    breedTd.textContent = `${dog.breed}`
    
    const sexTd = document.createElement('td')
    sexTd.textContent = `${dog.sex}`
    
    const editTd = document.createElement('td')
    
    const editButton = document.createElement('button')
    editButton.innerText = 'Edit Dog'
    editButton.addEventListener('click', (e) => {
        handleEditButton(dog)
    })
    
    editTd.append(editButton)
    dogTr.append(nameTd, breedTd, sexTd, editTd)
    dogTableBody.append(dogTr)

}

function renderDogRows() {
    fetch(DOGURL)
    .then(resp => resp.json())
    .then(dogs => {
        dogs.forEach(dog => {
            renderDogRow(dog)
        });
    })
}

function handleEditButton(dog) {
    editForm.name.value = dog.name
    editForm.breed.value = dog.breed
    editForm.sex.value = dog.sex
    editForm.dataset.id = dog.id
    
}

function init() {
    renderDogRows()
}

editForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const updatedDog = {
        name: e.target.name.value,
        breed: e.target.breed.value,
        sex: e.target.sex.value
    }

    fetch(DOGURL+`/${e.target.dataset.id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(updatedDog)
    })
    .then(resp => resp.json())
    .then(dog => {
        console.log("Success",dog)
        dogTableBody.innerHTML = ''
        renderDogRows()
        e.target.reset()
        e.target.dataset.id = ''
    })
})

//************* init *************
init()

})