import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieWishList, getWishList } from '../../features/movies/movieSlice';
import { Link } from 'react-router-dom';
import './Buy.scss';

const Buy = () => {
    const movies = useSelector(getWishList);
    const dispatch = useDispatch();
    const styles = theme => ({
        tableRow: {
            '&&:hover': {
                backgroundColor: 'red',
            },
        },
    });

    useEffect(() => {
        dispatch(fetchMovieWishList());
    }, [dispatch]);
    return (
        <>
            <div className='buy-header'>
                <h3>
                    Movie Collection
                </h3>

            </div>
            <div className='buy-list'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow className={styles.tableRow}>
                                <TableCell>Title</TableCell>
                                <TableCell align="right">Type</TableCell>
                                <TableCell align="right">Genre</TableCell>
                                <TableCell align="right">Director</TableCell>
                                <TableCell align="right">Year</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {movies.map((row) => (

                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    component={Link} to={`/movie/${row.id}`}
                                >

                                    <TableCell component="th" scope="row">
                                        {row.title}
                                    </TableCell>

                                    <TableCell align="right">{row.type}</TableCell>
                                    <TableCell align="right">{row.genre}</TableCell>
                                    <TableCell align="right">{row.director}</TableCell>
                                    <TableCell align="right">{row.year}</TableCell>

                                </TableRow>

                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
};

export default Buy;