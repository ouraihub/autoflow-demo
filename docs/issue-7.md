# #7 新增 farewell 函数

## 需求

在 `src/` 中新增可导出的 `farewell(name)`，为需要生成告别语的调用方返回 `再见，<name>！`。成功标准：给定姓名时返回指定格式的字符串，并像 `greet` 一样有同目录测试覆盖；仓库的 `npm test` 通过。

## 现状

- `AGENTS.md`：每个导出函数必须有同目录的 `*.test.ts` 测试，且 `npm test` 必须通过。
- `src/greet.ts`：导出 `greet(name: string): string`，先调用 `name.trim()`，空白姓名回退为 `world`，返回 `Hello, <name>!`。
- `src/greet.test.ts`：使用 `node:test` 的 `test` 和 `node:assert/strict` 的 `assert.equal`，直接导入 `./greet.ts`；现有断言覆盖纯空白姓名和 `Ada`。
- `package.json`：项目采用 ESM；`npm test` 执行 `node --test "src/**/*.test.ts"`，新增同目录测试可以自动被发现。
- `README.md`：说明这是 AutoFlow 验收项目，未约定函数接口或发布入口。

当前 `src/` 仅有上述 greeting 实现和测试，没有 `farewell` 或统一导出入口。本次只新增设计文档，不修改源码、测试、配置或 `.github/`。
