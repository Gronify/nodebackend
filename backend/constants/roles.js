const USER = { id: 3, name: "USER", alsoHasPermission: [] };
const HAIRDRESSER_FEMALE = {
  id: 4,
  name: "HAIRDRESSER_FEMALE",
  alsoHasPermission: [],
};
const HAIRDRESSER_MALE = {
  id: 3,
  name: "HAIRDRESSER_MALE",
  alsoHasPermission: [],
};
const HAIRDRESSER_UNIVERSAL = {
  id: 2,
  name: "HAIRDRESSER",
  alsoHasPermission: [HAIRDRESSER_MALE, HAIRDRESSER_FEMALE],
};
const ADMIN = { id: 1, name: "ADMIN", alsoHasPermission: [USER] };

module.exports = {
  ADMIN,
  HAIRDRESSER_UNIVERSAL,
  HAIRDRESSER_FEMALE,
  HAIRDRESSER_MALE,
  USER,
};
