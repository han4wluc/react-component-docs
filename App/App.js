
import * as Routes from '../.cache/comps';
import componentFunction from './componentFunction';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { hot } from 'react-hot-loader'

class App extends Component {

  constructor(props) {
    super(props);
  
    // const routes = Object.keys(Routes)
    // this.routesroutes = routes.map((routeName, i) => {
    //   // componentFunction
    //   const name = Routes[routeName][0];
    //   const components = Routes[routeName][1];
    //   return (
    //     <Route key={i} path={'/'+name} component={componentFunction(name, components)} />
    //   )
    // })
    const routes = Object.keys(Routes)
    this.routesroutes = [];
    for (let routeName in Routes){
      const [name, components] = Routes[routeName];
      console.warn('name', name, components)

      const compoennt = componentFunction(name, components);
      console.warn('compoennt', compoennt)
      this.routesroutes.push(
        <Route key={routeName} path={'/'+routeName} component={compoennt} />
      )
    }

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

export default hot(module)(App);
