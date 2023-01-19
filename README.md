### Running the project

```bash
# run rabbitmq
$ docker run -d --hostname demo-rabbit -p 5672:5672 -p 15672:15672 --name demo-rabbit rabbitmq:3-management

# run the admin
$ cd admin
$ yarn start:dev
# admin runs on http://localhost:5010

# run the main
$ cd main
$ yarn start:dev
# main runs on http://localhost:5011
```

/admin/node_modules
/main/node_modules
