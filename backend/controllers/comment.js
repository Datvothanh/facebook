const Comment = require("../models/Comment");

exports.comment = async (req, res) => {
  try {
    const { postId, comment, image } = req.body;

    const newComment = new Comment({
      comment: comment,
      postRef: postId,
      image: image,
      commentBy: req.user.id,
      commentAt: new Date(),
    });
    await newComment.save();

    let newComments = await Comment.find({postRef:postId}).populate(
      "commentBy",
      "picture first_name last_name username"
    );
    res.json(newComments);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


exports.commentInComment = async (req, res) => {
  try {
    const { commentId, comment, image } = req.body;

    const newComment = new Comment({
      comment: comment,
      commentRef: commentId,
      image: image,
      commentBy: req.user.id,
      commentAt: new Date(),
    });
    await newComment.save();

    let newComments = await Comment.find({commentRef:commentId}).populate(
      "commentBy",
      "picture first_name last_name username"
    );
    res.json(newComments);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getComment = async (req, res) => {
  try {
    const comments = await Comment.find({ postRef: req.params.id }).populate(
      "commentBy",
      "picture first_name last_name username"
    );
    comments.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    res.json(comments);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


exports.getCommentInComment = async (req, res) => {
  try {
    const comments = await Comment.find({commentRef: req.params.id }).populate(
      "commentBy",
      "picture first_name last_name username"
    );
    comments.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    res.json(comments);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
