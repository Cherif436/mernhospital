import express from "express"
import { createAdminController, createNewDoctorController, createUserController, deleteDoctorController, deletePatientController, getAllDoctorController, getAllPatientController, getSinglePtientController, loginUserController, logOutAdmin, logOutDoctor, logOutPatient } from "../controller/userController.js";
import { adminTokenAuth, doctorTokenAuth, patientTokenAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/create-patient", createUserController);
router.post("/login-user", loginUserController);
router.post("/create-new-admin", adminTokenAuth, createAdminController);
router.post("/create-new-doctor", adminTokenAuth, createNewDoctorController);

router.get("/get-all-doctor", getAllDoctorController);
router.get("/get-all-patient", adminTokenAuth, getAllPatientController);
router.get("/single-patient", patientTokenAuth, getSinglePtientController);
router.get("/single-doctor", doctorTokenAuth, getSinglePtientController);
router.get("/single-admin", adminTokenAuth, getSinglePtientController);
router.get("/logout-admin", adminTokenAuth, logOutAdmin);
router.get("/logout-patient", patientTokenAuth, logOutPatient);
router.get("/logout-doctor", doctorTokenAuth, logOutDoctor);

router.delete("/delete/doctor/:id", adminTokenAuth, deleteDoctorController);
router.delete("/delete/patient/:id", adminTokenAuth, deletePatientController);

export default router;