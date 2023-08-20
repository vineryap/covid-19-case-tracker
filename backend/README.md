# Backend - Assignment Web Dev

## Table of Contents:
- Prerequisites
- Installation
- Usage
- Scripts
  - clean.sh
  - Docker
    - build.sh
    - start.sh
    - stop.sh
    - clean.sh
    - run-docker.sh

## Dependencies:
- fastapi
- uvicorn
- pydantic[email]
- requests
- bleach

## Prerequisites

The project requires Python installed. You can download the latest version of Python from the official website.
The project may also require certain libraries or modules installed. These dependencies can be found in the requirements.txt or pyproject.toml file.


## Installation

Install the required dependencies using the following command:

```shell
python3 -m venv env

source env/bin/activate

pip install -r requirements.txt
```

Another option is using the `install.sh` script located in the `scripts` directory.

To use the script run the following command from the root of current project:

```shell
./scripts/install.sh
```

If `poerty` is installed in the system, feel free to install the dependencies via poetry:

```shell
poetry install
```

## Run Project

Run the following command to run the project:
```shell
uvicorn app.app:app --port 8000

#or add --reload option, for development
uvicorn app.app:app --port 8000 --reload
```

The app will be accessible at `http://127.0.0.1:8000`.

## Endpoints

All endpoints are prefixed with `/api/v1`, making the base URL `http://127.0.0.1:8000/api/v1` except for healthcheck endpoint which is `http://127.0.0.1:8000/api/healthcheck`.

The routes below are written in a format of `[HTTP METHOD] [path]` following the base URL:
- GET `/covid19-statistics/all` : Returns all COVID-19 cases from https://covid-19.dataflowkit.com
- GET `/covid19-statistics/<country-name>` : Retrieves data for a specific country.
- POST `/send-email` : To send email to info@corpy.co.jp

## Docker

Helper scripts to build and running docker are provided in the `/scripts/docker` directory.

- `build.sh`: Builds the docker image. Skips if the image already exists.
- `start.sh`: Starts the service via docker.
- `stop.sh`: Stops the service.
- `clean.sh`: Removes the current project image, container, and volume.
- `run-docker.sh`: A wrapper to run the build and start scripts.
