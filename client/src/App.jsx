import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'
import UpdatePage from './pages/UpdatePage'
import { RestaurantContextProvider } from './context/Context'

const App = () => {
    return (
        <RestaurantContextProvider>
        <Router>
            <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/detail/:restaurantid" component={DetailPage} />
            <Route exact path="/update/:restaurantid" component={UpdatePage} />
            </Switch>
        </Router>
        </RestaurantContextProvider>
    )
}

export default App
