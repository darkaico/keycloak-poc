# Use the official Node.js 18.18 image
FROM node:18.18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock /app/

# Install dependencies
RUN yarn

# Copy the entire source code to the container
COPY ./src /app/src

# Expose port 3000 for the React app
EXPOSE 3000

# Run the development server
CMD ["yarn", "run", "dev", "--port", "3000"]
