import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    throw new Error("Error within Hello Sentry!");
});

export {router as sentryRouter};