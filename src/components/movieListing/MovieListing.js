import React from 'react';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import { getAllMovies, getAllShows, loader } from '../../features/movies/movieSlice';
import MovieCard from '../movieCard/MovieCard';
import './MovieListing.scss';
import { settings } from '../../common/settings';
import Loading from '../../Loading/Loading';
const MovieListing = (props) => {

    const movies = useSelector(getAllMovies);
    const shows = useSelector(getAllShows);
    const isLoader = useSelector(loader);

    let renderMovies = "";
    let renderShows = "";

    renderMovies = movies.Response === 'True' ? (movies.Search.map((movie, index) => {
        return <MovieCard data={movie} key={index} />;
    })) : (<div className="movies-error">{movies.Error} </div>);

    renderShows = shows.Response === 'True' ? (shows.Search.map((show, index) => {
        return <MovieCard data={show} key={index} />;
    })) : (<div className="movies-error">{movies.Error} </div>);


    return (
        <div className='movie-wrapper'>
            {isLoader && <div className='loader'><Loading/></div>}
            {!isLoader && (<div><div className='movie-list'>
                <h2>Movies</h2>
                <div className='movie-container'>
                    <Slider {...settings}>{renderMovies}</Slider>
                </div>
            </div>
                <div className='show-list'>
                    <h2>Shows</h2>
                    <div className='movie-container'>
                        <Slider {...settings}>{renderShows}</Slider>
                    </div>
                </div></div>)}

        </div>
    );
};

export default MovieListing;