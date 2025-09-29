const bookForm = document.getElementById('book-form');
const bookList = document.getElementById('book-list').getElementsByTagName('tbody')[0];
let books = [];
let editIndex = null;

function renderBooks() {
    bookList.innerHTML = '';
    books.forEach((book, idx) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.year}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editBook(${idx})">Sửa</button>
                <button class="action-btn delete-btn" onclick="deleteBook(${idx})">Xóa</button>
            </td>
        `;
        bookList.appendChild(row);
    });
}


bookForm.onsubmit = function(e) {
    e.preventDefault();
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const year = document.getElementById('year').value;
    if (editIndex !== null) {
        books[editIndex] = { title, author, year };
        editIndex = null;
        document.getElementById('add-btn').textContent = 'Thêm sách';
    } else {
        books.push({ title, author, year });
    }
    bookForm.reset();
    renderBooks();
};

document.getElementById('reset-btn').onclick = function() {
    bookForm.reset();
    editIndex = null;
    document.getElementById('add-btn').textContent = 'Thêm sách';
};

window.editBook = function(idx) {
    const book = books[idx];
    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('year').value = book.year;
    editIndex = idx;
    document.getElementById('add-btn').textContent = 'Cập nhật';
};

window.deleteBook = function(idx) {
    if (confirm('Bạn có chắc muốn xóa sách này?')) {
        books.splice(idx, 1);
        renderBooks();
    }
};

renderBooks();
