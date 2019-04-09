FROM multiarch/alpine:armhf-v3.9

RUN apk add --no-cache nodejs-current yarn ca-certificates
RUN apk --no-cache add curl \
    && echo "Pulling watchdog binary from Github." \
    && curl -sSL https://github.com/openfaas/faas/releases/download/0.13.0/fwatchdog-armhf > /usr/bin/fwatchdog \
    && chmod +x /usr/bin/fwatchdog \
    && apk del curl --no-cache

WORKDIR /root
ENV NPM_CONFIG_LOGLEVEL warn
ADD . .
RUN yarn --pure-lockfile

ENV cgi_headers="true"

ENV fprocess="node index.js"
EXPOSE 8080

HEALTHCHECK --interval=3s CMD [ -e /tmp/.lock ] || exit 1

CMD ["fwatchdog"]
