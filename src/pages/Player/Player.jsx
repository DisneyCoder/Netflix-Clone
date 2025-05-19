import { useEffect, useState } from 'react';
import back_arrow from '../../assets/back_arrow_icon.png'
import './Player.css'
import { useNavigate, useParams } from 'react-router-dom';

function Player() {

    const bearerKey = import.meta.env.TMDB_BEARER;
    const navigate = useNavigate();
    const {id} = useParams();
    const [apiData, setApiData] =useState({
        name:"",
        key:"",
        published_at:"",
        typeof:"",
    })
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${bearerKey}` 
        }
    };
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
            .then(res => res.json())
            .then(res => setApiData(res.results[0] || {} ))
            .catch(err => console.error(err));
    },[])
    return (<div className="player">
        <img src={back_arrow} alt="" onClick={()=>{navigate(-1)}}/>

        <iframe width='80%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`}  title='trailer' frameBorder='0' allowFullScreen></iframe>
        <div className="player-info">
            <p>{apiData.published_at.slice(0,10)}</p>
            <p>{apiData.name}</p>   
            <p>{apiData.type}</p>
        </div>
    </div>)
}

export default Player;