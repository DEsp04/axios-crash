//video time: 27.00
//Axios http library or http client to make request either to your own backend or 
//third party API to fetch data

//AXIOS GLOBALS 
axios.defaults.headers.common['X-Auth-Token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'


// GET REQUEST
function getTodos() {
  // axios({
  //   method: 'get',
  //   url: 'https://jsonplaceholder.typicode.com/todos',
  //   params: { //and url parameter you wanna add. shorten list from 200 to 5
  //     _limit:5
  //   }
  // }) //will give us a promsie
  //   .then(response => showOutput(response)) //this is where we will put our response
  //   .catch(error => console.log(error(error))) //this handles error from promises

  //---------below is a short version of how you can  shorten the list 200 to 5
  axios
    .get('https://jsonplaceholder.typicode.com/todos?_limit=5') //will give us a promsie
    .then(response => showOutput(response)) //this is where we will put our response
    .catch(err => console.error(err)) //this handles error from promises
}

// POST REQUEST
function addTodo() { //sending data to server or API. This increase list from 200 to 201
  axios.post('https://jsonplaceholder.typicode.com/todos', {
    title: 'New Todo',
    completed: false
  }) //will give us a promsie
    .then(response => showOutput(response)) //this is where we will put our response
    .catch(err => console.log(error(err))) //this handles error from promises
}

// PUT/PATCH REQUEST //'Put' is meant to replace the entire resource(or selected object) & 'Patch' is meant to update and increment the resource(it grabs the specific object, then grabs the specific key to change value)
function updateTodo() {
  axios
    .patch('https://jsonplaceholder.typicode.com/todos/1', {
      title: 'Updated Todo',
      completed: true
  }) //will give us a promsie
    .then(response => showOutput(response)) //this is where we will put our response
    .catch(err => console.log(error(err))) //this handles error from promises
}

// DELETE REQUEST //Deletes any object or data from the api
function removeTodo() {
  axios
    .delete('https://jsonplaceholder.typicode.com/todos/1') //will give us a promsie
    .then(response => showOutput(response)) //this is where we will put our response
    .catch(err => console.log(error(err))) //this handles error from promises
}

// SIMULTANEOUS DATA //making simultaneuos request. Lets get post data, and todo
function getData() {
  axios.all([ //all will allow to do an array of requests
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
  ])
    .then(axios.spread((todos, posts) => showOutput(posts))) //axios spread gives variable like post and todos cleaner. The variable represents the array response that contains todos, and posts
    .catch(err => console.log(error(err)))
    
}

// CUSTOM HEADERS // when you have authentication, you login to api, and get token--send token to the header to get access to protective route
function customHeaders() { //login to create a Post request
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'sometoken'
    }
  }

  axios.post('https://jsonplaceholder.typicode.com/todos', {//request
    title: 'New Todo', 
    completed: false
  }, config) //Add config as a third parameter to costum header   //will give us a promise
    .then(response => showOutput(response)) //this is where we will put our response
}

// TRANSFORMING REQUESTS & RESPONSES 
function transformResponse() {
  const options = {
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: {
      title: 'Hello World'
    },
    transformResponse: axios.defaults.transformResponse.concat(data => {
      data.title = data.title.toUpperCase();
      return data;
    }) //take default transformReponse and overwrite it
  };

  axios(options).then(response => showOutput(response));//axios by default will do a get request and change the get request to whatever we put on option
}

// ERROR HANDLING
function errorHandling() {
  axios
    .get('https://jsonplaceholder.typicode.com/todoss') //will give us a promsie
    .then(response => showOutput(response)) //this is where we will put our response
    .catch(err => {
      if (err.response) { //add a condition to check for any error response (404 page)
        //if true, server responded with a status other than 200 range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);

        if (err.response.status === 404) {
          alert("Error: Page Not Found");
        }
      } else if (err.request) {
        //Request was made but there was no response
        console.error(err.request);
      } else {
        console.error(err.message);
      }
    }); //this handles error from promises
}

// CANCEL TOKEN we can cancel request on the fly
function cancelToken() {
  const source = axios.CancelToken.source();
  axios
    .get('https://jsonplaceholder.typicode.com/todos', {
      cancelToken: source.token
    }) //will give us a promsie
    .then(response => showOutput(response))
    .catch(thrown => {
      if (axios.isCancel(thrown)) {
        console.log('Request canceled', thrown.message)
      }
    });
  
  if (true) {
    source.cancel("Request canceled!")
  }
}

// INTERCEPTING REQUESTS & RESPONSES
//interceptors allow us to intercept requests and run some kind of functionality

axios.interceptors.request.use(//config give us access to method, url, etc
  config => {
    console.log(
      `${config.method.toUpperCase()} request sent to ${
        config.url
      } at ${new Date().getTime()}`
    );

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// AXIOS INSTANCES
const axiosInstance = axios.create({
  //Other custom settings
  baseURL:'https://jsonplaceholder.typicode.com'
});

// axiosInstance.get('/comments').then(response => showOutput(response));



// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
