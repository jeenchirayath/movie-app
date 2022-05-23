import React, { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { fetchAsyncMovies, fetchAsyncShows, getFavCount } from '../../features/movies/movieSlice';
import { Dialog, MenuItem, IconButton, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { grey } from '@mui/material/colors';
import ShopIcon from '@mui/icons-material/Shop';
import AuthContext from "../context/Auth-Context";
import user from '../../images/download.jpeg';
import "./Header.scss";
import Favourites from '../favoruites/Favourites';
import FavoutesPage from '../../pages/FavoutesPage';

const Header = () => {
    const [term, setTerm] = useState("");
    const [open, setOpen] = useState(false);
    const AuthCtx = useContext(AuthContext);
    console.log(AuthCtx.user)
    const history = useHistory();
    const dispatch = useDispatch();
    const favCount = useSelector(getFavCount)
    const submitHandler = (event) => {
        event.preventDefault();
        if (term !== "") {
            dispatch(fetchAsyncMovies(term));
            dispatch(fetchAsyncShows(term));
            setTerm("");
        }
    }
    const handleLogout = async () => {
        try {
            await AuthCtx.logout();
            history.push('/');
        } catch (error) {
            console.log(error.message);
        }
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);

    };

    return (
        <div className='header'>

            <div className='logo'> <Link to={`/home`}>Movie App</Link></div>
            <div className='search-bar'>
                <form onSubmit={submitHandler}>
                    <input type="text" value={term} placeholder="Search Movies or Shows"
                        onChange={(e) => setTerm(e.target.value)} />
                    <button type='submit'><i className='fa fa-search'></i></button>
                </form>
            </div>
            <div>
                {/* <Button onClick={handleClickOpen} color="sucess">
                    <i className="fa fa-heart"></i>
                </Button> */}
                <MenuItem>
                    <IconButton
                        size="large"
                        aria-label="show 17 new notifications"
                        color="inherit"
                        onClick={handleClickOpen}
                    >
                        <Badge badgeContent={favCount} color="error">
                            <FavoriteIcon color='primary'></FavoriteIcon>
                        </Badge>
                    </IconButton>

                </MenuItem>

            </div>
            <div className='buy-icon'>
                <Link to="/your-movies">
                    <ShopIcon sx={{ color: grey[50] }} />
                </Link>
            </div>

            <div className="p-4 box mt-3 text-center user">
                Hello Welcome <br />
                {AuthCtx.user && AuthCtx.user.email}
            </div>
            <div className="d-grid gap-2">
                <Button variant="primary" onClick={handleLogout}>
                    Log out
                </Button>
            </div>
            <Dialog
                fullWidth={true}
                maxWidth={"sm"}
                scroll='paper'
                PaperProps={{
                    style: {
                        backgroundColor: "#0f171e",
                        boxShadow: "none"
                    },
                }}
                open={open}
                className=""
                onClose={handleClose}>
                <FavoutesPage />
            </Dialog>
        </div>
    );
};

export default Header;