import { useState, useEffect } from 'react';
import './App.css';

const App = () => {

  const [ pic, setPic ] = useState('');
  const [ title, setTitle ] = useState('');

  function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

  const fetchPic = async () => {
    // let date = '2022-04-18';
    let date = randomDate(new Date(2012, 0, 1), new Date());
    date = formatDate(date);
    console.log(date);
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=rs65n9iKnoKQG1CKjidMiiCFiTQkZa9CTBrkg3Mf&date=${date}`);
    const data = await response.json();
    setPic(data.url);
    setTitle(data.title);
  };

  useEffect(() => {
    fetchPic();
  }, []);

  return (
    <div className="app-container">
      <div className="header">
        <div>{title}</div>
        <div className="btn btn-primary" onClick={() => fetchPic()}>FETCH</div>
      </div>
      <div className="app">
            <img src={pic}></img>
      </div>
    </div>
  );
};

export default App;