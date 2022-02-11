FROM node:16-alpine
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

# Copy the source files into the image
COPY . .
EXPOSE 3000