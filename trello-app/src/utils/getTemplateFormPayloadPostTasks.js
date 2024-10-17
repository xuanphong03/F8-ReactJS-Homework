export const getTemplateFormPostTasks = (tasks, columns) => {
  const payload = [];
  tasks.forEach((task) => {
    const col = columns.find((col) => col.column === task.column);
    if (col) {
      payload.push({
        content: task.content,
        column: col.column,
        columnName: col.columnName,
      });
    }
  });
  return payload;
};
