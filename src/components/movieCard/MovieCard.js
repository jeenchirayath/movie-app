import React from 'react';
import { Link } from 'react-router-dom';
import './movieCard.scss';

const MovieCard = (props) => {
  const { data } = props;
  const favoruiteHandler = () => {
    console.log("Favourite CLicked")
  }
  return (
    <div className='card-item'>
      <div className='card-inner'>
        <Link to={`/movie/${data.imdbID}`}>
          <div className='card-top'>
            <img src={data.Poster} alt={data.Title}></img>
          </div>
          <div className='card-bottom'>
            <div className='card-info'>
              <h4>{data.Title}</h4>
              <p>{data.Year}</p>
            </div>
          </div>
        </Link>
        {/* <div className=''>
          <button onClick={favoruiteHandler} className="add-favourite">
            Add to Favourites
          </button>
        </div> */}
      </div>


    </div>
  );
};

export default MovieCard;     