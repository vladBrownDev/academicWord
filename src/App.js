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

import Synonim from './Synonim';



function App() {
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
              }} />
              <FormControl variant="outlined" >
                  <Select
                    value="en"
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    inputProps={{ 'aria-label': 'Without label' }}
                    className="dropdown"
                  >
                    
                    <MenuItem value="en">Англійська</MenuItem>
                    <MenuItem value="ua">Українська</MenuItem>
                    
                  </Select>
                  
              </FormControl>  

              <img alt="switch" src={switchBut} id="switchImg"/>

              <FormControl variant="outlined" >
                  <Select
                    value="ua"
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    inputProps={{ 'aria-label': 'Without label' }}
                    className="dropdown"
                  >
                    
                    <MenuItem value="en">Англійська</MenuItem>
                    <MenuItem value="ua">Українська</MenuItem>
                    
                  </Select>
                  
              </FormControl>  

              <Button variant="contained" disableElevation className="searchButton">
                  <SearchIcon className="search"/>
              </Button>
          </form>

          <div id="synonims">
            <div id="synonimLabel">
              Синонимы:
            </div>
            <div id="synonimsList">
              <Synonim text="Sobaka"/>
              <Synonim text="Pesik"/>
              <Synonim text="Dog"/>
            </div>
          </div>
        </section>

        <section id="secSection">

        </section>
      </main>
    </>
  );
}

export default App;
