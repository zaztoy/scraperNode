const request = require('request');

const base_wikipedia_url = 'https://fr.wikipedia.org/api/rest_v1';

const titlesAndYears = new Promise(function(resolve, reject) {
  request(base_wikipedia_url + '/feed/onthisday/all/10/10', function(error, res, body) {
    let response = JSON.parse(body);
    resolve(response.events);
  });
}).then(function(values) {
  const all_promises = [];

  values.forEach(element => {
    all_promises.push(
      new Promise(function(resolve, reject) {
        // anchor - closure
        var this_day_event = element;
        request(element.pages[0].api_urls.metadata, function(error2, response2, body2) {
          let meta = JSON.parse(body2);

          resolve({
            text: this_day_event.text,
            year: this_day_event.year,
            categories: meta.categories.map(e => e.titles.display).filter(e => /Portail/.test(e)),
          });
        });
      })
    );
  });

  Promise.all(all_promises).then(function(values) {
    debugger;
    console.log('done');
    console.log(values);
  });
});

// request(base_wikipedia_url + '/feed/onthisday/all/10/10',
//     function (error, response, body) {
//         let otd = JSON.parse(body);
//         var meta_url = otd.events[0].pages[0].api_urls.metadata;
//         request(meta_url, function (error2, response2, body2) {
//             let meta = JSON.parse(body2);
//             console.log(
//                 meta.categories
//                 .map(e => e.titles.display)
//                 .filter(e => /Portail/.test(e))
//                 );
//         });
// });
