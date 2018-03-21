wget -q -O - https://jenkins-ci.org/debian/jenkins-ci.org.key | sudo apt-key add –
sudo sh -c 'echo deb http://pkg.jenkins-ci.org/debian binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt-get update
sudo apt-get install Jenkins -y
sudo apt-get install libreadline6-dev, libyaml-dev, libsqlite3-dev, sqlite3, autoconf, libgmp-dev, libgdbm-dev, libncurses5-dev, automake, libtool, pkg-config, libffi-dev -y

sudo service jenkins restart
sudo su - jenkins
touch ~/.profile
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
command -v nvm
nvm install 6.6.0
nvm alias default v6.6.0
which node
npm install -g grunt-cli bower
curl -sSL https://get.rvm.io | bash
source ~/.rvm/scripts/rvm
rvm install 2.1.5
rvm use 2.1.5
which ruby
gem install compass
sudo apt-get install mysql-server mysql-client
npm install -g pm2
pm2 startup systemd
sudo adduser jenkins sudo
sudo env PATH=$PATH:/var/lib/jenkins/.nvm/versions/node/v6.6.0/bin /var/lib/jenkins/.nvm/versions/node/v6.6.0/lib/node_modules/pm2/bin/pm2 startup systemd -u jenkins --hp /var/lib/jenkins
