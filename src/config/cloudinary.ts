import { v2 as cloudinary } from 'cloudinary';
import { config } from "./config"

    // Configuration
    cloudinary.config({ 
        cloud_name: config.cloudinayCloud,
        api_key: config.cloudinayApiKey, 
        api_secret: config.cloudinaySecret
    });

    export default cloudinary;