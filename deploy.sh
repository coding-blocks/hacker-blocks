#!/bin/sh

ember build --environment production
ssh omerjerk@cb.lk "rm -rf hack/*; mkdir hack/.well-known;"
scp -r dist/* omerjerk@cb.lk:/home/omerjerk/hack
