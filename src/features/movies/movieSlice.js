import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import jsonServer from "../../common/apis/jsonServer";
import { APIKey } from "../../common/apis/movieApiKey";
import { async } from "@firebase/util";

export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies', async (movieText) => {

    const response = await movieApi
        .get(`?apikey=${APIKey}&s=${movieText}&type=movie`)
        .catch(error => {
            console.log(error);
        });
    return response.data;
});

export const movieWishList = createAsyncThunk('movies/movieWishList', async (movie) => {
    try {
        const response = await jsonServer.post('movieList', {
            id: movie.id,
            title: movie.title,
            type: movie.type,
            year:movie.year,
            genre:movie.genre,
            director:movie.director
        })
        return response.data;
    } catch (error) {
        console.log("errornew");
        throw new Error('Parameter is not a number!');
     }

});

export const fetchMovieWishList = createAsyncThunk('movies/fetchMovieWishList', async (id) => {
    const response = await jsonServer.get('movieList')
        .catch(error => {
            console.log(error);
        })
    return response.data;
});
export const fetchAsyncShows = createAsyncThunk('movies/fetchAsyncShows', async (seriesText) => {
    const response = await movieApi
        .get(`?apikey=${APIKey}&s=${seriesText}&type=series`)
        .catch(error => {
            console.log(error);
        });
    return response.data;
});
export const fetchAsyncMovieOrShowDetail = createAsyncThunk('movies/fetchAsyncMovieOrShowDetail', async (id) => {
    const response = await movieApi
        .get(`?apikey=${APIKey}&i=${id}&plot=full`)
        .catch(error => {
            console.log(error);
        });
    return response.data;
});
const initialState = {
    movies: {},
    shows: {},
    selectedMovieOrShow: {},
    loader: false,
    favorite: [],
    favCount: 0,
    wishList: []
};

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        addMovies: (state, { payload }) => {
            state.movies = payload;
        },
        removeShowOrMovie: (state) => {
            state.selectedMovieOrShow = {};
        },
        favoriteMovies: (state, { payload }) => {
            console.log(payload);
            let isPresent = false;
            state.favorite = state.favorite.filter((fav) => {
                if (fav.name === payload.name) {
                    isPresent = true;
                    state.favCount = state.favCount - 1;
                }
                return fav.name !== payload.name;
            })
            const favMov = {
                id: payload.id,
                name: payload.name
            }
            if (isPresent === false) {
                state.favCount = state.favCount + 1;
                state.favorite.push(favMov);
            }
        }
    },
    extraReducers: {
        [fetchAsyncMovies.pending]: (state) => {
            console.log("Pending");
            return { ...state, loader: true }
        },
        [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
            console.log("Fetched Successfully");
            return { ...state, movies: payload, loader: false }
        },
        [fetchAsyncMovies.rejected]: (state) => {
            console.log("Rejected!!");
            return { ...state, loader: true }
        },
        [fetchAsyncShows.fulfilled]: (state, { payload }) => {
            console.log("Fetched Successfully");
            return { ...state, shows: payload, loader: false }
        },
        [fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
            console.log("Fetched Successfully");
            return { ...state, selectedMovieOrShow: payload }
        },
        [fetchMovieWishList.pending]: (state) => {
            console.log("movieWishlist fetching");
            return { ...state }
        },
        [fetchMovieWishList.fulfilled]: (state, { payload }) => {
            console.log("movieWishlist fetched successfully");
            return { ...state, wishList: payload }
        }
    }
});

export const { addMovies, removeShowOrMovie, favoriteMovies } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getAllFav = (state) => state.movies.favorite;
export const getFavCount = (state) => state.movies.favCount;
export const getAllMovieOrShow = (state) => state.movies.selectedMovieOrShow;
export const getMovieSearchText = (state) => state.movies.searchMovieText;
export const loader = (state) => state.movies.loader;
export const getWishList = (state) => state.movies.wishList;
export default movieSlice.reducer;