# Back End

Base API Link

Endpoints ->

base url /api/expat/auth

| Request | URL       | Description               |
| ------- | --------- | ------------------------- |
| POST    | /register | Registers new User        |
| POST    | /login    | Login as an existing User |

Users

| Name     | Type    | Required | Unique | Notes                    |
| -------- | ------- | -------- | ------ | ------------------------ |
| id       | Integer | Yes      | Yes    | User id (auto generated) |
| username | String  | Yes      | Yes    | Users Username           |
| password | String  | Yes      | No     | Users Password           |

Posts

| Name     | Type    | Required | Unique | Notes                      |
| -------- | ------- | -------- | ------ | -------------------------- |
| id       | integer | Yes      | Yes    | Plants id (auto generated) |
| viewable | boolean | Yes      | No     | Public/private bool        |
| user_id  | integer | Yes      | No     | Foreign Key                |
| name     | text    | Yes      | No     | Post-name                  |
| title    | text    | Yes      | No     | Post-title                 |
| rating   | integer | Yes      | No     | Post-rating                |
| location | text    | No       | No     | Post-location              |
| contact  | text    | No       | No     | Post-contact               |
| date     | date    | No       | No     | Post-date                  |
| notes    | text    | No       | No     | Post-notes                 |

EXAMPLE FOR LOGGING IN WITH OAUTH2
Oauth2 requires authorization header to include ->

```
const login = e => {
    e.preventDefault();
    axios.post('http://localhost:2019/login', `grant_type=password&username=${credentials.username}&password=${credentials.password}`, {
      headers: {
        // btoa is converting our client id/client secret into base64
        Authorization: `Basic ${btoa('lambda-client:lambda-secret')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(res => {
      console.log(res.data)
      localStorage.setItem('token', res.data.access_token);
      props.history.push('/');
    })
  }


```

EXAMPLE WITH AXIOSWITHAUTH

```
export const axiosWithAuth = () => {
  const token = window.localStorage.getItem("token");

  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`
    },
    baseURL: 'http://localhost:2019'
  });
};

```
