FROM bonakodo/wallarm-heroku:4.6

# Install NodeJS v20 from NodeSource
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
		&& apt-get install -y nodejs && apt-get clean

ADD . /opt/webapp
WORKDIR /opt/webapp
# Install dependencies and build the app
RUN npm install --omit=dev && npm run build
ENV npm_config_prefix /opt/webapp

# Note that in private spaces the `run` section of heroku.yml is ignored
# See: https://devcenter.heroku.com/articles/build-docker-images-heroku-yml#known-issues-and-limitations
CMD ["npm", "run", "start"]
