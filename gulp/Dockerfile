FROM node

RUN npm install -g gulp-cli

RUN mkdir /app/gulp -p

COPY Gulpfile.js /app/gulp
COPY package.json /app/gulp
COPY package-lock.json /app/gulp

RUN cd /app/gulp && npm install

CMD [ "gulp" ]
