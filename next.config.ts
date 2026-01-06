import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Décommentez si votre repo n'est pas à la racine du domaine
  // basePath: '/lria-sesih-website',
  // assetPrefix: '/lria-sesih-website/',
}

export default nextConfig
