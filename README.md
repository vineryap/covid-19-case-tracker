# Covid-19 Case Tracker App

A proof of concept app for monitoring covid-19 global case.

## Tech stack

- FastAPI
- Nuxt (Hybrid rendering)
- Cloudflare Workers (Currently disabled as the app is not deployed.)
- Brevo (formerly Sendinblue) - as mail server
- Data source: https://covid-19.dataflowkit.com/v1/world

## Project Setup Instructions

### Running project via Docker (Recommended)

Helper scripts to build and run the project via docker is provided in the `scripts` directory. The scripts should be run at the root directory of this project.

To build and run the project, use the following command:

```shell
./scripts/start.sh
```

To stop the project, use the following command:

```shell
./scripts/stop.sh
```

To remove images, containers, and volumes related to this project, use the following command:

```shell
./scripts/clean-docker.sh
```

The app can be accessed via `http://127.0.0.1:3000`

Please note that the backend is not accessible from the host when running via docker. This behavior is set intentionally and can be changed via the docker-compose file.

### Building Locally (More steps)

To build and run the projects locally, you will need to have the following tools installed on your machine:

- Node.js
- Python
- Docker (if needed)

### Preparation

Once you have installed the required tools, follow the instructions below:

1. Navigate to the project root directory.
2. Open two terminal windows:
   1. Run `cd frontend` in one terminal window (Frontend terminal).
   2. And run `cd backend`  in the other terminal window (Backend terminal).

#### Frontend
All commands must be executed in the frontend terminal window as indicated in the preparation section.

##### Installing Dependencies

Use the following command to install dependencies:

```shell
npm run install
#or
pnpm install
```

##### Running the app in development mode

Use the following command to run the app in development mode:

```shell
npm run dev
#or
pnpm dev
```

##### Build for production

Build the project using the following command:

```shell
npm run build
#or
pnpm build
```

To preview or run the app in production mode, use one of the following commands:

```shell
npm run preview
#or
pnpm preview
#or
node .output/server/index.mjs
```

#### Backend

All commands must be executed in the backend terminal window as indicated in the preparation section.

Use the following command to install the required dependencies:

```shell
python3 -m venv env

source env/bin/activate

pip install -r requirements.txt
```

Alternatively, you can use the `install.sh` script located in the `backend/scripts` directory to install the dependencies. To use the script, run the following command from the root of the current project:

```shell
./scripts/install.sh
```

If `poerty` is installed on the system, you can install the dependencies via poetry using the following command:

```shell
poetry install
```

##### Run backend app

Run the following command to run the project:
```shell
uvicorn app.app:app --port 8000

#or add --reload option, for development
uvicorn app.app:app --port 8000 --reload
```

The app will be accessible at `http://127.0.0.1:8000`.
