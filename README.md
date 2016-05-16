A webpage for users to manage their webgme account and projects.

## Steps to run as an external REST component within WebGME

WebGME requires [NodeJS](https://nodejs.org/) (0.12 <= version, CI tests are performed on versions 4.x, 6.x) and [MongoDB](https://www.mongodb.com/) (version >= 2.6) installed on the host system (the server).
In addition the npm installation requires [Git](https://git-scm.com) to be installed and available in PATH.

1. Ensure dependencies are installed and mongodb is running on default port 
2. Install dependencies `npm install`
3. Run webpack `npm run webpack`
4. Start (webgme) server `npm start`
5. From a browser visit `http://localhost:8888/rest/external/usermanagement/`