import express from "express";
import { requireAuth } from "../middleware/requireAuth";
import { deleteNotificationsUser, deleteOneNotification, getNotificationsByUser } from "../controllers/notifications";
import { deleteOneNotifValidation, getNotificationValidation } from "../middleware/notificationsValidation";

export const notificationsRouter = express.Router();

notificationsRouter.get("/", requireAuth, getNotificationValidation ,getNotificationsByUser);
notificationsRouter.delete("/:notifId", requireAuth, deleteOneNotifValidation, deleteOneNotification);
notificationsRouter.delete("/", requireAuth, deleteNotificationsUser);
