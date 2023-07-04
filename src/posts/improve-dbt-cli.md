---
title: 'Improve DBT CLI experience'
date: '2023-05-05T13:25:00+00:00'
status: publish
author: pavel
type: post
id: improve-dbt-cli
tag:
  - dbt
  - cli
---

I use **dbt** pretty extensivly on day to day work and switching profiles is a bit tedious. My project uses data vault pattern on top of differnt databases for development, testing and production, so there's a lot of databases, schemas, roles to use.

When I need to implement some feature, I usually start work on `DEV` environment, where I perform data modeling, initial development and testing. During this work my dbt project should be always be pointing to `DEV`, as nobody wants to deploy any not complete and not tested changes to the production. When an active development is completed we need to conduct UAT with business stakeholders, during this period I usually need my **dbt** connected to `TEST` environment. Once everything is compelete, I need to deploy tested feature to the production. It's rarely the case when I can afford to work on a single feature at a time, most probably I'm switching between different features/bugs regularly, so I need prod, then dev, again prod and then test, prod again and dev... Moreover I got few other data sources in dbt.

How does all the configs connected in dbt? Your project's root contains `dbt_project.yml` file which states a profile name to use via variable `profile`
```yml
# dbt_project.yml
profile: 'DBT_SNOWFLAKE'
```
when `~/.dbt/profiles.yml` contains actual connection properties

```yml
DBT_SNOWFLAKE:
  outputs:
    dev:
      account: xxx00011
      client_session_keep_alive: false
      database: DEV_DB
      password: strong_password
      retry_on_database_errors: false
      role: APPACCESS_SNOWFLAKE_DEVELOPER
      schema: PRD_SCHEMA
      threads: 8
      type: snowflake
      user: DEV_ETL_USER
      warehouse: NON_PRD_WAREHOUSE
    tst:
      account: xxx00011
      client_session_keep_alive: false
      database: TST_DB
      password: strong_password
      retry_on_database_errors: false
      role: TST_ETL
      schema: PRD_SCHEMA
      threads: 8
      type: snowflake
      user: TST_ETL_USER
      warehouse: NON_PRD_WAREHOUSE
    prod:
      account: xxx00011
      client_session_keep_alive: false
      database: PRD_DB
      password: strong_password
      retry_on_database_errors: false
      role: PRD_ETL
      schema: PRD_SCHEMA
      threads: 8
      type: snowflake
      user: PRD_ETL_USER
      warehouse: PRD_WAREHOUSE
  target: prod
```
where `target` variable decides which connection should be used.


Your workflow looks like this:
```bash
# run model on DEV for current dev changes
dbt run --models tag:SEMANTIC
# open ~/.dbt/profiles.yml file, change target from dev to prod
# and run production change, run some dbt stuff
dbt run-operation BuildAllObjects
dbt test --select tag:data_freshness_tests
# edit ~/.dbt/profiles.yml once again to change target bach from prod to tst
dbt run --models tag:SP
# edit ~/.dbt/profiles.yml once again to change target bach from tst to dev
# continue to work on you dev changes
dbt run --models tag:SEMANTIC
```

Other option is to have different profiles and change `dbt_project.yml` file. Anyway it requires constant file edits. I really don't like such a hustle. So I read dbt help what wasn't very helpful though. Except one thing, I found `--profiles-dir` option

```bash
dbt --help

usage: dbt [-h] [--version] [-r RECORD_TIMING_INFO] [-d]

...

--profiles-dir PROFILES_DIR
                      Which directory to look in for the profiles.yml file.
                      If not set, dbt will look in the current working
                      directory first, then HOME/.dbt/

```

So, it allows us to tell dbt which profile directory to use. What give me an idea to create a dedicated profile directory for each connection and use aliases

```bash
└─$ tree ~/.dbt
# in fact I have much more folders and aliases
/Users/admin/.dbt
├── dev
│   └── profiles.yml
├── prod
│   └── profiles.yml
├── prod_sysadmin
│   └── profiles.yml
├── profiles.yml
├── tst
│   └── profiles.yml
└── tst_sysadmin
    └── profiles.yml

6 directories, 8 files
```

```bash
# ~/Users/admin/.aliases
dbt_dev='dbt --profiles-dir=/Users/admin/.dbt/dev -x'
dbt_tst='dbt --profiles-dir=/Users/admin/.dbt/tst -x'
dbt_prod='dbt --profiles-dir=/Users/admin/.dbt/prod -x'
dbt_prod_sysadmin='dbt --profiles-dir=/Users/admin/.dbt/prod_sysadmin -x'
dbt_tst_sysadmin='dbt --profiles-dir=/Users/admin/.dbt/tst_sysadmin -x'
```

So now you can use aliases
```bash
# I don't need to edit any single file now, just use command
# moreover it prevents from running incorrect connection when you edited file but forgot to save it
dbt_dev run --models tag:SEMANTIC
dbt_prod run-operation BuildAllObjects
dbt_prod test --select tag:data_freshness_tests
dbt_tst run --models tag:SP
dbt_dev run --models tag:SEMANTIC
```

This approach makes life a little easy. I still have dbt connected to DEV as it's most used and most safe environment to work with, though most of the time I use aliases as it's more explicit.