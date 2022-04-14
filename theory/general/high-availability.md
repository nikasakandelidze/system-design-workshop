# High availability
What is high availabilty that you hear all the time in your team, in most of the articles and nearly all the system design tutorials?
Before we dive into what the idea of high availabilty is let's first try to identify why the term was needed and what is the general non technical
context for it.

Nowadays, digital plaftorms have penetrated literally all the domains that humans operate in, starting from every day life things and ending with
health critical and very delecate domains like: Health care, transportation, army and etc. 
If you try to analyze usage patterns of modern digital platforms you'lleasily notice that, literally each and every user expects software systems to be
always up and running. ( To fully understand how much operational availability we ask from modern day systems, think back of a time when you opened facebook 
and it didn't load and you tried to refresh your page, because you thaught that it was your machines problem not facebooks ).
These 2 are the main reasons of these expectations:
- Technologies are getting better day by day so for modern users fast and highly available systems are what they think and want by default. it is not
something rare any more. Literally no one will use your digital platform, no matter how ground braking the tech itself is, if it isn't always up and running and avaiable.
- Some of the usecases of digital systems are in domains where the functionality and availability is critical, for example: ambulance/hospital systems, airplane software systems.
These are the domains where maximum potential availability must be reached since literally peoples' lives depend on fault tolerance of the system. ( I hope we agree that no human
should get injured or die because of our not so fault tolerant and highly available code ). 

Enough of this story telling, now let's dive into technical aspect of today's topic.

High availabilty is cloud native term which IMHO every engineer should at least understand due to it's popularity and every day usage.
But to fully understand term "High availabilty" also abbreviated as "HA" we'll need at first to define the term availabilty in context of IT systems.

The term: Availability is the measurable property/feature of the tech. entities, on all levels of abstractions, like program, server, distributed system to tolerate
failures of some of it's parts. By failures none of the specific types of failures are meant since generally available system should be able to tolerate 
software failures as well as hardware ones.

To further demistify the idea of availability let's try to give a more-or-less concrete example. Let's say that we wrote a distributed program that runs on 
several machines in the network and ,for simplicity, does only one task "T". 
The Availabilty property of this system/program will be held if and only if our system continues to perform original task "T" even when some of the machines in the
network fail due to some hardware outage or even some kind of software problem. Simply eliminating single point of failure in a system or component automatically
assigns a available property to our system/components.

As we said above with all the cool stuff, availability is a measurable property of the system. So if you give me a system i should be able to measure how highly available it is.
Most useful and informative type of measurment for availabilty is what is system's downtime percentage compared to some time unit.
Most useful and common availability measurments are:
- What's downtime percentage of system per year
- What's downtime percentage of system per month
- What's downtime percentage of system per week

For modern day systems, so many of them have availabilty of more than 90% ( only 10% of time unit is their downtime ) that there is no point in discussing availability less
then 90%.
When i first heard 90% availabilty i thought that wow that's so much, users might even not notice ever at all that the system is down, right?
But sadly, life aint so easy. 10% of downtime per year is 36.5 days of downtime per year. Now just think if facebook or youtube didn't function for 36.5 days per year.
It would be literally devestating, and now think if some airport management system went down 36.5 times per year. lot's and lot's of airplanes would crash without a doubt.

Most of modern day systems with high throughput and load try to reach >99.999% availability. Which is only 5.26 minutes of downtime per year. Which is without a doubt
bareable. This standard/thershold is known as High availabilty point, all the systems that have availabilty coefficient of more then or equal to 5 Nines is considered
as a highly available system. 
Of course this is mostly following common convetions, term high availabilty might fluxuate between organizations and between clients. Someone might have service level agreement
of calling 99.9% already highly available and so on.

Basic framework for achieveing high availabilty is via redundancy. Having redundant, access, copies of same components ( servers, nodes, databases, hardware.. )
will let you to direct traffic to another instance in case of failure of main component.
