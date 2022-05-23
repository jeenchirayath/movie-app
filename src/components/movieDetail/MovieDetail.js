import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAsyncMovieOrShowDetail, getAllMovieOrShow, removeShowOrMovie, favoriteMovies, getWishList, getAllFav, movieWishList, fetchMovieWishList } from '../../features/movies/movieSlice';
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Loading from '../../Loading/Loading';
import './MovieDetail.scss';
import { Button } from '@mui/material';

const MovieDetail = () => {
    const { imdbID } = useParams();
    const [open, setOpen] = useState(false);
    const vertical = 'bottom';
    const horizontal = 'center';
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError,setOpenError]=useState(false);
    const movieOrShow = useSelector(getAllMovieOrShow);
    const favMov = useSelector(getAllFav);
    let wishList = useSelector(getWishList);
    const dispatch = useDispatch();
    const favouriteHandler = () => {
        console.log("favorite clicked");
        setOpen(true);
        // dispatch(favoriteMovies({ id: movieOrShow.imdbID, name: movieOrShow.Title }));
    };
    const addFavorite = () => {
        dispatch(favoriteMovies({ id: movieOrShow.imdbID, name: movieOrShow.Title }));
        setOpenSuccess(true);
        setOpen(false);
    }
    let isFav = false;
    favMov.map(fav => {
        if (fav.name === movieOrShow.Title) isFav = true;
    });
    const handleClose = () => {
        setOpen(false);
    }
    const handleSnackClose = () => {
        setOpenSuccess(false);
    };
    const errorSnackClose=()=>{
        setOpenError(false);
    };
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const wishListHandler = () => {
        console.log("wishlist");
        dispatch(movieWishList({
            id: movieOrShow.imdbID,
            title: movieOrShow.Title,
            type: movieOrShow.Type,
            year:movieOrShow.Year,
            genre: movieOrShow.Genre,
            director: movieOrShow.Director
        }))
            .unwrap()
            .then((result) => {
                setOpenSuccess(true);
            })
            .catch((error)=>{
                console.log("second");
                setOpenError(true);
            });
        dispatch(fetchMovieWishList(imdbID));
    };
    useEffect(() => {
        dispatch(fetchAsyncMovieOrShowDetail(imdbID));
        // dispatch(fetchMovieWishList(imdbID));
        return () => {
            dispatch(removeShowOrMovie());
        }
    }, [dispatch, imdbID]);

    useEffect(() => {
        dispatch(fetchMovieWishList(imdbID));
    }, []);


    return (
        <div className='movie-section container1'>
            {Object.keys(movieOrShow).length === 0 ? (<div><Loading /></div>) : (
                <>
                    <div className='section-left'>
                        <div className='title'>
                            <div className='movie-title'>{movieOrShow.Title}</div>
                            <div className='favourite'>
                                <Button className='favoute-btn' onClick={favouriteHandler}>{isFav === false ? (<div>Add to Favourite </div>) : (<div>Remove Favourite</div>)}</Button>
                            </div>
                            <div className='add-wishlist'>
                                <Button className='add-wishlist-btn' onClick={wishListHandler}>Buy</Button>
                            </div>
                        </div>
                        <div className='movie-rating'>
                            <span>
                                IMDB Rating <i className="fa fa-star"></i>: {movieOrShow.imdbRating}
                            </span>
                            <span>
                                IMDB Votes <i className='fa fa-thumbs-up'></i>: {movieOrShow.imdbVotes}
                            </span>
                            <span>
                                Runtime <i className='fa fa-film'></i>: {movieOrShow.Runtime}
                            </span>
                            <span>
                                Year <i className='fa fa-calendar'></i>: {movieOrShow.Year}
                            </span>
                        </div>
                        <div className='movie-plot'>
                            {movieOrShow.Plot}
                        </div>
                        <div className='movie-info'>
                            <div>
                                <span>Director</span>
                                <span>{movieOrShow.Director}</span>
                            </div>
                            <div>
                                <span>Stars</span>
                                <span>{movieOrShow.Actors}</span>
                            </div>
                            <div>
                                <span>Generes</span>
                                <span>{movieOrShow.Genre}</span>
                            </div>
                            <div>
                                <span>Languages</span>
                                <span>{movieOrShow.Language}</span>
                            </div>
                            <div>
                                <span>Awards</span>
                                <span>{movieOrShow.Awards}</span>
                            </div>
                        </div>
                    </div>
                    <div className='section-right'>
                        <img src={movieOrShow.Poster} alt={movieOrShow.Title}></img>
                    </div>
                    <div>

                    </div>
                </>
            )}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Favourites!!
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {isFav && (`Remove ${movieOrShow.Title} from your favorites list`)}
                        {!isFav && (`Add ${movieOrShow.Title} to your favorites list`)}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={addFavorite} >
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSuccess}
                autoHideDuration={3000}
                anchorOrigin={{ vertical, horizontal }}
                onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
                    This is a success message!
                </Alert>
            </Snackbar>
            <Snackbar open={openError}
                autoHideDuration={3000}
                anchorOrigin={{ vertical, horizontal }}
                onClose={errorSnackClose}>
                   <Alert severity="error">Movie already added !!</Alert>
            </Snackbar>

        </div>



    );
};

export default MovieDetail;