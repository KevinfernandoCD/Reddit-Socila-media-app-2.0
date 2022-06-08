const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoute");
const communityRoutes  = require("./routes/CommunityRoutes");
const connectDB = require("./config/db");
const app = express();

dotenv.config();

app.use(express.json());

app.use(cors({origin:"http://localhost:3000"}));

connectDB();

app.use('/api/user',userRoutes);
app.use('/api/post',postRoutes);
app.use('/api/community',communityRoutes);



app.get('/', (req, res) => {

    res.send("Api is running")
    
});


const server = app.listen(5000, console.log('listening'));