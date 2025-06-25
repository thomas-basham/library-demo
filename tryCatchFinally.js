try {
  // try running some code that might cause an error
} catch (error) {
  // if there is an error, handle it here
} finally {
  // this runs no matter what.
  // you won't always need it.
  // good for clean-up processes
}

/**
 * function that accepts a string and
 * returns an uppercase version of the
 * string with exclamation marks
 * @param {string} sentence - incoming string to be converted to yelling string
 * @returns {string} - An uppercase exclamated version of the string
 */
function yell(sentence) {
  try {
    if (typeof sentence != "string") {
      throw new Error("You must only add a string");
    }
    yelling = sentence.toUpperCase();
    yelling += "!!!";
    console.log(yelling);
  } catch (error) {
    console.error("Error trying to yell: ", error.message);
  } finally {
    console.log("Completed yelling process.");
  }
}

yell(46);

yell("it's time to write some code");

