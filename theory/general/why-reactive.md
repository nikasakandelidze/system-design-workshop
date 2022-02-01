# Why reactive?
Everyone nowadays says that modern systems on the web should be reactive. But what does it mean to be reactive?
We'll try to demistify this word.
Reactive system means a system with next abilities:
- responsive ( always, on varying load, failures to respond to users )
- resilient ( react to failures to stay available )
- Elastic ( adapt to varying loads accordingly )
- Message driven ( It must react to inputs )

# Several popular mechanisms/patterns for satisfying points above 

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

## 2) Coping with failures
Shadring described in the point 1) solves high load problem very well, since we distribute this load on severla machines instead of one monlithical node.
But now another problem arises. What happens if one node crashes, dies or turns off because of some disaster or network problem ?
Using only sharding mechanism data will still get lost since for each unit of data stored in database we have only 1 copy of it only on 1 node, so there
are quite a lot of things that might go wrong and our system might end up in a corrupt data state.
The only known solution, apart from magic, is to replicate data in several different locations/nodes so that data becomes highlt available even during
failures of nodes, since we can fail over to other running nodes.
Replication is a very hard topic and there are several well known patterns to follow:
- Active passive replication: Only one node is "Active"/Serving queries at a single point in time, but all the data inserted/updated in the Active node
gets replicated in the background ( Either asynchronously or synchronously, depending on the needed mechanism ) to the "Passive" replica. In case of
failure of the Active node network traffic is redirected to Passive node to serve all queries without down time. Since we need to be highly available
at all times, using only passive node is no good, we need to recover previous node or startup another one and start replicating previously passive/currently
active node to new passive one to avoid futher failures.   
- Consensus based replication: Raft, Paxos and other mechanisms. There are bunch of nodes up all the time, one of them master and other slaves. Master
node gets all insert nodes and then replicates new state to all the slaves. Read queries might go to any slaves this way we have one and the same log/
data on many nodes and we aren't tied to a particular node, this way we can cope with failures of couple of nodes. 
