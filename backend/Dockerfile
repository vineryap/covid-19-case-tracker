# Use Python Slim as the base image
FROM python:slim

# Create a new user named 'fastapi'
RUN useradd -ms /bin/bash fastapi

# Update the package repository and install system dependencies
RUN apt-get update && \
    apt-get install -y curl

# Set the working directory
WORKDIR /home/app/assignment-fastapi

# Upgrade pip and install poetry
RUN pip3 install --upgrade pip

# Copy poetry.lock and pyproject.toml to the working directory
COPY poetry.lock pyproject.toml /home/app/assignment-fastapi/

# Install dependencies using Poetry
RUN curl -sSL https://install.python-poetry.org | python3 - \
    && export PATH="/root/.local/bin:$PATH" \
    && poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-ansi

# Copy the application code to the working directory
COPY . /home/app/assignment-fastapi

# Change the ownership of the working directory to "fastapi"
RUN chown -R fastapi /home/app/assignment-fastapi

# Switch to the "fastapi" user
USER fastapi

# Expose port 8000 and start the server using Uvicorn
EXPOSE 8000
CMD ["uvicorn", "app.app:app", "--host", "0.0.0.0", "--port", "8000"]
