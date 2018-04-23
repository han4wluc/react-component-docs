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
          <Text
            style={{marginTop: 16, fontSize: 16}}
            
          >
            <a style={{
              color: comp.fileName == this.state.currentScollId ? 'rgba(0,0,0,.85)' : 'rgba(0,0,0,.75)',
              fontWeight: comp.fileName == this.state.currentScollId ? 'bold' : undefined,
              textDecoration: 'none'
            }} href={'#'+comp.fileName}>
              {comp.fileName}
            </a>
          </Text>
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
            <View id={'top-menu'} style={{backgroundColor:'white',position:'fixed',left:0,width:300,bottom:0,top:0,padding:24,marginTop:0,overflow:'scroll',zIndex: -1}}>
              
              <View style={{width:300-48,height:1,backgroundColor:'#ccc',marginTop:8,marginBottom:8}}/>

              <input style={{fontSize:16, marginTop: 24}} value={search} onChange={this._onChangeSearch} placeholder={'Search'} />
              { compNames }
            </View>
          </Scrollspy>

          <View style={{flex:1,marginLeft: 340,marginRight:40}}>
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


// var lastId,
//     topMenu = $("#top-menu"),
//     topMenuHeight = topMenu.outerHeight()+15,
//     // All list items
//     menuItems = topMenu.find("a"),
//     // Anchors corresponding to menu items
//     scrollItems = menuItems.map(function(){
//       var item = $($(this).attr("href"));
//       if (item.length) { return item; }
//     });

// function getVisible( $els ) {
//     var docViewTop = $(window).scrollTop();
//     var docViewBottom = docViewTop + $(window).height();

//     return $els.filter(function(i, elem) {
//         var elemTop = $(elem).offset().top;
//         var elemBottom = elemTop + $(elem).height();

//         // Fully or partially visible, pick one

//         // element is _fully_ visible
//         return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));

//         // element is _partially_ visible
//         return ((elemBottom <= docViewBottom) || (elemTop >= docViewTop));
//     });
// }

// // Bind to scroll
// $(window).scroll(function(){
//    // Get container scroll position
//    var fromTop = $(this).scrollTop();

//    // console.warn('scrollItems', scrollItems);
   
//    // Get id of current scroll item
//    var cur = scrollItems.map(function(){
//      if ($(this).offset().top < fromTop)
//        return this;
//    });
//    // Get the id of the current element
//    cur = cur[cur.length-1];
//    var id = cur && cur.length ? cur[0].id : "";
// // 
//    // console.warn(id);

//    const visible = getVisible(scrollItems)
   
//    console.warn(visible);
//    // if (lastId !== id) {
//    //     lastId = id;
//    //     // Set/remove active class
//    //     menuItems
//    //       .parent().removeClass("active")
//    //       .end().filter("[href='#"+id+"']").parent().addClass("active");
//    // }                   
// });


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
    fontSize: 36
    // textAlign: 'center',
    // alignSelf: 'center',
  },
  description: {
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 12,
    color: '#555',
  }
};
