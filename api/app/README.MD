### Flyway

### Setup Flyway for your device

Fill the `flyway.conf` file at the project root to launch it on your local postgres instance.

```
flyway.locations=filesystem:migrations

# Database url
flyway.url=jdbc:postgresql://<database-host>:<database-port>/<database-name>

# The database user running migrations
flyway.user=

# The database user password
flyway.password=
```

Then, you must edit the following line as such :

```
flyway.locations=filesystem:migrations/app -> flyway.locations=filesystem:migrations/init
```

Then, you can run the following command :

```
flyway migrate
```

You should receive the following output :

```
Successfully applied 1 migration to schema "public", now at version v0.0.0.0 (execution time 00:00.053s)
```

Then you can reverse this change :

```
flyway.locations=filesystem:migrations/init -> flyway.locations=filesystem:migrations/app
```

###
