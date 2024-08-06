import PostModel from '../models/Post.js';


export const getLastTags = async(req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec();

        const tags = posts.map(obj=>obj.tags).flat().slice(0,5);
        res.json(tags);
    }    catch (error) {
        res.status(500).json({
            message: 'Failed to get items',
            error: error.message
        })
    }
}
export const getAll = async(req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();

        res.json(posts);    
    } catch (error) {
        res.status(500).json({
            message: 'Failed to get items',
            error: error.message
        })
    }
}

export const getOne = async(req, res) => {
    try {
        const postId = req.params.id;

        const updatedPost = await PostModel.findOneAndUpdate(
            { _id: postId },
            { $inc: { viewsCount: 1 } },
            { new: true, returnDocument: 'after' }
        );
        if(!updatedPost) {
            return res.status(404).json({
                message: 'Item not found'
            })
        }

        res.json(updatedPost);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to get Items',
            error: error.message
        })
    }
}
export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        const deletedPost = await PostModel.findOneAndDelete({ _id: postId });

        if (!deletedPost) {
            return res.status(404).json({
                message: 'Post not found',
            });
        }

        res.json({
            success: true,
        });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({
            message: 'Failed to delete post',
            error: error.message,
        });
    }
};

export const createPost = async(req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });

        const post = await doc.save();

        res.json(post);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to create post',
            error: error.message
        })
    }
};

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModel.updateOne(
            {
                _id: postId
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags,
                user: req.userId,
            }
        )
        res.json({
            success: true
        })
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({
            message: 'Failed to update post',
            error: error.message,
        });
    }
}