FROM ubuntu:18.04

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


RUN mkdir /app/gulp -p

COPY Gulpfile.js /app/gulp
COPY package.json /app/gulp
COPY package-lock.json /app/gulp

RUN cd /app/gulp && npm install

CMD [ "gulp" ]
