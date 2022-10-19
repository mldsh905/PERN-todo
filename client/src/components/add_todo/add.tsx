import React, {useRef} from 'react';
import classes from './add.module.css';
import axios from "axios";

const Add = () => {
    const ref = useRef<HTMLInputElement>(null);

    const handleClick = (): void => {
        if (ref.current) {
            axios({
                url: `${process.env.REACT_APP_ADDRESS}/todos`,
                method: 'post',
                withCredentials: true,
                data: {description: ref.current.value}
            }).then(res => {
                console.log(res.data);
            }).catch(e => {
                console.log(e);
            })
            window.location.reload();
        }
    }

    return (
        <div className={classes.add}>
            <input ref={ref} type="text" placeholder='add a to-do item'/>
            <button onClick={handleClick}>Add</button>
        </div>
    );
};

export default Add;