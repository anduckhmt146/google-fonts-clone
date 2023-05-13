import React, { useState, useEffect } from 'react';
import FontCard from '../../components/FontCard/FontCard';
import inspirationalQuotes from '../../data/quotes';
import './style.css';

function Main({
  addPlusSigns,
  searchFonts,
  typeSomething,
  fontSize,
  isList,
  addFont,
  sticky,
  setSticky,
}) {
  const [fonts, setFonts] = useState([]);
  const [numberOfFonts, setNumberOfFonts] = useState(20);
  const [atBottom, setAtBottom] = useState(false);
  const [atTop, setAtTop] = useState(true);

  //fetch all the fonts from Google Fonts API and store in the font state
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBNl7lcNRNpxnZNrKVoDnoCXrN5a8jpCas&sort=popularity'
      );
      const data = await response.json();
      const fontsData = data.items;
      setFonts(fontsData);
    }
    fetchData();
  }, []);

  //search (filter) feature
  const filteredFonts = fonts.filter((font) => {
    return font.family.toLowerCase().indexOf(searchFonts.toLowerCase()) !== -1;
  });

  const displayedFonts = filteredFonts.slice(0, numberOfFonts);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  //change states depending where the user has scrolled to
  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop + 2 >=
      document.documentElement.offsetHeight
    ) {
      setAtBottom(true);
    }
    if (window.pageYOffset === 0) {
      setAtTop(true);
    } else {
      setAtTop(false);
    }
    if (window.pageYOffset > 95) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  }

  //if atBottom is true run increaseNoOfFonts function
  useEffect(() => {
    if (!atBottom) return;
    increaseNoOfFonts();
  }, [atBottom]);

  //increase the number of fonts and then set atBottom back to false
  const increaseNoOfFonts = () => {
    setNumberOfFonts((prevnum) => prevnum + 12);
    setAtBottom(false);
  };

  // assign a quote based on the index position of the fontcard
  const assignQuote = (index) => {
    return inspirationalQuotes[index % inspirationalQuotes.length];
  };

  return (
    <div>
      <div
        className={
          sticky
            ? 'fontcards-container sticky-fontcards'
            : 'fontcards-container'
        }>
        <div
          className="fontcards"
          style={
            isList
              ? { gridTemplateColumns: '1fr' }
              : { gridTemplateColumns: '' }
          }>
          {displayedFonts.map((font, index) => (
            <FontCard
              key={font.family}
              familyName={font.family}
              typeSomething={
                typeSomething.length === 0 ? assignQuote(index) : typeSomething
              }
              fontSize={fontSize}
              addFont={addFont}
              addPlusSigns={addPlusSigns}
            />
          ))}
        </div>
      </div>
      <div
        className="to-top"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
        style={atTop ? { display: 'none' } : { display: 'flex' }}>
        <div className="fa fa-long-arrow-up"></div>
      </div>
    </div>
  );
}

export default Main;
