FROM node:13-alpine

RUN mkdir -p /usr/src/server
COPY package.json /usr/src/server

WORKDIR /usr/src/server

# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
# we also do the NPM install here
RUN  npm install 


COPY ./ /usr/src/server

EXPOSE 80

CMD npm start