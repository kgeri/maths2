# Development

`npm i`

`npm run dev`

# Deployment

```
npm run build
./node_modules/.bin/wrangler login
CLOUDFLARE_ACCOUNT_ID=... npx wrangler pages publish dist/
```
