// const notesEl = document.querySelector(".notes");


const addBtn = document.getElementById('add');

var notes = JSON.parse(localStorage.getItem('notes'));

if(notes){
    notes.forEach(note => {
        addNewNote(note);
    });
}

addBtn.addEventListener("click", ()=>{
    addNewNote();
});

async function addNewNote(text = "") {
    const note = document.createElement('div');
    note.classList.add('notes');

    note.innerHTML = `<!--<h1>Notes App</h1>-->
    <div>
        <div class="tools">
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="main ${text ? "" : "hidden"}">
            
        </div>
        <textarea class="${text ? "hidden" : ""}"></textarea>
        
    </div>`;


    const editBtn = note.querySelector(".edit");
    const deleteBtn = note.querySelector(".delete");
    const main = note.querySelector(".main");
    const textArea = note.querySelector("textarea");

    textArea.value = text;
    main.innerHTML = marked(text);

    editBtn.addEventListener("click", () => {
        main.classList.toggle("hidden");
        textArea.classList.toggle("hidden");
    });

    deleteBtn.addEventListener('click', ()=> {
        note.remove();
        updateLS();
    });
    
    textArea.addEventListener("input", (e) => {
        const { value } = e.target;
        main.innerHTML = marked(value);
        updateLS();
    });

    
    document.body.appendChild(note);
}

async function updateLS(){
    const notesText = document.querySelectorAll('textarea');

    const notes = [];

    notesText.forEach(note => {
        notes.push(note.value);
    });
    console.log(notes);
    localStorage.setItem('notes', JSON.stringify(notes));
}

