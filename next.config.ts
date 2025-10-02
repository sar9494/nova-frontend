// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Dev дээр зөвшөөрөх origin-ууд
    allowedDevOrigins: [
      "https://grayce-tergal-woolly.ngrok-free.dev", // Чиний ngrok URL
    ],
  },

  // Teams iframe дээр зөв ажиллуулах security headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors teams.microsoft.com *.teams.microsoft.com *.skype.com;",
          },
          {
            key: "X-Frame-Options",
            value: "ALLOW-FROM https://teams.microsoft.com",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
