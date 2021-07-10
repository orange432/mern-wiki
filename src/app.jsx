import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/navbar';
import Index from './pages/index';
import Dashboard from './pages/dashboard';
import Articles from './pages/articles';
import Edit from './pages/edit';

const App = () => {
    return (
        <BrowserRouter>
      <Navbar/>
      <div className="content">
        <Switch>
          <Route exact path="/"><Index/></Route>
          <Route exact path="/dashboard"><Dashboard/></Route>
          <Route exact path="/articles"><Articles/></Route>
          <Route exact path="/dashboard"><Dashboard/></Route>
          <Route exact path="/editor"><Edit/></Route>
        </Switch>
      </div>
      </BrowserRouter>
    )
}

export default App
