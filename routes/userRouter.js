const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/signin", userController.signin);

router.post("/signup", userController.signup);

router.get("/auth", authMiddleware, (req,res)=> {
    res.sendStatus(200);
})
router.get("/token", (req,res)=> {
    console.log ("CHECK TOKEN");
    console.log ("req.headers['cookie']", req.headers['cookie']);
    const token = req.headers['cookie']; 
    console.log ("token", token)
    if (token) {
        res.status(200).json({token:token})
    }
    else {
        res.status(404).json({msg:'no token'});
    }
})
// router.get("/auth", authMiddleware, userController.userCheck);

module.exports = router;
