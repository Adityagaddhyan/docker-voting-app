FROM    node:12.18.4
WORKDIR /usr/src/app2
COPY    package*.json ./
RUN     npm install
COPY    . .
EXPOSE 3011
CMD     [ "node", "app.js" ]