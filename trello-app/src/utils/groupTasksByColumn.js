export const groupTasksByColumn = (tasks, columns) => {
  return columns?.map((col) => {
    const tasksByColumn = tasks?.filter((task) => task.column === col.column);
    return {
      column: col.column,
      columnName: col.columnName,
      tasks: tasksByColumn,
    };
  });
};
