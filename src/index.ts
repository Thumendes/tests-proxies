import "dotenv/config";

import { MongoClient } from "mongodb";
import { chromium, Browser as PlayBrowser } from "playwright";
import puppeteer, { Browser } from "puppeteer-core";
import { raise } from "./utils";
import request from "request";
import { load } from "cheerio";

async function getLogsData() {
  const uri = process.env.DATABASE_URL || raise("DATABASE_URL not found");
  const client = new MongoClient(uri);

  const db = client.db("claromatriz");
  const logsBot = db.collection("logs_bot");
  const logs = await logsBot.find({ status: "pending" }).toArray();

  console.log(logs);

  await client.close();
  return logs;
}

async function runP() {
  console.log("Running");
  const auth = "brd-customer-hl_27db750f-zone-scraping_browser:g4rm3f7q6wif";

  let browser: PlayBrowser | undefined = undefined;
  try {
    browser = await chromium.connectOverCDP(
      `wss://${auth}@brd.superproxy.io:9222`
    );
    console.log("Connected to browser");

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(2 * 60 * 1000);
    // await page.goto("https://www.americanas.com.br/");

    // const title = await page.title();
    await page.goto("http://lumtest.com/myip.json");

    const id = Math.random().toString(36).substring(7);
    const file = `${id}.png`;

    await page.screenshot({ path: file });

    console.log(`[Screenshot]`, file);
  } catch (e) {
    console.error("run failed", e);
  } finally {
    await browser?.close();
  }
}

async function run() {
  const auth = "brd-customer-hl_27db750f-zone-scraping_browser:g4rm3f7q6wif";

  let browser: Browser | undefined = undefined;
  try {
    browser = await puppeteer.connect({
      browserWSEndpoint: `wss://${auth}@brd.superproxy.io:9222`,
    });

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(2 * 60 * 1000);
    await page.goto("https://www.americanas.com.br/");

    const title = await page.title();

    await page.screenshot({ path: "example.png" });

    console.log(`[TITLE]`, title);
  } catch (e) {
    console.error("run failed", e);
  } finally {
    await browser?.close();
  }
}

const list = [
  "103.15.140.121:44759",
  "8.209.114.72:3129",
  "47.74.226.8:5001",
  "64.225.4.85:9998",
  "154.79.254.236:32650",
  "128.199.98.232:3128",
  "34.89.109.67:8080",
  "50.225.202.9:3128",
  "38.154.239.218:9000",
  "185.149.23.121:443",
  "190.82.110.102:80",
  "186.121.235.222:8080",
  "117.251.103.186:8080",
  "190.61.88.147:8080",
  "118.69.111.51:8080",
  "43.130.147.86:80",
  "43.130.146.31:80",
  "43.130.148.94:80",
  "158.160.56.149:8080",
  "8.219.97.248:80",
  "178.33.3.163:8080",
  "35.213.91.45:80",
  "202.86.138.18:8080",
  "209.126.9.54:3128",
  "81.12.36.51:3128",
  "88.99.21.184:3128",
  "103.129.92.95:9995",
  "41.65.201.35:1981",
  "200.105.215.22:33630",
  "202.0.107.133:80",
  "176.106.34.47:8080",
  "213.171.44.134:3128",
  "154.209.253.83:8443",
  "186.121.235.66:8080",
  "14.194.101.220:3128",
  "20.44.206.138:80",
  "82.71.196.177:8080",
  "23.254.161.181:80",
  "193.107.104.57:3128",
  "142.93.219.22:8080",
  "193.233.202.75:8080",
  "87.238.253.68:80",
  "103.211.26.210:8181",
  "8.219.167.110:3128",
  "213.252.245.221:8556",
  "103.118.175.200:3127",
  "37.237.134.179:32650",
  "193.41.88.58:53281",
  "51.79.50.31:9300",
  "157.245.27.9:3128",
  "185.142.64.63:8080",
  "43.129.223.147:38080",
  "24.152.40.49:8080",
  "64.225.8.115:9996",
  "161.35.214.127:39155",
  "35.240.219.50:8080",
  "5.189.184.6:80",
  "41.65.174.98:1981",
  "87.107.48.173:23500",
  "185.98.23.229:3128",
  "167.172.173.210:39155",
  "212.112.113.178:3128",
  "200.46.65.66:8080",
  "197.221.140.210:8080",
  "104.166.186.164:3129",
  "181.129.138.114:30838",
  "50.204.36.138:60808",
  "195.64.243.249:3128",
  "124.158.182.34:7654",
  "183.221.242.107:8443",
  "177.10.201.171:9812",
  "101.101.217.36:80",
  "190.202.3.22:32650",
  "14.194.101.221:3128",
  "5.161.105.227:3128",
  "157.230.241.133:34097",
  "121.126.200.123:11361",
  "176.99.2.43:1081",
  "187.44.167.78:60786",
  "89.58.60.238:8080",
  "95.0.84.26:80",
  "103.152.118.153:8080",
  "213.230.127.93:3128",
  "37.120.192.154:8080",
  "181.129.183.19:53281",
  "185.78.29.95:3128",
  "65.21.242.89:4444",
  "115.144.102.132:10041",
  "151.80.136.138:3128",
  "190.82.105.123:43949",
  "80.78.64.70:8080",
  "129.154.225.163:8100",
  "77.77.64.116:3128",
  "200.6.180.148:57586",
  "170.254.28.185:8080",
  "115.144.102.39:10080",
  "144.217.253.209:9300",
  "158.69.27.94:9300",
  "149.202.181.48:5566",
  "209.141.51.211:8080",
];

const euList = [
  "62.182.201.75:8765",
  "84.38.160.80:8080",
  "80.78.64.70:8080",
  "161.97.144.14:3128",
  "82.208.111.19:80",
  "109.200.159.28:8080",
  "89.117.57.158:3128",
  "95.216.114.142:80",
  "90.84.17.133:3128",
  "45.132.1.209:80",
  "92.255.231.131:3128",
  "62.33.207.201:3128",
  "91.238.211.110:8080",
  "62.204.197.206:80",
  "178.49.14.57:3128",
  "93.177.229.164:9812",
  "185.132.236.33:8080",
  "188.166.56.246:80",
  "82.210.56.251:80",
  "163.172.31.44:80",
  "185.174.172.162:3128",
  "51.91.103.186:1337",
  "92.249.113.194:55443",
  "164.92.225.78:3128",
  "156.67.172.185:3128",
  "185.32.6.131:8070",
  "92.255.205.129:8080",
  "93.145.17.218:8080",
  "163.172.158.70:16379",
  "62.205.169.74:53281",
];

const ips = [
  // ...list,
  ...euList,
];

async function getProxy() {
  const ip = ips[Math.floor(Math.random() * ips.length)];

  return `http://${ip}`;
}

async function testWithProxies() {
  const proxy = await getWorkingProxy();
  console.log("Using proxy", proxy);

  const options = {
    url: "http://lumtest.com/myip.json",
    method: "GET",
    proxy: proxy,
  };

  const browser = await chromium.launch({
    headless: false,
    proxy: {
      server: proxy,
    },
  });

  const page = await browser.newPage();
  // page.setDefaultNavigationTimeout(2 * 60 * 1000);

  // await page.pause();

  await page.goto("http://lumtest.com/myip.json");

  const id = Math.random().toString(36).substring(7);
  const file = `${id}.png`;

  await page.screenshot({ path: file });
  await browser.close();
}

async function getWorkingProxy() {
  while (true) {
    const proxy = await getProxy();

    console.log(`Testing proxy ... ${proxy}`);

    const isWorking = await fetchProxy(proxy, 1000)
      .then(() => true)
      .catch(() => false);

    if (isWorking) return proxy;
  }
}

function fetchProxy(proxy: string, timeout: number) {
  return new Promise<void>((resolve, reject) => {
    const options = {
      url: "http://lumtest.com/myip.json",
      method: "GET",
      proxy: proxy,
    };
    const timer = setTimeout(() => {
      reject(new Error("Request timed out"));
    }, timeout);
    request(options, function (error, response, html) {
      clearTimeout(timer);
      if (!error && response.statusCode == 200) {
        resolve();
      } else {
        reject(new Error("Request failed"));
      }
    });
  });
}

async function main() {
  await testWithProxies();
}

main();
// .then(() => {
//   console.log("Done");
//   process.exit(0);
// })
// .catch(error => {
//   console.error(error);
//   process.exit(1);
// });
