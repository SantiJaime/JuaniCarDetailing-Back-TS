import { Router } from "express";
import { availableDates, createTurn, getTurns } from "../controllers/turns";

const router = Router();

router.get("/", getTurns);
router.get("/available-schedules", availableDates);
router.post("/", createTurn);

export default router;