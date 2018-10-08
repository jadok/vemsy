FROM ubuntu:18.04

LABEL maintainer="jadok"

ENV NODE_VERSION 10.x

ENV DEBIAN_FRONTEND=noninteractive LANG=C.UTF-8

RUN apt-get update
RUN apt-get install -y --no-install-recommends curl zip unzip net-tools vim less wget bash gnupg
RUN apt-get install -y ca-cacert ca-certificates \
    && update-ca-certificates
# Install Node.js
RUN curl -sL https://deb.nodesource.com/setup_$NODE_VERSION -o nodesource_setup.sh \
  && bash ./nodesource_setup.sh \
  && apt-get install -y nodejs

RUN npm install -g npm && npm i -g pm2
RUN node -v
RUN npm -v

RUN mkdir /app

COPY ./bin /app/bin
COPY ./dist /app/dist
COPY ./node_modules /app/node_modules
COPY ./package.json /app/package.json
COPY ./tsconfig.json /app/tsconfig.json
COPY ./pm2.json /app/pm2.json
COPY ./index.js /app/

ENV NPM_CONFIG_LOGLEVEL warn

RUN cd /app && npm link

RUN chmod +x /app /usr/bin/vemsy -R 

WORKDIR /opt/vemsy

RUN /usr/bin/vemsy
RUN npm install -S /app

EXPOSE 9999

CMD [ "pm2-runtime", "start", "/opt/vemsy/pm2.json" ]
