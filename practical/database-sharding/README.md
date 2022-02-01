# Database Replication
This implementation uses PostgreSQL database and several docker containers to set up a very simple sharded cluster.

## Context
In this workshop project we have a very simple database structure, We want to store students in the database, but we also want, due to high load, to 
balance the load in the different shards on the different nodes, so that data load is distributed ( We are talking about horizontal sharding ).

## Architecture
![Architecture diagram](./assets/shardin-1.jpeg)

# Goal
Goal of this mini project is to implement simple sharding mechanism for Postgresql database tables.
Idea of the script/application is to move 1 "big" database into 2 distributed smaller ones in their isolated environments and let them talk.

# Setup
- Run `docker-compose up -d`
After running it, 3 containers will start up. 1 master which plays the role of delegator, since it doesn't store any data in itself. and 2 shard nodes.
