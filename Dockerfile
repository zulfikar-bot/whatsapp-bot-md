FROM quay.io/lyfe00011/md:beta
RUN ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts
RUN git clone git@github.com:zulfikar-bot/whatsapp-bot-md.git /root/bot
WORKDIR /root/bot
RUN yarn install --network-concurrency 1
CMD ["node", "index.js"]
