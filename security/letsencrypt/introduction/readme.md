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

# How I Encrypted My Site

Sure, I'd be happy to help you enable HTTPS for your static site hosted on Github Pages with a custom GoDaddy Domain. Here's a step-by-step guide:

1. First, make sure that your Github Pages site is up and running, and that it's accessible via your custom GoDaddy domain.

2. Next, you'll need to obtain an SSL certificate for your domain. There are a few different ways to do this, but one easy option is to use the free SSL certificate provider, Let's Encrypt. You can obtain a Let's Encrypt SSL certificate using a tool like Certbot, which is available for most operating systems. Here's a quick rundown of the steps involved:

- Install Certbot on your local machine or server.


- Use Certbot to generate a new SSL certificate for your domain.    You'll need to provide some basic information, such as your domain name and email address.


- Follow the instructions provided by Certbot to install the SSL certificate on your Github Pages site. This typically involves copying some files to a specific location on your Github Pages repository.


3. Once you've installed the SSL certificate, you'll need to update your Github Pages site to use HTTPS instead of HTTP. To do this, you'll need to update your site's configuration settings. Here's how:

- Navigate to your Github Pages repository and open the Settings tab.

- Scroll down to the GitHub Pages section and find the Custom domain field.

- Change the URL from "http://" to "https://".

- Save your changes.

4. Finally, you'll need to update your DNS settings to point your custom domain to your Github Pages site using HTTPS. Here's how:

5. Log in to your GoDaddy account and navigate to the DNS management page for your domain.

6. Add a new DNS record with the following settings:
- Type: CNAME
- Name: your domain name (e.g. "example.com")
- Value: your Github Pages domain name (e.g. "yourusername.github.io")
- TTL: 1 Hour
- Save your changes.

And that's it! Once you've completed these steps, your static site hosted on Github Pages with a custom GoDaddy Domain should be accessible via HTTPS. Note that it may take some time for your DNS changes to propagate, so be patient and give it a few hours before testing your site.