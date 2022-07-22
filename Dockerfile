FROM quay.io/lyfe00011/md:beta
RUN git https://github.com/zulfikar-bot/whatsapp-bot-md.git
RUN yarn install --network-concurrency 1
CMD ["node", "index.js"]
