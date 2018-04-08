import React, { Component } from 'react';

import { View, Text } from 'react-primitives';
import Artboard from './Artboard';

export default (cc, name) => {

  return class Components extends Component {

    constructor(props) {
      super(props);
    
      this.state = {
        search: '',
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
        const variations = c.component.propExamples.map(variation => {
          return (
            <View>
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
            style={{ paddingVertical: 16 }}
          >
            {variations}
          </Artboard>
        );
      });

      return (
        <div style={styles.container}>
          <Text size={'title_1'} style={styles.title}>
            {name}
          </Text>
          {comps}
          <View style={{backgroundColor:'white',position:'fixed',left:0,width:200,height:300,top:100}}>
            <input value={search} onChange={this._onChangeSearch} />
          </View>
        </div>
      );
    }
  }
} 


const styles = {
  container: {
    width: 375,
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 100,
  },
  title: {
    marginTop: 48,
    marginBottom: 48,
    textAlign: 'center',
    alignSelf: 'center',
  },
  description: {
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 12,
    color: '#555',
  }
};
