FROM nginx

ADD build/umd/ /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

