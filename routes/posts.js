const router = require("express").Router()
const Post = require("../models/Post")

// add Post
router.post("/", async (req, res) => {
  try {
    const newPost = await new Post(req.body)
    const post = await newPost.save()
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json(err)
  }
})


// update post 
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
          $set: req.body
        }, { new: true })
        res.status(200).json(updatedPost)
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      res.status(401).json("You Can Update Only your post")
    }
  } catch (err) {
    res.status(500).json(err)
  }
})


// Delete post

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post.username === req.body.username) {
      try {
        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json("Post deleted")
      } catch (err) {
        res.status(500).json("hph")
      }
    } else {
      res.status(401).json("You Can Delete")
    }
  } catch (err) {
    res.status(500).json("err")
  }
})


// Get posts 

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json(err)
  }
})


// Get All Posts 
router.get("/", async (req, res) => {
  const username = req.query.user
  const catName = req.query.cat
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username })
    } else if (catName) {
      posts = await Post.find({
        category: {
          $in: [catName]
        }
      })
    } else {
      posts = await Post.find()
    }
    res.status(200).json(posts)
  } catch (err) {
    res.status(500).json(err)
  }
})


module.exports = router