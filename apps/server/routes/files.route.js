import { Router } from "express";
import { getAllFilesData, getFileData, getFiles } from "../controllers/files.controller.js";


export const filesRoutes = () => {
    const router = Router();

    router.route("/files").get(getFiles);
    router.route("/file/:name").get(getFileData);
    router.route("/files/data").get(getAllFilesData);

    return router;
}