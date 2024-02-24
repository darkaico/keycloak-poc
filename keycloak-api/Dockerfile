# Use the official Python image
FROM python:3.12

# Set the working directory inside the container
WORKDIR /app

# Copy the Python API code and Poetry files to the container
COPY ./api /app
COPY pyproject.toml poetry.lock /app/

# Install Poetry
RUN pip install poetry==${POETRY_VERSION}

# Install project dependencies using Poetry
RUN poetry install

# Expose port 5000 for the Flask app
EXPOSE 5000

# Run the Flask app
CMD ["poetry", "run", "python", "app.py"]
