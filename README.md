This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Environment Variables & Build vs Runtime (Next.js 15)

This project distinguishes between build-time (public) and runtime (server-only) environment variables:

Public (build-time, inlined into client bundle):
- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_NODE_ENV`

Server-only (runtime):
- `AUTH_SECRET` (used by NextAuth v5)

Create a local file:

```bash
cp .env.example .env.local
```

Then edit the values as needed. `.env.local` is ignored by git.

### Docker / Container Usage

Build-time values must be provided with `--build-arg` (rebuild required if they change):

```bash
docker build \
	--build-arg NEXT_PUBLIC_API_BASE_URL=http://backend:8000/api/v1 \
	--build-arg NEXT_PUBLIC_NODE_ENV=development \
	-t cloudinsight-frontend .
```

Runtime secrets are passed at `docker run` (can change without rebuild):

```bash
docker run -p 3000:3000 \
	-e AUTH_SECRET="your-strong-random-secret" \
	cloudinsight-frontend
```

If you use a compose file:

```yaml
services:
	web:
		build:
			context: .
			args:
				NEXT_PUBLIC_API_BASE_URL: http://backend:8000/api/v1
				NEXT_PUBLIC_NODE_ENV: development
		environment:
			AUTH_SECRET: ${AUTH_SECRET}
		ports:
			- "3000:3000"
```

### Validation

`src/lib/env.ts` validates required env vars early. Missing variables will throw during startup/build.

### Changing Public Vars at Runtime?

Because `NEXT_PUBLIC_*` vars are inlined at build time, changing them later requires rebuilding the image. If you need truly dynamic client-side values, implement a runtime config endpoint or inject a JSON config via an init container/startup script.


