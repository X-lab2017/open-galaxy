# OpenGalaxy

> Who am I, where have I been, and where am I going?  

In real society, people actually rely on their connection with others to determine their position. In the open source world of GitHub, various collaborative behaviors between developers and projects have also formed a huge social collaborative network.  

We can't answer the above profound philosophical three questions, but we want to let you see with your own eyes who you are, where have you been and where you are going in the open source world through this project.  

In this project we cleaned the log data of GitHub, abstracted it into a developer collaboration behavior model, and built the following huge GitHub collaboration galaxy. More technical details can be found in the architecture section.
![OpenGalaxy2D](/images/open_galaxy_2d.jpg)


What are you waiting for? Come and experience it! https://open-galaxy.x-lab.info/
# Install

In order to avoid getting **Permission denied** response from GitHub, please add SSH Key to your GitHub account before running `npm i` command and make sure that you have a good network.

```
git clone https://github.com/X-lab2017/open-galaxy.git
cd open-galaxy
npm i
npm start
```

This will start local development sever with auto-rebuild.
### Build your own graphs
Click [here](https://github.com/anvaka/pm#your-own-graphs) to see how to build your own graphs.

### Explore OpenGalaxy
|    |    |    |   |
|---:|:---|---:|---|
| `W`  | Move forward  | `Up` |Rotate up|
| `S`  | Move backward  | `Down`  |Rotate down |
| `A`  | Move left  |`Left`|Rotate left|
| `D`  | Move right  |`Right` | Rotate right|
| `Q`  | Roll right  |`R` | Fly up|
| `E`  | Roll left  |`F` | Fly down|
| `L`  | Toggle links  | `Space` | Toggle steering |
| `Shift`  | Fly faster  |  |  |
  
![OpenGalaxy3D](/images/open_galaxy_3d.gif)

# Architecture

The OpenGalaxy is a comprehensive project which uses graph database, graph algorithm and graph visualization tools for developers to explore the oepn source world.

* Project architecture

![architecture](https://www.plantuml.com/plantuml/png/PLF1Rjim3BthAuZSiyjkEGmDsY4jCBHPtSEkj4tBMXJ9aEYbmT1_7qEfZOlvOfZlyJq-ohh9Z8ddepT3Z4m9dYOAE_JuUePjwaR7rF6So9WGUuBLhxN7LadGn3br17V820zXIBW2pD0xOJ91SdRa3MozXvtZ-xa57otq5x8BSEjTTnZZdCbSIYrcqNwaTlO8kuJJg5h1LjTcmdJGKfwAV1kPut43j-WxQPBA7YqzOpZ0oV48-qIMV6slmlSlBtlO2VU4vnLi6mZZky4pJR4aQIZzSHsfMUhpPpUbzSJeV8cI2xjuFehKbz-vIZuDWtU1IfnFij5MMOxJCe5LfiTpdBae1Ysz2mRLQnZPTVAA2MqLpDNqUdZ51_uQa6UPKOUlwGHM_6t1AkrAi5VypPZUmRgFfx3-feTWFxx2Q2-RySWk1lWvKpgRC0gklu0GP8t_4nPuj8Bhyh-_JZ6noTCL3BPY3qV5XBpepDBvzQxk-8TkpaZnOpPfBe5KmyWaox4siDY9aOay3RnMeDHWZu6ykQ7GNwx8Fm00)

* Design of the main modules
  * For repo influence calculation, we use scala script on Spark to calculate the PageRank value of all repos during 2021 and import into Nebula graph database.
  * For repo data service, we use Node.js online server to query repo detail data like most related repos and developers network on GitHub from Nebula Graph database directly.
  * For offline graph service, we export repo data from Nebula Graph database by Node.js client and use ngraph lib to calculate the galaxy 3d layout and store the result onto online static storage service.
  * For OpenGalaxy, we use galaxy layout data and pm to generate our OpenGalaxy and customize to add our own data like repo details panel. The repo detail panel will query data from repo data service which will query data directly from Nebula Graph database.

* Internal and external dependencies
  * Data infra: [Clickhouse](https://github.com/ClickHouse/ClickHouse).
  * Spark data process: [Spark & Pregel](https://github.com/apache/spark).
  * Offline data service: [Nebula Node.js client](https://github.com/vesoft-inc/nebula-node), [ngraph layout lib](https://github.com/anvaka/ngraph.offline.layout),
  * Repo Data service: [Nebula Node.js client](https://github.com/vesoft-inc/nebula-node), [egg.js](https://github.com/eggjs/egg).
  * OpenGalaxy: [ngraph pm](https://github.com/anvaka/pm).


# Contributing
There are many ways in which you can participate in this project, for example:

- Find a issue to join
- Submit bugs and feature requests by issues
- Help us fix typo
- Translation  
...


# License

Copyright (c) 2021 X-lab2017.  

Licensed under the [Apache License Version 2.0.](./LICENSE)  

**NOTICE:** Some of OpenGalaxy's code is derived from [anvaka/pm](https://github.com/anvaka/pm) whose copyright and license can be found at the end of [LICENSE](./LICENSE) file.

