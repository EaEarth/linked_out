# LinkedOut

## Introduction

เว็บแอปพลิเคชัน Linked Out ทำหน้าที่เป็นสื่อกลางโดยมีระบบแนะนำงานที่ใกล้เคียงกับสถานที่ที่ผู้หางานเปิดใช้แอปพลิเคชันหรือตำแหน่งงานที่ผู้หางานสนใจทำงานในละแวกนั้น ระบบการสมัครสมาชิกและยืนยันตัวตนผู้ใช้งานระบบ เพื่อกระตุ้นให้ผู้ที่กำลังหางานได้เจอกับงานที่ตนเองต้องการ และกระตุ้นให้บริษัทที่กำลังรับสมัครพนักงานได้เจอกับผู้ที่มีคุณสมบัติตามต้องการได้รวดเร็วยิ่งขึ้น

## Stack

- React/NextJS
- NestJS
- MySQL

## Running this Repository

### Backend

1. Change directory to backend by running `cd backend`
2. Install NestJS CLI by running command `yarn global add @nestjs/cli`
3. Run command `yarn install`
4. Create an empty database
5. Create .env file using example from .env.example and change the database configuration
6. TODO: Run migration
7. TODO: Seed the database
8. TODO: Setup authentication
9. Run command `yarn start`

### Frontend

1. Change directory to frontend by running `cd frontend`
2. Run command `yarn install`
3. Create .env file using example from .env.example
4. Run command `yarn dev`

## Docker-Compose

1. Run `docker compose up -d --build`
2. Seed the database by runnng the following commands

```bash
$ cd backend
# Change url if necessary
$ cross-env URL=http://localhost:8000 yarn seed:run
$ mysqldump -u <username> -p solus > solus.sql
# Replace <mysql-container-name> with the mysql container name
$ docker cp solus.sql <mysql-container-name>:/
$ docker exec -it <mysql-container-name> bash
# Inside container
mysql -p
# Inside mysql console
> source solus.sql;
> exit;
# Inside container
exit
```

3. Copy the content in the /uploads folder to the backend container by running
   `docker cp backend/uploads/* <backend-container-name>:/app/uploads`

4. Add tcp relay to the backend server (Necessary for next/image component) by running `docker exec -it <frontend-container-name> socat TCP-LISTEN:8000,fork TCP:host.docker.internal:8000 &`
