// if user adds a note add it to localStorage

let notes = localStorage.getItem("notes");
if (notes == null) {
  notesObj = [];
} else {
  notesObj = JSON.parse(notes);
}
showNotes();
let addTitle = document.getElementById("addTitle");
let addTxt = document.getElementById("addTxt");
let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", function (e) {
  if (addTxt.value.length != 0) {
    if (addTitle.value.length != 0) {
      combined = Array(addTitle.value, addTxt.value);
      notesObj.push(combined);
      localStorage.setItem("notes", JSON.stringify(notesObj));
      addTitle.value = "";
      addTxt.value = "";
      showNotes();
    } else {
      combined = Array(addTxt.value);
      notesObj.push(combined);
      localStorage.setItem("notes", JSON.stringify(notesObj));
      addTxt.value = "";
      showNotes();
    }
  } else {
    alert("Enter some text first!");
  }
});

// function to show notes from local storage
function showNotes() {
  let html = "";
  notesObj.forEach(function (element, index) {
    if (element.length == 2) {
      html += `
        <div class="noteCard mx-2 my-2 card col-md-3" style="background-color: #282828">
              <div class="card-body">
                <h5 class="card-title" style="color: #b1b1b1">${element[0]}</h5>
                <p class="card-text">${element[1]}</p>
                <button id=${index} onclick="deleteNote(this.id)" class="btn btn-danger">Delete</button>
              </div>
            </div>
        `;
    } else {
      html += `
        <div class="noteCard mx-2 my-2 card col-md-3" style="background-color: #282828">
            <div class="card-body">
                <h5 class="card-title" style="color: #b1b1b1">Note ${
                  index + 1
                }</h5>
                <p class="card-text">${element[0]}</p>
                <button id=${index} onclick="deleteNote(this.id)" class="btn btn-danger">Delete</button>
              </div>
            </div>
        `;
    }
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `No notes to show :( <br>
         Use 'Create a Note' section to create your first note `;
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
    let titleText = element.getElementsByTagName("h5")[0].innerText;
    let cardtxt = element.getElementsByTagName("p")[0].innerText;
    if (
      cardtxt.toLowerCase().includes(inputVal) ||
      titleText.toLowerCase().includes(inputVal)
    ) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
