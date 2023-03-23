# Specify a base image
FROM node:14-alpine

# Set work directory
WORKDIR /usr/app

# Copy everything from current directory to container directory
COPY ./package.json ./

# Install dependencies
RUN npm install

COPY ./ ./

# Setup startup command
CMD ["npm", "start"]
