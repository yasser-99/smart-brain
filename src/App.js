import React, {Component} from 'react';
import Particles from 'react-particles-js';

import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

import './App.css';
import 'tachyons'



const particlesOptions={
  		particles: {
        number:{
          value:120,
          density:{
            enable:true,
            value_area:800
          }
        }
  		}
  	}
const initialState = {
  input: '',
  url: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user:{
    name:'',
    entries:'',
    email:'',
    joined:'',
    id:''
  }
}
class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }
  loadUser = (data)=>{
    this.setState({user:{
        name: data.name,
        entries: data.entries,
        email: data.email,
        joined: data.joined,
        id: data.id
    }})
    // console.log("currentState: ", this.state.user.name);
  }
  // componentDidMount(){
  //   fetch('http://localhost:3000/')
  //   .then(response => response.json())
  //   .then(console.log)
  // }
  calculateFacePositions = (boundings) => {
    const inputImage = document.getElementById('inputImage');
    const width = Number(inputImage.width);
    const height = Number(inputImage.height);

    return{
        top_row: boundings.top_row * height,
        left_col: boundings.left_col * width,
        bottom_row: height - (boundings.bottom_row * height),
        right_col: width - (boundings.right_col * width)
    }
  }
  onInputChange = (event) => {
    this.setState({input:event.target.value});
  }
  onButtonSubmit = () => {
    this.setState({boxes:[]});
    this.setState({url:this.state.input});
    fetch('https://guarded-crag-34648.herokuapp.com/imageurl',{
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    }).then(response => response.json())
      .then((response) => {
        if (response){
          fetch('https://guarded-crag-34648.herokuapp.com/image',{
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          }).then(response => response.json())
            .then(entry => {
              this.setState(Object.assign(this.state.user, {entries: entry}))
            })
        }
        let req_pos = [];
        response.outputs[0].data.regions.forEach(({region_info}) => {
        req_pos.push(this.calculateFacePositions(region_info.bounding_box))
        });
        this.setState({boxes:req_pos})
      }).catch(err => {console.log("Failed to load the source");});

  }
  onRouteChange = (route) => {
    if(route === 'home')
      this.setState({isSignedIn:true})
    else
      this.setState(initialState)
    this.setState({route:route});
  }//;;;lk

  render(){
    return (
      <div className = "APP">
        <Particles className='particles'
                params={particlesOptions} />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        {
          this.state.route === 'home'
            ? <div>
                <Logo />
                <Rank
                  name={this.state.user.name}
                  entries={this.state.user.entries}
                />
                <ImageLinkForm
                  onInputChange={this.onInputChange}
                  onButtonSubmit={this.onButtonSubmit}
                />
                <FaceRecognition url={this.state.url} boxes={this.state.boxes}/>
              </div>
            : (this.state.route === 'register'
            ? <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )

        }
      </div>
    )
  }
}

export default App;
