var getErrorDescription = function(code) {
    let desc = {
     "402":`This is a private contest. Please contact support@codingblocks.com or enroll <a href="https://codingblocks.com">now</a> to get full access to Hackerblocks. Click <a href="https://codingblocks.com/">here</a> to check out the courses which we have. `,
     "405":`Your email is not verified.
            To verify your email or to add your college details, you can visit <a href="https://account.codingblocks.com/users/me/">here</a>`,
    };
    return desc[code];
  };
  
  export default getErrorDescription;
