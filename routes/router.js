const express = require('express');
const {logIn} = require('../controllers/login');
const {signUp} = require('../controllers/signup');
const { getMyBlogs } = require('../controllers/getMyBlogs');
const { getAllBlogs } = require('../controllers/getAllBlogs');
const { postBlog } = require('../controllers/postBlog');
const { removePending } = require('../controllers/removePending');
const { addPending } = require('../controllers/addPending');
const router = express.Router();

router.post('/login',logIn);
router.post('/signup',signUp);
router.post('/postblog',postBlog);
router.post('/addpending',addPending);
router.post('/removepending',removePending);
module.exports = router;