FROM node:14.21.3-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Expose the port your Express app listens on
EXPOSE 3001

# Command to run the application
CMD ["node", "index.js"]