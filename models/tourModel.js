const mongoose = require('mongoose');
const slugify = require('slugify');

const tourScema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size']
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty']
    },
    ratingsAverage: {
      type: Number,
      default: 4.5
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price']
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a summary description']
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image']
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

tourScema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});
//DOCUMENT MIDDLEWARE: runs before .save() and .create()
tourScema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourScema.pre('save', function(next) {
//   console.log('Will save document');
//   next();
// });

// tourScema.post('save', function(doc, next) {
//   console.log(doc);
//   next();
// });

//QUERY MIDDLEWARE
// tourScema.pre('find', function(next) {
tourScema.pre(/^find/g, function(next) {
  this.find({ secretTour: { $ne: true } });

  this.start = Date.now();
  next();
});
tourScema.post(/^find/g, function(docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds`);
  console.log(docs);
  next();
});

//AGGREGATION MIDDLEWARE

tourScema.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  console.log(this.pipeline());
  next();
});

const Tour = mongoose.model('Tour', tourScema);

module.exports = Tour;
