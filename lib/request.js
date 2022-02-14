import puppeteer from 'puppeteer'
const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:77.0) Gecko/20100101 Firefox/77.0'
const selectorTimeout = 5000;

let browser
(async () => { 
    browser = await puppeteer.launch({
        headless: true,
        ignoreHTTPSErrors: true,
        args: ["--no-sandbox", "--disable-gpu"]
    }); 
})();

export async function request(uri, js = false, scriptJSHandle = null, selectorJSHandle = null) {
    const context = await browser.createIncognitoBrowserContext();
    const page = await load(context, uri, js)
    
    async function tryJS() {
        try {
            if (scriptJSHandle && selectorJSHandle) {
                await page.waitForSelector(selectorJSHandle, {timeout: selectorTimeout});
            }
            return await page.evaluate((script, selector) => {
                if (script) {
                    return eval(script);
                }
                if (selector) {
                    const domNode = document.querySelector(selector);
                    return domNode ? domNode.innerText : null;
                }
                return document.documentElement.innerHTML;   
            }, scriptJSHandle, selectorJSHandle);
        } catch(e) {
            return e.toString();
        }
    }

    const result = await tryJS();
       
    page.close()
    context.close()
    return result;
}

async function load(context, uri, js = false) {
    const page = await context.newPage();
    await page.setUserAgent(userAgent);
    page.setExtraHTTPHeaders({
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5'
    });
    if (js) {
        page.setJavaScriptEnabled(true)
        await page.goto(uri, { waitUntil: 'domcontentloaded' });
    } else { 
        await page.goto(uri);
    }
    return page
}