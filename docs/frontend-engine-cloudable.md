##How to make frontend cloudable
Follow below steps to make frontend cloudable - 

#### Put ``default.conf`` file in parent directory of ember project

Create a file named as ``default.conf`` inside parent directory of
your ember project and put below instructions inside that file.

Here is required instructions for ``default.conf`` file -

```

server {
    listen       8080;
    server_name  localhost;

    #charset koi8-r;
    #access_log  /var/log/nginx/host.access.log  main;
    root   /usr/share/nginx/html;
    index  index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    # error_page   500 502 503 504  /50x.html;
    # location = /50x.html {
    #     root   /usr/share/nginx/html;
    # }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}

```


#### Put ``deploy.sh`` file in parent directory of ember project

Create a file named as ``deploy.sh`` inside parent directory of
your ember project and put below instructions inside that file.

Here is required instructions for ``deploy.sh`` file -

```js
#!/bin/bash
# Author: Ratan Sunder Parai
# Email: contact@ratanparai.com

# exit if any command return non-zero status
set -e

# cd into the script folder
# check https://stackoverflow.com/questions/6393551/what-is-the-meaning-of-0-in-a-bash-script
cd "${0%/*}"

# pull changes from github
if [ "$1" != "-f" ]; then
  if git pull | grep "Already up to date."; then
    echo "NOTHING TO DEPLOY."
    exit 0
  fi
else
  git pull
fi

# build artifact
ember build --prod

# build docker image
docker build -t frontend .

# tag image for upload
docker tag frontend docker-registry-default.router.default.svc.cluster.local/ngfs-core-framework/frontend:latest

# push image to the registry console
docker push docker-registry-default.router.default.svc.cluster.local/ngfs-core-framework/frontend:latest

echo "IMAGES BUILD AND PUSHED SUCCESSFULL"

```
* Though this ``deploy.sh`` file is optional to put in your project.

#### Update ``environment.js`` file
`environment.js` file is here `config/environment.js`.

Define all of your host/service url inside `ENV` object block. 
* Make sure you do not define any of your host/service url inside any `environment`
such as `development,production or test`.

Example: [environment.js](./config/environment.js)

