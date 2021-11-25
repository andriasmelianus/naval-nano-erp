export const DefaultRecord = {
  entity: undefined,
  date: undefined,
  title: undefined,
  description: undefined,
  // Please don't use "file"/"files" for naming field. Because it will conflict the reserved Laravel request field.
  attachments: []
};

export const DefaultInvalidInputMessage = {
  entity: [],
  date: [],
  title: [],
  description: [],
  attachments: []
};
