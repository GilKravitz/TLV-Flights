import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
const swaggerDocument = YAML.load("./src/utils/swagger/swagger.yaml");
const router = express.Router();

router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerDocument));
export default router;
