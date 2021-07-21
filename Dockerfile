FROM node:16

RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y ffmpeg youtube-dl

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

CMD [ "npm", "start" ]
