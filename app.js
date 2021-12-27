console.log("hello");
showNotes();

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    if (addTxt.value.length != 0) {
        notesObj.push(addTxt.value);
        localStorage.setItem('notes', JSON.stringify(notesObj));
        addTxt.value = "";
        console.log(notesObj);
        showNotes();
    }
})

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html = html +
            `<div class="noteCard card my-2 mx-2" >
                <div class="card-body">
                    <h5 class="card-title">Notes-${index + 1}</h5>
                    <div class="form-group">
                        <textarea class="form-control" id="addTxt" rows="3">${element}</textarea>
                    </div>
                    <button id=${index}  onclick="deleteNotes(this.id)" class="btn btn-primary" id="del">Delete Note</button>
                </div>
            </div>` ;
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to Show! Use "Add a Note" section above to add Notes`;
    }

}

// function to delete notes
function deleteNotes(index) {
    console.log("deleting");
    let notes = localStorage.getItem('notes');
    let notesObj = JSON.parse(notes);
    notesObj.splice(index, 1);
    localStorage.clear();
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

// function to search notes 
let search = document.getElementById('searchTxt');
search.addEventListener('input' , function(){
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let inputVal = search.value.toLowerCase();
        let cardTxt = element.getElementsByTagName("textarea")[0].innerText;
            if(cardTxt.toLowerCase().includes(inputVal)){
                element.style.display = 'block';
            }else{
                element.style.display = 'none';
            }
        })
})

