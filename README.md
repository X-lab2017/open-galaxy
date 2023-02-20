# OpenGalaxy

> Who am I, where have I been, and where am I going?

In real society, people actually rely on their connection with others to determine their position. In the open source world of GitHub, various collaborative behaviors between developers and projects have also formed a huge social collaborative network.

We can't answer the above profound philosophical three questions, but we want to let you see with your own eyes who you are, where have you been and where you are going in the open source world through this project.

In this project we cleaned the log data of GitHub, abstracted it into a developer collaboration behavior model, and built the following huge GitHub collaboration galaxy.

![OpenGalaxy2D](https://user-images.githubusercontent.com/32434520/220116878-31df8448-5127-4c33-a82e-b8c840e132ba.jpg)


What are you waiting for? Come and experience it! https://open-galaxy.x-lab.info/

# Install

Some packages in this repository are old, `Node 14` MUST be used to start the project. [nvm](https://github.com/nvm-sh/nvm) is recommended to manage multiple versions of `Node` in your machine.

```bash
git config --global url."https://github.com/".insteadOf git://github.com/ # one package uses a no longer supported url, this is a fix
git clone https://github.com/X-lab2017/open-galaxy.git
cd open-galaxy
yarn install
yarn start # This will start local development sever with auto-rebuild.
```

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

![OpenGalaxy3D](https://user-images.githubusercontent.com/32434520/220118178-42017202-53a3-40ac-9f6c-96e83f4843ac.gif)

# Contributing

There are many ways in which you can participate in this project, for example:

- Find an issue to join
- Submit bugs and feature requests by issues
- Help us fix typo
- Translation
- ...


# License

Copyright (c) 2021 X-lab2017.

Licensed under the [Apache License Version 2.0.](./LICENSE)

**NOTICE:** Some of OpenGalaxy's code is derived from [anvaka/pm](https://github.com/anvaka/pm) whose copyright and license can be found at the end of [LICENSE](./LICENSE) file.
