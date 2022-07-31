import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./src/controllers/router";

const indexHtml = `
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="utf-8" />
		<!--app-head-->
	</head>
	<body>
		<div id="app"><!--app-html--></div>
		<script type="module" src="/src/lib/entry-client.tsx"></script>
	</body>
	</html>
`;

const main = async () => {
	const vite = await require("vite").createServer({
		root: process.cwd(),
		logLevel: "info",
		server: { middlewareMode: true },
	});

	const renderViteApp = async (req: any, res: any) => {
		try {
			const url = req.originalUrl;
			const template = await vite.transformIndexHtml(url, indexHtml);
			const { render } = await vite.ssrLoadModule("/src/lib/entry-server.tsx");
			const html = render(url);
			const appHtml = template
				.replace(`<!--app-head-->`, html.head + html.hydration)
				.replace(`<!--app-html-->`, html.body);
			res.status(200).set({ "Content-Type": "text/html" }).end(appHtml);
		} catch (e: any) {
			vite.ssrFixStacktrace(e);
			console.log(e.stack);
			res.status(500).end(e.stack);
		}
	};

	const app = express();
	app.use(vite.middlewares);
	app.use(
		"/trpc",
		trpcExpress.createExpressMiddleware({
			router: appRouter,
			createContext: () => ({}),
		})
	);
	app.use("*", renderViteApp);
	app.listen(3000, () => console.log("🚀"));
};

main().catch(console.log.bind(console));
