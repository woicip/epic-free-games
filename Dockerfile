FROM node:18

WORKDIR /src

COPY package*.json yarn.lock /

RUN yarn install

RUN yarn playwright install
RUN apt-get update \
  && apt-get install -yq libnss3 libnspr4 libdbus-1-3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 libxkbcommon0 libatspi2.0-0 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libgbm1 libasound2 \
  && rm -rf /var/lib/apt/lists/*

ENV PORT="3303"

COPY . .

EXPOSE 3303

CMD ["yarn", "start"]