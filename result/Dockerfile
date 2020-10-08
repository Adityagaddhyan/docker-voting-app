FROM    node:12.18.4
WORKDIR /usr/src/app3
COPY    package*.json ./
RUN     npm install
COPY    . .
EXPOSE 3011
CMD     [ "node", "app.js" ]