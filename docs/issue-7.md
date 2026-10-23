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

## 方案

1. 新增 `src/farewell.ts`，沿用独立文件、命名导出和显式类型的现有风格：

   ```ts
   export function farewell(name: string): string {
     return `再见，${name}！`
   }
   ```

   使用中文全角逗号 `，` 和感叹号 `！`，直接插入字符串姓名。保守地按需求字面理解：“像 greet 一样”指配套测试，不自动引入 `trim()`、`world` 回退或额外的运行时参数校验。空串输出 `再见，！`，空白字符保留；这一假设列入“待确认”。
2. 新增 `src/farewell.test.ts`，复用 `src/greet.test.ts` 的 `node:test`、严格相等断言和直接导入 `.ts` 的形式，导入 `{ farewell }` 自 `./farewell.ts`。覆盖普通姓名（`Ada` → `再见，Ada！`）、中文姓名（`小明` → `再见，小明！`），以及假设的边界语义（`''` → `再见，！`、`' Ada '` → `再见， Ada ！`、`'  '` → `再见，  ！`）。
3. 无需新增统一导出文件、依赖或测试脚本；调用方与现有 `greet` 一样直接导入对应文件。保留 `greet` 的行为和测试。
4. 实现后先运行 `node --test src/farewell.test.ts`，再以真实模块调用检查返回值，最后运行 `npm test` 验证已有功能。后续实现提交同步在 `README.md` 补充 `farewell` 导入和调用示例；本次不修改该文件。

不采用把 `farewell` 放入 `src/greet.ts` 的做法：按函数划分文件更符合现有布局。也不抽取问候语模板工具：两个简单函数不足以支撑额外抽象。复制 `greet` 的姓名清洗与回退会新增未明确要求的语义，因此暂不采用。

## 影响与风险

- 模块与接口：增加独立模块 `src/farewell.ts` 和公开命名导出 `farewell(name: string): string`；不改动 `greet`、现有导入方或 package 导出配置。
- 数据与兼容性：不改变持久化数据或依赖。新模块是增量接口；姓名不做修剪，空姓名不会回退，调用方可见的行为差异需由需求方确认。
- 安全：只拼接普通字符串，不解析输入、不访问文件或网络，也不执行动态代码；姓名会原样出现在输出中。
- 验证风险：新测试必须由现有 `npm test` 的 glob 发现；逐文件测试与完整测试分别验证新行为和回归。
