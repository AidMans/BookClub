const dashboardTableWrapper = document.getElementById("dash-table");
const wrapper = document.getElementById("wrapper");
const loader = document.getElementById("loader");

function renderAllBooks(bookList) {
    dashboardTableWrapper.innerHTML = "";
    dashboardTableWrapper.insertAdjacentHTML("afterbegin", `
        <table>
            <tr>
                <th>#id</th>
                <th>Title</th>
                <th>Author</th>
                <th>Publisher</th>
                <th>Price</th>
                <th> 
                <img src="./assets/icons/cancel.svg" alt="add" class="book-details-modal__add" id="book-details-modal-add" style="cursor: pointer">
                </th>
            </tr>
        </table>
    `);
    bookList.map(book => {
        dashboardTableWrapper.firstElementChild.insertAdjacentHTML("beforeend", `
            <tr>
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.publisher}</td>
                <td>$${book.price}</td>
                <td>
                    <img src='./assets/icons/delete.svg' style="cursor: pointer;" id="delete-book-${book.id}">
                    <img src='./assets/icons/pencil.svg' style="cursor: pointer;" id="edit-book-${book.id}">
                </td>
            </tr>
        `)
    })

}


function fetchAllBooks() {
    loader.style.display = "block";

    axios.get("http://localhost:3000/api/books")
        .then(response => {
            renderAllBooks(response.data);
            loader.style.display = "none"
        })
        //.catch(err => console.log(err))
}

(function getActiveNavItem() {
    const booksTab = document.getElementById("books-dash");
    const authorsTab = document.getElementById("authors-dash");
    const usersTab = document.getElementById("users-dash");
    booksTab.className = "dashboard__navigation__active";

    fetchAllBooks();

    booksTab.addEventListener('click', () => {
        authorsTab.className = "";
        usersTab.className = "";
        booksTab.className = "dashboard__navigation__active";
        fetchAllBooks();
    });

    authorsTab.addEventListener('click', () => {
        booksTab.className = "";
        usersTab.className = "";
        authorsTab.className = "dashboard__navigation__active";
    });

    usersTab.addEventListener('click', () => {
        booksTab.className = "";
        authorsTab.className = "";
        usersTab.className = "dashboard__navigation__active";
    })

})();