import { For, onMount } from "solid-js";
import { Title, Link } from "solid-meta";
import favicon from "../../static/favicon.svg?url";
import type { Tweet } from "../models/tweet";
import TweetVM from "../view-models/tweet";

export const App = () => {
	onMount(TweetVM.fetchAll);
	return (
		<>
			<Title>Solid.js & Vite - SSR</Title>
			<Link rel="shortcut icon" type="image/svg+xml" href={favicon} />
			<div>
				<For each={(TweetVM.state as any).tweets}>
					{(tweet: Tweet) => (
						<div>
							{tweet.name} {tweet.body}
							<button onClick={() => TweetVM.del(tweet.id)}>x</button>
						</div>
					)}
				</For>
				<textarea
					value={TweetVM.state.tweetInput}
					onChange={TweetVM.updateInput}
				/>
				<button onClick={TweetVM.submit}>Create tweet</button>
			</div>
		</>
	);
};

export default App;
