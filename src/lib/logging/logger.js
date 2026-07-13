const log = ({level, file,  operation, message, userId, error})=>{
const logEntry = {
  timestamp: new Date().toISOString(),
  level,
  file,
  operation,
  message,
  userId,
  error
};
console.log(logEntry);

}
export default log