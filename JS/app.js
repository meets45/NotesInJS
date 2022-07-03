// if user adds a note add it to localStorage

let notes = localStorage.getItem("notes");
if (notes == null) {
  notesObj = [];
} else {
  notesObj = JSON.parse(notes);
}

showNotes();
let addTxt = document.getElementById("addTxt");
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  if (addTxt.value != 0) {
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    showNotes();
  } else {
    alert("Enter some text first!");
  }
});

// function to show notes from local storage
function showNotes() {
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
    <div class="noteCard mx-2 my-2 card" style="width: 18rem">
          <div class="card-body">
            <h5 class="card-title">Note ${index + 1}</h5>
            <p class="card-text">${element}</p>
            <button id=${index} onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
          </div>
        </div>
    `;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `No notes to show :( <br>
         Use 'Add a note' section to create your first note `;
  }
}

// function to delete node from given index
function deleteNote(index) {
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

// function to search the notes
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardtxt = element.getElementsByTagName("p")[0].innerText;
    if (cardtxt.toLowerCase().includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
