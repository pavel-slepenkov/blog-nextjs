const isProduction = (process.env.NODE_ENV || 'production') === 'production'
module.exports = {
    // basePath: isProduction ? '/blog-nextjs' : '',
    // assetPrefix: isProduction ? '/blog-nextjs/' : '',
    env: {
        BACKEND_URL: '/blog-nextjs',
    },
}
