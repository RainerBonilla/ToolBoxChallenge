FROM node:16.20.2-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Expose the default Vite dev server port
EXPOSE 5173

# Start the Vite development server with host option for Docker
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]