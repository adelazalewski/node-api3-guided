const express = require("express")
const users = require("./users-model")
const { checkUserID, checkNameAndEmail } = require("./users-middleware");

const router = express.Router()


router.get("/users", (req, res, next) => {
	const options = {
		sortBy: req.query.sortBy,
		limit: req.query.limit,
	}

	users.find(options)
		.then((users) => {
			res.status(200).json(users)
		})
		.catch((error) => {
			// console.log(error)
			// res.status(500).json({
			// 	message: "Error retrieving the users",
			// })
			//if next is called with a param its considered an error
			//and goes to the error middleware 
			next(error)
		})
})

router.get("/users/:id", checkUserID(), (req, res) => {
	// users.findById(req.params.id)
	// 	.then((user) => {
	// 		if (user) {
		//user gets attached to the request is checkUserID
	 			res.status(200).json(req.user)
	// 		} else {
	// 			res.status(404).json({
	// 				message: "User not found",
	// 			})
	// 		}
	// 	})
	// 	.catch((error) => {
	// 		console.log(error)
	// 		res.status(500).json({
	// 			message: "Error retrieving the user",
	// 		})
	// 	})
})

router.post("/users",checkNameAndEmail(), (req, res, next) => {
	// if (!req.body.name || !req.body.email) {
	// 	return res.status(400).json({
	// 		message: "Missing user name or email",
	// 	})
	// }

	users.add(req.body)
		.then((user) => {
			res.status(201).json(user)
		})
		.catch((error) => {
			// console.log(error)
			// res.status(500).json({
			// 	message: "Error adding the user",
			// })
			next(error)
		})
})

router.put("/users/:id",checkNameAndEmail(),checkUserID() , (req, res, next) => {
	// if (!req.body.name || !req.body.email) {
	// 	return res.status(400).json({
	// 		message: "Missing user name or email",
	// 	})
	// }

	users.update(req.params.id, req.body)
		.then((user) => {
			if (user) {
				res.status(200).json(user)
			} else {
				res.status(404).json({
					message: "The user could not be found",
				})
			}
		})
		.catch((error) => {
			// console.log(error)
			// res.status(500).json({
			// 	message: "Error updating the user",
			// })
			next(error)
		})
})

router.delete("/users/:id",checkUserID(), (req, res, next) => {
	users.remove(req.params.id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({
					message: "The user has been nuked",
				})
			} else {
				res.status(404).json({
					message: "The user could not be found",
				})
			}
		})
		.catch((error) => {
			// console.log(error)
			// res.status(500).json({
			// 	message: "Error removing the user",
			// })
			next(error)

		})
})

router.get("/users/:id/posts",checkUserID(), (req, res, next) => {
	users.findUserPosts(req.params.id)
		.then((posts) => {
			res.status(200).json(posts)
		})
		.catch((error) => {
			// console.log(error)
			// res.status(500).json({
			// 	message: "Could not get user posts",
			// })
			next(error)

		})
})

router.get("/users/:id/posts/:postId",checkUserID(), (req, res, next) => {
	users.findUserPostById(req.params.id, req.params.postId)
		.then((post) => {
			if (post) {
				res.json(post)
			} else {
				res.status(404).json({
					message: "Post was not found",
				})
			}
		})
		.catch((error) => {
			// console.log(error)
			// res.status(500).json({
			// 	message: "Could not get user post",
			// })
			next(error)

		})
})

router.post("/users/:id/posts",checkUserID(), (req, res, next) => {
	if (!req.body.text) {
		return res.status(400).json({
			message: "Need a value for text",
		})
	}

	users.addUserPost(req.params.id, req.body)
		.then((post) => {
			res.status(201).json(post)
		})
		.catch((error) => {
			// console.log(error)
			// res.status(500).json({
			// 	message: "Could not create user post",
			// })
			next(error)

		})
})

module.exports = router