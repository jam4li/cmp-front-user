FROM node:19-alpine as builder

WORKDIR /cmp-front-user

ENV NODE_OPTIONS="--openssl-legacy-provider"

COPY . .

# install project dependencies
RUN npm install -g npm@latest
RUN npm install --production

# Build the app for production
RUN npm run build

# The rest of the code is in Production Mode

FROM nginx:alpine as production-build

COPY ./data/nginx/nginx.prod.conf /etc/nginx/conf.d
COPY ./data/certs /etc/nginx/certs:ro

# ## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# # Copy from the stahg 1
COPY --from=builder /cmp-front-user/dist /usr/share/nginx/html

EXPOSE 443
ENTRYPOINT ["nginx", "-g", "daemon off;"]