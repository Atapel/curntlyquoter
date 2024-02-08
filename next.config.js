module.exports = {
    reactStrictMode: true,
    async headers() {
      return [
        {
          source: '/api_requests',

          headers: [
            {
              key: 'Access-Control-Allow-Credentials',
              value: 'true',
            },
            {
              key: 'Access-Control-Allow-Origin', 
              value: '*',
            },
            {
              key: 'Access-Control-Allow-Methods',
              value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
            },
          ],
        },
      ]
    }
  }
  
