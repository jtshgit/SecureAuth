const axios = require('axios');

exports.proxyImage = async (req, res) => {
    const imageUrl = req.query.url;  // URL to the image (passed as query parameter)
    if (!imageUrl) {
        return res.status(400).send('Image URL is required');
    }
    try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

        // Set appropriate headers for image type
        const contentType = response.headers['content-type'];
        res.set('Content-Type', contentType);

        // Send the image as a response
        res.send(response.data);
    } catch (error) {
        // console.error('Error fetching image:', error);
        res.status(500).send('Failed to load image');
    }
};