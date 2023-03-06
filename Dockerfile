FROM node:14

ENV DEBIAN_FRONTEND=noninteractive
ENV GIT_SSL_NO_VERIFY=1


WORKDIR /app
COPY src/ /app

RUN npm install
RUN npm install use-dark-mode  --legacy-peer-deps

EXPOSE 4400
ENTRYPOINT [ "npm", "run", "dev" ]
