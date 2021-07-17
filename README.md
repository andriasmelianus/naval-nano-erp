# naval-nano-erp

## Configure Apache's Proxy

Enable these modules in the "httpd.conf":

```php
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_ajp_module modules/mod_proxy_ajp.so
LoadModule proxy_balancer_module modules/mod_proxy_balancer.so
LoadModule proxy_connect_module modules/mod_proxy_connect.so
LoadModule proxy_express_module modules/mod_proxy_express.so
LoadModule proxy_fcgi_module modules/mod_proxy_fcgi.so
LoadModule proxy_ftp_module modules/mod_proxy_ftp.so
LoadModule proxy_hcheck_module modules/mod_proxy_hcheck.so
LoadModule proxy_html_module modules/mod_proxy_html.so
LoadModule proxy_http_module modules/mod_proxy_http.so
LoadModule proxy_http2_module modules/mod_proxy_http2.so
LoadModule proxy_scgi_module modules/mod_proxy_scgi.so
LoadModule proxy_uwsgi_module modules/mod_proxy_uwsgi.so
LoadModule proxy_wstunnel_module modules/mod_proxy_wstunnel.so
...
LoadModule slotmem_shm_module modules/mod_slotmem_shm.so
...
LoadModule watchdog_module modules/mod_watchdog.so
LoadModule xml2enc_module modules/mod_xml2enc.so
...
# Add the following lines to the bottom of the configuration file.
ProxyRequests off
<Proxy *>
	Order deny,allow
	Deny from all
	Allow from all
</Proxy>
ProxyTimeout 300
```

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
