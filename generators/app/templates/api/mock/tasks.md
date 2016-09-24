# Tasks

## Retrieve All Tasks [GET /api/tasks]

- Response 200 (application/json)

  ```
  {
    "code": 0,
    "tasks": [
      {
        "id": "1211",
        "content": "Clean bedroom",
        "isDone": false
      },
      {
        "id": "3216",
        "content": "Read book",
        "isDone": false
      },
      {
        "id": "4213",
        "content": "Finish project",
        "isDone": true
      }
    ]
  }
  ```

## Add New Task [POST /api/tasks]

- Request (application/json)

  - Body

  ```
  {
    "content": "New Task"
  }
  ```

- Response 200 (application/json)

```
{
  "code": 0,
  "task": {
    "id": "77277",
    "content": "New task",
    "isDone": false
  }
}
```

## Toggle Task Status [PUT /api/tasks/{id}]

- Parameters

  - id (number, required) - ID of a task.

- Response 200 (application/json)

```
{
  "code": 0
}
```
