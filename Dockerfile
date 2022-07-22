FROM quay.io/lyfe00011/md:beta
RUN gh repo clone zulfikar-bot/whatsapp-bot-md
WORKDIR /root/LyFE/
RUN yarn install --network-concurrency 1
CMD ["node", "index.js"]
