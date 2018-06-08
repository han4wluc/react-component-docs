import React, { Component } from 'react';

import { View, Text } from 'react-primitives';
import Artboard from './Artboard';
import Scrollspy from 'react-scrollspy'

export default (name, cc) => {

  return class Components extends Component {

    constructor(props) {
      super(props);
    
      this.state = {
        search: '',
        currentScollId: '',
      };
    }

    _onChangeSearch = (event) => {
      this.setState({
        search: event.target.value
      })
    }

    render() {
      const { search } = this.state;

      const comps = cc.filter((c)=>{
        if(search === ''){
          return true;
        }
        return c.fileName.toLowerCase().startsWith(search.toLowerCase());
      }).map(c => {
        const variations = c.component.propExamples.map((variation, index) => {
          return (
            <View style={{marginBottom: index !== c.component.propExamples.length - 1 ? 16 : 0}}>
              {!!variation.description && (
                <Text
                  style={styles.description}
                >
                  {variation.description}
                </Text>
              )}
              <c.component {...variation.props} />
            </View>
          );
        });

        return (
          <Artboard
            deprecated={c.component.deprecated}
            name={c.fileName}
            // style={{}}
            id={c.fileName}
          >
            {variations}
          </Artboard>
        );
      });

      const compNames = cc.filter((c)=>{
        if(search === ''){
          return true;
        }
        return c.fileName.toLowerCase().startsWith(search.toLowerCase());
      }).map((comp)=>{
        return (
          <a class="selectable" style={{
            color: comp.fileName == this.state.currentScollId ? 'rgba(0,0,0,.85)' : 'rgba(0,0,0,.75)',
            fontWeight: comp.fileName == this.state.currentScollId ? 'bold' : undefined,
            textDecoration: 'none',
            fontSize: 16,
            width: 300,
            // height: 38,
            paddingTop: 12,
            paddingBottom: 12,
            paddingLeft:24,
            paddingRight:24,
          }} href={'#'+comp.fileName}>
            {comp.fileName}
          </a>
        )
      })

      const sections = cc.filter((c)=>{
        if(search === ''){
          return true;
        }
        return c.fileName.toLowerCase().startsWith(search.toLowerCase());
      }).map((comp)=>{
        return comp.fileName
      })

      return (
        <View style={styles.container}>
          <Scrollspy items={ sections } currentClassName="is-current" onUpdate={(a,b,c)=>{
            // console.warn('onUpdate',a,b,c)
            console.warn(a.id)
            this.setState({
              currentScollId: a.id
            })
          }}>
            <View id={'top-menu'} style={{backgroundColor:'white',position:'fixed',left:0,width:300,bottom:0,top:0,paddingTop:24,paddingBottom:24,marginTop:0,overflow:'scroll',zIndex: -1,borderRightWidth:1,borderColor:'#ddd',borderStyle:'solid'}}>
              
              <View style={{width:300-48,marginLeft: 24, height:1,backgroundColor:'#ccc',marginTop:8,marginBottom:8}}/>

              <input style={{fontSize:16, marginTop: 24, marginLeft:24,marginBottom:12,marginRight:24,}} value={search} onChange={this._onChangeSearch} placeholder={'Search'} />
              { compNames }
            </View>
          </Scrollspy>

          <View style={{flex:1,marginLeft: 300,marginRight:40}}>
            <Text size={'title_1'} style={styles.title}>
              {name}
            </Text>
            {comps}
          </View>
        </View>
      );
    }
  }
} 

const styles = {
  container: {
    // width: 375,
    margin: 'auto',
    flexDirection: 'column',
    paddingBottom: 100,
    flexDirection:'row',
  },
  title: {
    marginTop: 48,
    marginBottom: 48,
    fontSize: 36,
    // textAlign: 'center',
    // alignSelf: 'center',
  },
  description: {
    // textAlign: 'center',
    marginTop: 24,
    marginBottom: 12,
    color: '#555',
  }
};
