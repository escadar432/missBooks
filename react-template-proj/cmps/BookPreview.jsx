
export function BookPreview({ book }) {
    console.log("im in Book Previe")


    return (
        <article className="book-preview">
            <h2>Name: {book.title}</h2>
            <h4> {book.id}</h4>
        </article>
    )
}