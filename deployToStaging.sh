#!/bin/sh

rm -rf dist/
ember build --environment=staging
chmod 600 key.pem

USER='codingblocks'
SERVER='srv6.cb.lk'

ssh -o StrictHostKeyChecking=no -i key.pem $USER@$SERVER "rm -rf ~/frontends/hacker-blocks/*;"
scp -o StrictHostKeyChecking=no -i key.pem -r dist/* $USER@$SERVER:~/frontends/hacker-blocks/
