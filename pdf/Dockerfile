FROM node:12.13-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --silent
COPY . .
EXPOSE 3201
CMD [ "npm", "start" ]
