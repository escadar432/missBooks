import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyCar,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.vendor))
            }
            if (filterBy.minSpeed) {
                books = books.filter(book => book.speed >= filterBy.minSpeed)
            }
            return books
        })

}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyCar(vendor = '', speed = '') {
    return { vendor, speed }
}

function getDefaultFilter() {
    return {
        txt: '',
        minSpeed: '',
    }
}

function _createBooks() {
    let books = loadFromStorage(BOOK_KEY)
    if (!books || !books.lengt)
        books = [
            _createBook('Nature', 'ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia', './book-imgs/15.jpg', 150, 'NIS'),
            _createBook('Rat Away', 'ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit', './book-imgs/16.jpg', 72, 'NIS'),
            _createBook('Pride and Prejudice', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt', 'src-png', 130, 'NIS'),
            _createBook('Jane Eyre', 'ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia', './BooksImages/15.jpg', 96, 'NIS', true),
            _createBook('Treasure Island', 'ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia', './BooksImages/15.jpg', 90, 'NIS'),
            _createBook('Don Quixote', 'ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia', './BooksImages/15.jpg', 60, 'NIS'),
        ]
    saveToStorage(BOOK_KEY, books)
    return books
}

function _createBook(title, description, thumbnail, amount, currencyCode, isOnSale = false) {
    var book = {
        id: makeId(),
        title,
        description,
        thumbnail,
        listPrice: {
            amount,
            currencyCode,
            isOnSale
        }
    }
    return book
}


