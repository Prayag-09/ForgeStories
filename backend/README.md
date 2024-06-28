# ForgeStory Backend
This is the backend repository for ForgeStory, a blogging platform for techies.

## Prerequisites

- Node.js (version >= 12.0.0)
- MongoDB (or any preferred database)
- npm or yarn

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Prayag-09/ForgeStory.git
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install   # or `yarn install`
   ```
## Usage

To start the backend server locally:

```bash
npm start   # or `yarn start`
```

The backend server will start at `http://localhost:5000` by default.

## Deployment

### Deploying on Cloudflare Workers

1. Install Wrangler (Cloudflare Workers CLI):

   ```bash
   npm install -g @cloudflare/wrangler
   ```

2. Configure Wrangler with your Cloudflare account:

   ```bash
   wrangler login
   ```

3. Initialize a new Cloudflare Workers project:

   ```bash
   wrangler init <project-name> --template webpack
   cd <project-name>
   ```

4. Update `wrangler.toml` with your project details and Cloudflare Workers configuration.

5. Build and deploy your project:

   ```bash
   wrangler publish
   ```

   This will deploy your backend to a Cloudflare Worker endpoint.