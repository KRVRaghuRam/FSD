let books = JSON.parse(localStorage.getItem("books")) || [];

function displayBooks() {
    let list = document.getElementById("bookList");
    list.innerHTML = "";

    books.forEach((book, index) => {
        let row = `
            <tr>
                <td>${book.name}</td>
                <td>${book.author}</td>
                <td>
                    <button class="delete" onclick="deleteBook(${index})">Delete</button>
                </td>
            </tr>
        `;
        list.innerHTML += row;
    });
}

function addBook() {
    let name = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;

    if (name === "" || author === "") {
        alert("Enter all fields");
        return;
    }

    books.push({ name, author });
    localStorage.setItem("books", JSON.stringify(books));

    document.getElementById("bookName").value = "";
    document.getElementById("author").value = "";

    displayBooks();
}

function deleteBook(index) {
    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));
    displayBooks();
}

// Load books on page load
displayBooks();