# Starter Auth 

This starter pack help me to quickly bootstrap any SaaS project with an already made auth architecture, made with the following stack:  
Express.js, Prisma, Passport, Vue3.  
It is divided in 2 folders, server for the api, and client for the front-end.

## Server 

Server use expressjs, passportjs for the authentication part, and prisma as CRM to communicate with database. I personally use postgres but you can use anything that works with prisma.  
Sendgrid is used for the email delivery but it should be easy enough to use an other service if you want to.
Yup is used for form validations.

#### Authentication strategies available

- Local : user create account with email and password.
- Google
- Twitter
- Linkedin
- Github
- Facebook (not tested)

### Server installation 

```bash
cd server
npm install
```

Make sure you create a .env at the folder root server/.env with the following information:

```bash
PORT=4000
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
CLIENT_URL="http://localhost:5173"

SESSION_SECRET="strong secret 1"
JWT_EMAIL_SECRET="strong secret 2"

SEND_GRID_USER_VALIDATION_API_KEY="SG.xxxxxxxxxxx"
EMAIL_FROM="no-reply@yourdomain.com"

GOOGLE_API_ID="xxxxx"
GOOGLE_API_SECRET="xxxxx"

FACEBOOK_API_ID="xxxxx"
FACEBOOK_API_SECRET="xxxxx"

TWITTER_API_ID="xxxxx"
TWITTER_API_SECRET="xxxxx"

GITHUB_API_ID="xxxxx"
GITHUB_API_SECRET="xxxxx"

LINKEDIN_API_ID="xxxxx"
LINKEDIN_API_SECRET="xxxxx"

```

The CLIENT_URL is used for cors and must match the url of your development server.

Once your postgres database is ready and the DATABASE_URL is filled with the right information, run the following command to create table on the database.

```bash
npx prisma migrate dev
```

Then to run in development:

```bash
npm run dev
```  

Run in production:
```bash
npm run start
```


## Client

For the front-end I use the combo Vitejs + Vuejs 3.  

#### User authentication
Users register and need to validate their email. They cannot access to any requiredAuth route if not validated.
Once validated their status become "VALIDATED" and they can browse locked routes. Admin can revoke user, in that case the user cannot navigate locked routes anymore.

### Client installation


```bash
cd client
npm install
```

Make sure you create a .env a the folder root client/.env with the following information:

```bash
VITE_API_URL="http://localhost:4000/api/v1"
```

Api url is the link to your express api.

To run vite:

```bash
npm run dev
```  


## Next steps

Thi actual version is already a good step to start a project without having to spend a week on authentication.  
! Facebook auth has not yet been tested

Future improvements:  
1 [x] Add Yup validations on the server side as well (important). -> Done as a middleware  
2 [x] Google, twitter, github, linkedin, facebook passport strategies.  
3 [ ] Better prisma native errors handling.  
4 [ ] Add a simple admin interface for managing users (there is already an admin check logic but not used yet).  
5 [ ] Add simple user profile to let user changes their infos.  
6 [ ] Add simple stripe logic for subscriptions.  

## Contributing
Pull requests are welcome, mostly if you find critical security issues. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
