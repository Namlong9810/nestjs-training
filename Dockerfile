FROM node:22.13.1
WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN apt-get update 

RUN npm install  

COPY . .

RUN npm run build

EXPOSE 3000
CMD [ "node", "dist/main.js" ]