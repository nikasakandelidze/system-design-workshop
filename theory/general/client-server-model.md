# Client-Server model architecture
The basic and very general definition of the term: "Client server model" is a specific type of communication between entities.
Entities in this type of communication are actual machines/computers and medium via which they communicate is a network.

# General
#### Analogue
Humans <--> Computers
Hearing/Talking  <--> sendind/receiving packets over the network 
Air <--> Network  ( As the medium where the  communication happens/popagates)

Before we start diving into too much details, i want to write prequal of words i will use and their meanings:
- data: Any kind of structure accumulated as stream/sequence of bytes, might be file, might be some binary data, etc.

The main specification of most common/popular communication model for machines is client/server architecture.
This is the case when the name has lots to tell about the definition itself.
As in most communication mechanisms we can decompose machine communications as a pairwise communication between two machines.
Each of members of this pair are called: Server (acts as data producer) and  Client (acts as data consumer).
Unlike basic human communication, where anyone can initiate communication with anyone, in world of client-server model
always only one entity asks for some data/information ( and so initiates communication ) and another machine always serves this data.
( It's impossible for server to initiate the communication to the client )

Machine that asks for the data/initiates communication is called: "Client"
Machine which listens for initiations and responds to these requests and serves data is called: "Server"

One interesting question i had about Client/Server architecture being the most popular type of communication for machines
was why not peer to peer? why did client/server communication got so much popularity and attention?
After researching a bit i understood that the main idea is in it's simplicity, peer to peer communication with all of it's
associated synchronizations between different peers adds up too much complexity even for some trivial tasks, and client/server arch.
just works and works fine in mostly all the situations.

Ok, with information above we understood what is the high level idea of client server communication type, but what is it's technical
description with Computer science and networking terms?
Client server communication/initialization in all of the machines is implemented using network Sockets. Networking primitives which use
sueqneces of bytes, also known as packets, to pass and receive information using newtorks that they are plugged in. Mainly these sockets
use different underline protocols like: TCP or UDP to talk to another machine. 
Sockets are abstraction layer over the combination of PORT and IP ADDRESS.  So the number of maximum Socket connections is bounded
by number of ports ( which is ~16K ). There are 2 main types of sockets: ServerSocket and Socket ( Client socket ). To follow the idea
we have already mentioned: one of them only has the ability to listen on specified PORT for incoming traffic and other can only
initiate and request some data from some host listening on predefined PORT. 
PORT - is a non-physical/programmatic abstraction/construct which allows many user level applications on OS to use one
newtork interface concurrently and to avoid collision of their individual network packets.
Different programming languages like: Python, Java and etc, have API-s for using sockets so that you can prgramatically write your own
server or client from scratch. 
