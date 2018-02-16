#!/bin/sh

rm -rf dist/
ember build --environment=production
chmod 600 key.pem

scp -o StrictHostKeyChecking=no -i key.pem -r dist/* $USER@$SERVER:~/hack-frontend-new/
ssh -o StrictHostKeyChecking=no -i key.pem $USER@$SERVER "rm -rf ~/hack-frontend-old/*;"
ssh -o StrictHostKeyChecking=no -i key.pem $USER@$SERVER "cp -r ~/hack-frontend/* ~/hack-frontend-old/;"
ssh -o StrictHostKeyChecking=no -i key.pem $USER@$SERVER "rm -rf ~/hack-frontend/*;"
ssh -o StrictHostKeyChecking=no -i key.pem $USER@$SERVER "cp -r ~/hack-frontend-new/* ~/hack-frontend/;"
ssh -o StrictHostKeyChecking=no -i key.pem $USER@$SERVER "rm -rf ~/hack-frontend-new/*;"

