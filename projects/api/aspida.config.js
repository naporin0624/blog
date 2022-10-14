const { config } = require("dotenv");
config();

module.exports = [
  {
    input: "src/adapters/cloudflare/images",
    baseURL: `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_IMAGES_ACCOUNT_ID}/images`,
  },
];
