export default function() {

  // let lorem_ipseum = "Lorem ipsum dolor sit `amet`, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  this.namespace = 'http://localhost:3000/api';
/*
  this.get('/contests', function() {
    return {
      data: [{
        id: 1,
        type: "contest",
        attributes: {
          name: "The Great Coding Blocks Hackathon",
          start_time: "1st Jan 9:00 am",
          end_time: "31st Jan 11:00 pm",
          location: "Pitampura Center",
          image: "http://www.gravatar.com/avatar/0cf15665a9146ba852bf042b0652780a?s=200"
        }
      },{
        id: 2,
        type: "contest",
        attributes: {
          name: "Competitive Hackathon",
          date: "12th Dec 9:00 am",
          location: "Online",
          image: "http://www.gravatar.com/avatar/0cf15665a9146ba852bf042b0652780a?s=200"
        }
      }]
    };
  });*/
  this.passthrough('/contests');

  /*
  this.get('/problems', function () {
    return {
      data: [{
        id:1,
        type: "problem",
        attributes: {
          name: "Problem 1 of this contest"
        }
      }]
    };
  });*/
  this.passthrough('/problems');

  /*
  this.get('/problems/:problem_id', function () {
    return {
      data: {
        id:1,
        type: "problem",
        attributes: {
          name: "The Great Coding Blocks Conundrum",
          content: lorem_ipseum
        }
      }
    };
  });*/
  this.passthrough('/problems/:problem_id');

  /*
  this.get('/submissions', function () {
    return {
      data: [{
        id: 1,
        type: "submission",
        attributes: {
          user: "omerjerk",
          submit_at: 476254654,
          language: "c",
          score: 90.0,
          result: "passed"
        }
      },{
        id: 2,
        type: "submission",
        attributes: {
          user: "championswimmer",
          submit_at: 476244654,
          language: "cpp",
          score: 100.0,
          result: "wrong-answer"
        }
      }]
    };
  });*/
  this.passthrough('/submissions');

  this.passthrough('/leaderboard');

  /*
  this.get('/users/me', function () {
    return {
      data: {
        id: 1,
        type: "user",
        attributes: {
          name: "Umair",
          roll_number: "1234",
          email: "omerjerk@gmail.com"
        }
      }
    }
  });*/
  this.passthrough('/users/me');
  this.passthrough('http://localhost:3000/api/login');
}
