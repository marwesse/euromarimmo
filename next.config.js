/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'plus.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'i.postimg.cc',
            },
            {
                protocol: 'https',
                hostname: 'encrypted-tbn0.gstatic.com',
            },
            // For Supabase public URLs if you're using them directly from your project bucket
            {
                protocol: 'https',
                hostname: 'ktyfcvgmyxddyubxtpks.supabase.co', // Replace with their actual project ID if possible, or use a wildcard later if needed. But let's add common wildcards for images just in case
            },
            {
                protocol: 'https',
                hostname: '*.supabase.co',
            }
        ],
    },
};

module.exports = nextConfig;
