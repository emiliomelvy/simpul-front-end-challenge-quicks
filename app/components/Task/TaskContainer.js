import Header from "./Header";
import TaskList from "./TaskList";

const TaskContainer = () => {
  return (
    <div className="fixed border-2 rounded bottom-32 right-8 py-5 px-6 w-[734px] h-4/6 overflow-auto">
      <Header />
      <TaskList />
    </div>
  );
};

export default TaskContainer;
