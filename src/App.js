import './App.css';

import logo from "./images/logo.png"
import switchBut from "./images/switch.png"
import ukrflag from "./images/ukrflag.png"

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

import Translation from './Translation';
import Example from "./Example"

import axios from "axios"
import React ,{Component} from 'react';
import ReactDOM from "react-dom"



class App extends Component {
  constructor() {
    super()
    this.state = {
      fChosenLang : "en",
      secChosenLang :"ru",
      flagImg : ukrflag
    }
  }
  clearInp = () => {
    document.querySelector(".MuiOutlinedInput-inputAdornedEnd").value = ""
  }
  getWords = () => {
    axios.post("https://academic-words-api.azurewebsites.net/api/word/info", {
      from: this.state.fChosenLang,
      to: this.state.secChosenLang,
      text: String(document.querySelector(".MuiOutlinedInput-inputAdornedEnd").value)
    })
    
    .then((response) => {
      
      console.log(response)
      let translateList = []
      response.data.contextResult.forEach((item) => {
        translateList.push(<Translation text={item.text}/> )
        
      })
      console.log(translateList)
      ReactDOM.render (translateList, document.querySelector("#translationList"))
      const exLength = response.data.lookupExamples.fromLanguageExamples.length

      let exampleList =[]
      for (let i = 0; i<exLength; i++) {
        exampleList.push(<Example lText = {response.data.lookupExamples.fromLanguageExamples[i]}
        rText = {response.data.lookupExamples.toLanguageExamples[i]}/>)
      }
      ReactDOM.render (exampleList, document.querySelector("#exampleList"))

      let synonymList =[]
      response.data.synonyms.forEach (item => {
        synonymList.push (<span className="synonymListItem">{item}</span>)
      }) 
      ReactDOM.render(synonymList,document.querySelector("#synonymList"))
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  firstDDSent = (e) => {
    document.addEventListener("DOMContentLoaded", () => {
      
      
    })
    
    if(e.target.value === this.state.secChosenLang) {
      console.log(e)

      
      this.setState(() => {
        return ({
          fChosenLang :e.target.value,
          secChosenLang :""
        })
      })


      
    }
    if(e.target.value !== this.state.secChosenLang) {
      this.setState(() => {
        return ({
          fChosenLang :e.target.value
        })
      })
    }
    
    
  }
  secDDSent = (e) => {
    if(e.target.value === this.state.fChosenLang) {
      console.log(e)

      
      this.setState(() => {
        return ({
          fChosenLang :"",
          secChosenLang :e.target.value
        })
      })


      
    }
    else {
      this.setState(() => {
        return ({
          secChosenLang :e.target.value
        })
      })
    }
   
  }
  swapLang = () => {
    const first = this.state.fChosenLang
    const sec = this.state.secChosenLang
    this.setState(() => {
      return ({
        fChosenLang: sec,
        secChosenLang:first
      })
    })
    console.log(this.state)
  }
  render() {
   
    return (
      <>
        <header>
          <div id="company">
            <img src={logo} alt="" id="logo"/>
            <div id="companyName">Academic Words</div>
          </div>
          <img src={this.state.flagImg} alt="flagImg"/>
        </header>
        <main>
          <section id="inputSection">
            

            <form>
              <div id="desktopInput"> 
              <TextField className="findWordInp"
                id="outlined-basic"
                placeholder="Введите текст"
                variant="outlined"
                InputProps={{
                  endAdornment: <InputAdornment position="end"><CloseIcon onClick={this.clearInp}></CloseIcon></InputAdornment>,
                }} 
                /> 
                <FormControl variant="outlined" className="fForm">
                    <Select
                      value={this.state.fChosenLang}
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      inputProps={{ 'aria-label': 'Without label' }}
                      className="dropdown firstDD"
                      onChange={this.firstDDSent}
                    >
                      
                      <MenuItem value="en">Английский</MenuItem>
                      <MenuItem value="ru">Русский</MenuItem>
                      
                    </Select>
                    
                </FormControl>  
  
                <img alt="switch" src={switchBut} onClick = {this.swapLang} id="switchImg"/>
  
                <FormControl variant="outlined" className="secForm">
                    <Select
                      value={this.state.secChosenLang}
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      inputProps={{ 'aria-label': 'Without label' }}
                      className="dropdown secDD"
                      onChange={this.secDDSent}
                      
                    >
                      
                      <MenuItem value="en">Английский</MenuItem>
                      <MenuItem value="ru">Русский</MenuItem>
                      
                    </Select>
                    
                </FormControl>  
  
                <Button onClick={this.getWords} variant="contained" disableElevation id="searchButton">
                    <SearchIcon className="search"/>
                </Button>
              </div>
              
                <div id="mobileSelect">
                <FormControl variant="outlined" >
                    <Select
                      value={this.state.fChosenLang}
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      inputProps={{ 'aria-label': 'Without label' }}
                      className="dropdown firstDD"
                      onChange={this.firstDDSent}
                    >
                      
                      <MenuItem value="en">Английский</MenuItem>
                      <MenuItem value="ru">Русский</MenuItem>
                      
                    </Select>
                    
                </FormControl>  
  
                <img alt="switch" src={switchBut} onClick = {this.swapLang} id="mobileImgSearch"/>
  
                <FormControl variant="outlined" >
                    <Select
                      value={this.state.secChosenLang}
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      inputProps={{ 'aria-label': 'Without label' }}
                      className="dropdown secDD"
                      onChange={this.secDDSent}
                      
                    >
                      
                      <MenuItem value="en">Английский</MenuItem>
                      <MenuItem value="ru">Русский</MenuItem>
                      
                    </Select>
                    
                </FormControl> 
                </div>
            </form>
  

          </section>
  
          <section id="secSection">
                <div id="translation">
                  <div id="translLabel">
                    Перевод
                  </div>
                  <div id="translationList">
                    <Translation text="Sobaka"/>
                    <Translation text="Pesik"/>
                    <Translation text="Dog"/>
                  </div>
                </div>

                <div id="synonyms">
                  <div id="translLabel">
                      Синонимы
                  </div>
                  <div id="synonymList">

                  </div>
                </div>
          </section>
          <section id="examples">
            <div id="translLabel" className="secLabel">
              Перевод в контексте
            </div>
            <div id="exampleList">
                <Example lText ="Тут появятся результаты" rText=""/>
            </div>
          </section>
        </main>
      </>
    );
  }
}

export default App;
