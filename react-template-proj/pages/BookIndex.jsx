const { useEffect, useState, useRef } = React

import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/bookList.jsx"

export function BookIndex() {

    const [books, setbooks] = useState(null)

    useEffect(() => {
        loadbooks()
    }, [])


    function loadbooks() {
        bookService.query()
            .then(setbooks)
            // .then(res => setbooks(res))
            .catch(err => {
                console.log('Problems getting books:', err)
            })
    }

    function onRemoveBook() {
        console.log("on remove");
    }
    function onSelectedBookId() {
        console.log("on selected book");
    }

    if (!books) return <h1>Loading...</h1>
    
    return  <BookList
                books={books}
                onSelectedBookrId={onSelectedBookId}
                onRemoveBook={onRemoveBook}
            />









    // return (
    //     <section>
    //         <h1>books list</h1>
    //         <BookList
    //             books={books}
    //             onSelectedBookrId={onSelectedBookId}
    //             onRemoveBook={onRemoveBook}
    //         />
    //     </section>
    // )

    // return (
    //     <ul>
    //         {books.map( book => <li key={book.id} >{book.title}</li>)}
    //     </ul>
    // )

}

