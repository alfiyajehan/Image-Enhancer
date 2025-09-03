import axios from "axios";

const API_KEY = "wxqzy78m54u1bpvff";
const BASE_URL = "https://techhk.aoscdn.com";
export const enhancedImageApi = async(file) =>{
    try{
        const taskId = await uploadImage(file);
        // console.log("Image uploaded successfully .Task Id: " ,taskId)

        const enhancedImageData = await poll(taskId);
        // console.log("Enhanced Image data :",enhancedImageData)
        return enhancedImageData;
    }
    catch(error){
        console.error("Error in enhancedImageApi:", error);
        return null;
    }
};
const uploadImage = async(file) =>{
    const formData = new FormData();
    formData.append("image_file",file)

    const {data} = await axios.post(`${BASE_URL}/api/tasks/visual/scale`,formData ,{
        headers:{
            "Content-Type": "multipart/form-data",
            "X-API-KEY": API_KEY
        }
    })
    if (!data?.data?.task_id) {
        throw new Error("Failed to upload image! Task id not found.");
    }
    return data.data.task_id;
}

const fetchEnhancedImage = async(taskId) =>{
    const {data} = await axios.get(`${BASE_URL}/api/tasks/visual/scale/${taskId}`,
        {
            headers:{
            "Content-Type": "multipart/form-data",
            "X-API-KEY": API_KEY
            }
        }
    );
    if(!data?.data){
        throw new Error("Fialed to fetch enhanced image")
    }
    return data.data;
}

const poll = async(taskId , retries = 0) =>{
    const result = await fetchEnhancedImage(taskId);
    if(result.state === 4){
        console.log("Processing....");

        if(retries >= 15){
            throw new Error ("Max retries reached.Please try again later.")
        }
        await new Promise((resolve)=> setTimeout(resolve,2000));
        return  poll(taskId,retries+1);
    }
    return result;
}

// {status: 200, message: 'success', data: {…}}
// data
// : 
// {task_id: 'da27bdc7-4ebf-48a8-9aad-1b3de95786ac'}
// message
// : 
// "success"
// status
// : 
// 200
// [[Prototype]]
// : 
// Object