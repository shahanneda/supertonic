FROM node:18-alpine

ENV NODE_ENV production
# Create app directory
WORKDIR /usr/src/app

# Copy source
COPY --chown=node:node . .

# Install app dependencies
RUN npm ci
RUN npx prisma generate

RUN npm run build
EXPOSE 3000

CMD [  "node", "dist/main.js" ]