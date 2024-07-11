const userService = require ('../servvices/UserService')

class UserController {

    async createUser(req, res, next){
        try{
            const userData = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                sex: req.body.sex,
                picture: req.file ? req.file.path: '',           
            }
            const user = await userService.createUser(userData)
            res.status(201).send({message: "User registered successfuly", user: user})
        }catch(error){
            next(error);
        }
    }
    async loginUser(req, res, next){
        try{
            const userData = {
                email: req.body.email,
                password: req.body.password,
            };
            const {token, user} = await userService.loginUser(userData);
            res.json({token, user});
        }catch(error){
            next(error);
        }
    }

    async getUserById(req, res){
        try{
            const user = await userService.getUserById(req.params.id)
            if(!user){
                return res.status(404).send({err : 'User not found!'})
            }
            res.status(200).send(user)
        }catch(err){
            res.status(400).send({ err : err.message })
        }
    }

    async updateUser(req, res){
        try{
            const user = await userService.updateUser(req.params.id, req.body)
            if(!user){
                return res.status(404).send({err : 'User not found!'})
            }
            res.status(200).send(user)
        }catch(err){
            res.status(400).send({ err : err.message })
        }
    }

    async deleteUser(req, res){
        try{
            const user = await userService.deleteUser(req.params.id)
            if(!user){
                return res.status(404).send({err : 'User not found!'})
            }
            res.send({message: 'user deleted successfully!'})
        }catch(err){
            res.status(400).send({ err : err.message })
        }
    }

    async getAllUsers(req, res){
        try{
            const users = await userService.getAllUser()
            res.send(users)
        }catch(err){
            res.status(400).send({ err : err.message })
        }
    }

    async followUser(req, res) {
        try {
            const user = await userService.followUser(req.params.userId, req.body.followUserId)
            res.status(200).json(user);
        } catch (error) {
            res.status(400).send({ error : error.message })
        }        
    }

    async unfollowUser(req, res) {
        try {
            const user = await userService.unfollowUser(req.params.userId, req.body.followUserId)
            res.status(200).json(user);
        } catch (error) {
            res.status(400).send({ error : error.message })
        }        
    }

    async getUserFeed(req, res) {
        try {
            const feed = await userService.getUserFeed(req.params.userId)
            res.status(200).json(feed);
        } catch (error) {
            res.status(400).send({ error : error.message })
        }        
    }

}

module.exports = new UserController()