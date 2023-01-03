
import { response } from "express"
import { Server, Socket } from "socket.io"
import { DefaultEventsMap } from "socket.io/dist/typed-events"
import postController from "../controllers/post"
import Res from "../socket_models/Res"
import Req from "../socket_models/Req"
import Err from "../socket_models/Err"

export = (io:Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>, 
            socket:Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>) => {
                
        const getAllPosts  = {
        name: 'post:get',
        handle: async (body, socket, io) => {
        try {
        const response = await postController.getAllPosts( new Req(body,socket.data.user._id))
        socket.emit('post:get.response' , response.body)
        } catch (err) {
        socket.emit('post:get.response' , {'status':'fail'})
        }
        }
       }
    
    const getPostById = 
    {
        name:'post:get:id',
        handle: async (body, socket, io) => {
        try {
            const response:Res = await postController.putPostById(new Req(body, socket.data.user._id,body.postId));
            socket.emit('post:get:id.response', response.body);
        } catch (err) {
            socket.emit('post:get:id.response', { 'status': 'fail' });
        }
     }
    }
    
    const addNewPost = {
        name: 'post:post',
        handle: async (body, socket, io) => {
        try {
        const response = await postController.addNewPost( new Req(body,socket.data.user._id))
        socket.emit('post:post.response' , response.body)
        } catch (err) {
        socket.emit('post:post.response' , {'status':'fail'})
        }
        }
    }
    const putPostById = {
        name:'post:put',
        handle:async (body, socket, io)=>{
        try {
            const response:Res = await postController.putPostById(new Req(body,body.userId,body.postId));
            socket.emit('post:put.response', response.body);
        } catch (err) {
            socket.emit('post:put.response', { 'status': 'fail' });
        }
        }
    }
    const getPostsBySender = 
    {
    
        name:'post:get:sender',
        handle:async (body, socket, io) => {
        try {
            const response:Res = await postController.getAllPosts(new Req(body, body.userId,null, {'sender':body.userId}));
            socket.emit('post:get:sender.response', response.body);
        } catch (err) {
            socket.emit('post:get:sender.response', { 'status': 'fail' });
        }
        }
    }

    socket.on(getAllPosts.name, getAllPosts.handle)
    socket.on(getPostById.name, getPostById.handle)
    socket.on(addNewPost.name, addNewPost.handle)
    socket.on(getPostsBySender.name, getPostsBySender.handle)
    socket.on(putPostById.name, putPostById.handle)
}
 
