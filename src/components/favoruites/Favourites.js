import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { favoriteMovies, getAllFav } from '../../features/movies/movieSlice';
import { Link } from 'react-router-dom';
import './Favourites.scss';
import { Button } from '@mui/material';

const Favourites = () => {
    const favList = useSelector(getAllFav);
    const dispatch=useDispatch();
    const removeFavHandler=(e)=>{
        console.log(e);
        dispatch(favoriteMovies({name:e}));
    }
    const renderedFav = favList.map((fav, index) => {
        return <div key={index} className="favlist">
            <Link to={`/movie/${fav.id}`}>
                <h4 className='favMov'>{fav.name}</h4>
            </Link>
            <div>
                <Button color="error"onClick={(e) => removeFavHandler(fav.name)}>Remove </Button>
            </div>
        </div>
    });
    console.log(Object.keys(favList));

    return (
        <div className='favouriteListing'>
            <div className='favouriteTitle'>
                <h3>Your Favourites</h3>
            </div>

            {Object.keys(favList).length === 0 ? (<div className='no-fav'>No Favourite Added !!</div>) : (<div>{renderedFav}</div>)}

        </div>
    );
};

export default Favourites;