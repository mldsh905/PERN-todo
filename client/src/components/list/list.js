import React, {useEffect, useRef, useState} from 'react';
import classes from './list.module.css';
import axios from "axios";
import Item from "../item/item";

const List = () => {

    const [list, setList] = useState([]);

    useEffect(() => {
        axios({
            url: `${process.env.REACT_APP_ADDRESS}/todos`,
            method: 'get',
            withCredentials: true,
        }).then(res => {
            setList(res.data);
            // console.log(res.data);
        }).catch(e => {
            console.log(e);
        })
    }, [])

    return (
        <div className={classes.list}>
            {list.map((item) => {
                return (
                    <Item key={item.todo_id} props={item}/>
                )
            })}
        </div>
    );


};

export default List;