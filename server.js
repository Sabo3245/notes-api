import express from "express"
import pg from "pg"


const app = express();
const db = new pg.Client({
    database:"notesdb",
    host:"localhost",
    user:"postgres",
    password:"poiqwe",
    port:5432,
})

app.use(express.json())

db.connect();


app.post("/notes" , async (req,res)=>{

    console.log(req.body)
    try{
        const result = await db.query("INSERT INTO notes(title , content) VALUES($1 , $2)" , [req.body.title , req.body.content])
    }catch{
        const response = {"status" : "failed"};
        res.status(404).json(response)
    }
    

    const response = {"status" : "success"};
    res.json(response);

    
})

app.get("/notes" , async(req,res)=>{

        const result = await db.query("SELECT * FROM notes");
        
        let notes = result.rows.map(row => ({
            title: row.title,
            content: row.content
        }));

        res.status(200).json(notes)
})

app.get("/notes/:id" , async(req,res)=>{
    const noteId = req.params.id;
    const result = await db.query("SELECT * FROM notes WHERE id = $1" , [noteId])

    if(result.rows.length === 0){
        return res.status(404).json({error:"Note not ofund nafsnsfn"})
    }


        let notes = result.rows.map(row => ({
        title: row.title,
        content: row.content
    }));

    res.json(notes)
})

app.delete("/notes/:id" , async(req,res)=>{
    const noteId = req.params.id;
    const result = await db.query("DELETE FROM notes WHERE id=$1" , [noteId])

    res.status(202).json("succesful")
})


app.listen(3000 , ()=>{
    console.log("running")
})