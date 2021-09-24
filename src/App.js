import './App.css';

import logo from "./images/logo.png"
import switchBut from "./images/switch.png"
import ukrflag from "./images/ukrflag.png"
import enFlag from "./images/enFlag.png" 

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

import Languages from './languages';
const lang = Languages()

class App extends Component {
  
  constructor() {
    super()
    this.state = {
      fChosenLang : "en",
      secChosenLang :"ua",
      mainInputValue:"",
      shownComponentsClass : "hidden",
      flagImg : ukrflag,
      currentLanguage : lang.ua,
      error:false,
      errorLabel:""
    }
  }
  pushInputValue = (e) => {
    this.setState(() => {
      return ({mainInputValue:e.target.value})
    })
    console.log(this.state)
  }
  clearInp = () => {
    document.querySelector(".MuiOutlinedInput-inputAdornedEnd").value = ""
  }
  getWords = () => {
    if (this.state.fChosenLang === ""|| this.state.secChosenLang === "") {
      const error2 = this.state.currentLanguage.err2
      this.setState (() => {return({error:true, errorLabel:error2})})
      return
    }
    if(this.state.mainInputValue === "") {
      const error1 = this.state.currentLanguage.err1
      this.setState (() => {return({error:true, errorLabel:error1})})
      return
    }
    
    else {
      const showComponents = () => {
        document.querySelector("#secSection").className = "shown"
        document.querySelector("#examples").className = ""
        document.querySelector("#synonyms").className = ""
        document.querySelector("#translation").className = ""
      }
      const showSentence = () => {
        document.querySelector("#secSection").className = "shown"
        document.querySelector("#synonyms").className = "hidden"
        document.querySelector("#translation").className = "shown wide"
        document.querySelector("#examples").className = "hidden"
      }
      const signleWord = {
        translationResult: null,
        contextResult: [
          {
            confidence: 0.2987,
            text: "матері",
            posTag: "NOUN"
          },
          {
            confidence: 0.2315,
            text: "матір'ю",
            posTag: "NOUN"
          },
          {
            confidence: 0.1985,
            text: "мати",
            posTag: "NOUN"
          },
          {
            confidence: 0.0828,
            text: "мама",
            posTag: "NOUN"
          }
        ],
        synonyms: [
          "mom",
          "mama",
          "mommy",
          "mother",
          "mum"
        ],
        lookupExamples: {
          fromLanguageExamples: [
            "I hope your mother's condition improves.",
            "Here is a picture of my mother's heart.",
            "And he delivered him to his mother.",
            "As the mother's body undergoes major changes ...",
            "Are you going to save the mother earth in your own ...",
            "The mother won't let it run in and take what ...",
            "Help the mother to collect the essential things ...",
            "... actually comes from your mother's side of the family.",
            "... the body and the child and mother.",
            "... circulatory system, hence supplying the mother much more power.",
            "... factors that affect the body of his mother.",
            "... can be fed in the mother's absence.",
            "... entered the room of his mother.",
            "... basic minerals from the organism of mother to the fetus.",
            "... the child know it from his mother's belly."
          ],
          toLanguageExamples: [
            "Я сподіваюся, стан матері поліпшується.",
            "Ось картина серце моєї матері.",
            "І його Він віддав його матері.",
            "Як тіло матері зазнає серйозних змін, ...",
            "Чи збираєтеся ви зберегти матері-землі у ваших власних ...",
            "Матері не дають йому працювати і прийняти те ...",
            "допомогти матері зібрати необхідні речі, ...",
            "... насправді відбувається з боку своєї матері в сім'ї.",
            "... організм і дитину, і матері.",
            "... кровообігу, а отже поставки матері набагато більше енергії.",
            "... факторів, які впливають на організм його матері.",
            "... може бути поданий у відсутність матері.",
            "... увійшов до кімнати його матері.",
            "... перехід основних мінералів з організму матері до плоду.",
            "... Дитина повинна знати, від живота своєї матері."
          ]
        }
      }
      
      const sentense = {
        translationResult: "моя мати моя мати моя мати моя мати моя мати моя мати моя мати ",
        contextResult: [],
        synonyms: [],
        lookupExamples: null
      }
  
      // axios.post("https://academic-words-api.azurewebsites.net/api/word/info", {
      //   from: this.state.fChosenLang,
      //   to: this.state.secChosenLang,
      //   text: String(document.querySelector(".MuiOutlinedInput-inputAdornedEnd").value)
      // })
      
      // .then((response) => {
        if(String(document.querySelector(".MuiOutlinedInput-inputAdornedEnd").value).includes(" ")) {
          ReactDOM.render(<Translation text = {sentense.translationResult}/>, document.querySelector("#translationList"))
          showSentence()
        }
        else {
          let translateList = []
          signleWord.contextResult.forEach((item) => {
            translateList.push(<Translation text={item.text}/> )
            
          })
          console.log(translateList)
          ReactDOM.render (translateList, document.querySelector("#translationList"))
          const exLength = signleWord.lookupExamples?.fromLanguageExamples.length
  
          let exampleList = []
          for (let i = 0; i<exLength; i++) {
            exampleList.push(<Example lText = {signleWord.lookupExamples?.fromLanguageExamples[i]}
            rText = {signleWord.lookupExamples.toLanguageExamples[i]}
            translations={signleWord.synonyms.map(e => e.toLowerCase())}
            synonyms={signleWord.contextResult.map(c => c.text.toLowerCase())}/>)
          }
          ReactDOM.render (exampleList, document.querySelector("#exampleList"))
  
          let synonymList =[]
          signleWord.synonyms.forEach (item => {
            synonymList.push (<span className="synonymListItem">{item}</span>)
          }) 
          ReactDOM.render(synonymList,document.querySelector("#synonymList"))
          showComponents()
        }
        
      // })
      // .catch(function (error) {
      //   console.log(error);
      //   alert("Серверная ошибка. Повторите попытку позже")
      // });
    }
    

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
  changeLocalization = () => {
    if(this.state.currentLanguage === lang.ua) {
      this.setState (() => {return ({currentLanguage : lang.en, flagImg : enFlag,})})
    }
    else {
      this.setState (() => {return ({currentLanguage : lang.ua , flagImg : ukrflag,})})
    }
  }
  render() {
   
    return (
      <>
        <header>
          <div id="company">
            <img src={logo} alt="" id="logo"/>
            <div id="companyName">Academic Words</div>
          </div>
          <img id="flag" src={this.state.flagImg} onClick={this.changeLocalization} alt="flagImg"/>
        </header>
        <main>
          <section id="inputSection">
            

            <form>
              <div id="desktopInput"> 
              <TextField className="findWordInp"
                error={this.state.error}
                id="outlined-error"
                placeholder={this.state.currentLanguage.placeholder}
                variant="outlined"
                label={this.state.errorLabel}
                onChange={this.pushInputValue}
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
                      
                      <MenuItem value="en">{this.state.currentLanguage.fDropDown}</MenuItem>
                      <MenuItem value="ua">{this.state.currentLanguage.secDropDown}</MenuItem>
                      
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
                      
                      <MenuItem value="en">{this.state.currentLanguage.fDropDown}</MenuItem>
                      <MenuItem value="ua">{this.state.currentLanguage.secDropDown}</MenuItem>
                      
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
                      
                      <MenuItem value="en">{this.state.currentLanguage.fDropDown}</MenuItem>
                      <MenuItem value="ua">{this.state.currentLanguage.secDropDown}</MenuItem>
                      
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
                      
                      <MenuItem value="en">{this.state.currentLanguage.fDropDown}</MenuItem>
                      <MenuItem value="ua">{this.state.currentLanguage.secDropDown}</MenuItem>
                      
                    </Select>
                    
                </FormControl> 
                </div>
            </form>
  

          </section>
  
          <section id="secSection" className="hidden">
                <div id="translation">
                  <div id="translLabel">
                  {this.state.currentLanguage.tranlsation}
                  </div>
                  <div id="translationList">
                    <Translation text="Sobaka"/>
                    <Translation text="Pesik"/>
                    <Translation text="Dog"/>
                  </div>
                </div>

                <div id="synonyms">
                  <div id="translLabel">
                      {this.state.currentLanguage.synonims}
                  </div>
                  <div id="synonymList">

                  </div>
                </div>
          </section>
          <section id="examples" className="hidden">
            <div id="translLabel" className="secLabel">
            {this.state.currentLanguage.contextTranslation}
            </div>
            <div id="exampleList" >
                <Example lText ="Тут появятся результаты" rText=""/>
            </div>
          </section>
        </main>
      </>
    );
  }
}

export default App;
