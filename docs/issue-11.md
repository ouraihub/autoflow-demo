# #11 开发一个飞机打坦克的小游戏

## 需求

为仓库的验收使用者开发一个可运行的“飞机打坦克”小游戏：玩家操控飞机在画面中移动并攻击坦克，能够看到游戏状态和明确的结束结果。成功标准是有可直接启动或打开的游戏入口，核心操作可用，飞机、坦克、攻击和碰撞结果可观察，游戏能够在胜利或失败时结束，并有与核心规则对应的自动化测试；实现不破坏现有函数及 `npm test`。
## 现状

- `AGENTS.md`：要求每个导出函数在同目录 `*.test.ts` 中有测试，且 `npm test` 必须通过。
- `package.json`：项目为 ESM，只有 `npm test` 脚本，使用 `node --test "src/**/*.test.ts"` 执行测试；没有前端构建、开发服务器或游戏依赖。
- `README.md`：仅说明项目用途和 `farewell` 示例，没有应用入口、浏览器页面或交互约定。
- `src/greet.ts`、`src/farewell.ts`：分别导出简单的字符串函数；它们没有游戏状态、渲染、输入处理或模块间共享接口。
- `src/greet.test.ts`、`src/farewell.test.ts`：使用 `node:test` 和 `node:assert/strict`，测试与被测导出同目录。
- `.github/`：存在自动化工作流，但本次不读取或修改该路径；本设计不依赖新增工作流行为。

当前行为：仓库只能运行现有字符串函数测试，没有可启动的飞机打坦克游戏，也没有可供浏览器加载的 HTML、CSS、TypeScript 游戏模块或资源入口。
## 方案

1. 新增 `src/game.ts`，定义并导出纯规则层的类型和函数，具体包括 `GameState`、`Input`、`createGame()`、`stepGame(state, input, deltaMs)` 和 `isGameOver(state)`。状态至少保存画布逻辑尺寸、飞机位置与生命值、坦克列表、子弹列表、得分、剩余时间和 `status`（运行中、胜利、失败）。`createGame()` 返回固定初始状态；`stepGame()` 做边界限制、输入移动、按冷却生成子弹、子弹移动、坦克移动或攻击、碰撞检测、生命值/得分更新和胜负判定。规则层只处理可序列化数据，不依赖 DOM、Canvas 或时间函数，`deltaMs` 做有限范围裁剪，避免单帧大步长穿透碰撞。
2. 新增 `src/game.test.ts`，用 `node:test` 覆盖初始状态、飞机边界移动、开火冷却、子弹击中坦克并得分、坦克击中飞机或抵达防线导致失败、清空坦克导致胜利、已结束状态不再推进等规则；每个导出的规则函数都配同目录测试，符合 `AGENTS.md`。
3. 新增 `index.html`、`src/main.ts` 和 `src/style.css` 作为浏览器入口。`index.html` 提供 Canvas、分数/生命/状态文本和重新开始按钮；`src/main.ts` 的 `startGame(canvas, ui)` 负责获取键盘输入、调用 `createGame()` 和 `stepGame()`、用 `requestAnimationFrame` 驱动循环、绘制飞机/坦克/子弹/边界以及在结束时显示结果。键盘先采用方向键或 WASD 移动、空格开火；输入监听在启动时注册并在页面卸载时清理，重新开始复用同一状态入口。`src/style.css` 只做可读的基础布局和 Canvas 尺寸适配，不引入框架或外部资源。
4. 将 `package.json` 增加最小的浏览器构建/运行所需脚本和依赖 only when implementation confirms a dependency is necessary；优先保持无构建依赖，直接提供可被现代浏览器加载的入口。若 TypeScript 无法被浏览器直接加载，则使用仓库已有可用工具选择最小构建方案，并同步更新 `README.md` 的启动方式和操作说明。当前按“可直接打开 `index.html`”设计，但要在实现阶段验证模块加载、浏览器安全策略和本地服务需求。
5. 验证顺序：先运行 `node --test src/game.test.ts`，再用浏览器或仓库可用的本地静态服务实际启动 `index.html`，确认画面非空、按键移动和开火、命中/结束状态可见，最后运行 `npm test`。实现阶段如新增导出函数，必须补充同目录测试。

不采用引入 Phaser 等完整游戏引擎的方案：当前仓库无依赖管理和前端构建基础，小游戏的实体、碰撞和绘制规模足以由纯 TypeScript 加 Canvas 表达，引擎会增加安装、打包和验收复杂度。不采用把全部逻辑写在 `main.ts` 或单个 HTML 文件中的方案：这样难以测试规则，也会让渲染和输入耦合。暂不设计联网、排行榜、持久化、音效、图片资源、关卡编辑器或移动端虚拟摇杆，因为 issue 未提出且会扩大验收范围。
