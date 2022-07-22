FROM quay.io/lyfe00011/md:beta
RUN git auth setup-git https://github.com/zulfikar-bot/whatsapp-bot-md.git /root/LyFE/
WORKDIR /root/LyFE/
RUN yarn install --network-concurrency 1
CMD ["node", "index.js"]
