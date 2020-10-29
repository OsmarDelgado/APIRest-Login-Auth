import mongoose from 'mongoose';

// For connect to db in mongodb
mongoose.connect("mongodb://127.0.0.1/apidb", {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useFindAndModify : true,
    useCreateIndex : true
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.warn(err))