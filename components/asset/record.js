import moment from "moment";

export const DefaultRecord = {
  room_id: undefined,
  equipment_id: undefined,
  brand: undefined,
  model: undefined,
  serial_number: undefined,
  code: undefined,
  purchase_date: moment().format(),
  price: undefined,
  is_depreciated: undefined,
  depreciation_months_count: undefined,
  deactivation_date: undefined,
  note: undefined
};

export const DefaultInvalidInputMessage = {
  room_id: [],
  equipment_id: [],
  brand: [],
  model: [],
  serial_number: [],
  code: [],
  purchase_date: [],
  price: [],
  is_depreciated: [],
  depreciation_months_count: [],
  deactivation_date: [],
  note: []
};
