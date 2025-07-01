# Stage 1: Development
FROM node:alpine AS development
WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY apps/reservations apps/reservations
COPY libs libs

RUN npm install
RUN npm run build

# Stage 2: Production
FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/apps/reservations/main.js"]