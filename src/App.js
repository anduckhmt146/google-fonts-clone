import React, { useState, useEffect, useReducer } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Navbar from './components/Navbar/Navbar.js';
import SideDrawer from './components/SideDrawer/SideDrawer.js';
import Backdrop from './components/Backdrop/Backdrop.js';
import Searchbar from './components/Searchbar/Searchbar.js';
import Main from './pages/Main/Main.js';
import Footer from './components/Footer/Footer.js';
import BottomDrawer from './components/BottomDrawer/BottomDrawer.js';
import './styles/responsive.css';

const GlobalStyle = createGlobalStyle`
  body, .side-drawer, footer, input, select, a, .search-bar-container {
    background-color: ${(props) => (props.theme.mode ? '#222' : '#FFF')};
    color: ${(props) => (props.theme.mode ? '#FFF' : 'rgb(68, 68, 68)')}
    }
  .bottom-drawer {
    color: ${(props) =>
      props.theme.mode ? 'rgb(68, 68, 68)' : 'rgb(68, 68, 68)'}
    }  
  .google-logo {
    background-image: ${(props) =>
      props.theme.mode
        ? 'url(https://www.gstatic.com/images/branding/googlelogo/1x/googlelogo_light_color_74x24dp.png)'
        : 'url(https://www.gstatic.com/images/branding/googlelogo/1x/googlelogo_dark_color_74x24dp.png)'};
    opacity: ${(props) => (props.theme.mode ? '1' : '0.6')}
  }
`;

function App() {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      isSideDrawerOpen: false,
      searchFonts: '',
      typeSomething: '',
      fontSize: '20px',
      isDarkTheme: false,
      isList: false,
      isBottomDrawerOpen: false,
    }
  );
  const [sticky, setSticky] = useState(false);
  const [addedFonts, setAddedFonts] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('userSelectedFonts');
    if (data) {
      setAddedFonts(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('userSelectedFonts', JSON.stringify(addedFonts));
  }, [addedFonts]);

  const sideDrawerToggle = () => {
    setUserInput({ isSideDrawerOpen: !userInput.isSideDrawerOpen });
  };

  const bottomDrawerToggle = () => {
    if (addedFonts.length > 0) {
      setUserInput({ isBottomDrawerOpen: !userInput.isBottomDrawerOpen });
    }
  };

  const addFont = (selectedFont) => {
    setAddedFonts([...new Set([...addedFonts, selectedFont])]);
  };

  const clearAllSelectedFonts = () => {
    setAddedFonts([]);
  };

  const clearSelectedFont = (selectedFont) => {
    setAddedFonts(
      addedFonts.filter((currentFont) => currentFont !== selectedFont)
    );
  };

  useEffect(() => {
    if (addedFonts.length === 0) {
      setUserInput({ isBottomDrawerOpen: false });
    }
  }, [addedFonts]);

  const addPlusSigns = (familyName) => {
    if (familyName.indexOf(' ') === -1) {
      return familyName;
    } else {
      return familyName.split(' ').join('+');
    }
  };

  const removeDrawers = () => {
    setUserInput({ isSideDrawerOpen: false });
    setUserInput({ isBottomDrawerOpen: false });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInput({ [name]: value });
  };

  const toggleTheme = () => {
    setUserInput({ isDarkTheme: !userInput.isDarkTheme });
  };

  const listGridToggle = () => {
    setUserInput({ isList: !userInput.isList });
  };

  const reset = () => {
    setUserInput({ searchFonts: '' });
    setUserInput({ typeSomething: '' });
    setUserInput({ fontSize: '20px' });
    setUserInput({ isDarkTheme: false });
    setUserInput({ isList: false });
  };

  return (
    <ThemeProvider theme={{ mode: userInput.isDarkTheme }}>
      <>
        <GlobalStyle />
        <div>
          <Navbar sideDrawerToggle={sideDrawerToggle} />
          <SideDrawer isSideDrawerOpen={userInput.isSideDrawerOpen} />
          {userInput.isSideDrawerOpen || userInput.isBottomDrawerOpen ? (
            <div>
              <Backdrop removeDrawers={removeDrawers} />
            </div>
          ) : null}

          <Searchbar
            searchFonts={userInput.searchFonts}
            typeSomething={userInput.typeSomething}
            fontSize={userInput.fontSize}
            handleChange={handleChange}
            toggleTheme={toggleTheme}
            listGridToggle={listGridToggle}
            isList={userInput.isList}
            reset={reset}
            sticky={sticky}
          />

          <Main
            addPlusSigns={addPlusSigns}
            searchFonts={userInput.searchFonts}
            typeSomething={userInput.typeSomething}
            fontSize={userInput.fontSize}
            isList={userInput.isList}
            addFont={addFont}
            sticky={sticky}
            setSticky={setSticky}
          />
          <BottomDrawer
            addPlusSigns={addPlusSigns}
            isBottomDrawerOpen={userInput.isBottomDrawerOpen}
            bottomDrawerToggle={bottomDrawerToggle}
            addedFonts={addedFonts}
            clearAllSelectedFonts={clearAllSelectedFonts}
            clearSelectedFont={clearSelectedFont}
          />
          <Footer />
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
