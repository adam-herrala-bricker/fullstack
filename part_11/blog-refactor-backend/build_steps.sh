#!/bin/bash

echo "Build script"

#move to frontend directory and install frontend dependencies
cd ../blog-refactor-frontend && npm install

#run build on frontend and return to backend directory
npm run build ; cd -

#install dependencies on backend
npm install

#dummy change!!!!!