import { Pagination } from "antd";
import { pageSizes } from "../model/consts";
import { useDispatch, useSelector } from "react-redux";
import { paginationCitizensSlice } from "../model/paginationCitizensReducer";
import { useEffect } from "react";
import classes from "./PaginationCitizens.module.css"

export const PaginationCitizens = ({total}) => {
    const { page, size, itemCount: prevCount} = useSelector( state => state.paginationCitizensReducer );
    const { setPage, setSize, setItemCount } = paginationCitizensSlice.actions;
    const dispatch = useDispatch();

    const onPageChange = (page) => {
        dispatch(setPage(page));
    }

    const onSizeChange = (number, size) => {
        dispatch(setSize(size));
    }

    useEffect(()=>{
        if(total === prevCount){
            return;
        }
        dispatch(setItemCount(total));
        dispatch(setPage(1));
    },[total]);

    return(
        <Pagination
            className = {classes.pagination}
            current={page}
            pageSize={size}
            total={total}
            onChange={onPageChange}
            showSizeChanger
            pageSizeOptions={pageSizes}
            locale={{ items_per_page: '- количество элементов' }}
            onShowSizeChange={onSizeChange}
        />
    );
}