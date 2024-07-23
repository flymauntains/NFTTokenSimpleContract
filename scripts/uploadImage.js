const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// Replace this with your actual JWT token
const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhMjc5OTQ0ZS1lZTVjLTRiYjktODQzNy1hZDIyZDM1NzU2MDIiLCJlbWFpbCI6ImZseW1hdW50YWluc0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMmJkOGQxOTIyMjEwYzg0N2EwYzciLCJzY29wZWRLZXlTZWNyZXQiOiJjMzFmM2FhYWYxYzEwMmMzYTQ2MjlhODMwYzVlYTBhZGI0ZDBlZmNjMjQ2YzlmNzUxOTk2MTVjYmJlMjNiZTYxIiwiaWF0IjoxNzIxNzQxNjc2fQ.2I9FjksZvuubjVF0XoH8j33pjN-pE0nruyAADuzfgEc';

const pinFileToIPFS = async () => {
    const formData = new FormData();
    const src = path.join(__dirname, '../assets/mountain.jpeg'); // Use path.join to get the correct file path

    const file = fs.createReadStream(src);
    formData.append('file', file);

    const pinataMetadata = JSON.stringify({
      name: 'Mountain Image',
    });
    formData.append('pinataMetadata', pinataMetadata);

    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    });
    formData.append('pinataOptions', pinataOptions);

    try {
        const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
            maxBodyLength: "Infinity",
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                'Authorization': `Bearer ${JWT}`
            }
        });

        // Log the entire response to inspect
        console.log('Response:', res.data);

        // Extract the CID from the response
        const cid = res.data.IpfsHash;
        console.log('CID:', cid);

        // Construct the tokenURI using the CID
        const tokenURI = `https://gateway.pinata.cloud/ipfs/${cid}`;
        console.log('tokenURI:', tokenURI);
    } catch (error) {
        console.error('Error uploading to Pinata:', error);
    }
}

pinFileToIPFS();
