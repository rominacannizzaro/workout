FROM node:14

ARG PORT

WORKDIR /app

COPY . .

RUN echo "PORT=${PORT}"
RUN npm i

CMD ["npm", "start"]