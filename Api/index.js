const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/repositories', async (req, res) => {
    try {
        const response = await axios.get('https://api.github.com/users/takenet/repos?per_page=100', {
            headers: { 'User-Agent': 'Node.js App' }
        });

        const repos = response.data
            .filter(repo => repo.language === 'C#')
            .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
            .slice(0, 5)
            .map(repo => ({
                avatar_url: "https://avatars.githubusercontent.com/u/4369522?v=4",
                name: repo.full_name,
                description: repo.description
            }));

        res.json(repos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching repositories from GitHub' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
