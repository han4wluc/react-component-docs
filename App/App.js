
import * as Routes from '../.cache/comps';
import componentFunction from './componentFunction';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Redirect
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
    this.firstRoute = routes[0]
    this.routesroutes = [];
    for (let routeName in Routes){
      const [name, components] = Routes[routeName];

      const compoennt = componentFunction(name, components);
      this.routesroutes.push(
        <Route
          key={routeName}
          path={'/'+routeName}
          component={compoennt}
        />
      )
    }
    // this.routesroutes.push(
    //   <Route component={NotFound} />
    // )

    this.links = routes.map((routeName, i)=>{
      console.warn('location',window.location)
      return (
        <NavLink
          key={i}
          style={{
            // marginRight: 24,
            textDecoration: 'none',
            color:'rgba(0,0,0,.75)',
            fontSize: 20,
            height: 50,
            paddingLeft:12,
            paddingRight:12,
            display:'flex',
            alignItems:'center',

          }}
          activeStyle={{
            color: 'rgba(0,0,0,.85)',
            fontWeight: 'bold',
          }}
          class="selectable nav-link"
          to={'/'+routeName}
        >
          {Routes[routeName][0]}
        </NavLink>
      )
    })

  }

  render(){
    return (
      <Router>
        <div style={{}}>
          <div style={{
            // height: 50,
            display: 'flex',
            alignItems:'center',
            zIndex: 10,
            position: 'relative',
            // position: 'fixed',
            // top:0,
            // left:0,
            // right:0,
            paddingLeft: 12,
            backgroundColor:'white',
            borderBottomWidth: 1,
            borderColor:'#ddd',
            borderBottomStyle: 'solid'
          }}>
            { this.links }
          </div>
          <div style={{backgroundColor:'#fafafa',minHeight:800}}>
            { this.routesroutes }
            <Redirect from='/' to={this.firstRoute}/>
          </div>
        </div>
      </Router>
    )
  }
}

export default hot(module)(App);
