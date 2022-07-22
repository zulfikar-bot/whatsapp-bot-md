FROM quay.io/lyfe00011/md:beta
RUN git clone https://github.com/zulfikar-bot/whatsapp-bot-md.git https://github.com/zulfikar-bot/whatsapp-bot-md/root/bot
WORKDIR /root/bot
RUN yarn install --network-concurrency 1
CMD ["node", "index.js"]
