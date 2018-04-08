
import * as Routes from './comps';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

export default class App extends Component {

  constructor(props) {
    super(props);
  
    const routes = Object.keys(Routes)
    this.routesroutes = routes.map((routeName, i) => {
      return (
        <Route key={i} path={'/'+routeName} component={Routes[routeName]} />
      )
    })
    this.links = routes.map((routeName, i)=>{
      return (
        <Link key={i} style={{marginRight: 16}} class="nav-link" to={'/'+routeName}>
          {routeName}
        </Link>
      )
    })

  }

  render(){
    return (
      <Router>
        <div style={{}}>
          <div>
            { this.links }
          </div>
          <div style={{backgroundColor:'#eee',minHeight:800}}>
            { this.routesroutes }
          </div>
        </div>
      </Router>
    )
  }
}