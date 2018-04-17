# [wherecanifindit](wherecaniwatch.herokuapp.com)
Website that allows users to find which streaming provider a show or movie is on. Users will also be able to favorite a show or movie.


## Setup
1. Install [nodejs](https://nodejs.org/en/download/)
2. Clone this repo
3. Run `npm install` from this project's root directory
4. Run these commands fromt this project's root directory to generate certificates:
    1. `openssl req -newkey rsa:4096 -nodes -sha512 -x509 -days 21 -nodes -out cert.pem -keyout key.pem`
    2. `chmod 700 *.pem`
5. Run `touch .env` and add environment variables to file (Ask Sean for these, they should not be kept in the repo for security reasons)

## Startup Scripts
#### Development
`npm run https`
#### Production
`node ./bin/www`

## To Do
- [x] Scrape for data from Netflix, HBO, Hulu, and Amazon
- [x] Add data to database using pgAdmin's 'import csv'
- [x] Login with Facebook
- [x] Create navbar that works on mobile
- [x] Display all shows on home page
- [x] Search for shows from home page
- [x] Flip cards over to get more details and watch link
- [ ] Add and remove favorites from home page
- [ ] Display favorites on /user/favorites page
- [ ] Remove favorites from /user/favorites page
- [ ] 'Delete profile' button on profile page (and verify they want to do that)
- [ ] Splash page
- [ ] Search for shows from any page (change form action)

## Technology Used
Framework: Node.js  
Server: Express.js  
Database: Postgres  
ORM: Sequelize  
Host: Heroku  
:boom:

## Future Ideas
- Contact providers in order to keep databases updated
- Set up email forwarding
- Create API with dev db so others can fork and add to API
