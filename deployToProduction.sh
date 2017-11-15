#!/bin/sh

rm -rf dist/
ember build --environment=production
chmod 600 key.pem
ssh -o StrictHostKeyChecking=no -i key.pem $USER@$SERVER "rm -rf ~/hack-frontend/*;"
scp -o StrictHostKeyChecking=no -i key.pem -r dist/* $USER@$SERVER:~/hack-frontend/
