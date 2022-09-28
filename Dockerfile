FROM node:16.17.1-slim

USER node

WORKDIR /home/node/app

CMD ["tail", "-f", "/dev/null"]