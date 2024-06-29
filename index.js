const myBookList = [];

const addBookBox = document.createElement("div");

var searchFilter = "";

window.onload = function(){

    addBookBox.classList.add("add-book-background");
    addBookBox.classList.add("occult-box");

    addBookBox.innerHTML=`
        <div class="add-book">
            <form id="add-book-inputs">
                <div class="add-book-text-box">
                    <label for="add-book-title">T&iacute;tulo</label>
                    <input type="text" id="add-book-title" class="add-book-input-text" name="add-book-title" placeholder="T&iacute;tulo do livro..." required>
                </div>

                <div class="add-book-number-box">
                    <div class="add-book-sub-box">
                        <label for="add-book-year">Ano de Publica&ccedil;&atilde;o</label>
                        <input type="number" id="add-book-year" class="add-book-input-number" name="add-book-year" placeholder="0000"  required>
                    </div>

                    <div class="add-book-sub-box">
                        <label for="add-book-pages">Total de P&aacute;ginas</label>
                        <input type="number" id="add-book-pages" class="add-book-input-number" name="add-book-pages" placeholder="99" required>
                    </div>
                </div>

                <div class="add-book-radio-box">
                    <p class='add-book-status-text'>Status</p>

                    <input type="radio" id="add-book-finished" class="add-book-input-radio" name="add-book-status" value="finished" required>
                    <label for="add-book-finished">Completo</label>

                    <input type="radio" id="add-book-reading" class="add-book-input-radio" name="add-book-status" value="reading">
                    <label for="add-book-reading">Lendo</label>

                    <input type="radio" id="add-book-wishlist" class="add-book-input-radio" name="add-book-status" value="wishlist">
                    <label for="add-book-wishlist">Lista de Desejos</label>
                </div>

                <input type="submit" id="add-book-submit" class="add-book-button" value="ENVIAR">
            </form>
        </div>
    `




    document.body.appendChild(addBookBox)

    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('change', function(){
        searchFilter = searchBar.value;
        listBooks()
    })

    const bookForm = document.getElementById("add-book-inputs");
    bookForm.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log()
        const statusRadio = document.getElementsByName('add-book-status');
        let curStatus = "";
        console.log(statusRadio)
        for (let r of statusRadio) {
            if(r.checked){
                curStatus = r.value;
            }
        }

        addBook(document.getElementById("add-book-title").value,document.getElementById("add-book-year").value,document.getElementById("add-book-pages").value,curStatus);
        bookForm.reset();
        toggleAddBook();

    })

    listBooks();
    }   

function Book(title, year, pages, status){
    this.title = title;
    this.year = year;
    this.pages = pages;
    this.status = status;
    this.color1 = getRandomHexcode();
    this.color2 = getRandomHexcode();
}

myBookList.push(new Book("Demian", 1919, 196, "finished"))
myBookList.push(new Book("O Senhor dos Aneis", 1937, 1077, "reading"))
myBookList.push(new Book("Moby Dick", 1851, 653, "wishlist"))


function toggleAddBook(){
    addBookBox.classList.toggle("occult-box")
}

function addBook(title, year, pages, status){
    myBookList.push(new Book(title,year,pages,status))
    listBooks();
}

function listBooks(){

    bookArea = document.getElementById('book-area');
    bookArea.replaceChildren();

    myBookList.forEach((book, index) => {
        if(book.title.toLowerCase().includes(searchFilter.toLowerCase())){
            const newBookCard = document.createElement('div');
            newBookCard.classList.add('book-card-box');

            const removeBook = document.createElement('button');
            removeBook.classList.add('remove-button');
            removeBook.textContent = 'X';
            removeBook.onclick = () => {
                myBookList.splice(index,1);
                listBooks();
            }
            newBookCard.appendChild(removeBook);
            
            const bookCover = document.createElement('div');
            bookCover.appendChild(createBookCover(book.title, book.color1, book.color2));
            bookCover.style.height="12vh";
            bookCover.classList.add('cover-box')
            newBookCard.appendChild(bookCover);

            const bookContent = document.createElement('div');
            bookContent.classList.add('book-content')

            const bookTitleYear = document.createElement('p');
            bookTitleYear.textContent = book.title + ", " + book.year;
            bookContent.appendChild(bookTitleYear);

            const bookPages = document.createElement('p');
            bookPages.textContent = book.pages + " Paginas";
            bookContent.appendChild(bookPages);

            const bookStatus = document.createElement('select');
            bookStatus.classList.add('book-status');

            const bookFinished = document.createElement('option');
            bookFinished.value = "finished";
            bookFinished.textContent = "Completo";
            const bookReading = document.createElement('option');
            bookReading.value = "reading";
            bookReading.textContent = "Lendo";
            const bookWishlist = document.createElement('option');
            bookWishlist.value = "wishlist";
            bookWishlist.textContent = "Lista de Desejos";

            if (book.status == "finished"){
                bookFinished.selected = true;
            }else if(book.status == "reading"){
                bookReading.selected = true;
            }else if(book.status == "wishlist"){
                bookWishlist.selected = true;
            }

            bookStatus.appendChild(bookFinished);
            bookStatus.appendChild(bookReading);
            bookStatus.appendChild(bookWishlist);

            bookStatus.addEventListener('change', function() {
                handleStatus(this, book);
            })


            bookContent.appendChild(bookStatus);

            newBookCard.appendChild(bookContent);
            
            bookArea.appendChild(newBookCard);
        }
    })
}

function handleStatus(element, book){
    book.status = element.value;
    listBooks();
}

function createBookCard(book){
    var newBookCard = document.createElement('div');
    newBookCard.appendChild

}

function getRandomHexcode(){
    var hexcode = Math.floor(Math.random() * 16777215).toString(16);
    return `#${hexcode.padStart(6, '0')}`;
}

function createBookCover(title, c1, c2){
    
    const newCover = document.createElement('div');
    newCover.classList.add('book-cover')

    const decorativeBar1 = document.createElement('div');
    decorativeBar1.style.backgroundColor = c2;
    decorativeBar1.classList.add('book-cover-bar')

    const decorativeBar2 = document.createElement('div');
    decorativeBar2.style.backgroundColor = c2;
    decorativeBar2.classList.add('book-cover-bar')

    const coverCenter = document.createElement('div');
    coverCenter.style.backgroundColor = c1;
    coverCenter.classList.add('book-cover-center')

    const coverLetter = document.createElement('p');
    coverLetter.textContent = title.slice(0,1);
    coverLetter.classList.add("cover-letter");
    coverLetter.style.color = c2;
    coverCenter.appendChild(coverLetter)



    newCover.appendChild(decorativeBar1);
    newCover.appendChild(coverCenter);
    newCover.appendChild(decorativeBar2);
    return newCover;
}