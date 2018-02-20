var getErrorDescription = function(code) {
    let desc = {
     "402":`This contest is for the students enrolled in our courses. 
            Click <a href="https://codingblocks.com/courses/">here</a> to check out the courses which we have. `,
     "405":`Your Email is not verified. 
            Click <a href="https://account.codingblocks.com/users/me">here</a> to verify your email.`,
    };
    return desc[code];
  };
  
  export default getErrorDescription;
