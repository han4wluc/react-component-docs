import React from 'react';
import { View, Text } from 'react-primitives';
import PropTypes from 'prop-types';
class Artboard extends React.Component {
  render() {
    const { name, children, style, deprecated, id } = this.props;

    const textStyle = {fontWeight:'bold',fontSize:16};
    if(deprecated){
      textStyle.textDecoration = 'line-through';
    }
    return (
      <View style={{ marginTop: 48 }} id={id}>
        <Text style={textStyle}>{name}</Text>
        <View style={[styles.content,style]}>{children}</View>
      </View>
    );
  }
}

Artboard.propTypes = {
  name: PropTypes.string,
  children: PropTypes.any,
  style: PropTypes.object,
  deprecated: PropTypes.bool,
};

const styles = {
  content: {
  }
}

export default Artboard;
