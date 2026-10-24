# #12 确认

## 需求

目前可见的 issue 正文只有“确认”，无法判断需要确认的对象、发起人、流程或完成标准。按最保守的理解，本 issue 仅要求澄清需求，不授权修改应用行为。成功标准：明确确认什么、由谁使用，以及如何判断确认完成；在这些信息缺失时记录待确认事项，并暂不提出代码变更。
## 现状

- `AGENTS.md`：这是 AutoFlow 验收项目；每个导出函数须有同目录测试，且 `npm test` 必须通过。
- `README.md`：项目定位为通过聊天提出需求、在 GitHub Actions 中开发的验收项目；示例展示 `src/farewell.ts` 的 `farewell` 导入和中文告别结果。
- `src/greet.ts`、`src/greet.test.ts`：`greet(name)` 修剪姓名并为纯空白输入使用 `world`；同目录测试覆盖该行为和普通姓名。
- `src/farewell.ts`、`src/farewell.test.ts`：`farewell(name)` 将姓名原样插入中文告别字符串；测试覆盖普通、中英文、空串和空白姓名。
- `package.json`：`npm test` 使用 Node 测试运行器执行 `src/**/*.test.ts`。
- `docs/issue-7.md`：记录新增 `farewell` 的设计与已完成进度，是仓库现有 issue 设计文档的格式参考。

当前源码和文档中没有描述“确认”对应的具体对象或流程。尝试读取 `issue://12` 时 GitHub CLI 提示工作流没有设置 `GH_TOKEN`；因此本设计仅依据本次提供的 issue 正文，不假定存在其他需求内容。
