// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default ({ env }: { env: any }) => [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      // In production, set FRONTEND_URL to your deployed frontend domain.
      // Comma-separated values are supported: FRONTEND_URL=https://app.com,https://www.app.com
      origin: env.array('FRONTEND_URL', ['http://localhost:3000']),
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
