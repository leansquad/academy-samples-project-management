import {
  collection,
  doc,
  getDocs,
  deleteDoc,
  query,
  serverTimestamp,
  setDoc,
  getDoc,
  where,
} from "firebase/firestore";
import { auth, firestoreDB } from "../firebase";
import { v4 as uuidv4 } from "uuid";

export const getProjects = async () => {
  const user = auth.currentUser;
  if (!user) return;
  const projectsRef = query(
    collection(firestoreDB, "projects"),
    where("user_id", "==", user?.uid),
    // orderBy("created_at", "desc"),
  );
  const projectsSnapshot = await getDocs(projectsRef);
  const projectsList = projectsSnapshot.docs.map((doc) => doc.data());
  return projectsList || [];
};

export const addProject = async ({ name }) => {
  const user = auth.currentUser;
  if (!user) return;

  const newId = uuidv4();
  const tasksRef = collection(firestoreDB, "projects");
  await setDoc(doc(tasksRef, newId), {
    name: name || "test",
    user_id: user?.uid,
    id: newId,
    created_at: serverTimestamp(),
  });
  return await getProjects();
};

export const removeProject = async ({ id }) => {
  const projectsRef = doc(firestoreDB, "projects", id);
  await deleteDoc(projectsRef);
  return await getProjects();
};

export const updateProject = async ({ id, name }) => {
  const projectsRef = doc(firestoreDB, "projects", id);
  await setDoc(projectsRef, { name }, { merge: true });
  return await getProjects();
};

export const getProjectById = async (id) => {
  const projectsRef = doc(firestoreDB, "projects", id);
  const projectSnapshot = await getDoc(projectsRef);
  return projectSnapshot.data();
};

export const getTasksByProjectId = async (projectId) => {
  const tasksRef = query(
    collection(firestoreDB, "tasks"),
    where("project_id", "==", projectId),
  );
  const tasksSnapshot = await getDocs(tasksRef);
  const tasksList = tasksSnapshot.docs.map((doc) => doc.data());
  return tasksList || [];
};

export const addTaskToProject = async ({ projectId, task }) => {
  const taskId = uuidv4();
  const tasksRef = doc(firestoreDB, "tasks", taskId);
  await setDoc(tasksRef, {
    name: task.name,
    project_id: projectId,
    id: taskId,
    created_at: serverTimestamp(),
    completed: false,
  });

  return await getTasksByProjectId(projectId);
};
