FROM node:14

ARG MONGODB_URI, HOST, SECRET, PORT

WORKDIR /app

COPY . .

RUN touch .env
RUN chmod 777 .env
RUN echo "SECRET=${SECRET}" > .env
RUN echo "HOST=${HOST}" >> .env
RUN echo "MONGODB_URI=${MONGODB_URI}" >> .env
RUN echo "PORT=${PORT}" >> .env
RUN npm i

CMD ["npm", "start"]