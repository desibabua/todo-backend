const UNDONE = 'unDone';
const DOING = 'doing';
const DONE = 'done';

const toggleStatus = {
  [UNDONE]: DOING,
  [DOING]: DONE,
  [DONE]: UNDONE,
};

const getNextStatus = (status) => toggleStatus[status];
const getDefaultStatus = () => UNDONE;

module.exports = {getNextStatus, getDefaultStatus};