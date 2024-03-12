const Router = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const companyController = require("../controllers/companyController");
const router = new Router();

router.post("/info",authMiddleware, companyController.infoAllCompanys); 
// here is a POST because the infoAllCompanys endpoint needs a request body
router.get("/info/:id", authMiddleware, companyController.infoCompany);
router.post("/create", authMiddleware, companyController.create);
router.put("/update/:id", authMiddleware, companyController.update);
router.delete("/delete/:id", authMiddleware, companyController.delete);

module.exports = router;
