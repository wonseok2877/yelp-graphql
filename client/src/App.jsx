import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'
import UpdatePage from './pages/UpdatePage'

const App = () => {
    return (
        <Router>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/detail/:id" component={DetailPage} />
            <Route exact path="/update/:id" component={UpdatePage} />
        </Router>
    )
}

export default App
