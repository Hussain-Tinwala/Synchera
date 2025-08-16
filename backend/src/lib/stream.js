import { StreamChat } from "stream-chat"
import "dotenv/config"

const apiKey = process.env.STREAM_API_KEY
const apiSecret = process.env.STREAM_API_SECRET

if (!apiKey || !apiSecret) {
    console.error("Stream API key or secret is undefined");

}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {

    // using this function to get data 
    // and insert it into stream application
    try {
        await streamClient.upsertUsers([userData])
        return userData

    } catch (error) {
        console.error("Error upserting stream user", error)

    }
}

export const generateStreamToken = (userId) => {

}