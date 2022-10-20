import express from 'express';

const app = express();
import pool from './db.js';
import cors from 'cors';

app.use(cors({
    origin: 'https://pern-todo-client.onrender.com',
    credentials: true,
    optionSuccessStatus: 200,
}));


app.use(express.json());

//add a new todo
app.post('/todos', async (req, res) => {
    try {
        const {description} = req.body;
        const newTodo = await pool.query(
            'INSERT INTO todo (description) VALUES ($1) RETURNING *', [description]
        )
        res.status(200).json(newTodo.rows)
        // console.log(req.body);
    } catch (e) {
        console.log(e);
        res.status(400).json(e)
    }
})

//get todos
app.get('/todos', async (req, res) => {
    try {
        const getTodo = await pool.query('SELECT * FROM todo ORDER BY ts DESC');
        res.status(200).json(getTodo.rows)
    } catch (e) {
        console.log(e);
        res.status(400).json(e)
    }
})

//update a todo
app.put('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query('UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *', [description, id]);
        res.status(200).json(updateTodo.rows)
    } catch (e) {
        console.log(e);
        res.status(400).json(e)
    }
})

//delete todo
app.delete('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1 RETURNING *', [id]);
        res.status(200).json(deleteTodo.rows)
    } catch (e) {
        console.log(e);
        res.status(400).json(e)
    }
})

app.listen('8080', () => {
    console.log('server is started')
})