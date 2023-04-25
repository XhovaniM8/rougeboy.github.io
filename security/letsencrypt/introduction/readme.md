# Let's Encrypt

Let's Encrypt is a free, automated, and open certificate authority (CA), run for the public's benefit. It is a service provided by the Internet Security Research Group (ISRG).

## Introduction
To start off, I run an NGINX web server.
This could be running anywhere in the cloud.

    docker run -it -p 80:80 nginx bash

    # get my public IP for this server 
    curl ifconfig.co

    # lets get out of the container
    exit

Now that we have the public IP for our server, lets start it up again
This time, without bash
We should be able to access it in the browser

    docker run -it -p 80:80 nginx

In the video, we create a DNS record and point it to the IP of our server

## Certbot

The docs

To build certbot, i simply change directory and build my certbot container

    cd .\security\letsencrypt\introduction\

    docker build . -t certbot

    docker run -it --rm --name certbot `
    -v ${PWD}:/letsencrypt `
    -v ${PWD}/certs:/etc/letsencrypt `
    certbot bash

## NGINX

We've customised our nginx.conf as shown in the video

Run this NGINX, we mount the shared folder that certbot will use:

    cd .\security\letsencrypt\introduction\

    docker run -it --rm --name nginx `
    -v ${PWD}/nginx.conf:/etc/nginx/nginx.conf `
    -v ${PWD}:/letsencrypt `
    -v ${PWD}/certs:/etc/letsencrypt `
    -p 80:80 `
    -p 443:443 `
    nginx

## Issue certificate
In certbot, generate our cert:

    certbot certonly --webroot

    # webroot is the folder we mounted: /letsencrypt

    # certificate outputs under etc/letsencrypt/live/**
    # since we share this volume with our webserver, we dont need to copy
    # certificates across.

    IMPORTANT NOTES:
    - Congratulations! Your certificate and chain have been saved at:
    /etc/letsencrypt/live/marcel.guru/fullchain.pem
    Your key file has been saved at:
    /etc/letsencrypt/live/marcel.guru/privkey.pem
    Your cert will expire on 2020-12-03. To obtain a new or tweaked
    version of this certificate in the future, simply run certbot
    again. To non-interactively renew *all* of your certificates, run
    "certbot renew"
    - Your account credentials have been saved in your Certbot
    configuration directory at /etc/letsencrypt. You should make a
    secure backup of this folder now. This configuration directory will
    also contain certificates and private keys obtained by Certbot so
    making regular backups of this folder is ideal.
    - If you like Certbot, please consider supporting our work by:

    Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
    Donating to EFF:                    https://eff.org/donate-le

## Renewal

To do a dry run of cert renewal:

    certbot renew --dry-run

Reload our NGINX web server if the certs change:

    docker exec -it nginx sh -c "nginx -s reload"
    
Checkout the Certbot docs for more details