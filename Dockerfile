FROM quay.io/lyfe00011/md:beta
RUN git clone https://github.com/zulfikar-bot/whatsapp-bot-md.git /root
WORKDIR /root
RUN yarn install --network-concurrency 1
CMD ["node", "index.js"]
