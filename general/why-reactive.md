# Why reactive?
Reactive system means a system with next abilities:
- responsive ( always, on varying load, failures to respond to users )
- resilient ( react to failures to stay available )
- Elastic ( adapt to varying loads accordingly )
- Message driven ( It must react to inputs )

## 1) Coping with huge/high data load
Modern systems must store and use huge amounts of data. Usually the data is so big that one database node with
one huge table is not enough for several reasons:
- Searching Data will become slow because of too large tables in one database.
- Modern applications are required to have reliable data stores, so that in case of some failures, or disasters of data nodes 
Data stays consistent and relevant. 
- Performance issues due to high load from user queries. Since we have only one node all N users visit 1 node with their queries, 

Since no single machine is capable of coping with modern loads of data I/O, a common way to solve high load problem we can use distributed systems pattern: Sharding.
It is a mechanism of splitting database tables either vertically or horizontally ( most likely horizontally is the one to be used ). 
After splitting tables we place these peaces of one table into separate, decoupled  nodes in the network, both in it's own database.
Since we now have 2 physically totally separate places where we can insert our data we'll need a mechanism/algorithm which will determine appropriate node upon the input of record fields ( to insert ).
This mechanism of determining which query should go to which shard might vary since there are lots of implementations of it.
Example of sharding:
- Let's say we have users table, with millions and millions of users. We want to make it scalable and high load durable.
First: Create new databases on distributed nodes with their own table replicas ( by replica meaning table with exactly the same columns as it's parent )
Second: Distribute already existing users in the main table into two tables on the separate machines ( This might be created using background worker process or something like that ).
Third: Implement ( on application level or on database driver level ) a logic to decide and balance queries/inserts between these two nodes.
This way each node will get roughly Original load/2 which will let us scale our database quite well.
