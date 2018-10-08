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
  && apt-get install -y nodejs \
  && npm install -g npm && npm i -g pm2 typescript \
  && node -v \
  && npm -v

RUN mkdir /app

COPY ./bin /app/bin
COPY ./dist /app/dist
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./tsconfig.json /app/tsconfig.json
COPY ./pm2.json /app/pm2.json
COPY ./index.js /app/

RUN cd /app && npm install

RUN cd /app && npm link

WORKDIR /opt/vemsy

RUN vemsy && npm install -S /app

EXPOSE 9999 9998

CMD [ "pm2-runtime", "start", "/opt/vemsy/pm2.json" ]
