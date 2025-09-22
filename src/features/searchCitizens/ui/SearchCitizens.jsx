import { Input } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchCitizensSlice } from '../model/searchCititzensReducer';

const { Search } = Input;

export const SearchCitizens = () => {

    const searchQuery = useSelector( state => state.searchCitizensReducer.searchQuery );
    const { setSearchQuery } = searchCitizensSlice.actions;
    const dispatch = useDispatch();

    const [local, setLocal] = useState(searchQuery);

    const onSearch = (searchValue) => {
        dispatch(setSearchQuery(searchValue));
    };

    const onChange = (event) => {
        const searchValue = event.target.value;
        setLocal(searchValue);
        if(!searchValue){
            dispatch(setSearchQuery(searchValue));
        }
    };
    return(
        <Search
            placeholder="Поиск"
            enterButton="Поиск"
            allowClear
            value={local}
            onChange={onChange}
            onSearch={onSearch}
            size="large"
        />
    );
};