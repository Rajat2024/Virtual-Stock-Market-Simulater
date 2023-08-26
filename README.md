
# Problem Statement: 
### Develop a Web-Based Application to Facilitate Student Investment in the Share Market with a Credit System

There has been a growing interest among students in schools and colleges to invest in the Share Market. However, a significant majority of these students, approximately 95%, end up facing losses due to their limited knowledge and experience in financial markets. To address this issue and encourage responsible investing,  Develop a web-based application that provides students with a simulated investment platform using credits.

# Introduction about the Website
This web app is intended to provide a simulation of the real stock market. Every user is given an initial amount of 100,000 dollars, which they can use to purchase a variety of stocks. User can also search for a particular stock and view its information. For each stock, we provide a line chart of its price for the last three years so that user can do some analysis. We also provide the most recent market news for user to make better decisions.
   
## Tech Stack
 
1. We used Express, NodeJS as the backend framework. 
2. We store user's information in Mongodb and the deploy the database on MongoDB Atlas. In addition to user's name and password, we also store user's balance as part of the schema.
3. The 3rd party API that we used are [finnhub.io](https://finnhub.io) and [tiingo.com](https://www.tiingo.com), one for retreiving the latest market news and one for retrieving the stock price.

# File Structure
```
 Root
   |-middleware
   |-controller
   |-config
   |-models
   |-routes
   |-index.js
   |-package.json
```
## API EndPoints Documentation
### Home Page

| API Description | API EndPoints | Live on Postman |
| -------- | -------- | -------- |
| User Balance | /api/auth/user | [Live](https://www.postman.com/warped-space-671976/workspace/share/request/22764198-f9b1794c-ffef-4e1d-8e75-db872e287fb1?ctx=documentation) |
| Validate | api/auth/validate | [Live](https://www.postman.com/warped-space-671976/workspace/share/request/22764198-e7a9797c-6680-4e17-86df-0ec212a2c6a0?ctx=documentation) |
| All Shares| /api/stock/:userId | [Live](https://www.postman.com/warped-space-671976/workspace/share/request/22764198-73b16062-3f9c-46a3-bda4-d8d519e2efeb?ctx=documentation) |
| Sell Share | /api/stock | [Live](https://www.postman.com/warped-space-671976/workspace/share/request/22764198-ac33fd6b-93f8-4cc3-84b0-eb572a932168?ctx=documentation) |
| Random | /api/data/random | [Live](https://www.postman.com/warped-space-671976/workspace/share/request/22764198-a6c60127-a7a3-47cc-9ea4-0b2eec44c9e1?ctx=documentation) |

### Auth
| API Description | API EndPoints | Live on Postman |
| -------- | -------- | -------- |
| Login | /api/auth/login | [Live](https://www.postman.com/warped-space-671976/workspace/share/request/22764198-641756ef-da17-4dad-b9c6-0e6ff506acb1?ctx=documentation) |
| Signup | /api/auth/register | [Live](https://www.postman.com/warped-space-671976/workspace/share/request/22764198-7ad5838b-933f-4f78-acf7-5a8d6a3db3d0?ctx=documentation) |
| Reset Account | /api/stock/:userId | [Live](https://www.postman.com/warped-space-671976/workspace/share/request/22764198-214db4d6-f718-4fb7-a756-4e37a09abfcc?ctx=documentation) |

### Buy Share
| API Description | API EndPoints | Live on Postman |
| -------- | -------- | -------- |

## REAL Time API Documentation 

### Market News
Sample Request: 

```
const token = process.env.STOCK_API_KEY;
const url = `https://finnhub.io/api/v1/newscategory=general&token=${token}`;
const response = await Axios.get(url);
console.log(response.json());
```


### End-of-Day Stock Price
Sample Request: 
```
const url=`https://api.tiingo.com/tiingo/daily/${req.params.ticker}?token=${process.env.TIINGO_API_KEY}`;
const response = await Axios.get(url);
console.log(response.json());
```

# Step to run this project:
## Step 1. Add .env file
Format of .env file
```
MONGO_URI = 'YOUR URL'
NODE_ENV = 'production'
JWT_SECRET = ''
TIINGO_API_KEY = 'Get from https://www.tiingo.com/'
STOCK_API_KEY = 'Get from https://finnhub.io/'
PORT=5000
```

## Step 3. Install Dependencies in Root folder
CODE -- ```  npm install  ```

## Step 4. Run This Project from Root folder
CODE -- ```  npm run dev  ```

This app is also deployed on OnRender. <br>
