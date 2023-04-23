# Job application tracker

## 🚀 Tech stack

<p align="center">
   <a href="https://vitejs.dev" title="Vite"><img width=32 height=32 src="https://vitejs.dev/logo.svg" alt="Vite logo"></a>
	<a href="https://www.typescriptlang.org" title="Typescript"><img width=32 height=32 src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" alt="Typescript logo"></a>
   <a href="https://vuejs.org" title="Vue"><img width=32 height=28 src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" alt="Vue logo"></a>
</p>

## 🏔️ What is the projet about ?

This is a web app where you a can enter all your job application keep track of them and have a beautifull Sankey graph of it!

The website look like this :

![image](https://user-images.githubusercontent.com/35272156/233845178-fe2d089f-a92b-4b7e-8c68-66bc821218e7.png)

And it generate a sankey chart that you can share :

![image](https://user-images.githubusercontent.com/35272156/233845217-350689c5-8916-4c91-87b3-c28682c71705.png)


## Want to contribute ?

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

### Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

### 🏗️ How to setup the project

#### Clone the project
- First clone the project on your local computer
```
git clone https://github.com/Sacramentix/application-tracker.git
cd application-tracker
```

#### Node js
- Make sure you have v18 or higher. You can install it from the official website [here](https://nodejs.org).
- You can also install NVM to manage multiple version of Node js [here](https://github.com/nvm-sh/nvm).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command           | Action                                       |
|:----------------  |:-------------------------------------------- |
| `npm install`     | Installs dependencies                        |
| `npm run dev`     | Starts local dev server at `localhost:3000`  |
| `npm run build`   | Build your production site to `./dist/`      |
| `npm run preview` | Preview your build locally, before deploying |
