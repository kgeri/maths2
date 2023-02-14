#!/bin/bash

pwd=$(dirname $0)

if [[ -z $1 ]]; then
    branch="master"
else
    branch=$1
fi

(cd $pwd && npm run build && npx wrangler pages publish --branch $branch dist/)
