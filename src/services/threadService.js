import Thread from "../models/Thread.js";

export const fetchAllThreads = async () => {
  const threads = await Thread.find().populate("author", "name").populate("subreddit", "name");
  return threads;
};

export const fetchThreadById = async (id) => {
  const thread = await Thread.findById(id).populate("author", "name").populate("subreddit", "name");
  return thread;
};

export const createThread = async (title, content, author, subreddit) => {
  const newThread = new Thread({ title, content, author, subreddit });
  await newThread.save();
  return newThread;
};

export const updateThread = async (id, updates) => {
  const updatedThread = await Thread.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
  return updatedThread;
};

export const deleteThread = async (id) => {
  const deletedThread = await Thread.findByIdAndDelete(id);
  return deletedThread;
};