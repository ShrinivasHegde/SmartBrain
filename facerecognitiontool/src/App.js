

import React, { Component } from 'react';
import ParticlesBg from 'particles-bg'
//import Clarifai from 'clarifai'
import Navigation from './components/Navigation/Naviagtion'
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import './App.css';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';


// window.process = {
//   env: {
//       NODE_ENV: 'development'
//   }
// }
 
window.process = {}

// const app = new Clarifai.App({
//   apiKey: "06b4cfb08b79472d80f968ffc7f4ac7f"
// });


const initialState = { 
    input: "",
    imgUrl: "",
    box:{},
    route: 'signin',
    isSignedIn : false,
    user:{
      id:'',
      name: '',
      email: '',
      entries: 0,
      joined : ''
    }
  }

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
  loadUser =(data)=>{
    this.setState({user: {
      id:data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined : data.joioned
    }})
  }
  // //for checking are we getting data
  // componentDidMount(){
  //   fetch('http://localhost:3000/')
  //     .then(response => response.json())
  //     .then(data => console.log(data))
  // }


  calculateFaceLoaction = (data)=> {
    const box = data.outputs[0].data.regions[0].region_info.bounding_box

    //console.log(box)

    const image= document.getElementById('inputImage')
    const width = Number(image.width)
    const height = Number(image.height)

    //console.log(width,height)

    const newBox = {
      leftCol: Number(box.left_col * width),
      topRow : Number(box.top_row * height),
      rightCol: Number(width - (box.right_col*width)),
      bottomRow : Number(height - (box.bottom_row*height))
    }
    
    //console.log(newBox)

    
    this.setState({box: newBox})
  }

  // displayFaceBox = (box) =>{
  //   console.log(box)
  //   this.setState({box:this.state.box})
  //   console.log(box)
  // }

  onInputChange = (event) => {
    this.setState({input:event.target.value})

    //console.log(event.target.value)
  }
 
  onButtonSubmit = () => {
    this.setState({imgUrl:this.state.input})

    //console.log("click")
    fetch('https://smartbrainappapi.onrender.com/imageUrl',{
            method: 'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                input:this.state.input
            })
          })
      .then(response => response.json())
      .then(response => {
        if(response){
          fetch('https://smartbrainappapi.onrender.com/image',{
            method: 'put',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                id:this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count =>{
            this.setState(Object.assign(this.state.user,{entries:count}))
          })
          .catch(console.log)
        }
        this.calculateFaceLoaction(response)

        //console.log(response.outputs[0].data.regions[0].region_info.bounding_box)

      })
      .catch(err=> console.log(err,'API not responding'))
 
  }

  onRouteChange = (route) =>{
    if(route === 'signout'){
      this.setState({initialState})
    }else if(route === 'home'){
      this.setState({isSignedIn:true,imgUrl: "",box:{}})
    }
    this.setState({route:route})
    
  }
  
  render() {

    // const box = this.state.box
    // console.log(box)
    // destructuring insted of this.state
    const {isSignedIn, imgUrl, route ,box } = this.state;
    return (
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} />
          <Navigation isSignedIn={isSignedIn} onRoutChange={this.onRouteChange} />
          { route === 'home'
            ?   <div>
                  <Logo />
                  <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                  <ImageLinkForm 
                      onInputChange={this.onInputChange}
                      onButtonSubmit={this.onButtonSubmit} /><br/>
                  <FaceRecognition box={box} imgUrl={imgUrl}/>
                </div>
              
            :  (
                  route === 'signin' 
                  ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                  : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              ) 
              
          }
      </div>
    );
  }
}
 
export default App;