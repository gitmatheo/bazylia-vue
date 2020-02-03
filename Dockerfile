FROM node:8.12-alpine
RUN apk add g++ make python
EXPOSE 4000
RUN mkdir /app
WORKDIR /app
COPY . /app
RUN npm install
CMD ["npm", "run", "serve", "--", "--port=4000"]