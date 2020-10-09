#Specify a base image
FROM    node:12.18.4

#Specify a working directory
WORKDIR /usr/src/app

#Copy the dependencies file
COPY    package*.json ./

#Install dependencies
RUN     npm install

#Copy remaining files
COPY    ./ ./

#Default command
CMD     [ "node", "app.js" ]
