# Domain Name Registration Data Lookup RDAP Client

This repository contains an example of Domain Name Registration Data Lookup using [RDAP](https://www.icann.org/rdap) 
protocol. The example is implemented as a Single Page Application (SPA) using [Angular](https://angular.dev/). 
The application gives you the ability to look up publicly available contact and other information related 
to a domain name. 

## How does the Domain Name Registration Data Lookup work?


The Domain Name Registration Data Lookup makes use of the Registration Data Access Protocol (RDAP) 
to query, parse and display registration data in a human-friendly format. The results displayed come 
directly from registry operators and/or registrars in real-time. If the queried information is 
not available in RDAP, then a proper error message will be displayed.


## What is Registration Data Access Protocol (RDAP)?

RDAP is a computer network communications protocol for accessing Domain Name Registration Data in a 
structured way. RDAP is an alternative to the WHOIS protocol and can be used to look up relevant 
registration data from such Internet resources as domain names, IP addresses, and autonomous system numbers. 
In its basic form, RDAP is not intended to offer a "human-friendly" view of the data. However, 
its structured output does enable more human-friendly services to be created. 

# Setup

## Prerequisites

You should have Node.js and an npm package manager in your development environment. The project is implemented using Angular.

* Node ^18.19.1 || ^20.11.1 || ^22.0.0 or later. To get Node.js, go to [nodejs.org](https://nodejs.org/en/)
* npm pacakge manager 10.7.0 or later. The [npm](https://www.npmjs.com/get-npm) is distributed with Node.js, which means
that when you download Node.js, you automatically get npm installed on your computer.
* Angular 18.2.x If you're not familiar with Angular, go to [angular.dev](https://angular.dev/) to learn all about Angular.
* Visit for more detail about [version compatibility](https://angular.dev/reference/versions) 

# Running the application

After you clone this repository or download the ZIP of this project, go to the root directory of this project.
Run the following commands:

* `npm install` to download all the npm modules needed by this project
* `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
* `ng serve` to start a dev server. Navigate to `http://localhost:4200` to see the application. 
Try out a few domains, such as, `icann.org`, `google.com`, `example.com` to see the results.  

# Running unit tests

Run `ng test` to execute the unit tests.

# Contributing

Contributions are welcome.

# Other

ICANN Domain Name Registration Data Lookup website: https://lookup.icann.org

