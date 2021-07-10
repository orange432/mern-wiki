import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/navbar';
import Index from './pages/index';

const App = () => {
    return (
        <BrowserRouter>
      <Navbar/>
      <div className="content">
        <Switch>
          <Route exact path="/"><Index/></Route>
        </Switch>
      </div>
      </BrowserRouter>
    )
}

export default App
