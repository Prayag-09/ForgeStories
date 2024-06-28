# ForgeStory Frontend

This is the frontend repository for ForgeStory, a blogging platform for techies.

## Prerequisites

- Node.js (version >= 12.0.0)
- npm or yarn

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Prayag-09/ForgeStory.git
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install   # or `yarn install`
   ```

## Usage

To start the development server:

```bash
npm run dev   # or `yarn start`
```

The application will be served at `http://localhost:5173` by default.

## Deployment

To build the production-ready application:

```bash
npm run build   # or `yarn build`
```

This will create an optimized build in the `build` directory.

## Additional Notes

- Ensure the backend server (`backend`) is running and accessible when developing locally.
- Customize environment variables (`REACT_APP_*`) in `.env` files as needed for different environments.
- For more detailed configurations and scripts, refer to `package.json`.
