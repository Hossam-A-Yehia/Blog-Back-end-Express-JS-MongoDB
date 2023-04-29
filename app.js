const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const multer = require('multer');
const cors = require('cors')
const path = require('path')
const AuthRouter = require("./routes/auth")
const UsersRouter = require("./routes/users")
const PostsRouter = require("./routes/posts")
const CategoryRouter = require("./routes/categories")



const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));
dotenv.config()
app.use(express.json())

app.use("/images", express.static(path.join(__dirname, "/images")))

// Mongoose
mongoose.connect(process.env.MONGO_URL, {
}).then(console.log("Connected to mongo"))
  .catch(err => console.error(err));


const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "images")
  },
  filename: (req, file, cd) => {
    cd(null, req.body.name)
  }
})

const upload = multer({ storage })

app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded")
})
// Routes  
app.use("/api/auth", AuthRouter)
app.use("/api/users", UsersRouter)
app.use("/api/posts", PostsRouter)
app.use("/api/category", CategoryRouter)

app.get("*", (req, res) => {
  res.send("hello World")
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log("Server Working"))