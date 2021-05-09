const { Builder, By, until } = require("selenium-webdriver");
const cd = require("chromedriver");
const config = require("./config");

const delay = ms => new Promise(res => setTimeout(res, ms));

(async () => {
    const driver = new Builder()
        .forBrowser("chrome")
        .build();

    await driver.get("https://www.instagram.com/accounts/login/?source=auth_switcher");

    await driver.wait(until.elementLocated(By.name("username"))).sendKeys(config.username);
    await driver.wait(until.elementLocated(By.name("password"))).sendKeys(config.password);
    await driver.wait(until.elementLocated(By.css("#loginForm > div > div:nth-child(3) > button"))).click();
    await driver.wait(until.elementLocated(By.css("body > div.RnEpo.Yx5HN > div > div > div > div.mt3GC > button.aOOlW.HoLwm"))).click();

    while (true) {
        const hashtagList = ["gujju", "gujjuquotes", "gujjugram"];
        for (const hashtag of hashtagList) {
            console.log(hashtag);
            await driver.get("https://www.instagram.com/explore/tags/" + hashtag + "/");
            await driver.wait(until.elementLocated(By.xpath("//*[@id=\"react-root\"]/section/main/article/div[1]/div/div/div[1]/div[1]/a/div"))).click();
            for (let i = 0; i < 200; i++) {
                try {
                    const username = await driver.wait(until.elementLocated(By.xpath("/html/body/div[5]/div[2]/div/article/header/div[2]/div[1]/div[1]/span/a"))).getText();
                    console.log(username);

                    const followButton = await driver.wait(until.elementLocated(By.xpath("/html/body/div[5]/div[2]/div/article/header/div[2]/div[1]/div[2]/button")));
                    if (await followButton.getText() == "Follow") {
                        await followButton.click();
                    }

                    if (await driver.wait(until.elementLocated(By.css("body > div._2dDPU.CkGkG > div.zZYga > div > article > div.eo2As > section.ltpMr.Slqrh > span.fr66n > button > div > span > svg"))).getAttribute("aria-label") == "Like") {
                        await driver.wait(until.elementLocated(By.xpath("/html/body/div[5]/div[2]/div/article/div[3]/section[1]/span[1]/button"))).click();
                    }

                    if (Math.round(Math.random()) == 1) {
                        await driver.wait(until.elementLocated(By.xpath("/html/body/div[5]/div[2]/div/article/div[3]/section[3]/div/form/textarea"))).sendKeys(getCommentMessage());
                        await driver.wait(until.elementLocated(By.xpath("/html/body/div[5]/div[2]/div/article/div[3]/section[3]/div/form/button[2]"))).click();
                    }

                    await delay(2000);
                    await driver.wait(until.elementLocated(By.linkText("Next"))).click();
                } catch (error) {
                    continue;
                }
            }
        };
    }

    driver.close();
})();

function getCommentMessage() {
    switch (Math.floor(Math.random() * 3 + 1)) {
        case 1:
            return "Nice!";
        case 2:
            return "Cool!";
        case 3:
            return "Looking Good!";
    }
}
