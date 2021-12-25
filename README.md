# Starter Auth 

This starter pack help me to quickly bootstrap any SaaS project with an already made auth architecture, made with the following stack express, prisma, passport, vue3.  
It is divided in 2 folders, server for the api, and client for the front-end.

## Server 

Server use expressjs, passportjs for the authentication part, and prisma as CRM to communicate with database. I personally use postgres but you can use anything that works with prisma.  
Sendgrid is used for the email delivery but it should be easy enough to use an other service if you want to.

#### Authentication strategies

For now, only the local strategy has been developed. I plan to add login with google, twitter and github strategies very soon.

### Server installation 

```bash
cd server
npm install
```

Make sure you create a .env at the folder root server/.env with the following information:

```bash
PORT=4000
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
CLIENT_URL="http://localhost:3000"

SESSION_SECRET="strong secret 1"
JWT_EMAIL_SECRET="strong secret 2"

SEND_GRID_USER_VALIDATION_API_KEY="SG.xxxxxxxxxxx"
EMAIL_FROM="no-reply@yourdomain.com"
```

The CLIENT_URL is used for cors and must match the url of your development server.

## Client

For the front-end I use the combo Vitejs + Vuejs 3.  
Yup is used for form validations.

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


## Next steps

A lot need to be improved and fine tuned. CSS is quite ugly, but this actual version is already a good step to start a project without having to spend a week on authentication.

Future improvements:  
1 [x] Add Yup validations on the server side as well (important). -> Done as a middleware
2 [ ] Google, twitter, github passport strategies.  
3 [ ] Better prisma native errors handling.  
4 [ ] Add a simple admin interface for managing users (there is already an admin check logic but not used yet).  
5 [ ] Add simple user profile to let user changes their infos.  
6 [ ] Add simple stripe logic for subscriptions.  

And maybe make it look a bit better on the way.

## Contributing
Pull requests are welcome, mostly if you find critical security issues. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
