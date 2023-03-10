/**
* @swagger
* tags:
*   name: Post
*   description: The Posts API
*/

import express from 'express'
const router = express.Router()
import Post from '../controllers/post';
import auth from '../controllers/auth';
import Req from '../socket_models/Req';
import Res from '../socket_models/Res';
import Err from '../socket_models/Err';

/**
* @swagger
* components:
*   schemas:
*     Post:
*       type: object
*       required:
*         - message
*         - sender
*       properties:
*         message:
*           type: string
*           description: The post text
*         sender:
*           type: string
*           description: The sending user id
*       example:
*         message: 'this is my new post'
*         sender: '12342345234556'
*/

/**
 * @swagger
 * /post:
 *   get:
 *     summary: get list of post from server
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: sender
 *         schema:
 *           type: string
 *           description: filter the posts according to the given sender id
 *     responses:
 *       200:
 *         description: the list of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                  $ref: '#/components/schemas/Post'
 *  
 */
router.get('/', auth.authenticateMiddleware, async (req, res) => {
    try {
        const response: Res = await Post.getAllPosts(Req.fromRestRequest(req));
        if (response.err == null) {
            response.sendRestResponse(res);
        }
        if (response.err.code === 400) {
            return res.status(400).send({
                'status': 'fail',
                'message': response.err.message
            });
        }
    } catch (err) {
        console.log("error")
    }
});

   
   

/**
 * @swagger
 * /post/{id}:
 *   get:
 *     summary: get post by id
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         requiered: true
 *         schema:
 *           type: string
 *           description: the requested post id
 *     responses:
 *       200:
 *         description: the requested post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *  
 */
router.get('/:id', auth.authenticateMiddleware, async (req, res) => {
    try {
        const response: Res = await Post.getPostById(Req.fromRestRequest(req));
        if (response.err == null) {
            response.sendRestResponse(res);
        }
        if (response.err.code === 400) {
            return res.status(400).send({
                'status': 'fail',
                'message': response.err.message
            });
        }
    } catch (err) {
        console.log("error")
    }
});


/**
 * @swagger
 * /post:
 *   post:
 *     summary: add a new post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: the requested post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *  
 */
router.post('/', auth.authenticateMiddleware , async (req, res) => {
    try {
        const response: Res = await Post.addNewPost(Req.fromRestRequest(req));
        response.sendRestResponse(res);
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'message': err.message
        });
    }
});


/**
 * @swagger
 * /post/{id}:
 *   put:
 *     summary: update existing post by id
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         requiered: true
 *         schema:
 *           type: string
 *           description: the updated post id    
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: the requested post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *  
 */
router.put('/:id', auth.authenticateMiddleware, async (req, res) => {
    try {
        const response: Res = await Post.putPostById(Req.fromRestRequest(req));
        if (response.err == null) {
            response.sendRestResponse(res);
        }
        if (response.err.code === 400) {
            return res.status(400).send({
                'status': 'fail',
                'message': response.err.message
            });
        }
    } catch (err) {
        console.log("error")
    }
});

export = router