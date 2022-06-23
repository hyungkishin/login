## HOW TO USE 

아래 명령어 실행 후 바탕화면에 오늘날짜.png 확인하기

***사번, 비밀번호는 실행 시 입력 받고 있으며 코드를 보면 아시겠지만 별도로 갈취하지 않으니 안심하셔요.***


```
$ ID=HG318 PASS=mypassword node app.js 
```

#### 처음 사용시 

```
$ git clone https://git.hanatour.com/HG318/login_freedom.git
$ cd login_freedom 
$ npm install 
$ ID=hg318 PASS=mypassword node app.js 
```


### TODO 
mac 의 경우 crontab -e
10 10 * * 1-5 ID="yourID" PASS="Your PassWord" /usr/local/bin/node /Users/당신의 경로/login_freedom/app.js

- ex ) 
10 10 * * 1-5 ID="HGTEST" PASS="TEST" /usr/local/bin/node /Users/TEST-My-Name/어떤폴더의/login_freedom/app.js
