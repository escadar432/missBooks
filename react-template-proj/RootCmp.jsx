const { useState } = React

import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from './pages/Home.jsx'
import { About } from './pages/About.jsx'
import { BookIndex } from "./pages/BookIndex.jsx"


export function App() {

    const [page, setPage] = useState('book')

    function onSetPage(page) {
        setPage(page)
    }

    return (
        <section className="app">
            <header className="app-header">
                <AppHeader onSetPage={onSetPage} />
            </header>

            <main className="container">
                {page === 'home' && <Home />}
                {page === 'about' && <About />}
                {page === 'book' && <BookIndex />}

            </main>
        </section>
    )
}


//currencyCode <input select>
// different ways to send object params to methods