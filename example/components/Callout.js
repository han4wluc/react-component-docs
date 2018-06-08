import React, { Component } from 'react';

export default class Callout extends Component {

  static propExamples = [{
    props: {
      title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex, delectus!',
      backgroundColor: '#d4e6f2',
    },
    description: 'Success'
  }, {
    props: {
      title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex, delectus!',
      backgroundColor: '#d4eae3',
    },
    description: 'Info'
  }, {
    props: {
      title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex, delectus!',
      backgroundColor: '#f1dbde',
    },
    description: 'Danger'
  }]

  render() {
    const { title, backgroundColor } = this.props;
    return (
      <div style={{...styles.container,backgroundColor}}>
        {title}
      </div>
    );
  }
}

const styles = {
  container: {
    // color: 'black',
    padding: 16,
    paddingTop: 24,
    paddingBottom: 24,
    // width: 120,
    // justifyContent:'center',
    display: 'flex',
    borderRadius: 4
  }
}
