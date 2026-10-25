const bookInput = document.getElementById("book-input");
const addButton = document.getElementById("add-btn");
const bookList = document.getElementById("book-list");
const totalCount = document.getElementById("total-count");
const completedCount = document.getElementById("completed-count");
const emptyMessage = document.getElementById("empty-message");

let books = [];

function updateStats() {
    totalCount.textContent = books.length;

    const completed = books.filter(book => book.completed).length;
    completedCount.textContent = completed;

    if (books.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }
}

function displayBooks() {
    bookList.innerHTML = "";

    books.forEach((book, index) => {
        const listItem = document.createElement("li");
        listItem.className = "book-item";

        const title = document.createElement("span");
        title.className = "book-title";
        title.textContent = book.title;

        if (book.completed) {
            title.classList.add("completed");
        }

        title.addEventListener("click", () => {
            books[index].completed = !books[index].completed;
            displayBooks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            books.splice(index, 1);
            displayBooks();
        });

        listItem.appendChild(title);
        listItem.appendChild(deleteButton);
        bookList.appendChild(listItem);
    });

    updateStats();
}

function addBook() {
    const bookTitle = bookInput.value.trim();

    if (bookTitle === "") {
        alert("Please enter a book title.");
        return;
    }

    books.push({
        title: bookTitle,
        completed: false
    });

    bookInput.value = "";
    displayBooks();
}

addButton.addEventListener("click", addBook);

bookInput.addEventListener("keypress", event => {
    if (event.key === "Enter") {
        addBook();
    }
});

updateStats();