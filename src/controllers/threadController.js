import {
  fetchAllThreads,
  fetchThreadById,
  createThread,
  updateThread,
  deleteThread,
} from "../services/threadService.js";

export const getAllThreads = async (req, res) => {
  try {
    const threads = await fetchAllThreads();
    res.status(200).json({
      success: true,
      message: "Threads fetched successfully",
      data: threads,
    });
  } catch (error) {
    console.error("Error fetching threads:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch threads",
    });
  }
};

export const getThreadById = async (req, res) => {
  try {
    const { id } = req.params;
    const thread = await fetchThreadById(id);

    if (!thread) {
      return res.status(404).json({
        success: false,
        message: "Thread not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Thread fetched successfully",
      data: thread,
    });
  } catch (error) {
    console.error("Error fetching thread:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch thread",
    });
  }
};

export const createNewThread = async (req, res) => {
  try {
    const { title, content, author, subreddit } = req.body;

    if (!title || !content || !author || !subreddit) {
      return res.status(400).json({
        success: false,
        message: "Title, content, author, and subreddit are required",
      });
    }

    const newThread = await createThread(title, content, author, subreddit);
    res.status(201).json({
      success: true,
      message: "Thread created successfully",
      data: newThread,
    });
  } catch (error) {
    console.error("Error creating thread:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create thread",
    });
  }
};

export const updateExistingThread = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const updates = {};
    if (title !== undefined) updates.title = title;
    if (content !== undefined) updates.content = content;

    const updatedThread = await updateThread(id, updates);

    if (!updatedThread) {
      return res.status(404).json({
        success: false,
        message: "Thread not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Thread updated successfully",
      data: updatedThread,
    });
  } catch (error) {
    console.error("Error updating thread:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update thread",
    });
  }
};

export const deleteExistingThread = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedThread = await deleteThread(id);

    if (!deletedThread) {
      return res.status(404).json({
        success: false,
        message: "Thread not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Thread deleted successfully",
      data: deletedThread,
    });
  } catch (error) {
    console.error("Error deleting thread:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete thread",
    });
  }
};