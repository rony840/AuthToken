import { create } from 'zustand';
import { database } from "../database/watermelonDB";

export const useTaskStore = create((set) => ({
  tasks: [],

  fetchTasks: async () => {
    const taskList = await database.get("tasks").query().fetch();
    set({ tasks: taskList });
  },

  addTask: async (name) => {
    await database.write(async () => {
      const newTask = await database.get("tasks").create((task) => {
        task.name = name;
        task.isCompleted = false;
      });

      set((state) => ({
        tasks: [...state.tasks, newTask],
      }));
    });
  },

  updateTask: async (task) => {
    await database.write(async () => {
      await task.update((t) => {
        t.isCompleted = !t.isCompleted;
      });
    });

    // After updating the task in the database, refetch the tasks to ensure the UI is updated
    await set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === task.id ? { ...t, isCompleted: !t.isCompleted } : t
      ),
    }));

    // Optionally, you could call fetchTasks again here to re-sync the data
    await set({ tasks: await database.get("tasks").query().fetch() });
  },

  deleteTask: async (task) => {
    await database.write(async () => {
      await task.destroyPermanently();
    });

    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== task.id),
    }));
  },
  // In your Zustand store (taskStore.js)

  updateTaskName: async (taskId, newName) => {
    const task = await database.get("tasks").find(taskId); // Fetch the task instance
  
    if (!task) {
      console.error("Task not found:", taskId);
      return;
    }
  
    await database.write(async () => {
      await task.update((t) => {
        t.name = newName;
      });
    });
  
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === taskId ? { ...t, name: newName } : t
      ),
    }));
  
    await set({ tasks: await database.get("tasks").query().fetch() });
  },
  
  
}));
