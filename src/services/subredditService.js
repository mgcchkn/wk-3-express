import Subreddit from "../models/Subreddit.js";
import Thread from "../models/Thread.js";

export const fetchAllSubreddits = async () => {
  const subreddits = await Subreddit.find();
  return subreddits;
};

export const createNewSubreddit = async (name, description, author) => {
  const newSubreddit = new Subreddit({
    name,
    description,
    author,
  });
  await newSubreddit.save();
  return newSubreddit;
};

export const fetchSubredditWithThreads = async (id) => {
  const subreddit = await Subreddit.findById(id);
  const threads = await Thread.find({ subreddit: id });
  return {
    subreddit,
    threads,
  };
};
