import express from "express";
import User from "../models/user";
import { checkAuth } from "../middleware/checkAuth";
import { stripe } from "../utils/stripe"
import Article from "../models/article";

const router = express.Router();

router.get("/prices", checkAuth, async (req, res) => {
    const prices = await stripe.prices.list({
        apiKey: process.env.STRIPE_SECRET_KEY
    });

    return res.json(prices);
});

router.post("/session", checkAuth, async (req, res) => {
    const user = await User.findOne({email: req.user});

    // used to create articles faster than inserting into the database one by one
    // Article.create({
    //     title: "The oily truth about Ukraine",
    //     imageUrl: "https://images.unsplash.com/photo-1634130597662-6b5c7a33a16e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDYwfGhtZW52UWhVbXhNfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    //     content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    //     access: "Premium",
    // })

    const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
            {
                price: req.body.priceId,
                quantity: 1
            }
        ],
        success_url: "http://localhost:3000/articles",
        cancel_url: "http://localhost:3000/articles-plan",
        customer: user.stripeCustomerId
    }, {
        apiKey: process.env.STRIPE_SECRET_KEY,
    });

    return res.json(session);
})

export default router;