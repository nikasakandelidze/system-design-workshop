# System Design for URL Shortener like bitly.com
Here we will try to design highly available and scalable URL shortener system. This system won't concentrate about
implementation details and will only contain high level abstraction of the system ( to leave all choices of specific technologies to the implementator ).

## Introduction
There are lots of cases when you want to paste some long URL you found on web in some document, but due to it being too long its not practical.
URL shorteners are web applications which solve this exact issue. Using URL shorteners we can input long URL and system will map it to some unique short value which and store this mapping in the database.
So whenever user asks for original URL for some shortened key system will have information about it. 

## Funtional requirements
- Given some URL service should generate unique shortened alias for this URL
- When request comes to this shortened alias server should redirect user to original URL
- Links must have expiration time ( Let's call it EXP-TIME )
- Shortened links/aliases should not colide ( must be unique )  

## Non-functional requirements
- System must be highly available, so that one components failure won't make our service unusable.
- System must be scalable. We should be freely able to scale services later if traffic increases.

## Asumptions
- Let's assume we have 30M new users every month. And let's assume that EXP-TIME for aliases is 5 year.
To translate this information in data size we get: 30M * 12(months) * 5(years) = 1.8 Billion records.
- Data capacity model: This will help us understand how much data we'll store in the storage. 
We need to think about what data(with it's size) we'll store in persistant storage for one distinct shortened url(we'll need to calculate according storage volume for 5 years, since we are leaving data in the storage for that long).
	DATA RECORD MODEL:
	- longurl: string of 2KB size ( 2048 characters ).
	- shorturl: string of 17 bytes ( 17 characters) .
	- createdAt: 7 byte time-stamp
	- expiresAt: 7 byte time-stamp
Total size of 1 record in storage will be: 2KB + 17B + 7B + 7B = 2031B = 2.031KB.
For 30M monthly users this will be 30M * 2.031KB ~ 60GB per month. and 3.64TB of data in 5 years.
- Storage. Since we have this much data we'll need to think of Which database to choose.
Since our system is read heavy ( user stores once and might need redirection thousands of times after that ) and we will need to think about scaling and high
availability because of non-functional requiremenets. For this case we will avoid using RDBMS(PostgreSQL, MySQL) since they add complexity for scaling and
high availability since it's not their inherent feature). On the other side NoSQL databases will be match our non functional requiremenets easily since that's
what they are made for ( HA and Scalability ). The only problem we might come across with NoSQL is eventual consistency and lack of ACID transactions so we might
need to design the logic of the system so that we will avoid need for ACID.



