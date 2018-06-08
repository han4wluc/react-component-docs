import React, { Component } from 'react';

export default class Button extends Component {

  static propExamples = [{
    props: {
      title: 'Button',
      backgroundColor: '#00A3FF',
    },
    description: 'Primary'
  }, {
    props: {
      title: 'Button',
      backgroundColor: '#6DCC50',
    },
    description: 'Secondary'
  }, {
    props: {
      title: 'Button',
      backgroundColor: '#ec1c24',
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
    color: 'white',
    padding: 8,
    width: 120,
    justifyContent:'center',
    display: 'flex',
    borderRadius: 4
  }
}
