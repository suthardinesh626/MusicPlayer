import axios from "axios";

const API = 'https://cms.samespace.com/items/songs'

const songData = async () => {
    try {
        const response = await axios.get(API);
        // console.log('This is th api reponse',response.data);
        

        return response.data.data


    } catch (error) {
        console.error(error.message)
    }

}

export { songData }