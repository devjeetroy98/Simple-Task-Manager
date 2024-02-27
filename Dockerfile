# ! From node:alpine base image
FROM node:alpine

# ! Set the working directory to /myapp
WORKDIR /myapp

# ! Copy all the contents to working directory
COPY . .

# ! ARG params are available only during image build.
ARG configuration

# ! Just to avoid installing dev dependencies in PROD mode
RUN if [ "$configuration" = "development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi

# ! Copy argument to environment variable & echo it
ENV environment  ${configuration}
RUN echo "Environment: $environment"

# ! PORT is  an environment variable whole default value is 3000
ENV PORT 3000
RUN echo "Port: $PORT"
EXPOSE $PORT

CMD ["sh", "-c", "npm run start:$environment"]