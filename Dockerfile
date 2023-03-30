FROM node:12-alpine as builder

RUN apk --no-cache add g++ make python2

WORKDIR /cmp-front-user

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# The rest of the code is in Production Mode

FROM nginx:alpine as production-build

COPY ./data/nginx /etc/nginx/conf.d
COPY ./data/certs /etc/nginx/certs:ro

# ## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# # Copy from the stahg 1
COPY --from=builder /cmp-front-user/dist /usr/share/nginx/html

EXPOSE 443
ENTRYPOINT ["nginx", "-g", "daemon off;"]