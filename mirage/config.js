export default function () {

  this.namespace = 'http://localhost:3000/api';
  this.passthrough('/users');
  // this.get('/users', function () {
  //   return {
  //     "data":
  //     [{
  //       "type": "user",
  //       "id": "72",
  //       "attributes": {
  //         "user-id": 1557,
  //         "name": "Gaurav",
  //         "courses": null
  //       }
  //     },
  //     {
  //       "type": "user",
  //       "id": "103",
  //       "attributes": {
  //         "user-id": 1581,
  //         "name": "Siddhant",
  //         "courses": null
  //       }
  //     }]
  //   };
  // });
  this.passthrough('/users/:user_id');
  //  this.get('/users/:user_id', function () {
  //   return {
  //     data: {
  //       id: 1,
  //       type: "user",
  //       attributes: {
  //         name: "Ankit",
  //         email: "abc@gmail.com"
  //       }
  //     }
  //   };
  // });
  this.passthrough('/contests');
  // this.get('/contests', function () {
  //   return {
  //     meta: {
  //       userCount: 108
  //     },
  //     data: [{
  //       id: 6,
  //       type: "contest",
  //       attributes: {
  //         name: "Blocks Of Code : March Edition",
  //         description: "Public contest for anyone to try their hand on",
  //         start_time: 1488326400,
  //         end_time: 1490918400,
  //         image: "https://bizcircle.att.com/wp-content/uploads/2015/03/buildingblocks_737.jpg",
  //         status: 1,
  //         created_at: "2017-03-28T06:23:07.909Z",
  //         updated_at: null
  //       },
  //       relationships:{  
  //           problems:{  
  //              data:[  
  //                 {  
  //                    type:"problem",
  //                    id:45
  //                 },
  //                 {  
  //                    type:"problem",
  //                    id:54
  //                 },     
  //              ]
  //           }
  //        }
  //     }],
  //     included:[  
  //     {  
  //        type:"problem",
  //        id:"45",
  //        attributes:{  
  //           name:"Hello Coding Blocks",
  //           content:{  
  //              name:"Hello Coding Blocks",
  //              constraints:"",
  //              description:"Write a program to print \"Hello Coding Blocks !\" on the screen.\t\t",
  //              "input-format":"",
  //              "sample-input":"",
  //              "output-format":"Hello Coding Blocks !",
  //              "sample-output":"Hello Coding Blocks !"
  //           },
  //           difficulty:1,
  //           "mem-limit":512,
  //           "time-limit":2,
  //           "created-by":2,
  //           image:"https://i.imgur.com/XYy1jZi.png",
  //           tags:[  
  //              "Implementation"
  //           ],
  //           status:null,
  //           "created-at":"2017-03-28T07:56:24.513Z",
  //           "updated-at":null,
  //           cproblems:{  
  //              "created-at":"2017-04-09T05:53:05.220Z",
  //              "updated-at":"2017-04-09T05:53:05.220Z",
  //              "p-id":45,
  //              "c-id":6
  //           }
  //        },
  //        relationships:{  
  //           submissions:{  

  //           },
  //           testcases:{  

  //           }
  //        }
  //     },
  //     {  
  //        type:"problem",
  //        id:"54",
  //        attributes:{  
  //           name:"Hollow Rhombus Pattern",
  //           content:{  
  //              name:"Hollow Rhombus Pattern",
  //              constraints:"N <= 20",
  //              description:"Given number of rows N, you have to print a Hollow Rhombus.",
  //              "input-format":"Single integer N.",
  //              "sample-input":"5",
  //              "output-format":"Print pattern.",
  //              "sample-output":"    *****\n   *   *\n  *   *\n *   *\n*****"
  //           },
  //           difficulty:1,
  //           "mem-limit":15,
  //           "time-limit":5,
  //           "created-by":3,
  //           image:"https://i.imgur.com/rpiexu7.png",
  //           tags:null,
  //           status:null,
  //           "created-at":"2017-03-28T07:56:24.513Z",
  //           "updated-at":null,
  //           cproblems:{  
  //              "created-at":"2017-04-09T05:53:05.220Z",
  //              "updated-at":"2017-04-09T05:53:05.220Z",
  //              "p-id":54,
  //              "c-id":6
  //           }
  //        },
  //        relationships:{  
  //           submissions:{  

  //           },
  //           testcases:{  

  //           }
  //        }
  //     }]
  //   };
  // });


  this.passthrough('/problems');

  // this.get('/problems', function (db, request) {
  //   if (request.queryParams.contest_id && request.queryParams.problem_id) {
  //     return {
  //       data: {
  //         type: "problem",
  //         id: "54",
  //         attributes: {
  //           name: "Hollow Rhombus Pattern",
  //           content: {
  //             name: "Hollow Rhombus Pattern",
  //             constraints: "N <= 20",
  //             description: "Given number of rows N, you need to print a Hollow Rhombus.",
  //             input_format: "Single integer N.",
  //             sample_input: "5",
  //             output_format: "Print pattern.",
  //             sample_output: "    *****\n   *   *\n  *   *\n *   *\n*****"
  //           },
  //           difficulty: 1,
  //           mem_limit: 15,
  //           time_limit: 5,
  //           created_by: 3,
  //           image: "https://i.imgur.com/rpiexu7.png",
  //           tags: null,
  //           status: null,
  //           created_at: "2017-03-28T07:56:24.513Z",
  //           updated_at: null,
  //           'submit-count': 10,
  //           meta: {
  //             "user-count": "6"
  //           },
  //           "user-count": "6"
  //         },
  //         relationships: {
  //           submissions: {
  //             data: [
  //             ]
  //           },
  //           testcases: {

  //           }
  //         }
  //       }
  //     }
  //   }
  //   else {
  //     return {
  //       data: [{
  //         type: "problem",
  //         id: 20170403,
  //         attributes: {
  //           day: 20170403,
  //           name: "Finquest",
  //           content: {
  //             name: "Finquest",
  //             constraints: "1 <= T <= 10\n1 <= N <= 50000\nAll share prices are between 1 and 100000\n",
  //             description: "Finquest Event hosted by ABC Company is all about share market and who can make the best profit out of it.\nImagine that your algorithms have become so good at predicting the market that you now know what the share price of Das Motors Inc. (DM) will be for the next N days.\nEach day, you can either buy one share of DM, sell any number of shares of DM that you own, or not make any transaction at all. What is the maximum profit you can obtain with an optimum trading strategy?\n",
  //             explanation: "For the first case, you cannot obtain any profit because the share price never rises. \nFor the second case, you can buy one share on the first two days, and sell both of them on the third day. \nFor the third case, you can buy one share on day 1, sell one on day 2, buy one share on day 3, and sell one share on day 4.\n",
  //             input_format: "The first line contains the number of test cases T. T test cases follow:\nThe first line of each test case contains a number N. The next line contains N integers, denoting the predicted price of DM shares for the next N days.\n",
  //             sample_input: "3\n3\n5 3 2\n3\n1 2 100\n4\n1 3 1 2\n",
  //             output_format: "Output T lines, containing the maximum profit which can be obtained for the corresponding test case.",
  //             sample_output: "0\n197\n3\n"
  //           },
  //           difficulty: 2,
  //           mem_limit: 512,
  //           time_limit: 2,
  //           image: "httpS://i.imgur.com/IbOsN5j.png",
  //           'submit-count': 12
  //         },
  //         relationships: {
  //           submissions: {

  //           },
  //           testcases: {

  //           }
  //         }
  //       }, {
  //         type: "problem",
  //         id: 20170401,
  //         attributes: {
  //           day: 20170401,
  //           name: "Answer Deepak's Query",
  //           content: {
  //             name: "Answer Deepak's Query",
  //             constraints: "1 <= length of string <= 50000\n\n1 <= K <= 1000000\n\n1 <= No. of type 2 queries <= 800\n",
  //             description: "Deepak and Gautam arrived Coding Blocks Centre at 1:30 PM. As class starts from 2 PM, they decided to play a game. \n\nGautam loves strings.So, Deepak gives him a challenge on string. Deepak will give Gautam a string of lowercase alphabets and will ask Gautam 2 types of queries.\n\nIn Type 1 query, Deepak will give Gautam a number 'P' and Gautam will have to shift each character of the string by 'P'.\n\nEx - If current string is **apmz**, and P=3, the string will become **dspc**. The shift will be cyclic i.e after z,cycle will start from 'a'.\n\nIn Type 2 query, Deepak will again give a number 'Q' and this time Gautam will have to print first 'Q' characters of the string.\n\nEx - If current string is abcdefghi and Q = 4, the output will be **abcd**     \n\nRemember,Gautam only changes the string in Type - 1 query. He prints them for type - 2 query.\n\nGautam has to prepare hackathon questions for Coding Blocks Launchpad students. Can you do his work ?\n",
  //             explanation: "Output for type - 2 query.",
  //             "input-format": "Each input file will have following -\n\nFirst line will be the string given by Deepak.\n\nSecond line contains a number K, which gives the number of times Deepak asks Gautam to perform the operation.\n\nEach of the K subsequent lines describe a query in the form 1 P or 2 Q.\n\n1 P - Shift each character of string by 'P' in cyclic order as described above.\n\n2 Q - Print first 'Q' characters of the string.\n",
  //             "sample-input": "bnchmfaknbjr\n2\n1 1\n2 12\n",
  //             "output-format": "print first 'Q' characters of the string for each type 2 query.\n",
  //             "sample-output": "codingblocks"
  //           },
  //           "difficulty": 1,
  //           "mem-limit": 512,
  //           "time-limit": 2,
  //           image: "https://i.imgur.com/st1PXiZ.png",
  //           "submit-count": "2"
  //         },
  //         relationships: {
  //           submissions: {

  //           },
  //           testcases: {

  //           }
  //         }
  //       }
  //       ]
  //     }

  //   }
  // });
  this.passthrough('/problems/:problem_id');

  // this.get('/problems/:problem_id', function () {
  //   return {
  //     data: {
  //       id:1,
  //       type: "problem",
  //       attributes: {
  //         name: "The Great Coding Blocks Conundrum",
  //         content: lorem_ipseum
  //       }
  //     }
  //   };
  // });

  this.passthrough('/submissions');
  // this.get('/submissions', function (db, request) {
  //   if (request.queryParams.contest && request.queryParams.leaderboard) {
  //     return {
  //       data: [{
  //         type: "submission",
  //         id: "78",
  //         attributes: {
  //           "user-id": 1490,
  //           score: 325,
  //           "user-name": "Nishant Bhargava"
  //         }
  //       },
  //       {
  //         type: "submission",
  //         id: "262",
  //         attributes: {
  //           "user-id": 1015,
  //           score: 200,
  //           "user-name": "Kamaldeep Singh"
  //         }
  //       },
  //       {
  //         type: "submission",
  //         id: "952",
  //         attributes: {
  //           "user-id": 1768,
  //           score: 200,
  //           "user-name": "Rishab Arora"
  //         }
  //       },]
  //     };
  //   }
  //   else {
  //     return {
  //       data: [{
  //         id: 1,
  //         type: "submission",
  //         attributes: {
  //           "user-name": "Nishant Bhargava",
  //           "problem-name": "Playing with number system",
  //           submit_at: 476254654,
  //           language: "c",
  //           score: 100.0,
  //         }
  //       }, {
  //         id: 2,
  //         type: "submission",
  //         attributes: {
  //           "problem-name": "Just another Series !",
  //           "user-name": "Amit Nardia",
  //           language: "cpp",
  //           score: 90.0,
  //         }
  //       }]
  //     };
  //   }
  // });

  this.passthrough('/leaderboard');
  this.passthrough('/submissions/submissionCount');
  // this.get('/submissions/submissionCount', function () {
  //   return [{ count: 19 }];
  // });

  this.passthrough('/users/me');

  // this.get('/users/me', function () {
  //   return {
  //     data: {
  //       id: 1,
  //       type: "user",
  //       attributes: {
  //         user_id:1015,
  //         name: "Ankit",
  //         'roll-number': "1234",
  //         email: "ankit@gmail.com"
  //       }
  //     }
  //   }
  // });
  this.passthrough('http://localhost:3000/api/login');
  // this.post('http://localhost:3000/api/login',function(){
  //   return {user_id:1015,access_token:"2039ec223014abf2d11fa3b6624a32d6"};
  // });

  this.passthrough('/contests/:contest_id');
  // this.get('/contests/:contest_id', function () {
  //   return {
  //     data: {
  //       type: "contest",
  //       id: 6,
  //       attributes: {
  //         name: "Blocks Of Code : March Edition",
  //         description: "Public contest for anyone to try their hand on",
  //         start_time: 1488326400,
  //         end_time: 1490918400,
  //         image: "https://bizcircle.att.com/wp-content/uploads/2015/03/buildingblocks_737.jpg",
  //         status: 1,
  //         created_at: "2017-03-28T06:23:07.909Z",
  //         updated_at: null
  //       },
  //       relationships: {
  //         problems: {
  //           data: [
  //             {
  //               type: "problem",
  //               id: 54
  //             }
  //           ]
  //         }
  //       }
  //     },
  //     included: [
  //       {
  //         type: "problem",
  //         id: 54,
  //         attributes: {
  //           name: "Hollow Rhombus Pattern",
  //           content: {
  //             name: "Hollow Rhombus Pattern",
  //             constraints: "N <= 20",
  //             description: "Given number of rows N, you have to print a Hollow Rhombus.",
  //             input_format: "Single integer N.",
  //             sample_input: "5",
  //             output_format: "Print pattern.",
  //             sample_output: "    *****\n   *   *\n  *   *\n *   *\n*****"
  //           },
  //           difficulty: 1,
  //           mem_limit: 15,
  //           time_limit: 5,
  //           created_by: 3,
  //           image: "https://i.imgur.com/rpiexu7.png",
  //           tags: null,
  //           status: null,
  //           created_at: "2017-03-28T07:56:24.513Z",
  //           updated_at: null,
  //           'submit-count':12,
  //           cproblems: {
  //             created_at: "2017-04-09T05:53:05.220Z",
  //             updated_at: "2017-04-09T05:53:05.220Z",
  //             p_id: 54,
  //             c_id: 6
  //           }
  //         },
  //         relationships: {
  //           submissions: {

  //           },
  //           testcases: {

  //           }
  //         }
  //       }
  //     ]
  //   }
  // });

  this.passthrough('/submissions/:submission_id');
  // this.get('/submissions/:submission_id', function () {
  //   return {
  //     data: {
  //       type: "submission",
  //       id: 561,
  //       attributes:
  //       {
  //         "user-id": 317,
  //         source: "I2luY2x1ZGUgPHN0ZGlvLmg+CmludCBtYWluKCkgewogICAgY291dCA8PCAiSGVsbG8gQ29kaW5nIEJsb2NrcyAhIjsKICAgIHJldHVybiAwOwogICAgCn0K",
  //         submit_at: 1489292279,
  //         language: "c",
  //         score: 100,
  //         result: -1,
  //         problem_id: 45,
  //         c_id: null,
  //         p_id: null,
  //         created_at: null,
  //         updated_at: null
  //       }
  //     }
  //   }
  // });



  this.passthrough('/problems/weekly/:problem_id');

  //this.passthrough('/dailycbs');

   this.get('/dailycbs',function(){
  return {
      data: [{  
         type:"dailycb",
         id:6,
         attributes:{  
            day:20170303,
            "created-at":null,
            "updated-at":null,
            problem_id:64
         },
         relationships:{  
            problem:{  
               data:{  
                  type:"problem",
                  id:64
               }
            }
         }
      },
      {  
         type:"dailycb",
         id:"4",
         attributes:{  
            day:20170305,
            "created-at":null,
            "updated-at":null,
            problem_id:49
         },
         relationships:{  
            problem:{  
               data:{  
                  type:"problem",
                  id:49
               }
            }
         }
      }],
      included:[  
      {  
         type:"problem",
         id:64,
         attributes:{  
            name:"Super Power",
            content:{  
               name:"Super Power",
               constraints:"",
               description:"Input two numbers a and b . We need to calculate a power b."
            },
            difficulty:1,
            "mem-limit":15,
            "time-limit":15,
            "created-by":3,
             'submit-count': 10,
              'user-count':100, 
            image:"https://i.imgur.com/0tqqF6B.png",
            tags:null,
            status:null,
            "created-at":"2017-03-28T07:56:24.513Z",
            "updated-at":null
         },
         relationships:{  
            submissions:{  

            },
            testcases:{  

            }
         }
      },
      {  
         type:"problem",
         id:49,
         attributes:{  
            name:"Pattern Magic",
            content:{  
               name:"Pattern Magic",
               constraints:"N<=1000",
               description:"Code the given pattern.\n<img src=\"https://s3.amazonaws.com/hr-challenge-images/22060/1465463925-b22d8d8dfe-ScreenShot2016-06-09at2.47.18pm.png\" title=\"Screen Shot 2016-06-09 at 2.47.18 pm.png\" />"
            },
            difficulty:1,
            "mem-limit":512,
            "time-limit":2,
            "created-by":2,
             'submit-count': 10,
 'user-count':100,             
image:"https://i.imgur.com/pxxMSyn.png",
            tags:[  
               "Implementation"
            ],
            status:null,
            "created-at":"2017-03-28T07:56:24.513Z",
            "updated-at":null
         },
         relationships:{  
            submissions:{  

            },
            testcases:{  

            }
         }
      }]
  }
});

//this.passthrough('/dailycbs/:problem_id');


  this.get('/dailycbs/:problem_id', function () {
    return {
      data: {
      type:"dailycb",
      id:6,
      attributes:{  
         day:20170303,
         "created-at":null,
         "updated-at":null,
         "problem-id":64
      },
      relationships:{  
         problem:{  
            data:{  
               type:"problem",
               id:64
            }
         }
      }
   },
   included:[  
      {  
         type:"submission",
         id:2541,
         attributes:{  
            "user-id":1015,
            source:"I2luY2x1ZGUgPHN0ZGlvLmg+CmludCBtYWluKCkgewogICAgcHJpbnRmKCJ5byB5byIpOwp9Cg==",
            "submit-at":1491996673,
            language:"c",
            score:0,
            result:-1,
            "problem-id":-1,
            "created-at":"2017-04-12T11:31:13.404Z",
            "updated-at":"2017-04-12T11:31:13.404Z",
            p_id:64,
            c_id:0
         }
      }]      
    }
  });
}
