const express = require('express')
const moment = require('moment')
const puppeteer = require('puppeteer')
const homeDir = require('os').homedir()
const imageName = `${moment().format('YYYYMMDD_HHmmss')}.png`
const desktopPath = `${homeDir}/Desktop`
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const server = app.listen(port, () => {
  console.log(`자동 로그인을 실행합니다. ${desktopPath}/${imageName}`)
  const userId = process.env.ID
  const password = process.env.PASS

  if (!(userId && password)) {
    console.log('아이디 비밀번호가 누락되었습니다. 프로그램을 종료합니다.')
    server.close()
    return false
  }

  (async () => {
    console.log(`listening on port ${port}`)

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    page.setUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.83 Safari/537.36')
    page.on('unhandledRejection', (reason, p) => {
      console.error('Unhandled Rejection at: Promise', p, 'reason:', reason)
      console.log(`로그인 실패`)
      browser.close()
      server.close()
    })
    page.on('dialog', async dialog => {
      console.log(`${dialog.message()} 라는 얼럿이 노출되었습니다.`)
      await dialog.accept()
    })

    //await page.goto('https://int.hanatour.co.kr/bebop/sso/hana_login.jsp')
    try{
      await page.goto('https://int.hanatour.co.kr/bebop/sso/hana_login.jsp')
      // TODO : 이 부분이 timeout 걸려서 실패하는 케이스가 있다.
      await page.waitFor(1000 * 5)

      await page.type('#HanaId', userId, {delay: 300})
      await page.type('#HanaPassword', password, {delay: 300})
      await page.click('img[src="img/btn_login.gif"]')

      await page.waitFor(1000 * 5)

      await page.screenshot({path: `${desktopPath}/${imageName}`})
      await browser.close()
      console.log(`==== 로그인이 완료되었습니다. 바탕화면에 ${imageName}를 확인하세요. ====`)
      server.close()
    }catch(error){
      console.log('error 발생')
      console.log(error)
      server.close()
    }

  })()
})