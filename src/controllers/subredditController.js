import {
  fetchAllSubreddits,
  createNewSubreddit,
  fetchSubredditWithThreads,
} from "../services/subredditService.js";

export const getAllSubreddits = async (req, res) => {
  try {
    const subreddits = await fetchAllSubreddits();
    res.status(200).json({
      success: true,
      message: "Subreddits fetched successfully",
      data: subreddits,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch subreddits",
    });
  }
};

export const createSubreddit = async (req, res) => {
  try {
    const { name, description, author } = req.body;
    const newSubreddit = await createNewSubreddit(name, description, author);
    res.status(201).json({
      success: true,
      message: "Subreddit created successfully",
      data: newSubreddit,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Subreddit already exists",
        field: Object.keys(error.keyValue)[0],
        value: error.keyValue,
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to create subreddit",
    });
  }
};

export const getSubredditWithThreads = async (req, res) => {
  try {
    const { id } = req.params;
    const subredditWithThreads = await fetchSubredditWithThreads(id);

    // If service returns null → subreddit not found
    if (!subredditWithThreads) {
      return res.status(404).json({
        success: false,
        message: "Subreddit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Subreddit with threads fetched successfully",
      data: subredditWithThreads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch subreddit with threads",
    });
  }
};


