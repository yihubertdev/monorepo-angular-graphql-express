#   syntax=docker/dockerfile:1

FROM node:16.13.2

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /node_modules/.bin:$PATH

# install and cache app dependencies
RUN npm install -g @angular/cli@7.3.9
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
COPY angular.json /app/angular.json
RUN npm ci

# add app
COPY . ./app
