# Stage 1: Development
FROM node:alpine AS development
WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY nest-cli.json ./
COPY apps/payment apps/payment
COPY libs libs
COPY proto proto

RUN npm install
RUN npm run build payment

# Stage 2: Production
FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY --from=development /usr/src/app/dist ./dist
COPY proto proto

EXPOSE 3003

CMD ["node", "dist/apps/payment/main.js"]