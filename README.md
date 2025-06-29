# DrugManufacturerVerificationSystem-React

Drug Manufacturer Verification system is one that enables manufacturers signup, register drugs and generate qrcodes that will be printed on each drug they have registered in the system. The Qrcode will have information about the drug embedded to it. 


### GROUP 3 MEMBERS 

1. EDYANGU JOSHUA   2023/DCS/DAY/1511
2. BABIRYE POLYN    2023/DCS/DAY/1507
3. LUBEGA JONATHAN  2023/DCS/DAY/0437
4. SSERUNJOJI SAMUEL 2023/DCS/DAY/1080G
5. BUULE KENNETH    2023/DCS/DAY/0252

### TECH STACK 

### FRONTEND
- [Tailwind css](https://) - CSS framework
- [Reactjs](https://) - Javascript frontend framework
### BACKEND
- [FastAPI](https://fastapi.tiangolo.com/) - Python backend framework
- [Postgresql](https://www.postgresql.org/) - SQL Database 
- [SqlAlchemy](https://www.sqlalchemy.org/) - Python ORM for SQL Database
- [Alembic](https://alembic.sqlalchemy.org/en/latest/) - Python Database Migration Tool

### System requirements (frontend) 


```
npm create vite@latest DrugManufacturerVerificationSystem-React -- --template react

```

### Navigate to directory

```
cd DrugManufacturerVerificationSystem-React
```

### Install Dependencies

### Node modules
```
npm install

```
### Tailwind CSS + PostCSS + Autoprefixer
```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### react-router-dom
```
npm install react-router-dom
```

### QRCode Generarion
```
npm install qrcode.react
```

Then run this command to start your development server

```
npm run dev
```

## How it works 
- Manufacture registers or sign-ups in the system. 
- They receives a message to activate their account, after account activation, they will have to wait for verification by the admin. 
- Admin checks manufacturer information and if they have all the required information, the administrator will proceed with approving them and after this the manufacture will recieve an email to proceed with loging into the system. 
- After logging in, the manufacturer will be able to access the manufacturer dashboard where they will be able to register drugs and the system will generate for them a Qrcode for the specific drug that has been created.