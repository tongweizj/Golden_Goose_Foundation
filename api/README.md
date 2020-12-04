# zhaowork_api

## API 接口说明

### 根据ID查JD

```json
// query 
query JD($id: ID!) {
  jd(
  id:$id
){
  id
  title
  jobTitle
  hash
}}

// query variables
{"id": "5e7bcea65a3f350045f2e8ab"}

// result
{
  "data": {
    "jd": {
      "id": "5e7bcea65a3f350045f2e8ab",
      "title": "Backend Developer",
      "jobTitle": "back end developer",
      "hash": "0daa69f1a043e27a8ae408eceb4ea9c9aabee6bf"
    }
  }
}
```


``` json
  type Query {
    company(name:String!): [Company],
    companies: [Company],
    jd: [Jd],
    jds: [Jd]
  }
```

```json
{
  company(name:"Intact"){
    id
    name
    hash
    location
  }
}
////////////////////
{
  "data": {
    "company": [
      {
        "id": "5eaf6d02c3f1da07500679e2",
        "name": "Intact",
        "hash": "4a935644232c92534903975a766946fa276c9ee6",
        "location": "Toronto, ON"
      }
    ]
  }
}
```