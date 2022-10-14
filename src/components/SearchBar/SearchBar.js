import React, { useEffect, useState } from 'react';
import './SearchBar.css';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from '@material-ui/core';
import { Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { searchNFTs } from '../../lib/redux/actions/SearchAction';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(searchNFTs(query));
    }, [query]);

    return (
        <Stack direction='row' spacing={1} style={{ alignContent: 'center', border: '1px solid white', borderRadius: '50px', padding: '2px', display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ width: '5vw', height: '5vw', padding: '2px' }}>
                <SearchIcon />
            </div>
            <InputBase placeholder='Search...' className='placehodler_searchbar' sx={{ ml: 1, flex: 1 }} onChange={event => setQuery(event.target.value)} />
        </Stack>
    );
};

export default SearchBar;