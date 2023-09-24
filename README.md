## CMS for MediaPartners AB
CMS System for creating and updating the content on each sites.

Built with: NextJS TS, MongoDB, MiniO for file storage (images). NodeJS.

## Get started
1. npm install
2. cd server
3. npm install

# Running the client/server
1. npm run dev

You will also need an .env file containing:
* OPENAI_API_KEY="" // ChatGPT
* PRODUCTION_DATABASE_URL=""
* DEVELOPMENT_DATABASE_URL="http://localhost:8000"
* BACKEND_API_KEY="" // This can be whatever you like, however needs to be on the actual website aswell you are trying to configure otherwize the website cannot make get requests to get data from CMS.

* MongoDB Authentication
* MONGODB_USER = ""
* MONGODB_PASSWORD = ""
* MONGODB_IP = ""
* MONGODB_PORT = ""
* MONGODB_DB = ""

* # Tokens
* JWT_SECRET=""
* BACKEND_API_KEY=""

* # MiniO - You need to setup a miniO server and get credentials
* MINIO_ACCESS_KEY=""
* MINIO_SECRET_KEY=""
* MINIO_END_POINT=""
* MINIO_PORT=""
* MINIO_USE_SSL=""

## Screenshots
![image](https://github.com/mediapartnersab/cms/assets/84809937/5e7f312c-beaa-4c73-9e22-3f4b0572f17c)
![image](https://github.com/mediapartnersab/cms/assets/84809937/97a6b5b7-42cb-46a6-aac2-b0767daa63c3)
![image](https://github.com/mediapartnersab/cms/assets/84809937/53f16765-5b75-42c3-b5c1-a1e9657d8bcf)




## Credits
Leutrim Bunjaku
