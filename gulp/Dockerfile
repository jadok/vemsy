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
  && apt-get install -y nodejs \
  && node -v \
  && npm -v

WORKDIR /app/gulp

COPY ./Gulpfile.js /app/gulp/Gulpfile.js
COPY ./package.json /app/gulp/package.json
COPY ./package-lock.json /app/gulp/package-lock.json

RUN cd /app/gulp && npm install

RUN npm install -g gulp-cli
RUN gulp -v

CMD [ "gulp" ]
