import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import './TitleCard.css'
// import cards_data from '../../assets/cards/Cards_data'

export default function TitleCard({title, category}) {
  const [apiData, setApiData] = useState([])
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOTA3YWQ0YzUyZmExZDYyNGQzMDYwMjMxNTNlMjU0OCIsIm5iZiI6MS43NDcxMjk0NTUwOTc5OTk4ZSs5LCJzdWIiOiI2ODIzMTQ2ZjlmMDk0MjAxYTA4NjQ1M2YiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.t19spxa_n7r0s4b-yZN-yLgZV6pIVYRJb3RfrjUSSIY'
  }
};

  const cardsRef = useRef();
  const handleWheel = (event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;

  }
  useEffect(() => {

  fetch(`https://api.themoviedb.org/3/movie/${category ? category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));

    const currentRef = cardsRef.current;
    currentRef.addEventListener('wheel', handleWheel);
  
    return () => {
      currentRef.removeEventListener('wheel', handleWheel);
    };
  }, [category]);
  return (
    <div className='titlecard'>
      <h2>{title? title:"Popular on Netflix "}</h2>
      <div className="card-list" ref={cardsRef}>
        {
          apiData.map((card,index)=>{
            return <Link to={`player/${card.id}`} key={index}>
            <div className='card'>
              <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} />
              <p>{card.original_title}</p>
            </div></Link>
          })
        }
      </div>
    </div>
  )
}
