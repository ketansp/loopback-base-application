git stash
git checkout master
git reset --hard origin/master
yarn install
cd client && bower install
grunt build
cd ..
