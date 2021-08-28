import './App.css';

import logo from "./images/logo.png"
import switchBut from "./images/switch.png"

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
      secChosenLang :"ru"
    }
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
      ReactDOM.render (translateList, document.querySelector("#synonimsList"))
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  firstDDSent = (e) => {
    this.setState(() => {
      return ({
        fChosenLang :e.target.value
      })
    })
    
  }
  secDDSent = (e) => {
    this.setState(() => {
      return ({
        secChosenLang :e.target.value
      })
    })
  }

  render() {
    return (
      <>
        <header>
          <div id="company">
            <img src={logo} alt="" id="logo"/>
            <div id="companyName">Academic Words</div>
          </div>
          
        </header>
        <main>
          <section id="inputSection">
            <form>
              <TextField className="findWordInp"
                id="outlined-basic"
                placeholder="Enter your word"
                variant="outlined"
                InputProps={{
                  endAdornment: <InputAdornment position="end"><CloseIcon></CloseIcon></InputAdornment>,
                }} 
                /> 
                <FormControl variant="outlined" >
                    <Select
                      defaultValue={this.state.fChosenLang}
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
  
                <img alt="switch" src={switchBut} id="switchImg"/>
  
                <FormControl variant="outlined" >
                    <Select
                      defaultValue={this.state.secChosenLang}
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
            </form>
  
            <div id="synonims">
              
              
            </div>
          </section>
  
          <section id="secSection">
                <div id="translation">
                  <div id="translLabel">
                    Переводы:
                  </div>
                  <div id="synonimsList">
                    <Translation text="Sobaka"/>
                    <Translation text="Pesik"/>
                    <Translation text="Dog"/>
                  </div>
                </div>

                <div id="synonyms">
                  <div id="translLabel">
                      Синонимы:
                  </div>
                </div>
          </section>
          <section id="examples">
            <div id="translLabel">
              Перевод в тексте
            </div>
            <div id="exampleList">
                <Example lText ="sssssss" rText="sasadsa"/>
            </div>
          </section>
        </main>
      </>
    );
  }
}

export default App;
