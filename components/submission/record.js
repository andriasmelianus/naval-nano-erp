import moment from "moment";

export const DefaultRecord = {
  entity: undefined,
  date: moment().format(),
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
