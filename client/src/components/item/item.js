import React, {useState} from 'react';
import classes from "../list/list.module.css";
import axios from "axios";

const Item = (props) => {
    // console.log(props.props);
    const item = props.props;
    const [edit, setEdit] = useState(false);
    const [content, setContent] = useState('');
    const [origin, setOrigin] = useState('');
    const handleChange = (e) => {
        setContent(e.target.value);
    }

    return (
        <div className={classes.item} >
            {
                edit?
                    <>
                        <input type="text" onChange={handleChange} value={content}/>
                        <button onClick={()=>{
                            if (origin !== content){
                                axios({
                                    url: `${process.env.REACT_APP_ADDRESS}/todos/${item.todo_id}`,
                                    method: 'put',
                                    withCredentials: true,
                                    data:{description: content}
                                }).then(res => {
                                    // setList(res.data);
                                    // console.log(res.data);
                                    window.location.reload();
                                }).catch(e => {
                                    console.log(e);
                                })
                            }
                            setEdit(false);
                        }}>Update</button>
                    </>
                :
                    <>
                        <span>{item.description}</span>
                        <button onClick={(e) => {
                            setContent(item.description);
                            setOrigin(item.description);
                            setEdit(true);
                        }}>edit
                        </button>
                    </>

            }

            <button onClick={() => {
                axios({
                    url: `${process.env.REACT_APP_ADDRESS}/todos/${item.todo_id}`,
                    method: 'delete',
                    withCredentials: true,
                }).then(res => {
                    // console.log(res.data);
                    window.location.reload()
                }).catch(e => {
                    console.log(e);
                })
            }}>delete
            </button>
        </div>
    )
};

export default Item;