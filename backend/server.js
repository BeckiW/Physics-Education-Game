import mongoose from "mongoose"
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import bcrypt from "bcrypt-nodejs"
import uuid from "uuid-v4"

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())
app.use(express.static('public'))

mongoose.connect("mongodb://localhost/physics-game-api")

mongoose.Promise = Promise

mongoose.connection.on("error", err => console.error("Connection error:", err))
mongoose.connection.once("open", () => console.log("Connected to mongodb"))


//Check Authentication
function checkAuth(req, res, validFunc) {
  let accessToken = req.query.token || null;

  if (accessToken == null) {
    return res.status(200).json({ error: "Method requires user token" });
  }

  User.findOne({ accessToken: accessToken })
    .then(user => {
      if (user) {
        validFunc(user);
      } else {
        res.send("No user found with that token")
      }
    })
    .catch(err => {
      res.json(err)
    })
}

///////MODELS ///////

///user model and login setup

const User = mongoose.model("User", {
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  accessToken: {
    type: String,
    default: () => uuid()
  }
})



// endpoint to get info from db (if user is authenticaed)
// app.post("/users/:id/admin", (req, res) => {
// })

//Tests endpoints

const Topic = mongoose.model("Topic", {
  title: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: true
  }
})

Topic.createCollection()


//Results endpoints

const Result = mongoose.model("Result", {

  user_id: {
    type: String,
    required: true
  },
  datetime: {
    type: Date,
    required: true
  },
  topic_id: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  }
})

Result.createCollection()

//Results endpoints

const Question = mongoose.model("Question", {

  topic_id: {
    type: String,
    required: true
  },
  difficulty: {
    type: Number,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  answers: {
    type: Array,
    required: true
  },
  correct_answer: {
    type: Number,
    required: true
  }
})

Question.createCollection()

//////ENDPOINTS//////

// POST new user to user db (not working)
app.post("/users", (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    res.status(400).json({ created: false, error: "You must provide a username, email and password." })
    return
  }

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password)
  })
  newUser.save()
    .then(() => {
      res.status(201).json({ created: true })
    })
    .catch(err => {
      res.status(400).json({ created: false, error: err })
    })
})

// POST new session (i.e. log in) to user db
app.post("/sessions", (req, res) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        res.json({ id: user.id, accessToken: user.accessToken })
      } else {
        res.send("Username or password not found")
      }
    })
    .catch(err => {
      res.json(err)
    })
})


//POST results

app.post("/results", (req, res) => {
  checkAuth(req, res, (user) => {
    const Result = new Result
    result.save()
      .then(() => { res.status(201).send("result added") })
      .catch(err => { res.status(400).send(err) })
    })
  })

//GET topics

app.get("/topics/", (req, res) => {
  Topic.find(). then(topics => {
    console.log("topics: ", topics)
    res.json(topics)
  })
})

//GET questions

app.get("/questions/", (req, res) => {
  Question.find(). then(questions => {
    console.log("questions: ", questions)
    res.json(questions)
  })
})



app.get("/topics/:id", (req, res) => {
  let topic_id = req.params.id
  let difficulty = req.query.difficulty
  let sortBy = req.query.sortBy
  let limit = req.query.limit

    if (limit === undefined) {
      limit = 20;
    }

    if (sortBy === undefined) {
      sortBy = "difficulty"
    }

    let dbQuery = Question.find(
      {topic_id: topic_id}
    ).sort({[sortBy]: 'asc'}).limit(20)
    console.log("Topic ID: " + topic_id)

    dbQuery.then(questions => {
    console.log("questions: ", questions)
    res.send(questions);
  });
})


// app.get("/topics/:id", (req, res) => {
//   let topic_id = req.query.topic_id;
//   let difficulty = req.query.difficulty
//   let sortBy = req.query.sortBy
//   let limit = req.query.limit
//
//     let dbQuery = Question.find(
//       {topic_id: topic_id// Search Filters
//       }).sort({'difficulty': 1}).limit(10)
//
//     dbQuery.then(questions => {
//     console.log("questions: ", questions)
//     res.send(questions);
//   });
// })



// POST single question to db
app.post("/question", (req, res) => {
  const question = new question(req.body)
  question.save()
    .then(() => { res.status(201).send("question added") })
    .catch(err => { res.status(400).send(err) })
})





app.listen(8080, () => console.log("Physics Game API listening on port 8080!"))
