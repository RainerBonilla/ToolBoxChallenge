import fetch from "node-fetch";
import { csvParser } from "../utils/csvParser.utils.js";

const baseUrl = ' https://echo-serv.tbxnet.com/v1/secret';
const bearerToken = 'aSuperSecretKey';

export const listFiles = async () => {
    try {
        const url = `${baseUrl}/files`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json(); 

        return data;
    } catch (error) {
        console.error('Error while getting the file names:', error);
        return [];
    }
};

export const getFile = async (fileName) => {
    try {
        const url = `${baseUrl}/file/${fileName}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.text();
        const parsedData = csvParser(data);

        return parsedData;
    } catch (error) {
        console.error(`Error while getting the file ${fileName}:`, error);
        return [];
    }
};

export const getAllFiles = async () => {
    try {
        const response = await listFiles();

        if(!response.files) throw Error('No files to get');

        const fileList = [];

        for(let file of response.files){
            const fileData = await getFile(file);

            if(fileData && fileData.length !== 0) {
                fileList.push(...fileData);
            }
        }

        return fileList;
    } catch (error) {
        console.error('Error while getting the files:', error);
    }
};