const info = (...params) => {
  console.log(...params); //idk why this was off for testing . . .
};

const error = (...params) => {
  if (process.env.NODE_ENV !== "testing") {
    console.error(...params);
  }
};

module.exports = { info, error };
