TODOS : 

    personal chat message send.
    when send stored in db.

    group chat 
        create group chat 
        create api for getting group chat
        sending message in group chat




1. Chat
```js
Chat =  user1:
    {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    user2:
    {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

```


2. Group
```js
groupSchema = {
    name:
    {
        type: String,
        require: true,
        unique: true
    },

    admin:
    {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },

    createdAt:
    {
        type: String,
    },
    pic:
    {
        type: String,
    },
}
```

3. Message
```js
const MessageSchema = {
    text:
    {
        type: String,
    },
    time:
    {
        type: String,
    },
    sendTo:
    {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    sendBy:
    {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    group:
    {
        type: Schema.Types.ObjectId,
        ref : "Group",
    }
}
```

4. User
```js
const userSchema ={
    email:
    {
        type: String,
    },

    userName:
    {
        type: String,
    },

    password:
    {
        type: String
    },

    pic:
    {
        type: String,
    },

    verified:
    {
        type: Boolean,
    },

    googleId:
    {
        type: String,
    },

}, { timestamps: false };

```

5. GroupMember
```js
const GroupMemberSchema = {
    member:
    {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    group:
    {
        type: Schema.Types.ObjectId,
        ref: 'Group',
    },
    status:
    {
        type: Boolean,
    }
}