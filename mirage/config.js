export default function() {

  this.namespace = '/api';

  this.get('/contests', function() {
    return {
      data: [{
        id: 1,
        type: "contest",
        attributes: {
          name: "The Great Coding Blocks Hackathon",
          date: "12th Dec 9:00 am",
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
  });
}
