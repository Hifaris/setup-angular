const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const postRoutes = require('./routes/postRoutes')

const app = express()

mongoose.connect('mongodb://localhost:27017/angular-node')
.then(() => console.log('✅ Connected to MongoDB successfully!'))
.catch((err) => console.error('❌ Connection error:', err));

// app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
    next()
})
app.use(postRoutes);


// app.post('/api/post', async (req, res, next) => {
//   try {

//       const post = new Post({
//           title: req.body.title,
//           content: req.body.content
//       });

//       const result = await post.save();

//       res.status(201).json({
//           message: 'Post added successfully',
//           postId: result._id
//       });

//   } catch (error) {
//       console.error(error);
//       res.status(500).json({
//           message: 'Failed to add post',
//           error: error.message
//       });
//   }
//   next();
// });

// app.get('/api/post', async (req,res,next)=> {
//   try {

//     const posts = await Post.find()
//     return res.status(200).json({
//      message: 'posts fetched successfully',
//       posts: posts
//      })
    
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ message: 'Fetching posts failed!' })
//   }
//   next()

// })

// app.get('/api/post/:id', async (req,res,next)=>{
//   try {
//     const post = await Post.findById(req.params.id)
//     res.status(200).json(post)
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ message: 'Fetching posts failed!' })
//   }
//   next()
// })
// app.put('/api/post/:id',async (req,res,next)=>{
//   const post ={
//     title: req.body.title,
//     content: req.body.content
//   }
//   try {
//     await Post.updateOne({_id: req.params.id},post)
//     res.status(200).json({message: 'Update successfl'})
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ message: 'Updating posts failed!' })
//   }
//   next()
// })
// app.delete('/api/post/:id', async (req,res,next)=>{
//   try {
//     await Post.deleteOne({_id: req.params.id})
//     res.status(200).json({message: 'Post deleted'})
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ message: 'Deleting posts failed!' })
//   }
//   next()
// })


module.exports = app