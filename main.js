const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem ('items')) || [];

function addItem(event){
    event.preventDefault(); // prevent page from refreshing
    const text = (this.querySelector('[name =item]')).value;
    const item  = {
        text ,
        done:false
    }
    items.push(item);
    
    populateList(items, itemsList)
    localStorage.setItem('items',JSON.stringify(items))
    this.reset();
}


function populateList(plates = [], platesList) { 
    platesList.innerHTML = plates.map((plate, index) => {
        return `
    <li>
        <input type ='checkbox' data-index = "${index}"  id = "item${index}"  ${plate.done ? 'checked' : ''}/ >
        <label for="item${index}">${plate.text}</label>
     </li>
    `;
    }).join("");
}

function toggleDone(event){
    if (!event.target.matches('input')){ return } //if the target is not an input return;

    items[event.target.dataset.index].done = !items[event.target.dataset.index].done;
    localStorage.setItem('items', JSON.stringify(items))
    populateList(items, itemsList)
    
}

populateList(items,itemsList)

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
