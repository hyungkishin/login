## HOW TO USE 

아래 명령어 실행 후 바탕화면에 오늘날짜.png 확인하기

```
$ ID=HGTEST PASS=mypassword node app.js 
```

### TRY 
mac 의 경우 crontab -e
10 10 * * 1-5 ID="yourID" PASS="Your PassWord" /usr/local/bin/node /Users/당신의 경로/login_freedom/app.js

- ex ) 
10 10 * * 1-5 ID="HGTEST" PASS="TEST" /usr/local/bin/node /Users/TEST-My-Name/어떤폴더의/login_freedom/app.js
