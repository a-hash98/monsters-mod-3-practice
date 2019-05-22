const MONSTERS_URL = 'http://localhost:4000/monsters'

const MONSTERS_URL_50 = 'http://localhost:4000/monsters/?_limit=50'
const container = document.querySelector('#monster-container')

const formMain = document.querySelector('#create-monster')

function createMonster(){
    const name = document.querySelector('#name').value
    const age = document.querySelector('#age').value 
    const desc = document.querySelector('#description').value
    
    fetch(MONSTERS_URL,{
     method: 'POST',
      headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: name,
        age: age,
        desc: desc
    })
    }).then(resp => resp.json())

}

function addMonster(){
    const nameField = '<input required name= "name" type= "text" id= "name" placeholder="name">'
    const ageField = '<input required name= "age" type= "text" id= "age" placeholder="age">'
    const descField = '<input required name= "description" type= "text" id= "description" placeholder="description">'
    const addButton = '<button id= "add"> Create Monster</button>'
    
    formMain.innerHTML += nameField
    formMain.innerHTML += ageField
    formMain.innerHTML += descField
    formMain.innerHTML += addButton

   document.querySelector('#add').addEventListener('click', createMonster)
}

function renderMonsters(monsters){
    monsters.forEach(monster => {
        let li = document.createElement('li')
        li.innerHTML = `<h2>Name: ${monster.name}</h2>
                        <p>Age: ${monster.age}</p>
                        <p> ID: ${monster.id}</p>
                        <p>Description: ${monster.description}</p>`
        container.append(li)
    })
}

function getMonsters(url){
    fetch(url)
    .then(resp => resp.json())
    .then(monsters => renderMonsters(monsters))
} 

let pgRecord = 1

function forwardBackButtons(){
    const forward = document.querySelector('#forward')
    if (pgRecord === 21){
        forward.disabled = true 
    }
    forward.addEventListener('click', nextPage)
    const back = document.querySelector('#back')
    
    if (pgRecord === 1){
        back.disabled = true
    } else {
        back.disabled = false
    }
    back.addEventListener('click', previousPage)
    //const back = document.querySelector('#back')
}

function nextPage(){
    let lis = document.querySelectorAll('li')
    //console.log(lastPage())
    lis.forEach(li => li.remove())
    pgRecord++
    getMonsters(`${MONSTERS_URL_50}&_page=${pgRecord}`)
    forwardBackButtons()
}

function previousPage(){
    let lis = document.querySelectorAll('li')
    lis.forEach(li => li.remove())
    pgRecord--
    getMonsters(`${MONSTERS_URL_50}&_page=${pgRecord}`)
    forwardBackButtons()
}

function init(){
    addMonster()
    getMonsters(MONSTERS_URL_50)
    forwardBackButtons()
}

init()



