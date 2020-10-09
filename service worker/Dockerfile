FROM    node:12.18.4
WORKDIR /usr/src/app2
COPY    package*.json ./
RUN     npm install
COPY    ./ ./
CMD     [ "node", "app.js" ]