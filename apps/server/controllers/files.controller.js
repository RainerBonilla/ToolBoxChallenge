import { getAllFiles, getFile, listFiles } from "../services/files.service.js";


export const getFiles = async (req, res) => {
    try {
        const files = await listFiles();
        if (!files || files.length === 0) {
            return res.status(404).json({ message: "files not found" });
        };

        return res.json(files);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const getFileData = async (req, res) => {
    try {
        const fileName = req.params.name;
        if (!fileName) {
            return res.status(400).json({ message: "please provide a filename" });
        };
        const data = await getFile(fileName);
        if (!data) {
            return res.status(404).json({ message: "file name not found" });
        };

        return res.json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getAllFilesData = async (req, res) => {
    try {
        const fileList = await getAllFiles();
        if (!fileList || fileList.length === 0) {
            return res.status(404).json({ message: "files not found" });
        };

        return res.json(fileList);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}