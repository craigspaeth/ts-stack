import _ from "lodash";
import { createStore } from "solid-js/store";
import { createTRPCClient } from "@trpc/client";
import type { AppRouter } from "../controllers/router";
import type { Tweet } from "../models/tweet";

const [state, setState] = createStore({
	tweets: [] as Tweet[],
	tweetInput: "",
});

const client = _.once(() =>
	createTRPCClient<AppRouter>({
		url: "http://localhost:3000/trpc",
	})
);

const fetchAll = async () => {
	const tweets = await client().query("Tweet.getAll");
	setState({ ...state, tweets, tweetInput: "" });
};

const submit = async () => {
	await client().mutation("Tweet.create", {
		name: "Title",
		body: state.tweetInput,
	});
	fetchAll();
};

const updateInput = (e: any) => {
	setState({ ...state, tweetInput: e.target.value });
};

const del = async (id: string) => {
	await client().mutation("Tweet.del", id);
	fetchAll();
};

export default { state, updateInput, submit, fetchAll, del };
